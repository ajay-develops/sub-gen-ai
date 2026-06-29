export const APP_NAME = "SubGenAI";

export const APP_DESCRIPTION =
  "SubGenAI is a high-performance, open-source tool that generates accurate, timestamped SRT subtitles from video files. Built for creators who need a fast, privacy-focused workflow, it performs audio extraction entirely in your browser using ffmpeg.wasm before leveraging Google Gemini (Flash 1.5) for high-speed, accurate transcription.";

export const REDIS_API_KEY_PREFIX = "subgenai:apikey:";

export const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
export const WARN_VIDEO_BYTES = 200 * 1024 * 1024;
export const MAX_AUDIO_UPLOAD_BYTES = 15 * 1024 * 1024;

export const SUPPORTED_VIDEO_EXTENSIONS = [
  ".mp4",
  ".webm",
  ".mov",
  ".mkv",
] as const;

export const SUPPORTED_VIDEO_MIME_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-matroska",
] as const;

export const GEMINI_MODEL_ID = "gemini-2.5-flash";

export const API_KEY_DEMO_VIDEO_EMBED_URL =
  "https://www.youtube.com/embed/8YWztaMw32o?autoplay=1";
export const API_KEY_DEMO_VIDEO_THUMBNAIL = "/gemini-api-key-thumbnail.png";
