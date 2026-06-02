"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, FormField, SocialButtons } from "@/components/auth-shell";
import { Icon } from "@/components/icon";

export default function AcademySignUpPage() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) return;
    router.push("/academy");
  }

  return (
    <AuthShell
      eyebrow="Academy Director · v1.0"
      headline={
        <>
          Evaluate every <em>coach</em>. See every player.
        </>
      }
      blurb="Director-grade oversight: scorecards, comparisons, academy-wide analytics, finance and per-seat billing."
      features={[
        "Coach scorecards across 7 weighted metrics",
        "Per-seat billing and payroll ledger",
        "Side-by-side coach comparisons",
      ]}
      stats={[
        { v: "120+", k: "Academies" },
        { v: "1.8K", k: "Coaches" },
        { v: "99%", k: "Uptime" },
      ]}
    >
      <div className="auth-form-head">
        <div className="auth-form-kicker">Create academy account</div>
        <h2 className="auth-form-title">Set up your academy.</h2>
        <p className="auth-form-sub">
          Start with the director seat — invite coaches once you&apos;re in.
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <FormField
          icon="building-bank"
          label="Academy name"
          name="academy"
          placeholder="Rally Court Academy"
          required
        />

        <div className="auth-grid-2">
          <FormField icon="user" label="First name" name="first" placeholder="Payam" required />
          <FormField icon="user" label="Last name" name="last" placeholder="Nejad" required />
        </div>

        <FormField
          icon="mail"
          label="Director email"
          type="email"
          name="email"
          placeholder="director@academy.com"
          required
        />

        <FormField
          icon="lock"
          label="Password"
          type="password"
          name="password"
          placeholder="At least 8 characters"
          required
        />

        <div className="auth-grid-2">
          <FormField icon="map-pin" label="Country" name="country" placeholder="Iran" />
          <FormField icon="users" label="Coaches" name="coaches" type="number" placeholder="5" />
        </div>

        <div className="auth-row" style={{ marginTop: 8 }}>
          <button
            type="button"
            className={"auth-check " + (agree ? "on" : "")}
            onClick={() => setAgree((a) => !a)}
          >
            <span className="box">{agree && <Icon name="check" />}</span>
            <span>I agree to the Terms and Privacy Policy.</span>
          </button>
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={!agree}
          style={!agree ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
        >
          Create academy account <Icon name="arrow-right" />
        </button>
      </form>

      <div className="auth-or">
        <div className="line" />
        <span>or sign up with</span>
        <div className="line" />
      </div>

      <SocialButtons />

      <div className="auth-foot">
        Already have an academy?
        <Link href="/signin" className="auth-link">
          Sign in →
        </Link>
      </div>
    </AuthShell>
  );
}
