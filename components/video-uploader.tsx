"use client";

import { UploadCloud } from "lucide-react";
import { useCallback, useState } from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { cn, formatBytes, getFileExtension } from "@/lib/utils";
import {
  MAX_VIDEO_BYTES,
  SUPPORTED_VIDEO_EXTENSIONS,
  WARN_VIDEO_BYTES,
} from "@/lib/constants";

type VideoUploaderProps = {
  disabled?: boolean;
  onFileSelect: (file: File) => void;
  onError?: (message: string) => void;
};

function isSupportedVideo(file: File): boolean {
  const extension = getFileExtension(file.name);
  return SUPPORTED_VIDEO_EXTENSIONS.includes(
    extension as (typeof SUPPORTED_VIDEO_EXTENSIONS)[number],
  );
}

export function VideoUploader({
  disabled = false,
  onFileSelect,
  onError,
}: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validateAndSelect = useCallback(
    (file: File) => {
      try {
        if (!isSupportedVideo(file)) {
          throw new Error(
            "Unsupported video format. Use MP4, WebM, MOV, or MKV.",
          );
        }

        if (file.size > MAX_VIDEO_BYTES) {
          throw new Error("Video is too large. Maximum size is 500 MB.");
        }

        onFileSelect(file);
      } catch (validationError) {
        onError?.(
          validationError instanceof Error
            ? validationError.message
            : "Invalid video file",
        );
      }
    },
    [onError, onFileSelect],
  );

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    const file = event.dataTransfer.files?.[0];
    if (file) {
      validateAndSelect(file);
    }
  }

  return (
    <MagicCard
      className="rounded-2xl"
      gradientFrom="oklch(0.577 0.245 27.325)"
      gradientTo="oklch(0.769 0.188 70.08)"
      gradientColor="oklch(0.577 0.245 27.325 / 0.08)"
      gradientOpacity={0.6}
    >
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center transition-colors hover:bg-muted/50",
          disabled && "cursor-not-allowed opacity-60",
          isDragging && "border-primary bg-primary/5",
        )}
      >
        {isDragging && (
          <BorderBeam
            size={100}
            duration={6}
            colorFrom="oklch(0.577 0.245 27.325)"
            colorTo="oklch(0.769 0.188 70.08)"
          />
        )}
        <input
          type="file"
          accept={SUPPORTED_VIDEO_EXTENSIONS.join(",")}
          className="hidden"
          disabled={disabled}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";

            if (file) {
              validateAndSelect(file);
            }
          }}
        />
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="size-7" />
        </div>
        <p className="text-base font-medium text-foreground">
          Upload a video file
        </p>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Drag and drop or click to choose MP4, WebM, MOV, or MKV. Your video
          stays in the browser — only compressed audio is sent for transcription.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Max 500 MB. Large files over {formatBytes(WARN_VIDEO_BYTES)} may take
          longer to process.
        </p>
      </label>
    </MagicCard>
  );
}

export function validateVideoFile(file: File): string | null {
  if (!isSupportedVideo(file)) {
    return "Unsupported video format. Use MP4, WebM, MOV, or MKV.";
  }

  if (file.size > MAX_VIDEO_BYTES) {
    return "Video is too large. Maximum size is 500 MB.";
  }

  if (file.size > WARN_VIDEO_BYTES) {
    return `Large file (${formatBytes(file.size)}). Processing may take several minutes.`;
  }

  return null;
}
