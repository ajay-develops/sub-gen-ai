export const FFMPEG_CORE_VERSION = "0.12.10";

export const FFMPEG_CDN_BASE = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/umd`;

export const FFMPEG_AUDIO_ARGS = [
  "-vn",
  "-ac",
  "1",
  "-ar",
  "16000",
  "-b:a",
  "32k",
  "-f",
  "mp3",
] as const;

export const FFMPEG_INPUT_FILENAME = "input";
export const FFMPEG_OUTPUT_FILENAME = "output.mp3";
