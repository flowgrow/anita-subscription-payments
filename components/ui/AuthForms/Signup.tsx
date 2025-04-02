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
import Wink from '@/components/icons/Wink';
import Rings from '@/components/icons/Rings';
import Balancer from 'react-wrap-balancer';

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
    <>
      <section className="flex flex-col items-center justify-center flex-1 self-stretch min-w-[480px] max-w-full">
        <div className="px-8 flex flex-col items-center self-stretch min-h-[80vh] justify-center">
          <div className="flex flex-col gap-8 items-stretch w-full max-w-[360px]">
            <div className="flex flex-col items-center w-auto relative pointer-events-none">
              <Wink className="w-16 h-16" />
              <Rings className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-text-primary-(900) text-d-sm leading-d-sm font-semibold self-stretch text-center">
              Anita-Konto erstellen
            </h2>

            <p className="text-center text-md leading-md font-normal text-text-tertiary-(500)">
              <Balancer>
                Wir freuen uns, dass du dich für Anita entschieden hast.
              </Balancer>
            </p>
            <p className="text-center text-md leading-md font-normal text-text-tertiary-(500)">
              Bitte nutze unsere Browser-Extension um dein Konto zu erstellen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
