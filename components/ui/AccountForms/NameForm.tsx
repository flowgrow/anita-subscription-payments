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
import { updateName } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../input';

export default function NameForm({ userName }: { userName: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // Check if the new name is the same as the old name
    if (e.currentTarget.fullName.value === userName) {
      e.preventDefault();
      setIsSubmitting(false);
      return;
    }
    handleRequest(e, updateName, router);
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dein Name</CardTitle>
        <CardDescription>
          Bitte gib deinen vollen Namen ein, oder einen Namen, mit dem du dich
          wohlfühlst.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form id="nameForm" onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="text"
            name="fullName"
            defaultValue={userName}
            placeholder="Dein Name"
            maxLength={64}
          />
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
          <p></p>
          <Button
            hierarchy="secondary_gray"
            type="submit"
            form="nameForm"
            disabled={isSubmitting}
          >
            Namen aktualisieren
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
