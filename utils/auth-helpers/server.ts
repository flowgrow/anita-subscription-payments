'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getURL, getErrorRedirect, getStatusRedirect } from 'utils/helpers';
import { getAuthTypes } from 'utils/auth-helpers/settings';
import { stripe } from '../stripe/config';
import { deleteUser as deleteUserWithId } from '../supabase/admin';

function isValidEmail(email: string) {
  var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

export async function redirectToPath(path: string) {
  return redirect(path);
}

export async function SignOut(formData: FormData) {
  const pathName = String(formData.get('pathName')).trim();

  const supabase = createClient();
  const { error } = await supabase.auth.signOut({ scope: 'local' });

  if (error) {
    return getErrorRedirect(
      pathName,
      'Hmm... Something went wrong.',
      'You could not be signed out.'
    );
  }

  return '/signin';
}

export async function signInWithEmail(formData: FormData) {
  const cookieStore = cookies();
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Ungültige E-mail Adresse.',
      'Bitte versuche es erneut.'
    );
  }

  const supabase = createClient();
  let options = {
    emailRedirectTo: callbackURL,
    shouldCreateUser: true
  };

  // If allowPassword is false, do not create a new user
  const { allowPassword } = getAuthTypes();
  if (allowPassword) options.shouldCreateUser = false;
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: options
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Du konntest dich nicht einloggen.',
      error.message
    );
  } else if (data) {
    cookieStore.set('preferredSignInView', 'email_signin', { path: '/' });
    redirectPath = getStatusRedirect(
      '/signin/email_signin',
      'Super!',
      'Bitte überprüfe deine E-mail Adresse für einen Magic Link. Du kannst diese Seite jetzt schließen.',
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/email_signin',
      'Hmm... Etwas ist schief gelaufen.',
      'Du konntest dich nicht einloggen.'
    );
  }

  return redirectPath;
}

export async function requestPasswordUpdate(formData: FormData) {
  const callbackURL = getURL('/auth/reset_password');

  // Get form data
  const email = String(formData.get('email')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Ungültige E-mail Adresse.',
      'Bitte versuche es erneut.'
    );
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: callbackURL
  });

  if (error) {
    console.error(error);
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      error.status == 429
        ? 'Zu viele Anfragen.'
        : 'Hmm... Etwas ist schief gelaufen.',
      error.status == 429
        ? 'Bitte warte ein paar Sekunden und versuche es erneut.'
        : error.message
    );
  } else if (data) {
    redirectPath = getStatusRedirect(
      '/signin/forgot_password',
      'Super!',
      'Bitte überprüfe deine E-mail Adresse für einen Link zum Zurücksetzen deines Passworts. Du kannst diese Seite jetzt schließen.',
      true
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/forgot_password',
      'Hmm... Etwas ist schief gelaufen.',
      'Das Passwort-Reset-E-mail konnte nicht gesendet werden.'
    );
  }

  return redirectPath;
}

export async function signInWithPassword(formData: FormData) {
  const cookieStore = cookies();
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  const supabase = createClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Login fehlgeschlagen.',
      error.message
    );
  } else if (data.user) {
    cookieStore.set('preferredSignInView', 'password_signin', { path: '/' });
    redirectPath = getStatusRedirect(
      '/',
      'Super!',
      'Du bist jetzt angemeldet.'
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/password_signin',
      'Hmm... Etwas ist schief gelaufen.',
      'Du konntest dich nicht einloggen.'
    );
  }

  return redirectPath;
}

export async function signUp(formData: FormData) {
  const callbackURL = getURL('/auth/callback');

  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();
  let redirectPath: string;

  if (!isValidEmail(email)) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Ungültige E-mail Adresse.',
      'Bitte versuche es erneut.'
    );
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: callbackURL
    }
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Anmeldung fehlgeschlagen.',
      error.message
    );
  } else if (data.session) {
    redirectPath = getStatusRedirect(
      '/',
      'Super!',
      'Du bist jetzt angemeldet.'
    );
  } else if (
    data.user &&
    data.user.identities &&
    data.user.identities.length == 0
  ) {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Anmeldung fehlgeschlagen.',
      'Es gibt bereits ein Konto mit dieser E-mail Adresse. Versuche dein Passwort zurückzusetzen.'
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/',
      'Super!',
      'Bitte überprüfe deine E-mail Adresse für einen Bestätigungslink. Du kannst diese Seite jetzt schließen.'
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/signup',
      'Hmm... Etwas ist schief gelaufen.',
      'Du konntest dich nicht anmelden.'
    );
  }

  return redirectPath;
}

export async function updatePassword(formData: FormData) {
  const password = String(formData.get('password')).trim();
  const passwordConfirm = String(formData.get('passwordConfirm')).trim();
  let redirectPath: string;

  // Check that the password and confirmation match
  if (password !== passwordConfirm) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Dein Passwort konnte nicht aktualisiert werden.',
      'Passwörter stimmen nicht überein.'
    );
  }

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    password
  });

  if (error) {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Dein Passwort konnte nicht aktualisiert werden.',
      error.message
    );
  } else if (data.user) {
    redirectPath = getStatusRedirect(
      '/account',
      'Super!',
      'Dein Passwort wurde aktualisiert.'
    );
  } else {
    redirectPath = getErrorRedirect(
      '/signin/update_password',
      'Hmm... Etwas ist schief gelaufen.',
      'Dein Passwort konnte nicht aktualisiert werden.'
    );
  }

  return redirectPath;
}

export async function cancelSubscription() {
  const supabase = createClient();
  const {
    error,
    data: { user }
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error('There is no logged in user present.');
  }

  let {
    count,
    data: subscriptions,
    error: subscriptionError
  } = await supabase.from('subscriptions').select('*').eq('user_id', user.id);

  if (count == 0 || subscriptionError) {
    throw new Error('Could not find subscriptions for user.');
  }

  subscriptions?.forEach(async (subscription) => {
    if (subscription.status !== 'canceled') {
      let cancelResult = await stripe.subscriptions.cancel(subscription.id);
      if (cancelResult.status != 'canceled') {
        throw new Error(
          'Could not cancel subscription.' + JSON.stringify(cancelResult)
        );
      }
    }
  });
}

export async function deleteUser() {
  const supabase = createClient();
  const {
    error,
    data: { user }
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error('There is no logged in user present.');
  }

  let up = await supabase
    .from('to_delete')
    .insert([{ id: user.id }])
    .select();

  let { error: signoutError } = await supabase.auth.signOut({ scope: 'local' });

  if (signoutError) {
    throw new Error('There was an error while logging out.');
  }

  return await deleteUserWithId(user.id);
}

export async function updateEmail(formData: FormData) {
  // Get form data
  const newEmail = String(formData.get('newEmail')).trim();

  // Check that the email is valid
  if (!isValidEmail(newEmail)) {
    return getErrorRedirect(
      '/account',
      'Deine E-mail Adresse konnte nicht aktualisiert werden.',
      'Ungültige E-mail Adresse.'
    );
  }

  const supabase = createClient();

  const callbackUrl = getURL(
    getStatusRedirect(
      '/account',
      'Super!',
      `Deine E-mail Adresse wurde aktualisiert.`
    )
  );

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: callbackUrl
    }
  );

  if (error) {
    return getErrorRedirect(
      '/account',
      'Deine E-mail Adresse konnte nicht aktualisiert werden.',
      error.message
    );
  } else {
    return getStatusRedirect(
      '/account',
      'Bestätigungs-emails gesendet.',
      `Du musst die Aktualisierung bestätigen, indem du die Links in beiden E-mail Adressen klickst.`
    );
  }
}

export async function updateName(formData: FormData) {
  // Get form data
  const fullName = String(formData.get('fullName')).trim();

  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    data: { full_name: fullName }
  });

  if (error) {
    return getErrorRedirect(
      '/account',
      'Dein Name konnte nicht aktualisiert werden.',
      error.message
    );
  } else if (data.user) {
    return getStatusRedirect(
      '/account',
      'Super!',
      'Dein Name wurde aktualisiert.'
    );
  } else {
    return getErrorRedirect(
      '/account',
      'Hmm... Etwas ist schief gelaufen.',
      'Dein Name konnte nicht aktualisiert werden.'
    );
  }
}
