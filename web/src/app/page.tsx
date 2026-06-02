import Link from "next/link";
import { Brand } from "@/components/brand";
import { Icon } from "@/components/icon";

type Point = { icon: string; title: string; body: string };

function ModeCard({
  mode,
  kicker,
  title,
  blurb,
  icon,
  badge,
  points,
  cta,
  href,
  floatClass,
}: {
  mode: "coach" | "academy";
  kicker: string;
  title: string;
  blurb: string;
  icon: string;
  badge?: string;
  points: Point[];
  cta: string;
  href: string;
  floatClass: string;
}) {
  return (
    <Link
      href={href}
      data-mode={mode}
      className={`rs-glass ${floatClass}`}
      aria-label={cta}
    >
      {badge && <div className="rs-badge">{badge}</div>}
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
  return (
    <div id="rsel">
      <style>{RSEL_CSS}</style>
      <div className="rs-brand">
        <Brand size="lg" href={null} />
      </div>
      <div className="rs-signin">
        <span>Already have an account?</span>
        <Link href="/signin" className="rs-signin-link">
          Sign in →
        </Link>
      </div>

      <div className="rs-orb o1" />
      <div className="rs-orb o2" />

      <div className="rs-stage">
        <header className="rs-head rs-enter">
          <div className="eyebrow">Welcome to Rallytic</div>
          <h1>
            How will you use <span className="wm">Rallytic</span>?
          </h1>
          <p>
            Two different workspaces, one platform. Pick the one that matches
            your role — you can be both later.
          </p>
        </header>

        <div className="rs-world">
          <ModeCard
            mode="coach"
            kicker="Coach"
            title="I coach players."
            blurb="Manage your roster, build AI training plans, log matches, track growth."
            icon="user-check"
            href="/signup/coach"
            cta="Continue as coach"
            floatClass="gCoach rs-enter"
            points={[
              {
                icon: "users",
                title: "Manage your own roster",
                body: "Add players, run ITN tests, build profiles.",
              },
              {
                icon: "brain",
                title: "AI-assisted training plans",
                body: "Generate, adapt and track 4-week programs.",
              },
              {
                icon: "trophy",
                title: "Log matches & tournaments",
                body: "Win rate, ITN trend, opponent scouting.",
              },
            ]}
          />

          <ModeCard
            mode="academy"
            kicker="Academy"
            title="I run an academy."
            blurb="Oversight workspace. Evaluate every coach and see academy-wide KPIs."
            icon="building-bank"
            badge="You"
            href="/signup/academy"
            cta="Continue as academy"
            floatClass="gAcad rs-enter"
            points={[
              {
                icon: "school",
                title: "Evaluate your coaches",
                body: "Auto scorecards + your manual rating.",
              },
              {
                icon: "chart-arcs",
                title: "Academy-wide analytics",
                body: "ITN gains, retention, weak spots.",
              },
              {
                icon: "arrows-shuffle",
                title: "Compare coaches side-by-side",
                body: "Apples-to-apples on every metric.",
              },
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
  position:relative; min-height:100vh; overflow:hidden;
  perspective:1800px; perspective-origin:50% 46%;
  background:
    radial-gradient(40% 50% at 22% 20%, rgba(168,216,71,0.10), transparent 60%),
    radial-gradient(40% 50% at 80% 82%, rgba(120,180,60,0.08), transparent 60%),
    #080B08;
  color:var(--fg); -webkit-font-smoothing:antialiased;
}
#rsel .rs-orb{position:absolute;border-radius:50%;filter:blur(40px);pointer-events:none;opacity:.55}
#rsel .rs-orb.o1{width:420px;height:420px;left:14%;top:16%;background:radial-gradient(circle,rgba(168,216,71,.5),transparent 65%);animation:rsDrift1 14s ease-in-out infinite}
#rsel .rs-orb.o2{width:360px;height:360px;right:12%;bottom:12%;background:radial-gradient(circle,rgba(110,170,55,.45),transparent 65%);animation:rsDrift2 17s ease-in-out infinite}
@keyframes rsDrift1{0%,100%{transform:translate(0,0)}50%{transform:translate(60px,-40px)}}
@keyframes rsDrift2{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,40px)}}

#rsel .rs-brand{position:absolute;top:40px;left:46px;z-index:30;padding:4px 6px}
#rsel .rs-signin{position:absolute;top:46px;right:52px;z-index:30;display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim)}
#rsel .rs-signin .rs-signin-link{color:var(--acc);font-weight:700;cursor:pointer;text-decoration:none}

#rsel .rs-stage{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:46px;z-index:10;padding:140px 24px 80px}
#rsel .rs-head{text-align:center;max-width:760px}
#rsel .rs-head .eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--acc);font-weight:700;margin-bottom:12px}
#rsel .rs-head h1{font-size:42px;font-weight:800;letter-spacing:-.025em;line-height:1.08;margin:0}
#rsel .rs-head .wm{font-weight:900;letter-spacing:-.045em;color:var(--fg)}
#rsel .rs-head p{font-size:14.5px;color:var(--dim);margin:14px auto 0;line-height:1.55;max-width:560px}

#rsel .rs-world{position:relative;display:flex;gap:46px;transform-style:preserve-3d;flex-wrap:wrap;justify-content:center}

#rsel .rs-glass{
  position:relative;width:420px;min-height:452px;padding:36px 32px;
  background:var(--glass);
  border:1px solid rgba(255,255,255,.10);border-radius:24px;
  backdrop-filter:blur(16px) saturate(1.2); -webkit-backdrop-filter:blur(16px) saturate(1.2);
  display:flex;flex-direction:column;gap:18px;cursor:pointer;transform-style:preserve-3d;
  text-decoration:none;color:var(--fg);
  box-shadow:0 40px 90px -34px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.14), inset 0 -30px 60px -30px rgba(168,216,71,.10);
  transition:transform .6s cubic-bezier(.2,.8,.22,1), box-shadow .6s, border-color .6s;
  will-change:transform;
}
#rsel .rs-glass.gCoach{animation:rsFloatA 9s ease-in-out infinite}
#rsel .rs-glass.gAcad {animation:rsFloatB 10s ease-in-out infinite}
@keyframes rsFloatA{0%,100%{transform:translateY(0) rotateY(10deg) rotateX(3deg)}50%{transform:translateY(-16px) rotateY(4deg) rotateX(-2deg)}}
@keyframes rsFloatB{0%,100%{transform:translateY(-8px) rotateY(-10deg) rotateX(3deg)}50%{transform:translateY(10px) rotateY(-4deg) rotateX(-2deg)}}
#rsel .rs-glass::before{content:'';position:absolute;inset:0;border-radius:24px;pointer-events:none;
  background:linear-gradient(135deg,rgba(255,255,255,.16),transparent 38%);opacity:.7}
#rsel .rs-glass::after{content:'';position:absolute;inset:0;border-radius:24px;pointer-events:none;
  background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.10) 50%,transparent 60%);
  transform:translateX(-130%);transition:transform 1s ease}
#rsel .rs-glass:hover{animation-play-state:paused;transform:translateY(-10px) rotateY(0deg) rotateX(0deg) translateZ(70px) scale(1.02);border-color:var(--accRing);box-shadow:0 60px 110px -36px rgba(168,216,71,.45),0 0 0 1px var(--accRing), inset 0 1px 0 rgba(255,255,255,.18)}
#rsel .rs-glass:hover::after{transform:translateX(130%)}

#rsel .rs-badge{position:absolute;top:18px;right:18px;padding:3px 9px;border-radius:4px;background:var(--acc);color:var(--accInk);font-size:9px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
#rsel .rs-ic{width:64px;height:64px;border-radius:17px;display:grid;place-items:center;font-size:31px;color:var(--acc);background:linear-gradient(135deg,rgba(168,216,71,.20),rgba(168,216,71,.04));border:1px solid rgba(168,216,71,.30);transform:translateZ(60px);box-shadow:0 10px 24px -10px rgba(168,216,71,.5)}
#rsel .rs-ttl{transform:translateZ(40px)}
#rsel .rs-ttl .k{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--acc);font-weight:700;margin-bottom:6px}
#rsel .rs-ttl h3{font-size:27px;font-weight:800;letter-spacing:-.02em;margin:0}
#rsel .rs-ttl p{font-size:13px;color:var(--dim);margin:8px 0 0;line-height:1.5}
#rsel .rs-pts{display:flex;flex-direction:column;gap:11px;transform:translateZ(28px)}
#rsel .rs-pt{display:flex;gap:10px;align-items:flex-start}
#rsel .rs-pt .pi{width:22px;height:22px;border-radius:6px;flex-shrink:0;display:grid;place-items:center;font-size:11px;color:var(--acc);background:rgba(168,216,71,.16);border:1px solid rgba(168,216,71,.32)}
#rsel .rs-pt .pt-t{font-size:12.5px;color:var(--fg);font-weight:600;line-height:1.3}
#rsel .rs-pt .pt-b{font-size:11px;color:var(--mute);margin-top:2px;line-height:1.4}
#rsel .rs-cta{margin-top:auto;padding:13px 18px;border-radius:11px;background:rgba(168,216,71,.14);color:var(--acc);font-family:inherit;font-weight:800;font-size:13.5px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transform:translateZ(50px);transition:.4s;border:1px solid var(--accRing)}
#rsel .rs-glass:hover .rs-cta{background:var(--acc);color:var(--accInk);border-color:transparent;box-shadow:0 14px 26px -8px rgba(168,216,71,.55)}

#rsel .rs-enter{opacity:0;animation:rsRise 1s cubic-bezier(.2,.75,.25,1) forwards}
#rsel .rs-glass.gCoach.rs-enter{animation:rsRise 1s cubic-bezier(.2,.75,.25,1) .15s forwards, rsFloatA 9s ease-in-out 1.15s infinite}
#rsel .rs-glass.gAcad.rs-enter{animation:rsRise 1s cubic-bezier(.2,.75,.25,1) .28s forwards, rsFloatB 10s ease-in-out 1.28s infinite}
@keyframes rsRise{from{opacity:0;transform:translateY(40px) translateZ(-160px) scale(.92)}to{opacity:1}}
`;
