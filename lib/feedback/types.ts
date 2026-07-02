export type FeedbackSource = "post_download" | "header";

export type FeedbackCategory = "feedback" | "feature_request" | "both";

export type FeedbackSubmission = {
  source: FeedbackSource;
  qualityRating: number;
  category: FeedbackCategory;
  message: string;
};
