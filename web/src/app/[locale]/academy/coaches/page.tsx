"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { COACHES } from "@/lib/academy-data";
import { InviteCoachModal } from "@/components/invite-offboard-modals";

function Styles() {
  return (
    <style>{`
.acs-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.acs-kpi{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:14px}
.acs-kpi-ic{width:40px;height:40px;border-radius:10px;background:var(--accentBg);color:var(--accent);border:1px solid var(--hairline2);display:grid;place-items:center;font-size:18px}
.acs-kpi-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.acs-kpi-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:24px;font-weight:800;letter-spacing:-.02em;margin-top:4px}
.acs-kpi-sub{font-size:11px;font-weight:600;margin-left:6px}

.acs-tools{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:12px}
.acs-tools-hint{font-size:12px;color:var(--fgDim)}

.acs-grid{margin-top:14px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.acs-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px;position:relative;display:flex;flex-direction:column;gap:14px;cursor:pointer;transition:.15s}
.acs-card:hover{border-color:var(--accentRing);transform:translateY(-2px);box-shadow:0 20px 50px -20px rgba(0,0,0,0.6)}
.acs-card.attn{border-color:rgba(229,104,93,0.30)}
.acs-card-h{display:flex;align-items:center;gap:12px}
.acs-card-av{width:42px;height:42px;border-radius:21px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:800;font-size:13px}
.acs-name{font-size:14px;font-weight:800}
.acs-role{font-size:11px;color:var(--fgMute);margin-top:2px}
.acs-review{position:absolute;top:14px;right:14px;background:var(--weak);color:#fff;font-size:9px;font-weight:800;letter-spacing:.16em;padding:3px 8px;border-radius:4px;text-transform:uppercase}

.acs-score-box{background:var(--surface3);border:1px solid var(--hairline2);border-radius:10px;padding:12px 14px;display:grid;grid-template-columns:1fr auto;align-items:center}
.acs-score-k{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.acs-score-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:36px;font-weight:800;color:var(--accent);letter-spacing:-.02em;line-height:1;margin-top:2px}
.acs-score-trend{font-size:11px;font-weight:700;margin-top:4px}
.acs-rank-k{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;text-align:right}
.acs-rank-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:32px;font-weight:800;color:var(--fg);letter-spacing:-.02em;line-height:1;margin-top:2px;text-align:right}

.acs-metrics{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.acs-met{}
.acs-met-h{display:flex;justify-content:space-between;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:5px}
.acs-met-bar{height:5px;background:var(--surface3);border-radius:3px;overflow:hidden}
.acs-met-bar-fill{height:100%;border-radius:3px}
.acs-met-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700;color:var(--fg)}

.acs-foot{display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:var(--fgMute);margin-top:auto;padding-top:6px;border-top:1px solid var(--hairline)}
.acs-foot strong{color:var(--fg);font-weight:700}
`}</style>
  );
}

const SORTS = ["Score", "Name", "Players", "Trend"];

export default function CoachesRosterPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [sort, setSort] = useState("Score");
  const [showInvite, setShowInvite] = useState(false);

  const sorted = useMemo(() => {
    const arr = [...COACHES];
    if (sort === "Score") arr.sort((a, b) => b.score - a.score);
    if (sort === "Name") arr.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Players") arr.sort((a, b) => b.players - a.players);
    if (sort === "Trend") arr.sort((a, b) => b.trend - a.trend);
    return arr;
  }, [sort]);

  const avgScore = Math.round(COACHES.reduce((a, b) => a + b.score, 0) / COACHES.length);
  const needsReview = COACHES.filter((c) => c.needsAttention || c.trend < 0).length;
  const rising = COACHES.filter((c) => c.trend >= 4).length;

  return (
    <>
      <Topbar
        title={t("coaches.title")}
        breadcrumb={[{ label: t("crumb.academy") }, { label: t("nav.coaches") }]}
        actions={
          <>
            <GhostBtn icon="adjustments-horizontal">{t("common.filters")}</GhostBtn>
            <GhostBtn icon="file-export">{t("common.export")}</GhostBtn>
            <PrimaryBtn icon="user-plus" onClick={() => setShowInvite(true)}>{t("coaches.inviteCoach")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="acs-kpis">
          <div className="acs-kpi">
            <div className="acs-kpi-ic"><Icon name="school" /></div>
            <div>
              <div className="acs-kpi-k">Total coaches</div>
              <div className="acs-kpi-v">{COACHES.length}<span className="acs-kpi-sub" style={{ color: "#A8D847" }}>2 top-tier</span></div>
            </div>
          </div>
          <div className="acs-kpi">
            <div className="acs-kpi-ic"><Icon name="chart-bar" /></div>
            <div>
              <div className="acs-kpi-k">Avg score</div>
              <div className="acs-kpi-v">{avgScore}<span className="acs-kpi-sub" style={{ color: "var(--fgMute)" }}>out of 100</span></div>
            </div>
          </div>
          <div className="acs-kpi">
            <div className="acs-kpi-ic" style={{ background: "rgba(229,104,93,0.10)", color: "#E5685D" }}>
              <Icon name="alert-triangle" />
            </div>
            <div>
              <div className="acs-kpi-k">Need review</div>
              <div className="acs-kpi-v">{needsReview}<span className="acs-kpi-sub" style={{ color: "#E5685D" }}>low score or trend</span></div>
            </div>
          </div>
          <div className="acs-kpi">
            <div className="acs-kpi-ic" style={{ background: "rgba(168,216,71,0.10)", color: "#A8D847" }}>
              <Icon name="trending-up" />
            </div>
            <div>
              <div className="acs-kpi-k">Rising</div>
              <div className="acs-kpi-v">{rising}<span className="acs-kpi-sub" style={{ color: "#A8D847" }}>+4 pts this q</span></div>
            </div>
          </div>
        </div>

        <div className="acs-tools">
          <div className="acs-tools-hint">
            Click any coach to open their scorecard.{" "}
            <span style={{ color: "var(--fgMute)" }}>Sort:</span>
          </div>
          <div className="r-seg">
            {SORTS.map((s) => (
              <button key={s} className={sort === s ? "on" : ""} onClick={() => setSort(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="acs-grid">
          {sorted.map((c) => (
            <Link key={c.id} href={`/${locale}/academy/compare`} className={"acs-card " + (c.needsAttention ? "attn" : "")}>
              {c.needsAttention && <div className="acs-review">Review</div>}
              <div className="acs-card-h">
                <div className="acs-card-av">{c.initials}</div>
                <div>
                  <div className="acs-name">
                    {c.flag} {c.name}
                  </div>
                  <div className="acs-role">
                    {c.role} · since {c.since}
                  </div>
                </div>
              </div>
              <div className="acs-score-box">
                <div>
                  <div className="acs-score-k">Coach score</div>
                  <div className="acs-score-v">{c.score}</div>
                  <div className="acs-score-trend" style={{ color: c.trend >= 0 ? "var(--good)" : "var(--weak)" }}>
                    {c.trend > 0 ? "+" : ""}
                    {c.trend} pts
                  </div>
                </div>
                <div>
                  <div className="acs-rank-k">Rank</div>
                  <div className="acs-rank-v">#{c.rank}</div>
                </div>
              </div>
              <div className="acs-metrics">
                <div className="acs-met">
                  <div className="acs-met-h">
                    <span>ITN</span>
                    <span className="acs-met-v">{c.metrics.itnGain.v}</span>
                  </div>
                  <div className="acs-met-bar">
                    <div className="acs-met-bar-fill" style={{ width: `${c.metrics.itnGain.pct}%`, background: "#A8D847" }} />
                  </div>
                </div>
                <div className="acs-met">
                  <div className="acs-met-h">
                    <span>Win</span>
                    <span className="acs-met-v">{c.metrics.winRate.v}</span>
                  </div>
                  <div className="acs-met-bar">
                    <div className="acs-met-bar-fill" style={{ width: `${c.metrics.winRate.pct}%`, background: "#A8D847" }} />
                  </div>
                </div>
                <div className="acs-met">
                  <div className="acs-met-h">
                    <span>Retention</span>
                    <span className="acs-met-v">{c.metrics.retention.v}</span>
                  </div>
                  <div className="acs-met-bar">
                    <div className="acs-met-bar-fill" style={{ width: `${c.metrics.retention.pct}%`, background: "#F2B544" }} />
                  </div>
                </div>
                <div className="acs-met">
                  <div className="acs-met-h">
                    <span>Parent sat</span>
                    <span className="acs-met-v">{c.metrics.parentSat.v}/5</span>
                  </div>
                  <div className="acs-met-bar">
                    <div className="acs-met-bar-fill" style={{ width: `${c.metrics.parentSat.pct}%`, background: "#A8D847" }} />
                  </div>
                </div>
              </div>
              <div className="acs-foot">
                <span>
                  <strong>{c.players}</strong> players
                </span>
                <span className="acs-met-v">{c.metrics.itnGain.v} avg ITN</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {showInvite && <InviteCoachModal onClose={() => setShowInvite(false)} currentCoaches={COACHES.length} />}
    </>
  );
}
