"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn, SearchBar } from "@/components/shell";
import { Icon } from "@/components/icon";
import { DASH } from "@/lib/coach-data";
import { useLocaleFormat } from "@/lib/use-locale-format";

const TONE_BG: Record<string, string> = {
  good: "rgba(168,216,71,0.10)",
  med: "rgba(242,181,68,0.10)",
  weak: "rgba(229,104,93,0.10)",
  info: "rgba(125,211,252,0.10)",
  warn: "rgba(242,181,68,0.10)",
};
const TONE_FG: Record<string, string> = {
  good: "#A8D847",
  med: "#F2B544",
  weak: "#E5685D",
  info: "#7DD3FC",
  warn: "#F2B544",
};

function DashStyles() {
  return (
    <style>{`
.dash-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:14px}
.dash-kpi{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:14px}
.dash-kpi-ic{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;font-size:18px;border:1px solid var(--hairline2)}
.dash-kpi-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.dash-kpi-v{font-size:24px;font-weight:800;letter-spacing:-.02em;margin-top:4px}
.dash-kpi-sub{font-size:11px;font-weight:600;margin-left:6px}

.dash-row{display:grid;grid-template-columns:1.55fr 1fr;gap:14px;margin-top:14px}
.dash-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;display:flex;flex-direction:column;overflow:hidden}
.dash-card-head{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid var(--hairline)}
.dash-card-title{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700}
.dash-card-extra{font-size:11px;color:var(--accent);font-weight:700;display:flex;align-items:center;gap:6px;text-decoration:none}

.dash-today{padding:6px 0}
.dash-today-row{display:grid;grid-template-columns:88px 1fr auto;align-items:center;gap:14px;padding:12px 18px;border-left:3px solid transparent;cursor:pointer;transition:.15s}
.dash-today-row:hover{background:rgba(168,216,71,0.04)}
.dash-today-row.now{background:linear-gradient(90deg,rgba(168,216,71,0.10),transparent 60%);border-left-color:var(--accent)}
.dash-today-time{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:15px;font-weight:700;color:var(--fg);letter-spacing:-.02em}
.dash-today-dur{font-size:10px;color:var(--fgMute);font-family:'JetBrains Mono',ui-monospace,monospace;margin-top:2px}
.dash-today-title{font-size:13.5px;font-weight:700;color:var(--fg)}
.dash-today-who{font-size:11px;color:var(--fgDim);margin-top:2px}
.dash-today-stat{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:3px 8px;border-radius:4px}
.dash-today-stat.done{background:rgba(94,107,94,0.18);color:var(--fgDim)}
.dash-today-stat.now{background:var(--accent);color:var(--accentInk)}
.dash-today-stat.next{background:rgba(125,211,252,0.10);color:#7DD3FC}

.dash-players{padding:8px 0}
.dash-player{display:grid;grid-template-columns:34px 1fr auto auto;align-items:center;gap:12px;padding:10px 18px}
.dash-pl-av{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#1d2a1d 0%,#2a3a2a 100%);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:11px}
.dash-pl-name{font-size:13px;font-weight:700;color:var(--fg)}
.dash-pl-sub{font-size:10px;color:var(--fgMute);margin-top:1px;display:flex;align-items:center;gap:6px}
.dash-pl-trend{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;font-weight:700}
.dash-pl-trend.up{color:var(--good)}
.dash-pl-trend.dn{color:var(--weak)}
.dash-pl-itn{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:3px 8px;border-radius:4px;background:rgba(168,216,71,0.10);color:var(--accent)}

.dash-matches{padding:8px 0}
.dash-match{display:grid;grid-template-columns:1fr auto;align-items:center;gap:12px;padding:10px 18px}
.dash-match-meta{display:flex;align-items:center;gap:10px}
.dash-match-tag{font-size:9.5px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:3px 7px;border-radius:4px}
.dash-match-tag.official{background:rgba(168,216,71,0.10);color:var(--accent)}
.dash-match-tag.friendly{background:rgba(125,211,252,0.10);color:#7DD3FC}
.dash-match-tag.training{background:rgba(196,166,240,0.10);color:#C4A6F0}
.dash-match-vs{font-size:12.5px;font-weight:600;color:var(--fg)}
.dash-match-score{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;font-weight:700}
.dash-match-score.won{color:var(--good)}
.dash-match-score.lost{color:var(--weak)}

.dash-bot{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:14px;margin-top:14px}
.dash-smart-item{padding:12px 14px;border-bottom:1px solid var(--hairline);display:flex;align-items:flex-start;gap:10px}
.dash-smart-item:last-child{border-bottom:none}
.dash-smart-tag{font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:3px 7px;border-radius:4px;background:var(--accent);color:var(--accentInk);flex-shrink:0;align-self:flex-start}
.dash-smart-text{font-size:12px;color:var(--fg);line-height:1.5;flex:1}
.dash-smart-cta{padding:6px 10px;border:1px solid var(--accentRing);border-radius:8px;background:rgba(168,216,71,0.06);color:var(--accent);font-weight:700;font-size:11px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;gap:4px}

.dash-note{padding:14px 18px;font-size:13px;color:var(--fgDim);line-height:1.6}
.dash-note-saved{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--fgMute);font-weight:700;display:flex;align-items:center;gap:6px}
.dash-note-saved .dot{width:6px;height:6px;border-radius:3px;background:var(--accent)}

.dash-notif{padding:8px 0}
.dash-notif-row{display:grid;grid-template-columns:24px 1fr auto;align-items:flex-start;gap:10px;padding:10px 18px;border-bottom:1px solid var(--hairline)}
.dash-notif-row:last-child{border-bottom:none}
.dash-notif-ic{font-size:16px;margin-top:1px}
.dash-notif-text{font-size:12px;color:var(--fg);line-height:1.5}
.dash-notif-when{font-size:10px;color:var(--fgMute);font-family:'JetBrains Mono',ui-monospace,monospace}
`}</style>
  );
}

export default function CoachDashboardPage() {
  const locale = useLocale();
  const t = useTranslations();
  const fmt = useLocaleFormat();

  const kpiKeys = ["active", "matches", "events", "plan"] as const;
  const kpiSubs = [
    t("dashboard.thisMonth"),
    t("dashboard.winLoss"),
    t("dashboard.newCount"),
    t("dashboard.daysLeft"),
  ];

  return (
    <>
      <Topbar
        title={t("dashboard.title")}
        breadcrumb={[
          { label: t("crumb.workspace"), dim: true },
          { label: t("crumb.today") },
        ]}
        actions={
          <>
            <SearchBar />
            <GhostBtn icon="user-plus">{t("dashboard.newPlayer")}</GhostBtn>
            <GhostBtn icon="trophy">{t("dashboard.logMatch")}</GhostBtn>
            <GhostBtn icon="calendar-event">{t("dashboard.schedule")}</GhostBtn>
            <PrimaryBtn icon="sparkles">{t("dashboard.generatePlan")}</PrimaryBtn>
          </>
        }
      />
      <DashStyles />
      <div className="r-page">
        <div className="dash-grid">
          {DASH.kpis.map((k, i) => (
            <div className="dash-kpi" key={k.k}>
              <div className="dash-kpi-ic" style={{ background: TONE_BG[k.tone], color: TONE_FG[k.tone] }}>
                <Icon name={k.icon} />
              </div>
              <div>
                <div className="dash-kpi-k">{t(`dashboard.kpis.${kpiKeys[i]}`)}</div>
                <div className="dash-kpi-v mono">
                  {fmt.d(k.v)}{" "}
                  <span className="dash-kpi-sub" style={{ color: TONE_FG[k.tone] }}>
                    {kpiSubs[i]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dash-row">
          <div className="dash-card">
            <div className="dash-card-head">
              <div className="dash-card-title">
                {t("dashboard.today")} · {t("dashboard.sessions", { n: fmt.d(DASH.today.length) })}
              </div>
              <div className="dash-card-extra">
                <span style={{ color: "var(--accent)" }}>● WED · MAY 13</span>
              </div>
            </div>
            <div className="dash-today">
              {DASH.today.map((row, i) => (
                <div className={"dash-today-row" + (row.status === "now" ? " now" : "")} key={i}>
                  <div>
                    <div className="dash-today-time">{fmt.d(row.t)}</div>
                    <div className="dash-today-dur">{fmt.d(row.dur)}</div>
                  </div>
                  <div>
                    <div className="dash-today-title">{row.title}</div>
                    <div className="dash-today-who">{row.who}</div>
                  </div>
                  <div className={"dash-today-stat " + row.status}>
                    {row.status === "now"
                      ? t("dashboard.live")
                      : row.status === "done"
                        ? t("dashboard.done")
                        : t("dashboard.upNext")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="dash-card">
              <div className="dash-card-head">
                <div className="dash-card-title">{t("dashboard.topPlayers")}</div>
                <Link href={`/${locale}/coach/players`} className="dash-card-extra">
                  {t("common.viewAll")} <Icon name="arrow-right" />
                </Link>
              </div>
              <div className="dash-players">
                {DASH.topPlayers.map((p) => (
                  <div className="dash-player" key={p.id}>
                    <div className="dash-pl-av">{p.initials}</div>
                    <div>
                      <div className="dash-pl-name">{p.name}</div>
                      <div className="dash-pl-sub">
                        <span>{p.flag}</span>
                        <span>
                          {t(`levels.${p.level}`)} · {p.focus}
                        </span>
                      </div>
                    </div>
                    <div className={"dash-pl-trend " + (p.trend >= 0 ? "up" : "dn")}>
                      {p.trend >= 0 ? "↑" : "↓"} {fmt.d(Math.abs(p.trend).toFixed(1))}
                    </div>
                    <div className="dash-pl-itn">ITN {fmt.d(p.itn)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-card-head">
                <div className="dash-card-title">{t("dashboard.weekMatches")}</div>
                <Link href={`/${locale}/coach/matches`} className="dash-card-extra">
                  {t("common.all")} <Icon name="arrow-right" />
                </Link>
              </div>
              <div className="dash-matches">
                {DASH.recentMatches.map((m, i) => (
                  <div className="dash-match" key={i}>
                    <div>
                      <div className="dash-match-meta">
                        <span className="dash-match-vs">
                          {m.p1} <span style={{ color: "var(--fgMute)" }}>{t("common.vs")}</span> {m.p2}
                        </span>
                      </div>
                      <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 8 }}>
                        <span className={"dash-match-tag " + m.type.toLowerCase()}>{m.type}</span>
                        <span style={{ fontSize: 11, color: "var(--fgMute)" }}>{m.date}</span>
                      </div>
                    </div>
                    <div className={"dash-match-score " + (m.won ? "won" : "lost")}>{fmt.d(m.score)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dash-bot">
          <div className="dash-card">
            <div className="dash-card-head">
              <div className="dash-card-title">{t("dashboard.smartSuggestions")}</div>
              <div className="dash-card-extra">
                <span style={{ background: "var(--accentBg)", padding: "3px 7px", borderRadius: 4 }}>
                  AI · BETA
                </span>
              </div>
            </div>
            <div>
              {DASH.smartSuggestions.map((s, i) => (
                <div className="dash-smart-item" key={i}>
                  <div className="dash-smart-tag">{s.tag}</div>
                  <div className="dash-smart-text">{s.text}</div>
                  <button className="dash-smart-cta">
                    {t("dashboard.planIt")} <Icon name="arrow-right" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="dash-card">
            <div className="dash-card-head">
              <div className="dash-card-title">{t("dashboard.coachNotes")}</div>
              <div className="dash-note-saved">
                <span className="dot" /> {t("common.autoSaved")}
              </div>
            </div>
            <div className="dash-note">{DASH.coachNote}</div>
          </div>

          <div className="dash-card">
            <div className="dash-card-head">
              <div className="dash-card-title">{t("dashboard.notifications")}</div>
              <div className="dash-card-extra">
                <span
                  style={{
                    background: "var(--weak)",
                    color: "#fff",
                    borderRadius: 999,
                    minWidth: 18,
                    height: 18,
                    display: "inline-grid",
                    placeItems: "center",
                    fontSize: 10,
                    padding: "0 5px",
                  }}
                >
                  {fmt.d(5)}
                </span>
              </div>
            </div>
            <div className="dash-notif">
              {DASH.notifications.map((n, i) => (
                <div className="dash-notif-row" key={i}>
                  <Icon
                    name={n.icon}
                    className="dash-notif-ic"
                    style={{ color: TONE_FG[n.tone] }}
                  />
                  <div className="dash-notif-text">{n.text}</div>
                  <div className="dash-notif-when">{n.when}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
