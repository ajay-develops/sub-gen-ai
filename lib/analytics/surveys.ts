import posthog, { DisplaySurveyType } from "posthog-js";

const POST_DOWNLOAD_PROMPT_KEY = "subgenai_post_download_feedback_prompted";

export function getPostHogFeedbackSurveyId(): string | undefined {
  return process.env.NEXT_PUBLIC_POSTHOG_FEEDBACK_SURVEY_ID;
}

export function hasPostHogFeedbackSurvey(): boolean {
  return Boolean(getPostHogFeedbackSurveyId());
}

export function showPostHogFeedbackSurvey(): void {
  const surveyId = getPostHogFeedbackSurveyId();
  if (!surveyId) {
    return;
  }

  const display = () => {
    posthog.displaySurvey(surveyId, {
      displayType: DisplaySurveyType.Popover,
      ignoreConditions: true,
      ignoreDelay: true,
    });
  };

  posthog.onSurveysLoaded(display);
}

export function promptPostDownloadFeedback(
  openCustomFeedback: () => void,
): void {
  if (sessionStorage.getItem(POST_DOWNLOAD_PROMPT_KEY)) {
    return;
  }

  sessionStorage.setItem(POST_DOWNLOAD_PROMPT_KEY, "1");

  window.setTimeout(() => {
    if (hasPostHogFeedbackSurvey()) {
      showPostHogFeedbackSurvey();
      return;
    }

    openCustomFeedback();
  }, 1200);
}
