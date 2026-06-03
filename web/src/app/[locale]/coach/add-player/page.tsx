"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";

const STEPS = ["identity", "physical", "tennis", "review"] as const;
type Step = (typeof STEPS)[number];

function Styles() {
  return (
    <style>{`
.ap-stepper{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 24px;margin-bottom:14px}
.ap-step{display:flex;align-items:center;gap:12px;position:relative}
.ap-step::after{content:'';position:absolute;left:50%;right:-50%;top:18px;height:2px;background:var(--hairline2);z-index:0}
.ap-step:last-child::after{display:none}
.ap-step.done::after{background:var(--accent)}
.ap-step-n{width:36px;height:36px;border-radius:18px;background:var(--surface3);border:2px solid var(--hairline2);display:grid;place-items:center;font-weight:800;font-size:14px;color:var(--fgMute);position:relative;z-index:1;flex-shrink:0;font-family:'JetBrains Mono',monospace}
.ap-step.on .ap-step-n{background:var(--accent);border-color:var(--accent);color:var(--accentInk)}
.ap-step.done .ap-step-n{background:var(--accent);border-color:var(--accent);color:var(--accentInk)}
.ap-step-text{position:relative;z-index:1;background:var(--surface2);padding-right:8px}
.ap-step-k{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.ap-step-t{font-size:13px;font-weight:800;margin-top:2px}
.ap-step-d{font-size:10.5px;color:var(--fgMute);margin-top:1px}
.ap-step.on .ap-step-t{color:var(--accent)}

.ap-body{display:grid;grid-template-columns:1fr 320px;gap:14px}
.ap-form{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:24px 28px}
.ap-form-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.ap-form-t{font-size:14px;font-weight:800;display:flex;align-items:center;gap:10px}
.ap-form-progress{font-size:11px;color:var(--fgMute)}
.ap-photo{display:flex;align-items:center;gap:18px;padding:14px 16px;background:var(--surface3);border:1px dashed var(--hairline2);border-radius:12px;margin-bottom:18px}
.ap-photo-dot{width:60px;height:60px;border-radius:30px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px dashed var(--hairline2);display:grid;place-items:center;color:var(--fgMute)}
.ap-grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px 16px;margin-bottom:14px}
.ap-grid2 .full{grid-column:1/-1}
.ap-grid2 label{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;display:block;margin-bottom:5px}
.ap-grid2 input,.ap-grid2 select{width:100%;background:var(--surface3);border:1px solid var(--hairline2);border-radius:9px;padding:11px 13px;color:var(--fg);font-family:inherit;font-size:13px}
.ap-grid2 input:focus,.ap-grid2 select:focus{border-color:var(--accentRing);outline:none}
.ap-hint{font-size:10.5px;color:var(--fgMute);margin-top:4px}

.ap-preview{background:var(--surface2);border:1px solid var(--accentRing);border-radius:14px;padding:18px 20px;position:sticky;top:24px}
.ap-preview-h{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);font-weight:800;margin-bottom:14px;display:flex;align-items:center;gap:6px}
.ap-preview-h .dot{width:6px;height:6px;border-radius:3px;background:var(--accent);animation:blink 1s infinite}
@keyframes blink{50%{opacity:0.3}}
.ap-preview-av{width:60px;height:60px;border-radius:30px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:2px solid var(--accent);display:grid;place-items:center;color:var(--accent);font-weight:900;font-size:20px;margin-bottom:10px}
.ap-preview-name{font-size:18px;font-weight:800;letter-spacing:-.01em}
.ap-preview-meta{font-size:11px;color:var(--fgMute);margin-top:2px}
.ap-preview-pills{display:flex;gap:6px;margin-top:12px;margin-bottom:14px}
.ap-preview-pill{padding:5px 10px;background:var(--surface3);border:1px solid var(--hairline2);border-radius:8px;font-size:10px}
.ap-preview-pill-k{color:var(--fgMute);letter-spacing:.14em;font-weight:700;display:block}
.ap-preview-pill-v{color:var(--fg);font-weight:700;font-size:11.5px}
.ap-preview-row{display:flex;justify-content:space-between;padding:6px 0;font-size:11.5px;border-bottom:1px solid var(--hairline)}
.ap-preview-row:last-child{border-bottom:none}
.ap-preview-row .k{color:var(--fgMute)}
.ap-preview-row .v{color:var(--fg);font-weight:600}

.ap-tip{margin-top:14px;background:rgba(168,216,71,0.06);border:1px solid var(--accentRing);border-radius:12px;padding:14px 16px}
.ap-tip-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);font-weight:800;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.ap-tip-b{font-size:11.5px;color:var(--fgDim);line-height:1.5}

.ap-foot{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 24px;display:flex;justify-content:space-between;align-items:center}
.ap-foot-step{font-size:12px;color:var(--fgMute)}
.ap-foot-step strong{color:var(--fg)}

.ap-radio{display:flex;gap:8px}
.ap-radio button{flex:1;padding:10px 14px;border-radius:9px;background:var(--surface3);border:1px solid var(--hairline2);color:var(--fgDim);font-family:inherit;font-weight:700;font-size:12.5px;cursor:pointer}
.ap-radio button.on{background:var(--accent);color:var(--accentInk);border-color:transparent}

.ap-success{background:linear-gradient(135deg,rgba(168,216,71,0.16),transparent);border:1px solid var(--accent);border-radius:14px;padding:40px 24px;text-align:center}
.ap-success-ic{width:80px;height:80px;border-radius:40px;background:var(--accent);color:var(--accentInk);display:inline-grid;place-items:center;font-size:38px;margin-bottom:14px}
.ap-success-t{font-size:26px;font-weight:800;letter-spacing:-.02em}
.ap-success-s{font-size:13px;color:var(--fgDim);margin-top:6px}
`}</style>
  );
}

export default function AddPlayerWizardPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<Step>("identity");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    first: "Lena",
    last: "Vogel",
    nationality: "🇩🇪 Germany",
    dob: "2008-03-14",
    gender: "Female",
    age: "17",
    email: "lena.vogel@example.com",
    mobile: "+49 171 222 4488",
    address: "Friedrichstr. 22, Berlin",
    height: "168",
    weight: "58",
    hand: "Right",
    eye: "Right",
    level: "Intermediate",
    itn: "6",
    experience: "4",
  });

  const idx = STEPS.indexOf(step);

  function next() {
    if (idx < STEPS.length - 1) {
      setStep(STEPS[idx + 1]);
    } else {
      setDone(true);
    }
  }
  function back() {
    if (idx > 0) setStep(STEPS[idx - 1]);
  }

  function updateField(k: string, v: string) {
    setForm({ ...form, [k]: v });
  }

  return (
    <>
      <Topbar
        title={t("addPlayer.title")}
        breadcrumb={[{ label: t("crumb.roster") }, { label: t("addPlayer.title") }, { label: t(`addPlayer.steps.${step}`) }]}
        actions={
          <>
            <GhostBtn icon="device-floppy">{t("addPlayer.saveDraft")}</GhostBtn>
            <GhostBtn onClick={() => router.push(`/${locale}/coach/players`)}>{t("addPlayer.cancel")}</GhostBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        {!done && (
          <>
            <div className="ap-stepper">
              {STEPS.map((s, i) => (
                <div key={s} className={"ap-step" + (s === step ? " on" : "") + (i < idx ? " done" : "")}>
                  <div className="ap-step-n">{i < idx ? <Icon name="check" /> : i + 1}</div>
                  <div className="ap-step-text">
                    <div className="ap-step-k">STEP {i + 1}</div>
                    <div className="ap-step-t">{t(`addPlayer.steps.${s}`)}</div>
                    <div className="ap-step-d">{t(`addPlayer.stepDesc.${s}`)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ap-body">
              <div className="ap-form">
                <div className="ap-form-h">
                  <div className="ap-form-t">
                    <Icon name="user" /> {t(`addPlayer.steps.${step}`)} — {t(`addPlayer.stepDesc.${step}`)}
                  </div>
                  <div className="ap-form-progress">{t("addPlayer.filled", { n: 8, total: 12 })}</div>
                </div>

                {step === "identity" && (
                  <>
                    <div className="ap-photo">
                      <div className="ap-photo-dot">
                        <Icon name="camera" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{t("addPlayer.photo")}</div>
                        <div style={{ fontSize: 11, color: "var(--fgMute)", marginTop: 3 }}>{t("addPlayer.photoHint")}</div>
                      </div>
                      <GhostBtn icon="upload">{t("addPlayer.upload")}</GhostBtn>
                    </div>

                    <div className="ap-grid2">
                      <div>
                        <label>{t("addPlayer.firstName")}</label>
                        <input value={form.first} onChange={(e) => updateField("first", e.target.value)} />
                      </div>
                      <div>
                        <label>{t("addPlayer.lastName")}</label>
                        <input value={form.last} onChange={(e) => updateField("last", e.target.value)} />
                      </div>
                      <div>
                        <label>{t("addPlayer.nationality")}</label>
                        <input value={form.nationality} onChange={(e) => updateField("nationality", e.target.value)} />
                      </div>
                      <div>
                        <label>{t("addPlayer.dob")}</label>
                        <input value={form.dob} onChange={(e) => updateField("dob", e.target.value)} />
                      </div>
                      <div>
                        <label>{t("addPlayer.gender")}</label>
                        <select value={form.gender} onChange={(e) => updateField("gender", e.target.value)}>
                          <option>Female</option>
                          <option>Male</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label>{t("addPlayer.age")}</label>
                        <input value={form.age} onChange={(e) => updateField("age", e.target.value)} />
                        <div className="ap-hint">{t("addPlayer.autoFromDob")}</div>
                      </div>
                      <div className="full">
                        <label>{t("addPlayer.email")}</label>
                        <input value={form.email} onChange={(e) => updateField("email", e.target.value)} />
                      </div>
                      <div>
                        <label>{t("addPlayer.mobile")}</label>
                        <input value={form.mobile} onChange={(e) => updateField("mobile", e.target.value)} />
                      </div>
                      <div>
                        <label>{t("addPlayer.address")}</label>
                        <input value={form.address} onChange={(e) => updateField("address", e.target.value)} />
                      </div>
                    </div>
                  </>
                )}

                {step === "physical" && (
                  <div className="ap-grid2">
                    <div>
                      <label>{t("addPlayer.physical.height")}</label>
                      <input value={form.height} onChange={(e) => updateField("height", e.target.value)} />
                    </div>
                    <div>
                      <label>{t("addPlayer.physical.weight")}</label>
                      <input value={form.weight} onChange={(e) => updateField("weight", e.target.value)} />
                    </div>
                    <div>
                      <label>{t("addPlayer.physical.hand")}</label>
                      <div className="ap-radio">
                        {["Left", "Right"].map((h) => (
                          <button key={h} type="button" className={form.hand === h ? "on" : ""} onClick={() => updateField("hand", h)}>{h}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label>{t("addPlayer.physical.eye")}</label>
                      <div className="ap-radio">
                        {["Left", "Right"].map((h) => (
                          <button key={h} type="button" className={form.eye === h ? "on" : ""} onClick={() => updateField("eye", h)}>{h}</button>
                        ))}
                      </div>
                    </div>
                    <div className="full">
                      <label>{t("addPlayer.physical.bodyType")}</label>
                      <select>
                        <option>Athletic</option>
                        <option>Slim</option>
                        <option>Muscular</option>
                      </select>
                    </div>
                  </div>
                )}

                {step === "tennis" && (
                  <div className="ap-grid2">
                    <div>
                      <label>{t("addPlayer.tennis.level")}</label>
                      <select value={form.level} onChange={(e) => updateField("level", e.target.value)}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Professional</option>
                      </select>
                    </div>
                    <div>
                      <label>{t("addPlayer.tennis.itn")}</label>
                      <input value={form.itn} onChange={(e) => updateField("itn", e.target.value)} />
                    </div>
                    <div>
                      <label>{t("addPlayer.tennis.experience")}</label>
                      <input value={form.experience} onChange={(e) => updateField("experience", e.target.value)} />
                    </div>
                    <div className="full">
                      <label>{t("addPlayer.tennis.goals")}</label>
                      <input placeholder="e.g. ITN 5 by year-end" />
                    </div>
                    <div className="full">
                      <label>{t("addPlayer.tennis.history")}</label>
                      <input placeholder="Brief tennis background…" />
                    </div>
                  </div>
                )}

                {step === "review" && (
                  <>
                    <p style={{ fontSize: 13, color: "var(--fgDim)", marginBottom: 18 }}>{t("addPlayer.reviewIntro")}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                      {Object.entries(form).map(([k, v]) => (
                        <div key={k} style={{ background: "var(--surface3)", borderRadius: 10, padding: "10px 12px" }}>
                          <div style={{ fontSize: 9.5, color: "var(--fgMute)", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700 }}>{k}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    <PrimaryBtn icon="send">{t("addPlayer.sendInvite")}</PrimaryBtn>
                  </>
                )}
              </div>

              <div>
                <div className="ap-preview">
                  <div className="ap-preview-h">
                    <span className="dot" /> {t("addPlayer.livePreview")}
                  </div>
                  <div className="ap-preview-av">
                    {form.first[0]}{form.last[0]}
                  </div>
                  <div className="ap-preview-name">{form.first} {form.last}</div>
                  <div className="ap-preview-meta">{form.nationality} · {form.age} yrs</div>
                  <div className="ap-preview-pills">
                    <div className="ap-preview-pill">
                      <span className="ap-preview-pill-k">ITN</span>
                      <span className="ap-preview-pill-v">{form.itn}</span>
                    </div>
                    <div className="ap-preview-pill">
                      <span className="ap-preview-pill-k">LEVEL</span>
                      <span className="ap-preview-pill-v">{form.level}</span>
                    </div>
                    <div className="ap-preview-pill">
                      <span className="ap-preview-pill-k">EXP.</span>
                      <span className="ap-preview-pill-v">{form.experience}y</span>
                    </div>
                  </div>
                  <div className="ap-preview-row">
                    <span className="k">Date of birth</span>
                    <span className="v">{form.dob}</span>
                  </div>
                  <div className="ap-preview-row">
                    <span className="k">Gender</span>
                    <span className="v">{form.gender}</span>
                  </div>
                  <div className="ap-preview-row">
                    <span className="k">Height/Weight</span>
                    <span className="v">{form.height} cm · {form.weight} kg</span>
                  </div>
                  <div className="ap-preview-row">
                    <span className="k">Hand · Eye</span>
                    <span className="v">{form.hand} · {form.eye}</span>
                  </div>
                  <div className="ap-preview-row">
                    <span className="k">Email</span>
                    <span className="v" style={{ fontSize: 10 }}>{form.email}</span>
                  </div>
                  <div className="ap-preview-row">
                    <span className="k">Mobile</span>
                    <span className="v">{form.mobile}</span>
                  </div>
                </div>

                <div className="ap-tip">
                  <div className="ap-tip-h">
                    <Icon name="bulb" /> {t("addPlayer.coachTip")}
                  </div>
                  <div className="ap-tip-b">{t("addPlayer.coachTipBody")}</div>
                </div>
              </div>
            </div>

            <div className="ap-foot">
              <button className="r-btn r-btn-ghost" onClick={back} disabled={idx === 0}>
                <Icon name="arrow-left" /> {t("addPlayer.back")}
              </button>
              <div className="ap-foot-step">
                {t("addPlayer.step")} <strong>{idx + 1}</strong> {t("addPlayer.of")} {STEPS.length}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <GhostBtn>{t("addPlayer.skipStep")}</GhostBtn>
                <PrimaryBtn icon="arrow-right" onClick={next}>
                  {idx === STEPS.length - 1 ? t("addPlayer.finish") : t("addPlayer.saveContinue")}
                </PrimaryBtn>
              </div>
            </div>
          </>
        )}

        {done && (
          <div className="ap-success">
            <div className="ap-success-ic">
              <Icon name="check" />
            </div>
            <div className="ap-success-t">{t("addPlayer.successTitle")}</div>
            <div className="ap-success-s">{t("addPlayer.successSub", { name: `${form.first} ${form.last}` })}</div>
            <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 10 }}>
              <GhostBtn onClick={() => { setDone(false); setStep("identity"); }}>Add another</GhostBtn>
              <PrimaryBtn icon="arrow-right" onClick={() => router.push(`/${locale}/coach/players`)}>
                Open roster
              </PrimaryBtn>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
