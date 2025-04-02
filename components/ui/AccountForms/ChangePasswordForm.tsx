'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Input } from '../input';
import { PasswordInput } from '../password-input';
import { useState } from 'react';
export default function ChangePasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const password = formData.get('password');
    localStorage.setItem('newPassword', password as string);

    router.push(`/signin/update_password`);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <form
          id="passwordForm"
          className="p-6 flex flex-col gap-[6px]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label
            htmlFor="password"
            className="text-sm font-medium leading-sm text-text-secondary-(700)"
          >
            Dein Passwort
          </label>
          <PasswordInput
            name="password"
            placeholder="••••••••••••"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="m-0 text-sm leading-sm font-normal text-text-tertiary-(600)">
            Hier kannst du dein Passwort ändern.
          </p>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
          <Button
            form="passwordForm"
            hierarchy="secondary_color"
            type="submit"
            disabled={password == '' ? true : undefined}
          >
            Passwort ändern
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
