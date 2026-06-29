"use client";

import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LandingAuthButtonsProps = {
  className?: string;
  signUpClassName?: string;
  signInClassName?: string;
};

export function LandingAuthButtons({
  className,
  signUpClassName,
  signInClassName,
}: LandingAuthButtonsProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Show when="signed-out">
        <SignInButton mode="redirect" forceRedirectUrl="/app">
          <button
            type="button"
            className={cn(buttonVariants({ variant: "outline" }), signInClassName)}
          >
            Log in
          </button>
        </SignInButton>
        <SignUpButton mode="redirect" forceRedirectUrl="/app">
          <button
            type="button"
            className={cn(
              buttonVariants({ variant: "default" }),
              "text-primary-foreground",
              signUpClassName,
            )}
          >
            Get started free
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link
          href="/app"
          className={cn(
            buttonVariants({ variant: "default" }),
            "text-primary-foreground",
            signUpClassName,
          )}
        >
          Open app
        </Link>
      </Show>
    </div>
  );
}
