import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    </div>
  );
}
