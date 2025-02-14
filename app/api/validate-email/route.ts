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
  const out: { error: string | null; data: any | null } = {
    error: null,
    data: null
  };
  try {
    // Get the URL from the request
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    if (!email) {
      out.error = 'Email parameter is required';
      return new Response(JSON.stringify(out), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check supabase first
    const { data: emailData, error } = await supabaseAdmin.rpc(
      'get_user_id_by_email',
      { user_email: email }
    );

    console.log('***********IS USER IN SUPABASE?***********');
    console.log({ email, emailData, error });
    console.log('******************************************');

    if (error) {
      out.error = 'Email is invalid';
      return new Response(JSON.stringify(out), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (emailData != null) {
      out.error = 'Email is already in use';
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

    // Call ZeroBounce API
    const ZEROBOUNCE_API_KEY = process.env.ZEROBOUNCE_API_KEY;
    if (!ZEROBOUNCE_API_KEY) {
      throw new Error('ZEROBOUNCE_API_KEY is not configured');
    }

    const response = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}`,
      { method: 'GET' }
    );

    if (!response.ok) {
      throw new Error('ZeroBounce API request failed');
    }

    const data = await response.json();
    // const data = {
    //   status: email.endsWith('@example.com') ? 'valid' : 'invalid',
    //   address: email,
    //   domain: 'example.com',
    //   mx_found: true,
    //   smtp_check: true,
    //   did_you_mean: null
    // };

    // Cache the result
    await redis.set(cacheKey, JSON.stringify(data), { ex: CACHE_DURATION });
    console.log('***********ZEROBOUNCE***********');
    console.log({ cacheKey, data });
    console.log('*****************************');

    if (data.status !== 'invalid') {
      out.data = data;
    } else {
      out.error = 'Email is invalid';
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
    console.error('Email validation error:', error);
    out.error = 'Internal server error';
    return new Response(JSON.stringify(out), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
