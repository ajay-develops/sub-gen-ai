import posthog from "posthog-js";

export const AnalyticsEvents = {
  VIDEO_UPLOAD_STARTED: "video_upload_started",
  TRANSCRIPTION_STARTED: "transcription_started",
  TRANSCRIPTION_COMPLETED: "transcription_completed",
  TRANSCRIPTION_FAILED: "transcription_failed",
  SRT_DOWNLOADED: "srt_downloaded",
  SRT_COPIED: "srt_copied",
  API_KEY_SAVED: "api_key_saved",
  API_KEY_REMOVED: "api_key_removed",
  WORKFLOW_RESET: "workflow_reset",
  USER_FEEDBACK_SUBMITTED: "user_feedback_submitted",
  USER_FEEDBACK_DISMISSED: "user_feedback_dismissed",
} as const;

export function captureEvent(
  event: (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents],
  properties?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") {
    return;
  }

  posthog.capture(event, properties);
}

export function getFileSizeBucket(bytes: number): string {
  if (bytes < 10 * 1024 * 1024) {
    return "under_10mb";
  }

  if (bytes < 50 * 1024 * 1024) {
    return "10_to_50mb";
  }

  if (bytes < 100 * 1024 * 1024) {
    return "50_to_100mb";
  }

  if (bytes < 250 * 1024 * 1024) {
    return "100_to_250mb";
  }

  return "250_to_500mb";
}
