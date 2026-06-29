import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";

interface LegalPageLayoutProps {
  children: React.ReactNode;
}

export function LegalPageLayout({ children }: LegalPageLayoutProps) {
  return (
    <main className="flex flex-1 flex-col">
      <LandingHeader />
      <div className="container mx-auto max-w-5xl px-5 py-12 sm:px-10 sm:py-16">
        {children}
      </div>
      <LandingFooter />
    </main>
  );
}
