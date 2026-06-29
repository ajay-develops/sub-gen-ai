import { FileText, Globe, Key, Upload } from "lucide-react";
import { FeaturesHorizontal } from "@/components/landing/features-horizontal";
import { Section } from "@/components/landing/section";
import { landingScreenshots } from "@/lib/landing-screenshots";

const data = [
  {
    id: 1,
    title: "Drag-and-drop upload",
    content: "Upload videos up to 500 MB with instant validation and progress feedback.",
    image: landingScreenshots.uploadVideo,
    icon: <Upload className="size-6 text-primary" />,
  },
  {
    id: 2,
    title: "Language selection",
    content: "Pick the spoken language for accurate transcription and localized subtitles.",
    image: landingScreenshots.selectLanguage,
    icon: <Globe className="size-6 text-primary" />,
  },
  {
    id: 3,
    title: "Terminal SRT preview",
    content: "Review timestamped cues in a live preview before downloading your file.",
    image: landingScreenshots.subtitlePreview,
    icon: <FileText className="size-6 text-primary" />,
  },
  {
    id: 4,
    title: "Encrypted API keys",
    content: "Store your Gemini key securely with AES-256-GCM encryption and BYOK billing.",
    image: landingScreenshots.updateApiKey,
    icon: <Key className="size-6 text-primary" />,
  },
];

export function LandingFeatures() {
  return (
    <Section
      id="features"
      title="Features"
      subtitle="Get production-ready subtitles"
    >
      <FeaturesHorizontal collapseDelay={5000} linePosition="bottom" data={data} />
    </Section>
  );
}
