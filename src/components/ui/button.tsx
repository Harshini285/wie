import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-glow hover:scale-105 active:scale-95",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        outline: "border-2 border-border bg-transparent hover:bg-secondary hover:text-secondary-foreground hover:border-teal/50 hover:scale-105 active:scale-95",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 active:scale-95 shadow-md",
        ghost: "hover:bg-secondary hover:text-secondary-foreground hover:scale-105 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:text-teal",
        hero: "bg-gradient-to-r from-teal via-teal-light to-teal text-primary-foreground font-bold shadow-glow hover:shadow-glow-intense hover:scale-110 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
        heroOutline: "border-2 border-teal text-foreground hover:bg-teal/20 font-bold hover:border-teal-light hover:shadow-glow hover:scale-110 active:scale-95 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-teal/10 before:via-transparent before:to-teal/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        accent: "bg-gradient-to-r from-amber via-amber-light to-amber text-accent-foreground font-bold shadow-glow-amber hover:shadow-[0_0_60px_hsl(var(--amber)/0.6)] hover:scale-110 active:scale-95 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000",
        glass: "bg-surface-glass/70 backdrop-blur-md border border-border/50 text-foreground hover:bg-surface-glass/90 hover:border-teal/50 hover:shadow-glow hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-lg px-4",
        lg: "h-13 rounded-xl px-8 text-base",
        xl: "h-16 rounded-2xl px-12 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
