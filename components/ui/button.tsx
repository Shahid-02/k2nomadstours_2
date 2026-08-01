import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Structure is square, interaction is round: every button is a pill, so a
 * clickable thing is never mistaken for a content block.
 *
 * Sizes are deliberately larger than the shadcn defaults — this is a marketing
 * site, and the smallest target here still clears the 44px touch minimum at
 * `default` and above.
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full",
    "border border-transparent bg-clip-padding font-sans font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "outline-none select-none cursor-pointer",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
    "active:not-aria-[haspopup]:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-45",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /** The one saturated colour on the mountain. Reserved for the primary act. */
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_28px_-14px_var(--primary)] hover:brightness-110 hover:shadow-[0_16px_36px_-14px_var(--primary)]",
        /** Ink fill — secondary weight on light surfaces, inverted on granite. */
        ink: "bg-foreground text-background hover:bg-foreground/88",
        outline:
          "border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-foreground/[0.04]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_7%)]",
        ghost: "text-foreground/80 hover:bg-foreground/[0.06] hover:text-foreground",
        /** Floats over photography without punching a hole in it. */
        glass:
          "border-white/25 bg-white/10 text-white backdrop-blur-md hover:border-white/45 hover:bg-white/20",
        destructive:
          "bg-destructive/12 text-destructive hover:bg-destructive/20 focus-visible:outline-destructive",
        link: "h-auto rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 gap-1 px-3 text-micro [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 px-4 text-body-sm",
        default: "h-11 px-5 text-body-sm tracking-[0.01em]",
        lg: "h-13 px-7 text-body tracking-[0.01em]",
        xl: "h-15 px-9 text-body tracking-[0.01em]",
        icon: "size-11",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9",
        "icon-lg": "size-13",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
