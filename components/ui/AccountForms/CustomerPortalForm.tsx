'use client';

import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tables } from '@/types_db';

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

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Dein Abo</CardTitle>
          <CardDescription>
            {subscription
              ? `Du bist derzeit auf dem ${subscription?.prices?.products?.name} Plan.`
              : 'Du hast derzeit kein Abo.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {subscription ? (
            `${subscriptionPrice}/${subscription?.prices?.interval}`
          ) : (
            <Link href="/">Wähle dein Abo</Link>
          )}
        </CardContent>
        {subscription && (
          <CardFooter>
            <div className="flex flex-col items-start w-full justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">Verwalte dein Abo auf Stripe.</p>
              <Button
                variant="outline"
                disabled={isSubmitting}
                onClick={handleStripePortalRequest}
              >
                Stripe Kundenportal öffnen
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
