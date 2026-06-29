import Link from "next/link";
import { ExternalLink, Key, Shield, Sparkles } from "lucide-react";
import { ApiKeyDemoVideo } from "@/components/api-key-demo-video";
import { ApiKeyForm } from "@/components/api-key-form";
import { MagicCard } from "@/components/ui/magic-card";

type ApiKeyOnboardingCardProps = {
  onConfigured: () => void;
};

const TRUST_BULLETS = [
  {
    icon: ExternalLink,
    text: (
      <>
        Get a free key from{" "}
        <Link
          href="https://aistudio.google.com/apikey"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-2"
        >
          Google AI Studio
        </Link>
      </>
    ),
  },
  {
    icon: Shield,
    text: "Encrypted with AES-256-GCM before storage",
  },
  {
    icon: Sparkles,
    text: "Never returned to your browser after saving",
  },
] as const;

export function ApiKeyOnboardingCard({ onConfigured }: ApiKeyOnboardingCardProps) {
  return (
    <MagicCard
      className="rounded-2xl"
      gradientFrom="oklch(0.577 0.245 27.325)"
      gradientTo="oklch(0.769 0.188 70.08)"
      gradientColor="oklch(0.577 0.245 27.325 / 0.08)"
      gradientOpacity={0.45}
    >
      <div className="space-y-6 p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Key className="size-5" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">
              Connect your Gemini API key
            </h2>
            <p className="text-sm text-muted-foreground">
              SubGenAI uses your own key — you control usage and billing. Setup
              takes under a minute.
            </p>
          </div>
        </div>

        <ApiKeyDemoVideo />

        <ul className="space-y-2.5">
          {TRUST_BULLETS.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={index}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <Icon className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item.text}</span>
              </li>
            );
          })}
        </ul>

        <ApiKeyForm
          variant="onboarding"
          initialHasKey={false}
          onConfigured={onConfigured}
        />

        <p className="text-center text-xs text-muted-foreground">
          Manage your key anytime in{" "}
          <Link
            href="/app/settings"
            className="font-medium text-primary underline underline-offset-2"
          >
            Settings
          </Link>
        </p>
      </div>
    </MagicCard>
  );
}
