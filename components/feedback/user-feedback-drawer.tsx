"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AnalyticsEvents, captureEvent } from "@/lib/analytics/events";
import type {
  FeedbackCategory,
  FeedbackSource,
  FeedbackSubmission,
} from "@/lib/feedback/types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS: Array<{
  value: FeedbackCategory;
  label: string;
}> = [
  { value: "feedback", label: "General feedback" },
  { value: "feature_request", label: "Feature request" },
  { value: "both", label: "Both" },
];

type UserFeedbackDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: FeedbackSource;
};

export function UserFeedbackDrawer({
  open,
  onOpenChange,
  source,
}: UserFeedbackDrawerProps) {
  const [qualityRating, setQualityRating] = useState<number | null>(null);
  const [category, setCategory] = useState<FeedbackCategory>("both");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetForm() {
    setQualityRating(null);
    setCategory("both");
    setMessage("");
  }

  function closeDrawer({ dismissed }: { dismissed: boolean }) {
    if (dismissed) {
      captureEvent(AnalyticsEvents.USER_FEEDBACK_DISMISSED, { source });
    }

    resetForm();
    onOpenChange(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (qualityRating === null) {
      toast.error("Please rate the subtitle quality.");
      return;
    }

    if (!message.trim()) {
      toast.error("Please share your feedback or feature request.");
      return;
    }

    const submission: FeedbackSubmission = {
      source,
      qualityRating,
      category,
      message: message.trim(),
    };

    setIsSubmitting(true);

    try {
      captureEvent(AnalyticsEvents.USER_FEEDBACK_SUBMITTED, {
        source: submission.source,
        quality_rating: submission.qualityRating,
        category: submission.category,
        message: submission.message,
        message_length: submission.message.length,
      });

      toast.success("Thanks for your feedback!");
      closeDrawer({ dismissed: false });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          closeDrawer({ dismissed: true });
          return;
        }

        onOpenChange(nextOpen);
      }}
    >
      <DrawerContent className="mx-auto w-full max-w-lg">
        <DrawerHeader>
          <DrawerTitle>Share feedback</DrawerTitle>
          <DrawerDescription>
            Tell us how the subtitles worked and what we should build next.
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="space-y-5 px-4 pb-2">
          <div className="space-y-2">
            <Label>How was the subtitle quality?</Label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setQualityRating(rating)}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                    qualityRating === rating
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted",
                  )}
                  aria-label={`Rate ${rating} out of 5`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>What are you sharing?</Label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCategory(option.value)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    category === option.value
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback-message">Your message</Label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="What worked well? What should we improve or build next?"
              rows={4}
              className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            />
          </div>

          <DrawerFooter className="px-0">
            <ShimmerButton
              type="submit"
              disabled={isSubmitting}
              background="oklch(0.577 0.245 27.325)"
              className="h-10 w-full text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Submit feedback"}
            </ShimmerButton>
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="rounded-full">
                Not now
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
