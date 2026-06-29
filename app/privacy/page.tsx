import type { Metadata } from "next";
import { LegalDocumentContent } from "@/components/legal/legal-document-content";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { APP_NAME } from "@/lib/constants";
import { privacyPolicy } from "@/lib/legal/privacy-policy";

export const metadata: Metadata = {
  title: `Privacy Policy | ${APP_NAME}`,
  description: privacyPolicy.description,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout>
      <LegalDocumentContent document={privacyPolicy} />
    </LegalPageLayout>
  );
}
