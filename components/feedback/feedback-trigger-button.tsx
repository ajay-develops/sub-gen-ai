"use client";

import { MessageSquarePlus } from "lucide-react";
import { useFeedback } from "@/components/feedback/feedback-provider";
import { Button } from "@/components/ui/button";

export function FeedbackTriggerButton() {
  const { openFeedback } = useFeedback();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => openFeedback("header")}
      className="h-9 gap-2 rounded-full px-3 text-sm"
    >
      <MessageSquarePlus className="size-4" />
      Feedback
    </Button>
  );
}
