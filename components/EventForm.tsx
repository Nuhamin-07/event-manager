"use client";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import Link from "next/link";

type EventFormValues = {
  title: string;
};

export default function EventForm() {
  const form = useForm<EventFormValues>({
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: EventFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event title</FormLabel>

              <FormControl className="mt-4">
                <Label htmlFor="title" className="mb-2">
                  Title
                </Label>
                <Input
                  placeholder="Team dinner..."
                  {...field}
                  required
                  id="title"
                  name="title"
                />
              </FormControl>
              <FormControl className="my-4">
                <Label htmlFor="description" className="mb-2">
                  Description
                </Label>
                <Textarea
                  placeholder="OPtional details about event"
                  {...field}
                  id="description"
                  name="description"
                />
              </FormControl>

              <FormControl className="mt-4">
                <Label htmlFor="location" className="mb-2">
                  Location
                </Label>
                <Input
                  placeholder="Optional location"
                  {...field}
                  id="location"
                  name="location"
                />
              </FormControl>
              <FormControl className="mt-4">
                <Label htmlFor="eventDate" className="mb-2">
                  Date and Time
                </Label>
                <Input
                  placeholder="Optional location"
                  {...field}
                  id="eventDate"
                  name="eventDate"
                  type="datetime-local"
                />
                <FormMessage>Optional. You can set this later.</FormMessage>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3">
          <Button type="submit">Create Event</Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
