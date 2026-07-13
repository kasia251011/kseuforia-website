import { cn } from '@/utilities/ui';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          'bg-transparent text-primary hover:bg-primary/10 border border-primary rounded-full uppercase',
        destructive: 'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90', // default - to change
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground', // default - to change
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80', // default - to change
        ghost: 'hover:bg-accent hover:text-accent-foreground', // default - to change
        link: 'text-primary underline-offset-4 hover:underline', // default - to change
      },
      size: {
        clear: '',
        default: 'h-12 px-5 py-1 has-[>svg]:px-3 border-3 font-lg font-semibold',
        sm: 'h-9 rounded-md px-3 has-[>svg]:px-2.5', // default - to change
        lg: 'h-11 rounded-md px-8 has-[>svg]:px-4', // default - to change
        icon: 'size-10', // default - to change
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ asChild = false, className, size, variant, ...props }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), "transition-colors")}
      {...props}
    />
  );
};

export { Button, buttonVariants };
