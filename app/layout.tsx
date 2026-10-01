import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "@/lib/auth/client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EventFlow - Modern Event & RSVP Manager",
  description: "Plan events, share unique invite links, and track attendee RSVPs in real-time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0d0d12] text-[#f5f5f8] selection:bg-purple-500/30 selection:text-purple-200">
        <NeonAuthUIProvider authClient={authClient} defaultTheme="dark">
          <Navbar />
          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
            {children}
          </main>
          <Footer />
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
