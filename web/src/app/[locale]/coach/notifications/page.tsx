"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { COACH_NOTIFICATIONS } from "@/lib/coach-extra-data";
import { useLocaleFormat } from "@/lib/use-locale-format";

const TONE_FG: Record<string, string> = {
  good: "#A8D847",
  med: "#F2B544",
  weak: "#E5685D",
  info: "#7DD3FC",
};

function Styles() {
  return (
    <style>{`
.ni-grid{display:grid;grid-template-columns:230px 1fr;gap:14px;align-items:start}
.ni-sidebar{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px}
.ni-sidebar-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:8px;padding:0 8px}
.ni-tab{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:8px;background:transparent;border:none;color:var(--fgDim);font-family:inherit;font-weight:600;font-size:12.5px;cursor:pointer;width:100%;text-align:start;transition:.15s}
.ni-tab:hover{background:var(--surface3);color:var(--fg)}
.ni-tab.on{background:var(--accentBg);color:var(--accent);font-weight:800}
.ni-tab-count{font-size:11px;font-family:'JetBrains Mono',monospace;font-weight:700;background:var(--surface3);color:var(--fgMute);padding:1px 7px;border-radius:6px}
.ni-tab.on .ni-tab-count{background:var(--accent);color:var(--accentInk)}

.ni-section-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin:14px 8px 6px}

.ni-list{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.ni-list-h{padding:14px 18px;border-bottom:1px solid var(--hairline);display:flex;justify-content:space-between;align-items:center}
.ni-list-t{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700;display:flex;align-items:center;gap:10px}
.ni-list-t .badge{background:var(--accent);color:var(--accentInk);font-size:9.5px;font-weight:800;letter-spacing:.16em;padding:2px 8px;border-radius:4px}
.ni-list-sort{font-size:11px;color:var(--fgMute)}

.ni-group{padding:8px 18px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);font-weight:700;background:rgba(168,216,71,0.04);border-bottom:1px solid var(--hairline)}
.ni-row{display:grid;grid-template-columns:32px 1fr auto;gap:14px;padding:14px 18px;border-bottom:1px solid var(--hairline);align-items:flex-start;cursor:pointer;transition:.15s}
.ni-row:hover{background:rgba(168,216,71,0.04)}
.ni-dot{width:8px;height:8px;border-radius:4px;margin-top:6px}
.ni-row-title{font-size:13.5px;font-weight:700;color:var(--fg)}
.ni-row-body{font-size:12px;color:var(--fgDim);margin-top:3px;line-height:1.5}
.ni-row-when{font-size:10px;color:var(--fgMute);font-family:'JetBrains Mono',monospace;margin-left:8px}
.ni-row-cta{display:inline-block;padding:5px 10px;border:1px solid var(--accentRing);background:rgba(168,216,71,0.06);color:var(--accent);border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;font-family:inherit;margin-top:8px}
.ni-row-right{display:flex;align-items:center;gap:8px;color:var(--fgMute)}
`}</style>
  );
}

export default function CoachNotificationsPage() {
  const t = useTranslations();
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Topbar
        title={t("notifs.title")}
        breadcrumb={[{ label: t("crumb.workspace") }, { label: "Inbox" }]}
        actions={
          <>
            <GhostBtn icon="filter">{t("common.filters")}</GhostBtn>
            <GhostBtn icon="moon">{t("notifs.snoozeAll")}</GhostBtn>
            <PrimaryBtn icon="checks">{t("notifs.markAllRead")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="ni-grid">
          <div className="ni-sidebar">
            <div className="ni-sidebar-h">{t("notifs.filter")}</div>
            {COACH_NOTIFICATIONS.filters.map((f) => (
              <button key={f.k} className={"ni-tab " + (filter === f.k ? "on" : "")} onClick={() => setFilter(f.k)}>
                <span>{f.label}</span>
                <span className="ni-tab-count">{f.count}</span>
              </button>
            ))}
            <div className="ni-section-h">{t("notifs.quickActions")}</div>
            <button className="ni-tab" type="button">
              <span>{t("notifs.markAllRead")}</span>
            </button>
            <button className="ni-tab" type="button">
              <span>{t("notifs.archiveRead")}</span>
            </button>
          </div>

          <div className="ni-list">
            <div className="ni-list-h">
              <div className="ni-list-t">
                <span>{t("notifs.subtitle")}</span>
                <span className="badge">{t("notifs.unread", { n: 3 })}</span>
              </div>
              <div className="ni-list-sort">{t("notifs.sortNewest")}</div>
            </div>

            {COACH_NOTIFICATIONS.groups.map((g) => (
              <div key={g.day}>
                <div className="ni-group">
                  {g.day === "Today" ? t("common.today") : g.day === "Yesterday" ? t("common.yesterday") : g.day} · {g.count}
                </div>
                {g.items.map((n) => (
                  <div className="ni-row" key={n.id}>
                    <span className="ni-dot" style={{ background: n.unread ? TONE_FG[n.tone] : "var(--hairline2)" }} />
                    <div>
                      <div className="ni-row-title">
                        {n.title}{" "}
                        <span className="ni-row-when">· {n.when}</span>
                      </div>
                      <div className="ni-row-body">{n.body}</div>
                      {n.cta && (
                        <button className="ni-row-cta" type="button">
                          {n.cta === "View plan" ? t("notifs.viewPlan") :
                           n.cta === "View invoice" ? t("notifs.viewInvoice") :
                           n.cta === "Open form" ? t("notifs.openForm") :
                           n.cta === "Reply" ? t("notifs.reply") :
                           n.cta === "Renew now" ? t("notifs.renewNow") :
                           n.cta === "Open match" ? t("notifs.openMatch") : n.cta}
                        </button>
                      )}
                    </div>
                    <div className="ni-row-right">
                      <Icon name="dots-vertical" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
