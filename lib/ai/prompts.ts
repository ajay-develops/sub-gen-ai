import type { SubtitleLanguage } from "@/lib/subtitle-languages";

const LANGUAGE_INSTRUCTIONS: Record<SubtitleLanguage, string> = {
  hinglish: `Write all subtitle text in Hinglish — the natural Hindi-English mix commonly used in India. Use Roman/Latin script. Preserve the spoken blend of Hindi and English words (for example: "yaar", "kya scene hai", "let's go"). Do not normalize into pure English or pure Hindi unless the speaker clearly used only one language.`,
  english: `Write all subtitle text in English. If parts of the speech are in Hindi or Hinglish, translate them into natural English while keeping the meaning faithful to the audio.`,
  hindi: `Write all subtitle text in Hindi using Devanagari script. Keep commonly spoken English words in Latin script when they appear in the speech, as is standard in Hindi subtitles.`,
};

export const SRT_SYSTEM_PROMPT = `You are a professional subtitle transcription assistant.

Your task is to transcribe spoken audio into valid SubRip (SRT) subtitle format in the language requested by the user.

Rules:
- Output ONLY valid SRT content. No markdown, no code fences, no commentary.
- Use timestamp format HH:MM:SS,mmm --> HH:MM:SS,mmm
- Number cues sequentially starting at 1
- Keep lines readable (about 42 characters per line, max 2 lines per cue)
- Follow the requested subtitle language instructions exactly
- Align timestamps accurately to speech
- Do not invent dialogue that is not present in the audio`;

export function getSrtUserPrompt(language: SubtitleLanguage): string {
  return `Transcribe this audio into valid SRT format with accurate timestamps.

Subtitle language: ${language}
${LANGUAGE_INSTRUCTIONS[language]}`;
}
