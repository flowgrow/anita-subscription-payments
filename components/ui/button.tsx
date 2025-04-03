import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-semibold rounded-lg transition-colors disabled:pointer-events-none [&_svg]:size-5 [&_svg]:stroke-[1.67] [&_svg]:shrink-0 focus-visible:outline-none',
  {
    variants: {
      hierarchy: {
        primary:
          'bg-button-primary-bg border-button-primary-border border border-solid text-button-primary-fg hover:bg-button-primary-bg_hover hover:text-button-primary-fg_hover hover:border-button-primary-border_hover shadow-xs focus-visible:shadow-ring-brand-shadow-xs disabled:bg-bg-disabled disabled:text-fg-disabled disabled:border-border-disabled',
        secondary_gray:
          'bg-button-secondary-bg border-button-secondary-border border border-solid text-button-secondary-fg hover:bg-button-secondary-bg_hover hover:text-button-secondary-fg_hover hover:border-button-secondary-border_hover shadow-xs focus-visible:shadow-ring-gray-shadow-xs disabled:bg-bg-primary disabled:text-fg-disabled disabled:border-border-disabled_subtle',
        secondary_color:
          'bg-button-secondary-color-bg border-button-secondary-color-border border border-solid text-button-secondary-color-fg hover:bg-button-secondary-color-bg_hover hover:text-button-secondary-color-fg_hover hover:border-button-secondary-color-border_hover shadow-xs focus-visible:shadow-ring-brand-shadow-xs disabled:bg-bg-primary disabled:text-fg-disabled disabled:border-border-disabled_subtle',
        tertiary_gray:
          'bg-transparent text-button-tertiary-fg hover:bg-button-tertiary-bg_hover hover:text-button-tertiary-fg_hover focus-visible:shadow-ring-gray disabled:text-fg-disabled',
        tertiary_color:
          'bg-transparent text-button-tertiary-color-fg hover:bg-button-tertiary-color-bg_hover hover:text-button-tertiary-color-fg_hover focus-visible:shadow-ring-brand disabled:text-fg-disabled',
        link_gray:
          'bg-transparent text-button-tertiary-fg hover:text-button-tertiary-fg_hover focus-visible:shadow-ring-gray disabled:text-fg-disabled',
        link_color:
          'bg-transparent text-button-tertiary-color-fg hover:text-button-tertiary-color-fg_hover focus-visible:shadow-ring-brand disabled:text-fg-disabled',
        destructive:
          'bg-button-primary-error-bg border-button-primary-error-border border border-solid text-fg-white hover:bg-button-primary-error-bg_hover hover:border-button-primary-error-border_hover shadow-xs focus-visible:shadow-ring-error-shadow-xs disabled:bg-bg-disabled disabled:text-fg-disabled disabled:border-border-disabled_subtle',
        destructive_secondary:
          'bg-button-tertiary-error-bg border-button-secondary-error-border border border-solid text-button-tertiary-error-fg hover:bg-button-tertiary-error-bg_hover hover:border-button-secondary-error-border_hover hover:text-button-tertiary-error-fg_hover shadow-xs focus-visible:shadow-ring-error-shadow-xs disabled:bg-bg-disabled disabled:text-fg-disabled disabled:border-border-disabled_subtle',
        destructive_tertiary:
          'bg-transparent text-button-tertiary-error-fg hover:bg-button-tertiary-error-bg_hover hover:text-button-tertiary-error-fg_hover focus-visible:shadow-ring-error disabled:text-fg-disabled',
        destructive_link:
          'bg-transparent text-button-tertiary-error-fg hover:text-button-tertiary-error-fg_hover focus-visible:shadow-ring-error disabled:text-fg-disabled'
      },
      icon_only: {
        yes: '',
        no: ''
      },
      size: {
        sm: 'gap-1.5 text-sm leading-sm',
        md: 'gap-1.5 text-sm leading-sm',
        lg: 'gap-2 text-md leading-md',
        xl: 'gap-2 text-md leading-md',
        '2xl': 'gap-3 text-lg leading-lg [&_svg]:size-6 [&_svg]:stroke-2'
      }
    },
    compoundVariants: [
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: 'sm',
        icon_only: 'yes',
        className: 'w-9 p-2'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: 'md',
        icon_only: 'yes',
        className: 'w-10 p-2.5'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: 'lg',
        icon_only: 'yes',
        className: 'w-11 p-3'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: 'xl',
        icon_only: 'yes',
        className: 'w-12 p-3.5'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: '2xl',
        icon_only: 'yes',
        className: 'w-14 p-4'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: 'sm',
        icon_only: 'no',
        className: 'px-3 py-2'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: 'md',
        icon_only: 'no',
        className: 'px-3.5 py-2.5'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: 'lg',
        icon_only: 'no',
        className: 'px-4 py-2.5'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: 'xl',
        icon_only: 'no',
        className: 'px-[18px] py-3'
      },
      {
        hierarchy: [
          'primary',
          'secondary_gray',
          'secondary_color',
          'tertiary_gray',
          'tertiary_color',
          'destructive',
          'destructive_secondary',
          'destructive_tertiary'
        ],
        size: '2xl',
        icon_only: 'no',
        className: 'px-[22px] py-4'
      },
      {
        hierarchy: ['link_gray', 'link_color', 'destructive_link'],
        className: 'p-0'
      }
    ],
    defaultVariants: {
      hierarchy: 'primary',
      size: 'lg',
      icon_only: 'no'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, hierarchy, size, icon_only, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ hierarchy, size, icon_only, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
