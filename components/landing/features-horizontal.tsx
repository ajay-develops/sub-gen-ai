"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "motion/react";
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
} & Accordion.AccordionItemProps;

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={cn("mt-px focus-within:relative focus-within:z-10", className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; className?: string }
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="">
    <Accordion.Trigger className={cn("", className)} {...props} ref={forwardedRef}>
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

type CardDataProps = {
  id: number;
  title: string;
  content: string;
  image?: string;
  video?: string;
  icon?: React.ReactNode;
};

export type FeaturesHorizontalProps = {
  collapseDelay?: number;
  ltr?: boolean;
  linePosition?: "left" | "right" | "top" | "bottom";
  data: CardDataProps[];
};

export function FeaturesHorizontal({
  collapseDelay = 5000,
  ltr = false,
  linePosition = "left",
  data = [],
}: FeaturesHorizontalProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const carouselRef = useRef<HTMLUListElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(isInView ? 0 : -1);
    }, 100);
    return () => clearTimeout(timer);
  }, [isInView]);

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelectorAll(".card")[index];
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    const carouselRect = carouselRef.current.getBoundingClientRect();
    const offset =
      cardRect.left -
      carouselRect.left -
      (carouselRect.width - cardRect.width) / 2;
    carouselRef.current.scrollTo({
      left: carouselRef.current.scrollLeft + offset,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, collapseDelay);
    return () => clearInterval(timer);
  }, [collapseDelay, data.length]);

  useEffect(() => {
    const autoScrollTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      scrollToIndex(nextIndex);
    }, collapseDelay);
    return () => clearInterval(autoScrollTimer);
  }, [collapseDelay, currentIndex, data.length]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const handleScroll = () => {
      const cardWidth = carousel.querySelector(".card")?.clientWidth ?? 0;
      const newIndex = Math.min(
        Math.floor(carousel.scrollLeft / cardWidth),
        data.length - 1,
      );
      setCurrentIndex(newIndex);
    };
    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, [data.length]);

  return (
    <section ref={ref} id="features">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div
            className={`hidden md:flex order-1 md:order-[0] ${
              ltr ? "md:order-2 md:justify-end" : "justify-start"
            }`}
          >
            <Accordion.Root
              className="grid gap-x-10 py-8 md:grid-cols-4"
              type="single"
              value={`item-${currentIndex}`}
              onValueChange={(value) =>
                setCurrentIndex(Number(value.split("-")[1]))
              }
            >
              {data.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  className="relative mb-8"
                  value={`item-${index}`}
                >
                  {linePosition === "bottom" || linePosition === "top" ? (
                    <div
                      className={cn(
                        "absolute left-0 right-0 h-0.5 overflow-hidden rounded-lg bg-neutral-300/50",
                        linePosition === "bottom" ? "bottom-0" : "top-0",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute left-0 h-full origin-left bg-primary transition-all ease-linear",
                          linePosition === "bottom" ? "bottom-0" : "top-0",
                          currentIndex === index ? "w-full" : "w-0",
                        )}
                        style={{
                          transitionDuration:
                            currentIndex === index ? `${collapseDelay}ms` : "0s",
                        }}
                      />
                    </div>
                  ) : null}

                  <AccordionTrigger>
                    <div className="relative flex flex-col items-center">
                      <div className="mx-2 flex size-16 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:mx-6">
                        {item.icon}
                      </div>
                      <div className="my-3 text-xl font-bold">{item.title}</div>
                      <div className="mb-4 justify-center text-center">
                        {item.content}
                      </div>
                    </div>
                  </AccordionTrigger>
                </AccordionItem>
              ))}
            </Accordion.Root>
          </div>

          <div
            className={cn(
              "relative mx-auto max-w-2xl overflow-hidden rounded-lg",
              ltr && "md:order-1",
            )}
          >
            {data[currentIndex]?.image ? (
              <motion.img
                key={currentIndex}
                src={data[currentIndex].image}
                alt="feature"
                className="relative mx-auto max-h-64 w-full rounded-lg border object-contain object-top shadow-lg sm:max-h-72"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            ) : (
              <div className="min-h-[400px] rounded-xl border border-neutral-300/50 bg-muted" />
            )}
            <BorderBeam
              size={400}
              duration={12}
              delay={9}
              borderWidth={1.5}
              colorFrom="var(--primary)"
              colorTo="color-mix(in oklch, var(--primary) 0%, transparent)"
            />
          </div>

          <ul
            ref={carouselRef}
            className="flex h-full snap-x snap-mandatory flex-nowrap overflow-x-auto py-10 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
            style={{ padding: "50px calc(50%)" }}
          >
            {data.map((item, index) => (
              <li
                key={item.id}
                className="card relative mr-8 grid h-full max-w-60 shrink-0 items-start justify-center py-4 last:mr-0"
                onClick={() => setCurrentIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setCurrentIndex(index);
                }}
                role="button"
                tabIndex={0}
                style={{ scrollSnapAlign: "center" }}
              >
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="mx-0 max-w-sm text-balance text-sm">{item.content}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
