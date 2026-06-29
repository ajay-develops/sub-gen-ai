import { Quote } from "lucide-react";
import { Section } from "@/components/landing/section";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { landingConfig } from "@/lib/landing-config";

export function LandingTestimonialsCarousel() {
  return (
    <Section
      title="Testimonial Highlight"
      subtitle="What creators are saying"
    >
      <Carousel>
        <div className="relative mx-auto max-w-2xl">
          <CarouselContent>
            {landingConfig.testimonials.map((item) => (
              <CarouselItem key={item.name}>
                <div className="p-2 pb-5">
                  <div className="text-center">
                    <Quote className="mx-auto my-4 size-10 text-muted-foreground/40" />
                    <BlurFade delay={0.25} inView>
                      <h4 className="mx-auto max-w-lg px-10 text-lg font-normal leading-relaxed">
                        {item.quote}
                      </h4>
                    </BlurFade>
                    <BlurFade delay={0.5} inView>
                      <h4 className="my-2 text-lg font-semibold">{item.name}</h4>
                    </BlurFade>
                    <BlurFade delay={0.75} inView>
                      <span className="text-sm text-muted-foreground">
                        {item.role}
                      </span>
                    </BlurFade>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-2/12 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/12 bg-gradient-to-l from-background" />
        </div>
        <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 md:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </Section>
  );
}
