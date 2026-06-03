"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { TrendLine } from "@/components/trend-line";
import { ACAD_TRENDS, COACHES, ACAD_WEAK_SPOTS } from "@/lib/academy-data";

function Styles() {
  return (
    <style>{`
.an-tabs{display:flex;gap:6px;margin-bottom:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:5px;width:max-content}
.an-tab{padding:8px 18px;border-radius:8px;border:none;background:transparent;color:var(--fgDim);font-family:inherit;font-weight:700;font-size:12px;cursor:pointer}
.an-tab.on{background:var(--accent);color:var(--accentInk)}

.an-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.an-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 20px}
.an-card-h{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px}
.an-card-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;line-height:1.4}
.an-card-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:30px;font-weight:800;color:var(--accent);letter-spacing:-.02em;line-height:1;text-align:right}
.an-card-sub{font-size:11px;color:var(--good);font-weight:700;text-align:right;margin-top:3px}

.an-dist{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.an-bar{display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid var(--hairline)}
.an-bar:last-child{border-bottom:none}
.an-bar-av{width:30px;height:30px;border-radius:10px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:10px}
.an-bar-name{flex:0 0 110px;font-size:12.5px;color:var(--fg);font-weight:600}
.an-bar-track{flex:1;height:10px;background:var(--surface3);border-radius:5px;overflow:hidden}
.an-bar-fill{height:100%;border-radius:5px;background:var(--accent)}
.an-bar-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700;font-size:12px;min-width:42px;text-align:right;color:var(--fg)}
`}</style>
  );
}

const TABS = ["growth", "distribution", "contribution", "weakSpots"] as const;
type TabKey = (typeof TABS)[number];

export default function AcademyAnalyticsPage() {
  const t = useTranslations();
  const [tab, setTab] = useState<TabKey>(TABS[0]);
  const months = ACAD_TRENDS.months;
  const maxPlayers = Math.max(...COACHES.map((c) => c.players));
  const maxScore = Math.max(...COACHES.map((c) => c.score));

  return (
    <>
      <Topbar
        title={t("analytics.title")}
        breadcrumb={[{ label: t("crumb.academy") }, { label: t("nav.analytics") }]}
        actions={
          <>
            <GhostBtn icon="calendar">{t("analytics.last12")}</GhostBtn>
            <GhostBtn icon="file-spreadsheet">{t("common.exportCsv")}</GhostBtn>
            <PrimaryBtn icon="file-report">{t("analytics.annualReport")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="an-tabs">
          {TABS.map((k) => (
            <button key={k} className={"an-tab " + (tab === k ? "on" : "")} onClick={() => setTab(k)}>
              {t(`analytics.tabs.${k}`)}
            </button>
          ))}
        </div>

        {tab === "growth" && (
          <div className="an-grid">
            <div className="an-card">
              <div className="an-card-h">
                <div className="an-card-k">Academy<br />score</div>
                <div>
                  <div className="an-card-v">82</div>
                  <div className="an-card-sub">+8% YoY</div>
                </div>
              </div>
              <TrendLine points={ACAD_TRENDS.academyScore} labels={months} height={150} />
            </div>
            <div className="an-card">
              <div className="an-card-h">
                <div className="an-card-k">Avg ITN<br />gain</div>
                <div>
                  <div className="an-card-v">+0.40</div>
                  <div className="an-card-sub">+33% YoY</div>
                </div>
              </div>
              <TrendLine points={ACAD_TRENDS.avgItnGain} labels={months} height={150} />
            </div>
            <div className="an-card">
              <div className="an-card-h">
                <div className="an-card-k">Retention</div>
                <div>
                  <div className="an-card-v" style={{ color: "#F2B544" }}>88%</div>
                  <div className="an-card-sub">+6 pts YoY</div>
                </div>
              </div>
              <TrendLine points={ACAD_TRENDS.retention} color="#F2B544" labels={months} height={150} />
            </div>
            <div className="an-card">
              <div className="an-card-h">
                <div className="an-card-k">Tournament<br />win</div>
                <div>
                  <div className="an-card-v" style={{ color: "#D8B4FE" }}>66%</div>
                  <div className="an-card-sub">+6 pts YoY</div>
                </div>
              </div>
              <TrendLine points={ACAD_TRENDS.winRate} color="#D8B4FE" labels={months} height={150} />
            </div>
          </div>
        )}

        {tab === "distribution" && (
          <div className="an-card">
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--fgMute)",
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Players per coach
            </div>
            {COACHES.map((c) => (
              <div className="an-bar" key={c.id}>
                <div className="an-bar-av">{c.initials}</div>
                <div className="an-bar-name">{c.name}</div>
                <div className="an-bar-track">
                  <div className="an-bar-fill" style={{ width: `${(c.players / maxPlayers) * 100}%` }} />
                </div>
                <div className="an-bar-v">{c.players}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "contribution" && (
          <div className="an-card">
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--fgMute)",
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Composite coach score
            </div>
            {COACHES.map((c) => (
              <div className="an-bar" key={c.id}>
                <div className="an-bar-av">{c.initials}</div>
                <div className="an-bar-name">{c.name}</div>
                <div className="an-bar-track">
                  <div
                    className="an-bar-fill"
                    style={{
                      width: `${(c.score / maxScore) * 100}%`,
                      background: c.score >= 80 ? "#A8D847" : c.score >= 70 ? "#F2B544" : "#E5685D",
                    }}
                  />
                </div>
                <div className="an-bar-v">{c.score}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "weakSpots" && (
          <div className="an-card">
            <div
              style={{
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "var(--fgMute)",
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Academy-wide weak areas
            </div>
            {ACAD_WEAK_SPOTS.map((w) => (
              <div className="an-bar" key={w.area} style={{ alignItems: "flex-start", paddingBlock: 12 }}>
                <div className="an-bar-name" style={{ flex: 0, minWidth: 200 }}>
                  <div style={{ fontWeight: 700 }}>{w.area}</div>
                  <div style={{ fontSize: 10.5, color: "var(--fgMute)", marginTop: 3 }}>{w.note}</div>
                </div>
                <div className="an-bar-track">
                  <div
                    className="an-bar-fill"
                    style={{
                      width: `${w.pct}%`,
                      background:
                        w.level === "critical" ? "#E5685D" : w.level === "warning" ? "#F2B544" : "#A8D847",
                    }}
                  />
                </div>
                <div
                  className="an-bar-v"
                  style={{
                    color:
                      w.level === "critical" ? "#E5685D" : w.level === "warning" ? "#F2B544" : "#A8D847",
                  }}
                >
                  {w.pct}%
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
