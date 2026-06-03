"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { COACH_PLAN, PLAN_FORECAST } from "@/lib/coach-extra-data";
import { useLocaleFormat } from "@/lib/use-locale-format";

const MIX_COLORS: Record<string, string> = {
  tech: "#A8D847",
  phys: "#E5685D",
  tact: "#7DD3FC",
  ment: "#F2B544",
};
const MIX_LABELS: Record<string, string> = {
  tech: "TECH",
  phys: "PHYS",
  tact: "TACT",
  ment: "MENT",
};

function Styles() {
  return (
    <style>{`
.scp-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.scp-player-pill{display:flex;align-items:center;gap:10px;padding:6px 12px 6px 6px;background:var(--surface2);border:1px solid var(--accentRing);border-radius:10px}
.scp-player-pill .av{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:10px}

.scp-ai{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 18px}
.scp-ai-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.scp-ai-t{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:700}
.scp-ai-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.scp-ai-cell{background:var(--surface3);border:1px solid var(--hairline2);border-radius:10px;padding:10px 12px}
.scp-ai-k{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.scp-ai-v{font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;margin-top:4px;color:var(--fg)}
.scp-ai-meta{display:flex;justify-content:space-between;font-size:10px;color:var(--fgMute);margin-top:8px}

.scp-windows{display:inline-flex;gap:6px;background:var(--surface2);border:1px solid var(--hairline);border-radius:10px;padding:4px;margin-top:14px}
.scp-win{padding:8px 14px;border-radius:7px;border:none;background:transparent;color:var(--fgDim);font-family:inherit;font-weight:700;font-size:12px;cursor:pointer}
.scp-win.on{background:var(--accent);color:var(--accentInk)}
.scp-windows-note{color:var(--fgMute);font-size:11px;margin-left:14px;display:inline-block}

.scp-phases{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px}
.scp-phase{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 20px;position:relative;overflow:hidden}
.scp-phase.wide{grid-column:1/-1}
.scp-phase-h{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px}
.scp-phase-num{width:28px;height:28px;border-radius:14px;background:var(--accent);color:var(--accentInk);display:grid;place-items:center;font-weight:900;font-size:12px;font-family:'JetBrains Mono',monospace}
.scp-phase-name{font-size:13px;font-weight:800;letter-spacing:-.01em}
.scp-phase-weeks{font-size:11px;color:var(--fgMute);letter-spacing:.14em;text-transform:uppercase;font-weight:700;margin-top:2px}
.scp-phase-total{font-family:'JetBrains Mono',monospace;font-weight:800;color:var(--accent);font-size:14px;text-align:right}
.scp-phase-total-k{font-size:9.5px;color:var(--fgMute);letter-spacing:.14em;text-transform:uppercase;font-weight:700}

.scp-mix-row{display:grid;grid-template-columns:60px 1fr 40px;gap:10px;align-items:center;margin-bottom:8px}
.scp-mix-w{font-size:10.5px;color:var(--fgMute);letter-spacing:.14em;font-weight:700}
.scp-mix-bar{display:flex;height:18px;border-radius:5px;overflow:hidden;gap:2px}
.scp-mix-seg{height:100%;display:grid;place-items:center;font-size:9.5px;font-weight:800;letter-spacing:.14em;color:var(--accentInk)}
.scp-mix-h{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;text-align:right}

.scp-focus{margin-top:14px}
.scp-focus-h{font-size:10px;color:var(--fgMute);letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-bottom:6px}
.scp-focus-item{display:flex;gap:8px;align-items:flex-start;font-size:12px;color:var(--fg);padding:3px 0}
.scp-focus-item .bullet{color:var(--accent);font-weight:900}

.scp-intensity{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 20px}
.scp-intensity-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:14px}
.scp-intensity-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 28px}
.scp-int-row{display:grid;grid-template-columns:80px 1fr 40px;gap:10px;align-items:center}
.scp-int-name{font-size:12px;color:var(--fg);font-weight:600}
.scp-int-bar{height:6px;background:var(--surface3);border-radius:3px;overflow:hidden}
.scp-int-bar-fill{height:100%;border-radius:3px}
.scp-int-v{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;text-align:right}

/* forecast */
.scp-windows-card{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.scp-wcard{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px}
.scp-wcard.hl{border-color:var(--accent);background:linear-gradient(180deg,rgba(168,216,71,0.08),transparent)}
.scp-wcard-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:800}
.scp-wcard-conf{font-size:10px;color:var(--fgMute);float:right;letter-spacing:.04em;font-weight:600}
.scp-wcard-v{font-family:'JetBrains Mono',monospace;font-size:42px;font-weight:800;letter-spacing:-.03em;color:var(--accent);margin-top:6px;line-height:1}
.scp-wcard-sub{font-size:11px;color:var(--fgDim);margin-top:2px}
.scp-wcard-itn{display:flex;justify-content:space-between;margin-top:10px;font-size:10px;color:var(--fgMute);letter-spacing:.14em;font-weight:700}
.scp-wcard-progress{margin-top:6px;height:4px;background:var(--surface3);border-radius:2px;overflow:hidden}
.scp-wcard-progress-fill{height:100%;background:var(--accent)}

.scp-path-grid{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:start}
.scp-path{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 20px}
.scp-path-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:14px}
.scp-path-step{display:grid;grid-template-columns:14px 1fr;gap:12px;padding:10px 0;border-left:1px dashed var(--hairline2);margin-left:6px;padding-left:14px;position:relative}
.scp-path-step::before{content:'';position:absolute;left:-7px;top:14px;width:14px;height:14px;border-radius:7px;background:var(--surface3);border:2px solid var(--accent)}
.scp-path-step.now::before{background:var(--accent)}
.scp-path-when{font-size:9.5px;color:var(--fgMute);letter-spacing:.16em;text-transform:uppercase;font-weight:700}
.scp-path-title{font-size:13px;font-weight:800;margin-top:3px}
.scp-path-body{font-size:11.5px;color:var(--fgDim);margin-top:3px}
.scp-path-tag{display:inline-block;margin-top:6px;font-size:9px;font-weight:800;letter-spacing:.16em;padding:2px 7px;border-radius:4px;background:rgba(168,216,71,0.10);color:var(--accent)}

.scp-proj-card{padding:18px}
.scp-proj-h{display:flex;justify-content:space-between;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:10px}
.scp-proj-row{display:grid;grid-template-columns:60px 1fr 80px;gap:12px;align-items:center;padding:7px 0}
.scp-proj-name{font-size:12px;color:var(--fg)}
.scp-proj-bar{height:6px;background:var(--surface3);border-radius:3px;overflow:hidden;position:relative}
.scp-proj-bar-from{height:100%;background:rgba(168,216,71,0.30);border-radius:3px}
.scp-proj-bar-to{height:100%;border-radius:3px;position:absolute;top:0;left:0}
.scp-proj-v{font-family:'JetBrains Mono',monospace;font-size:11px;text-align:right;color:var(--accent);font-weight:700}

.scp-assume{padding:18px}
.scp-assume-item{display:flex;align-items:center;gap:8px;padding:5px 0;font-size:12px;color:var(--fg)}
.scp-assume-item .check{width:16px;height:16px;border-radius:8px;background:rgba(168,216,71,0.10);color:var(--accent);display:grid;place-items:center;font-size:11px}
`}</style>
  );
}

export default function CoachingPlanPage() {
  const t = useTranslations();
  const fmt = useLocaleFormat();
  const [tab, setTab] = useState<"training" | "forecast">("training");
  const [win, setWin] = useState<3 | 6 | 12>(3);

  return (
    <>
      <Topbar
        title={t("plan.title")}
        breadcrumb={[{ label: t("crumb.workspace") }, { label: "Arman Rahimi" }, { label: t("plan.title") }]}
        actions={
          <>
            <div className="scp-player-pill">
              <div className="av">{COACH_PLAN.player.initials}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{COACH_PLAN.player.name}</div>
                <div style={{ fontSize: 9.5, color: "var(--fgMute)" }}>
                  {COACH_PLAN.player.level} · ITN {fmt.d(COACH_PLAN.player.itn)}
                </div>
              </div>
            </div>
            <GhostBtn icon="file-type-pdf">{t("plan.exportPdf")}</GhostBtn>
            <PrimaryBtn icon="sparkles">{t("plan.generateAi")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="r-tabs">
          <button className={"r-tab " + (tab === "training" ? "on" : "")} onClick={() => setTab("training")}>
            <Icon name="brain" /> {t("plan.tabTraining")}
          </button>
          <button className={"r-tab " + (tab === "forecast" ? "on" : "")} onClick={() => setTab("forecast")}>
            <Icon name="trending-up" /> {t("plan.tabForecast")}
          </button>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center", color: "var(--fgMute)", fontSize: 11 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "var(--accent)" }} />
            {t("plan.aiSynced")} · {COACH_PLAN.generated}
          </div>
        </div>

        {tab === "training" && (
          <>
            <div className="scp-ai">
              <div className="scp-ai-h">
                <span className="scp-ai-t">{t("plan.aiInput")}</span>
                <span style={{ fontSize: 10, color: "var(--fgMute)" }}>
                  {t("plan.generated")} · {COACH_PLAN.generated}
                </span>
              </div>
              <div className="scp-ai-grid">
                {COACH_PLAN.aiInputs.map((i) => (
                  <div className="scp-ai-cell" key={i.k}>
                    <div className="scp-ai-k">{i.k}</div>
                    <div className="scp-ai-v">{fmt.d(i.v)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="scp-windows">
                {[3, 6, 12].map((w) => (
                  <button key={w} className={"scp-win " + (win === w ? "on" : "")} onClick={() => setWin(w as 3 | 6 | 12)}>
                    {fmt.d(w)} {w === 3 ? t("plan.weeks3").split(" ")[1] : t("plan.weeks6").split(" ")[1]}
                  </button>
                ))}
              </div>
              <span className="scp-windows-note">{t("plan.synthesizedNote")}</span>
            </div>

            <div className="scp-phases">
              {COACH_PLAN.phases.slice(0, 2).map((p) => (
                <div className="scp-phase" key={p.n}>
                  <div className="scp-phase-h">
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div className="scp-phase-num">{fmt.d(p.n)}</div>
                      <div>
                        <div className="scp-phase-name">{p.name}</div>
                        <div className="scp-phase-weeks">{p.weeks}</div>
                      </div>
                    </div>
                    <div>
                      <div className="scp-phase-total-k">TOTAL</div>
                      <div className="scp-phase-total">{fmt.d(p.totalHours)}H</div>
                    </div>
                  </div>
                  {p.mix.map((m) => (
                    <div className="scp-mix-row" key={m.week}>
                      <span className="scp-mix-w">{m.week}</span>
                      <div className="scp-mix-bar">
                        {m.bars.map((b, i) => (
                          <div
                            key={i}
                            className="scp-mix-seg"
                            style={{ width: `${b.pct}%`, background: MIX_COLORS[b.k] }}
                          >
                            {MIX_LABELS[b.k]}
                          </div>
                        ))}
                      </div>
                      <span className="scp-mix-h">{fmt.d(Math.round(p.totalHours / p.mix.length))}h</span>
                    </div>
                  ))}
                  <div className="scp-focus">
                    <div className="scp-focus-h">{t("plan.mainFocus")}</div>
                    {p.focus.map((f) => (
                      <div className="scp-focus-item" key={f}>
                        <span className="bullet">·</span> {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="scp-phase wide">
                <div className="scp-phase-h">
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div className="scp-phase-num">{fmt.d(3)}</div>
                    <div>
                      <div className="scp-phase-name">{COACH_PLAN.phases[2].name}</div>
                      <div className="scp-phase-weeks">{COACH_PLAN.phases[2].weeks}</div>
                    </div>
                  </div>
                  <div>
                    <div className="scp-phase-total-k">TOTAL</div>
                    <div className="scp-phase-total">{fmt.d(COACH_PLAN.phases[2].totalHours)}H</div>
                  </div>
                </div>
                {COACH_PLAN.phases[2].mix.map((m) => (
                  <div className="scp-mix-row" key={m.week}>
                    <span className="scp-mix-w">{m.week}</span>
                    <div className="scp-mix-bar">
                      {m.bars.map((b, i) => (
                        <div
                          key={i}
                          className="scp-mix-seg"
                          style={{ width: `${b.pct}%`, background: MIX_COLORS[b.k] }}
                        >
                          {MIX_LABELS[b.k]}
                        </div>
                      ))}
                    </div>
                    <span className="scp-mix-h">{fmt.d(Math.round(COACH_PLAN.phases[2].totalHours / 2))}h</span>
                  </div>
                ))}
                <div className="scp-focus">
                  <div className="scp-focus-h">{t("plan.mainFocus")}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
                    {COACH_PLAN.phases[2].focus.map((f) => (
                      <div className="scp-focus-item" key={f}>
                        <span className="bullet">·</span> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="scp-intensity">
              <div className="scp-intensity-h">{t("plan.overallIntensity")}</div>
              <div className="scp-intensity-grid">
                {COACH_PLAN.intensity.map((i) => (
                  <div className="scp-int-row" key={i.k}>
                    <span className="scp-int-name">{i.k}</span>
                    <div className="scp-int-bar">
                      <div className="scp-int-bar-fill" style={{ width: `${i.pct}%`, background: i.color }} />
                    </div>
                    <span className="scp-int-v" style={{ color: i.color }}>
                      {fmt.d(i.pct)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "forecast" && (
          <>
            <div className="scp-ai" style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Icon name="sparkles" style={{ color: "var(--accent)", fontSize: 20 }} />
              <div style={{ flex: 1, fontSize: 12.5, color: "var(--fgDim)" }}>
                <span style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", fontSize: 10 }}>{t("plan.forecastTag")}</span>
                <div style={{ marginTop: 4 }}>{t("plan.forecastDesc")}</div>
              </div>
              <span style={{ background: "var(--accent)", color: "var(--accentInk)", padding: "3px 8px", borderRadius: 4, fontSize: 9, fontWeight: 800, letterSpacing: ".16em" }}>BETA</span>
            </div>

            <div className="scp-windows-card" style={{ marginTop: 14 }}>
              {PLAN_FORECAST.windows.map((w, i) => (
                <div key={w.months} className={"scp-wcard " + (i === 1 ? "hl" : "")}>
                  <div>
                    <span className="scp-wcard-k">{t("plan.monthsLabel", { n: fmt.d(w.months) })}</span>
                    <span className="scp-wcard-conf">{t("plan.conf", { n: fmt.d(w.conf) })}</span>
                  </div>
                  <div className="scp-wcard-v">{fmt.d(w.advance)}</div>
                  <div className="scp-wcard-sub">{t("plan.advance")}</div>
                  <div className="scp-wcard-itn">
                    <span>ITN {fmt.d(w.fromItn)}</span>
                    <span style={{ color: "var(--accent)" }}>{fmt.d(w.toItn)}</span>
                  </div>
                  <div className="scp-wcard-progress">
                    <div className="scp-wcard-progress-fill" style={{ width: `${w.conf}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="scp-path-grid">
              <div className="scp-path">
                <div className="scp-path-h">{t("plan.advancementPath")}</div>
                {PLAN_FORECAST.path.map((s, i) => (
                  <div className={"scp-path-step" + (i === 0 ? " now" : "")} key={s.title}>
                    <div></div>
                    <div>
                      <div className="scp-path-when">{s.when}</div>
                      <div className="scp-path-title">{s.title}</div>
                      <div className="scp-path-body">{s.body}</div>
                      <span className="scp-path-tag">{s.tag}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="scp-path scp-proj-card">
                  <div className="scp-proj-h">
                    <span>{t("plan.skillProjection")}</span>
                    <span>
                      {t("plan.now")} <span style={{ marginLeft: 30, color: "var(--accent)" }}>{t("plan.projected")}</span>
                    </span>
                  </div>
                  {PLAN_FORECAST.projection.map((p) => (
                    <div className="scp-proj-row" key={p.k}>
                      <span className="scp-proj-name">{p.k}</span>
                      <div className="scp-proj-bar">
                        <div className="scp-proj-bar-from" style={{ width: `${(p.from / 10) * 100}%` }} />
                        <div className="scp-proj-bar-to" style={{ width: `${(p.to / 10) * 100}%`, background: p.color, opacity: 0.7 }} />
                      </div>
                      <span className="scp-proj-v">
                        {fmt.d(p.from.toFixed(1))} → {fmt.d(p.to.toFixed(1))}{" "}
                        <span style={{ color: "var(--accent)" }}>{p.delta}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="scp-path scp-assume" style={{ marginTop: 14 }}>
                  <div className="scp-proj-h">
                    <span>{t("plan.forecastAssumptions")}</span>
                  </div>
                  {PLAN_FORECAST.assumptions.map((a) => (
                    <div className="scp-assume-item" key={a}>
                      <span className="check">
                        <Icon name="check" />
                      </span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
