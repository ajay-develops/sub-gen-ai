"use client";

import { motion } from "motion/react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { LandingAuthButtons } from "@/components/landing/auth-buttons";
import {
  LANDING_HERO_VIDEO_EMBED_URL,
  LANDING_HERO_VIDEO_THUMBNAIL,
} from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroPill() {
  return (
    <motion.div
      className="flex w-auto items-center space-x-2 whitespace-pre rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center text-xs font-medium text-primary sm:text-sm">
        Browser-based
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm">
        Privacy-first subtitle generation
      </p>
    </motion.div>
  );
}

function HeroTitles() {
  const words = ["Super-fast", "SRT", "subtitles", "from", "video"];

  return (
    <div className="flex w-full max-w-3xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 1, ease }}
      >
        {words.map((text, index) => (
          <motion.span
            key={text}
            className="inline-block px-1 font-semibold text-balance md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease }}
          >
            {text}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="mx-auto max-w-xl text-center text-lg leading-7 text-muted-foreground text-balance sm:text-xl sm:leading-9"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease }}
      >
        Extract audio in your browser, transcribe with your own Gemini key, and
        download timestamped SRT files in minutes.
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  return (
    <>
      <motion.div
        className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease }}
      >
        <LandingAuthButtons />
      </motion.div>
      <motion.p
        className="mt-5 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        Free to use. Bring your own Gemini API key.
      </motion.p>
    </>
  );
}

function HeroImage() {
  return (
    <motion.div
      className="relative mx-auto mt-16 flex w-full max-w-4xl items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 1, ease }}
    >
      <HeroVideoDialog
        animationStyle="from-center"
        videoSrc={LANDING_HERO_VIDEO_EMBED_URL}
        thumbnailSrc={LANDING_HERO_VIDEO_THUMBNAIL}
        thumbnailAlt="SubGenAI demo"
        className="mt-4 w-full rounded-lg border shadow-lg"
      />
    </motion.div>
  );
}

export function LandingHero() {
  return (
    <section id="hero">
      <div className="relative flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
        <HeroImage />
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4" />
      </div>
    </section>
  );
}
