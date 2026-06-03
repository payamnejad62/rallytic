"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { TrendLine, Donut } from "@/components/trend-line";
import { ACAD_FINANCE, ACAD_TRENDS } from "@/lib/academy-data";

const TABS = ["overview", "revPerCoach", "ledger", "payroll", "payments"] as const;
type AFTab = (typeof TABS)[number];

function Styles() {
  return (
    <style>{`
.af-tabs{display:flex;gap:6px;margin-bottom:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:5px;width:max-content}
.af-tab{padding:8px 18px;border-radius:8px;border:none;background:transparent;color:var(--fgDim);font-family:inherit;font-weight:700;font-size:12px;cursor:pointer}
.af-tab.on{background:var(--accent);color:var(--accentInk)}

.af-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.af-kpi{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:14px}
.af-kpi-ic{width:40px;height:40px;border-radius:10px;background:rgba(168,216,71,0.10);color:var(--accent);display:grid;place-items:center;font-size:18px;border:1px solid var(--hairline2)}
.af-kpi-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.af-kpi-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:22px;font-weight:800;letter-spacing:-.02em;margin-top:4px}
.af-kpi-sub{font-size:11px;font-weight:700;margin-left:6px;color:var(--good)}

.af-chart{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 22px}
.af-chart-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.af-chart-t{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700}
.af-legend{display:flex;gap:14px;font-size:11px;color:var(--fgDim)}
.af-legend-dot{display:inline-block;width:10px;height:10px;border-radius:5px;margin-right:5px;vertical-align:middle}

.af-split{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px}
.af-side{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 22px}
.af-side-h{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700;margin-bottom:14px}
.af-donut-wrap{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:center}
.af-leg{flex:1}
.af-leg-row{display:grid;grid-template-columns:14px 1fr auto auto;align-items:center;gap:10px;padding:5px 0;font-size:12px}
.af-leg-dot{width:10px;height:10px;border-radius:5px}
.af-leg-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700}
.af-leg-pct{font-family:'JetBrains Mono',ui-monospace,monospace;color:var(--fgMute);font-size:11px}

.af-sub{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 22px;display:grid;grid-template-columns:auto 1fr auto auto auto;gap:20px;align-items:center}
.af-sub-tile{width:42px;height:42px;border-radius:10px;background:var(--accent);color:var(--accentInk);display:grid;place-items:center;font-weight:900;font-size:18px}
.af-sub-name{font-size:14px;font-weight:800;letter-spacing:-.01em}
.af-sub-tag{font-size:11px;color:var(--fgMute);margin-top:2px}
.af-sub-col{display:flex;flex-direction:column;gap:2px}
.af-sub-k{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.af-sub-v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:15px;font-weight:700}
.af-sub-tag-side{font-size:11px;color:var(--fgMute);text-align:right}
`}</style>
  );
}

export default function AcademyFinancePage() {
  const t = useTranslations();
  const [tab, setTab] = useState<AFTab>(TABS[0]);

  return (
    <>
      <Topbar
        title={t("afinance.title")}
        breadcrumb={[{ label: t("crumb.academy") }, { label: t("nav.academyFinance") }]}
        actions={
          <>
            <GhostBtn icon="calendar">May 2026</GhostBtn>
            <GhostBtn icon="file-export">{t("common.export")}</GhostBtn>
            <PrimaryBtn icon="file-report">{t("afinance.pnlReport")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="af-tabs">
          {TABS.map((k) => (
            <button key={k} className={"af-tab " + (tab === k ? "on" : "")} onClick={() => setTab(k)}>
              {t(`afinance.tabs.${k}`)}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div className="af-kpis">
              <div className="af-kpi">
                <div className="af-kpi-ic"><Icon name="cash" /></div>
                <div>
                  <div className="af-kpi-k">MRR</div>
                  <div className="af-kpi-v">${ACAD_FINANCE.mrr.toLocaleString()}<span className="af-kpi-sub">+8% MoM</span></div>
                </div>
              </div>
              <div className="af-kpi">
                <div className="af-kpi-ic"><Icon name="receipt-tax" /></div>
                <div>
                  <div className="af-kpi-k">YTD revenue</div>
                  <div className="af-kpi-v">${ACAD_FINANCE.yearRevenue.toLocaleString()}<span className="af-kpi-sub">+14% YoY</span></div>
                </div>
              </div>
              <div className="af-kpi">
                <div className="af-kpi-ic"><Icon name="trending-up" /></div>
                <div>
                  <div className="af-kpi-k">Net profit</div>
                  <div className="af-kpi-v">${ACAD_FINANCE.netProfit.toLocaleString()}<span className="af-kpi-sub">{ACAD_FINANCE.margin}% margin</span></div>
                </div>
              </div>
              <div className="af-kpi">
                <div className="af-kpi-ic" style={{ background: "rgba(229,104,93,0.10)", color: "#E5685D" }}>
                  <Icon name="trending-down" />
                </div>
                <div>
                  <div className="af-kpi-k">Costs YTD</div>
                  <div className="af-kpi-v">${ACAD_FINANCE.yearCost.toLocaleString()}<span className="af-kpi-sub" style={{ color: "#E5685D" }}>69% of revenue</span></div>
                </div>
              </div>
            </div>

            <div className="af-chart">
              <div className="af-chart-h">
                <div className="af-chart-t">Revenue &amp; profit · last 12 months</div>
                <div className="af-legend">
                  <span><span className="af-legend-dot" style={{ background: "#A8D847" }} /> Revenue</span>
                  <span><span className="af-legend-dot" style={{ background: "#F2B544" }} /> Profit</span>
                </div>
              </div>
              <div style={{ position: "relative", height: 220 }}>
                <div style={{ position: "absolute", inset: 0 }}>
                  <TrendLine
                    points={ACAD_FINANCE.trendRevenue}
                    color="#A8D847"
                    labels={ACAD_TRENDS.months}
                    height={220}
                    yMax={42}
                    yMin={0}
                  />
                </div>
                <div style={{ position: "absolute", inset: 0 }}>
                  <TrendLine
                    points={ACAD_FINANCE.trendProfit}
                    color="#F2B544"
                    height={220}
                    yMax={42}
                    yMin={0}
                    fill={false}
                  />
                </div>
              </div>
            </div>

            <div className="af-split">
              <div className="af-side">
                <div className="af-side-h">Revenue sources · YTD</div>
                <div className="af-donut-wrap">
                  <Donut
                    segments={ACAD_FINANCE.sources.map((s) => ({ v: s.v, color: s.color }))}
                    centerLabel="$412K"
                    centerSub="Revenue"
                  />
                  <div className="af-leg">
                    {ACAD_FINANCE.sources.map((s) => (
                      <div className="af-leg-row" key={s.k}>
                        <span className="af-leg-dot" style={{ background: s.color }} />
                        <span>{s.k}</span>
                        <span className="af-leg-v">${(s.v / 1000).toFixed(0)},000</span>
                        <span className="af-leg-pct">{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="af-side">
                <div className="af-side-h">Cost breakdown · YTD</div>
                <div className="af-donut-wrap">
                  <Donut
                    segments={ACAD_FINANCE.costs.map((s) => ({ v: s.v, color: s.color }))}
                    centerLabel="$286K"
                    centerSub="Costs"
                  />
                  <div className="af-leg">
                    {ACAD_FINANCE.costs.map((s) => (
                      <div className="af-leg-row" key={s.k}>
                        <span className="af-leg-dot" style={{ background: s.color }} />
                        <span>{s.k}</span>
                        <span className="af-leg-v">${(s.v / 1000).toFixed(0)},000</span>
                        <span className="af-leg-pct">{s.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="af-sub">
              <div className="af-sub-tile">R</div>
              <div>
                <div className="af-sub-name">Rallytic subscription · Academy Elite</div>
                <div className="af-sub-tag">Unlimited coaches · full analytics</div>
              </div>
              <div className="af-sub-col">
                <span className="af-sub-k">Billing</span>
                <span className="af-sub-v">$39 / coach / mo</span>
                <span style={{ fontSize: 10, color: "var(--fgMute)" }}>6 coaches · $234/mo</span>
              </div>
              <div className="af-sub-col">
                <span className="af-sub-k">Annual cost</span>
                <span className="af-sub-v">$2,808</span>
                <span style={{ fontSize: 10, color: "var(--fgMute)" }}>0.7% of revenue</span>
              </div>
              <div className="af-sub-tag-side">
                <div style={{ fontSize: 10, color: "var(--fgMute)", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>
                  What the academy pays Rallytic
                </div>
                <div className="af-sub-v">Renews Jan 1, 2027</div>
                <button className="r-btn r-btn-soft" style={{ marginTop: 6 }}>
                  Manage plan
                </button>
              </div>
            </div>
          </>
        )}

        {tab !== "overview" && (
          <div
            className="r-card"
            style={{ padding: "40px 24px", textAlign: "center", color: "var(--fgDim)" }}
          >
            <Icon name="report-money" style={{ fontSize: 32, color: "var(--accent)" }} />
            <div style={{ marginTop: 10, fontWeight: 700, color: "var(--fg)", fontSize: 16 }}>
              {t(`afinance.tabs.${tab}`)}
            </div>
            <div style={{ marginTop: 4, fontSize: 13 }}>
              {t("afinance.soonNote", { tab: t(`afinance.tabs.${tab}`).toLowerCase() })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
