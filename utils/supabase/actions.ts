'use server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import type { Database } from 'types_db';

const supabaseAdmin = createAdminClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export const cancelSubscription = async (token: string) => {
  console.log(await supabaseAdmin.auth.getUser(token));
};
