import Link from "next/link";
import { CalendarDays, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#0a0a0f] py-8 text-sm text-zinc-400">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600/20 text-purple-400 ring-1 ring-purple-500/30">
            <CalendarDays className="h-4 w-4" />
          </div>
          <span className="font-semibold text-zinc-200">EventFlow</span>
          <span className="text-xs text-zinc-500">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <Link href="/dashboard" className="transition-colors hover:text-white">
            Dashboard
          </Link>
          <Link href="/events/new" className="transition-colors hover:text-white">
            New Event
          </Link>
          <span className="flex items-center gap-1 text-zinc-500">
            Built with <Heart className="h-3 w-3 text-purple-400 fill-purple-400/30" /> for effortless planning
          </span>
        </div>
      </div>
    </footer>
  );
}
