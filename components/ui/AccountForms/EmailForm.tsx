'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { updateEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../input';

export default function EmailForm({
  userEmail
}: {
  userEmail: string | undefined;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMail, setNewMail] = useState(userEmail ?? '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new email is the same as the old email
    if (e.currentTarget.newEmail.value === userEmail) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateEmail, router);
    setIsSubmitting(false);
  };

  return (
    <Card>
      <form
        className="p-6 flex flex-col gap-[6px]"
        id="emailForm"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label
          className="text-sm font-medium leading-sm text-text-secondary-(700)"
          htmlFor="newEmail"
        >
          E-Mail Adresse
        </label>
        <Input
          type="text"
          name="newEmail"
          id="newEmail"
          value={newMail}
          onChange={(e) => setNewMail(e.target.value)}
          placeholder="Deine E-Mail Adresse"
          maxLength={64}
        />
        <p className="m-0 text-sm leading-sm font-normal text-text-tertiary-(600)">
          Wir werden dir eine E-Mail senden, um die Änderung zu verifizieren.
        </p>
      </form>

      <CardFooter>
        <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
          <Button
            hierarchy="secondary_gray"
            type="submit"
            form="emailForm"
            disabled={newMail === userEmail || isSubmitting}
          >
            E-Mail Adresse ändern
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
