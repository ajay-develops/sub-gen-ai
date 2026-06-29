export const SUBTITLE_LANGUAGES = ["hinglish", "english", "hindi"] as const;

export type SubtitleLanguage = (typeof SUBTITLE_LANGUAGES)[number];

export const DEFAULT_SUBTITLE_LANGUAGE: SubtitleLanguage = "hinglish";

export const SUBTITLE_LANGUAGE_OPTIONS: {
  value: SubtitleLanguage;
  label: string;
}[] = [
  { value: "hinglish", label: "Hinglish" },
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
];

export function isSubtitleLanguage(value: string): value is SubtitleLanguage {
  return SUBTITLE_LANGUAGES.includes(value as SubtitleLanguage);
}

export function getSubtitleLanguageLabel(language: SubtitleLanguage): string {
  return (
    SUBTITLE_LANGUAGE_OPTIONS.find((option) => option.value === language)?.label ??
    language
  );
}
