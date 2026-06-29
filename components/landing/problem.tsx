import { Clock, Shield, Subtitles } from "lucide-react";
import { Section } from "@/components/landing/section";
import { BlurFade } from "@/components/ui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";

const problems = [
  {
    title: "Slow manual captioning",
    description:
      "Typing subtitles by hand or fixing auto-captions in an NLE eats hours on every project — time creators would rather spend editing.",
    icon: Clock,
  },
  {
    title: "Inaccurate timestamps",
    description:
      "Generic transcription tools often produce drift and misaligned cues, forcing tedious frame-by-frame corrections before export.",
    icon: Subtitles,
  },
  {
    title: "Privacy concerns",
    description:
      "Uploading full video files to third-party servers is risky for unreleased content, client work, and sensitive recordings.",
    icon: Shield,
  },
];

export function LandingProblem() {
  return (
    <Section
      title="Problem"
      subtitle="Manual subtitles shouldn't slow you down."
    >
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {problems.map((problem, index) => (
          <BlurFade key={problem.title} delay={0.2 + index * 0.2} inView>
            <Card className="border-none bg-background shadow-none">
              <CardContent className="space-y-4 p-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <problem.icon className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
