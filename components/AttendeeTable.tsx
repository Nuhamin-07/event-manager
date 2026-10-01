"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { UserCheck, Search, Mail, Clock, Filter } from "lucide-react";

export interface RsvpItem {
  id: string;
  name: string;
  email: string;
  status: string;
  respondedAt: string;
}

export function AttendeeTable({ rsvps }: { rsvps: RsvpItem[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "going" | "maybe" | "not_going">("all");

  const filtered = rsvps.filter((rsvp) => {
    const matchesSearch =
      rsvp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rsvp.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (statusFilter !== "all" && rsvp.status !== statusFilter) return false;

    return true;
  });

  if (rsvps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-zinc-500 mb-3">
          <UserCheck className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-zinc-300">No responses recorded yet</p>
        <p className="text-xs text-zinc-500 max-w-sm mt-1">
          Share your guest invite link above to start collecting attendee RSVPs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Status Pills */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <Input
            type="text"
            placeholder="Filter attendees by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs border-white/10 bg-zinc-950/60"
          />
        </div>

        <div className="flex items-center gap-1 text-xs">
          <Filter className="h-3 w-3 text-zinc-500 mr-1 hidden sm:inline" />
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              statusFilter === "all" ? "bg-purple-600/30 text-purple-200 border border-purple-500/40" : "text-zinc-400 hover:text-white"
            }`}
          >
            All ({rsvps.length})
          </button>
          <button
            onClick={() => setStatusFilter("going")}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              statusFilter === "going" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "text-zinc-400 hover:text-white"
            }`}
          >
            Going
          </button>
          <button
            onClick={() => setStatusFilter("maybe")}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              statusFilter === "maybe" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-zinc-400 hover:text-white"
            }`}
          >
            Maybe
          </button>
          <button
            onClick={() => setStatusFilter("not_going")}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              statusFilter === "not_going" ? "bg-rose-500/20 text-rose-300 border border-rose-500/40" : "text-zinc-400 hover:text-white"
            }`}
          >
            Declined
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-8 text-center text-xs text-zinc-400">
          No attendees match your search filters.
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
            {filtered.map((rsvp) => {
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
    </div>
  );
}
