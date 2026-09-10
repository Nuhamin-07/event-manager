import { Badge } from "@/components/ui/badge";

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
      </section>
    </div>
  );
}
