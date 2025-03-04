'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { cancelSubscription, deleteUser } from '@/utils/auth-helpers/server';
import { useRouter } from 'next/navigation';
import { getStatusRedirect } from '@/utils/helpers';
import { Tables } from '@/types_db';
import { useToast } from '../Toasts/use-toast';
import { ToastAction } from '../Toasts/toast';
import { useCallback, useState } from 'react';
import { Input } from '../input';
import { cn } from '@/utils/cn';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function DeleteAccount({ subscription }: Props) {
  const router = useRouter();
  const { toast, toasts } = useToast();
  const [deleteInput, setDeleteInput] = useState('');

  const clickHandler = useCallback(
    async (
      e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
    ) => {
      console.log('delete');
      e.preventDefault();
      try {
        if (subscription) {
          console.log(subscription);
          await cancelSubscription();
        }
        console.log('user');
        await deleteUser();

        router.push(
          getStatusRedirect('/', 'Success!', 'We have deleted your account.')
        );
      } catch (e) {
        if (e instanceof Error) {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: e.message,
            action: (
              <ToastAction onClick={clickHandler} altText="Try again">
                Try again
              </ToastAction>
            )
          });
        } else {
          console.error(e);
        }
      }
    },
    []
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>Danger Zone!</CardDescription>
      </CardHeader>
      <CardContent className="text-balance">
        By deleting your Account, we will cancel all your subscriptions and
        remove all data associated with you from our database.
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0"></p>
          <AlertDialog
            onOpenChange={(open) => {
              if (!open) {
                setDeleteInput('');
              }
            }}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogCancel asChild>
                <Button
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute top-4 right-4 w-6 h-6 p-0 rounded-md border-none shadow-none text-inherit'
                  )}
                >
                  <span className="sr-only">Cancel</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#98A2B3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </AlertDialogCancel>
              <AlertDialogHeader>
                <AlertDialogTitle>Bist Du dir absolut sicher?</AlertDialogTitle>
                <AlertDialogDescription>
                  Diese Aktion kann nicht rückgängig gemacht werden. Dein Konto
                  wird dauerhaft gelöscht und deine Daten werden von unseren
                  Servern entfernt.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form onSubmit={clickHandler} className="">
                <Input
                  value={deleteInput}
                  onChange={(e) => {
                    setDeleteInput(e.target.value);
                  }}
                />
                <p className="text-muted-foreground text-sm mt-1.5">
                  Gib <span className="bg-muted p-1 rounded-md">LÖSCHEN</span>{' '}
                  ein, um deine Absicht zu bestätigen.
                </p>
                <AlertDialogFooter className="mt-8">
                  <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="submit"
                      disabled={deleteInput !== 'LÖSCHEN'}
                      className={buttonVariants({ variant: 'destructive' })}
                      onClick={clickHandler}
                    >
                      Konto löschen
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
