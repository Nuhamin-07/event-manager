"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createEventAction } from "@/lib/actions/events";

export default function EventForm() {
  return (
    <form action={createEventAction} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Team dinner..." required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Optional details about the event"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" placeholder="Optional location" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventDate">Date and Time</Label>
        <Input id="eventDate" name="eventDate" type="datetime-local" />
        <p className="text-sm text-muted-foreground">
          Optional. You can set this later.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit">Create Event</Button>

        <Button type="button" variant="outline" asChild>
          <Link href="/dashboard">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
