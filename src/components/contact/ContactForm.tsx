"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button, ButtonBadge } from "@/components/ui/button";
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
import { ArrowRight01Icon, CheckmarkCircle01Icon, UserIcon, Mail01Icon, Call02Icon } from "hugeicons-react";
import siteConfig from "@/config/site";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Valid phone number required." }),
  inquiryType: z.string().min(1, { message: "Please select an inquiry type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
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
      <div className="p-1.5 rounded-3xl bg-primary/10 border border-primary/20 my-4" role="status" aria-live="polite">
        <div className="rounded-2xl bg-card border border-primary/20 p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
            <CheckmarkCircle01Icon className="w-9 h-9" aria-hidden="true" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
            Message dispatched successfully
          </h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-sm sm:text-base leading-relaxed">
            Thank you for reaching out. Our clinical patient coordinator will review your inquiry and follow up within 2 hours.
          </p>
          <Button
            onClick={() => setStatus("idle")}
            variant="outline"
            size="lg"
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="e.g. Jane Doe"
                    className="h-12 pl-10 rounded-xl bg-card border-border/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                    {...field}
                  />
                  <UserIcon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="e.g. jane@example.com"
                      className="h-12 pl-10 rounded-xl bg-card border-border/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                      {...field}
                    />
                    <Mail01Icon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                  </div>
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
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="h-12 pl-10 rounded-xl bg-card border-border/70 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm"
                      {...field}
                    />
                    <Call02Icon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="inquiryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Topic of Inquiry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl bg-card border-border/70 focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-xl border-border/70">
                  {siteConfig.forms.contactInquiryTypes.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-sm py-2.5">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Message</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-[120px] w-full rounded-xl border border-border/70 bg-card px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                  placeholder="Please describe your treatment goals or specific clinical questions..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-destructive bg-destructive/10 rounded-xl px-4 py-3 border border-destructive/20">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-center sm:justify-end pt-2">
          <Button
            type="submit"
            variant="cta"
            size="lg"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
          >
            <Mail01Icon className="size-4 shrink-0" aria-hidden="true" />
            <span>{status === "submitting" ? "Sending Message…" : "Send Message"}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}



