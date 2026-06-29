import { z } from "zod";

export const subtitleCueSchema = z.object({
  index: z.number().int().positive(),
  start: z.string(),
  end: z.string(),
  text: z.string(),
});

export const subtitleSchema = z.object({
  cues: z.array(subtitleCueSchema),
});

export type SubtitleCue = z.infer<typeof subtitleCueSchema>;
export type SubtitleDocument = z.infer<typeof subtitleSchema>;

function formatTimestamp(seconds: number): string {
  const totalMs = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(totalMs / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);
  const secs = Math.floor((totalMs % 60_000) / 1000);
  const ms = totalMs % 1000;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

export function offsetCueTimestamps(srt: string, offsetSeconds: number): string {
  if (offsetSeconds <= 0) {
    return srt;
  }

  return srt.replace(
    /(\d{2}):(\d{2}):(\d{2}),(\d{3})/g,
    (_match, hours, minutes, seconds, milliseconds) => {
      const totalSeconds =
        Number(hours) * 3600 +
        Number(minutes) * 60 +
        Number(seconds) +
        Number(milliseconds) / 1000 +
        offsetSeconds;

      return formatTimestamp(totalSeconds);
    },
  );
}

export function cuesToSrt(cues: SubtitleCue[]): string {
  return cues
    .map((cue) => `${cue.index}\n${cue.start} --> ${cue.end}\n${cue.text}`)
    .join("\n\n");
}
