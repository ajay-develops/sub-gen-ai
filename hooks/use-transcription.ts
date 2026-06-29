"use client";

import { useCallback, useRef, useState } from "react";
import type { SubtitleLanguage } from "@/lib/subtitle-languages";

type TranscriptionState = {
  text: string;
  isStreaming: boolean;
  error: string | null;
};

type TranscribeOptions = {
  filename: string;
  language: SubtitleLanguage;
};

export function useTranscription() {
  const abortRef = useRef<AbortController | null>(null);
  const [state, setState] = useState<TranscriptionState>({
    text: "",
    isStreaming: false,
    error: null,
  });

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setState({ text: "", isStreaming: false, error: null });
  }, []);

  const transcribe = useCallback(
    async (audioBlob: Blob, { filename, language }: TranscribeOptions) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState({ text: "", isStreaming: true, error: null });

      const formData = new FormData();
      formData.append(
        "audio",
        audioBlob,
        `${filename.replace(/\.[^.]+$/, "")}.mp3`,
      );
      formData.append("language", language);

      try {
        const response = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(data?.error ?? "Transcription failed");
        }

        if (!response.body) {
          throw new Error("No transcription stream received");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          accumulated += decoder.decode(value, { stream: true });
          setState({ text: accumulated, isStreaming: true, error: null });
        }

        accumulated += decoder.decode();
        setState({ text: accumulated, isStreaming: false, error: null });
        return accumulated;
      } catch (transcribeError) {
        if (
          transcribeError instanceof DOMException &&
          transcribeError.name === "AbortError"
        ) {
          return "";
        }

        const message =
          transcribeError instanceof Error
            ? transcribeError.message
            : "Transcription failed";

        setState((current) => ({
          ...current,
          isStreaming: false,
          error: message,
        }));

        throw transcribeError;
      }
    },
    [],
  );

  return {
    ...state,
    transcribe,
    reset,
  };
}
