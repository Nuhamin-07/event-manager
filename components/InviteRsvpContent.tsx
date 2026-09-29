import { prisma } from "@/lib/prisma";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { notFound } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  User,
  Mail,
  Send,
  Sparkles,
  PartyPopper,
  CalendarCheck,
} from "lucide-react";

export async function InviteRsvpContent({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const e = row.event;
  const event = {
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
  };

  const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);

  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No date selected";

  return (
    <div className="mx-auto w-full max-w-xl py-6 space-y-6">
      <Card className="border-purple-500/30 shadow-2xl shadow-purple-950/30 overflow-hidden">
        {/* Event Header Banner */}
        <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-950/40 p-6 sm:p-8 border-b border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="default" className="gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Official Event Invitation</span>
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
            {event.title}
          </h1>

          <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-400 shrink-0" />
              <span>{formattedDate}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {event.description && (
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed border-t border-white/10 pt-3">
              {event.description}
            </p>
          )}
        </div>

        <CardContent className="p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-6 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              
              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-white">RSVP Recorded!</h2>
                <p className="text-sm text-zinc-300 max-w-sm">
                  Thank you! Your response has been saved successfully for <span className="font-semibold text-purple-300">{event.title}</span>.
                </p>
              </div>

              <div className="pt-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/">Return to EventFlow</Link>
                </Button>
              </div>
            </div>
          ) : (
            <form action={submitRsvpForToken} className="space-y-6">
              <div className="space-y-1 mb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-purple-400" />
                  <span>RSVP Response</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Please provide your contact details and select your attendance status below.
                </p>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-200 font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-purple-400" />
                  <span>Full Name</span>
                  <span className="text-purple-400">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-200 font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-indigo-400" />
                  <span>Email Address</span>
                  <span className="text-purple-400">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              {/* Attendance Select */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-zinc-200 font-medium flex items-center gap-2">
                  <PartyPopper className="h-4 w-4 text-purple-400" />
                  <span>Will you be attending?</span>
                  <span className="text-purple-400">*</span>
                </Label>
                <select
                  id="status"
                  name="status"
                  className="flex h-12 w-full rounded-xl border border-white/15 bg-zinc-900/90 px-4 py-2 text-sm text-zinc-100 shadow-sm transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 outline-none cursor-pointer"
                  required
                  defaultValue="going"
                >
                  <option value="going" className="bg-zinc-900 text-emerald-400 font-medium">
                    🎉 Yes, I'm Going
                  </option>
                  <option value="maybe" className="bg-zinc-900 text-amber-400 font-medium">
                    🤔 Maybe / Unsure
                  </option>
                  <option value="not_going" className="bg-zinc-900 text-rose-400 font-medium">
                    ❌ No, Cannot Attend
                  </option>
                </select>
              </div>

              {/* Submit Action */}
              <div className="pt-3">
                <Button type="submit" size="lg" className="w-full shadow-lg shadow-purple-600/25 gap-2">
                  <Send className="h-4 w-4" />
                  <span>Submit RSVP</span>
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
