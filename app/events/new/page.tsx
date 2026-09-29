import EventForm from "@/components/EventForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarPlus } from "lucide-react";

export default async function NewEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 py-4">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
      </div>

      <Card className="border-purple-500/20 shadow-2xl shadow-purple-950/20">
        <CardHeader className="space-y-2 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/30">
              <CalendarPlus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl font-extrabold text-white">Create New Event</CardTitle>
              <CardDescription className="text-zinc-400">
                Fill in details to set up your event and generate a shareable RSVP link.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <EventForm />
        </CardContent>
      </Card>
    </div>
  );
}
