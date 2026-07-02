"use client";

import { Copy, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ApiKeyOnboardingCard } from "@/components/api-key-onboarding-card";
import { useFeedback } from "@/components/feedback/feedback-provider";
import { DownloadSrtButton } from "@/components/download-srt-button";
import { PageHeader } from "@/components/layout/page-header";
import {
  ProcessingStatus,
  type ProcessingStep,
} from "@/components/processing-status";
import { SrtPreview } from "@/components/srt-preview";
import {
  DEFAULT_SUBTITLE_LANGUAGE,
  SubtitleLanguageSelect,
} from "@/components/subtitle-language-select";
import { VideoPreparingPanel } from "@/components/video-preparing-panel";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { validateVideoFile, VideoUploader } from "@/components/video-uploader";
import { useFfmpeg } from "@/hooks/use-ffmpeg";
import { useTranscription } from "@/hooks/use-transcription";
import {
  AnalyticsEvents,
  captureEvent,
  getFileSizeBucket,
} from "@/lib/analytics/events";
import { formatBytes } from "@/lib/utils";
import { isLikelyValidSrt, normalizeSrt } from "@/lib/srt/validator";
import type { SubtitleLanguage } from "@/lib/subtitle-languages";

export function SubtitleGenerator({
  initialHasApiKey,
}: {
  initialHasApiKey: boolean;
}) {
  const [hasApiKey, setHasApiKey] = useState(initialHasApiKey);
  const [step, setStep] = useState<ProcessingStep>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [srtWarning, setSrtWarning] = useState<string | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [subtitleLanguage, setSubtitleLanguage] = useState<SubtitleLanguage>(
    DEFAULT_SUBTITLE_LANGUAGE,
  );
  const hasShownCompleteToast = useRef(false);
  const { promptAfterDownload } = useFeedback();

  const {
    isLoading: isFfmpegLoading,
    isProcessing,
    progress: ffmpegProgress,
    extractAudio,
  } = useFfmpeg();

  const {
    text: srtText,
    isStreaming,
    error: transcriptionError,
    transcribe,
    reset: resetTranscription,
  } = useTranscription();

  const resetWorkflow = useCallback(() => {
    captureEvent(AnalyticsEvents.WORKFLOW_RESET);
    setStep("idle");
    setSelectedFile(null);
    setWarning(null);
    setError(null);
    setSrtWarning(null);
    setHasDownloaded(false);
    hasShownCompleteToast.current = false;
    resetTranscription();
  }, [resetTranscription]);

  const handleFileSelect = useCallback(
    async (file: File) => {
      setError(null);
      setSrtWarning(null);
      setHasDownloaded(false);
      hasShownCompleteToast.current = false;
      setWarning(validateVideoFile(file));
      setSelectedFile(file);
      resetTranscription();

      captureEvent(AnalyticsEvents.VIDEO_UPLOAD_STARTED, {
        file_extension: file.name.split(".").pop()?.toLowerCase() ?? "unknown",
        file_size_bucket: getFileSizeBucket(file.size),
        language: subtitleLanguage,
      });

      try {
        setStep("loading-ffmpeg");
        const audioBlob = await extractAudio(file);

        if (audioBlob.size > 15 * 1024 * 1024) {
          throw new Error(
            `Compressed audio is ${formatBytes(audioBlob.size)}. Try a shorter clip.`,
          );
        }

        setStep("transcribing");
        captureEvent(AnalyticsEvents.TRANSCRIPTION_STARTED, {
          language: subtitleLanguage,
          audio_size_kb: Math.round(audioBlob.size / 1024),
        });

        const result = await transcribe(audioBlob, {
          filename: file.name,
          language: subtitleLanguage,
        });
        const normalized = normalizeSrt(result);

        if (!isLikelyValidSrt(normalized)) {
          setSrtWarning(
            "The generated output may not be valid SRT. Review before publishing.",
          );
        }

        setStep("complete");
        captureEvent(AnalyticsEvents.TRANSCRIPTION_COMPLETED, {
          language: subtitleLanguage,
          has_srt_warning: !isLikelyValidSrt(normalized),
        });
      } catch (processError) {
        const message =
          processError instanceof Error
            ? processError.message
            : "Something went wrong while processing your video";
        captureEvent(AnalyticsEvents.TRANSCRIPTION_FAILED, {
          language: subtitleLanguage,
          error_message: message,
        });
        setError(message);
        setStep("error");
      }
    },
    [extractAudio, resetTranscription, subtitleLanguage, transcribe],
  );

  const displayStep: ProcessingStep =
    step === "complete" || step === "error" || step === "transcribing"
      ? step
      : isFfmpegLoading
        ? "loading-ffmpeg"
        : isProcessing
          ? "extracting"
          : step;

  const isPreparing =
    displayStep === "loading-ffmpeg" || displayStep === "extracting";

  const isBusy =
    isFfmpegLoading || isProcessing || isStreaming || step === "transcribing";

  useEffect(() => {
    if (step === "complete" && !hasShownCompleteToast.current) {
      hasShownCompleteToast.current = true;
      toast.success(
        "Transcription complete. Review the preview and download your SRT file.",
      );
    }
  }, [step]);

  if (!hasApiKey) {
    return (
      <div className="container flex w-full max-w-4xl flex-1 flex-col gap-6 py-8">
        <PageHeader
          label="Workspace"
          title="Welcome to SubGenAI"
          description="Generate accurate, timestamped subtitles from your videos. Connect your Gemini API key to get started — it only takes a minute."
        />
        <ApiKeyOnboardingCard onConfigured={() => setHasApiKey(true)} />
      </div>
    );
  }

  return (
    <div className="container flex w-full max-w-4xl flex-1 flex-col gap-6 py-8">
      <PageHeader
        label="Workspace"
        title="Subtitle Generator"
        description="Upload a video, extract lightweight audio in your browser, and stream timestamped SRT subtitles powered by Gemini Flash. Your video never leaves your device — only compressed audio is sent for transcription."
      />

      <ProcessingStatus
        step={displayStep}
        error={error ?? transcriptionError}
        hasDownloaded={hasDownloaded}
      />

      {warning && step === "idle" && (
        <Alert className="border-amber-200 bg-amber-50/80">
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}

      {(step === "idle" || isPreparing) && (
        <div className="space-y-4">
          {step === "idle" && (
            <SubtitleLanguageSelect
              value={subtitleLanguage}
              onChange={setSubtitleLanguage}
              disabled={isBusy}
            />
          )}
          {isPreparing ? (
            <VideoPreparingPanel
              progress={ffmpegProgress}
              fileName={selectedFile?.name}
            />
          ) : (
            <VideoUploader
              disabled={isBusy}
              onError={(message) => {
                setError(message);
                setStep("error");
              }}
              onFileSelect={(file) => void handleFileSelect(file)}
            />
          )}
        </div>
      )}

      {srtWarning && step === "complete" && (
        <Alert className="border-amber-200 bg-amber-50/80">
          <AlertDescription>{srtWarning}</AlertDescription>
        </Alert>
      )}

      {(step === "transcribing" || step === "complete" || srtText) && (
        <SrtPreview
          content={normalizeSrt(srtText)}
          isStreaming={isStreaming}
          fileName={selectedFile?.name}
        />
      )}

      <div className="flex flex-wrap gap-3">
        {step === "complete" && selectedFile && (
          <DownloadSrtButton
            content={srtText}
            filename={selectedFile.name}
            onDownloadComplete={() => {
              setHasDownloaded(true);
              promptAfterDownload();
            }}
          />
        )}

        {step === "complete" && srtText && (
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              await navigator.clipboard.writeText(srtText);
              captureEvent(AnalyticsEvents.SRT_COPIED);
              toast.success("SRT copied to clipboard");
            }}
            className="h-10 gap-2 rounded-full px-5"
          >
            <Copy className="size-4" />
            Copy SRT
          </Button>
        )}

        {step !== "idle" && (
          <Button
            type="button"
            variant="outline"
            onClick={resetWorkflow}
            disabled={isBusy && step !== "complete" && step !== "error"}
            className="h-10 gap-2 rounded-full px-5"
          >
            <RotateCcw className="size-4" />
            Start over
          </Button>
        )}
      </div>
    </div>
  );
}
