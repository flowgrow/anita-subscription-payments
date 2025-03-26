'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { requestPasswordUpdate } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Label } from '../label';
import { Input } from '../input';
import Wink from '@/components/icons/Wink';
import Rings from '@/components/icons/Rings';

// Define prop type with allowEmail boolean
interface ForgotPasswordProps {
  allowEmail: boolean;
  redirectMethod: string;
  disableButton?: boolean;
}

export default function ForgotPassword({
  allowEmail,
  redirectMethod,
  disableButton
}: ForgotPasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, requestPasswordUpdate, router);
    setIsSubmitting(false);
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center flex-1 self-stretch min-w-[480px] max-w-full">
        <div className="px-8 flex flex-col items-center self-stretch h-[80vh] justify-center">
          <div className="flex flex-col gap-8 items-stretch w-full max-w-[360px]">
            <div className="flex flex-col items-center w-auto relative pointer-events-none">
              <Wink className="w-16 h-16" />
              <Rings className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>

            <h2 className="text-text-primary-(900) text-d-sm leading-d-sm font-semibold self-stretch text-center">
              Passwort vergessen?
            </h2>

            <p className="text-center text-md leading-md font-normal text-text-tertiary-(500)">
              Gib deine E-Mail-Adresse ein und ich sende dir einen Link um dein
              Passwort zurückzusetzen.
            </p>

            <form
              noValidate={true}
              className="mb-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label
                    htmlFor="email"
                    className="text-sm leading-sm text-text-secondary-(700)"
                  >
                    E-mail Adresse
                  </Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    className="w-full py-[10px] px-[14px] rounded-md text-md leading-md font-normal text-text-primary-(900) bg-bg-primary shadow-sm"
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full mt-4"
                  disabled={isSubmitting || email === ''}
                >
                  Link anfordern
                </Button>
              </div>
            </form>
          </div>

          <p className="mt-10 flex flex-col items-center max-w-80 text-text-tertiary-(600) text-sm leading-sm font-normal text-center">
            <Link
              href={`/signin/password_signin?email=${email}`}
              className="text-text-brand-tertiary-(600) no-underline font-medium"
            >
              Passwort wieder eingefallen?
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
