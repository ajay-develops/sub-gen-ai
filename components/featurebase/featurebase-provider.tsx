"use client";

import { useAuth } from "@clerk/nextjs";
import {
  FeaturebaseProvider as FeaturebaseSDKProvider,
  useFeedbackWidget,
} from "featurebase-js/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  FEATUREBASE_APP_ID,
  isFeaturebaseConfigured,
} from "@/lib/featurebase/config";

function FeedbackWidget({ theme }: { theme: "light" | "dark" }) {
  useFeedbackWidget({
    theme,
    placement: "right",
  });

  return null;
}

export function FeaturebaseProvider() {
  const { isLoaded, isSignedIn } = useAuth();
  const { resolvedTheme } = useTheme();
  const [featurebaseJwt, setFeaturebaseJwt] = useState<string | undefined>();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    let cancelled = false;

    async function loadJwt() {
      if (!isSignedIn) {
        if (!cancelled) {
          setFeaturebaseJwt(undefined);
        }
        return;
      }

      try {
        const response = await fetch("/api/featurebase-sso");

        if (cancelled) {
          return;
        }

        if (response.ok) {
          const data = (await response.json()) as { token: string };
          setFeaturebaseJwt(data.token);
        } else {
          setFeaturebaseJwt(undefined);
        }
      } catch (error) {
        console.error("Failed to load Featurebase SSO token:", error);
        if (!cancelled) {
          setFeaturebaseJwt(undefined);
        }
      }
    }

    void loadJwt();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, isSignedIn]);

  if (!isFeaturebaseConfigured() || !isLoaded) {
    return null;
  }

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <FeaturebaseSDKProvider
      appId={FEATUREBASE_APP_ID}
      featurebaseJwt={featurebaseJwt}
      messenger={false}
    >
      <FeedbackWidget theme={theme} />
    </FeaturebaseSDKProvider>
  );
}
