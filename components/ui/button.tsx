import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl font-medium text-sm transition-all duration-200 outline-none select-none cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/20 hover:from-purple-500 hover:to-indigo-500 hover:shadow-purple-500/30 border border-white/10",
        outline:
          "border border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10 hover:border-white/25 hover:text-white backdrop-blur-sm",
        secondary:
          "bg-zinc-800/80 text-zinc-100 hover:bg-zinc-700/80 border border-white/5",
        ghost:
          "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
        destructive:
          "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 focus-visible:ring-rose-500/30",
        link: "text-purple-400 underline-offset-4 hover:underline hover:text-purple-300",
      },
      size: {
        default: "h-10 px-4 py-2 gap-2 min-h-[44px] sm:min-h-[40px]",
        xs: "h-7 rounded-lg px-2.5 text-xs gap-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-8 rounded-lg px-3 text-xs gap-1.5 min-h-[36px]",
        lg: "h-11 rounded-xl px-6 text-base gap-2.5 min-h-[48px]",
        icon: "size-10 min-w-[40px] min-h-[40px]",
        "icon-xs": "size-7 rounded-lg [&_svg:not([class*='size-'])]:size-3.5",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-11 rounded-xl",
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
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
