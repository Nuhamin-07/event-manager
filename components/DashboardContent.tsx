import { Button } from "./ui/button";
import Link from "next/link";

export async function DashboardContent({ userId }: { userId: string }) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1>Your Events</h1>
          <p>Track atendees response and manage invite links.</p>
        </div>
        <Button asChild>
          <Link href="/event/new">Create Event</Link>
        </Button>
      </div>
    </div>
  );
}
