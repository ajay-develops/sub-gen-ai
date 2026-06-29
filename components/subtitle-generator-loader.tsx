"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const SubtitleGenerator = dynamic(
  () =>
    import("@/components/subtitle-generator").then(
      (mod) => mod.SubtitleGenerator,
    ),
  {
    ssr: false,
    loading: () => <SubtitleGeneratorSkeleton />,
  },
);

function SubtitleGeneratorSkeleton() {
  return (
    <div className="container flex w-full max-w-4xl flex-1 flex-col gap-8 py-12">
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-48 w-full rounded-2xl" />
    </div>
  );
}

export function SubtitleGeneratorLoader({
  initialHasApiKey,
}: {
  initialHasApiKey: boolean;
}) {
  return <SubtitleGenerator initialHasApiKey={initialHasApiKey} />;
}
