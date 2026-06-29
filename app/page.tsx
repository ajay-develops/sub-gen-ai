import { LandingByokValue } from "@/components/landing/byok-value";
import { LandingCta } from "@/components/landing/cta";
import { LandingFaq } from "@/components/landing/faq";
import { LandingFeatures } from "@/components/landing/features";
import { LandingFooter } from "@/components/landing/footer";
import { LandingHeader } from "@/components/landing/header";
import { LandingHero } from "@/components/landing/hero";
import { LandingHowItWorks } from "@/components/landing/how-it-works";
import { LandingLogos } from "@/components/landing/logos";
import { LandingProblem } from "@/components/landing/problem";
import { LandingSolution } from "@/components/landing/solution";
import { LandingTestimonials } from "@/components/landing/testimonials";
import { LandingTestimonialsCarousel } from "@/components/landing/testimonials-carousel";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <LandingHeader />
      <LandingHero />
      <LandingLogos />
      <LandingProblem />
      <LandingSolution />
      <LandingHowItWorks />
      <LandingTestimonialsCarousel />
      <LandingFeatures />
      <LandingTestimonials />
      <LandingByokValue />
      <LandingFaq />
      <LandingCta />
      <LandingFooter />
    </main>
  );
}
