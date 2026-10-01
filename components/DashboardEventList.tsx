"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { CopyLinkButton } from "./CopyLinkButton";
import {
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Search,
  Sparkles,
  Plus,
  Filter,
} from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  eventDate: string | null;
  location: string | null;
  inviteToken: string | null;
  goingCount: number;
  maybeCount: number;
  notGoingCount: number;
}

export function DashboardEventList({ events }: { events: EventItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "past">("all");

  const now = new Date();

  const filteredEvents = events.filter((event) => {
    // Search query filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === "all") return true;

    if (!event.eventDate) return true; // keep unscheduled in all

    const eventDate = new Date(event.eventDate);
    if (statusFilter === "active") {
      return eventDate >= now;
    } else if (statusFilter === "past") {
      return eventDate < now;
    }

    return true;
  });

  if (events.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center text-center py-16 px-6 border-dashed border-white/15 bg-white/[0.01]">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20 mb-4">
          <Sparkles className="h-8 w-8" />
        </div>
        <CardTitle className="text-xl font-bold text-white">No events created yet</CardTitle>
        <CardDescription className="max-w-sm mt-2 mb-6 text-zinc-400">
          Create your first event to start inviting guests and collecting real-time RSVPs.
        </CardDescription>
        <Button asChild size="lg" className="shadow-lg shadow-purple-600/25">
          <Link href="/events/new" className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            <span>Create Your First Event</span>
          </Link>
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white/[0.02] border border-white/10 p-3.5 rounded-2xl backdrop-blur-md">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search events by title or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 border-white/10 bg-zinc-950/60 focus:border-purple-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs">
          <Filter className="h-3.5 w-3.5 text-zinc-400 mr-1 hidden sm:inline" />
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === "all"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === "active"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setStatusFilter("past")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              statusFilter === "past"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <Card className="flex flex-col items-center justify-center text-center py-12 px-6 border-dashed border-white/10 bg-white/[0.01]">
          <Search className="h-8 w-8 text-zinc-500 mb-3" />
          <CardTitle className="text-base font-semibold text-white">No matching events found</CardTitle>
          <CardDescription className="text-xs text-zinc-400 mt-1 mb-4">
            Try adjusting your search query or filter settings.
          </CardDescription>
          <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setStatusFilter("all"); }}>
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredEvents.map((event) => {
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

            const inviteUrl = event.inviteToken
              ? `${typeof window !== "undefined" ? window.location.origin : ""}/invite/${event.inviteToken}`
              : null;

            const totalResponses = event.goingCount + event.maybeCount + event.notGoingCount;

            return (
              <Card
                key={event.id}
                className="group relative flex flex-col justify-between border-white/10 bg-[#14141f]/90 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold group-hover:text-purple-300 transition-colors">
                        {event.title}
                      </CardTitle>
                      {totalResponses > 0 ? (
                        <p className="text-xs text-purple-300/80 font-medium">
                          {event.goingCount} confirmed attendee{event.goingCount === 1 ? "" : "s"}
                        </p>
                      ) : (
                        <p className="text-xs text-zinc-500">No RSVPs yet</p>
                      )}
                    </div>

                    <Button size="sm" variant="outline" asChild className="shrink-0 gap-1.5">
                      <Link href={`/events/${event.id}`}>
                        <span>Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="flex flex-col gap-2 text-xs text-zinc-300">
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
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="going" className="gap-1 text-[11px] px-2.5 py-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>{event.goingCount}</span>
                      </Badge>
                      <Badge variant="maybe" className="gap-1 text-[11px] px-2.5 py-0.5">
                        <HelpCircle className="h-3 w-3" />
                        <span>{event.maybeCount}</span>
                      </Badge>
                      <Badge variant="notGoing" className="gap-1 text-[11px] px-2.5 py-0.5">
                        <XCircle className="h-3 w-3" />
                        <span>{event.notGoingCount}</span>
                      </Badge>
                    </div>

                    {inviteUrl && (
                      <CopyLinkButton inviteUrl={inviteUrl} />
                    )}
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
