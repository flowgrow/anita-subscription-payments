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
import { Json, Tables } from '@/types_db';

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

const intervalTranslation = {
  day: 'pro Tag',
  week: 'pro Woche',
  month: 'im Monat',
  year: 'im Jahr',
  '': ''
};

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('de-de', {
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

  const metadata = subscription?.prices?.products?.metadata;
  let description = '';
  if (metadata && typeof metadata === 'object' && !Array.isArray(metadata)) {
    description = (metadata as { description?: Json }).description as string;
  }

  return (
    <>
      <Card className="w-full ">
        <div className="flex flex-row gap-4 p-6">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-md font-medium">
              Abonnement:{' '}
              {subscription ? (
                <span className="text-brand-600">
                  {subscription?.prices?.products?.name}
                </span>
              ) : (
                <span className="text-text-quarterary-(500)">Kein Abo</span>
              )}
            </CardTitle>

            <p className="text-sm font-regular leading-sm text-text-tertiary-(600)">
              {description}
            </p>
          </div>
          <div className="align-self-stretch w-[1px] bg-border-secondary" />
          <div className="flex flex-col min-w-[100px] justify-center items-center">
            {subscription ? (
              <>
                <div className="text-d-sm font-semibold leading-d-sm text-text-brand-primary-(900)">
                  {subscriptionPrice}
                </div>
                <span className="text-sm font-regular leading-sm text-text-brand-secondary-(700)">
                  {
                    intervalTranslation[
                      subscription?.prices
                        ?.interval as keyof typeof intervalTranslation
                    ]
                  }
                </span>
              </>
            ) : (
              <Link href="/">Wähle dein Abo</Link>
            )}
          </div>
        </div>
        {subscription && (
          <CardFooter>
            <Button
              hierarchy="secondary_color"
              disabled={isSubmitting}
              onClick={handleStripePortalRequest}
            >
              Abo verwalten
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
