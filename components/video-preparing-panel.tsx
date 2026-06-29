import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";

type VideoPreparingPanelProps = {
  progress?: number;
  fileName?: string | null;
};

export function VideoPreparingPanel({
  progress = 0,
  fileName,
}: VideoPreparingPanelProps) {
  return (
    <MagicCard
      className="rounded-2xl"
      gradientFrom="oklch(0.577 0.245 27.325)"
      gradientTo="oklch(0.769 0.188 70.08)"
      gradientColor="oklch(0.577 0.245 27.325 / 0.08)"
      gradientOpacity={0.6}
    >
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
        <BorderBeam
          size={100}
          duration={6}
          colorFrom="oklch(0.577 0.245 27.325)"
          colorTo="oklch(0.769 0.188 70.08)"
        />
        <AnimatedCircularProgressBar
          value={progress}
          gaugePrimaryColor="oklch(0.577 0.245 27.325)"
          gaugeSecondaryColor="oklch(0.922 0 0)"
          className="size-16 text-sm"
        />
        <p className="mt-4 text-base font-medium text-foreground">
          Preparing your video...
        </p>
        {fileName && (
          <p className="mt-2 max-w-md truncate text-xs text-muted-foreground">
            {fileName}
          </p>
        )}
      </div>
    </MagicCard>
  );
}
