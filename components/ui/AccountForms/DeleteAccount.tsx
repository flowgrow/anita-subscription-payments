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
      <CardContent className="space-y-2 text-balance">
        By deleting your Account, we will cancel all your subscriptions and
        remove all data associated with you from our database.
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
          <p className="pb-4 sm:pb-0"></p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form onSubmit={clickHandler} className="space-y-2">
                <p className="text-muted-foreground text-sm">
                  Type <span className="bg-muted p-1 rounded-md">DELETE</span>{' '}
                  to confirm your intent.
                </p>
                <Input
                  value={deleteInput}
                  onChange={(e) => {
                    setDeleteInput(e.target.value);
                  }}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="submit"
                      disabled={deleteInput !== 'DELETE'}
                      className={buttonVariants({ variant: 'destructive' })}
                    >
                      Yes, delete account.
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
