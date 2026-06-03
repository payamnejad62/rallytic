"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/icon";

export function InviteCoachModal({ onClose, currentCoaches = 6 }: { onClose: () => void; currentCoaches?: number }) {
  const t = useTranslations();
  const [role, setRole] = useState("Junior Coach");
  const newCount = currentCoaches + 1;
  const total = newCount * 39;

  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "var(--accentBg)",
            color: "var(--accent)",
            display: "grid",
            placeItems: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          <Icon name="user-plus" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--accent)", fontWeight: 800, textTransform: "uppercase" }}>
            Add to academy
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", marginTop: 4 }}>
            {t("inviteCoach.title")}
          </div>
          <div style={{ fontSize: 12, color: "var(--fgMute)", marginTop: 3 }}>
            {t("inviteCoach.subtitle")}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 18 }}>
        <Field label={t("inviteCoach.firstName")} defaultValue="Hannah" />
        <Field label={t("inviteCoach.lastName")} defaultValue="Müller" />
        <div style={{ gridColumn: "1 / -1" }}>
          <Field label={t("inviteCoach.email")} defaultValue="hannah@example.de" type="email" />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={labelStyle}>{t("inviteCoach.role")}</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
            <option>{t("inviteCoach.roleJunior")}</option>
            <option>{t("inviteCoach.roleCoach")}</option>
            <option>{t("inviteCoach.roleSenior")}</option>
            <option>{t("inviteCoach.roleHead")}</option>
          </select>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          padding: "12px 14px",
          background: "rgba(168,216,71,0.06)",
          border: "1px solid var(--accentRing)",
          borderRadius: 10,
          fontSize: 11.5,
          color: "var(--fgDim)",
          lineHeight: 1.5,
        }}
      >
        {t("inviteCoach.note")}
      </div>

      <div
        style={{
          marginTop: 12,
          padding: "10px 14px",
          background: "var(--surface3)",
          border: "1px solid var(--hairline2)",
          borderRadius: 10,
          fontSize: 12,
          color: "var(--fgDim)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{t("inviteCoach.billingNote", { n: newCount })}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent)", fontWeight: 700 }}>
          +$39/mo
        </span>
      </div>
      <div style={{ fontSize: 11, color: "var(--fgMute)", textAlign: "end", marginTop: 4 }}>
        {t("inviteCoach.proRated", { total: `$${total}` })}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <button onClick={onClose} className="r-btn r-btn-ghost" type="button">
          {t("inviteCoach.cancel")}
        </button>
        <button onClick={onClose} className="r-btn r-btn-primary" type="button">
          <Icon name="send" /> {t("inviteCoach.send")}
        </button>
      </div>
    </ModalBackdrop>
  );
}

export function OffboardCoachModal({ name, players, onClose }: { name: string; players: number; onClose: () => void }) {
  const t = useTranslations();
  const items = (t.raw("offboardCoach.items") as string[]) ?? [];

  return (
    <ModalBackdrop onClose={onClose}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(229,104,93,0.12)",
            color: "var(--weak)",
            display: "grid",
            placeItems: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          <Icon name="user-off" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--weak)", fontWeight: 800, textTransform: "uppercase" }}>
            Offboarding
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-.02em", marginTop: 4 }}>
            {t("offboardCoach.title", { name })}
          </div>
          <div style={{ fontSize: 12, color: "var(--fgMute)", marginTop: 3 }}>
            {t("offboardCoach.subtitle")}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          padding: "11px 14px",
          background: "rgba(229,104,93,0.06)",
          border: "1px solid rgba(229,104,93,0.30)",
          borderRadius: 10,
          fontSize: 12,
          color: "var(--weak)",
        }}
      >
        ⚠ {t("offboardCoach.warning")}
      </div>

      <div style={{ marginTop: 14, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--fgMute)", fontWeight: 700 }}>
        {t("offboardCoach.willHappen")}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              fontSize: 12,
              color: "var(--fg)",
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <span style={{ color: "var(--accent)" }}>·</span>
            {it}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <label style={labelStyle}>{t("offboardCoach.reassignTo", { n: players })}</label>
        <select style={inputStyle}>
          <option>Payam Nejad (Head Coach)</option>
          <option>Sarah Klein (Senior Coach)</option>
          <option>Marco Bianchi (Coach)</option>
          <option>Anika Schmidt (Junior Coach)</option>
        </select>
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={labelStyle}>{t("offboardCoach.reason")}</label>
        <textarea
          placeholder={t("offboardCoach.reasonPh")}
          rows={3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <button onClick={onClose} className="r-btn r-btn-ghost" type="button">
          {t("offboardCoach.cancel")}
        </button>
        <button
          onClick={onClose}
          type="button"
          style={{
            padding: "9px 18px",
            border: "none",
            borderRadius: 9,
            background: "var(--weak)",
            color: "#fff",
            fontFamily: "inherit",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          <Icon name="user-off" /> {t("offboardCoach.offboard")}
        </button>
      </div>
    </ModalBackdrop>
  );
}

function ModalBackdrop({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        zIndex: 200,
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "var(--surface2)",
          border: "1px solid var(--hairline2)",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 30px 80px -10px rgba(0,0,0,0.8)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 10,
  letterSpacing: ".16em",
  color: "var(--fgMute)",
  fontWeight: 700,
  textTransform: "uppercase",
  marginBottom: 5,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface3)",
  border: "1px solid var(--hairline2)",
  borderRadius: 9,
  padding: "11px 13px",
  color: "var(--fg)",
  fontFamily: "inherit",
  fontSize: 13,
};

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input type={type} defaultValue={defaultValue} style={inputStyle} />
    </div>
  );
}
