"use client";

import { motion } from "motion/react";
import { Section } from "@/components/landing/section";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Ripple } from "@/components/ui/ripple";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "In-browser audio extraction",
    description:
      "ffmpeg.wasm runs locally to pull audio from your video — your full file never leaves your device.",
    className: "hover:bg-red-500/10 transition-all duration-500 ease-out",
    content: null,
  },
  {
    title: "Gemini-powered transcription",
    description:
      "Your own Google Gemini API key drives fast, accurate speech-to-text with precise SRT timestamps.",
    className:
      "order-3 xl:order-none hover:bg-blue-500/10 transition-all duration-500 ease-out",
    content: null,
  },
  {
    title: "Privacy-first workflow",
    description:
      "Only extracted audio is sent for transcription. Video processing stays on your machine.",
    className:
      "md:row-span-2 hover:bg-orange-500/10 transition-all duration-500 ease-out",
    content: (
      <FlickeringGrid
        className="absolute inset-0 z-0 [mask:radial-gradient(circle_at_center,#fff_400px,transparent_0)]"
        squareSize={4}
        gridGap={6}
        color="#000"
        maxOpacity={0.1}
        flickerChance={0.1}
        height={800}
        width={800}
      />
    ),
  },
  {
    title: "Encrypted BYOK storage",
    description:
      "Your Gemini API key is encrypted with AES-256-GCM before storage and never returned to the browser.",
    className:
      "order-4 flex-row md:col-span-2 md:flex-row xl:order-none hover:bg-green-500/10 transition-all duration-500 ease-out",
    content: <Ripple className="absolute -bottom-full" />,
  },
];

export function LandingSolution() {
  return (
    <Section
      title="Solution"
      subtitle="Subtitles built for creators who care about speed and privacy"
      description="Generic cloud upload tools aren't enough. SubGenAI is purpose-built for accurate SRT generation with browser-side processing and your own Gemini key."
      className="bg-neutral-100 dark:bg-neutral-900"
    >
      <div className="mx-auto mt-16 grid max-w-sm grid-cols-1 gap-6 text-gray-500 md:max-w-3xl md:grid-cols-2 md:grid-rows-3 xl:max-w-4xl xl:auto-rows-fr xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={cn(
              "group relative items-start overflow-hidden rounded-2xl bg-neutral-50 p-6 dark:bg-neutral-800",
              feature.className,
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h3 className="mb-2 font-semibold text-primary">{feature.title}</h3>
              <p className="text-foreground">{feature.description}</p>
            </div>
            {feature.content}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
