"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, FormField, SocialButtons } from "@/components/auth-shell";
import { Icon } from "@/components/icon";

export default function SignInPage() {
  const router = useRouter();
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [mode, setMode] = useState<"coach" | "academy">("coach");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(mode === "coach" ? "/coach" : "/academy");
  }

  return (
    <AuthShell
      eyebrow={mode === "coach" ? "Coach Operating System · v1.0" : "Academy Director · v1.0"}
      headline={
        <>
          The tools <em>elite coaches</em> use to win.
        </>
      }
      blurb="Profile, performance, planning — one calm workspace for every player in your roster."
    >
      <div className="auth-form-head">
        <div className="auth-form-kicker">
          {mode === "coach" ? "Coach access" : "Academy access"}
        </div>
        <h2 className="auth-form-title">Welcome back.</h2>
        <p className="auth-form-sub">
          Sign in to your rallytic account to continue with your{" "}
          {mode === "coach" ? "roster" : "academy"}.
        </p>
      </div>

      <div className="auth-seg" style={{ marginBottom: 20 }}>
        <button
          type="button"
          className={mode === "coach" ? "on" : ""}
          onClick={() => setMode("coach")}
        >
          Coach
        </button>
        <button
          type="button"
          className={mode === "academy" ? "on" : ""}
          onClick={() => setMode("academy")}
        >
          Academy
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <FormField
          icon="mail"
          label="Email"
          type="email"
          name="email"
          placeholder="coach@rallytic.com"
          defaultValue="payam@rallytic.com"
          required
        />

        <FormField
          icon="lock"
          label="Password"
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
              aria-label={showPw ? "Hide password" : "Show password"}
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
            <span>Remember this device</span>
          </button>
          <Link href="/forgot-password" className="auth-link">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="auth-submit">
          Sign in to rallytic <Icon name="arrow-right" />
        </button>
      </form>

      <div className="auth-or">
        <div className="line" />
        <span>or continue with</span>
        <div className="line" />
      </div>

      <SocialButtons />

      <div className="auth-foot">
        New to rallytic?
        <Link
          href={mode === "coach" ? "/signup/coach" : "/signup/academy"}
          className="auth-link"
        >
          Request access →
        </Link>
      </div>
    </AuthShell>
  );
}
