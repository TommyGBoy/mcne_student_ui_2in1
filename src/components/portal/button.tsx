import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors disabled:cursor-not-allowed disabled:bg-disabled disabled:text-muted",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-mid",
        outline: "border border-stroke-strong bg-paper text-primary-mid hover:bg-tint",
        ghost: "bg-transparent text-body hover:bg-surface",
        chip: "rounded-full bg-primary text-on-primary font-semibold hover:bg-primary-mid",
        chipOutline:
          "rounded-full border border-primary bg-paper text-primary font-semibold hover:bg-tint",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function StatusDot({ done }: { done: boolean }) {
  return (
    <span
      className={cn("inline-block size-2 rounded-full", done ? "bg-primary" : "bg-disabled")}
      aria-hidden
    />
  );
}
