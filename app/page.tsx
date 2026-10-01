import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  CalendarPlus,
  Share2,
  UserCheck,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  CheckCircle2,
  HelpCircle,
  XCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-12 py-6 sm:py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-6 max-w-4xl">
        <Badge variant="default" className="gap-2 py-1.5 px-3.5 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="h-3.5 w-3.5 text-purple-300 animate-pulse" />
          <span>Effortless Event & RSVP Management</span>
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
          Plan events & track RSVPs with{" "}
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            real-time clarity.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-zinc-300 leading-relaxed max-w-2xl font-normal">
          Create custom events, generate unique guest invite links, and watch attendee responses update instantly with Going, Maybe, and Not Going counts.
        </p>

        <div className="flex flex-wrap items-center gap-3.5 pt-3 w-full sm:w-auto">
          <Button asChild size="lg" className="w-full sm:w-auto shadow-lg shadow-purple-600/30">
            <Link href="/auth/sign-up" className="flex items-center justify-center gap-2">
              <span>Create Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>

          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
            <Link href="/dashboard" className="flex items-center justify-center gap-2 text-purple-300 hover:text-white">
              <LayoutDashboard className="h-4 w-4 text-purple-400" />
              <span>Go to Dashboard</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden group hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all" />
          <CardHeader className="space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/30">
              <CalendarPlus className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Create Events Fast</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Set your event title, date, time, and location details in seconds with clean, intuitive form fields.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="relative overflow-hidden group hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all" />
          <CardHeader className="space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-500/30">
              <Share2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Share Invite Links</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              Generate unique event invite tokens. Guests can submit RSVPs instantly without needing an account.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <CardHeader className="space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30">
              <UserCheck className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl">Track Attendance</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              View attendee lists, status totals, and real-time responses formatted cleanly at a glance.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="going" className="gap-1">
                <CheckCircle2 className="h-3 w-3" /> Going
              </Badge>
              <Badge variant="maybe" className="gap-1">
                <HelpCircle className="h-3 w-3" /> Maybe
              </Badge>
              <Badge variant="notGoing" className="gap-1">
                <XCircle className="h-3 w-3" /> Not Going
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
