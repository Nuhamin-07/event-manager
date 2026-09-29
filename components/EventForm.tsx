"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createEventAction } from "@/lib/actions/events";
import { Type, FileText, MapPin, Calendar, Plus, X } from "lucide-react";

export default function EventForm() {
  return (
    <form action={createEventAction} className="space-y-6">
      {/* Title Field */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-zinc-200 font-medium flex items-center gap-2">
          <Type className="h-4 w-4 text-purple-400" />
          <span>Event Title</span>
          <span className="text-purple-400">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Annual Design Summit, Team Dinner..."
          required
          autoFocus
        />
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-zinc-200 font-medium flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-400" />
          <span>Description</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Add agenda, dress code, or special instructions for guests..."
          rows={3}
        />
      </div>

      {/* Location Field */}
      <div className="space-y-2">
        <Label htmlFor="location" className="text-zinc-200 font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4 text-indigo-400" />
          <span>Location or Video Link</span>
        </Label>
        <Input
          id="location"
          name="location"
          placeholder="e.g. Grand Ballroom, Google Meet link, San Francisco CA..."
        />
      </div>

      {/* Event Date & Time Field */}
      <div className="space-y-2">
        <Label htmlFor="eventDate" className="text-zinc-200 font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4 text-purple-400" />
          <span>Date and Time</span>
        </Label>
        <Input
          id="eventDate"
          name="eventDate"
          type="datetime-local"
          className="color-scheme-dark"
        />
        <p className="text-xs text-zinc-400">
          Optional. You can leave this blank and update it later.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-4 border-t border-white/10">
        <Button type="button" variant="outline" asChild className="w-full sm:w-auto">
          <Link href="/dashboard" className="flex items-center justify-center gap-2">
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </Link>
        </Button>

        <Button type="submit" size="lg" className="w-full sm:w-auto shadow-lg shadow-purple-600/25">
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </Button>
      </div>
    </form>
  );
}
