import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "./DashboardContent";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { createInviteLinkAction } from "@/lib/actions/events";
import { CopyLinkButton } from "./CopyLinkButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  UserCheck,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Clock,
  Mail,
  User,
  Sparkles,
} from "lucide-react";

export async function EventDetailContent({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) {
  const row = await prisma.event.findFirst({
    where: { id: eventId, ownerUserId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      rsvps: { select: { status: true } },
    },
  });

  if (!row) {
    notFound();
  }

  const counts = countByStatus(row.rsvps);

  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate ? row.eventDate.toISOString() : null,
    inviteToken: row.invite?.token ?? null,
    goingCount: counts.goingCount,
    maybeCount: counts.maybeCount,
    notGoingCount: counts.notGoingCount,
  };

  const RsvpRows = await prisma.eventRsvp.findMany({
    where: { eventId },
    orderBy: { respondedAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      respondedAt: true,
    },
  });

  const rsvps = RsvpRows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    status: r.status,
    respondedAt: r.respondedAt.toISOString(),
  }));

  const createInviteActionForEvent = createInviteLinkAction.bind(
    null,
    event.id
  );

  const inviteUrl = event.inviteToken
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invite/${event.inviteToken}`
    : null;

  const formattedDate = event.eventDate
    ? new Date(event.eventDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No Date Set";

  return (
    <div className="flex flex-col gap-8">
      {/* Header & Back Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-white/10 pb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
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
            <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed pt-1">
              {event.description}
            </p>
          )}
        </div>
      </div>

      {/* RSVP Stats Pills */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-emerald-400/90 font-medium uppercase tracking-wider">Going</p>
            <p className="text-lg font-bold text-emerald-200">{event.goingCount} Attendees</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-amber-400/90 font-medium uppercase tracking-wider">Maybe</p>
            <p className="text-lg font-bold text-amber-200">{event.maybeCount} Interested</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300">
            <XCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-rose-400/90 font-medium uppercase tracking-wider">Not Going</p>
            <p className="text-lg font-bold text-rose-200">{event.notGoingCount} Declined</p>
          </div>
        </div>
      </div>

      {/* Invite Link Card */}
      <Card className="border-purple-500/30 bg-purple-500/[0.04]">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-purple-300">
            <Share2 className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-lg font-semibold">Guest Invite Link</CardTitle>
          </div>
          <CardDescription>
            Share this link with your guests so they can submit their RSVP without needing to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          {inviteUrl ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 overflow-x-auto rounded-xl border border-white/15 bg-zinc-950/80 px-4 py-3 text-sm font-mono text-purple-300 select-all">
                {inviteUrl}
              </div>
              <CopyLinkButton inviteUrl={inviteUrl} />
            </div>
          ) : (
            <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-zinc-900/50 p-4">
              <span className="text-sm text-zinc-400">No invite link generated yet for this event.</span>
              <form action={createInviteActionForEvent}>
                <Button type="submit" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Link</span>
                </Button>
              </form>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendees Table Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-indigo-400" />
            <CardTitle className="text-lg font-semibold">Attendee Responses</CardTitle>
          </div>
          <Badge variant="ghost" className="text-xs">
            {rsvps.length} Total
          </Badge>
        </CardHeader>

        <CardContent className="pt-4">
          {rsvps.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-zinc-500 mb-3">
                <UserCheck className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-zinc-300">No responses recorded yet</p>
              <p className="text-xs text-zinc-500 max-w-sm mt-1">
                Share your guest invite link above to start collecting attendee RSVPs.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attendee</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Responded At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvps.map((rsvp) => {
                  const statusVariant =
                    rsvp.status === "going"
                      ? "going"
                      : rsvp.status === "maybe"
                      ? "maybe"
                      : "notGoing";

                  const statusLabel =
                    rsvp.status === "going"
                      ? "Going"
                      : rsvp.status === "maybe"
                      ? "Maybe"
                      : "Not Going";

                  const initials = rsvp.name
                    ? rsvp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()
                    : "?";

                  return (
                    <TableRow key={rsvp.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600/20 text-xs font-semibold text-purple-300 ring-1 ring-purple-500/30">
                            {initials}
                          </div>
                          <span className="font-medium text-white">{rsvp.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Mail className="h-3.5 w-3.5 text-zinc-500" />
                          <span>{rsvp.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant} className="capitalize">
                          {statusLabel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                          <Clock className="h-3.5 w-3.5 text-zinc-500" />
                          <span>
                            {new Date(rsvp.respondedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
