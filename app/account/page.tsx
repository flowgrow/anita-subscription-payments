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
import Balancer from 'react-wrap-balancer';
import { Button } from '@/components/ui/button';
import { Circle } from 'lucide-react';
import { Fragment } from 'react';

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

  const variants = [
    'primary',
    'secondary_gray',
    'secondary_color',
    'tertiary_gray',
    'tertiary_color',
    'link_gray',
    'link_color',
    'destructive',
    'destructive_secondary',
    'destructive_tertiary',
    'destructive_link'
  ];
  const sizes = ['sm', 'md', 'lg', 'xl', '2xl'];
  const icon_only = [true, false];

  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:items-center sm:flex sm:flex-col">
          <span className="text-md leading-md font-semibold text-text-brand-secondary-(700) mb-3">
            Anita Applikation
          </span>
          <h1 className="text-d-lg font-semibold leading-d-lg text-text-primary-(900)  sm:text-center sm:text-6xl">
            Kontoeinstellungen
          </h1>
          <p className="max-w-4xl m-auto mt-5 text-xl leading-xl font-normal text-text-tertiary-(600) sm:text-center sm:text-2xl">
            <Balancer>
              Hier kannst du dein Anita-Abo und deine persönlichen Informationen
              verwalten.
            </Balancer>
          </p>
        </div>
      </div>
      <div className="p-4 space-y-8 w-full max-w-2xl m-auto">
        <CustomerPortalForm subscription={subscription} />
        {/* <NameForm userName={user.user_metadata.full_name ?? ''} /> */}
        <EmailForm userEmail={user.email} />
        <ChangePasswordForm />
        <DeleteAccount subscription={subscription} />
      </div>
    </section>
  );
}
