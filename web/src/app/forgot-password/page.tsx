"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthShell, FormField } from "@/components/auth-shell";
import { Icon } from "@/components/icon";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      headline={
        <>
          Back into your <em>workspace</em> in a minute.
        </>
      }
      blurb="We'll email you a secure reset link. The link is single-use and expires in 30 minutes."
    >
      <div className="auth-form-head">
        <div className="auth-form-kicker">Reset password</div>
        <h2 className="auth-form-title">
          {sent ? "Check your inbox." : "Forgot your password?"}
        </h2>
        <p className="auth-form-sub">
          {sent
            ? "If an account exists for that email, you'll receive a reset link shortly."
            : "Enter your account email and we'll send you a reset link."}
        </p>
      </div>

      {!sent && (
        <form onSubmit={onSubmit}>
          <FormField
            icon="mail"
            label="Email"
            type="email"
            name="email"
            placeholder="coach@rallytic.com"
            required
          />

          <button type="submit" className="auth-submit" style={{ marginTop: 8 }}>
            Send reset link <Icon name="arrow-right" />
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
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Email on the way.</div>
            <div style={{ color: "#9BA89B" }}>
              Didn&apos;t get it? Check spam, or try again in a few minutes.
            </div>
          </div>
        </div>
      )}

      <div className="auth-foot" style={{ marginTop: 28 }}>
        Back to
        <Link href="/signin" className="auth-link">
          Sign in →
        </Link>
      </div>
    </AuthShell>
  );
}
