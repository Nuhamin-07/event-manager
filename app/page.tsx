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

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">
          Plan events and track RSVP fast.
        </h1>
        <p className="max-w-2xl text-(--muted-foreground)">
          Create events, share a unique invite link and watch atendees status
          updated in real-time with Going, Maybe and Not Going counts.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/auth/sign-up">Create account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/dshboard">Dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Create Events</CardTitle>
            <CardDescription>
              Set title, date and details in second.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shard invite links</CardTitle>
            <CardDescription>
              Generate a unique event token for each events.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Track attendance</CardTitle>
            <CardDescription>
              Set attendeelist and response totals at a glance.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-(--muted-foreground)">
            Going, Maybe and Not Going statuses are always up-to-date.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
