import { APP_NAME } from "@/lib/constants";
import { landingConfig } from "@/lib/landing-config";
import type { LegalDocument } from "@/lib/legal/types";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description: `How ${APP_NAME} collects, uses, and protects your information.`,
  lastUpdated: "June 29, 2026",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        `${APP_NAME} ("we", "us", or "our") helps you generate subtitle files from video. This Privacy Policy explains what information we collect, how we use it, and the choices you have when using our website and application.`,
        "By creating an account or using SubGenAI, you agree to the practices described in this policy.",
      ],
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      paragraphs: [
        "We collect only what is needed to operate the service:",
      ],
      list: [
        "Account information from Clerk, our authentication provider, such as your email address and basic profile details used to sign in.",
        "Your Google Gemini API key, which you voluntarily provide. Keys are encrypted with AES-256-GCM before being stored in Upstash Redis and are never returned to your browser after saving.",
        "Extracted audio sent to our transcription API when you generate subtitles. Video files are processed locally in your browser; we do not receive or store your original video files on our servers.",
        "Basic technical data such as request logs that hosting providers may record for security and reliability.",
      ],
    },
    {
      id: "information-we-do-not-collect",
      title: "Information we do not collect",
      paragraphs: [
        "SubGenAI is designed to minimize data exposure:",
      ],
      list: [
        "We do not upload or store your full video files on our servers.",
        "We do not sell your personal information.",
        "We do not use your content to train our own models.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      paragraphs: [
        "We use the information described above to:",
      ],
      list: [
        "Authenticate you and secure access to your account.",
        "Store and use your encrypted API key solely to send transcription requests to Google Gemini on your behalf.",
        "Operate, maintain, and improve SubGenAI.",
        "Respond to support requests and address abuse or security issues.",
      ],
    },
    {
      id: "third-party-services",
      title: "Third-party services",
      paragraphs: [
        "SubGenAI relies on trusted third parties to provide core functionality. Each provider processes data under its own terms and privacy policies:",
        "When you transcribe audio, that audio is transmitted to Google using your API key and is subject to Google's policies.",
      ],
      list: [
        "Clerk — user authentication and account management.",
        "Google Gemini — audio transcription using your own API key.",
        "Upstash Redis — encrypted storage of your API key.",
        "Vercel — application hosting and infrastructure.",
      ],
    },
    {
      id: "data-retention",
      title: "Data retention",
      paragraphs: [
        "Your encrypted API key remains stored until you delete it in Settings or delete your account access to the service.",
        "Transcription requests are processed in real time. We do not intentionally retain generated subtitle content on our servers after a request completes.",
        "Hosting and authentication providers may retain logs for a limited period according to their own retention practices.",
      ],
    },
    {
      id: "your-rights",
      title: "Your choices and rights",
      paragraphs: [
        "You can remove or rotate your Gemini API key at any time from Settings.",
        "You may request account deletion through Clerk or by contacting us. Removing your account does not automatically delete data held by third-party providers; you may need to manage those services separately.",
        "Depending on where you live, you may have additional rights to access, correct, or delete personal information. Contact us to make a request.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We use industry-standard measures including encryption at rest for API keys and authenticated access controls for protected routes.",
        "No method of transmission or storage is completely secure. You are responsible for keeping your account credentials and Gemini API key confidential.",
      ],
    },
    {
      id: "children",
      title: "Children's privacy",
      paragraphs: [
        "SubGenAI is not directed to children under 13, and we do not knowingly collect personal information from children. If you believe a child has provided us information, contact us so we can take appropriate action.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. When we do, we will revise the \"Last updated\" date at the top of this page. Continued use of SubGenAI after changes become effective constitutes acceptance of the updated policy.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `Questions about this Privacy Policy can be sent to ${landingConfig.links.email}.`,
      ],
    },
  ],
};
