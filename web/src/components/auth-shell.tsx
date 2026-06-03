"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";

type Stat = { v: string; k: string };

// Replaces <em>...</em> in a translated string with <em> JSX nodes.
export function RichHeadline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /<em>(.*?)<\/em>/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));
    parts.push(<em key={i++}>{m[1]}</em>);
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return <>{parts}</>;
}

export function AuthShell({
  eyebrow,
  headline,
  blurb,
  features,
  stats,
  children,
}: {
  eyebrow: string;
  headline: ReactNode;
  blurb: string;
  features?: string[];
  stats?: Stat[];
  children: ReactNode;
}) {
  const t = useTranslations();
  const finalFeatures = features ?? [
    t("auth.features.f1"),
    t("auth.features.f2"),
    t("auth.features.f3"),
  ];
  const finalStats = stats ?? [
    { v: "500+", k: t("auth.stats.coaches") },
    { v: "12K+", k: t("auth.stats.playersStat") },
    { v: "98%", k: t("auth.stats.renewal") },
  ];

  return (
    <div className="auth-page">
      <style dangerouslySetInnerHTML={{ __html: AUTH_CSS }} />
      <div className="auth-shell">
        <aside className="auth-hero">
          <div className="auth-art" aria-hidden>
            <ArcMotion />
          </div>
          <div className="auth-glow" aria-hidden />
          <div className="auth-hero-top">
            <Brand size="lg" href="/" />
            <div className="auth-tag">{eyebrow}</div>
          </div>

          <div className="auth-hero-mid">
            <h1 className="auth-headline">{headline}</h1>
            <p className="auth-blurb">{blurb}</p>
            <div className="auth-features">
              {finalFeatures.map((f) => (
                <div className="auth-feat" key={f}>
                  <span className="auth-feat-tick">
                    <Icon name="check" />
                  </span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="auth-hero-bot">
            <div className="auth-stats">
              {finalStats.map((s, i) => (
                <div className="auth-stat" key={s.k} data-i={i}>
                  <div className="auth-stat-v mono">{s.v}</div>
                  <div className="auth-stat-k">{s.k}</div>
                </div>
              ))}
            </div>
            <div className="auth-legal">
              <div>© 2026 rallytic · Payam Abdollah Nejad</div>
              <div className="auth-legal-right">
                <span>{t("auth.legal.privacy")}</span>
                <span>{t("auth.legal.terms")}</span>
                <span className="auth-status">
                  <span className="dot" />
                  {t("auth.legal.status")}
                </span>
              </div>
            </div>
          </div>
        </aside>

        <section className="auth-form-wrap">{children}</section>
      </div>
    </div>
  );
}

function ArcMotion() {
  return (
    <svg viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
      <defs>
        <linearGradient id="trailGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#A8D847" stopOpacity="0" />
          <stop offset="100%" stopColor="#A8D847" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M50 600 Q 300 50 580 480" fill="none" stroke="url(#trailGrad)" strokeWidth="2.5" strokeDasharray="2 6" />
      <circle cx="580" cy="480" r="14" fill="#A8D847" />
      <circle cx="580" cy="480" r="22" fill="none" stroke="#A8D847" strokeOpacity="0.3" />
    </svg>
  );
}

const AUTH_CSS = `
.auth-page{height:100vh;overflow:hidden;background:#080A08;background-image:radial-gradient(60% 50% at 0% 0%, rgba(168,216,71,0.07), transparent 65%), radial-gradient(50% 40% at 100% 100%, rgba(168,216,71,0.04), transparent 65%);display:grid;place-items:center;padding:24px;color:#EAF0E6;font-family:'Barlow',system-ui,sans-serif}
.auth-shell{width:100%;max-width:1240px;max-height:calc(100vh - 48px);display:grid;grid-template-columns:1.05fr 1fr;background:#0A0D0A;border:1px solid #283228;border-radius:20px;overflow:hidden;box-shadow:0 60px 120px -20px rgba(0,0,0,0.6),0 0 0 1px rgba(168,216,71,0.05)}
@media (max-width: 980px){.auth-shell{grid-template-columns:1fr}}

.auth-hero{position:relative;background-image:linear-gradient(165deg,#0d150c 0%,#08100a 50%,#050805 100%);display:grid;grid-template-rows:auto 1fr auto;padding:28px 36px;overflow:hidden}
.auth-art{position:absolute;inset:0;opacity:.42;pointer-events:none}
.auth-glow{position:absolute;top:-100px;right:-100px;width:320px;height:320px;border-radius:50%;background:radial-gradient(circle,rgba(168,216,71,0.16),transparent 70%);pointer-events:none}
.auth-hero-top{position:relative;z-index:2}
.auth-tag{margin-top:14px;font-size:11px;letter-spacing:.22em;color:#5E6B5E;font-weight:700;text-transform:uppercase}

.auth-hero-mid{position:relative;z-index:2;display:flex;flex-direction:column;justify-content:center;max-width:460px}
.auth-headline{font-size:38px;font-weight:800;letter-spacing:-.03em;margin:0;line-height:1.05;color:#EAF0E6}
.auth-headline em{color:#A8D847;font-style:normal}
.auth-blurb{font-size:13.5px;color:#9BA89B;line-height:1.55;margin:14px 0 0;max-width:420px}
.auth-features{display:flex;flex-direction:column;gap:8px;margin-top:18px}
.auth-feat{display:flex;align-items:center;gap:10px;font-size:12.5px;color:#EAF0E6;font-weight:500}
.auth-feat-tick{width:20px;height:20px;border-radius:6px;background:rgba(168,216,71,0.10);border:1px solid rgba(168,216,71,0.30);display:grid;place-items:center;color:#A8D847;font-size:12px;font-weight:900}

.auth-hero-bot{position:relative;z-index:2}
.auth-stats{display:grid;grid-template-columns:repeat(3,1fr);padding:12px;background:rgba(8,12,8,0.6);border:1px solid #1F2820;border-radius:12px;backdrop-filter:blur(8px);margin-bottom:14px}
.auth-stat{text-align:center}
.auth-stat[data-i="1"],.auth-stat[data-i="2"]{border-left:1px solid #1F2820}
.auth-stat-v{font-size:20px;font-weight:800;color:#A8D847;letter-spacing:-.02em;line-height:1}
.auth-stat-k{font-size:9.5px;color:#5E6B5E;letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-top:5px}
.auth-legal{display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#5E6B5E}
.auth-legal-right{display:flex;gap:16px}
.auth-legal-right span{cursor:pointer}
.auth-status{display:flex;align-items:center;gap:5px}
.auth-status .dot{width:6px;height:6px;border-radius:3px;background:#A8D847}

.auth-form-wrap{padding:32px 44px;display:flex;flex-direction:column;justify-content:center;background:#0A0D0A;overflow-y:auto}
@media (max-width: 980px){.auth-form-wrap{padding:36px 28px}}
.auth-form-head{margin-bottom:28px}
.auth-form-kicker{font-size:10px;letter-spacing:.20em;color:#A8D847;font-weight:700;text-transform:uppercase;margin-bottom:8px}
.auth-form-title{font-size:28px;font-weight:800;letter-spacing:-.02em;margin:0;color:#EAF0E6}
.auth-form-sub{font-size:13px;color:#9BA89B;margin:6px 0 0;line-height:1.5}

.auth-field{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.auth-field label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#9BA89B;display:flex;align-items:center;gap:6px}
.auth-input-wrap{position:relative}
.auth-input{width:100%;background:#1A211A;border:1px solid #283228;border-radius:10px;padding:12px 14px 12px 40px;font-size:13.5px;color:#EAF0E6;font-family:inherit;outline:none;transition:border-color .18s,box-shadow .18s}
.auth-input:focus{border-color:rgba(168,216,71,0.30);box-shadow:0 0 0 3px rgba(168,216,71,0.12)}
.auth-input::placeholder{color:#5E6B5E}
.auth-input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#5E6B5E;font-size:16px}
.auth-input-right{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:transparent;border:none;color:#5E6B5E;cursor:pointer;padding:4px;font-size:16px;display:grid;place-items:center}
.auth-input-right:hover{color:#A8D847}

.auth-field{margin-bottom:12px}
.auth-row{display:flex;align-items:center;justify-content:space-between;margin:4px 0 16px}
.auth-check{display:flex;align-items:center;gap:9px;background:transparent;border:none;cursor:pointer;padding:0}
.auth-check .box{width:18px;height:18px;border-radius:5px;background:#1A211A;border:1px solid #283228;display:grid;place-items:center}
.auth-check.on .box{background:#A8D847;border-color:#A8D847;color:#0E1A00}
.auth-check span:last-child{font-size:12.5px;color:#9BA89B;font-weight:500}
.auth-link{font-size:12.5px;color:#A8D847;font-weight:700;cursor:pointer;text-decoration:none}

.auth-submit{width:100%;padding:12px 20px;background:#A8D847;color:#0E1A00;border:none;border-radius:10px;font-family:inherit;font-size:14px;font-weight:800;letter-spacing:-.005em;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 12px 24px -8px rgba(168,216,71,0.40),inset 0 1px 0 rgba(255,255,255,0.20);transition:.18s}
.auth-submit:hover{background:#B8E055}

.auth-or{display:flex;align-items:center;gap:12px;margin:16px 0 12px}
.auth-or .line{flex:1;height:1px;background:#283228}
.auth-or span{font-size:10px;letter-spacing:.16em;color:#5E6B5E;font-weight:700;text-transform:uppercase}

.auth-socials{display:flex;gap:8px;margin-bottom:16px}
.auth-social{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;background:#141A14;border:1px solid #283228;border-radius:10px;color:#EAF0E6;cursor:pointer;font-size:13px;font-weight:600;font-family:inherit;transition:.18s}
.auth-social:hover{border-color:rgba(168,216,71,0.30);background:#1A211A;transform:translateY(-1px)}
.auth-social.google:hover{border-color:#4285F4}
.auth-social.apple:hover{border-color:#ffffff}
.auth-social.linkedin:hover{border-color:#0A66C2}
.auth-social svg{display:block;flex-shrink:0}

.auth-foot{text-align:center;font-size:12.5px;color:#9BA89B;padding-top:14px;border-top:1px solid #1F2820}
.auth-foot .auth-link{margin-left:4px}

.auth-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media (max-width:560px){.auth-grid-2{grid-template-columns:1fr}}
.auth-seg{display:flex;background:#141A14;border:1px solid #283228;border-radius:10px;padding:4px;gap:4px}
.auth-seg button{flex:1;padding:9px 10px;border-radius:7px;border:none;background:transparent;color:#9BA89B;font-weight:700;font-size:12.5px;cursor:pointer;font-family:inherit;transition:.18s}
.auth-seg button.on{background:#A8D847;color:#0E1A00}
`;

export function FormField({
  icon,
  label,
  type = "text",
  name,
  placeholder,
  defaultValue,
  required,
  rightSlot,
}: {
  icon: string;
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  rightSlot?: ReactNode;
}) {
  return (
    <div className="auth-field">
      <label htmlFor={name}>
        <Icon name={icon} /> {label}
      </label>
      <div className="auth-input-wrap">
        <span className="auth-input-icon">
          <Icon name={icon} />
        </span>
        <input
          id={name}
          name={name}
          type={type}
          className="auth-input"
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
        />
        {rightSlot}
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden>
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8 c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4 C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#0A66C2" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function SocialButtons({
  onProvider,
}: {
  onProvider?: (provider: "google" | "apple" | "linkedin") => void;
}) {
  return (
    <div className="auth-socials">
      <button
        type="button"
        className="auth-social google"
        onClick={() => onProvider?.("google")}
      >
        <GoogleIcon /> Google
      </button>
      <button
        type="button"
        className="auth-social apple"
        onClick={() => onProvider?.("apple")}
      >
        <AppleIcon /> Apple
      </button>
      <button
        type="button"
        className="auth-social linkedin"
        onClick={() => onProvider?.("linkedin")}
      >
        <LinkedInIcon /> LinkedIn
      </button>
    </div>
  );
}
