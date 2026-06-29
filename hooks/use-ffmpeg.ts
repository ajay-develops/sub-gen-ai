"use client";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { useCallback, useEffect, useRef, useState } from "react";
import { FFMPEG_CDN_BASE } from "@/lib/ffmpeg/config";
import { extractAudioFromVideo } from "@/lib/ffmpeg/extract-audio";

export function useFfmpeg() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const getFfmpeg = useCallback(() => {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
    }

    return ffmpegRef.current;
  }, []);

  useEffect(() => {
    const ffmpeg = getFfmpeg();

    const handleProgress = ({ progress: ratio }: { progress: number }) => {
      setProgress(Math.min(100, Math.round(ratio * 100)));
    };

    ffmpeg.on("progress", handleProgress);

    return () => {
      ffmpeg.off("progress", handleProgress);
    };
  }, [getFfmpeg]);

  const load = useCallback(async () => {
    if (isLoaded || isLoading) {
      return getFfmpeg();
    }

    setIsLoading(true);
    setError(null);

    try {
      const ffmpeg = getFfmpeg();

      await ffmpeg.load({
        coreURL: await toBlobURL(`${FFMPEG_CDN_BASE}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(
          `${FFMPEG_CDN_BASE}/ffmpeg-core.wasm`,
          "application/wasm",
        ),
      });

      setIsLoaded(true);
      return ffmpeg;
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Failed to load ffmpeg.wasm";
      setError(message);
      throw loadError;
    } finally {
      setIsLoading(false);
    }
  }, [getFfmpeg, isLoaded, isLoading]);

  const extractAudio = useCallback(
    async (videoFile: File) => {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      try {
        const ffmpeg = await load();
        return await extractAudioFromVideo(ffmpeg, videoFile);
      } catch (processError) {
        const message =
          processError instanceof Error
            ? processError.message
            : "Failed to extract audio";
        setError(message);
        throw processError;
      } finally {
        setIsProcessing(false);
      }
    },
    [load],
  );

  return {
    isLoaded,
    isLoading,
    isProcessing,
    progress,
    error,
    load,
    extractAudio,
  };
}
