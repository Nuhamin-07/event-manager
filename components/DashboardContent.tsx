import { prisma } from "@/lib/prisma";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card } from "./ui/card";
import { type RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums";
import {
  Plus,
  CheckCircle2,
  CalendarDays,
  Users,
} from "lucide-react";
import { DashboardEventList } from "./DashboardEventList";

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
  const rows = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      invite: { select: { token: true } },
      rsvps: { select: { status: true } },
    },
  });

  const events = rows.map((e) => ({
    id: e.id,
    title: e.title,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    location: e.location,
    inviteToken: e.invite?.token ?? null,
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
          <Card className="p-4 flex items-center gap-4 bg-white/[0.02] border-white/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Events</p>
              <p className="text-2xl font-bold text-white">{totalEvents}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-4 bg-white/[0.02] border-white/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/30">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total RSVPs</p>
              <p className="text-2xl font-bold text-white">{totalRsvps}</p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-4 bg-white/[0.02] border-white/10">
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

      {/* Interactive Events List Component */}
      <DashboardEventList events={events} />
    </div>
  );
}
