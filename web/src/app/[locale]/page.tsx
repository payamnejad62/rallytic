"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/icon";
import { LangSwitcher } from "@/components/lang-switcher";

type Point = { icon: string; title: string; body: string };

function ModeCard({
  href,
  kicker,
  title,
  blurb,
  icon,
  points,
  cta,
  floatClass,
  onHover,
}: {
  href: string;
  kicker: string;
  title: string;
  blurb: string;
  icon: string;
  points: Point[];
  cta: string;
  floatClass: string;
  onHover: () => void;
}) {
  return (
    <Link
      href={href}
      className={`rs-glass ${floatClass}`}
      onMouseEnter={onHover}
      aria-label={cta}
    >
      <div className="rs-ic">
        <Icon name={icon} />
      </div>
      <div className="rs-ttl">
        <div className="k">{kicker}</div>
        <h3>{title}</h3>
        <p>{blurb}</p>
      </div>
      <div className="rs-pts">
        {points.map((p) => (
          <div className="rs-pt" key={p.title}>
            <div className="pi">
              <Icon name={p.icon} />
            </div>
            <div>
              <div className="pt-t">{p.title}</div>
              <div className="pt-b">{p.body}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rs-cta">
        {cta} <Icon name="arrow-right" />
      </div>
    </Link>
  );
}

// The wordmark "Rallytic" with each letter as a separate span so a
// staggered wave animation can run from R → c.
function BrandWave() {
  // R lives inside the tile; "allytic" letters with i highlighted
  const tail = ["a", "l", "l", "y", "t", "i", "c"];
  return (
    <div className="rs-brand">
      <span className="rtile">R</span>
      <span className="txt">
        {tail.map((c, i) => {
          const isI = c === "i";
          return (
            <span
              key={i}
              className={"rs-letter" + (isI ? " i" : "")}
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              {c}
            </span>
          );
        })}
      </span>
    </div>
  );
}

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("modeSelect");
  const [waveKey, setWaveKey] = useState(0);

  // Re-trigger brand wave by remounting the brand sub-tree
  function triggerWave() {
    setWaveKey((k) => k + 1);
  }

  useEffect(() => {
    // CSS animation runs on first mount automatically
  }, []);

  const heading = t("heading", { brand: "Rallytic" });
  const headingParts = heading.split("Rallytic").flatMap((part, i, arr) =>
    i < arr.length - 1
      ? [
          part,
          <span className="wm" key={i}>
            Rallytic
          </span>,
        ]
      : [part]
  );

  return (
    <div id="rsel">
      <style dangerouslySetInnerHTML={{ __html: RSEL_CSS }} />

      <div key={`brand-${waveKey}`}>
        <BrandWave />
      </div>

      <div className="rs-signin">
        <LangSwitcher compact />
        <span>{t("alreadyAccount")}</span>
        <Link href={`/${locale}/signin`} className="rs-signin-link">
          {t("signIn")}
        </Link>
      </div>

      <div className="rs-stage">
        <header className="rs-head rs-enter">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h1>{headingParts}</h1>
          <p>{t("lede")}</p>
        </header>

        <div className="rs-world">
          <ModeCard
            href={`/${locale}/signup/coach`}
            kicker={t("coach.kicker")}
            title={t("coach.title")}
            blurb={t("coach.blurb")}
            icon="user-check"
            cta={t("coach.cta")}
            floatClass="gCoach rs-enter"
            onHover={triggerWave}
            points={[
              { icon: "users", title: t("coach.p1Title"), body: t("coach.p1Body") },
              { icon: "brain", title: t("coach.p2Title"), body: t("coach.p2Body") },
              { icon: "trophy", title: t("coach.p3Title"), body: t("coach.p3Body") },
            ]}
          />

          <ModeCard
            href={`/${locale}/signup/academy`}
            kicker={t("academy.kicker")}
            title={t("academy.title")}
            blurb={t("academy.blurb")}
            icon="building-bank"
            cta={t("academy.cta")}
            floatClass="gAcad rs-enter"
            onHover={triggerWave}
            points={[
              { icon: "school", title: t("academy.p1Title"), body: t("academy.p1Body") },
              { icon: "chart-arcs", title: t("academy.p2Title"), body: t("academy.p2Body") },
              { icon: "arrows-shuffle", title: t("academy.p3Title"), body: t("academy.p3Body") },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

const RSEL_CSS = `
#rsel{
  --acc:#A8D847; --accInk:#0E1A00; --accRing:rgba(168,216,71,0.34);
  --fg:#EAF0E6; --dim:#9BA89B; --mute:#62705F;
  --glass:rgba(26,34,24,0.42);
  position:relative; height:100vh; overflow:hidden;
  background:#080B08;
  color:var(--fg); -webkit-font-smoothing:antialiased;
}

/* ---- BRAND with per-letter wave ---- */
#rsel .rs-brand{position:absolute;top:28px;left:38px;z-index:30;padding:4px 6px;display:flex;align-items:center;gap:2px;line-height:1}
[dir="rtl"] #rsel .rs-brand{left:auto;right:38px}
#rsel .rs-brand .rtile{
  width:40px;height:40px;border-radius:10px;
  display:grid;place-items:center;
  background:linear-gradient(135deg,#C4F062 0%,#8FBE2E 100%);
  color:#0E1A00;font-weight:900;font-size:26px;letter-spacing:-.05em;line-height:1;
  margin-right:-2px;
  box-shadow:0 0 24px rgba(168,216,71,.30);
  animation:rsTileWave 1s cubic-bezier(.4,.0,.2,1) both;
  animation-delay:0ms;
}
#rsel .rs-brand .txt{
  font-size:30px;font-weight:900;letter-spacing:-.045em;line-height:1;
  color:var(--fg);display:inline-flex;
}
/* Per-letter wave on individual <span> letters inside .txt */
#rsel .rs-brand .txt .rs-letter{
  display:inline-block;
  animation:rsLetterWave 1s cubic-bezier(.4,.0,.2,1) both;
  transform-origin:50% 100%;
  color:var(--fg);
}
#rsel .rs-brand .txt .rs-letter.i{
  color:var(--acc);
  animation-name:rsLetterWaveAcc;
}
@keyframes rsLetterWave{
  0%   {transform:translateY(0) scale(1);color:var(--fg)}
  35%  {transform:translateY(-10px) scale(1.08);color:#ffffff}
  70%  {transform:translateY(0) scale(1);color:var(--fg)}
  100% {transform:translateY(0) scale(1);color:var(--fg)}
}
@keyframes rsLetterWaveAcc{
  0%   {transform:translateY(0) scale(1);color:var(--acc)}
  35%  {transform:translateY(-10px) scale(1.15);color:#EAFFB0}
  70%  {transform:translateY(0) scale(1);color:var(--acc)}
  100% {transform:translateY(0) scale(1);color:var(--acc)}
}
/* R tile uses a transform-only wave — color, display, font are untouched */
@keyframes rsTileWave{
  0%   {transform:translateY(0)}
  35%  {transform:translateY(-10px)}
  70%  {transform:translateY(0)}
  100% {transform:translateY(0)}
}

#rsel .rs-signin{position:absolute;top:34px;right:42px;z-index:30;display:flex;align-items:center;gap:14px;font-size:13px;color:var(--dim)}
[dir="rtl"] #rsel .rs-signin{right:auto;left:42px}
#rsel .rs-signin .rs-signin-link{color:var(--acc);font-weight:700;cursor:pointer;text-decoration:none}

#rsel .rs-stage{position:relative;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;z-index:10;padding:96px 24px 32px;box-sizing:border-box}
#rsel .rs-head{text-align:center;max-width:760px}
#rsel .rs-head .eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--acc);font-weight:700;margin-bottom:8px}
#rsel .rs-head h1{font-size:34px;font-weight:800;letter-spacing:-.025em;line-height:1.08;margin:0}
#rsel .rs-head .wm{font-weight:900;letter-spacing:-.045em;color:var(--fg)}
#rsel .rs-head p{font-size:13.5px;color:var(--dim);margin:10px auto 0;line-height:1.5;max-width:560px}

#rsel .rs-world{position:relative;display:flex;gap:32px;flex-wrap:wrap;justify-content:center}

#rsel .rs-glass{
  position:relative;width:380px;padding:24px 26px;
  background:var(--glass);
  border:1px solid rgba(255,255,255,.08);border-radius:22px;
  display:flex;flex-direction:column;gap:12px;cursor:pointer;
  text-decoration:none;color:var(--fg);
  box-shadow:0 40px 90px -34px rgba(0,0,0,.9);
  transition:transform .45s cubic-bezier(.2,.8,.22,1), box-shadow .45s, border-color .45s;
  will-change:transform;
}

/* Full all-sides green halo behind card on hover, plus a soft outer glow */
#rsel .rs-glass::before{
  content:'';
  position:absolute;
  inset:-90px;
  border-radius:36px;
  background:radial-gradient(ellipse 80% 70% at center,rgba(168,216,71,.55) 0%,rgba(168,216,71,.18) 35%,transparent 70%);
  filter:blur(38px);
  opacity:0;
  transition:opacity .55s ease;
  pointer-events:none;
  z-index:-1;
}
#rsel .rs-glass:hover::before{opacity:1}

/* Gentle vertical-only float — no 3D rotation, no visual line artifacts */
#rsel .rs-glass.gCoach{animation:rsFloatA 6s ease-in-out infinite}
#rsel .rs-glass.gAcad {animation:rsFloatB 7s ease-in-out infinite}
@keyframes rsFloatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes rsFloatB{0%,100%{transform:translateY(-4px)}50%{transform:translateY(6px)}}

#rsel .rs-glass:hover{
  animation-play-state:paused;
  transform:translateY(-10px) scale(1.02);
  border-color:var(--accRing);
  box-shadow:
    0 0 60px rgba(168,216,71,.45),
    0 0 120px rgba(168,216,71,.25),
    0 60px 110px -36px rgba(168,216,71,.45),
    0 0 0 1px var(--accRing);
}

#rsel .rs-ic{width:50px;height:50px;border-radius:14px;display:grid;place-items:center;font-size:24px;color:var(--acc);background:linear-gradient(135deg,rgba(168,216,71,.20),rgba(168,216,71,.04));border:1px solid rgba(168,216,71,.30);box-shadow:0 10px 24px -10px rgba(168,216,71,.5);margin-bottom:4px}
#rsel .rs-ttl .k{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--acc);font-weight:700;margin-bottom:4px}
#rsel .rs-ttl h3{font-size:22px;font-weight:800;letter-spacing:-.02em;margin:0}
#rsel .rs-ttl p{font-size:12px;color:var(--dim);margin:6px 0 0;line-height:1.45}
#rsel .rs-pts{display:flex;flex-direction:column;gap:8px;margin-top:4px}
#rsel .rs-pt{display:flex;gap:10px;align-items:flex-start}
#rsel .rs-pt .pi{width:20px;height:20px;border-radius:6px;flex-shrink:0;display:grid;place-items:center;font-size:11px;color:var(--acc);background:rgba(168,216,71,.16);border:1px solid rgba(168,216,71,.32)}
#rsel .rs-pt .pt-t{font-size:12px;color:var(--fg);font-weight:600;line-height:1.3}
#rsel .rs-pt .pt-b{font-size:10.5px;color:var(--mute);margin-top:1px;line-height:1.35}
#rsel .rs-cta{margin-top:6px;padding:11px 16px;border-radius:10px;background:rgba(168,216,71,.14);color:var(--acc);font-family:inherit;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:.4s;border:1px solid var(--accRing)}
#rsel .rs-glass:hover .rs-cta{background:var(--acc);color:var(--accInk);border-color:transparent;box-shadow:0 14px 26px -8px rgba(168,216,71,.55)}

#rsel .rs-enter{opacity:0;animation:rsRise .8s cubic-bezier(.2,.75,.25,1) forwards}
#rsel .rs-glass.gCoach.rs-enter{animation:rsRise .8s cubic-bezier(.2,.75,.25,1) .15s forwards, rsFloatA 6s ease-in-out 1.0s infinite}
#rsel .rs-glass.gAcad.rs-enter{animation:rsRise .8s cubic-bezier(.2,.75,.25,1) .28s forwards, rsFloatB 7s ease-in-out 1.1s infinite}
@keyframes rsRise{from{opacity:0;transform:translateY(30px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
`;
