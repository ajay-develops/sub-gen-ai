"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { normalizeSrt } from "@/lib/srt/validator";

type DownloadSrtButtonProps = {
  content: string;
  filename: string;
  disabled?: boolean;
  onDownloadComplete?: () => void;
};

export function DownloadSrtButton({
  content,
  filename,
  disabled = false,
  onDownloadComplete,
}: DownloadSrtButtonProps) {
  function handleDownload() {
    const normalized = normalizeSrt(content);
    const blob = new Blob([normalized], { type: "application/x-subrip" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const baseName = filename.replace(/\.[^.]+$/, "");

    anchor.href = url;
    anchor.download = `${baseName}.srt`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("Download complete. Your SRT file is ready to use.");
    onDownloadComplete?.();
  }

  return (
    <ShimmerButton
      type="button"
      onClick={handleDownload}
      disabled={disabled || !content.trim()}
      background="oklch(0.577 0.245 27.325)"
      className="inline-flex h-10 items-center gap-2 px-5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="size-4" />
      Download .srt
    </ShimmerButton>
  );
}
