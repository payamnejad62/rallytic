"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, FormField, SocialButtons } from "@/components/auth-shell";
import { Icon } from "@/components/icon";

export default function CoachSignUpPage() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [remember, setRemember] = useState(true);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) return;
    router.push("/coach");
  }

  return (
    <AuthShell
      eyebrow="Coach Operating System · v1.0"
      headline={
        <>
          Build your <em>roster</em>. Run your plan.
        </>
      }
      blurb="One workspace for every player you coach — assessments, matches, AI plans, payments."
    >
      <div className="auth-form-head">
        <div className="auth-form-kicker">Create coach account</div>
        <h2 className="auth-form-title">Welcome to Rallytic.</h2>
        <p className="auth-form-sub">
          Get your roster set up in under a minute. No card required for the trial.
        </p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="auth-grid-2">
          <FormField icon="user" label="First name" name="first" placeholder="Payam" required />
          <FormField icon="user" label="Last name" name="last" placeholder="Nejad" required />
        </div>

        <FormField
          icon="mail"
          label="Work email"
          type="email"
          name="email"
          placeholder="coach@rallytic.com"
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

        <FormField
          icon="map-pin"
          label="Country"
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
            <span style={{ textAlign: "left", maxWidth: 280 }}>
              I agree to the Terms and Privacy Policy.
            </span>
          </button>
          <button
            type="button"
            className={"auth-check " + (remember ? "on" : "")}
            onClick={() => setRemember((r) => !r)}
          >
            <span className="box">{remember && <Icon name="check" />}</span>
            <span>Remember me</span>
          </button>
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={!agree}
          style={!agree ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
        >
          Create coach account <Icon name="arrow-right" />
        </button>
      </form>

      <div className="auth-or">
        <div className="line" />
        <span>or sign up with</span>
        <div className="line" />
      </div>

      <SocialButtons />

      <div className="auth-foot">
        Already have an account?
        <Link href="/signin" className="auth-link">
          Sign in →
        </Link>
      </div>
    </AuthShell>
  );
}
