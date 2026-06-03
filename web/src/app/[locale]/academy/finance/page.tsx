"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { TrendLine, Donut } from "@/components/trend-line";
import { ACAD_FINANCE, ACAD_TRENDS, COACHES } from "@/lib/academy-data";
import { ACAD_LEDGER, ACAD_PAYROLL, ACAD_PAYMENTS_RECENT } from "@/lib/academy-extra-data";

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

        {tab === "ledger" && <LedgerView />}
        {tab === "payroll" && <PayrollView />}
        {tab === "revPerCoach" && <RevPerCoachView />}
        {tab === "payments" && <PaymentsView />}
      </div>
    </>
  );
}


const T_TONE_FG: Record<string, string> = {
  paid: "#A8D847",
  pending: "#F2B544",
  overdue: "#E5685D",
  verifying: "#7DD3FC",
};

function SubStyles() {
  return (
    <style>{`
.afs-card{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.afs-card-h{padding:14px 18px;border-bottom:1px solid var(--hairline);display:flex;justify-content:space-between;align-items:center}
.afs-card-t{font-size:13px;font-weight:800}
.afs-card-s{font-size:11.5px;color:var(--fgMute);margin-top:2px}
.afs-row{padding:13px 18px;border-bottom:1px solid var(--hairline);align-items:center;font-size:13px;display:grid;gap:14px}
.afs-row:last-child{border-bottom:none}
.afs-head{padding:12px 18px;font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;background:linear-gradient(180deg,#0c100c,#0a0d0a);border-bottom:1px solid var(--hairline);display:grid;gap:14px;align-items:center}
.afs-money{font-family:'JetBrains Mono',monospace;font-weight:700}
.afs-money.income{color:var(--good)}
.afs-money.expense{color:var(--weak)}
.afs-pill{display:inline-block;padding:3px 10px;border-radius:4px;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.afs-av{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:11px}
.afs-bar{height:6px;background:var(--surface3);border-radius:3px;overflow:hidden}
.afs-bar-fill{height:100%;border-radius:3px;background:var(--accent)}
.afs-totals{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:14px}
.afs-total{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 18px}
.afs-total-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.afs-total-v{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:800;letter-spacing:-.02em;margin-top:4px}
`}</style>
  );
}

function LedgerView() {
  const t = useTranslations();
  const income = ACAD_LEDGER.filter((l) => l.type === "income").reduce((a, b) => a + b.amt, 0);
  const expense = ACAD_LEDGER.filter((l) => l.type === "expense").reduce((a, b) => a + b.amt, 0);
  const net = income - expense;
  return (
    <>
      <SubStyles />
      <div className="afs-totals">
        <div className="afs-total">
          <div className="afs-total-k">{t("ledger.incomeTotal")}</div>
          <div className="afs-total-v" style={{ color: "var(--good)" }}>${income.toLocaleString()}</div>
        </div>
        <div className="afs-total">
          <div className="afs-total-k">{t("ledger.expenseTotal")}</div>
          <div className="afs-total-v" style={{ color: "var(--weak)" }}>${expense.toLocaleString()}</div>
        </div>
        <div className="afs-total">
          <div className="afs-total-k">{t("ledger.netMay")}</div>
          <div className="afs-total-v" style={{ color: "var(--accent)" }}>${net.toLocaleString()}</div>
        </div>
      </div>
      <div className="afs-card">
        <div className="afs-card-h">
          <div>
            <div className="afs-card-t">{t("ledger.title")}</div>
            <div className="afs-card-s">{t("ledger.subtitle")}</div>
          </div>
          <PrimaryBtn icon="plus">{t("ledger.addEntry")}</PrimaryBtn>
        </div>
        <div className="afs-head" style={{ gridTemplateColumns: "70px 100px 1.2fr 2fr 1fr 110px 80px" }}>
          <span>{t("ledger.th.date")}</span>
          <span>{t("ledger.th.type")}</span>
          <span>{t("ledger.th.category")}</span>
          <span>{t("ledger.th.description")}</span>
          <span>{t("ledger.th.method")}</span>
          <span>{t("ledger.th.amount")}</span>
          <span>{t("ledger.th.source")}</span>
        </div>
        {ACAD_LEDGER.map((l) => (
          <div key={l.id} className="afs-row" style={{ gridTemplateColumns: "70px 100px 1.2fr 2fr 1fr 110px 80px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{l.date}</span>
            <span className="afs-pill" style={{ background: l.type === "income" ? "rgba(168,216,71,0.10)" : "rgba(229,104,93,0.10)", color: l.type === "income" ? "#A8D847" : "#E5685D" }}>
              {t(`ledger.${l.type}`)}
            </span>
            <span style={{ fontWeight: 600 }}>{l.cat}</span>
            <span style={{ color: "var(--fgDim)", fontSize: 12 }}>{l.desc}</span>
            <span style={{ fontSize: 12, color: "var(--fgMute)" }}>{l.method}</span>
            <span className={"afs-money " + l.type}>{l.type === "income" ? "+" : "−"}${l.amt.toLocaleString()}</span>
            <span className="afs-pill" style={{ background: "var(--surface3)", color: l.source === "auto" ? "#7DD3FC" : "var(--fgMute)", fontSize: 9 }}>
              {l.source === "auto" ? t("ledger.auto") : t("ledger.manual")}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function PayrollView() {
  const t = useTranslations();
  const total = ACAD_PAYROLL.reduce((a, b) => a + b.payroll, 0);
  return (
    <>
      <SubStyles />
      <div className="afs-card">
        <div className="afs-card-h">
          <div>
            <div className="afs-card-t">{t("payroll.title")}</div>
            <div className="afs-card-s">{t("payroll.total")}: <span style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>${total.toLocaleString()}</span></div>
          </div>
          <PrimaryBtn icon="file-export">{t("payroll.exportPayslips")}</PrimaryBtn>
        </div>
        <div className="afs-head" style={{ gridTemplateColumns: "40px 1.5fr 0.7fr 1fr 1fr 1.4fr 1fr 0.8fr" }}>
          <span></span>
          <span>{t("payroll.th.coach")}</span>
          <span>{t("payroll.th.players")}</span>
          <span>{t("payroll.th.monthlyRev")}</span>
          <span>{t("payroll.th.payroll")}</span>
          <span>{t("payroll.th.model")}</span>
          <span>{t("payroll.th.next")}</span>
          <span>{t("payroll.th.status")}</span>
        </div>
        {ACAD_PAYROLL.map((p) => (
          <div key={p.id} className="afs-row" style={{ gridTemplateColumns: "40px 1.5fr 0.7fr 1fr 1fr 1.4fr 1fr 0.8fr" }}>
            <div className="afs-av">{p.initials}</div>
            <span style={{ fontWeight: 700 }}>{p.name}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.players}</span>
            <span className="afs-money income">${p.monthlyRev.toLocaleString()}</span>
            <span className="afs-money" style={{ color: "var(--fg)" }}>${p.payroll.toLocaleString()}</span>
            <span style={{ fontSize: 11.5, color: "var(--fgDim)" }}>{p.model}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{p.nextPaid}</span>
            <span className="afs-pill" style={{ background: p.status === "on track" ? "rgba(168,216,71,0.10)" : "rgba(242,181,68,0.10)", color: p.status === "on track" ? "#A8D847" : "#F2B544" }}>
              {p.status === "on track" ? t("payroll.onTrack") : t("payroll.review")}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function RevPerCoachView() {
  const t = useTranslations();
  const totalRev = ACAD_PAYROLL.reduce((a, b) => a + b.monthlyRev, 0);
  return (
    <>
      <SubStyles />
      <div className="afs-card">
        <div className="afs-card-h">
          <div>
            <div className="afs-card-t">{t("revPerCoach.title")}</div>
            <div className="afs-card-s">{t("revPerCoach.subtitle")}</div>
          </div>
        </div>
        <div className="afs-head" style={{ gridTemplateColumns: "40px 1.5fr 0.7fr 0.9fr 1fr 1.6fr" }}>
          <span></span>
          <span>{t("revPerCoach.th.coach")}</span>
          <span>{t("revPerCoach.th.players")}</span>
          <span>{t("revPerCoach.th.avgPerPlayer")}</span>
          <span>{t("revPerCoach.th.monthly")}</span>
          <span>{t("revPerCoach.th.share")}</span>
        </div>
        {ACAD_PAYROLL.map((p) => {
          const avg = Math.round(p.monthlyRev / p.players);
          const sharePct = Math.round((p.monthlyRev / totalRev) * 100);
          return (
            <div key={p.id} className="afs-row" style={{ gridTemplateColumns: "40px 1.5fr 0.7fr 0.9fr 1fr 1.6fr" }}>
              <div className="afs-av">{p.initials}</div>
              <span style={{ fontWeight: 700 }}>{p.name}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{p.players}</span>
              <span className="afs-money" style={{ color: "var(--fg)" }}>${avg}</span>
              <span className="afs-money income">${p.monthlyRev.toLocaleString()}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="afs-bar" style={{ flex: 1 }}>
                  <span className="afs-bar-fill" style={{ width: `${sharePct}%`, display: "block" }} />
                </span>
                <span className="afs-money" style={{ color: "var(--accent)", minWidth: 40, textAlign: "right" }}>{sharePct}%</span>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function PaymentsView() {
  const t = useTranslations();
  const paid = ACAD_PAYMENTS_RECENT.filter((p) => p.status === "paid");
  const pending = ACAD_PAYMENTS_RECENT.filter((p) => p.status === "pending");
  const overdue = ACAD_PAYMENTS_RECENT.filter((p) => p.status === "overdue");
  return (
    <>
      <SubStyles />
      <div className="afs-totals" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        <div className="afs-total">
          <div className="afs-total-k">{t("payments.kpis.paid")}</div>
          <div className="afs-total-v" style={{ color: "var(--good)" }}>{paid.length}</div>
        </div>
        <div className="afs-total">
          <div className="afs-total-k">{t("payments.kpis.pending")}</div>
          <div className="afs-total-v" style={{ color: "var(--med)" }}>{pending.length}</div>
        </div>
        <div className="afs-total">
          <div className="afs-total-k">{t("payments.kpis.overdue")}</div>
          <div className="afs-total-v" style={{ color: "var(--weak)" }}>{overdue.length}</div>
        </div>
        <div className="afs-total">
          <div className="afs-total-k">{t("payments.kpis.upcoming")}</div>
          <div className="afs-total-v" style={{ color: "var(--fg)" }}>${(overdue.reduce((a, b) => a + b.amt, 0)).toLocaleString()}</div>
        </div>
      </div>
      <div className="afs-card">
        <div className="afs-card-h">
          <div>
            <div className="afs-card-t">{t("payments.title")}</div>
            <div className="afs-card-s">{t("payments.subtitle")}</div>
          </div>
          <button className="r-btn" style={{ background: "var(--weak)", color: "#fff", padding: "7px 14px", border: "none", fontWeight: 700 }}>
            <Icon name="bell" /> {t("payments.remindOverdue")}
          </button>
        </div>
        <div className="afs-head" style={{ gridTemplateColumns: "1.2fr 1.2fr 0.9fr 0.8fr 0.8fr" }}>
          <span>{t("payments.th.payer")}</span>
          <span>{t("payments.th.player")}</span>
          <span>{t("payments.th.amount")}</span>
          <span>{t("payments.th.date")}</span>
          <span>{t("payments.th.status")}</span>
        </div>
        {ACAD_PAYMENTS_RECENT.map((p) => (
          <div key={p.id} className="afs-row" style={{ gridTemplateColumns: "1.2fr 1.2fr 0.9fr 0.8fr 0.8fr" }}>
            <span style={{ fontWeight: 700 }}>{p.payer}</span>
            <span style={{ color: "var(--fgDim)" }}>{p.player}</span>
            <span className="afs-money income">${p.amt}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{p.date}</span>
            <span className="afs-pill" style={{ background: `${T_TONE_FG[p.status]}1A`, color: T_TONE_FG[p.status] }}>
              {p.status}
              {p.status === "overdue" && p.daysOverdue && ` · ${p.daysOverdue}d`}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
