import EventForm from "@/components/EventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function NewEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <EventForm />
        </CardContent>
      </Card>
    </div>
  );
}
