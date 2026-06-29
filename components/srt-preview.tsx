"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@/components/ui/terminal";
import { cn } from "@/lib/utils";

type SrtPreviewProps = {
  content: string;
  isStreaming?: boolean;
  fileName?: string | null;
  className?: string;
};

export function SrtPreview({
  content,
  isStreaming = false,
  fileName,
  className,
}: SrtPreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [content]);

  const displayContent =
    content || "Subtitles will appear here as they are generated.";

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-sm font-medium text-foreground">SRT preview</h2>
          {fileName && (
            <p className="truncate text-xs text-muted-foreground">{fileName}</p>
          )}
        </div>
        {isStreaming && (
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Streaming...
          </span>
        )}
      </div>
      <Terminal sequence={false} className="h-96 max-w-none">
        <div
          ref={contentRef}
          className="h-full min-h-0 overflow-x-hidden overflow-y-auto whitespace-pre-wrap break-words font-mono text-xs leading-6 text-foreground"
        >
          {displayContent}
          {isStreaming && (
            <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-primary align-middle" />
          )}
        </div>
      </Terminal>
    </div>
  );
}
