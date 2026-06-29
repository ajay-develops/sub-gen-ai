import { LandingAuthButtons } from "@/components/landing/auth-buttons";
import { Section } from "@/components/landing/section";

export function LandingCta() {
  return (
    <Section
      id="cta"
      title="Ready to generate subtitles?"
      subtitle="Create your account and connect your Gemini key in under a minute."
      className="rounded-xl bg-primary/10 py-16"
    >
      <div className="flex w-full flex-col items-center justify-center space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <LandingAuthButtons />
      </div>
    </Section>
  );
}
