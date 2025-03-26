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
        'Fehlender Token',
        'Es wurde kein Transfer-Token bereitgestellt.'
      )
    );
  }

  try {
    await loginViaTransferToken(transfer_token);
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(
      getStatusRedirect(
        getURL('/account'),
        'Herzlich Willkommen!',
        'Du bist jetzt erfolgreich angemeldet.'
      )
    );
  } catch (e) {
    let msg = 'unknown';
    if (e instanceof Error) {
      msg = e.message;
    }

    return NextResponse.redirect(
      getErrorRedirect(getURL('/signin'), 'Transfer-Token Fehler', msg)
    );
  }
}
