import posthog from "posthog-js";
import { sampleByEvent } from "posthog-js/lib/src/customizations";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  person_profiles: "identified_only",
  capture_pageview: true,
  capture_pageleave: true,
  disable_surveys: false,
  before_send: sampleByEvent(["$web_vitals"], 0.5),
  capture_performance: {
    web_vitals: true,
    web_vitals_allowed_metrics: ["LCP", "CLS", "FCP", "INP"],
    web_vitals_delayed_flush_ms: 5000,
  },
});
