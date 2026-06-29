"use client";

import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import {
  API_KEY_DEMO_VIDEO_EMBED_URL,
  API_KEY_DEMO_VIDEO_THUMBNAIL,
} from "@/lib/constants";

export function ApiKeyDemoVideo() {
  return (
    <div className="space-y-2">
      <p className="text-center text-xs font-medium text-muted-foreground">
        Watch: How to create your Gemini API key
      </p>
      <HeroVideoDialog
        compact
        animationStyle="from-center"
        videoSrc={API_KEY_DEMO_VIDEO_EMBED_URL}
        thumbnailSrc={API_KEY_DEMO_VIDEO_THUMBNAIL}
        thumbnailAlt="How to create a Gemini API key in Google AI Studio"
        className="mx-auto w-full max-w-xs sm:max-w-sm"
      />
    </div>
  );
}
