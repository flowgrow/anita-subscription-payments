import { createClient as createAdminClient } from '@supabase/supabase-js';
import type { Database } from 'types_db';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

const redis = Redis.fromEnv();
// Create a new ratelimiter that allows 1 requests per 3 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, '10s'),
  analytics: true
});

// Cache key prefix for email validation results
const CACHE_KEY_PREFIX = 'email_validation:';
// Cache duration in seconds (24 hours)
const CACHE_DURATION = 24 * 60 * 60;

const supabaseAdmin = createAdminClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(req: Request) {
  console.log('***********VALIDATE EMAIL***********');

  const out: { error: string | null; data: any | null } = {
    error: null,
    data: null
  };
  try {
    // Get the URL from the request
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      out.error = 'E-Mail Adresse muss angegeben werden';
      return new Response(JSON.stringify(out), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check supabase first
    const { data: emailData, error } = await supabaseAdmin
      .from('users') // or whatever your users table is called
      .select('email')
      .eq('email', email)
      .single();

    console.log('***********IS USER IN SUPABASE?***********');
    console.log({ email, emailData, error });
    console.log('******************************************');

    if (emailData != null) {
      out.error = 'E-Mail Adresse ist bereits vergeben';
      return new Response(JSON.stringify(out), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is the error code for zero rows returned
      // So if it is not this error, we want to return the error
      out.error = error.message;
      return new Response(JSON.stringify(out), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check cache first
    const cacheKey = `${CACHE_KEY_PREFIX}${email}`;
    const cachedResult = await redis.get(cacheKey);
    console.log('***********CACHE***********');
    console.log({ cacheKey, cachedResult });
    console.log('*****************************');

    if (cachedResult) {
      out.data = cachedResult;
      return new Response(JSON.stringify(out), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check rate limit
    // Get IP for rate limiting
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : 'localhost';
    const userAgent = headersList.get('user-agent');
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `${ip} - ${userAgent}`
    );

    if (!success) {
      const waitTime = Math.ceil((reset - Date.now()) / 1000);
      out.error = `Rate limit exceeded. Wait ${waitTime} seconds.`;
      return new Response(JSON.stringify(out), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString()
        }
      });
    }

    let zerobounceResponse = {
      status: 'valid',
      address: email
    };
    if (process.env.NODE_ENV === 'production') {
      // Call ZeroBounce API
      const ZEROBOUNCE_API_KEY = process.env.ZEROBOUNCE_API_KEY;
      if (ZEROBOUNCE_API_KEY) {
        const response = await fetch(
          `https://api.zerobounce.net/v2/validate?api_key=${ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}`,
          { method: 'GET' }
        );
        if (response.ok) {
          zerobounceResponse = await response.json();
        } else {
          // we dont want to fail just because the api is down
          console.error('ZeroBounce API request failed');
        }
      } else {
        // we dont want to fail just because the API key is not configured
        console.error('ZEROBOUNCE_API_KEY is not configured');
      }
    }

    // Cache the result
    await redis.set(cacheKey, JSON.stringify(zerobounceResponse), {
      ex: CACHE_DURATION
    });
    console.log('***********ZEROBOUNCE***********');
    console.log({ cacheKey, data: zerobounceResponse });
    console.log('*****************************');

    if (zerobounceResponse.status !== 'invalid') {
      out.data = zerobounceResponse;
    } else {
      out.error = 'E-Mail Adresse ungültig';
    }

    return new Response(JSON.stringify(out), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString()
      }
    });
  } catch (error) {
    console.error('E-Mail validation error:', error);
    out.error = 'Interner Serverfehler';
    return new Response(JSON.stringify(out), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
