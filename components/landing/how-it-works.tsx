import { Download, Sparkles, Upload } from "lucide-react";
import { FeaturesVertical } from "@/components/landing/features-vertical";
import { Section } from "@/components/landing/section";
import { landingScreenshots } from "@/lib/landing-screenshots";

const data = [
  {
    id: 1,
    title: "1. Upload your video",
    content:
      "Drop an MP4, WebM, MOV, or MKV file. SubGenAI validates format and size, then prepares ffmpeg.wasm in your browser.",
    image: landingScreenshots.uploadVideo,
    icon: <Upload className="size-6 text-primary" />,
  },
  {
    id: 2,
    title: "2. Transcribe with Gemini",
    content:
      "Audio is extracted locally and sent to Google Gemini using your API key. Choose your subtitle language and review the SRT preview.",
    image: landingScreenshots.subtitlePreview,
    icon: <Sparkles className="size-6 text-primary" />,
  },
  {
    id: 3,
    title: "3. Download SRT",
    content:
      "Download a timestamped .srt file ready for YouTube, Premiere Pro, DaVinci Resolve, or any platform that accepts standard subtitles.",
    image: landingScreenshots.downloadSubtitles,
    icon: <Download className="size-6 text-primary" />,
  },
];

export function LandingHowItWorks() {
  return (
    <Section id="how-it-works" title="How it works" subtitle="Just 3 steps to get started">
      <FeaturesVertical data={data} />
    </Section>
  );
}
