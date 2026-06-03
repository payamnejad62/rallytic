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

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("modeSelect");
  const [shimmerKey, setShimmerKey] = useState(0);

  // Re-trigger the brand shimmer animation
  function triggerShimmer() {
    setShimmerKey((k) => k + 1);
  }

  // Touch the state once on mount to ensure animation runs cleanly
  useEffect(() => {
    // intentionally empty; CSS animation on first mount handles initial shimmer
  }, []);

  const heading = t("heading", { brand: "Rallytic" });
  const headingParts = heading.split("Rallytic").flatMap((part, i, arr) =>
    i < arr.length - 1
      ? [part, <span className="wm" key={i}>Rallytic</span>]
      : [part]
  );

  return (
    <div id="rsel">
      <style>{RSEL_CSS}</style>

      <div className="rs-brand" key={`brand-${shimmerKey}`}>
        <span className="rtile">R</span>
        <span className="txt">
          allyt<span className="i">i</span>c
        </span>
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
            onHover={triggerShimmer}
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
            onHover={triggerShimmer}
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
  perspective:1800px; perspective-origin:50% 46%;
  background:#080B08;
  color:var(--fg); -webkit-font-smoothing:antialiased;
}

#rsel .rs-brand{position:absolute;top:28px;left:38px;z-index:30;padding:4px 6px;display:flex;align-items:center;gap:2px;line-height:1}
[dir="rtl"] #rsel .rs-brand{left:auto;right:38px}
#rsel .rs-brand .rtile{
  width:40px;height:40px;border-radius:10px;display:grid;place-items:center;
  background:linear-gradient(135deg,#C4F062 0%,#8FBE2E 100%);
  color:#0E1A00;font-weight:900;font-size:26px;letter-spacing:-.05em;line-height:1;
  margin-right:-2px;
  box-shadow:0 0 24px rgba(168,216,71,.30);
  position:relative;overflow:hidden;
}
#rsel .rs-brand .rtile::after{
  content:'';position:absolute;top:0;left:-150%;width:80%;height:100%;
  background:linear-gradient(110deg,transparent 0%,rgba(255,255,255,.55) 50%,transparent 100%);
  animation:rsBrandShine 1.6s ease-out;pointer-events:none;
}
#rsel .rs-brand .txt{
  font-size:30px;font-weight:900;letter-spacing:-.045em;line-height:1;
  background-image:linear-gradient(95deg,var(--fg) 0%,var(--fg) 40%,#ffffff 50%,var(--fg) 60%,var(--fg) 100%);
  background-size:260% 100%;background-position:200% 0;
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:transparent;
  animation:rsBrandSweep 1.6s ease-out;
}
#rsel .rs-brand .txt .i{
  background-image:linear-gradient(95deg,var(--acc) 0%,var(--acc) 40%,#ffffff 50%,var(--acc) 60%,var(--acc) 100%);
  background-size:260% 100%;background-position:200% 0;
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;color:transparent;
  animation:rsBrandSweep 1.6s ease-out;
}
@keyframes rsBrandSweep{
  from{background-position:200% 0}
  to{background-position:-100% 0}
}
@keyframes rsBrandShine{
  from{left:-150%}
  to{left:200%}
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

#rsel .rs-world{position:relative;display:flex;gap:32px;transform-style:preserve-3d;flex-wrap:wrap;justify-content:center}

#rsel .rs-glass{
  position:relative;width:380px;padding:24px 26px;
  background:var(--glass);
  border:1px solid rgba(255,255,255,.10);border-radius:22px;
  backdrop-filter:blur(16px) saturate(1.2); -webkit-backdrop-filter:blur(16px) saturate(1.2);
  display:flex;flex-direction:column;gap:12px;cursor:pointer;transform-style:preserve-3d;
  text-decoration:none;color:var(--fg);
  box-shadow:0 40px 90px -34px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.10);
  transition:transform .6s cubic-bezier(.2,.8,.22,1), box-shadow .6s, border-color .6s;
  will-change:transform;
}

/* Green glow ONLY on hover — sits behind the card */
#rsel .rs-glass::before{
  content:'';
  position:absolute;
  inset:-70px;
  border-radius:50%;
  background:radial-gradient(ellipse at center,rgba(168,216,71,.45),transparent 65%);
  filter:blur(50px);
  opacity:0;
  transition:opacity .55s ease;
  pointer-events:none;
  z-index:-1;
}
#rsel .rs-glass:hover::before{opacity:1}

#rsel .rs-glass.gCoach{animation:rsFloatA 9s ease-in-out infinite}
#rsel .rs-glass.gAcad {animation:rsFloatB 10s ease-in-out infinite}
@keyframes rsFloatA{0%,100%{transform:translateY(0) rotateY(10deg) rotateX(3deg)}50%{transform:translateY(-16px) rotateY(4deg) rotateX(-2deg)}}
@keyframes rsFloatB{0%,100%{transform:translateY(-8px) rotateY(-10deg) rotateX(3deg)}50%{transform:translateY(10px) rotateY(-4deg) rotateX(-2deg)}}

#rsel .rs-glass:hover{
  animation-play-state:paused;
  transform:translateY(-10px) rotateY(0deg) rotateX(0deg) translateZ(70px) scale(1.02);
  border-color:var(--accRing);
  box-shadow:0 60px 110px -36px rgba(168,216,71,.45),0 0 0 1px var(--accRing), inset 0 1px 0 rgba(255,255,255,.18);
}

#rsel .rs-ic{width:50px;height:50px;border-radius:14px;display:grid;place-items:center;font-size:24px;color:var(--acc);background:linear-gradient(135deg,rgba(168,216,71,.20),rgba(168,216,71,.04));border:1px solid rgba(168,216,71,.30);transform:translateZ(60px);box-shadow:0 10px 24px -10px rgba(168,216,71,.5);margin-bottom:4px}
#rsel .rs-ttl{transform:translateZ(40px)}
#rsel .rs-ttl .k{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--acc);font-weight:700;margin-bottom:4px}
#rsel .rs-ttl h3{font-size:22px;font-weight:800;letter-spacing:-.02em;margin:0}
#rsel .rs-ttl p{font-size:12px;color:var(--dim);margin:6px 0 0;line-height:1.45}
#rsel .rs-pts{display:flex;flex-direction:column;gap:8px;transform:translateZ(28px);margin-top:4px}
#rsel .rs-pt{display:flex;gap:10px;align-items:flex-start}
#rsel .rs-pt .pi{width:20px;height:20px;border-radius:6px;flex-shrink:0;display:grid;place-items:center;font-size:11px;color:var(--acc);background:rgba(168,216,71,.16);border:1px solid rgba(168,216,71,.32)}
#rsel .rs-pt .pt-t{font-size:12px;color:var(--fg);font-weight:600;line-height:1.3}
#rsel .rs-pt .pt-b{font-size:10.5px;color:var(--mute);margin-top:1px;line-height:1.35}
#rsel .rs-cta{margin-top:6px;padding:11px 16px;border-radius:10px;background:rgba(168,216,71,.14);color:var(--acc);font-family:inherit;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transform:translateZ(50px);transition:.4s;border:1px solid var(--accRing)}
#rsel .rs-glass:hover .rs-cta{background:var(--acc);color:var(--accInk);border-color:transparent;box-shadow:0 14px 26px -8px rgba(168,216,71,.55)}

#rsel .rs-enter{opacity:0;animation:rsRise 1s cubic-bezier(.2,.75,.25,1) forwards}
#rsel .rs-glass.gCoach.rs-enter{animation:rsRise 1s cubic-bezier(.2,.75,.25,1) .15s forwards, rsFloatA 9s ease-in-out 1.15s infinite}
#rsel .rs-glass.gAcad.rs-enter{animation:rsRise 1s cubic-bezier(.2,.75,.25,1) .28s forwards, rsFloatB 10s ease-in-out 1.28s infinite}
@keyframes rsRise{from{opacity:0;transform:translateY(40px) translateZ(-160px) scale(.92)}to{opacity:1}}
`;
