import { auth } from "@clerk/nextjs/server";
import { SubtitleGeneratorLoader } from "@/components/subtitle-generator-loader";
import { hasUserApiKey } from "@/lib/keys/user-api-key";

export default async function AppPage() {
  const { userId } = await auth();
  let initialHasApiKey = false;

  if (userId) {
    try {
      initialHasApiKey = await hasUserApiKey(userId);
    } catch (error) {
      console.error("Failed to load API key status:", error);
    }
  }

  return <SubtitleGeneratorLoader initialHasApiKey={initialHasApiKey} />;
}
