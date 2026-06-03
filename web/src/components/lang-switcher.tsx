"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/i18n/config";

// Map each locale → ISO country code for flag image
const LOCALE_TO_COUNTRY: Record<Locale, string> = {
  en: "gb",
  fa: "ir",
  fr: "fr",
  es: "es",
  de: "de",
};

function Flag({ locale, size = 32 }: { locale: Locale; size?: number }) {
  const code = LOCALE_TO_COUNTRY[locale];
  // Request a 2x-density image for crispness; flagcdn supports w40/w80/w160.
  const src = `https://flagcdn.com/w80/${code}.png`;
  return (
    <img
      src={src}
      alt={LOCALE_NAMES[locale].en}
      width={size}
      height={size * 0.66}
      style={{
        width: size,
        height: "auto",
        display: "block",
        borderRadius: 4,
        objectFit: "cover",
      }}
    />
  );
}

export function LangSwitcher({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const current = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(locale: Locale) {
    const segments = pathname.split("/");
    if ((LOCALES as readonly string[]).includes(segments[1])) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    const next = segments.join("/") || "/";
    setOpen(false);
    router.push(next);
    router.refresh();
  }

  const meta = LOCALE_NAMES[current];

  return (
    <div ref={ref} className="lang-switch">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={"lang-trigger " + (compact ? "compact" : "")}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={meta.native}
      >
        <Flag locale={current} size={20} />
        <span className="lang-caret">▾</span>
      </button>
      {open && (
        <div className="lang-menu" role="listbox">
          {LOCALES.map((loc) => {
            const m = LOCALE_NAMES[loc];
            const active = loc === current;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => switchTo(loc)}
                className={"lang-item-flag" + (active ? " on" : "")}
                role="option"
                aria-selected={active}
                title={`${m.native} — ${m.en}`}
              >
                <Flag locale={loc} size={22} />
                <span className="lang-code">{loc.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
