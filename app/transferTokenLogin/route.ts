import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getErrorRedirect, getStatusRedirect, getURL } from '@/utils/helpers';
import { loginViaTransferToken } from '@/utils/supabase/admin';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const transfer_token = requestUrl.searchParams.get('transfer_token');

  if (!transfer_token) {
    return NextResponse.redirect(
      getErrorRedirect(
        getURL('/signin'),
        'Missing Token',
        'No transfer token was provided.'
      )
    );
  }

  try {
    await loginViaTransferToken(transfer_token);
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(
      getStatusRedirect(
        getURL('/account'),
        'Success!',
        'You are now signed in.'
      )
    );
  } catch (e) {
    let msg = 'unknown';
    if (e instanceof Error) {
      msg = e.message;
    }

    return NextResponse.redirect(
      getErrorRedirect(getURL('/signin'), 'Transer Token Error', msg)
    );
  }
}
