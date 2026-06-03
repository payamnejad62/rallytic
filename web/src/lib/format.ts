import type { Locale } from "@/i18n/config";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toLocaleDigits(input: string | number, locale: Locale): string {
  const s = String(input);
  if (locale !== "fa") return s;
  return s.replace(/\d/g, (d) => FA_DIGITS[parseInt(d, 10)]);
}

const JALALI_MONTHS_FA = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const JALALI_WEEKDAYS_FA = ["یک", "دو", "سه", "چه", "پن", "جم", "شن"];

// Gregorian → Jalali conversion (Khayyam-style; well-known accurate algorithm).
function div(a: number, b: number) {
  return Math.floor(a / b);
}

function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    div(gy2 + 3, 4) -
    div(gy2 + 99, 100) +
    div(gy2 + 399, 400) +
    gd +
    g_d_m[gm - 1];
  let jy = -1595 + 33 * div(days, 12053);
  days = days % 12053;
  jy += 4 * div(days, 1461);
  days %= 1461;
  if (days > 365) {
    jy += div(days - 1, 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + div(days, 31) : 7 + div(days - 186, 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return [jy, jm, jd];
}

export function formatDate(date: Date, locale: Locale, opts: { short?: boolean } = {}): string {
  if (locale === "fa") {
    const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    const monthName = JALALI_MONTHS_FA[jm - 1];
    const out = opts.short
      ? `${jd} ${monthName}`
      : `${jd} ${monthName} ${jy}`;
    return toLocaleDigits(out, "fa");
  }
  return date.toLocaleDateString(localeIntlTag(locale), {
    month: "short",
    day: "numeric",
    year: opts.short ? undefined : "numeric",
  });
}

export function weekdayShort(date: Date, locale: Locale): string {
  if (locale === "fa") {
    return JALALI_WEEKDAYS_FA[date.getDay()];
  }
  return date.toLocaleDateString(localeIntlTag(locale), { weekday: "short" });
}

export function localeIntlTag(locale: Locale): string {
  switch (locale) {
    case "fa":
      return "fa-IR";
    case "fr":
      return "fr-FR";
    case "es":
      return "es-ES";
    case "de":
      return "de-DE";
    default:
      return "en-US";
  }
}

export function formatNumber(n: number, locale: Locale): string {
  const s = new Intl.NumberFormat(locale === "fa" ? "en-US" : localeIntlTag(locale)).format(n);
  return locale === "fa" ? toLocaleDigits(s, "fa") : s;
}

// Convert digits in any pre-rendered string (e.g. "8W · 4L", "ITN 4")
export function localizeDigits(text: string, locale: Locale): string {
  if (locale !== "fa") return text;
  return toLocaleDigits(text, locale);
}
