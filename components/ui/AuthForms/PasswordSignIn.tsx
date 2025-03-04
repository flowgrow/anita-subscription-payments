'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { Input } from '../input';
import { Label } from '../label';
import Image from 'next/image';
import Wink from '@/components/icons/Wink';
import Rings from '@/components/icons/Rings';
import Balancer from 'react-wrap-balancer';

// Define prop type with allowEmail boolean
interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod
}: PasswordSignInProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') ?? '');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  return (
    <section className="flex flex-col items-center justify-center flex-1 self-stretch min-w-[480px] max-w-full">
      <div className="px-8 flex flex-col items-center self-stretch h-[80vh] justify-center">
        <div className="flex flex-col gap-8 items-stretch w-full max-w-[360px]">
          <div className="flex flex-col items-center w-auto relative pointer-events-none">
            <Wink className="w-16 h-16" />
            <Rings className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-text-primary-(900) text-d-sm leading-d-sm font-semibold self-stretch text-center">
            Kennen wir uns schon?
          </h2>

          <p className="text-center text-md leading-md font-normal text-text-tertiary-(500)">
            <Balancer>Melde dich an um dein Anita-Konto zu verwalten.</Balancer>
          </p>
          <form className="contents" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-sm leading-sm text-text-secondary-(700)"
              >
                Email
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
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-sm leading-sm text-text-secondary-(700)"
              >
                Password
              </Label>
              <Input
                id="password"
                placeholder="••••••••••"
                type="password"
                name="password"
                autoComplete="current-password"
                className="w-full py-[10px] px-[14px] rounded-md text-md leading-md font-normal text-text-primary-(900) bg-bg-primary shadow-sm"
              />
            </div>
            <Button
              type="submit"
              variant="default"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              Einloggen
            </Button>
          </form>
        </div>

        <p className="mt-10 flex flex-col items-center max-w-80 text-text-tertiary-(600) text-sm leading-sm font-normal text-center">
          <Link
            href={`/signin/forgot_password?email=${email}`}
            className="text-text-brand-tertiary-(600) no-underline font-medium"
          >
            Passwort vergessen?
          </Link>
        </p>

        <p className="mt-10 flex flex-col items-center max-w-80 text-text-tertiary-(600) text-sm leading-sm font-normal text-center">
          Du hast noch keinen Account?{' '}
          <Link
            href="/signin/signup"
            className="text-text-brand-tertiary-(600) no-underline font-medium"
          >
            <Balancer>
              Lade unsere Browser-Extension herunter und erstelle dein Konto.
            </Balancer>
          </Link>
        </p>
      </div>
    </section>
  );
}
