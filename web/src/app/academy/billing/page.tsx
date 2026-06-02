"use client";

import { useState } from "react";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { ACAD_PLANS, ACAD_SUB } from "@/lib/academy-data";

function Styles() {
  return (
    <style>{`
.bl-active{background:linear-gradient(90deg,rgba(168,216,71,0.10),transparent 70%);border:1px solid var(--accentRing);border-radius:14px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;gap:14px}
.bl-active-h{display:flex;align-items:center;gap:14px}
.bl-active-tile{width:42px;height:42px;border-radius:10px;background:var(--accent);color:var(--accentInk);display:grid;place-items:center;font-weight:900;font-size:18px}
.bl-active-t{font-size:14px;font-weight:800}
.bl-active-s{font-size:11px;color:var(--fgDim);margin-top:3px}

.bl-section{margin-top:18px}
.bl-section-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.bl-section-t{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700}
.bl-section-sub{font-size:11px;color:var(--fgMute);margin-top:2px}

.bl-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}
.bl-plan{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:24px 22px;display:flex;flex-direction:column;gap:14px;position:relative;cursor:pointer;transition:.15s}
.bl-plan:hover{border-color:var(--accentRing)}
.bl-plan.on{border-color:var(--accent);background:linear-gradient(180deg,rgba(168,216,71,0.06),transparent);box-shadow:0 0 0 1px rgba(168,216,71,.18)}
.bl-plan.popular::before{content:'Recommended';position:absolute;top:-10px;right:14px;background:var(--accent);color:var(--accentInk);font-size:9px;font-weight:800;letter-spacing:.16em;padding:3px 9px;border-radius:4px;text-transform:uppercase}
.bl-plan-radio{position:absolute;top:18px;right:18px;width:18px;height:18px;border-radius:50%;border:2px solid var(--hairline2);background:transparent;display:grid;place-items:center}
.bl-plan.on .bl-plan-radio{border-color:var(--accent);background:var(--accent)}
.bl-plan.on .bl-plan-radio::after{content:'';width:6px;height:6px;border-radius:3px;background:var(--accentInk)}
.bl-plan-name{font-size:18px;font-weight:800;letter-spacing:-.01em}
.bl-plan-tag{font-size:11px;color:var(--fgMute);margin-top:2px}
.bl-plan-price{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:38px;font-weight:800;letter-spacing:-.03em;line-height:1}
.bl-plan-price small{font-size:12px;color:var(--fgMute);font-family:inherit;font-weight:500;letter-spacing:0;margin-left:6px}
.bl-plan-max{font-size:12px;color:var(--fgDim);font-weight:600}
.bl-plan-feats{display:flex;flex-direction:column;gap:8px;font-size:12px;color:var(--fg)}
.bl-plan-feat{display:flex;align-items:flex-start;gap:8px}
.bl-plan-feat .ic{width:16px;height:16px;border-radius:8px;background:var(--accentBg);color:var(--accent);display:grid;place-items:center;font-size:11px;flex-shrink:0;margin-top:1px}

.bl-cycle{display:inline-flex;background:var(--surface2);border:1px solid var(--hairline);border-radius:10px;padding:4px;gap:4px}
.bl-cycle button{padding:8px 14px;border-radius:7px;border:none;background:transparent;color:var(--fgDim);font-weight:700;font-size:11.5px;cursor:pointer;font-family:inherit}
.bl-cycle button.on{background:var(--accent);color:var(--accentInk)}

.bl-bot{margin-top:18px;display:grid;grid-template-columns:1.4fr 1fr;gap:14px}
.bl-pay{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 22px}
.bl-pay-h{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700;display:flex;justify-content:space-between;margin-bottom:14px}
.bl-card-on-file{background:var(--surface3);border:1px solid var(--accentRing);border-radius:10px;padding:12px 14px;display:flex;align-items:center;gap:12px}
.bl-card-brand{padding:6px 10px;background:var(--accent);color:var(--accentInk);border-radius:6px;font-weight:800;font-size:11px}
.bl-card-text{flex:1;font-size:12.5px}
.bl-card-text strong{font-weight:700}
.bl-card-text small{display:block;font-size:10.5px;color:var(--fgMute);margin-top:2px}
.bl-card-default{background:var(--accent);color:var(--accentInk);font-size:9px;font-weight:800;letter-spacing:.14em;padding:3px 8px;border-radius:4px;text-transform:uppercase}

.bl-form{margin-top:14px;display:grid;gap:10px;grid-template-columns:1fr 1fr 1fr 1fr}
.bl-form .full{grid-column:1/-1}
.bl-form .half{grid-column:span 2}
.bl-form label{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;display:block;margin-bottom:5px}
.bl-form input{width:100%;background:var(--surface3);border:1px solid var(--hairline2);border-radius:8px;padding:9px 12px;color:var(--fg);font-family:inherit;font-size:13px}
.bl-form input:focus{border-color:var(--accentRing);outline:none}

.bl-sum{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px 22px}
.bl-sum-row{display:flex;justify-content:space-between;padding:8px 0;font-size:13px;border-bottom:1px dashed var(--hairline)}
.bl-sum-row.muted{color:var(--fgMute);font-size:12px}
.bl-sum-row .v{font-family:'JetBrains Mono',ui-monospace,monospace;font-weight:700}
.bl-sum-row.discount .v{color:var(--accent)}
.bl-sum-total{display:flex;justify-content:space-between;padding-top:14px;margin-top:8px;border-top:2px solid var(--hairline2);font-size:14px;font-weight:800}
.bl-sum-total .v{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:24px;color:var(--accent)}
`}</style>
  );
}

export default function AcademyBillingPage() {
  const [selected, setSelected] = useState("elite");
  const [coaches, setCoaches] = useState(6);
  const [cycle, setCycle] = useState<"monthly" | "annual">("annual");
  const plan = ACAD_PLANS.find((p) => p.id === selected)!;
  const monthlyPerSeat = plan.perCoach;
  const subtotal =
    cycle === "annual" ? monthlyPerSeat * coaches * 12 : monthlyPerSeat * coaches;
  const discount = cycle === "annual" ? monthlyPerSeat * coaches * 2 : 0;
  const total = subtotal - discount;

  return (
    <>
      <Topbar
        title="Plan & billing"
        breadcrumb={[{ label: "Academy" }, { label: "Settings" }, { label: "Plan & billing" }]}
        actions={
          <>
            <GhostBtn icon="receipt">Invoices</GhostBtn>
            <PrimaryBtn icon="messages">Talk to sales</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="bl-active">
          <div className="bl-active-h">
            <div className="bl-active-tile">
              <Icon name="shield-check" />
            </div>
            <div>
              <div className="bl-active-t">
                Currently on <span style={{ color: "var(--accent)" }}>Academy Elite</span> · {ACAD_SUB.coaches} coaches · billed annually
              </div>
              <div className="bl-active-s">
                Renews {ACAD_SUB.nextRenewal} · $2,808/yr · auto-renew on
              </div>
            </div>
          </div>
          <span className="r-pill" style={{ background: "var(--accent)", color: "var(--accentInk)" }}>
            Active
          </span>
        </div>

        <div className="bl-section">
          <div className="bl-section-h">
            <div>
              <div className="bl-section-t">Choose your plan</div>
              <div className="bl-section-sub">
                Prices per coach · {coaches} coaches in your academy
              </div>
            </div>
            <div className="bl-cycle">
              <button className={cycle === "monthly" ? "on" : ""} onClick={() => setCycle("monthly")}>
                Monthly
              </button>
              <button className={cycle === "annual" ? "on" : ""} onClick={() => setCycle("annual")}>
                Annual · 2 mo free
              </button>
            </div>
          </div>

          <div className="bl-plans">
            {ACAD_PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={"bl-plan " + (selected === p.id ? "on " : "") + (p.popular ? "popular" : "")}
                onClick={() => setSelected(p.id)}
              >
                <div className="bl-plan-radio" />
                <div>
                  <div className="bl-plan-name">{p.name}</div>
                  <div className="bl-plan-tag">{p.tagline}</div>
                </div>
                <div>
                  <div className="bl-plan-price">
                    ${p.perCoach}
                    <small>/ coach / mo</small>
                  </div>
                  <div className="bl-plan-max" style={{ marginTop: 4 }}>{p.maxCoaches}</div>
                </div>
                <div className="bl-plan-feats">
                  {p.features.map((f) => (
                    <div className="bl-plan-feat" key={f}>
                      <span className="ic">
                        <Icon name="check" />
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bl-section">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "var(--surface2)",
              border: "1px solid var(--hairline)",
              borderRadius: 12,
              padding: "12px 16px",
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fgMute)", fontWeight: 700 }}>
              Coaches in academy
            </span>
            <button
              type="button"
              onClick={() => setCoaches((c) => Math.max(1, c - 1))}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--surface3)",
                color: "var(--fg)",
                border: "1px solid var(--hairline2)",
                cursor: "pointer",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              −
            </button>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 20,
                fontWeight: 800,
                minWidth: 36,
                textAlign: "center",
              }}
            >
              {coaches}
            </span>
            <button
              type="button"
              onClick={() => setCoaches((c) => c + 1)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "var(--accent)",
                color: "var(--accentInk)",
                border: "none",
                cursor: "pointer",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              +
            </button>
            <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--fgMute)" }}>
              Adjust to match your roster
            </span>
          </div>
        </div>

        <div className="bl-bot">
          <div className="bl-pay">
            <div className="bl-pay-h">
              <span>Payment method</span>
              <span style={{ color: "var(--fgMute)", letterSpacing: 0 }}>Charged on renewal</span>
            </div>
            <div className="bl-card-on-file">
              <div className="bl-card-brand">VISA</div>
              <div className="bl-card-text">
                <strong>Visa ending 4242</strong>
                <small>Exp. 08 / 28 · Berlin Tennis Academy</small>
              </div>
              <span className="bl-card-default">Default</span>
            </div>

            <div style={{ marginTop: 18, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fgMute)", fontWeight: 700 }}>
              Or pay with a new card
            </div>
            <div className="bl-form">
              <div className="full">
                <label>Cardholder name</label>
                <input type="text" defaultValue="Berlin Tennis Academy" />
              </div>
              <div className="full">
                <label>Card number</label>
                <input type="text" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="half">
                <label>Expiry</label>
                <input type="text" placeholder="MM / YY" />
              </div>
              <div className="half">
                <label>CVC</label>
                <input type="text" placeholder="123" />
              </div>
              <div className="full">
                <label>Billing country</label>
                <input type="text" defaultValue="Germany" />
              </div>
            </div>
          </div>

          <div className="bl-sum">
            <div className="bl-pay-h">Order summary</div>
            <div className="bl-sum-row">
              <span>Academy {plan.name.replace("Academy ", "")}</span>
              <span className="v">${plan.perCoach}/coach</span>
            </div>
            <div className="bl-sum-row muted">
              <span>Billing cycle</span>
              <span className="v" style={{ color: "var(--fg)" }}>
                {cycle === "annual" ? "Annual" : "Monthly"}
              </span>
            </div>
            <div className="bl-sum-row muted">
              <span>Coaches</span>
              <span className="v" style={{ color: "var(--fg)" }}>× {coaches}</span>
            </div>
            <div className="bl-sum-row">
              <span>Subtotal</span>
              <span className="v">${subtotal.toLocaleString()}</span>
            </div>
            {cycle === "annual" && (
              <div className="bl-sum-row discount">
                <span>Annual discount (2 mo free)</span>
                <span className="v">− ${discount.toLocaleString()}</span>
              </div>
            )}
            <div className="bl-sum-total">
              <span>Total / {cycle === "annual" ? "year" : "month"}</span>
              <span className="v">${total.toLocaleString()}</span>
            </div>
            <button
              className="r-btn r-btn-primary"
              style={{ width: "100%", marginTop: 14, padding: "12px 18px", fontSize: 14 }}
            >
              <Icon name="lock" /> Update payment
            </button>
            <div
              style={{
                fontSize: 10.5,
                color: "var(--fgMute)",
                textAlign: "center",
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              Secure checkout · PCI compliant
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
