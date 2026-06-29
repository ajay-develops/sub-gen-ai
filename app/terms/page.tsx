import type { Metadata } from "next";
import { LegalDocumentContent } from "@/components/legal/legal-document-content";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import { APP_NAME } from "@/lib/constants";
import { termsOfService } from "@/lib/legal/terms-of-service";

export const metadata: Metadata = {
  title: `Terms of Service | ${APP_NAME}`,
  description: termsOfService.description,
};

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout>
      <LegalDocumentContent document={termsOfService} />
    </LegalPageLayout>
  );
}
