import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50",
  {
    variants: {
      variant: {
        default: "border-purple-500/40 bg-purple-500/15 text-purple-200 ring-1 ring-purple-500/20 shadow-xs",
        secondary: "border-indigo-500/40 bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-500/20 shadow-xs",
        outline: "border-white/20 bg-white/5 text-zinc-200 hover:bg-white/10 shadow-xs",
        going: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20 shadow-xs",
        maybe: "border-amber-500/40 bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/20 shadow-xs",
        notGoing: "border-rose-500/40 bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/20 shadow-xs",
        ghost: "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10",
        link: "border-transparent text-purple-400 underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
