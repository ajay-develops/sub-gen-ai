import { auth } from "@clerk/nextjs/server";
import { streamText } from "ai";
import { createUserGeminiModel } from "@/lib/ai/gemini";
import { SRT_SYSTEM_PROMPT, getSrtUserPrompt } from "@/lib/ai/prompts";
import { MAX_AUDIO_UPLOAD_BYTES } from "@/lib/constants";
import { getUserApiKey } from "@/lib/keys/user-api-key";
import {
  DEFAULT_SUBTITLE_LANGUAGE,
  isSubtitleLanguage,
} from "@/lib/subtitle-languages";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const ALLOWED_AUDIO_TYPES = new Set(["audio/mpeg", "audio/mp3"]);

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = await getUserApiKey(userId);

  if (!apiKey) {
    return Response.json(
      { error: "No API key configured. Add one in Settings." },
      { status: 403 },
    );
  }

  try {
    const formData = await request.formData();
    const audio = formData.get("audio");
    const languageInput = formData.get("language");
    const language =
      typeof languageInput === "string" && isSubtitleLanguage(languageInput)
        ? languageInput
        : DEFAULT_SUBTITLE_LANGUAGE;

    if (!(audio instanceof File)) {
      return Response.json({ error: "Audio file is required" }, { status: 400 });
    }

    if (!ALLOWED_AUDIO_TYPES.has(audio.type) && audio.type !== "") {
      return Response.json({ error: "Unsupported audio format" }, { status: 400 });
    }

    if (audio.size > MAX_AUDIO_UPLOAD_BYTES) {
      return Response.json(
        { error: "Audio file is too large. Try a shorter clip." },
        { status: 413 },
      );
    }

    const audioBuffer = await audio.arrayBuffer();
    const model = createUserGeminiModel(apiKey);

    const result = streamText({
      model,
      system: SRT_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: getSrtUserPrompt(language) },
            {
              type: "file",
              data: audioBuffer,
              mediaType: "audio/mpeg",
            },
          ],
        },
      ],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Transcription failed:", error);
    return Response.json({ error: "Transcription failed" }, { status: 500 });
  }
}
