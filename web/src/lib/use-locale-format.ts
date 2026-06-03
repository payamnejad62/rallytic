"use client";

import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { Locale } from "@/i18n/config";
import { localizeDigits, formatDate, weekdayShort, formatNumber } from "./format";

export function useLocaleFormat() {
  const locale = useLocale() as Locale;
  return useMemo(
    () => ({
      locale,
      d: (s: string | number) => localizeDigits(String(s), locale),
      n: (n: number) => formatNumber(n, locale),
      date: (date: Date, opts?: { short?: boolean }) => formatDate(date, locale, opts),
      weekday: (date: Date) => weekdayShort(date, locale),
    }),
    [locale]
  );
}
