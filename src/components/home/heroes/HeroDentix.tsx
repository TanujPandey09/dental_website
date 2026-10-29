"use client";

import Image from "next/image";
import { ArrowUpRight01Icon, StarIcon } from "hugeicons-react";
import { useBooking } from "@/components/BookingContext";
import { images } from "@/config/images";

export function HeroDentix() {
  const { openBooking } = useBooking();

  const patientAvatars = [
    images.testimonials.patients[1],
    images.testimonials.patients[2],
    images.testimonials.patients[3],
  ];

  return (
    <section className="bg-background pb-20 pt-16 text-foreground sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
      <div className="shell">
        {/* Framed card */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] border border-white/10 bg-slate-950 p-5 xs:p-7 sm:p-10 lg:p-16 text-white shadow-2xl">
          {/* Ambient glow in brand color */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/4 top-0 h-[400px] w-[500px] rounded-full bg-primary/20 blur-[140px]"
          />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Left content */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <h1 className="font-sans text-3xl xs:text-4xl sm:text-5xl lg:text-[66px] font-bold leading-[1.08] tracking-tight text-white">
                  Premium Implant <br />
                  Dentistry Clinic
                </h1>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 sm:mt-6 sm:text-base lg:text-lg">
                  From subtle enhancements to full reconstructions, we specialize
                  in restoring healthy smiles with care that fits you.
                </p>

                <div className="mt-6 sm:mt-8 flex flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={openBooking}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-95 touch-manipulation shrink-0"
                  >
                    <span>Book Online</span>
                    <ArrowUpRight01Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-8 sm:mt-14">
                <div className="flex -space-x-2.5">
                  {patientAvatars.map((src, i) => (
                    <div
                      key={i}
                      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-slate-950 bg-muted"
                    >
                      <Image
                        src={src}
                        alt="Verified patient"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white">4.8</span>
                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-medium text-white/60">
                    168 Reviews on Google
                  </p>
                </div>
              </div>
            </div>

            {/* Arched portrait */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-b-3xl rounded-t-[140px] border border-white/15 bg-slate-900 shadow-2xl sm:rounded-b-[2rem] sm:rounded-t-[180px]">
                <Image
                  src={images.heroDentix}
                  alt="Radiant patient smile in mirror"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}