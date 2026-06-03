"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AuthShell, FormField, SocialButtons, RichHeadline } from "@/components/auth-shell";
import { Icon } from "@/components/icon";

export default function AcademySignUpPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const [agree, setAgree] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) return;
    router.push(`/${locale}/academy`);
  }

  return (
    <AuthShell
      eyebrow={t("auth.academyOSv1")}
      headline={<RichHeadline text={t("auth.headlineAcademy")} />}
      blurb={t("auth.blurbAcademy")}
      features={[
        t("auth.features.a1"),
        t("auth.features.a2"),
        t("auth.features.a3"),
      ]}
      stats={[
        { v: "120+", k: t("auth.stats.academies") },
        { v: "1.8K", k: t("auth.stats.coaches") },
        { v: "99%", k: t("auth.stats.uptime") },
      ]}
    >
      <div className="auth-form-head">
        <div className="auth-form-kicker">{t("auth.signupAcademy.kicker")}</div>
        <h2 className="auth-form-title">{t("auth.signupAcademy.title")}</h2>
        <p className="auth-form-sub">{t("auth.signupAcademy.sub")}</p>
      </div>

      <form onSubmit={onSubmit}>
        <FormField
          icon="building-bank"
          label={t("auth.signupAcademy.academyName")}
          name="academy"
          placeholder="Rally Court Academy"
          required
        />

        <div className="auth-grid-2">
          <FormField icon="user" label={t("auth.signupCoach.first")} name="first" placeholder="Payam" required />
          <FormField icon="user" label={t("auth.signupCoach.last")} name="last" placeholder="Nejad" required />
        </div>

        <FormField
          icon="mail"
          label={t("auth.signupAcademy.directorEmail")}
          type="email"
          name="email"
          placeholder="director@academy.com"
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

        <div className="auth-grid-2">
          <FormField icon="map-pin" label={t("common.country")} name="country" placeholder="Iran" />
          <FormField icon="users" label={t("auth.signupAcademy.coachesCount")} name="coaches" type="number" placeholder="5" />
        </div>

        <div className="auth-row" style={{ marginTop: 8 }}>
          <button
            type="button"
            className={"auth-check " + (agree ? "on" : "")}
            onClick={() => setAgree((a) => !a)}
          >
            <span className="box">{agree && <Icon name="check" />}</span>
            <span>{t("auth.signupCoach.agree")}</span>
          </button>
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={!agree}
          style={!agree ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
        >
          {t("auth.signupAcademy.cta")} <Icon name="arrow-right" />
        </button>
      </form>

      <div className="auth-or">
        <div className="line" />
        <span>{t("auth.signupCoach.or")}</span>
        <div className="line" />
      </div>

      <SocialButtons onProvider={() => router.push(`/${locale}/academy`)} />

      <div className="auth-foot">
        {t("auth.signupAcademy.footer")}
        <Link href={`/${locale}/signin`} className="auth-link">
          {" "}{t("modeSelect.signIn")}
        </Link>
      </div>
    </AuthShell>
  );
}
