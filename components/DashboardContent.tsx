import { prisma } from "@/lib/prisma";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { type RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums";
import {
  Calendar,
  MapPin,
  Plus,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  XCircle,
  CalendarDays,
  Users,
  Sparkles,
} from "lucide-react";

export function countByStatus(rsvps: { status: PrismaRsvpStatus }[]) {
  let goingCount = 0;
  let maybeCount = 0;
  let notGoingCount = 0;

  for (const r of rsvps) {
    if (r.status === "going") goingCount += 1;
    else if (r.status === "maybe") maybeCount += 1;
    else if (r.status === "not_going") notGoingCount += 1;
  }
  return { goingCount, maybeCount, notGoingCount };
}

export async function DashboardContent({ userId }: { userId: string }) {
  const rows = prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      rsvps: { select: { status: true } },
    },
  });

  const events = (await rows).map((e) => ({
    id: e.id,
    title: e.title,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    location: e.location,
    ...countByStatus(e.rsvps),
  }));

  const totalEvents = events.length;
  const totalRsvps = events.reduce(
    (acc, curr) => acc + curr.goingCount + curr.maybeCount + curr.notGoingCount,
    0
  );
  const totalGoing = events.reduce((acc, curr) => acc + curr.goingCount, 0);

  return (
    <div className="flex flex-1 flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <CalendarDays className="h-7 w-7 text-purple-400" />
            <span>Your Events</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Track attendee responses, view RSVPs, and manage guest invite links.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0 shadow-lg shadow-purple-600/25">
          <Link href="/events/new" className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <span>Create Event</span>
          </Link>
        </Button>
      </div>

      {/* Metrics Summary Grid */}
      {totalEvents > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-4 flex items-center gap-4 bg-white/[0.02]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Events</p>
              <p className="text-2xl font-bold text-white">{totalEvents}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-4 bg-white/[0.02]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/30">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total RSVPs</p>
              <p className="text-2xl font-bold text-white">{totalRsvps}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-4 bg-white/[0.02]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Confirmed Attendees</p>
              <p className="text-2xl font-bold text-white">{totalGoing}</p>
            </div>
          </Card>
        </div>
      )}

      {/* Content Section */}
      {events.length === 0 ? (
        <Card className="flex flex-col items-center justify-center text-center py-16 px-6 border-dashed border-white/15 bg-white/[0.01]">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20 mb-4">
            <Sparkles className="h-8 w-8" />
          </div>
          <CardTitle className="text-xl font-bold text-white">No events yet</CardTitle>
          <CardDescription className="max-w-sm mt-2 mb-6 text-zinc-400">
            Create your first event to start inviting guests and collecting real-time RSVPs.
          </CardDescription>
          <Button asChild size="lg">
            <Link href="/events/new" className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              <span>Create Your First Event</span>
            </Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((event) => {
            const dateObj = event.eventDate ? new Date(event.eventDate) : null;
            const formattedDate = dateObj
              ? dateObj.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "No date set";

            return (
              <Card
                key={event.id}
                className="group relative flex flex-col justify-between hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-xl font-bold group-hover:text-purple-300 transition-colors">
                      {event.title}
                    </CardTitle>
                    <Button size="sm" variant="outline" asChild className="shrink-0">
                      <Link href={`/events/${event.id}`} className="flex items-center gap-1.5">
                        <span>Open</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2 text-xs text-zinc-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400 shrink-0" />
                      <span className="truncate">{formattedDate}</span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-indigo-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-2">
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
                    <Badge variant="going" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Going: {event.goingCount}</span>
                    </Badge>
                    <Badge variant="maybe" className="gap-1">
                      <HelpCircle className="h-3 w-3" />
                      <span>Maybe: {event.maybeCount}</span>
                    </Badge>
                    <Badge variant="notGoing" className="gap-1">
                      <XCircle className="h-3 w-3" />
                      <span>Not Going: {event.notGoingCount}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
