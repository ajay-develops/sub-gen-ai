import { Marquee } from "@/components/ui/marquee";

const technologies = [
  "Google Gemini",
  "ffmpeg.wasm",
  "Clerk Auth",
  "SRT Export",
  "Browser-side processing",
  "AES-256 encryption",
];

export function LandingLogos() {
  return (
    <section id="logos">
      <div className="container mx-auto px-4 py-12 md:px-8">
        <h3 className="text-center text-sm font-semibold text-muted-foreground">
          BUILT WITH TRUSTED TECHNOLOGY
        </h3>
        <div className="relative mt-6">
          <Marquee className="max-w-full [--duration:40s]">
            {technologies.map((name) => (
              <span
                key={name}
                className="mx-8 text-lg font-semibold text-muted-foreground/40"
              >
                {name}
              </span>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-background" />
        </div>
      </div>
    </section>
  );
}
