import * as React from 'react';

import { cn } from '@/utils/cn';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-md border border-solid border-border-primary bg-bg-primary px-3 py-2 text-md leading-md font-normal shadow-xs transition-colors placeholder:text-text-placeholder focus-visible:outline-none focus-visible:shadow-ring-brand-shadow-xs disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
