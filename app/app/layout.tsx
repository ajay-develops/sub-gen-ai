import { AppHeader } from "@/components/layout/app-header";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light flex min-h-full flex-col bg-background">
      <AppHeader />
      <main className="relative flex flex-1 flex-col">
        <DotPattern
          className="pointer-events-none opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"
          width={20}
          height={20}
          cr={1}
        />
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      </main>
    </div>
  );
}
