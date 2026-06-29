import { auth } from "@clerk/nextjs/server";
import { ApiKeyForm } from "@/components/api-key-form";
import { PageHeader } from "@/components/layout/page-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { Card, CardContent } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/magic-card";
import { hasUserApiKey } from "@/lib/keys/user-api-key";

export default async function SettingsPage() {
  const { userId } = await auth();
  let initialHasKey = false;

  if (userId) {
    try {
      initialHasKey = await hasUserApiKey(userId);
    } catch (error) {
      console.error("Failed to load API key status:", error);
    }
  }

  return (
    <div className="container flex w-full max-w-3xl flex-1 flex-col py-8">
      <PageHeader
        label="Account"
        title="User Settings"
        description="Manage your Bring Your Own Key (BYOK) Gemini API key. Keys are encrypted with AES-256-GCM before being stored in Upstash Redis."
        className="mb-6"
      />

      <BlurFade inView delay={0.05}>
        <MagicCard
          className="rounded-2xl"
          gradientFrom="oklch(0.577 0.245 27.325)"
          gradientTo="oklch(0.769 0.188 70.08)"
          gradientColor="oklch(0.577 0.245 27.325 / 0.06)"
          gradientOpacity={0.5}
        >
          <Card className="border-0 bg-transparent shadow-none">
            <CardContent className="pt-6">
              <ApiKeyForm initialHasKey={initialHasKey} />
            </CardContent>
          </Card>
        </MagicCard>
      </BlurFade>
    </div>
  );
}
