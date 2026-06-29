"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { LandingAuthButtons } from "@/components/landing/auth-buttons";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { landingConfig } from "@/lib/landing-config";
import { cn } from "@/lib/utils";

export function LandingHeader() {
  const [addBorder, setAddBorder] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setAddBorder(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/60 py-2 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="relative mr-6 flex items-center space-x-2"
          title="SubGenAI home"
        >
          <BrandLogo nameClassName="text-xl font-bold" />
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center">
            <nav className="mr-10">
              <ul className="flex items-center gap-6">
                {landingConfig.headerNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <LandingAuthButtons />
          </div>
        </div>

        <div className="mt-2 block cursor-pointer lg:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle className="sr-only">Navigation</DrawerTitle>
              <DrawerDescription className="sr-only">
                Site navigation links
              </DrawerDescription>
              <DrawerHeader className="px-6">
                <Link href="/" className="flex items-center space-x-2">
                  <BrandLogo nameClassName="text-xl font-bold" />
                </Link>
                <nav className="mt-6">
                  <ul className="space-y-3 text-left">
                    {landingConfig.headerNav.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="font-semibold">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </DrawerHeader>
              <DrawerFooter>
                <LandingAuthButtons className="w-full flex-col [&_button]:w-full [&_a]:w-full" />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <hr
        className={cn(
          "absolute bottom-0 w-full transition-opacity duration-300 ease-in-out",
          addBorder ? "opacity-100" : "opacity-0",
        )}
      />
    </header>
  );
}
