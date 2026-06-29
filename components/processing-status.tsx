import {
  Check,
  Download,
  Sparkles,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BorderBeam } from "@/components/ui/border-beam";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ProcessingStep =
  | "idle"
  | "loading-ffmpeg"
  | "extracting"
  | "transcribing"
  | "complete"
  | "error";

type ProcessingStatusProps = {
  step: ProcessingStep;
  error?: string | null;
  hasDownloaded?: boolean;
};

const USER_STEPS: {
  id: "upload" | "transcribe" | "download";
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "upload", label: "Upload", icon: Upload },
  { id: "transcribe", label: "Transcribe", icon: Sparkles },
  { id: "download", label: "Download", icon: Download },
];

function toUserStepIndex(step: ProcessingStep): number {
  if (step === "idle") return 0;
  if (step === "complete") return 2;
  return 1;
}

function isPreparingVideo(step: ProcessingStep): boolean {
  return step === "loading-ffmpeg" || step === "extracting";
}

export function ProcessingStatus({
  step,
  error,
  hasDownloaded = false,
}: ProcessingStatusProps) {
  const activeUserIndex = toUserStepIndex(step);
  const isProcessing =
    isPreparingVideo(step) || step === "transcribing";
  const showBeam = isProcessing || step === "idle";

  return (
    <Card size="sm" className="relative overflow-hidden py-0">
      {showBeam && (
        <BorderBeam
          size={80}
          duration={8}
          colorFrom="oklch(0.577 0.245 27.325)"
          colorTo="oklch(0.769 0.188 70.08)"
        />
      )}
      <CardContent
        className={cn(
          "flex min-h-[52px] flex-col justify-center py-3",
          error && "space-y-3",
        )}
      >
        <div className="flex flex-wrap items-center justify-center gap-2">
          {USER_STEPS.map((item, index) => {
            const Icon = item.icon;
            const completed =
              index === 2
                ? hasDownloaded
                : step === "complete"
                  ? true
                  : index < activeUserIndex;
            const active =
              !hasDownloaded &&
              ((step === "complete" && index === 2) ||
                (step !== "complete" && index === activeUserIndex));

            return (
              <div key={item.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    completed &&
                      "border-emerald-200 bg-emerald-50 text-emerald-800",
                    active &&
                      !completed &&
                      "border-primary/30 bg-primary/10 text-primary",
                    !completed &&
                      !active &&
                      "border-border bg-muted text-muted-foreground",
                  )}
                >
                  {completed ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Icon className="size-3.5" />
                  )}
                  {item.label}
                </div>
                {index < USER_STEPS.length - 1 && (
                  <span className="hidden text-muted-foreground sm:inline">
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
