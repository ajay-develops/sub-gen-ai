import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export const BLUR_FADE_DELAY = 0.15;

export const landingConfig = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  links: {
    email: "ajaydevelops38@gmail.com",
    github: "https://github.com/ajay-develops/sub-gen-ai",
    portfolio: "https://ajay-develops.vercel.app",
    aistudio: "https://aistudio.google.com/apikey",
  },
  headerNav: [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#faq", label: "FAQ" },
  ],
  byokValue: {
    title: "Bring your own key",
    subtitle: "Free to use",
    description:
      "SubGenAI has no subscription. Connect your Gemini API key and pay only for the transcription requests you run through Google AI Studio.",
    features: [
      "No SubGenAI subscription or usage fees",
      "Transparent billing through your Google account",
      "API keys encrypted with AES-256-GCM before storage",
      "Remove or rotate your key anytime in Settings",
    ],
  },
  faqs: [
    {
      question: "What is SubGenAI?",
      answer:
        "SubGenAI generates accurate, timestamped SRT subtitle files from your video uploads. Audio is extracted in your browser with ffmpeg.wasm, then transcribed using your own Google Gemini API key.",
    },
    {
      question: "Which video formats are supported?",
      answer:
        "MP4, WebM, MOV, and MKV files up to 500 MB. Larger files may work but transcoding in the browser will take longer.",
    },
    {
      question: "Where is my video processed?",
      answer:
        "Video stays on your device for audio extraction. Only the extracted audio is sent to Google Gemini for transcription — never the full video file.",
    },
    {
      question: "How is my API key stored?",
      answer:
        "Your Gemini API key is encrypted server-side with AES-256-GCM before being stored in Upstash Redis. It is never returned to your browser after saving.",
    },
    {
      question: "Do I need a paid Gemini account?",
      answer:
        "You need a Google AI Studio API key. Google offers a free tier with generous limits; beyond that you pay Google directly at their standard Gemini rates.",
    },
  ],
  testimonials: [
    {
      name: "Jordan Lee",
      role: "YouTube creator",
      quote:
        "SubGenAI cut my caption workflow from hours to minutes. Browser-side processing means I never worry about uploading raw footage.",
    },
    {
      name: "Priya Sharma",
      role: "Documentary editor",
      quote:
        "The SRT timestamps are accurate enough to drop straight into my NLE. BYOK keeps costs predictable for client projects.",
    },
    {
      name: "Marcus Chen",
      role: "Indie filmmaker",
      quote:
        "Finally a subtitle tool that respects privacy. Audio extraction happens locally and I control my own Gemini key.",
    },
  ],
} as const;
