"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "motion/react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
} & Accordion.AccordionItemProps;

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={cn(
        "mt-px overflow-hidden focus-within:relative focus-within:z-10",
        className,
      )}
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
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={cn(
        "group flex flex-1 cursor-pointer items-center justify-between px-5 text-[15px] leading-none outline-none",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export type FeaturesVerticalDataProps = {
  id: number;
  title: string;
  content: string;
  image?: string;
  icon?: React.ReactNode;
};

export type FeaturesVerticalProps = {
  collapseDelay?: number;
  ltr?: boolean;
  linePosition?: "left" | "right" | "top" | "bottom";
  data: FeaturesVerticalDataProps[];
};

export function FeaturesVertical({
  collapseDelay = 5000,
  ltr = false,
  linePosition = "left",
  data = [],
}: FeaturesVerticalProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const carouselRef = useRef<HTMLUListElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const timer = setTimeout(() => setCurrentIndex(isInView ? 0 : -1), 100);
    return () => clearTimeout(timer);
  }, [isInView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, collapseDelay);
    return () => clearInterval(timer);
  }, [collapseDelay, data.length]);

  return (
    <section ref={ref}>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto my-12 grid items-center gap-10 lg:grid-cols-2">
            <div
              className={cn(
                "hidden lg:flex order-1 lg:order-[0]",
                ltr ? "lg:order-2 lg:justify-end" : "justify-start",
              )}
            >
              <Accordion.Root
                type="single"
                value={`item-${currentIndex}`}
                onValueChange={(value) =>
                  setCurrentIndex(Number(value.split("-")[1]))
                }
              >
                {data.map((item, index) => (
                  <AccordionItem
                    key={item.id}
                    className="relative mb-8 last:mb-0"
                    value={`item-${index}`}
                  >
                    {linePosition === "left" ? (
                      <div className="absolute bottom-0 left-0 top-0 h-full w-0.5 overflow-hidden rounded-lg bg-neutral-300/50">
                        <div
                          className={cn(
                            "absolute left-0 top-0 w-full origin-top bg-primary transition-all ease-linear",
                            currentIndex === index ? "h-full" : "h-0",
                          )}
                          style={{
                            transitionDuration:
                              currentIndex === index ? `${collapseDelay}ms` : "0s",
                          }}
                        />
                      </div>
                    ) : null}
                    <div className="relative flex items-start">
                      <div className="mx-2 flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:mx-6">
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <AccordionTrigger className="h-auto flex-col items-start gap-2 py-0 pl-0 text-left leading-normal">
                          <span className="text-xl font-bold">{item.title}</span>
                          <span className="text-base font-normal leading-relaxed text-muted-foreground">
                            {item.content}
                          </span>
                        </AccordionTrigger>
                      </div>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion.Root>
            </div>

            <div
              className={cn(
                "mx-auto h-80 max-w-lg min-h-[280px] w-full sm:h-96",
                ltr && "lg:order-1",
              )}
            >
              {data[currentIndex]?.image ? (
                <motion.img
                  key={currentIndex}
                  src={data[currentIndex].image}
                  alt="feature"
                  className="mx-auto h-full w-full rounded-xl border border-neutral-300/50 object-contain object-left-top p-1 shadow-lg"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              ) : (
                <div className="aspect-auto h-full w-full rounded-xl border border-neutral-300/50 bg-muted p-1" />
              )}
            </div>

            <ul
              ref={carouselRef}
              className="flex h-full snap-x snap-mandatory flex-nowrap overflow-x-auto py-10 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
              style={{ padding: "50px calc(50%)" }}
            >
              {data.map((item, index) => (
                <li
                  key={item.id}
                  className="card relative mr-8 grid h-full max-w-60 shrink-0 items-start justify-center py-4 last:mr-0"
                  onClick={() => setCurrentIndex(index)}
                  role="button"
                  tabIndex={0}
                  style={{ scrollSnapAlign: "center" }}
                >
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="mx-0 max-w-sm text-balance text-sm leading-relaxed">
                    {item.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
