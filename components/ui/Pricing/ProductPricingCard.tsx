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

type Product = Tables<'products'>;
type Price = Tables<'prices'>;
interface ProductWithPrices extends Product {
  prices: Price[];
}

export default function ProductPricingCard({
  product,
  billingInterval,
  disabled,
  buttonText,
  onClickHandler
}: {
  product: ProductWithPrices;
  billingInterval: string;
  disabled: boolean;
  buttonText: string;
  onClickHandler: (price: Price) => void;
}) {
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
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <span className="text-5xl font-extrabold white">{priceString}</span>
        <span className="text-base font-medium text-muted-foreground">
          /{billingInterval}
        </span>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="button"
          disabled={disabled}
          onClick={() => onClickHandler(price)}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
