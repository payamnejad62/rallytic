"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { COACHES, type Coach } from "@/lib/academy-data";

const METRIC_DEFS: { k: keyof Coach["metrics"]; label: string; pts: number }[] = [
  { k: "itnGain", label: "ITN improvement", pts: 40 },
  { k: "winRate", label: "Win rate", pts: 28 },
  { k: "retention", label: "Player retention", pts: 25 },
  { k: "adherence", label: "Session adherence", pts: 16 },
  { k: "planCompletion", label: "Plan completion", pts: 22 },
  { k: "parentSat", label: "Parent satisfaction", pts: 38 },
  { k: "playerPerf", label: "Player perf growth", pts: 37 },
];

function Styles() {
  return (
    <style>{`
.cmp-head{display:grid;grid-template-columns:1fr 70px 1fr;gap:14px;align-items:stretch}
.cmp-side{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 22px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;position:relative}
.cmp-side.win{border-color:var(--accentRing);background:linear-gradient(135deg,rgba(168,216,71,0.10),transparent 70%)}
.cmp-side-h{display:flex;align-items:center;gap:12px}
.cmp-av{width:42px;height:42px;border-radius:21px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:800;font-size:13px}
.cmp-name{font-size:16px;font-weight:800}
.cmp-meta{font-size:11px;color:var(--fgMute);margin-top:2px}
.cmp-score-row{display:flex;justify-content:space-between;align-items:flex-end}
.cmp-score{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:50px;font-weight:800;color:var(--accent);letter-spacing:-.03em;line-height:1}
.cmp-side.lose .cmp-score{color:var(--weak)}
.cmp-score small{font-size:13px;color:var(--fgMute);margin-left:6px}
.cmp-trend{font-size:11px;font-weight:700;text-align:right;padding-bottom:6px}
.cmp-badge{position:absolute;top:14px;right:14px;font-size:9px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;padding:3px 9px;border-radius:4px;background:var(--accent);color:var(--accentInk)}

.cmp-gap{background:var(--surface3);border:1px solid var(--hairline2);border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px 10px}
.cmp-gap-k{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.cmp-gap-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:30px;font-weight:800;color:var(--accent);letter-spacing:-.02em;line-height:1;margin-top:4px}

.cmp-insight{margin-top:14px;background:linear-gradient(90deg,rgba(168,216,71,0.10),transparent 50%);border:1px solid var(--accentRing);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:14px}
.cmp-insight-ic{width:32px;height:32px;border-radius:50%;background:var(--accent);color:var(--accentInk);display:grid;place-items:center;flex-shrink:0}
.cmp-insight-t{flex:1;font-size:13px;color:var(--fg);line-height:1.5}
.cmp-insight-t strong{color:var(--accent);font-weight:700}

.cmp-rows{margin-top:14px;display:flex;flex-direction:column;gap:6px}
.cmp-row{background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:12px 18px}
.cmp-row-k{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center}
.cmp-row-pts{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;color:var(--fgMute);font-weight:600}
.cmp-row-bars{display:grid;grid-template-columns:1fr 30px 1fr;gap:10px;align-items:center}
.cmp-bar-wrap{display:flex;align-items:center;gap:10px}
.cmp-bar-wrap.right{flex-direction:row-reverse}
.cmp-bar-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:14px;font-weight:800;color:var(--fg);min-width:48px;text-align:center}
.cmp-bar-track{flex:1;height:10px;background:var(--surface3);border-radius:5px;overflow:hidden}
.cmp-bar-fill{height:100%;border-radius:5px}
.cmp-vs{text-align:center;font-size:10px;color:var(--fgMute);font-weight:700}
`}</style>
  );
}

export default function CompareCoachesPage() {
  const tr = useTranslations();
  const [a, setA] = useState<Coach>(COACHES[0]);
  const [b, setB] = useState<Coach>(COACHES[5]);
  const gap = Math.abs(a.score - b.score);
  const aWins = a.score >= b.score;

  function swap() {
    const t = a;
    setA(b);
    setB(t);
  }

  return (
    <>
      <Topbar
        title={tr("compare.title")}
        breadcrumb={[{ label: tr("crumb.academy") }, { label: tr("nav.compare") }]}
        actions={
          <>
            <GhostBtn icon="arrows-left-right" onClick={swap}>{tr("compare.swap")}</GhostBtn>
            <GhostBtn icon="plus">{tr("compare.addThird")}</GhostBtn>
            <PrimaryBtn icon="file-export">{tr("compare.exportCmp")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="cmp-head">
          <div className={"cmp-side " + (aWins ? "win" : "lose")}>
            {aWins && <div className="cmp-badge">Higher</div>}
            <div className="cmp-side-h">
              <div className="cmp-av">{a.initials}</div>
              <div>
                <div className="cmp-name">
                  {a.flag} {a.name}
                </div>
                <div className="cmp-meta">
                  {a.role} · {a.players} players
                </div>
              </div>
            </div>
            <div className="cmp-score-row">
              <div className="cmp-score">
                {a.score}
                <small>/ 100</small>
              </div>
              <div className="cmp-trend" style={{ color: a.trend >= 0 ? "var(--good)" : "var(--weak)" }}>
                {a.trend > 0 ? "+" : ""}
                {a.trend} QoQ
              </div>
            </div>
            <CoachSelector value={a.id} onChange={(id) => setA(COACHES.find((c) => c.id === id)!)} disabled={b.id} />
          </div>

          <div className="cmp-gap">
            <div className="cmp-gap-k">Gap</div>
            <div className="cmp-gap-v">{gap}</div>
          </div>

          <div className={"cmp-side " + (!aWins ? "win" : "lose")}>
            {!aWins && <div className="cmp-badge">Higher</div>}
            <div className="cmp-side-h">
              <div className="cmp-av">{b.initials}</div>
              <div>
                <div className="cmp-name">
                  {b.flag} {b.name}
                </div>
                <div className="cmp-meta">
                  {b.role} · {b.players} players
                </div>
              </div>
            </div>
            <div className="cmp-score-row">
              <div className="cmp-score" style={!aWins ? undefined : { color: "var(--weak)" }}>
                {b.score}
                <small>/ 100</small>
              </div>
              <div className="cmp-trend" style={{ color: b.trend >= 0 ? "var(--good)" : "var(--weak)" }}>
                {b.trend > 0 ? "+" : ""}
                {b.trend} QoQ
              </div>
            </div>
            <CoachSelector value={b.id} onChange={(id) => setB(COACHES.find((c) => c.id === id)!)} disabled={a.id} />
          </div>
        </div>

        <div className="cmp-insight">
          <div className="cmp-insight-ic">
            <Icon name="bulb" />
          </div>
          <div className="cmp-insight-t">
            <strong>Insight:</strong> {a.name} outperforms {b.name} on most metrics — the biggest gaps are
            in <strong>retention</strong> and <strong>plan completion</strong>. Consider pairing them for
            mentorship.
          </div>
          <button className="r-btn r-btn-soft" style={{ padding: "8px 14px" }}>
            Set up mentorship
          </button>
        </div>

        <div className="cmp-rows">
          {METRIC_DEFS.map((d) => {
            const ma = a.metrics[d.k];
            const mb = b.metrics[d.k];
            const aWin = ma.pct >= mb.pct;
            return (
              <div className="cmp-row" key={d.k}>
                <div className="cmp-row-k">
                  <span>{d.label}</span>
                  <span className="cmp-row-pts">± {d.pts} pts</span>
                </div>
                <div className="cmp-row-bars">
                  <div className="cmp-bar-wrap">
                    <div className="cmp-bar-v" style={{ color: aWin ? "var(--accent)" : "var(--fgDim)" }}>
                      {ma.v}
                    </div>
                    <div className="cmp-bar-track">
                      <div
                        className="cmp-bar-fill"
                        style={{
                          width: `${ma.pct}%`,
                          background: aWin ? "var(--accent)" : "var(--hairline2)",
                          float: "right",
                        }}
                      />
                    </div>
                  </div>
                  <div className="cmp-vs">VS</div>
                  <div className="cmp-bar-wrap">
                    <div className="cmp-bar-track">
                      <div
                        className="cmp-bar-fill"
                        style={{
                          width: `${mb.pct}%`,
                          background: !aWin ? "var(--accent)" : "var(--hairline2)",
                        }}
                      />
                    </div>
                    <div className="cmp-bar-v" style={{ color: !aWin ? "var(--accent)" : "var(--fgDim)" }}>
                      {mb.v}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function CoachSelector({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled: string;
  onChange: (id: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        marginTop: 8,
        background: "var(--surface3)",
        border: "1px solid var(--hairline2)",
        borderRadius: 8,
        padding: "8px 12px",
        color: "var(--fgDim)",
        fontFamily: "inherit",
        fontSize: 12,
      }}
    >
      {COACHES.map((c) => (
        <option key={c.id} value={c.id} disabled={c.id === disabled}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
