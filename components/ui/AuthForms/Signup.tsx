'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Label } from '../label';
import { Input } from '../input';
import PasswordChecklist from 'react-password-checklist';
import { Check, X } from 'lucide-react';

// Define prop type with allowEmail boolean
interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signUp, router);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-5">
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                name="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className="w-full p-3 rounded-md"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                autoComplete="current-password"
                className="w-full p-3 rounded-md"
              />
              <PasswordChecklist
                className="text-xs [&_span]:!pt-0"
                rules={['minLength', 'specialChar', 'number', 'capital']}
                minLength={10}
                value={password}
                validTextColor="var(--valid-text)"
                invalidTextColor="var(--invalid-text)"
                iconComponents={{
                  ValidIcon: (
                    <Check
                      size={14}
                      className="mr-1"
                      color="var(--valid-icon)"
                    />
                  ),
                  InvalidIcon: (
                    <X size={14} className="mr-1" color="var(--invalid-icon)" />
                  )
                }}
                onChange={(isValid) => setDisableSubmit(!isValid)}
              />
            </div>
          </div>
          <Button
            variant="secondary"
            type="submit"
            className="mt-1"
            disabled={disableSubmit || isSubmitting}
          >
            Sign up
          </Button>
        </div>
      </form>
      <p>Already have an account?</p>
      <p>
        <Link href="/signin/password_signin" className="font-light text-sm">
          Sign in with email and password
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="font-light text-sm">
            Sign in via magic link
          </Link>
        </p>
      )}
    </div>
  );
}
