'use client';

import { Button } from '@/components/ui/button';
import { updatePassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import { Input } from '../input';
import { Label } from '../label';
import { Check, X } from 'lucide-react';

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
    <div className="my-8">
      <form
        noValidate={true}
        className="mb-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="grid gap-5">
          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
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
            </div>
            <div className="grid gap-3">
              <Label htmlFor="passwordConfirm">Confirm New Password</Label>
              <Input
                id="passwordConfirm"
                placeholder="Password"
                value={passwordAgain}
                onChange={(e) => {
                  setPasswordAgain(e.target.value);
                }}
                type="password"
                name="passwordConfirm"
                autoComplete="current-password"
                className="w-full p-3 rounded-md"
              />
            </div>

            <PasswordChecklist
              className="text-xs [&_span]:!pt-0"
              rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
              minLength={10}
              value={password}
              valueAgain={passwordAgain}
              validTextColor="var(--valid-text)"
              invalidTextColor="var(--invalid-text)"
              iconComponents={{
                ValidIcon: (
                  <Check size={14} className="mr-1" color="var(--valid-icon)" />
                ),
                InvalidIcon: (
                  <X size={14} className="mr-1" color="var(--invalid-icon)" />
                )
              }}
              onChange={(isValid) => setDisableSubmit(!isValid)}
            />
          </div>
          <Button
            variant="secondary"
            type="submit"
            className="mt-1"
            disabled={disableSubmit || isSubmitting}
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
}
