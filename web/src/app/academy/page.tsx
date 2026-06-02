import Link from "next/link";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { TrendLine } from "@/components/trend-line";
import {
  ACAD_KPIS,
  ACAD_TRENDS,
  ACAD_WEAK_SPOTS,
  ACAD_ACTIONS,
  COACHES,
} from "@/lib/academy-data";

const TONE_BG: Record<string, string> = {
  good: "rgba(168,216,71,0.10)",
  med: "rgba(242,181,68,0.10)",
  accent: "rgba(168,216,71,0.10)",
  weak: "rgba(229,104,93,0.10)",
};
const TONE_FG: Record<string, string> = {
  good: "#A8D847",
  med: "#F2B544",
  accent: "#A8D847",
  weak: "#E5685D",
};
const WEAK_TONES: Record<string, string> = {
  critical: "#E5685D",
  warning: "#F2B544",
  ok: "#A8D847",
};

function Styles() {
  return (
    <style>{`
.ad-kpis{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}
.ad-kpi{background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px}
.ad-kpi-ic{width:34px;height:34px;border-radius:8px;display:grid;place-items:center;font-size:16px;border:1px solid var(--hairline2)}
.ad-kpi-k{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.ad-kpi-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:20px;font-weight:800;letter-spacing:-.02em}
.ad-kpi-sub{font-size:10px;margin-left:5px;font-weight:600}

.ad-trends{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:14px}
.ad-trend{background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:12px 14px}
.ad-trend-h{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px}
.ad-trend-k{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;line-height:1.4}
.ad-trend-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:24px;font-weight:800;color:var(--accent);letter-spacing:-.02em;text-align:right;line-height:1}
.ad-trend-sub{font-size:10px;color:var(--good);font-weight:700;text-align:right;margin-top:2px}

.ad-mid{display:grid;grid-template-columns:1.6fr 1fr;gap:14px;margin-top:14px}
.ad-board{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.ad-board-h{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-bottom:1px solid var(--hairline)}
.ad-board-h-t{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700}
.ad-coach-row{display:grid;grid-template-columns:30px 36px 1fr auto;align-items:center;gap:12px;padding:11px 18px;border-bottom:1px solid var(--hairline);cursor:pointer;text-decoration:none;color:inherit}
.ad-coach-row:last-child{border-bottom:none}
.ad-coach-row:hover{background:rgba(168,216,71,0.04)}
.ad-coach-row.attn{background:rgba(229,104,93,0.04)}
.ad-rank{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:14px;font-weight:800;color:var(--accent);text-align:center}
.ad-rank.bad{color:var(--weak)}
.ad-av{width:36px;height:36px;border-radius:18px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:11px}
.ad-coach-name{font-size:13px;font-weight:700;color:var(--fg)}
.ad-coach-sub{font-size:11px;color:var(--fgMute);margin-top:2px}
.ad-coach-score{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:18px;font-weight:800;color:var(--accent);text-align:right}
.ad-coach-trend{font-size:11px;font-weight:700;text-align:right}

.ad-attn{padding:16px 18px;background:linear-gradient(90deg,rgba(229,104,93,0.10),transparent 70%);border-top:1px solid var(--hairline)}
.ad-attn-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--weak);font-weight:700;margin-bottom:8px}
.ad-attn-row{display:grid;grid-template-columns:30px 36px 1fr auto;gap:12px;align-items:center}

.ad-weak{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:16px 18px}
.ad-weak-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.ad-weak-row{margin-bottom:11px}
.ad-weak-t{display:flex;justify-content:space-between;font-size:12.5px;color:var(--fg)}
.ad-weak-t .pct{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700}
.ad-weak-bar{margin-top:5px;height:6px;background:var(--surface3);border-radius:3px;overflow:hidden}
.ad-weak-bar-fill{height:100%;border-radius:3px}
.ad-weak-note{font-size:10px;color:var(--fgMute);margin-top:3px}

.ad-actions{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.ad-action{display:grid;grid-template-columns:36px 1fr auto;gap:14px;padding:14px 18px;border-bottom:1px solid var(--hairline);align-items:center}
.ad-action:last-child{border-bottom:none}
.ad-action-ic{width:36px;height:36px;border-radius:10px;background:var(--accentBg);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent)}
.ad-action-t{font-size:13px;font-weight:700}
.ad-action-b{font-size:11.5px;color:var(--fgDim);margin-top:2px}
.ad-action-cta{padding:7px 14px;background:var(--weak);color:#fff;border:none;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;font-family:inherit}
.ad-action-cta.alt{background:var(--accent);color:var(--accentInk)}
`}</style>
  );
}

export default function AcademyDashboard() {
  const months = ACAD_TRENDS.months;
  return (
    <>
      <Topbar
        title="Berlin Tennis Academy"
        breadcrumb={[{ label: "Academy" }, { label: "Dashboard" }]}
        actions={
          <>
            <GhostBtn icon="calendar">Q2 · 2026</GhostBtn>
            <GhostBtn icon="file-export">Export report</GhostBtn>
            <PrimaryBtn icon="sparkles">Run evaluation</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="ad-kpis">
          {ACAD_KPIS.map((k) => (
            <div className="ad-kpi" key={k.k}>
              <div className="ad-kpi-ic" style={{ background: TONE_BG[k.tone], color: TONE_FG[k.tone] }}>
                <Icon name={k.icon} />
              </div>
              <div>
                <div className="ad-kpi-k">{k.k}</div>
                <div className="ad-kpi-v">
                  {k.v}
                  <span className="ad-kpi-sub" style={{ color: TONE_FG[k.tone] }}>
                    {k.sub}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ad-trends">
          <div className="ad-trend">
            <div className="ad-trend-h">
              <div className="ad-trend-k">Academy<br />score</div>
              <div>
                <div className="ad-trend-v">82</div>
                <div className="ad-trend-sub">+8% YoY</div>
              </div>
            </div>
            <TrendLine points={ACAD_TRENDS.academyScore} labels={months} height={100} />
          </div>
          <div className="ad-trend">
            <div className="ad-trend-h">
              <div className="ad-trend-k">Avg ITN<br />gain</div>
              <div>
                <div className="ad-trend-v">+0.40</div>
                <div className="ad-trend-sub">+33% YoY</div>
              </div>
            </div>
            <TrendLine points={ACAD_TRENDS.avgItnGain} labels={months} height={100} />
          </div>
          <div className="ad-trend">
            <div className="ad-trend-h">
              <div className="ad-trend-k">Retention</div>
              <div>
                <div className="ad-trend-v" style={{ color: "#F2B544" }}>88%</div>
                <div className="ad-trend-sub">+6 pts YoY</div>
              </div>
            </div>
            <TrendLine points={ACAD_TRENDS.retention} color="#F2B544" labels={months} height={100} />
          </div>
          <div className="ad-trend">
            <div className="ad-trend-h">
              <div className="ad-trend-k">Win<br />rate</div>
              <div>
                <div className="ad-trend-v" style={{ color: "#D8B4FE" }}>66%</div>
                <div className="ad-trend-sub">+6 pts YoY</div>
              </div>
            </div>
            <TrendLine points={ACAD_TRENDS.winRate} color="#D8B4FE" labels={months} height={100} />
          </div>
        </div>

        <div className="ad-mid">
          <div className="ad-board">
            <div className="ad-board-h">
              <div className="ad-board-h-t">Coach leaderboard</div>
              <Link href="/academy/coaches" className="r-card-extra">
                View all →
              </Link>
            </div>
            {COACHES.filter((c) => !c.needsAttention)
              .slice(0, 3)
              .map((c) => (
                <Link key={c.id} href="/academy/coaches" className="ad-coach-row">
                  <div className="ad-rank">{c.rank}</div>
                  <div className="ad-av">{c.initials}</div>
                  <div>
                    <div className="ad-coach-name">
                      {c.flag} {c.name}
                    </div>
                    <div className="ad-coach-sub">
                      {c.role} · {c.players} players
                    </div>
                  </div>
                  <div>
                    <div className="ad-coach-score">{c.score}</div>
                    <div className="ad-coach-trend" style={{ color: c.trend >= 0 ? "var(--good)" : "var(--weak)" }}>
                      {c.trend > 0 ? "+" : ""}
                      {c.trend}
                    </div>
                  </div>
                </Link>
              ))}
            {COACHES.filter((c) => c.needsAttention).map((c) => (
              <div className="ad-attn" key={c.id}>
                <div className="ad-attn-h">Needs attention</div>
                <div className="ad-attn-row">
                  <div className="ad-rank bad">{c.rank}</div>
                  <div className="ad-av">{c.initials}</div>
                  <div>
                    <div className="ad-coach-name">
                      {c.flag} {c.name}
                    </div>
                    <div className="ad-coach-sub">
                      Score {c.score} · trend {c.trend} · review recommended
                    </div>
                  </div>
                  <button className="ad-action-cta">Review</button>
                </div>
              </div>
            ))}
          </div>

          <div className="ad-weak">
            <div className="ad-weak-h">
              <div className="ad-trend-k">
                Academy weak spots
              </div>
              <span style={{ fontSize: 10, color: "var(--fgMute)" }}>aggregated</span>
            </div>
            {ACAD_WEAK_SPOTS.map((w) => (
              <div className="ad-weak-row" key={w.area}>
                <div className="ad-weak-t">
                  <span>{w.area}</span>
                  <span className="pct" style={{ color: WEAK_TONES[w.level] }}>
                    {w.pct}%
                  </span>
                </div>
                <div className="ad-weak-bar">
                  <div
                    className="ad-weak-bar-fill"
                    style={{ width: `${w.pct}%`, background: WEAK_TONES[w.level] }}
                  />
                </div>
                <div className="ad-weak-note">{w.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ad-actions">
          <div className="ad-board-h">
            <div className="ad-board-h-t">Action items</div>
            <span style={{ fontSize: 10, color: "var(--fgMute)" }}>{ACAD_ACTIONS.length} pending</span>
          </div>
          {ACAD_ACTIONS.map((a, i) => (
            <div className="ad-action" key={a.id}>
              <div className="ad-action-ic">
                <Icon name={i === 0 ? "alert-circle" : i === 1 ? "clipboard-text" : "trending-up"} />
              </div>
              <div>
                <div className="ad-action-t">{a.title}</div>
                <div className="ad-action-b">{a.body}</div>
              </div>
              <button className={"ad-action-cta " + (i === 0 ? "" : "alt")}>{a.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
