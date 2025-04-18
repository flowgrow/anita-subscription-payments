'use client';

import { Button } from '@/components/ui/button';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { type Provider } from '@supabase/supabase-js';
import { Github } from 'lucide-react';
import { useState } from 'react';
import { getErrorRedirect } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

export default function OauthSignIn() {
  const router = useRouter();
  const oAuthProviders: OAuthProviders[] = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <Github className="h-5 w-5" />
    }
    /* Add desired OAuth providers here */
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    try {
      await signInWithOAuth(e);
    } catch (error) {
      return router.push(
        getErrorRedirect(`/`, 'Login fehlgeschlagen. Bitte versuche es erneut.')
      );
    }
    setIsSubmitting(false);
  };

  return (
    <div className="mt-8">
      {oAuthProviders.map((provider) => (
        <form
          key={provider.name}
          className="pb-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input type="hidden" name="provider" value={provider.name} />
          <Button
            hierarchy="secondary_gray"
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            <span className="mr-2">{provider.icon}</span>
            <span>{provider.displayName}</span>
          </Button>
        </form>
      ))}
    </div>
  );
}
