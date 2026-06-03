"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AuthShell, FormField, SocialButtons, RichHeadline } from "@/components/auth-shell";
import { Icon } from "@/components/icon";

export default function CoachSignUpPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [agree, setAgree] = useState(false);
  const [remember, setRemember] = useState(true);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) return;
    router.push(`/${locale}/coach`);
  }

  return (
    <AuthShell
      eyebrow={t("auth.coachOSv1")}
      headline={<RichHeadline text={t("auth.headlineCoach")} />}
      blurb={t("auth.blurb")}
    >
      <div className="auth-form-head">
        <div className="auth-form-kicker">{t("auth.signupCoach.kicker")}</div>
        <h2 className="auth-form-title">{t("auth.signupCoach.title")}</h2>
        <p className="auth-form-sub">{t("auth.signupCoach.sub")}</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="auth-grid-2">
          <FormField
            icon="user"
            label={t("auth.signupCoach.first")}
            name="first"
            placeholder="Payam"
            required
          />
          <FormField
            icon="user"
            label={t("auth.signupCoach.last")}
            name="last"
            placeholder="Nejad"
            required
          />
        </div>

        <FormField
          icon="mail"
          label={t("auth.signupCoach.workEmail")}
          type="email"
          name="email"
          placeholder="coach@rallytic.com"
          required
        />

        <FormField
          icon="lock"
          label={t("common.password")}
          type="password"
          name="password"
          placeholder={t("auth.signupCoach.passwordHint")}
          required
        />

        <FormField
          icon="map-pin"
          label={t("common.country")}
          name="country"
          placeholder="Iran"
        />

        <div className="auth-row" style={{ alignItems: "flex-start", marginTop: 8 }}>
          <button
            type="button"
            className={"auth-check " + (agree ? "on" : "")}
            onClick={() => setAgree((a) => !a)}
            style={{ alignItems: "flex-start" }}
          >
            <span className="box" style={{ marginTop: 1 }}>
              {agree && <Icon name="check" />}
            </span>
            <span style={{ textAlign: "start", maxWidth: 280 }}>
              {t("auth.signupCoach.agree")}
            </span>
          </button>
          <button
            type="button"
            className={"auth-check " + (remember ? "on" : "")}
            onClick={() => setRemember((r) => !r)}
          >
            <span className="box">{remember && <Icon name="check" />}</span>
            <span>{t("auth.signupCoach.rememberMe")}</span>
          </button>
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={!agree}
          style={!agree ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
        >
          {t("auth.signupCoach.cta")} <Icon name="arrow-right" />
        </button>
      </form>

      <div className="auth-or">
        <div className="line" />
        <span>{t("auth.signupCoach.or")}</span>
        <div className="line" />
      </div>

      <SocialButtons />

      <div className="auth-foot">
        {t("auth.signupCoach.footer")}
        <Link href={`/${locale}/signin`} className="auth-link">
          {" "}{t("modeSelect.signIn")}
        </Link>
      </div>
    </AuthShell>
  );
}
