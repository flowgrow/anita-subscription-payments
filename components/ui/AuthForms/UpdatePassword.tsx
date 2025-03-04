'use client';

import { Button } from '@/components/ui/button';
import { updatePassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import { Input } from '../input';
import { Label } from '../label';
import { Check, Link, X } from 'lucide-react';
import Wink from '@/components/icons/Wink';
import Rings from '@/components/icons/Rings';

interface UpdatePasswordProps {
  redirectMethod: string;
}

export default function UpdatePassword({
  redirectMethod
}: UpdatePasswordProps) {
  const router = redirectMethod === 'client' ? useRouter() : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, updatePassword, router);
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
              Neues Passwort
            </h2>

            <p className="text-center text-md leading-md font-normal text-text-tertiary-(500)">
              Erstelle ein neues Passwort für dein Anita-Konto.
            </p>
            <form
              noValidate={true}
              className="mb-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="grid gap-5">
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="password"
                      className="text-sm leading-sm text-text-secondary-(700)"
                    >
                      Neues Passwort
                    </Label>
                    <Input
                      id="password"
                      placeholder="Passwort"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      className="w-full py-[10px] px-[14px] rounded-md text-md leading-md font-normal text-text-primary-(900) bg-bg-primary shadow-sm"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label
                      htmlFor="passwordConfirm"
                      className="text-sm leading-sm text-text-secondary-(700)"
                    >
                      Passwort bestätigen
                    </Label>
                    <Input
                      id="passwordConfirm"
                      placeholder="Passwort bestätigen"
                      value={passwordAgain}
                      onChange={(e) => {
                        setPasswordAgain(e.target.value);
                      }}
                      type="password"
                      name="passwordConfirm"
                      autoComplete="current-password"
                      className="w-full py-[10px] px-[14px] rounded-md text-md leading-md font-normal text-text-primary-(900) bg-bg-primary shadow-sm"
                    />
                  </div>

                  <PasswordChecklist
                    className="text-xs [&_span]:!pt-0"
                    rules={[
                      'minLength',
                      'specialChar',
                      'number',
                      'capital',
                      'match'
                    ]}
                    minLength={10}
                    value={password}
                    valueAgain={passwordAgain}
                    validTextColor="var(--valid-text)"
                    invalidTextColor="var(--invalid-text)"
                    messages={{
                      minLength: 'Mindestens 10 Zeichen lang',
                      specialChar: 'Mindestens einen Sonderzeichen',
                      number: 'Mindestens eine Zahl',
                      capital: 'Mindestens einen Großbuchstaben',
                      match: 'Passwörter stimmen nicht überein'
                    }}
                    iconComponents={{
                      ValidIcon: (
                        <Check
                          size={14}
                          className="mr-1"
                          color="var(--valid-icon)"
                        />
                      ),
                      InvalidIcon: (
                        <X
                          size={14}
                          className="mr-1"
                          color="var(--invalid-icon)"
                        />
                      )
                    }}
                    onChange={(isValid) => setDisableSubmit(!isValid)}
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full mt-4"
                  disabled={disableSubmit || isSubmitting}
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
