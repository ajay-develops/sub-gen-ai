"use client";

import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export function LandingPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Browser-based · AI-powered · Privacy-first
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
            {APP_NAME}
          </h1>
          <p className="text-lg leading-8 text-zinc-600">{APP_DESCRIPTION}</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Show when="signed-out">
            <SignInButton mode="redirect" forceRedirectUrl="/app">
              <button className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition hover:bg-zinc-800">
                Log in
              </button>
            </SignInButton>
            <SignUpButton mode="redirect" forceRedirectUrl="/app">
              <button className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-950 transition hover:bg-zinc-50">
                Sign up
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/app"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Open Subtitle Tool
            </Link>
          </Show>
        </div>
      </div>
    </div>
  );
}
