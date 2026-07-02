"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { UserFeedbackDrawer } from "@/components/feedback/user-feedback-drawer";
import {
  hasPostHogFeedbackSurvey,
  promptPostDownloadFeedback,
  showPostHogFeedbackSurvey,
} from "@/lib/analytics/surveys";
import type { FeedbackSource } from "@/lib/feedback/types";

type FeedbackContextValue = {
  openFeedback: (source: FeedbackSource) => void;
  promptAfterDownload: () => void;
};

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<FeedbackSource>("header");

  const openCustomFeedback = useCallback((nextSource: FeedbackSource) => {
    setSource(nextSource);
    setOpen(true);
  }, []);

  const openFeedback = useCallback(
    (nextSource: FeedbackSource) => {
      if (hasPostHogFeedbackSurvey()) {
        showPostHogFeedbackSurvey();
        return;
      }

      openCustomFeedback(nextSource);
    },
    [openCustomFeedback],
  );

  const promptAfterDownload = useCallback(() => {
    promptPostDownloadFeedback(() => openCustomFeedback("post_download"));
  }, [openCustomFeedback]);

  const value = useMemo(
    () => ({
      openFeedback,
      promptAfterDownload,
    }),
    [openFeedback, promptAfterDownload],
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      <UserFeedbackDrawer
        open={open}
        onOpenChange={setOpen}
        source={source}
      />
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }

  return context;
}
