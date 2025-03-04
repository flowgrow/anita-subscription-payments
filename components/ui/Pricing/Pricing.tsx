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
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import Balancer from 'react-wrap-balancer';
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
  day: 'Täglich',
  week: 'Wöchentlich',
  month: 'Monatlich',
  year: 'Jährlich',
  '': 'Kein Intervall'
};

export default function Pricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  )
    .filter(Boolean)
    .toSorted();

  const router = useRouter();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const [tab, setTab] = useState('month');

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
      <div className="px-8 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col align-center">
          <h1 className="text-4xl font-extrabold  text-center sm:text-6xl">
            Abos für ein
            <br />
            barrierefreies Internet.
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-muted-foreground text-center sm:text-2xl">
            <Balancer>Einfache und transparente Pakete für alle.</Balancer>
          </p>
        </div>
      </div>

      <div className="w-full">
        <AnimatePresence>
          <LayoutGroup>
            {intervals.length > 1 && (
              <Tabs
                value={tab}
                onValueChange={setTab}
                className="flex flex-col gap-24 mt-8"
              >
                <TabsList asChild>
                  <motion.div
                    layout
                    className="grid m-auto grid-flow-col auto-cols-fr"
                  >
                    {intervals.map((interval) => (
                      <TabsTrigger
                        key={interval}
                        value={interval || ''}
                        className="relative"
                      >
                        <span className="relative z-10">
                          {intervalTabNames[interval || '']}
                        </span>
                        {interval === tab && (
                          <motion.span
                            className="absolute inset-0 bg-background shadow-sm rounded-md z-0"
                            layoutId="tab-indicator"
                          />
                        )}
                      </TabsTrigger>
                    ))}
                  </motion.div>
                </TabsList>

                <div className="max-w-full m-auto overflow-x-auto no-scrollbar pb-20">
                  {intervals.map((interval) => (
                    <TabsContent
                      className="flex justify-start gap-8 after:content-[''] after:w-8 after:h-full before:content-[''] before:w-8 before:h-full"
                      key={interval}
                      value={interval || ''}
                    >
                      {products.map((product) => (
                        <ProductPricingCard
                          layout={true}
                          layoutId={`product-${product.id}`}
                          animate={{ opacity: 1 }}
                          initial={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          key={product.id}
                          product={product}
                          buttonText={subscription ? 'Verwalten' : 'Abonnieren'}
                          onClickHandler={handleStripeCheckout}
                          billingInterval={interval || ''}
                          badgeText={product.metadata?.badge ?? undefined}
                          disabled={
                            priceIdLoading == product.id ||
                            product.metadata?.badge.includes('Soon')
                          }
                        />
                      ))}
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            )}
          </LayoutGroup>
        </AnimatePresence>
      </div>
    </section>
  );
}
