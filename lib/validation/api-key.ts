import { z } from "zod";

export const apiKeyBodySchema = z.object({
  apiKey: z
    .string()
    .trim()
    .min(10, "API key is too short")
    .max(256, "API key is too long"),
});

export type ApiKeyBody = z.infer<typeof apiKeyBodySchema>;
