"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export function Brand({
  size = "md",
  href = "/",
}: {
  size?: "md" | "lg";
  href?: string | null;
}) {
  const locale = useLocale();
  const cls = size === "lg" ? "r-brand r-brand-lg" : "r-brand";
  const inner = (
    <>
      <span className="rtile">R</span>
      <span className="txt">
        allyt<span className="i">i</span>c
      </span>
    </>
  );
  if (href === null) {
    return <div className={cls}>{inner}</div>;
  }
  const target = href.startsWith("/") ? `/${locale}${href === "/" ? "" : href}` : href;
  return (
    <Link href={target} className={cls}>
      {inner}
    </Link>
  );
}
