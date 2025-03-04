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
      <CardHeader>
        <CardTitle>Deine Email-Adresse</CardTitle>
        <CardDescription>
          Bitte gib die Email-Adresse ein, mit der du dich anmelden möchtest.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form id="emailForm" onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            name="newEmail"
            value={newMail}
            onChange={(e) => setNewMail(e.target.value)}
            placeholder="Deine Email-Adresse"
            maxLength={64}
          />
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0">
            Wir senden dir eine Email, um die Änderung zu bestätigen.
          </p>
          <Button
            variant="outline"
            type="submit"
            form="emailForm"
            disabled={newMail === userEmail || isSubmitting}
          >
            Email-Adresse aktualisieren
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
