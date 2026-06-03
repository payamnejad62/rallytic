"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { ACAD_NOTIFICATIONS } from "@/lib/academy-extra-data";
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
.an-grid{display:grid;grid-template-columns:230px 1fr;gap:14px;align-items:start}
.an-sidebar{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px}
.an-sidebar-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:8px;padding:0 8px}
.an-tab{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:8px;background:transparent;border:none;color:var(--fgDim);font-family:inherit;font-weight:600;font-size:12.5px;cursor:pointer;width:100%;text-align:start}
.an-tab:hover{background:var(--surface3);color:var(--fg)}
.an-tab.on{background:var(--accentBg);color:var(--accent);font-weight:800}
.an-tab-count{font-size:11px;font-family:'JetBrains Mono',monospace;font-weight:700;background:var(--surface3);color:var(--fgMute);padding:1px 7px;border-radius:6px}
.an-tab.on .an-tab-count{background:var(--accent);color:var(--accentInk)}

.an-list{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.an-list-h{padding:14px 18px;border-bottom:1px solid var(--hairline);display:flex;justify-content:space-between;align-items:center}
.an-list-t{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700;display:flex;align-items:center;gap:10px}
.an-list-t .badge{background:var(--accent);color:var(--accentInk);font-size:9.5px;font-weight:800;letter-spacing:.16em;padding:2px 8px;border-radius:4px}
.an-group{padding:8px 18px;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);font-weight:700;background:rgba(168,216,71,0.04);border-bottom:1px solid var(--hairline)}
.an-row{display:grid;grid-template-columns:32px 1fr auto;gap:14px;padding:14px 18px;border-bottom:1px solid var(--hairline);align-items:flex-start;cursor:pointer}
.an-row:hover{background:rgba(168,216,71,0.04)}
.an-dot{width:8px;height:8px;border-radius:4px;margin-top:6px}
.an-row-title{font-size:13.5px;font-weight:700;color:var(--fg)}
.an-row-body{font-size:12px;color:var(--fgDim);margin-top:3px;line-height:1.5}
.an-row-when{font-size:10px;color:var(--fgMute);font-family:'JetBrains Mono',monospace}
`}</style>
  );
}

export default function AcademyNotificationsPage() {
  const t = useTranslations();
  const fmt = useLocaleFormat();
  const [filter, setFilter] = useState("all");

  return (
    <>
      <Topbar
        title={t("notifs.title")}
        breadcrumb={[{ label: t("crumb.academy") }, { label: t("notifs.title") }]}
        actions={
          <>
            <GhostBtn icon="moon">{t("notifs.snoozeAll")}</GhostBtn>
            <PrimaryBtn icon="checks">{t("notifs.markAllRead")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="an-grid">
          <div className="an-sidebar">
            <div className="an-sidebar-h">{t("notifs.filter")}</div>
            {ACAD_NOTIFICATIONS.filters.map((f) => (
              <button key={f.k} className={"an-tab " + (filter === f.k ? "on" : "")} onClick={() => setFilter(f.k)}>
                <span>{f.label}</span>
                <span className="an-tab-count">{fmt.d(f.count)}</span>
              </button>
            ))}
            <div className="an-sidebar-h" style={{ marginTop: 14 }}>{t("notifs.quickActions")}</div>
            <button className="an-tab" type="button">{t("notifs.markAllRead")}</button>
          </div>

          <div className="an-list">
            <div className="an-list-h">
              <div className="an-list-t">
                <span>{t("notifs.subtitle")}</span>
                <span className="badge">{t("notifs.unread", { n: 3 })}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--fgMute)" }}>{t("notifs.sortNewest")}</div>
            </div>
            {ACAD_NOTIFICATIONS.groups.map((g) => (
              <div key={g.day}>
                <div className="an-group">
                  {g.day === "Today" ? t("common.today") : g.day === "Yesterday" ? t("common.yesterday") : g.day}
                </div>
                {g.items.map((n) => (
                  <div className="an-row" key={n.id}>
                    <span className="an-dot" style={{ background: n.unread ? TONE_FG[n.tone] : "var(--hairline2)" }} />
                    <div>
                      <div className="an-row-title">{n.title} <span className="an-row-when">· {n.when}</span></div>
                      <div className="an-row-body">{n.body}</div>
                    </div>
                    <div style={{ color: "var(--fgMute)" }}>
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
