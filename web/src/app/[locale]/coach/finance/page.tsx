"use client";

import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { FIN } from "@/lib/finance-data";
import { useLocaleFormat } from "@/lib/use-locale-format";

const TONE_BG: Record<string, string> = {
  good: "rgba(168,216,71,0.10)",
  med: "rgba(242,181,68,0.10)",
  weak: "rgba(229,104,93,0.10)",
};
const TONE_FG: Record<string, string> = {
  good: "#A8D847",
  med: "#F2B544",
  weak: "#E5685D",
};

function Styles() {
  return (
    <style>{`
.fin-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.fin-kpi{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:14px}
.fin-kpi-ic{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;font-size:18px;border:1px solid var(--hairline2)}
.fin-kpi-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.fin-kpi-v{font-size:22px;font-weight:800;letter-spacing:-.02em;margin-top:4px}
.fin-kpi-sub{font-size:11px;font-weight:600;margin-left:8px}

.fin-hero{margin-top:14px;background:linear-gradient(135deg,rgba(168,216,71,0.12),rgba(168,216,71,0.02));border:1px solid var(--accentRing);border-radius:14px;padding:20px 24px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}
.fin-hero-tag{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);font-weight:700}
.fin-hero-title{font-size:24px;font-weight:800;letter-spacing:-.02em;margin:8px 0 12px}
.fin-hero-meta{display:flex;gap:24px;font-size:12px;color:var(--fgDim)}
.fin-hero-meta strong{color:var(--fg);font-weight:600;display:block;font-size:13px;margin-top:2px}
.fin-hero-actions{display:flex;flex-direction:column;gap:8px;align-items:flex-end}

.fin-plans{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:20px}
.fin-plans-title{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center}
.fin-plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.fin-plan{background:var(--surface3);border:1px solid var(--hairline2);border-radius:12px;padding:22px 20px;position:relative;display:flex;flex-direction:column;gap:14px}
.fin-plan.current{border-color:var(--accent);background:linear-gradient(180deg,rgba(168,216,71,0.06),transparent);box-shadow:0 0 0 1px rgba(168,216,71,.18)}
.fin-plan-yours{position:absolute;top:-10px;right:14px;background:var(--accent);color:var(--accentInk);font-size:9px;font-weight:800;letter-spacing:.16em;padding:3px 9px;border-radius:4px;text-transform:uppercase}
.fin-plan-name{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgDim);font-weight:700}
.fin-plan-price{font-size:36px;font-weight:800;letter-spacing:-.03em;font-family:'JetBrains Mono',ui-monospace,monospace}
.fin-plan-price small{font-size:12px;color:var(--fgMute);font-weight:600;font-family:inherit;letter-spacing:0;margin-left:6px}
.fin-plan-feats{display:flex;flex-direction:column;gap:8px;flex:1}
.fin-plan-feat{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--fg)}
.fin-plan-feat.off{color:var(--fgMute);text-decoration:line-through}
.fin-plan-feat .ic{width:18px;height:18px;border-radius:9px;display:grid;place-items:center;background:var(--accentBg);color:var(--accent);font-size:12px}
.fin-plan-feat.off .ic{background:rgba(94,107,94,0.18);color:var(--fgMute)}
.fin-plan-cta{padding:10px;border-radius:9px;border:1px solid var(--hairline2);background:var(--surface2);color:var(--fgDim);font-weight:700;font-size:12px;cursor:pointer;font-family:inherit;width:100%;text-align:center}
.fin-plan.current .fin-plan-cta{background:var(--accent);color:var(--accentInk);border-color:transparent}

.fin-bot{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px}
.fin-pay-row{display:grid;grid-template-columns:32px 1fr auto auto auto;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid var(--hairline)}
.fin-pay-row:last-child{border-bottom:none}
.fin-pay-av{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:10px}
.fin-pay-name{font-size:12.5px;font-weight:600}
.fin-pay-amt{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700;font-size:13px;color:var(--accent)}
.fin-pay-date{font-size:11px;color:var(--fgDim)}
`}</style>
  );
}

export default function FinancePage() {
  const t = useTranslations();
  const fmt = useLocaleFormat();
  const kpiKeys = ["currentPlan", "monthlyRev", "pending", "daysToExpiry"] as const;
  const kpiSubs = [t("finance.active"), "↑ 12%", t("finance.followUp"), t("common.renewNow")];

  return (
    <>
      <Topbar
        title={t("finance.title")}
        breadcrumb={[{ label: t("crumb.workspace") }, { label: t("nav.finance") }]}
        actions={
          <>
            <GhostBtn icon="file-export">{t("common.exportReport")}</GhostBtn>
            <GhostBtn icon="receipt">{t("finance.billingSettings")}</GhostBtn>
            <PrimaryBtn icon="refresh">{t("common.renewNow")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="fin-kpis">
          {FIN.kpis.map((k, i) => (
            <div key={k.k} className="fin-kpi">
              <div className="fin-kpi-ic" style={{ background: TONE_BG[k.tone], color: TONE_FG[k.tone] }}>
                <Icon name={k.icon} />
              </div>
              <div>
                <div className="fin-kpi-k">{t(`finance.kpis.${kpiKeys[i]}`)}</div>
                <div className="fin-kpi-v">
                  {fmt.d(k.v)}
                  <span className="fin-kpi-sub" style={{ color: TONE_FG[k.tone] }}>
                    {kpiSubs[i]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fin-hero">
          <div>
            <div className="fin-hero-tag">{t("finance.activeSub")}</div>
            <div className="fin-hero-title">{FIN.subscription.plan}</div>
            <div className="fin-hero-meta">
              <div>
                {t("finance.start")} <strong>{FIN.subscription.start}</strong>
              </div>
              <div>
                {t("finance.expiry")} <strong>{FIN.subscription.expiry}</strong>
              </div>
              <div>
                {t("finance.billing")} <strong>{FIN.subscription.billing}</strong>
              </div>
            </div>
          </div>
          <div className="fin-hero-actions">
            <PrimaryBtn icon="refresh">{t("finance.renewSubscription")}</PrimaryBtn>
            <GhostBtn icon="arrow-up">{t("finance.upgradePlan")}</GhostBtn>
          </div>
        </div>

        <div className="fin-plans">
          <div className="fin-plans-title">
            <span>{t("finance.planManagement")}</span>
            <span style={{ color: "var(--fgMute)" }}>{t("finance.switchAny")}</span>
          </div>
          <div className="fin-plans-grid">
            {FIN.plans.map((p) => (
              <div key={p.k} className={"fin-plan " + (p.current ? "current" : "")}>
                {p.current && <div className="fin-plan-yours">{t("finance.yourPlan")} ✓</div>}
                <div className="fin-plan-name">{p.name}</div>
                <div className="fin-plan-price">
                  {fmt.d(p.price)}
                  <small>{t("finance.perMonth")}</small>
                </div>
                <div className="fin-plan-feats">
                  {p.features.map((f) => (
                    <div key={f.t} className={"fin-plan-feat " + (f.on ? "" : "off")}>
                      <span className="ic">
                        <Icon name={f.on ? "check" : "x"} />
                      </span>
                      {f.t}
                    </div>
                  ))}
                </div>
                <button type="button" className="fin-plan-cta">
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="fin-bot">
          <div className="r-card">
            <div className="r-card-head">
              <div className="r-card-title">{t("finance.paymentHistory")}</div>
              <span className="r-card-extra">{t("common.viewAll")} →</span>
            </div>
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr auto auto auto",
                  padding: "10px 16px",
                  gap: 12,
                  fontSize: 10,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                  color: "var(--fgMute)",
                  fontWeight: 700,
                  borderBottom: "1px solid var(--hairline)",
                }}
              >
                <div />
                <div>{t("finance.tableHead.player")}</div>
                <div>{t("finance.tableHead.amount")}</div>
                <div>{t("finance.tableHead.date")}</div>
                <div>{t("finance.tableHead.status")}</div>
              </div>
              {FIN.payments.map((p) => {
                const tone = p.status === "paid" ? "good" : p.status === "pending" ? "med" : "weak";
                return (
                  <div key={p.player} className="fin-pay-row">
                    <div className="fin-pay-av">{p.initials}</div>
                    <div className="fin-pay-name">{p.player}</div>
                    <div className="fin-pay-amt">{p.amount}</div>
                    <div className="fin-pay-date">{p.date}</div>
                    <span className="r-pill" style={{ background: TONE_BG[tone], color: TONE_FG[tone] }}>
                      {p.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="r-card">
            <div className="r-card-head">
              <div className="r-card-title">{t("finance.invoices")}</div>
              <span className="r-card-extra">{t("finance.exportAll")} →</span>
            </div>
            <div>
              {FIN.invoices.map((p) => (
                <div
                  key={p.player}
                  className="fin-pay-row"
                  style={{ gridTemplateColumns: "32px 1fr auto" }}
                >
                  <div className="fin-pay-av">{p.initials}</div>
                  <div>
                    <div className="fin-pay-name">{p.player}</div>
                    <div className="fin-pay-date">{p.period}</div>
                  </div>
                  <div className="fin-pay-amt">{p.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
