const TIMESTAMP_PATTERN =
  /\d{2}:\d{2}:\d{2},\d{3}\s-->\s\d{2}:\d{2}:\d{2},\d{3}/;

export function stripMarkdownFences(text: string): string {
  return text
    .replace(/^```(?:srt|text)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

export function isLikelyValidSrt(text: string): boolean {
  const cleaned = stripMarkdownFences(text);

  if (!cleaned) {
    return false;
  }

  const hasCueNumber = /^\d+\s*$/m.test(cleaned);
  const hasTimestamp = TIMESTAMP_PATTERN.test(cleaned);

  return hasCueNumber && hasTimestamp;
}

export function normalizeSrt(text: string): string {
  return stripMarkdownFences(text).replace(/\r\n/g, "\n").trim();
}
