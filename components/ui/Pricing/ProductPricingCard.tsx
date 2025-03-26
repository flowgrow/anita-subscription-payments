import type { Tables } from '@/types_db';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '../button';
import { cn } from '@/utils/cn';
import { CheckCircle, CheckCircle2, CheckIcon } from 'lucide-react';
import { HTMLMotionProps } from 'motion/react';
type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}

const intervalLabel = {
  day: 'pro Tag',
  week: 'pro Woche',
  month: 'pro Monat',
  year: 'pro Jahr',
  '': 'Kein Intervall'
};

export default function ProductPricingCard({
  product,
  billingInterval,
  disabled,
  buttonText,
  onClickHandler,
  badgeText,
  className,
  ...rest
}: {
  product: ProductWithPrices;
  billingInterval: keyof typeof intervalLabel;
  disabled: boolean;
  buttonText: string;
  className?: string;
  badgeText?: string;
  onClickHandler: (price: Price) => void;
} & HTMLMotionProps<'div'>) {
  const price = product?.prices?.find(
    (price) => price.interval === billingInterval
  );
  if (!price) return null;
  const priceString = new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: price.currency!,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return (
    <Card
      className={cn(
        'w-[384px] shrink-0 shadow-2xl rounded-2xl border-solid border flex flex-col gap-0 items-start justify-start relative overflow-hidden',
        className
      )}
      {...rest}
    >
      <CardHeader className="p-4xl pb-3xl">
        <div className="flex justify-between items-center">
          <CardTitle className="text-left text-d-sm leading-d-sm font-semibold relative">
            {product.name}
          </CardTitle>
          {badgeText && (
            <div
              className={cn(
                'rounded-full border-solid border py-0.5 px-2.5 flex flex-row gap-0 items-center justify-start shrink-0 text-center text-sm leading-sm font-medium relative text-utility-brand-700 bg-utility-brand-50 border-utilit-brand-30',
                disabled &&
                  'bg-utility-gray-50 border-utility-gray-200 text-utility-gray-700'
              )}
            >
              {badgeText}
            </div>
          )}
        </div>

        <CardDescription className="text-text-tertiary-(600) text-left text-md leading-md font-normal relative self-stretch">
          {product.description}
        </CardDescription>

        <div className="mt-4 flex flex-row gap-2 items-end justify-start shrink-0 relative">
          <div
            className={cn(
              'text-left text-[60px] leading-d-xl font-semibold relative',
              disabled && 'text-text-tertiary-(600)'
            )}
            style={{
              letterSpacing: '-0.02em'
            }}
          >
            {priceString}
          </div>
          <div
            className={cn(
              'pb-2 flex flex-row gap-0 items-start justify-start shrink-0 text-left text-md leading-md font-medium relative text-text-brand-secondary-(700)',
              disabled && 'text-text-tertiary-(600)'
            )}
          >
            {intervalLabel[billingInterval]}
          </div>
        </div>
      </CardHeader>
      <CardContent className="border-solid border-t px-4xl pt-4xl pb-5xl flex flex-col gap-3xl items-start justify-start self-stretch shrink-0 relative">
        <ul className="flex flex-col gap-lg">
          {Object.entries(product.metadata || {})
            .filter(([key]) => key.includes('feature'))
            .toSorted(([a], [b]) => {
              return a.localeCompare(b, undefined, { numeric: true });
            })
            .map(([key, value]) => (
              <li
                key={key}
                className="flex flex-row gap-2 items-center text-text-tertiary-(600)"
              >
                <CheckCircle2
                  size="24"
                  className={cn(
                    'shrink-0 text-fg-brand-primary-(600)',
                    disabled && 'text-fg-disabled'
                  )}
                />
                {value}
              </li>
            ))}
        </ul>
      </CardContent>
      <CardFooter className="w-full p-8 border-t mt-auto bg-bg-disabled">
        <Button
          className="w-full"
          type="button"
          variant={disabled ? 'outline' : 'default'}
          disabled={disabled}
          onClick={() => onClickHandler(price)}
        >
          {disabled ? 'Coming Soon' : buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
