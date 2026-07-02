"use client";

import Link from "next/link";
import { Key, Shield } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnalyticsEvents, captureEvent } from "@/lib/analytics/events";
import { cn } from "@/lib/utils";

type ApiKeyFormProps = {
  initialHasKey: boolean;
  variant?: "settings" | "onboarding";
  onConfigured?: () => void;
  className?: string;
};

type KeyStatus = "configured" | "missing";

export function ApiKeyForm({
  initialHasKey,
  variant = "settings",
  onConfigured,
  className,
}: ApiKeyFormProps) {
  const inputId = useId();
  const isOnboarding = variant === "onboarding";
  const [status, setStatus] = useState<KeyStatus>(
    initialHasKey ? "configured" : "missing",
  );
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/settings/api-key", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save API key");
      }

      setApiKey("");
      setStatus("configured");
      captureEvent(AnalyticsEvents.API_KEY_SAVED, {
        context: isOnboarding ? "onboarding" : "settings",
      });

      if (isOnboarding) {
        toast.success("You're all set! Upload a video to get started.");
        onConfigured?.();
      } else {
        toast.success("API key saved securely.");
      }
    } catch (saveError) {
      toast.error(
        saveError instanceof Error
          ? saveError.message
          : "Failed to save API key",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleRemove() {
    setIsRemoving(true);

    try {
      const response = await fetch("/api/settings/api-key", {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to remove API key");
      }

      setStatus("missing");
      captureEvent(AnalyticsEvents.API_KEY_REMOVED);
      toast.success("API key removed.");
    } catch (removeError) {
      toast.error(
        removeError instanceof Error
          ? removeError.message
          : "Failed to remove API key",
      );
    } finally {
      setIsRemoving(false);
    }
  }

  function submitLabel() {
    if (isSaving) return "Saving...";
    if (isOnboarding) return "Save and continue";
    if (status === "configured") return "Update key";
    return "Save key";
  }

  return (
    <div className={cn(isOnboarding ? "space-y-4" : "space-y-6", className)}>
      {!isOnboarding && (
        <Card className="border-border bg-muted/40">
          <CardContent className="flex items-start gap-4 pt-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="size-5" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-foreground">
                  Gemini API key status
                </p>
                <Badge
                  variant={status === "configured" ? "default" : "secondary"}
                >
                  {status === "configured" ? "Configured" : "Not configured"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {status === "configured"
                  ? "A Gemini API key is configured for your account."
                  : "No API key saved yet. Add one to enable transcription."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-2">
          {!isOnboarding && (
            <Label
              htmlFor={inputId}
              className="flex items-center gap-2 text-sm font-medium"
            >
              <Key className="size-4 text-primary" />
              {status === "configured"
                ? "Update Gemini API key"
                : "Gemini API key"}
            </Label>
          )}
          <Input
            id={inputId}
            type="password"
            autoComplete="off"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            placeholder="Paste your Gemini API key"
          />
          {!isOnboarding && (
            <p className="text-sm text-muted-foreground">
              Your key is encrypted server-side before storage and is never
              returned to the browser. Create one in{" "}
              <Link
                href="https://aistudio.google.com/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2"
              >
                Google AI Studio
              </Link>
              .
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <ShimmerButton
            type="submit"
            disabled={isSaving || !apiKey.trim()}
            background="oklch(0.577 0.245 27.325)"
            className="h-10 px-5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitLabel()}
          </ShimmerButton>

          {!isOnboarding && status === "configured" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => void handleRemove()}
              disabled={isRemoving}
              className="h-10 rounded-full px-5"
            >
              {isRemoving ? "Removing..." : "Remove key"}
            </Button>
          )}
        </div>
      </form>

      {!isOnboarding && status === "missing" && (
        <Alert>
          <AlertDescription>
            You need a Gemini API key before you can generate subtitles.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
