"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Section } from "@/components/landing/section";
import { Marquee } from "@/components/ui/marquee";
import { landingConfig } from "@/lib/landing-config";
import { cn } from "@/lib/utils";

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-primary/20 p-1 py-0.5 font-bold text-primary">
      {children}
    </span>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
}: {
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="mb-4 flex w-full break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-black">
      <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
        <p>
          {quote.split(". ").map((part, i, arr) => (
            <span key={i}>
              {i === 0 ? (
                <>
                  <Highlight>{part}.</Highlight>{" "}
                </>
              ) : (
                <>
                  {part}
                  {i < arr.length - 1 ? ". " : ""}
                </>
              )}
            </span>
          ))}
        </p>
        <div className="flex flex-row py-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-yellow-500 text-yellow-500" />
          ))}
        </div>
      </div>
      <div className="flex w-full select-none items-center justify-start gap-5">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-border ring-offset-4">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-neutral-500">{name}</p>
          <p className="text-xs font-normal text-neutral-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

const extendedTestimonials = [
  ...landingConfig.testimonials,
  {
    name: "Elena Rossi",
    role: "Podcast producer",
    quote:
      "Batch exporting SRT for multiple episodes used to be painful. SubGenAI makes it straightforward with clean timestamps.",
  },
  {
    name: "David Okonkwo",
    role: "Course creator",
    quote:
      "Students need accessible captions. This tool fits my workflow without sending course footage to unknown servers.",
  },
  {
    name: "Sarah Kim",
    role: "Social media manager",
    quote:
      "Short-form clips need fast captions. I generate SRT in minutes and import directly into my editor.",
  },
];

export function LandingTestimonials() {
  const columnCount = Math.ceil(extendedTestimonials.length / 3);

  return (
    <Section title="Testimonials" subtitle="What our users are saying">
      <div className="relative mx-auto mt-6 max-h-[640px] max-w-4xl overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          {Array(columnCount)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-[600px] w-full max-w-sm shrink-0 overflow-hidden sm:w-72">
                <Marquee
                  vertical
                  className={cn("h-full", {
                    "[--duration:60s]": i === 1,
                    "[--duration:30s]": i === 2,
                    "[--duration:70s]": i === 3,
                  })}
                >
                  {extendedTestimonials.slice(i * 3, (i + 1) * 3).map((card) => (
                    <motion.div
                      key={card.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2 }}
                    >
                      <TestimonialCard {...card} />
                    </motion.div>
                  ))}
                </Marquee>
              </div>
            ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-background from-20%" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-background from-20%" />
      </div>
    </Section>
  );
}
