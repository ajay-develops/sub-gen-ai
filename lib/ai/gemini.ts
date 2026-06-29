import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { GEMINI_MODEL_ID } from "@/lib/constants";

export function createUserGeminiModel(apiKey: string) {
  const google = createGoogleGenerativeAI({ apiKey });
  const modelId = process.env.GEMINI_MODEL_ID ?? GEMINI_MODEL_ID;
  return google(modelId);
}
