import type { Database } from 'types_db';
import { Redis } from '@upstash/redis';
import { headers } from 'next/headers';

const redis = Redis.fromEnv();

const CACHE_KEY_PREFIX = 'email_validation:';
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

export async function GET(req: Request) {
  console.log('***********EMAIL SIGNED UP***********');

  const out: { error: string | null; data: any | null } = {
    error: null,
    data: null
  };

  // Check auth token
  const headersList = headers();
  const authToken = headersList.get('auth_token');

  if (!authToken || authToken !== INTERNAL_API_KEY) {
    out.error = 'Unauthorized';
    return new Response(JSON.stringify(out), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(req.url);
  const email = url.searchParams.get('email');
  // Check cache first
  const cacheKey = `${CACHE_KEY_PREFIX}${email}`;
  const cachedResult = await redis.del(cacheKey);
  out.data = cachedResult;

  return new Response(JSON.stringify(out), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
