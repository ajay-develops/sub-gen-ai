"use client";

import { Languages } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_SUBTITLE_LANGUAGE,
  SUBTITLE_LANGUAGE_OPTIONS,
  type SubtitleLanguage,
} from "@/lib/subtitle-languages";
import { cn } from "@/lib/utils";

type SubtitleLanguageSelectProps = {
  value: SubtitleLanguage;
  onChange: (language: SubtitleLanguage) => void;
  disabled?: boolean;
  className?: string;
};

export function SubtitleLanguageSelect({
  value,
  onChange,
  disabled = false,
  className,
}: SubtitleLanguageSelectProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor="subtitle-language"
        className="flex items-center gap-2 text-sm font-medium"
      >
        <Languages className="size-4 text-primary" />
        Subtitle language
      </Label>
      <Select
        value={value}
        onValueChange={(next) => onChange(next as SubtitleLanguage)}
        disabled={disabled}
      >
        <SelectTrigger id="subtitle-language" className="w-full">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {SUBTITLE_LANGUAGE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Choose how subtitles should be written. Hinglish is selected by default
        for the most natural Indian audience experience.
      </p>
    </div>
  );
}

export { DEFAULT_SUBTITLE_LANGUAGE };
