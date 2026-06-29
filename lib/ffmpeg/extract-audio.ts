import type { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import {
  FFMPEG_AUDIO_ARGS,
  FFMPEG_INPUT_FILENAME,
  FFMPEG_OUTPUT_FILENAME,
} from "@/lib/ffmpeg/config";

export async function extractAudioFromVideo(
  ffmpeg: FFmpeg,
  videoFile: File,
): Promise<Blob> {
  const extension = videoFile.name.includes(".")
    ? videoFile.name.slice(videoFile.name.lastIndexOf("."))
    : ".mp4";
  const inputName = `${FFMPEG_INPUT_FILENAME}${extension}`;

  await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

  try {
    await ffmpeg.exec(["-i", inputName, ...FFMPEG_AUDIO_ARGS, FFMPEG_OUTPUT_FILENAME]);
    const data = await ffmpeg.readFile(FFMPEG_OUTPUT_FILENAME);

    if (data instanceof Uint8Array) {
      const copy = new Uint8Array(data.byteLength);
      copy.set(data);
      return new Blob([copy], { type: "audio/mpeg" });
    }

    return new Blob([data], { type: "audio/mpeg" });
  } finally {
    await ffmpeg.deleteFile(inputName).catch(() => undefined);
    await ffmpeg.deleteFile(FFMPEG_OUTPUT_FILENAME).catch(() => undefined);
  }
}
