"use client";

import { Check } from "lucide-react";
import { LandingAuthButtons } from "@/components/landing/auth-buttons";
import { Section } from "@/components/landing/section";
import { MagicCard } from "@/components/ui/magic-card";
import { landingConfig } from "@/lib/landing-config";

export function LandingByokValue() {
  const { byokValue } = landingConfig;

  return (
    <Section
      id="pricing"
      title={byokValue.title}
      subtitle={byokValue.subtitle}
      description={byokValue.description}
    >
      <div className="mx-auto mt-12 max-w-lg">
        <MagicCard
          className="rounded-2xl"
          gradientFrom="oklch(0.577 0.245 27.325)"
          gradientTo="oklch(0.769 0.188 70.08)"
          gradientColor="oklch(0.577 0.245 27.325 / 0.08)"
          gradientOpacity={0.45}
        >
          <div className="space-y-6 p-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">$0</p>
              <p className="mt-1 text-sm text-muted-foreground">
                SubGenAI subscription — pay Google for API usage only
              </p>
            </div>
            <ul className="space-y-3">
              {byokValue.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center pt-2">
              <LandingAuthButtons className="justify-center" />
            </div>
          </div>
        </MagicCard>
      </div>
    </Section>
  );
}
