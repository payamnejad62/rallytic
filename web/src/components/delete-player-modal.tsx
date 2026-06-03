"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/icon";

export function DeletePlayerModal({
  name,
  onClose,
  onConfirm,
}: {
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const t = useTranslations();
  const [typed, setTyped] = useState("");
  const matched = typed.trim().toLowerCase() === name.toLowerCase();
  const items: string[] = (t.raw("deleteModal.items") as string[]) ?? [];

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
          border: "1px solid rgba(229,104,93,0.30)",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 30px 80px -10px rgba(0,0,0,0.8)",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
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
            <Icon name="alert-triangle" />
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--weak)", fontWeight: 800, textTransform: "uppercase" }}>
              {t("deleteModal.destructiveAction")}
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", marginTop: 4 }}>
              {t("deleteModal.title", { name })}
            </div>
            <div style={{ fontSize: 12, color: "var(--fgMute)", marginTop: 3 }}>
              {t("deleteModal.irreversible")}
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12.5, color: "var(--fgDim)", margin: "14px 0 10px" }}>
          {t("deleteModal.deletingWill")}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          {items.map((it, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface3)",
                border: "1px solid var(--hairline2)",
                borderRadius: 8,
                padding: "9px 12px",
                fontSize: 12.5,
                color: "var(--fg)",
              }}
            >
              {it}
            </div>
          ))}
        </div>

        <div
          style={{
            background: "rgba(168,216,71,0.06)",
            border: "1px solid var(--accentRing)",
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 11.5,
            color: "var(--fgDim)",
            lineHeight: 1.5,
            marginBottom: 18,
          }}
        >
          {t("deleteModal.consider")}
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: "block",
              fontSize: 10,
              letterSpacing: ".16em",
              color: "var(--fgMute)",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            {t("deleteModal.confirmTypeName")}
          </label>
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={name}
            style={{
              width: "100%",
              background: "var(--surface3)",
              border: "1px solid var(--hairline2)",
              borderRadius: 9,
              padding: "11px 13px",
              color: "var(--fg)",
              fontFamily: "inherit",
              fontSize: 14,
            }}
          />
          <div style={{ fontSize: 11, color: "var(--fgMute)", marginTop: 5 }}>
            {t("deleteModal.confirmHint", { name })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button
            onClick={onClose}
            className="r-btn r-btn-ghost"
            type="button"
          >
            {t("deleteModal.cancel")}
          </button>
          <button
            onClick={() => matched && onConfirm()}
            disabled={!matched}
            type="button"
            style={{
              padding: "9px 18px",
              border: "none",
              borderRadius: 9,
              background: matched ? "var(--weak)" : "rgba(229,104,93,0.30)",
              color: "#fff",
              fontFamily: "inherit",
              fontWeight: 800,
              fontSize: 13,
              cursor: matched ? "pointer" : "not-allowed",
            }}
          >
            <Icon name="trash" /> {t("deleteModal.deleteForever")}
          </button>
        </div>
      </div>
    </div>
  );
}
