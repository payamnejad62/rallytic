"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { LangSwitcher } from "@/components/lang-switcher";

const TABS = ["account", "password", "notifications", "theme", "language", "support"] as const;
type Tab = (typeof TABS)[number];

function Styles() {
  return (
    <style>{`
.set-grid{display:grid;grid-template-columns:220px 1fr;gap:14px;align-items:start}
.set-sidebar{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px}
.set-sidebar-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:8px;padding:0 8px}
.set-tab{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:8px;background:transparent;border:none;color:var(--fgDim);font-family:inherit;font-weight:600;font-size:13px;cursor:pointer;width:100%;text-align:start;transition:.15s}
.set-tab:hover{color:var(--fg);background:var(--surface3)}
.set-tab.on{background:var(--accentBg);color:var(--accent);font-weight:800}

.set-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:20px 22px}
.set-card+.set-card{margin-top:14px}
.set-card-h{display:flex;align-items:center;gap:10px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:14px}

.set-photo{display:flex;align-items:center;gap:18px;margin-bottom:18px}
.set-photo-av{width:80px;height:80px;border-radius:40px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:2px solid var(--accent);display:grid;place-items:center;color:var(--accent);font-weight:900;font-size:26px}
.set-photo-name{font-size:18px;font-weight:800;letter-spacing:-.01em}
.set-photo-email{font-size:12px;color:var(--fgMute);margin-top:3px}
.set-photo-btns{display:flex;gap:8px;margin-top:8px}

.set-fg{display:grid;grid-template-columns:1fr 1fr;gap:12px 18px;margin-bottom:18px}
.set-fg .full{grid-column:1/-1}
.set-fg label{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;display:block;margin-bottom:5px}
.set-fg input,.set-fg select{width:100%;background:var(--surface3);border:1px solid var(--hairline2);border-radius:9px;padding:10px 12px;color:var(--fg);font-family:inherit;font-size:13px}
.set-fg input:focus,.set-fg select:focus{border-color:var(--accentRing);outline:none}

.set-save{display:flex;justify-content:flex-end}

.set-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--hairline)}
.set-row:last-child{border-bottom:none}
.set-row-info{flex:1}
.set-row-title{font-size:13px;font-weight:700}
.set-row-body{font-size:11.5px;color:var(--fgMute);margin-top:2px}

.set-danger{border-color:rgba(229,104,93,0.30);background:linear-gradient(180deg,rgba(229,104,93,0.04),transparent)}
.set-danger .set-card-h{color:var(--weak)}
.set-danger-btn{padding:8px 16px;background:transparent;border:1px solid var(--weak);color:var(--weak);border-radius:9px;font-weight:700;font-size:12px;cursor:pointer;font-family:inherit}
.set-danger-btn:hover{background:var(--weak);color:#fff}

.set-toggle{width:42px;height:24px;background:var(--surface3);border:1px solid var(--hairline2);border-radius:12px;position:relative;cursor:pointer;transition:.15s}
.set-toggle::after{content:'';position:absolute;top:2px;left:3px;width:18px;height:18px;border-radius:9px;background:var(--fgMute);transition:.15s}
.set-toggle.on{background:var(--accent);border-color:var(--accent)}
.set-toggle.on::after{left:auto;right:3px;background:var(--accentInk)}

.set-swatch-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-top:6px}
.set-swatch{aspect-ratio:1;border-radius:10px;border:2px solid transparent;cursor:pointer}
.set-swatch.on{border-color:var(--accent);box-shadow:0 0 0 2px rgba(168,216,71,0.30)}

.set-2fa{margin-top:14px;padding:14px 16px;background:var(--surface3);border:1px solid var(--accentRing);border-radius:10px;display:flex;justify-content:space-between;align-items:center}
.set-2fa-info{flex:1}
.set-2fa-title{font-size:13px;font-weight:700;color:var(--accent)}
.set-2fa-body{font-size:11.5px;color:var(--fgDim);margin-top:3px}
`}</style>
  );
}

export default function CoachSettingsPage() {
  const t = useTranslations();
  const [tab, setTab] = useState<Tab>("account");
  const [notifs, setNotifs] = useState({
    emailMatches: true,
    emailTests: true,
    emailFinance: true,
    emailSystem: true,
    pushMatches: true,
    pushTests: true,
    pushFinance: false,
    pushSystem: true,
  });

  return (
    <>
      <Topbar
        title={t("settings.title")}
        breadcrumb={[{ label: "Coach" }, { label: "Payam Nejad" }, { label: t("settings.title") }]}
        actions={
          <>
            <GhostBtn>{t("settings.cancel")}</GhostBtn>
            <PrimaryBtn icon="device-floppy">{t("settings.save")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="set-grid">
          <div className="set-sidebar">
            <div className="set-sidebar-h">{t("settings.title")}</div>
            {TABS.map((k) => (
              <button key={k} className={"set-tab " + (tab === k ? "on" : "")} onClick={() => setTab(k)}>
                <Icon name={
                  k === "account" ? "user" :
                  k === "password" ? "lock" :
                  k === "notifications" ? "bell" :
                  k === "theme" ? "palette" :
                  k === "language" ? "language" :
                  "help-circle"
                } />
                {t(`settings.tabs.${k}`)}
              </button>
            ))}
          </div>

          <div>
            {tab === "account" && (
              <>
                <div className="set-card">
                  <div className="set-card-h">
                    <Icon name="user" /> {t("settings.accountInfo")}
                  </div>
                  <div className="set-photo">
                    <div className="set-photo-av">PN</div>
                    <div>
                      <div className="set-photo-name">Payam Abdollah Nejad</div>
                      <div className="set-photo-email">payam@rallytic.com</div>
                      <div className="set-photo-btns">
                        <GhostBtn icon="upload">{t("settings.uploadPhoto")}</GhostBtn>
                        <GhostBtn icon="trash">{t("settings.removePhoto")}</GhostBtn>
                      </div>
                    </div>
                  </div>

                  <div className="set-fg">
                    <div>
                      <label>{t("settings.firstName")}</label>
                      <input type="text" defaultValue="Payam" />
                    </div>
                    <div>
                      <label>{t("settings.lastName")}</label>
                      <input type="text" defaultValue="Abdollah Nejad" />
                    </div>
                    <div className="full">
                      <label>{t("settings.email")}</label>
                      <input type="email" defaultValue="payam@rallytic.com" />
                    </div>
                    <div>
                      <label>{t("settings.phone")}</label>
                      <input type="tel" defaultValue="+98 912 ..." />
                    </div>
                    <div>
                      <label>{t("settings.role")}</label>
                      <input type="text" defaultValue="Head Coach" />
                    </div>
                  </div>
                  <div className="set-save">
                    <PrimaryBtn icon="device-floppy">{t("settings.saveChanges")}</PrimaryBtn>
                  </div>
                </div>

                <div className="set-card">
                  <div className="set-card-h">
                    <Icon name="device-laptop" /> {t("settings.session")}
                  </div>
                  <div className="set-row">
                    <div className="set-row-info">
                      <div className="set-row-title">{t("settings.signedOnDevices", { n: 3 })}</div>
                      <div className="set-row-body">MacBook Pro · Berlin · 2 min ago</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <GhostBtn>{t("settings.logOut")}</GhostBtn>
                      <button className="set-danger-btn">{t("settings.logOutAll")}</button>
                    </div>
                  </div>
                </div>

                <div className="set-card set-danger">
                  <div className="set-card-h">
                    <Icon name="alert-triangle" /> {t("settings.dangerZone")}
                  </div>
                  <div className="set-row">
                    <div className="set-row-info">
                      <div className="set-row-title">{t("settings.deleteAccount")}</div>
                      <div className="set-row-body">{t("settings.deleteAccountDesc")}</div>
                    </div>
                    <button className="set-danger-btn">{t("settings.deleteAccountBtn")}</button>
                  </div>
                  <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(168,216,71,0.06)", border: "1px solid var(--accentRing)", borderRadius: 10, fontSize: 12, color: "var(--fgDim)" }}>
                    {t("settings.prefersKeep")}{" "}
                    <span style={{ color: "var(--accent)", fontWeight: 700 }}>{t("settings.cancelSubscription")}</span>{" "}
                    {t("settings.instead")}
                  </div>
                </div>
              </>
            )}

            {tab === "password" && (
              <>
                <div className="set-card">
                  <div className="set-card-h">
                    <Icon name="lock" /> {t("settings.tabs.password")}
                  </div>
                  <div className="set-fg">
                    <div className="full">
                      <label>{t("settings.password.current")}</label>
                      <input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label>{t("settings.password.new")}</label>
                      <input type="password" placeholder="At least 8 characters" />
                    </div>
                    <div>
                      <label>{t("settings.password.confirm")}</label>
                      <input type="password" placeholder="Repeat password" />
                    </div>
                  </div>
                  <div className="set-save">
                    <PrimaryBtn icon="device-floppy">{t("settings.saveChanges")}</PrimaryBtn>
                  </div>

                  <div className="set-2fa">
                    <div className="set-2fa-info">
                      <div className="set-2fa-title">{t("settings.password.twoFactor")}</div>
                      <div className="set-2fa-body">{t("settings.password.twoFactorDesc")}</div>
                    </div>
                    <GhostBtn icon="shield">{t("settings.password.enable")}</GhostBtn>
                  </div>
                </div>
              </>
            )}

            {tab === "notifications" && (
              <>
                <div className="set-card">
                  <div className="set-card-h">
                    <Icon name="mail" /> {t("settings.notif.channels")} · {t("settings.notif.email")}
                  </div>
                  {(["matches", "tests", "finance", "system"] as const).map((k) => (
                    <div className="set-row" key={k}>
                      <div className="set-row-info">
                        <div className="set-row-title">{t(`settings.notif.${k}`)}</div>
                      </div>
                      <div
                        className={"set-toggle" + ((notifs as any)[`email${k[0].toUpperCase() + k.slice(1)}`] ? " on" : "")}
                        onClick={() =>
                          setNotifs({ ...notifs, [`email${k[0].toUpperCase() + k.slice(1)}`]: !(notifs as any)[`email${k[0].toUpperCase() + k.slice(1)}`] } as any)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="set-card">
                  <div className="set-card-h">
                    <Icon name="device-mobile" /> {t("settings.notif.channels")} · {t("settings.notif.push")}
                  </div>
                  {(["matches", "tests", "finance", "system"] as const).map((k) => (
                    <div className="set-row" key={k}>
                      <div className="set-row-info">
                        <div className="set-row-title">{t(`settings.notif.${k}`)}</div>
                      </div>
                      <div
                        className={"set-toggle" + ((notifs as any)[`push${k[0].toUpperCase() + k.slice(1)}`] ? " on" : "")}
                        onClick={() =>
                          setNotifs({ ...notifs, [`push${k[0].toUpperCase() + k.slice(1)}`]: !(notifs as any)[`push${k[0].toUpperCase() + k.slice(1)}`] } as any)
                        }
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === "theme" && (
              <div className="set-card">
                <div className="set-card-h">
                  <Icon name="palette" /> {t("settings.tabs.theme")}
                </div>
                <div className="set-fg">
                  <div className="full">
                    <label>{t("settings.theme.scheme")}</label>
                    <div style={{ display: "flex", gap: 10 }}>
                      {["Court Dark", "Hard Court", "Clay"].map((s, i) => (
                        <button
                          key={s}
                          type="button"
                          style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: i === 0 ? "2px solid var(--accent)" : "1px solid var(--hairline2)",
                            background: i === 0 ? "var(--accentBg)" : "var(--surface3)",
                            color: i === 0 ? "var(--accent)" : "var(--fgDim)",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: 12,
                            fontFamily: "inherit",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="full">
                    <label>{t("settings.theme.accent")}</label>
                    <div className="set-swatch-grid">
                      {["#A8D847", "#7DD3FC", "#F2B544", "#E5685D", "#C4A6F0", "#FFD700"].map((c, i) => (
                        <div key={c} className={"set-swatch" + (i === 0 ? " on" : "")} style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                  <div className="full">
                    <label>{t("settings.theme.density")}</label>
                    <div style={{ display: "flex", gap: 10 }}>
                      {["Compact", "Comfortable", "Spacious"].map((d, i) => (
                        <button
                          key={d}
                          type="button"
                          style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: i === 1 ? "2px solid var(--accent)" : "1px solid var(--hairline2)",
                            background: i === 1 ? "var(--accentBg)" : "var(--surface3)",
                            color: i === 1 ? "var(--accent)" : "var(--fgDim)",
                            cursor: "pointer",
                            fontWeight: 700,
                            fontSize: 12,
                            fontFamily: "inherit",
                          }}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "language" && (
              <div className="set-card">
                <div className="set-card-h">
                  <Icon name="language" /> {t("settings.lang.interface")}
                </div>
                <div style={{ marginBottom: 18 }}>
                  <LangSwitcher />
                </div>
                <div className="set-fg">
                  <div>
                    <label>{t("settings.lang.dateFormat")}</label>
                    <select>
                      <option>YYYY-MM-DD</option>
                      <option>DD / MM / YYYY</option>
                      <option>MM / DD / YYYY</option>
                    </select>
                  </div>
                  <div>
                    <label>{t("settings.lang.numberFormat")}</label>
                    <select>
                      <option>1,000.00</option>
                      <option>1.000,00</option>
                      <option>1 000.00</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {tab === "support" && (
              <>
                <div className="set-card">
                  <div className="set-card-h">
                    <Icon name="help-circle" /> {t("settings.tabs.support")}
                  </div>
                  <div className="set-row">
                    <div className="set-row-info">
                      <div className="set-row-title">{t("settings.support.help")}</div>
                      <div className="set-row-body">Docs, guides, video tutorials.</div>
                    </div>
                    <GhostBtn icon="external-link">{t("common.open")}</GhostBtn>
                  </div>
                  <div className="set-row">
                    <div className="set-row-info">
                      <div className="set-row-title">{t("settings.support.contact")}</div>
                      <div className="set-row-body">support@rallytic.com · response within 24h</div>
                    </div>
                    <GhostBtn icon="mail">Email</GhostBtn>
                  </div>
                  <div className="set-row">
                    <div className="set-row-info">
                      <div className="set-row-title">{t("settings.support.feedback")}</div>
                      <div className="set-row-body">Tell us what's missing or what's broken.</div>
                    </div>
                    <GhostBtn icon="message-circle">Send</GhostBtn>
                  </div>
                </div>
                <div className="set-card" style={{ textAlign: "center", padding: "16px" }}>
                  <div style={{ fontSize: 11, color: "var(--fgMute)", letterSpacing: ".14em", fontWeight: 700 }}>
                    {t("settings.support.version")}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
