import { APP_NAME } from "@/lib/constants";
import { landingConfig } from "@/lib/landing-config";
import type { LegalDocument } from "@/lib/legal/types";

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description: `The rules and conditions for using ${APP_NAME}.`,
  lastUpdated: "June 29, 2026",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of terms",
      paragraphs: [
        `These Terms of Service ("Terms") govern your access to and use of ${APP_NAME}, including our website, application, and related services (collectively, the "Service").`,
        "By creating an account or using the Service, you agree to these Terms and our Privacy Policy. If you do not agree, do not use SubGenAI.",
      ],
    },
    {
      id: "description",
      title: "Description of the service",
      paragraphs: [
        "SubGenAI is a browser-based tool that extracts audio from video files locally and uses your own Google Gemini API key to generate subtitle files.",
        "SubGenAI does not charge a subscription fee. You are responsible for any fees charged by Google or other third-party providers when using your API key.",
      ],
    },
    {
      id: "accounts",
      title: "Accounts and eligibility",
      paragraphs: [
        "You must create an account to use protected features of the Service. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account.",
        "You must be at least 13 years old to use SubGenAI. By using the Service, you represent that you meet this requirement.",
      ],
    },
    {
      id: "api-keys",
      title: "Bring your own API key",
      paragraphs: [
        "You provide your own Google Gemini API key to run transcriptions. You represent that you have the right to use that key and that your use complies with Google's terms and applicable law.",
        "You may add, rotate, or remove your stored API key at any time in Settings. We encrypt keys at rest but cannot guarantee outcomes of third-party AI services.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      paragraphs: [
        "You agree not to misuse the Service. Prohibited conduct includes:",
      ],
      list: [
        "Uploading or processing content you do not have the rights to use.",
        "Attempting to bypass security, access other users' data, or interfere with Service operation.",
        "Using the Service for unlawful, harmful, or abusive purposes.",
        "Reverse engineering or reselling the Service except where permitted by applicable open-source licenses for our code.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      paragraphs: [
        "SubGenAI's branding, site design, and original application code are owned by us or our licensors, subject to any open-source licenses that apply to published source code.",
        "You retain ownership of your video files, audio, and generated subtitles. We claim no ownership over content you create using the Service.",
      ],
    },
    {
      id: "disclaimer",
      title: "Disclaimer of warranties",
      paragraphs: [
        'The Service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
        "We do not warrant that subtitle output will be perfectly accurate, uninterrupted, or error-free. You are responsible for reviewing generated subtitles before use.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, SubGenAI and its operators will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or goodwill arising from your use of the Service.",
        "Our total liability for any claim relating to the Service will not exceed the amount you paid us for the Service in the twelve months before the claim, or zero if the Service was provided free of charge.",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      paragraphs: [
        "You may stop using the Service at any time. We may suspend or terminate access if you violate these Terms or if we reasonably believe your use poses a security or legal risk.",
        "Sections that by their nature should survive termination — including disclaimers, limitations of liability, and governing provisions — will continue to apply.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      paragraphs: [
        "We may update these Terms from time to time. Material changes will be reflected by updating the \"Last updated\" date on this page. Continued use after changes take effect constitutes acceptance of the revised Terms.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        `Questions about these Terms can be sent to ${landingConfig.links.email}.`,
      ],
    },
  ],
};
