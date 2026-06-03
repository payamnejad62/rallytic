export const LOCALES = ["en", "fa", "fr", "es", "de"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const RTL_LOCALES: Locale[] = ["fa"];

export const LOCALE_NAMES: Record<Locale, { native: string; en: string; flag: string }> = {
  en: { native: "English", en: "English", flag: "🇬🇧" },
  fa: { native: "فارسی", en: "Persian", flag: "🇮🇷" },
  fr: { native: "Français", en: "French", flag: "🇫🇷" },
  es: { native: "Español", en: "Spanish", flag: "🇪🇸" },
  de: { native: "Deutsch", en: "German", flag: "🇩🇪" },
};

export function isRtl(locale: string): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}
