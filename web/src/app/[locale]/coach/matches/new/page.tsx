"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";

const STEPS = ["context", "opponent", "score", "stats", "review"] as const;
type Step = (typeof STEPS)[number];

function Styles() {
  return (
    <style>{`
.am-stepper{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 24px;margin-bottom:14px}
.am-step{display:flex;align-items:center;gap:12px;position:relative}
.am-step::after{content:'';position:absolute;left:50%;right:-50%;top:18px;height:2px;background:var(--hairline2);z-index:0}
.am-step:last-child::after{display:none}
.am-step.done::after{background:var(--accent)}
.am-step-n{width:36px;height:36px;border-radius:18px;background:var(--surface3);border:2px solid var(--hairline2);display:grid;place-items:center;font-weight:800;font-size:14px;color:var(--fgMute);position:relative;z-index:1;flex-shrink:0;font-family:'JetBrains Mono',monospace}
.am-step.on .am-step-n{background:var(--accent);border-color:var(--accent);color:var(--accentInk)}
.am-step.done .am-step-n{background:var(--accent);border-color:var(--accent);color:var(--accentInk)}
.am-step-text{position:relative;z-index:1;background:var(--surface2);padding-right:8px}
.am-step-k{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.am-step-t{font-size:13px;font-weight:800;margin-top:2px}
.am-step-d{font-size:10.5px;color:var(--fgMute);margin-top:1px}
.am-step.on .am-step-t{color:var(--accent)}

.am-form{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:22px 26px;margin-bottom:14px}
.am-form-h{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:10px}

.am-types{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
.am-type{padding:18px 22px;border-radius:12px;background:var(--surface3);border:1px solid var(--hairline2);color:var(--fgDim);text-align:center;cursor:pointer;font-family:inherit;font-weight:800;font-size:14px;position:relative}
.am-type.on{background:rgba(168,216,71,0.10);border-color:var(--accent);color:var(--accent)}
.am-type.on::before{content:'';position:absolute;top:14px;right:14px;width:8px;height:8px;border-radius:4px;background:var(--accent)}

.am-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px 16px;margin-bottom:14px}
.am-grid3 label{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;display:block;margin-bottom:5px}
.am-grid3 input,.am-grid3 select{width:100%;background:var(--surface3);border:1px solid var(--hairline2);border-radius:9px;padding:11px 13px;color:var(--fg);font-family:inherit;font-size:13px}
.am-grid3 input:focus,.am-grid3 select:focus{border-color:var(--accentRing);outline:none}
.am-grid3 .full{grid-column:1/-1}
.am-grid3 .half{grid-column:span 2}

.am-score-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.am-set{background:var(--surface3);border:1px solid var(--hairline2);border-radius:12px;padding:18px 22px;text-align:center}
.am-set-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:10px}
.am-set-inputs{display:flex;align-items:center;justify-content:center;gap:14px}
.am-set-inputs input{width:60px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:24px;font-weight:800;padding:8px;background:var(--surface2);border:1px solid var(--hairline2);border-radius:8px;color:var(--fg)}
.am-set-inputs .dash{color:var(--fgMute);font-size:18px}

.am-result{display:flex;gap:10px;margin-top:14px;justify-content:center}
.am-result button{padding:10px 24px;border-radius:9px;font-family:inherit;font-weight:800;font-size:13px;cursor:pointer;background:var(--surface3);border:1px solid var(--hairline2);color:var(--fgDim)}
.am-result button.win{background:var(--accent);color:var(--accentInk);border-color:transparent}
.am-result button.lose{background:var(--weak);color:#fff;border-color:transparent}

.am-foot{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 24px;display:flex;justify-content:space-between;align-items:center}
.am-success{background:linear-gradient(135deg,rgba(168,216,71,0.16),transparent);border:1px solid var(--accent);border-radius:14px;padding:40px 24px;text-align:center}
.am-success-ic{width:80px;height:80px;border-radius:40px;background:var(--accent);color:var(--accentInk);display:inline-grid;place-items:center;font-size:38px;margin-bottom:14px}
`}</style>
  );
}

export default function AddMatchWizardPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState<Step>("context");
  const [done, setDone] = useState(false);
  const [matchType, setMatchType] = useState<"official" | "friendly" | "training">("official");
  const [result, setResult] = useState<"win" | "loss">("win");
  const idx = STEPS.indexOf(step);

  function next() {
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
    else setDone(true);
  }
  function back() {
    if (idx > 0) setStep(STEPS[idx - 1]);
  }

  return (
    <>
      <Topbar
        title={t("addMatch.title")}
        breadcrumb={[{ label: t("matches.title") }, { label: t("addMatch.title") }, { label: t(`addMatch.steps.${step}`) }]}
        actions={
          <>
            <GhostBtn icon="device-floppy">{t("addMatch.saveDraft")}</GhostBtn>
            <GhostBtn onClick={() => router.push(`/${locale}/coach/matches`)}>{t("addMatch.cancel")}</GhostBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        {!done && (
          <>
            <div className="am-stepper">
              {STEPS.map((s, i) => (
                <div key={s} className={"am-step" + (s === step ? " on" : "") + (i < idx ? " done" : "")}>
                  <div className="am-step-n">{i < idx ? <Icon name="check" /> : i + 1}</div>
                  <div className="am-step-text">
                    <div className="am-step-k">STEP {i + 1}</div>
                    <div className="am-step-t">{t(`addMatch.steps.${s}`)}</div>
                    <div className="am-step-d">{t(`addMatch.stepDesc.${s}`)}</div>
                  </div>
                </div>
              ))}
            </div>

            {step === "context" && (
              <div className="am-form">
                <div className="am-form-h">
                  <Icon name="info-circle" /> {t("addMatch.context")}
                </div>
                <div className="am-types">
                  {(["official", "friendly", "training"] as const).map((k) => (
                    <button key={k} type="button" className={"am-type" + (matchType === k ? " on" : "")} onClick={() => setMatchType(k)}>
                      {t(`addMatch.${k}`)}
                    </button>
                  ))}
                </div>
                <div className="am-grid3">
                  <div><label>{t("addMatch.date")}</label><input type="date" defaultValue="2026-05-12" /></div>
                  <div><label>{t("addMatch.time")}</label><input type="time" defaultValue="14:00" /></div>
                  <div><label>{t("addMatch.duration")}</label><input defaultValue="1h 47m" /></div>
                  <div><label>{t("addMatch.surface")}</label>
                    <select><option>Clay</option><option>Hard</option><option>Grass</option></select>
                  </div>
                  <div className="half"><label>{t("addMatch.tournament")}</label><input defaultValue="Spring Cup 2026" /></div>
                  <div><label>{t("addMatch.round")}</label><input defaultValue="Round of 8" /></div>
                  <div className="half"><label>{t("addMatch.location")}</label><input defaultValue="Club Courts" /></div>
                  <div><label>{t("addMatch.weather")}</label><input defaultValue="24°C · sunny" /></div>
                </div>
              </div>
            )}

            {step === "opponent" && (
              <div className="am-form">
                <div className="am-form-h">
                  <Icon name="user" /> {t("addMatch.opponentName")}
                </div>
                <div className="am-grid3">
                  <div className="full"><label>{t("addMatch.opponentName")}</label><input defaultValue="M. Hoffmann" /></div>
                  <div><label>{t("addMatch.opponentNat")}</label><input defaultValue="🇩🇪 Germany" /></div>
                  <div><label>{t("addMatch.opponentAge")}</label><input defaultValue="22" /></div>
                  <div><label>{t("addMatch.opponentItn")}</label><input defaultValue="4" /></div>
                </div>
              </div>
            )}

            {step === "score" && (
              <div className="am-form">
                <div className="am-form-h">
                  <Icon name="trophy" /> {t("addMatch.result")}
                </div>
                <div className="am-score-grid">
                  {[1, 2, 3].map((s) => (
                    <div className="am-set" key={s}>
                      <div className="am-set-k">{t("addMatch.scoreSet", { n: s })}</div>
                      <div className="am-set-inputs">
                        <input defaultValue={s === 1 ? "6" : s === 2 ? "7" : ""} />
                        <span className="dash">-</span>
                        <input defaultValue={s === 1 ? "4" : s === 2 ? "5" : ""} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="am-result">
                  <button type="button" className={result === "win" ? "win" : ""} onClick={() => setResult("win")}>{t("addMatch.win")}</button>
                  <button type="button" className={result === "loss" ? "lose" : ""} onClick={() => setResult("loss")}>{t("addMatch.loss")}</button>
                </div>
              </div>
            )}

            {step === "stats" && (
              <div className="am-form">
                <div className="am-form-h">
                  <Icon name="chart-bar" /> {t("addMatch.matchStats")}
                </div>
                <div className="am-grid3">
                  <div><label>{t("addMatch.aces")}</label><input defaultValue="8" /></div>
                  <div><label>{t("addMatch.doubleFaults")}</label><input defaultValue="2" /></div>
                  <div><label>{t("addMatch.winners")}</label><input defaultValue="24" /></div>
                  <div><label>{t("addMatch.unforced")}</label><input defaultValue="11" /></div>
                  <div><label>{t("addMatch.firstServePct")}</label><input defaultValue="68" /></div>
                  <div><label>{t("addMatch.breakPoints")}</label><input defaultValue="3/5" /></div>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="am-form">
                <div className="am-form-h">
                  <Icon name="message-circle" /> {t("addMatch.coachNotes")}
                </div>
                <div className="am-grid3">
                  <div className="full">
                    <textarea
                      rows={6}
                      defaultValue="Good serve today. Backhand cross-court improved. Net approach work still needs work."
                      style={{
                        width: "100%",
                        background: "var(--surface3)",
                        border: "1px solid var(--hairline2)",
                        borderRadius: 9,
                        padding: "11px 13px",
                        color: "var(--fg)",
                        fontFamily: "inherit",
                        fontSize: 13,
                        resize: "vertical",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="am-foot">
              <button className="r-btn r-btn-ghost" onClick={back} disabled={idx === 0}>
                <Icon name="arrow-left" /> {t("addMatch.back")}
              </button>
              <div style={{ fontSize: 12, color: "var(--fgMute)" }}>
                {t("addMatch.step")} <strong style={{ color: "var(--fg)" }}>{idx + 1}</strong> {t("addMatch.of")} {STEPS.length}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <GhostBtn>{t("addMatch.saveAsDraft")}</GhostBtn>
                <PrimaryBtn icon={idx === STEPS.length - 1 ? "device-floppy" : "arrow-right"} onClick={next}>
                  {idx === STEPS.length - 1 ? t("addMatch.save") : t("addMatch.continue")}
                </PrimaryBtn>
              </div>
            </div>
          </>
        )}

        {done && (
          <div className="am-success">
            <div className="am-success-ic">
              <Icon name="check" />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800 }}>{t("addMatch.successTitle")}</div>
            <div style={{ fontSize: 13, color: "var(--fgDim)", marginTop: 6 }}>
              {t("addMatch.successSub", { name: "Arman Rahimi" })}
            </div>
            <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 10 }}>
              <GhostBtn onClick={() => { setDone(false); setStep("context"); }}>Log another</GhostBtn>
              <PrimaryBtn icon="arrow-right" onClick={() => router.push(`/${locale}/coach/matches`)}>
                Open matches
              </PrimaryBtn>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
