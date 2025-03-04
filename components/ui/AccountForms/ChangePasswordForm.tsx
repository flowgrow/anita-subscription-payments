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
import { useRouter } from 'next/navigation';
import { Input } from '../input';

export default function ChangePasswordForm() {
  const router = useRouter();
  const handleChangePasswordClick = async () => {
    return router.push('/signin/update_password');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dein Passwort</CardTitle>
        <CardDescription>Hier kannst du dein Passwort ändern</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0"></p>
          <Button variant={'outline'} onClick={handleChangePasswordClick}>
            Passwort ändern
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
