"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AuthShell, FormField, SocialButtons, RichHeadline } from "@/components/auth-shell";
import { Icon } from "@/components/icon";

export default function SignInPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [mode, setMode] = useState<"coach" | "academy">("coach");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/${locale}/${mode}`);
  }

  return (
    <AuthShell
      eyebrow={mode === "coach" ? t("auth.coachOSv1") : t("auth.academyOSv1")}
      headline={<RichHeadline text={t("auth.headlineCoach")} />}
      blurb={t("auth.blurb")}
    >
      <div className="auth-form-head">
        <div className="auth-form-kicker">
          {t("auth.signin.kicker", {
            mode: mode === "coach" ? t("modeSelect.coach.kicker") : t("modeSelect.academy.kicker"),
          })}
        </div>
        <h2 className="auth-form-title">{t("auth.signin.title")}</h2>
        <p className="auth-form-sub">
          {t("auth.signin.sub", {
            what: mode === "coach" ? t("auth.signin.roster") : t("auth.signin.academy"),
          })}
        </p>
      </div>

      <div className="auth-seg" style={{ marginBottom: 20 }}>
        <button
          type="button"
          className={mode === "coach" ? "on" : ""}
          onClick={() => setMode("coach")}
        >
          {t("modeSelect.coach.kicker")}
        </button>
        <button
          type="button"
          className={mode === "academy" ? "on" : ""}
          onClick={() => setMode("academy")}
        >
          {t("modeSelect.academy.kicker")}
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <FormField
          icon="mail"
          label={t("common.email")}
          type="email"
          name="email"
          placeholder="coach@rallytic.com"
          defaultValue="payam@rallytic.com"
          required
        />

        <FormField
          icon="lock"
          label={t("common.password")}
          type={showPw ? "text" : "password"}
          name="password"
          placeholder="••••••••••"
          defaultValue="demo1234"
          required
          rightSlot={
            <button
              type="button"
              className="auth-input-right"
              onClick={() => setShowPw((p) => !p)}
              aria-label="toggle password"
            >
              <Icon name={showPw ? "eye-off" : "eye"} />
            </button>
          }
        />

        <div className="auth-row">
          <button
            type="button"
            className={"auth-check " + (remember ? "on" : "")}
            onClick={() => setRemember((r) => !r)}
          >
            <span className="box">{remember && <Icon name="check" />}</span>
            <span>{t("auth.signin.rememberDevice")}</span>
          </button>
          <Link href={`/${locale}/forgot-password`} className="auth-link">
            {t("auth.signin.forgot")}
          </Link>
        </div>

        <button type="submit" className="auth-submit">
          {t("auth.signin.cta")} <Icon name="arrow-right" />
        </button>
      </form>

      <div className="auth-or">
        <div className="line" />
        <span>{t("auth.signin.or")}</span>
        <div className="line" />
      </div>

      <SocialButtons />

      <div className="auth-foot">
        {t("auth.signin.footer")}
        <Link href={`/${locale}/signup/${mode}`} className="auth-link">
          {" "}{t("auth.signin.request")}
        </Link>
      </div>
    </AuthShell>
  );
}
