import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 sm:h-10 w-full min-w-0 rounded-xl border border-white/15 bg-zinc-900/60 px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 transition-all duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-200 focus:border-purple-500 focus:bg-zinc-900/90 focus:ring-2 focus:ring-purple-500/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-rose-500 aria-invalid:ring-rose-500/25",
        className
      )}
      {...props}
    />
  )
}

export { Input }
