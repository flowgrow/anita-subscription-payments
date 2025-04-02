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
import { UserX, X } from 'lucide-react';
import Rings from '@/components/icons/Rings';

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
  const { toast } = useToast();
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
      <CardContent className="p-6 flex flex-col gap-[6px]">
        <span className="text-sm leading-sm font-medium text-text-secondary-(700)">
          Du möchtest dein Konto löschen?
        </span>
        <p className="text-balance text-sm leading-sm font-normal text-text-tertiary-(600)">
          Durch das Löschen deines Kontos werden alle deine Abonnements
          gekündigt und alle mit dir verknüpften Daten aus unserer Datenbank
          entfernt.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
          <AlertDialog
            onOpenChange={(open) => {
              if (!open) {
                setDeleteInput('');
              }
            }}
          >
            <AlertDialogTrigger asChild>
              <Button hierarchy="destructive_secondary">Konto löschen</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-hidden max-w-[400px]">
              <AlertDialogCancel asChild>
                <Button
                  className={cn(
                    buttonVariants({
                      hierarchy: 'secondary_gray',
                      size: '2xl',
                      icon_only: 'yes'
                    }),
                    'absolute top-4 right-4 w-12 h-12 p-0 rounded-md border-none shadow-none text-inherit [&_svg]:size-6'
                  )}
                >
                  <span className="sr-only">Abbrechen</span>
                  <X className="text-fg-quinary-(400)" />
                </Button>
              </AlertDialogCancel>
              <AlertDialogHeader>
                <span className="flex mb-4 relative items-center justify-center gap-2 text-featured-icon-light-fg-error bg-bg-error-secondary rounded-full p-2 w-12 h-12">
                  <UserX className="w-6 h-6" />
                  <Rings className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </span>
                <AlertDialogTitle className="text-lg leading-lg font-semibold text-text-primary-(900)">
                  Bist du dir absolut sicher?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm leading-sm font-normal text-text-tertiary-(600)">
                  Diese Aktion kann nicht rückgängig gemacht werden. Dein Konto
                  wird dauerhaft gelöscht und deine Daten werden von unseren
                  Servern entfernt.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form onSubmit={clickHandler} className="">
                <Input
                  autoFocus
                  value={deleteInput}
                  onChange={(e) => {
                    setDeleteInput(e.target.value);
                  }}
                />
                <p className="text-sm leading-sm font-normal text-text-tertiary-(600) mt-1.5">
                  Gib LÖSCHEN ein, um deine Absicht zu bestätigen.
                </p>
                <AlertDialogFooter className="mt-8">
                  <AlertDialogCancel className="w-full">
                    Abbrechen
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="submit"
                      disabled={deleteInput !== 'LÖSCHEN'}
                      hierarchy="destructive"
                      className="w-full"
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
