"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { useLocaleFormat } from "@/lib/use-locale-format";
import { ITN, TALENT } from "@/lib/itn-data";

const TONE_FG: Record<string, string> = {
  good: "#A8D847",
  med: "#F2B544",
  weak: "#E5685D",
  info: "#7DD3FC",
};

function Styles() {
  return (
    <style>{`
.itn-grid{display:grid;grid-template-columns:1fr 1.6fr;gap:14px}
.itn-final{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:24px;text-align:center}
.itn-final-k{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.itn-final-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:72px;font-weight:800;color:var(--accent);letter-spacing:-.04em;line-height:1;margin:12px 0 6px;text-shadow:0 0 24px rgba(168,216,71,0.30)}
.itn-final-max{font-size:11px;color:var(--fgDim)}
.itn-final-badge{display:inline-flex;align-items:center;gap:12px;margin-top:18px;padding:14px 18px;background:linear-gradient(135deg,rgba(168,216,71,0.18),rgba(168,216,71,0.04));border:1px solid var(--accentRing);border-radius:12px}
.itn-final-badge .rating{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:22px;font-weight:800;color:var(--accent)}
.itn-final-badge .lvl{font-size:13px;color:var(--fgDim);font-weight:600}

.itn-bars-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:20px}
.itn-bars-title{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:14px}
.itn-bar-row{display:grid;grid-template-columns:120px 1fr 70px;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid var(--hairline)}
.itn-bar-row:last-child{border-bottom:none}
.itn-bar-row.total{margin-top:8px;padding-top:14px;border-top:2px solid var(--hairline2);border-bottom:none}
.itn-bar-label{font-size:12.5px;color:var(--fg);font-weight:600}
.itn-bar-row.total .itn-bar-label{font-weight:800;color:var(--accent)}
.itn-bar-track{height:8px;background:var(--surface3);border-radius:4px;overflow:hidden;position:relative}
.itn-bar-fill{height:100%;border-radius:4px;transition:width .5s}
.itn-bar-val{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;font-weight:700;text-align:right}

.itn-table{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.itn-table-head{display:grid;grid-template-columns:1fr 2fr 1fr 1fr;padding:12px 18px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;border-bottom:1px solid var(--hairline);background:linear-gradient(180deg,#0c100c,#0a0d0a)}
.itn-tr{display:grid;grid-template-columns:1fr 2fr 1fr 1fr;padding:11px 18px;font-size:13px;border-bottom:1px solid var(--hairline);align-items:center}
.itn-tr:last-child{border-bottom:none}
.itn-tr.on{background:rgba(168,216,71,0.06);color:var(--accent);font-weight:700}
.itn-tr.on .itn-name{color:var(--accent)}
.itn-name{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700;color:var(--fg)}
.itn-tr-score{font-family:'JetBrains Mono',ui-monospace,monospace;color:var(--fgDim);font-size:12px}

.itn-summary{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:14px}
.itn-sumcard{background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:16px;text-align:center}
.itn-sumcard.hl{border-color:var(--accentRing);background:linear-gradient(180deg,rgba(168,216,71,0.06),transparent)}
.itn-sumcard-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.itn-sumcard-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:28px;font-weight:800;color:var(--fg);margin-top:6px;line-height:1}
.itn-sumcard.hl .itn-sumcard-v{color:var(--accent)}
.itn-sumcard-sub{font-size:11px;color:var(--fgDim);margin-top:4px}

.itn-itnbox{margin-top:14px;background:linear-gradient(135deg,rgba(168,216,71,0.10),transparent);border:1px solid var(--accentRing);border-radius:14px;padding:24px;text-align:center}
.itn-itnbox-k{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);font-weight:700}
.itn-itnbox-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:54px;font-weight:800;color:var(--accent);letter-spacing:-.03em;line-height:1;margin-top:8px;text-shadow:0 0 24px rgba(168,216,71,0.35)}
.itn-itnbox-lvl{font-size:13px;color:var(--fgDim);margin-top:6px;font-weight:600}

/* Talent */
.tal-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:14px}
.tal-final{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:30px 24px;text-align:center}
.tal-final-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:72px;font-weight:800;color:var(--accent);letter-spacing:-.04em;line-height:1;margin:14px 0 8px}
.tal-final-badge{display:inline-block;padding:8px 22px;background:var(--accent);color:var(--accentInk);border-radius:999px;font-weight:800;font-size:12px;letter-spacing:.06em;margin-top:12px}

.tal-factor{display:grid;grid-template-columns:160px 1fr 40px;gap:12px;align-items:center;padding:8px 0}
.tal-factor-name{font-size:12.5px;color:var(--fg);font-weight:500}
.tal-factor-track{height:6px;background:var(--surface3);border-radius:3px;overflow:hidden}
.tal-factor-fill{height:100%;border-radius:3px}
.tal-factor-val{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700;font-size:12px;text-align:right;color:var(--accent)}

.tal-radar{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:340px}

.tal-cats{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 20px}

.tal-bot{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.tal-panel{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:16px 18px}
.tal-panel-h{font-size:11px;letter-spacing:.16em;text-transform:uppercase;font-weight:800;margin-bottom:12px;display:flex;align-items:center;gap:8px}
.tal-panel-h.good{color:var(--good)}
.tal-panel-h.weak{color:var(--weak)}
.tal-panel-row{display:flex;justify-content:space-between;font-size:13px;padding:6px 0;border-bottom:1px solid var(--hairline)}
.tal-panel-row:last-child{border-bottom:none}
.tal-panel-row .v{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700}

.itn-note{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 18px;font-size:13px;color:var(--fgDim);line-height:1.6}
.itn-note-h{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:8px}
`}</style>
  );
}

function RadarSvg() {
  const cx = 150;
  const cy = 150;
  const r = 110;
  const n = TALENT.factors.length;
  const angles = TALENT.factors.map((_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);
  const points = TALENT.factors.map((f, i) => {
    const rad = (f.value / 10) * r;
    return [cx + Math.cos(angles[i]) * rad, cy + Math.sin(angles[i]) * rad];
  });
  const rings = [0.25, 0.5, 0.75, 1].map((m) => {
    const pts = angles.map((a) => {
      const rad = m * r;
      return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad];
    });
    return pts.map((p) => p.join(",")).join(" ");
  });
  const polyPts = points.map((p) => p.join(",")).join(" ");

  return (
    <svg viewBox="0 0 300 300" width="280" height="280">
      {rings.map((p, i) => (
        <polygon
          key={i}
          points={p}
          fill="none"
          stroke="rgba(168,216,71,0.10)"
          strokeWidth="1"
        />
      ))}
      {angles.map((a, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(a) * r}
          y2={cy + Math.sin(a) * r}
          stroke="rgba(168,216,71,0.08)"
        />
      ))}
      <polygon points={polyPts} fill="rgba(168,216,71,0.25)" stroke="#A8D847" strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#A8D847" />
      ))}
      {TALENT.factors.map((f, i) => {
        const a = angles[i];
        const lx = cx + Math.cos(a) * (r + 22);
        const ly = cy + Math.sin(a) * (r + 22);
        return (
          <text
            key={f.k}
            x={lx}
            y={ly}
            fill="#9BA89B"
            fontSize="9"
            fontWeight="700"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {f.name.split(" ")[0]} {f.value}
          </text>
        );
      })}
    </svg>
  );
}

export default function ITNTalentPage() {
  const t = useTranslations();
  const [tab, setTab] = useState<"itn" | "talent">("itn");
  const { player } = ITN;

  return (
    <>
      <Topbar
        title={t("itn.title")}
        breadcrumb={[
          { label: t("crumb.workspace") },
          { label: player.name },
          { label: tab === "itn" ? t("itn.tabItn") : t("itn.tabTalent") },
        ]}
        actions={
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 10px",
                background: "var(--surface2)",
                border: "1px solid var(--hairline2)",
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>{player.flag}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{player.name}</div>
                <div style={{ fontSize: 10, color: "var(--fgMute)" }}>{player.joinedAgo}</div>
              </div>
            </div>
            <GhostBtn icon="file-type-pdf">{t("common.exportPdf")}</GhostBtn>
            <PrimaryBtn icon="device-floppy">{t("common.save")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="r-tabs" style={{ marginBottom: 14 }}>
          <button className={"r-tab " + (tab === "itn" ? "on" : "")} onClick={() => setTab("itn")}>
            <Icon name="checkup-list" /> {t("itn.tabItn")}
          </button>
          <button
            className={"r-tab " + (tab === "talent" ? "on" : "")}
            onClick={() => setTab("talent")}
          >
            <Icon name="sparkles" /> {t("itn.tabTalent")}
          </button>
        </div>

        {tab === "itn" && (
          <>
            <div className="itn-grid">
              <div className="itn-final">
                <div className="itn-final-k">Final score</div>
                <div className="itn-final-v">{ITN.totalScore}</div>
                <div className="itn-final-max">out of {ITN.totalMax} points</div>
                <div className="itn-final-badge">
                  <div className="rating">{ITN.itnRating}</div>
                  <div className="lvl">— {ITN.itnLevel}</div>
                </div>
              </div>

              <div className="itn-bars-card">
                <div className="itn-bars-title">Section breakdown</div>
                {ITN.sections.map((s) => (
                  <div className="itn-bar-row" key={s.k}>
                    <div className="itn-bar-label">{s.label}</div>
                    <div className="itn-bar-track">
                      <div
                        className="itn-bar-fill"
                        style={{
                          width: `${(s.score / s.max) * 100}%`,
                          background: TONE_FG[s.tone],
                        }}
                      />
                    </div>
                    <div className="itn-bar-val" style={{ color: TONE_FG[s.tone] }}>
                      {s.score}/{s.max}
                    </div>
                  </div>
                ))}
                <div className="itn-bar-row total">
                  <div className="itn-bar-label">Total</div>
                  <div className="itn-bar-track">
                    <div
                      className="itn-bar-fill"
                      style={{ width: `${(ITN.totalScore / ITN.totalMax) * 100}%`, background: "#A8D847" }}
                    />
                  </div>
                  <div className="itn-bar-val" style={{ color: "#A8D847" }}>
                    {ITN.totalScore}/{ITN.totalMax}
                  </div>
                </div>
              </div>
            </div>

            <div className="itn-table">
              <div className="itn-table-head">
                <div>ITN</div>
                <div>Level</div>
                <div>Score (M)</div>
                <div>Score (F)</div>
              </div>
              {ITN.table.map((r) => (
                <div key={r.itn} className={"itn-tr " + (r.active ? "on" : "")}>
                  <div className="itn-name">{r.itn}</div>
                  <div>{r.level}</div>
                  <div className="itn-tr-score">{r.m}</div>
                  <div className="itn-tr-score">{r.f}</div>
                </div>
              ))}
            </div>

            <div className="itn-summary">
              <div className="itn-sumcard">
                <div className="itn-sumcard-k">Strokes total</div>
                <div className="itn-sumcard-v">{ITN.summary.strokesTotal}</div>
                <div className="itn-sumcard-sub">/ {ITN.summary.strokesMax} pts</div>
              </div>
              <div className="itn-sumcard">
                <div className="itn-sumcard-k">Mobility</div>
                <div className="itn-sumcard-v">{ITN.summary.mobility}</div>
                <div className="itn-sumcard-sub">/ {ITN.summary.mobilityMax} pts</div>
              </div>
              <div className="itn-sumcard hl">
                <div className="itn-sumcard-k">Total score</div>
                <div className="itn-sumcard-v">{ITN.summary.total}</div>
                <div className="itn-sumcard-sub">/ {ITN.summary.totalMax} pts</div>
              </div>
            </div>

            <div className="itn-itnbox">
              <div className="itn-itnbox-k">Player ITN rating</div>
              <div className="itn-itnbox-v">{ITN.itnRating}</div>
              <div className="itn-itnbox-lvl">{ITN.itnLevel}</div>
            </div>

            <div className="itn-note">
              <div className="itn-note-h">Coach note</div>
              {ITN.coachNote}
            </div>
          </>
        )}

        {tab === "talent" && (
          <>
            <div className="tal-grid">
              <div>
                <div className="tal-final">
                  <div className="itn-final-k">Talent score</div>
                  <div className="tal-final-v">{TALENT.totalScore}</div>
                  <div className="itn-final-max">/ {TALENT.maxScore}</div>
                  <div className="tal-final-badge">{TALENT.label}</div>
                </div>

                <div className="itn-bars-card" style={{ marginTop: 14 }}>
                  <div className="itn-bars-title">Factor scores</div>
                  {TALENT.factors.map((f) => (
                    <div className="tal-factor" key={f.k}>
                      <div className="tal-factor-name">{f.name}</div>
                      <div className="tal-factor-track">
                        <div
                          className="tal-factor-fill"
                          style={{
                            width: `${(f.value / 10) * 100}%`,
                            background:
                              f.cat === "physical"
                                ? "#A8D847"
                                : f.cat === "motor"
                                  ? "#7DD3FC"
                                  : "#F2B544",
                          }}
                        />
                      </div>
                      <div className="tal-factor-val">{f.value}/10</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="tal-radar">
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      color: "var(--fgMute)",
                      fontWeight: 700,
                      marginBottom: 12,
                    }}
                  >
                    Talent radar
                  </div>
                  <RadarSvg />
                </div>

                <div className="tal-cats">
                  <div className="itn-bars-title">Category breakdown</div>
                  {TALENT.categories.map((c) => (
                    <div className="itn-bar-row" key={c.k}>
                      <div className="itn-bar-label" style={{ color: c.color }}>
                        {c.name}
                      </div>
                      <div className="itn-bar-track">
                        <div
                          className="itn-bar-fill"
                          style={{ width: `${(c.value / c.max) * 100}%`, background: c.color }}
                        />
                      </div>
                      <div className="itn-bar-val" style={{ color: c.color }}>
                        {c.value}/{c.max}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tal-bot">
              <div className="tal-panel">
                <div className="tal-panel-h good">
                  <Icon name="trending-up" /> Strongest
                </div>
                {TALENT.strongest.map((r) => (
                  <div className="tal-panel-row" key={r.k}>
                    <span>{r.k}</span>
                    <span className="v" style={{ color: "var(--good)" }}>
                      {r.v}/10
                    </span>
                  </div>
                ))}
              </div>
              <div className="tal-panel">
                <div className="tal-panel-h weak">
                  <Icon name="alert-triangle" /> Needs work
                </div>
                {TALENT.needsWork.map((r) => (
                  <div className="tal-panel-row" key={r.k}>
                    <span>{r.k}</span>
                    <span className="v" style={{ color: "var(--weak)" }}>
                      {r.v}/10
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="itn-note">
              <div className="itn-note-h">Coach note</div>
              {TALENT.coachNote}
            </div>
          </>
        )}
      </div>
    </>
  );
}
