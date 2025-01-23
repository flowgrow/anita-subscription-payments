import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import {
  getSession,
  getUserDetails,
  getSubscription,
  getUser
} from '@/utils/supabase/queries';
import ChangePasswordForm from '@/components/ui/AccountForms/ChangePasswordForm';
import DeleteAccount from '@/components/ui/AccountForms/DeleteAccount';

export default async function Account() {
  const supabase = createClient();
  const [session, user, userDetails, subscription] = await Promise.all([
    getSession(supabase),
    getUser(supabase),
    getUserDetails(supabase),
    getSubscription(supabase)
  ]);

  if (!user) {
    return redirect('/signin');
  }

  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold  sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-muted-foreground sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4 space-y-8 w-full max-w-3xl m-auto">
        <CustomerPortalForm subscription={subscription} />
        <NameForm userName={user.user_metadata.full_name ?? ''} />
        <EmailForm userEmail={user.email} />
        <ChangePasswordForm />
        <DeleteAccount subscription={subscription} />
      </div>
    </section>
  );
}
