"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight01Icon } from "hugeicons-react";

export function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden border-border bg-background shadow-2xl">
        <DialogHeader className="p-6 border-b border-border bg-muted/30">
          <DialogTitle className="text-2xl font-heading font-bold text-foreground">
            Schedule Appointment
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Experience world-class dental care. Select a service to get started.
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="service" className="text-sm font-medium text-foreground">Select Service</Label>
                <Select>
                  <SelectTrigger id="service" className="w-full h-12 rounded-xl border-input bg-transparent focus:ring-accent">
                    <SelectValue placeholder="Choose a treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Consultation</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic Dentistry</SelectItem>
                    <SelectItem value="implants">Dental Implants</SelectItem>
                    <SelectItem value="ortho">Orthodontics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="date" className="text-sm font-medium text-foreground">Preferred Date</Label>
                <Input id="date" type="date" className="w-full h-12 rounded-xl border-input bg-transparent focus-visible:ring-accent" />
              </div>
              
              <Button className="w-full h-12 rounded-xl mt-4 group" onClick={() => setStep(2)}>
                Continue to Details
                <ArrowRight01Icon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</Label>
                  <Input id="firstName" type="text" className="h-12 rounded-xl focus-visible:ring-accent" placeholder="John" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</Label>
                  <Input id="lastName" type="text" className="h-12 rounded-xl focus-visible:ring-accent" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                <Input id="email" type="email" className="h-12 rounded-xl focus-visible:ring-accent" placeholder="john@example.com" />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                <Input id="phone" type="tel" className="h-12 rounded-xl focus-visible:ring-accent" placeholder="(555) 123-4567" />
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="w-full h-12 rounded-xl shadow-lg shadow-primary/20" onClick={() => {
                  setStep(1);
                  onClose();
                }}>
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
