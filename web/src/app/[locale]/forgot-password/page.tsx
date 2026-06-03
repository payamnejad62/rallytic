"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AuthShell, FormField, RichHeadline } from "@/components/auth-shell";
import { Icon } from "@/components/icon";

export default function ForgotPasswordPage() {
  const locale = useLocale();
  const t = useTranslations();
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <AuthShell
      eyebrow={t("auth.forgot.kicker")}
      headline={<RichHeadline text={t("auth.headlineCoach")} />}
      blurb={t("auth.blurb")}
    >
      <div className="auth-form-head">
        <div className="auth-form-kicker">{t("auth.forgot.kicker")}</div>
        <h2 className="auth-form-title">
          {sent ? t("auth.forgot.titleSent") : t("auth.forgot.title")}
        </h2>
        <p className="auth-form-sub">
          {sent ? t("auth.forgot.subSent") : t("auth.forgot.sub")}
        </p>
      </div>

      {!sent && (
        <form onSubmit={onSubmit}>
          <FormField
            icon="mail"
            label={t("common.email")}
            type="email"
            name="email"
            placeholder="coach@rallytic.com"
            required
          />

          <button type="submit" className="auth-submit" style={{ marginTop: 8 }}>
            {t("auth.forgot.cta")} <Icon name="arrow-right" />
          </button>
        </form>
      )}

      {sent && (
        <div
          style={{
            background: "rgba(168,216,71,0.06)",
            border: "1px solid rgba(168,216,71,0.20)",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            gap: 12,
            color: "#EAF0E6",
            fontSize: 13,
          }}
        >
          <Icon name="mail-check" style={{ color: "#A8D847", fontSize: 22 }} />
          <div>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{t("auth.forgot.okHead")}</div>
            <div style={{ color: "#9BA89B" }}>{t("auth.forgot.okSub")}</div>
          </div>
        </div>
      )}

      <div className="auth-foot" style={{ marginTop: 28 }}>
        {t("auth.forgot.footer")}
        <Link href={`/${locale}/signin`} className="auth-link">
          {" "}{t("modeSelect.signIn")}
        </Link>
      </div>
    </AuthShell>
  );
}
