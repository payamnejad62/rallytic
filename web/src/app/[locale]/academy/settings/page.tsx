"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { COACHES, ACADEMY } from "@/lib/academy-data";
import { ACAD_SCORE_WEIGHTS } from "@/lib/academy-extra-data";
import { InviteCoachModal, OffboardCoachModal } from "@/components/invite-offboard-modals";
import { useLocaleFormat } from "@/lib/use-locale-format";

const TABS = ["info", "weights", "coaches", "cycle", "branding", "billing", "data"] as const;
type Tab = (typeof TABS)[number];

function Styles() {
  return (
    <style>{`
.as-grid{display:grid;grid-template-columns:220px 1fr;gap:14px;align-items:start}
.as-side{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px}
.as-side-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:8px;padding:0 8px}
.as-tab{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:transparent;border:none;color:var(--fgDim);font-family:inherit;font-weight:600;font-size:12.5px;cursor:pointer;width:100%;text-align:start;transition:.15s}
.as-tab:hover{background:var(--surface3);color:var(--fg)}
.as-tab.on{background:var(--accentBg);color:var(--accent);font-weight:800}

.as-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:20px 24px}
.as-card+.as-card{margin-top:14px}
.as-card-h{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:800;margin-bottom:14px;display:flex;align-items:center;gap:10px}
.as-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px 18px}
.as-grid2 .full{grid-column:1/-1}
.as-grid2 label{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;display:block;margin-bottom:5px}
.as-grid2 input,.as-grid2 select{width:100%;background:var(--surface3);border:1px solid var(--hairline2);border-radius:9px;padding:11px 13px;color:var(--fg);font-family:inherit;font-size:13px}
.as-grid2 input:focus,.as-grid2 select:focus{border-color:var(--accentRing);outline:none}

.as-wrow{display:grid;grid-template-columns:1fr 1fr;gap:14px 30px}
.as-w{display:grid;grid-template-columns:130px 1fr 50px;gap:10px;align-items:center;padding:6px 0;border-bottom:1px solid var(--hairline)}
.as-w-name{font-size:12px;color:var(--fg);font-weight:600}
.as-w-bar{height:6px;background:var(--surface3);border-radius:3px;overflow:hidden}
.as-w-fill{height:100%;background:var(--accent)}
.as-w-v{font-family:'JetBrains Mono',monospace;font-weight:800;text-align:right;color:var(--accent)}
.as-w-total{margin-top:14px;padding:12px 14px;background:rgba(168,216,71,0.06);border:1px solid var(--accentRing);border-radius:10px;display:flex;justify-content:space-between;font-size:13px;font-weight:700}
.as-w-total .v{font-family:'JetBrains Mono',monospace;color:var(--accent)}

.as-coach-row{display:grid;grid-template-columns:36px 1fr auto auto;gap:14px;padding:12px 0;align-items:center;border-bottom:1px solid var(--hairline)}
.as-coach-row:last-child{border-bottom:none}
.as-coach-av{width:36px;height:36px;border-radius:18px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:12px}
.as-coach-name{font-weight:700;font-size:13.5px}
.as-coach-meta{font-size:11px;color:var(--fgMute);margin-top:2px}
.as-coach-status{font-size:9px;font-weight:800;letter-spacing:.14em;padding:3px 8px;border-radius:4px;text-transform:uppercase}
.as-coach-status.active{background:var(--accentBg);color:var(--accent)}
.as-coach-status.pending{background:rgba(125,211,252,0.10);color:#7DD3FC}
.as-offboard-btn{padding:6px 10px;background:transparent;border:1px solid var(--hairline2);border-radius:8px;color:var(--fgMute);cursor:pointer;font-family:inherit;font-size:12px}
.as-offboard-btn:hover{color:var(--weak);border-color:rgba(229,104,93,0.30)}
`}</style>
  );
}

const PENDING_INVITES = [
  { name: "Hannah Müller", initials: "HM", flag: "🇩🇪", role: "Junior Coach", email: "hannah@example.de" },
];

export default function AcademySettingsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const fmt = useLocaleFormat();
  const [tab, setTab] = useState<Tab>("info");
  const [weights, setWeights] = useState(ACAD_SCORE_WEIGHTS);
  const [showInvite, setShowInvite] = useState(false);
  const [offboard, setOffboard] = useState<{ name: string; players: number } | null>(null);

  const totalWeight = weights.reduce((a, b) => a + b.v, 0);

  function setW(k: string, v: number) {
    setWeights(weights.map((w) => (w.k === k ? { ...w, v: Math.max(0, Math.min(100, v)) } : w)));
  }

  return (
    <>
      <Topbar
        title={t("academySettings.title")}
        breadcrumb={[{ label: t("crumb.academy") }, { label: t("nav.settings") }]}
        actions={
          <>
            <GhostBtn>{t("academySettings.discard")}</GhostBtn>
            <PrimaryBtn icon="device-floppy">{t("academySettings.saveChanges")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="as-grid">
          <div className="as-side">
            <div className="as-side-h">{t("academySettings.configuration")}</div>
            {TABS.map((k) => (
              <button key={k} className={"as-tab " + (tab === k ? "on" : "")} onClick={() => setTab(k)}>
                <Icon
                  name={
                    k === "info" ? "building-bank" :
                    k === "weights" ? "scale" :
                    k === "coaches" ? "school" :
                    k === "cycle" ? "calendar-stats" :
                    k === "branding" ? "palette" :
                    k === "billing" ? "credit-card" :
                    "database"
                  }
                />
                {t(`academySettings.tabs.${k}`)}
              </button>
            ))}
            <div className="as-side-h" style={{ marginTop: 14 }}>Quick links</div>
            <Link href={`/${locale}/coach`} className="as-tab">
              <Icon name="arrow-right" />
              {t("academySettings.data.switchMode")}
            </Link>
          </div>

          <div>
            {tab === "info" && (
              <div className="as-card">
                <div className="as-card-h">
                  <Icon name="building-bank" /> {t("academySettings.info.title")}
                </div>
                <div className="as-grid2">
                  <div>
                    <label>{t("academySettings.info.academyName")}</label>
                    <input defaultValue={ACADEMY.name} />
                  </div>
                  <div>
                    <label>{t("academySettings.info.founded")}</label>
                    <input defaultValue={ACADEMY.founded} />
                  </div>
                  <div>
                    <label>{t("academySettings.info.location")}</label>
                    <input defaultValue={ACADEMY.city} />
                  </div>
                  <div>
                    <label>{t("academySettings.info.courts")}</label>
                    <input defaultValue={8} />
                  </div>
                  <div>
                    <label>{t("academySettings.info.directorName")}</label>
                    <input defaultValue="Klaus Berger" />
                  </div>
                  <div>
                    <label>{t("academySettings.info.directorEmail")}</label>
                    <input defaultValue="klaus@berlin-tennis.de" />
                  </div>
                </div>
              </div>
            )}

            {tab === "weights" && (
              <div className="as-card">
                <div className="as-card-h">
                  <Icon name="scale" /> {t("academySettings.weights.title")}
                </div>
                <p style={{ fontSize: 12.5, color: "var(--fgDim)", marginBottom: 16 }}>
                  {t("academySettings.weights.subtitle")}
                </p>
                <div className="as-wrow">
                  {weights.map((w) => (
                    <div className="as-w" key={w.k}>
                      <span className="as-w-name">{w.label}</span>
                      <div className="as-w-bar">
                        <div className="as-w-fill" style={{ width: `${w.v}%` }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
                        <button
                          type="button"
                          onClick={() => setW(w.k, w.v - 1)}
                          style={{ width: 20, height: 20, borderRadius: 4, background: "var(--surface3)", border: "1px solid var(--hairline2)", color: "var(--fg)", cursor: "pointer", fontSize: 11, fontWeight: 700 }}
                        >
                          −
                        </button>
                        <span className="as-w-v" style={{ minWidth: 32 }}>{fmt.d(w.v)}%</span>
                        <button
                          type="button"
                          onClick={() => setW(w.k, w.v + 1)}
                          style={{ width: 20, height: 20, borderRadius: 4, background: "var(--surface3)", border: "1px solid var(--hairline2)", color: "var(--fg)", cursor: "pointer", fontSize: 11, fontWeight: 700 }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="as-w-total">
                  <span>{t("academySettings.weights.total")}</span>
                  <span className="v" style={{ color: totalWeight === 100 ? "var(--accent)" : "var(--weak)" }}>
                    {fmt.d(totalWeight)}%
                  </span>
                </div>
                <div style={{ marginTop: 12, fontSize: 11.5, color: "var(--fgMute)", lineHeight: 1.5 }}>
                  {t("academySettings.weights.savedAt")}
                </div>
              </div>
            )}

            {tab === "coaches" && (
              <div className="as-card">
                <div className="as-card-h" style={{ justifyContent: "space-between", display: "flex" }}>
                  <span><Icon name="school" /> {t("academySettings.coachesTitle")}</span>
                  <button
                    type="button"
                    onClick={() => setShowInvite(true)}
                    className="r-btn r-btn-soft"
                    style={{ padding: "6px 12px" }}
                  >
                    <Icon name="user-plus" /> {t("coaches.inviteCoach")}
                  </button>
                </div>
                {COACHES.map((c) => (
                  <div key={c.id} className="as-coach-row">
                    <div className="as-coach-av">{c.initials}</div>
                    <div>
                      <div className="as-coach-name">{c.flag} {c.name}</div>
                      <div className="as-coach-meta">
                        {c.role} · {fmt.d(c.players)} players · since {fmt.d(c.since)}
                      </div>
                    </div>
                    <span className="as-coach-status active">{t("academySettings.active")}</span>
                    <button
                      type="button"
                      className="as-offboard-btn"
                      onClick={() => setOffboard({ name: c.name, players: c.players })}
                    >
                      <Icon name="user-off" /> Offboard
                    </button>
                  </div>
                ))}
                {PENDING_INVITES.map((p) => (
                  <div key={p.email} className="as-coach-row" style={{ opacity: 0.7 }}>
                    <div className="as-coach-av">{p.initials}</div>
                    <div>
                      <div className="as-coach-name">{p.flag} {p.name}</div>
                      <div className="as-coach-meta">{p.role} · {p.email}</div>
                    </div>
                    <span className="as-coach-status pending">{t("academySettings.pending")}</span>
                    <button type="button" className="as-offboard-btn">
                      <Icon name="x" /> Revoke
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tab === "cycle" && (
              <div className="as-card">
                <div className="as-card-h">
                  <Icon name="calendar-stats" /> {t("academySettings.cycle.title")}
                </div>
                <div className="as-grid2">
                  <div>
                    <label>{t("academySettings.cycle.frequency")}</label>
                    <select defaultValue="Quarterly">
                      <option>{t("academySettings.cycle.quarterly")}</option>
                      <option>{t("academySettings.cycle.biannual")}</option>
                      <option>{t("academySettings.cycle.annual")}</option>
                    </select>
                  </div>
                  <div>
                    <label>{t("academySettings.cycle.next")}</label>
                    <input defaultValue="May 30, 2026" />
                  </div>
                  <div>
                    <label>{t("academySettings.cycle.reminder")}</label>
                    <input defaultValue="7" placeholder="7 days before" />
                  </div>
                </div>
              </div>
            )}

            {tab === "branding" && (
              <div className="as-card">
                <div className="as-card-h">
                  <Icon name="palette" /> {t("academySettings.branding.title")}
                </div>
                <div className="as-grid2">
                  <div className="full">
                    <label>{t("academySettings.branding.logo")}</label>
                    <div style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, background: "var(--surface3)", border: "1px dashed var(--hairline2)", borderRadius: 10 }}>
                      <div style={{ width: 50, height: 50, borderRadius: 12, background: "var(--accent)", color: "var(--accentInk)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 20 }}>
                        BTA
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>Logo uploaded</div>
                        <div style={{ fontSize: 11, color: "var(--fgMute)", marginTop: 2 }}>SVG · 240×240 · transparent</div>
                      </div>
                      <GhostBtn icon="upload">Replace</GhostBtn>
                    </div>
                  </div>
                  <div>
                    <label>{t("academySettings.branding.primary")}</label>
                    <input defaultValue="#A8D847" />
                  </div>
                  <div>
                    <label>{t("academySettings.branding.secondary")}</label>
                    <input defaultValue="#7DD3FC" />
                  </div>
                </div>
              </div>
            )}

            {tab === "billing" && (
              <div className="as-card">
                <div className="as-card-h">
                  <Icon name="credit-card" /> {t("nav.settings")} · {t("billing.title")}
                </div>
                <p style={{ fontSize: 13, color: "var(--fgDim)", marginBottom: 14 }}>
                  Manage your Rallytic plan, per-seat billing, and payment method.
                </p>
                <Link href={`/${locale}/academy/billing`}>
                  <PrimaryBtn icon="arrow-right">{t("billing.title")}</PrimaryBtn>
                </Link>
              </div>
            )}

            {tab === "data" && (
              <div className="as-card">
                <div className="as-card-h">
                  <Icon name="database" /> {t("academySettings.data.title")}
                </div>
                <div className="as-coach-row" style={{ borderBottom: "none" }}>
                  <div className="as-coach-av" style={{ background: "var(--accentBg)" }}>
                    <Icon name="file-export" />
                  </div>
                  <div>
                    <div className="as-coach-name">{t("academySettings.data.exportAll")}</div>
                    <div className="as-coach-meta">{t("academySettings.data.exportDesc")}</div>
                  </div>
                  <GhostBtn icon="download">JSON</GhostBtn>
                  <GhostBtn icon="download">CSV</GhostBtn>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showInvite && <InviteCoachModal onClose={() => setShowInvite(false)} currentCoaches={COACHES.length} />}
      {offboard && <OffboardCoachModal name={offboard.name} players={offboard.players} onClose={() => setOffboard(null)} />}
    </>
  );
}
