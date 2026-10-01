"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@neondatabase/auth/react";
import { CalendarDays, Menu, X, Plus, LayoutDashboard, Home, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d0d12]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-indigo-400 text-white shadow-md shadow-purple-500/20 ring-1 ring-white/20 transition-transform group-hover:scale-105">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white">
              EventFlow
            </span>
            <span className="text-[10px] font-medium tracking-wider text-purple-400 uppercase">
              RSVP Planner
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-purple-500/20 text-purple-200 ring-1 ring-purple-500/40"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          
          <div className="mx-2 h-4 w-[1px] bg-white/15" />

          <Link
            href="/events/new"
            className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-purple-500 hover:shadow-purple-500/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>New Event</span>
          </Link>

          {/* Auth Action Buttons & User Avatar */}
          <div className="ml-3 pl-3 border-l border-white/15 flex items-center gap-2.5">
            <Link
              href="/auth/sign-in"
              className="text-sm font-semibold text-purple-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/auth/sign-up"
              className="text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-3.5 py-1.5 rounded-lg shadow-md shadow-purple-600/25 transition-all active:scale-95"
            >
              Create Account
            </Link>

            <div className="flex items-center justify-center p-0.5 rounded-full ring-2 ring-purple-500/50 hover:ring-purple-400 transition-all bg-purple-950/60 shadow-md">
              <UserButton size="icon" />
            </div>
          </div>
        </nav>

        {/* Mobile menu right corner controls */}
        <div className="flex items-center gap-2.5 md:hidden">
          <Link
            href="/auth/sign-in"
            className="text-xs font-semibold text-purple-300 px-2.5 py-1.5 rounded-md hover:bg-white/10"
          >
            Sign In
          </Link>

          <div className="flex items-center justify-center p-0.5 rounded-full ring-2 ring-purple-500/50 bg-purple-950/60">
            <UserButton size="icon" />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-purple-500/50"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="border-t border-white/15 bg-[#0d0d12]/98 px-4 py-4 backdrop-blur-xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-purple-500/25 text-purple-200 ring-1 ring-purple-500/40"
                      : "text-zinc-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/events/new"
              onClick={() => setIsOpen(false)}
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all active:scale-98"
            >
              <Plus className="h-5 w-5" />
              <span>Create New Event</span>
            </Link>

            <div className="mt-3 pt-3 border-t border-white/15 flex flex-col gap-2">
              <Link
                href="/auth/sign-in"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-purple-500/40 bg-purple-500/15 px-4 py-2.5 text-sm font-semibold text-purple-200 hover:bg-purple-500/25"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>

              <Link
                href="/auth/sign-up"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md"
              >
                <UserPlus className="h-4 w-4" />
                <span>Create Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
