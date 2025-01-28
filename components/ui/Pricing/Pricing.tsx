'use client';

import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NoProducts from './NoProducts';
import ProductPricingCard from './ProductPricingCard';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

const intervalTabNames = {
  day: 'Daily Billing',
  week: 'Weekly Billing',
  month: 'Monthly Billing',
  year: 'Yearly Billing',
  '': 'No Interval'
};

export default function Pricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      '/account'
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return <NoProducts />;
  }

  return (
    <section>
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold  sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-muted-foreground sm:text-center sm:text-2xl">
            Start building for free, then add a site plan to go live. Account
            plans unlock additional features.
          </p>

          {intervals.length > 1 && (
            <Tabs defaultValue="month" className="w-[400px] m-auto mt-8">
              <TabsList className="grid w-full grid-flow-col auto-cols-fr">
                {intervals.map((interval) => (
                  <TabsTrigger key={interval} value={interval || ''}>
                    {intervalTabNames[interval || '']}
                  </TabsTrigger>
                ))}
              </TabsList>

              {intervals.map((interval) => (
                <TabsContent key={interval} value={interval || ''}>
                  {products.map((product) => (
                    <ProductPricingCard
                      key={product.id}
                      product={product}
                      buttonText={subscription ? 'Manage' : 'Subscribe'}
                      onClickHandler={handleStripeCheckout}
                      billingInterval={interval || ''}
                      disabled={priceIdLoading == product.id}
                    />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    </section>
  );
}
