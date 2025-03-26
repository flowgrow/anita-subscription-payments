import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const INTERNAL_API_KEY = Deno.env.get('INTERNAL_API_KEY');
const APP_URL = Deno.env.get('APP_URL') || 'http://localhost:3000';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: {
    id: string;
    email: string;
    [key: string]: any;
  };
  schema: string;
  old_record: null | Record<string, any>;
}

serve(async (req) => {
  try {
    // Get the request body
    const payload: WebhookPayload = await req.json();

    // Only proceed if this is a new user creation
    if (payload.type !== 'INSERT' || payload.table !== 'users') {
      return new Response(
        JSON.stringify({ message: 'Not a user creation event' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract the user's email
    const { email } = payload.record;

    if (!email) {
      throw new Error('No email found in user record');
    }

    // Call the new-signup endpoint
    const signupUrl = new URL(`${APP_URL}/api/new-signup`);
    signupUrl.searchParams.append('email', email);

    const response = await fetch(signupUrl.toString(), {
      method: 'GET',
      headers: {
        auth_token: INTERNAL_API_KEY || '',
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    console.log('New signup notification sent for:', email);
    console.log('Response:', result);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'New signup processed',
        email
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing new user signup:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});
