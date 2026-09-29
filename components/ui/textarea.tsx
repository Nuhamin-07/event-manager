import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[100px] w-full rounded-xl border border-white/15 bg-zinc-900/60 px-3.5 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 transition-all duration-200 outline-none focus:border-purple-500 focus:bg-zinc-900/90 focus:ring-2 focus:ring-purple-500/25 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-rose-500 aria-invalid:ring-rose-500/25 resize-y",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
