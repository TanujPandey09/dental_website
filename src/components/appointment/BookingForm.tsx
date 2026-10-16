"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import siteConfig from "@/config/site";

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a preferred date"),
  timePref: z.string().min(1, "Please select a time preference"),
  notes: z.string().optional(),
});

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      timePref: "",
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-10" role="status" aria-live="polite">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl" aria-hidden="true">✓</span>
        </div>
        <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
          Request received
        </h3>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Thank you! We&apos;ll contact you shortly to confirm the exact time of your
          appointment.
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="h-12 px-8 rounded-xl font-bold"
        >
          Book another appointment
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" className="h-12 rounded-xl focus-visible:ring-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" className="h-12 rounded-xl focus-visible:ring-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl focus-visible:ring-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="(555) 123-4567" className="h-12 rounded-xl focus-visible:ring-primary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t border-border pt-6 pb-2">
          <h3 className="text-lg font-heading font-bold text-foreground mb-4">Appointment Preferences</h3>
        </div>

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Visit</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl focus:ring-primary">
                    <SelectValue placeholder="Select a treatment or service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {siteConfig.forms.bookingServices.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Date</FormLabel>
                <FormControl>
                  <Input type="date" className="h-12 rounded-xl focus-visible:ring-primary text-foreground" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timePref"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl focus:ring-primary">
                      <SelectValue placeholder="Select time of day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8am - 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                    <SelectItem value="evening">Evening (4pm - 7pm)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Is there anything specific you would like us to know?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-destructive bg-destructive/10 rounded-xl px-4 py-3">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="w-full h-14 rounded-xl shadow-lg shadow-primary/20 text-base font-bold mt-4 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request Appointment"}
        </Button>
      </form>
    </Form>
  );
}
