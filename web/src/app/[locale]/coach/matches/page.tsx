"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { MATCHES, MATCH_STATS } from "@/lib/match-data";

function Styles() {
  return (
    <style>{`
.mtc-top{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.mtc-player-pill{display:flex;align-items:center;gap:10px;padding:6px 10px 6px 6px;background:var(--surface2);border:1px solid var(--accentRing);border-radius:10px}
.mtc-player-pill .av{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:10px}

.mtc-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:14px}
.mtc-kpi{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:14px}
.mtc-kpi.hl{border-color:var(--accentRing);background:linear-gradient(180deg,rgba(168,216,71,0.06),transparent)}
.mtc-kpi-ic{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;font-size:18px;background:rgba(168,216,71,0.10);color:var(--accent);border:1px solid var(--hairline2)}
.mtc-kpi-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.mtc-kpi-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:24px;font-weight:800;letter-spacing:-.02em;margin-top:4px}
.mtc-kpi-sub{font-size:11px;color:var(--good);font-weight:600;margin-top:2px}

.mtc-grid{display:grid;grid-template-columns:1.1fr 1.4fr;gap:14px;margin-top:14px;min-height:0}
.mtc-list{display:flex;flex-direction:column;gap:10px;max-height:560px;overflow-y:auto;padding-right:4px}
.mtc-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:14px 16px;cursor:pointer;transition:.15s;display:grid;grid-template-rows:auto auto auto;gap:8px;border-left:3px solid transparent}
.mtc-card:hover{border-color:var(--hairline2);background:var(--surface3)}
.mtc-card.sel{border-color:var(--accentRing);border-left-color:var(--accent);background:linear-gradient(90deg,rgba(168,216,71,0.06),transparent 60%)}
.mtc-card-top{display:flex;align-items:center;justify-content:space-between}
.mtc-tag{padding:3px 8px;font-size:9.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;border-radius:4px}
.mtc-card-vs{display:flex;align-items:center;justify-content:space-between;gap:10px}
.mtc-card-vs .nm{font-size:13px;font-weight:700}
.mtc-card-vs .vs{font-size:10px;color:var(--fgMute)}
.mtc-card-bot{display:flex;justify-content:space-between;align-items:center}
.mtc-score{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700;font-size:14px}
.mtc-score.win{color:var(--good)}
.mtc-score.loss{color:var(--weak)}
.mtc-surf{display:flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.mtc-surf .dot{width:8px;height:8px;border-radius:4px}

.mtc-detail{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:20px 22px;display:flex;flex-direction:column;gap:18px}
.mtc-d-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap}
.mtc-d-meta{display:flex;gap:14px;font-size:11px;color:var(--fgMute);margin-top:6px}
.mtc-d-meta span{display:flex;align-items:center;gap:5px}
.mtc-d-sub{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);font-weight:700}

.mtc-d-players{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px;padding:14px 0;border-top:1px solid var(--hairline);border-bottom:1px solid var(--hairline)}
.mtc-d-player{display:flex;align-items:center;gap:10px}
.mtc-d-player.right{flex-direction:row-reverse;text-align:right}
.mtc-d-player .av{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:13px}
.mtc-d-player .nm{font-size:14px;font-weight:700}
.mtc-d-player .lbl{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--fgMute);margin-top:2px}
.mtc-d-win{padding:5px 18px;background:var(--accent);color:var(--accentInk);font-size:11px;font-weight:800;letter-spacing:.16em;border-radius:999px;text-transform:uppercase}

.mtc-sets{display:flex;gap:14px;justify-content:center}
.mtc-set{background:var(--surface3);border:1px solid var(--hairline2);border-radius:10px;padding:10px 18px;text-align:center;min-width:90px}
.mtc-set-k{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.mtc-set-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:22px;font-weight:800;color:var(--fg);margin-top:4px}

.mtc-stats-h{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.mtc-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px 28px;margin-top:8px}
.mtc-stat-row{display:flex;justify-content:space-between;border-bottom:1px dashed var(--hairline);padding:7px 0;font-size:12.5px}
.mtc-stat-row .v{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700;color:var(--fg)}

.mtc-note{background:var(--surface3);border:1px solid var(--hairline2);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--fgDim);line-height:1.5}
.mtc-note-h{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:6px}
`}</style>
  );
}

const TONE_BG: Record<string, string> = {
  Official: "rgba(168,216,71,0.10)",
  Friendly: "rgba(125,211,252,0.10)",
  Training: "rgba(196,166,240,0.10)",
};
const TONE_FG: Record<string, string> = {
  Official: "#A8D847",
  Friendly: "#7DD3FC",
  Training: "#C4A6F0",
};

export default function MatchesPage() {
  const t = useTranslations();
  const [tab, setTab] = useState<"matches" | "tournament">("matches");
  const [selId, setSelId] = useState(MATCHES[0].id);
  const sel = MATCHES.find((m) => m.id === selId)!;

  const wins = MATCHES.filter((m) => m.result === "win").length;
  const losses = MATCHES.length - wins;
  const winRate = Math.round((wins / MATCHES.length) * 100);

  return (
    <>
      <Topbar
        title={t("matches.title")}
        breadcrumb={[{ label: t("crumb.workspace") }, { label: t("matches.tabMatches") }]}
        actions={
          <>
            <GhostBtn icon="file-type-pdf">{t("common.exportPdf")}</GhostBtn>
            <PrimaryBtn icon="plus">{t("matches.addMatch")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="mtc-top">
          <div className="r-tabs">
            <button className={"r-tab " + (tab === "matches" ? "on" : "")} onClick={() => setTab("matches")}>
              <Icon name="trophy" /> {t("matches.tabMatches")}
            </button>
            <button
              className={"r-tab " + (tab === "tournament" ? "on" : "")}
              onClick={() => setTab("tournament")}
            >
              <Icon name="tournament" /> {t("matches.tabTournament")}
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, letterSpacing: ".16em", color: "var(--fgMute)", fontWeight: 700, textTransform: "uppercase" }}>
              {t("matches.player")}
            </span>
            <div className="mtc-player-pill">
              <div className="av">AR</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Arman Rahimi</div>
                <div style={{ fontSize: 9.5, color: "var(--fgMute)" }}>🇩🇪 Germany</div>
              </div>
            </div>
            <GhostBtn icon="calendar">This month</GhostBtn>
            <GhostBtn icon="filter">All types</GhostBtn>
            <GhostBtn icon="layers">All surfaces</GhostBtn>
          </div>
        </div>

        {tab === "matches" && (
          <>
            <div className="mtc-kpis">
              <div className="mtc-kpi">
                <div className="mtc-kpi-ic">
                  <Icon name="trophy" />
                </div>
                <div>
                  <div className="mtc-kpi-k">Total matches</div>
                  <div className="mtc-kpi-v">{MATCHES.length}</div>
                  <div className="mtc-kpi-sub">+3 this month</div>
                </div>
              </div>
              <div className="mtc-kpi">
                <div className="mtc-kpi-ic">
                  <Icon name="check" />
                </div>
                <div>
                  <div className="mtc-kpi-k">Wins</div>
                  <div className="mtc-kpi-v">{wins}</div>
                  <div className="mtc-kpi-sub">{winRate}% win rate</div>
                </div>
              </div>
              <div className="mtc-kpi">
                <div className="mtc-kpi-ic" style={{ background: "rgba(229,104,93,0.10)", color: "#E5685D" }}>
                  <Icon name="x" />
                </div>
                <div>
                  <div className="mtc-kpi-k">Losses</div>
                  <div className="mtc-kpi-v">{losses}</div>
                  <div className="mtc-kpi-sub" style={{ color: "var(--fgMute)" }}>
                    {100 - winRate}%
                  </div>
                </div>
              </div>
              <div className="mtc-kpi hl">
                <div className="mtc-kpi-ic">
                  <Icon name="chart-line" />
                </div>
                <div>
                  <div className="mtc-kpi-k">Win rate</div>
                  <div className="mtc-kpi-v">{winRate}%</div>
                  <div className="mtc-kpi-sub">↑ 4pp vs last month</div>
                </div>
              </div>
            </div>

            <div className="mtc-grid">
              <div className="mtc-list">
                {MATCHES.map((m) => (
                  <div
                    key={m.id}
                    className={"mtc-card " + (m.id === selId ? "sel" : "")}
                    onClick={() => setSelId(m.id)}
                  >
                    <div className="mtc-card-top">
                      <span
                        className="mtc-tag"
                        style={{ background: TONE_BG[m.type], color: TONE_FG[m.type] }}
                      >
                        {m.type}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--fgMute)" }}>{m.date}</span>
                    </div>
                    <div className="mtc-card-vs">
                      <span className="nm">{m.flag} {m.player}</span>
                      <span className="vs">vs</span>
                      <span className="nm">{m.opp} {m.oppFlag}</span>
                    </div>
                    <div className="mtc-card-bot">
                      <span className={"mtc-score " + (m.result === "win" ? "win" : "loss")}>
                        {m.sets.map((s) => `${s.p}-${s.o}`).join(" · ")}
                      </span>
                      <span className="mtc-surf" style={{ color: m.surfaceColor }}>
                        <span className="dot" style={{ background: m.surfaceColor }} />
                        {m.surface}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mtc-detail">
                <div className="mtc-d-head">
                  <div>
                    <div className="mtc-d-sub">{sel.type} · Spring Cup 2026</div>
                    <div className="mtc-d-meta">
                      <span>
                        <Icon name="calendar" /> {sel.date}
                      </span>
                      <span style={{ color: sel.surfaceColor }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            background: sel.surfaceColor,
                            borderRadius: 4,
                            display: "inline-block",
                          }}
                        />{" "}
                        {sel.surface}
                      </span>
                      <span>
                        <Icon name="clock" /> 1 h 47 m
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mtc-d-players">
                  <div className="mtc-d-player">
                    <div className="av">{sel.playerInitials}</div>
                    <div>
                      <div className="lbl">Our player</div>
                      <div className="nm">{sel.flag} {sel.player} Rahimi</div>
                    </div>
                  </div>
                  <div className="mtc-d-win">{sel.result === "win" ? "Win" : "Loss"}</div>
                  <div className="mtc-d-player right">
                    <div className="av" style={{ background: "linear-gradient(135deg,#2a1d1d,#3a2a2a)", borderColor: "rgba(229,104,93,0.30)", color: "#E5685D" }}>
                      {sel.oppInitials}
                    </div>
                    <div>
                      <div className="lbl">Opponent</div>
                      <div className="nm">{sel.oppFlag} {sel.opp}</div>
                    </div>
                  </div>
                </div>

                <div className="mtc-sets">
                  {sel.sets.map((s, i) => (
                    <div key={i} className="mtc-set">
                      <div className="mtc-set-k">Set {i + 1}</div>
                      <div className="mtc-set-v">
                        {s.p} <span style={{ color: "var(--fgMute)", fontWeight: 400 }}>-</span> {s.o}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="mtc-stats-h">Match stats</div>
                  <div className="mtc-stats">
                    <div className="mtc-stat-row"><span>Aces</span><span className="v">{MATCH_STATS.aces}</span></div>
                    <div className="mtc-stat-row"><span>Double faults</span><span className="v">{MATCH_STATS.doubleFaults}</span></div>
                    <div className="mtc-stat-row"><span>Winners</span><span className="v">{MATCH_STATS.winners}</span></div>
                    <div className="mtc-stat-row"><span>Unforced</span><span className="v">{MATCH_STATS.unforced}</span></div>
                    <div className="mtc-stat-row"><span>1st serve %</span><span className="v">{MATCH_STATS.firstServePct}%</span></div>
                    <div className="mtc-stat-row"><span>Break points</span><span className="v">{MATCH_STATS.breakPoints}</span></div>
                  </div>
                </div>

                <div className="mtc-note">
                  <div className="mtc-note-h">Coach notes</div>
                  {MATCH_STATS.coachNote}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "tournament" && (
          <div
            className="r-card"
            style={{ marginTop: 14, padding: "48px 24px", textAlign: "center", color: "var(--fgDim)" }}
          >
            <Icon name="tournament" style={{ fontSize: 36, color: "var(--accent)" }} />
            <div style={{ marginTop: 10, fontSize: 16, fontWeight: 700, color: "var(--fg)" }}>
              Tournament ladder / bracket
            </div>
            <div style={{ marginTop: 6, fontSize: 13 }}>
              Standings, ladder, and bracket views appear here when a tournament is active.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
