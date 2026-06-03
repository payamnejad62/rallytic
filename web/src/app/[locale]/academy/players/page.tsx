"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { ACAD_PLAYERS } from "@/lib/academy-extra-data";
import { COACHES } from "@/lib/academy-data";
import { useLocaleFormat } from "@/lib/use-locale-format";

const LEVEL_COLORS: Record<string, { bg: string; fg: string }> = {
  Beginner: { bg: "rgba(125,211,252,0.10)", fg: "#7DD3FC" },
  Intermediate: { bg: "rgba(242,181,68,0.10)", fg: "#F2B544" },
  Advanced: { bg: "rgba(168,216,71,0.10)", fg: "#A8D847" },
  Professional: { bg: "rgba(168,216,71,0.10)", fg: "#A8D847" },
};

const STATUS_COLORS: Record<string, { bg: string; fg: string }> = {
  active: { bg: "rgba(168,216,71,0.10)", fg: "#A8D847" },
  flag: { bg: "rgba(229,104,93,0.10)", fg: "#E5685D" },
  paused: { bg: "rgba(125,211,252,0.10)", fg: "#7DD3FC" },
};

function Styles() {
  return (
    <style>{`
.ap-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.ap-kpi{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 18px;display:flex;align-items:center;gap:14px}
.ap-kpi-ic{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;font-size:18px;border:1px solid var(--hairline2)}
.ap-kpi-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.ap-kpi-v{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:800;letter-spacing:-.02em;margin-top:4px}
.ap-kpi-sub{font-size:11px;font-weight:600;margin-left:6px}

.ap-privacy{margin-top:14px;background:rgba(168,216,71,0.04);border:1px solid var(--accentRing);border-radius:12px;padding:12px 16px;font-size:12px;color:var(--fgDim);display:flex;align-items:center;gap:10px}
.ap-privacy strong{color:var(--accent);font-weight:700}

.ap-search-row{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:12px}
.ap-search{flex:1;display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--surface3);border:1px solid var(--hairline2);border-radius:10px}
.ap-search input{background:transparent;border:none;outline:none;color:var(--fg);font-family:inherit;font-size:13px;flex:1}
.ap-search input::placeholder{color:var(--fgMute)}
.ap-chip{padding:6px 12px;border-radius:10px;border:1px solid var(--hairline2);background:transparent;color:var(--fgDim);font-family:inherit;font-size:12px;font-weight:700;cursor:pointer}
.ap-chip.on{background:var(--accent);color:var(--accentInk);border-color:transparent}

.ap-coach-row{margin-top:12px;background:var(--surface2);border:1px solid var(--hairline);border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:11.5px;color:var(--fgDim)}
.ap-coach-row .h{letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:var(--fgMute)}
.ap-coach-pill{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;background:var(--surface3);border:1px solid var(--hairline2)}
.ap-coach-pill .dot{width:8px;height:8px;border-radius:4px}

.ap-table{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.ap-th,.ap-tr{display:grid;grid-template-columns:60px 2.2fr 1fr 1.5fr 0.6fr 0.8fr 0.8fr;gap:12px;padding:12px 18px;align-items:center}
.ap-th{font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;background:linear-gradient(180deg,#0c100c,#0a0d0a);border-bottom:1px solid var(--hairline)}
.ap-tr{font-size:13px;border-bottom:1px solid var(--hairline)}
.ap-tr:last-child{border-bottom:none}
.ap-tr:hover{background:rgba(168,216,71,0.04)}
.ap-num{font-family:'JetBrains Mono',monospace;color:var(--fgMute);font-size:11px}
.ap-player{display:flex;align-items:center;gap:10px}
.ap-av{width:30px;height:30px;border-radius:10px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:10px}
.ap-name{font-weight:700}
.ap-sub{font-size:10px;color:var(--fgMute);margin-top:1px}
.ap-pill{display:inline-block;padding:3px 10px;border-radius:4px;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.ap-coach-cell{display:flex;align-items:center;gap:6px;color:var(--fgDim);font-size:12px}
.ap-coach-cell .dot{width:6px;height:6px;border-radius:3px;background:var(--accent)}
.ap-itn{font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--accent)}
.ap-trend{font-family:'JetBrains Mono',monospace;font-weight:700}
.ap-trend.up{color:var(--good)}
.ap-trend.dn{color:var(--weak)}
.ap-trend.flat{color:var(--fgMute)}
`}</style>
  );
}

export default function AllPlayersPage() {
  const t = useTranslations();
  const fmt = useLocaleFormat();
  const [q, setQ] = useState("");
  const [coachFilter, setCoachFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    let arr = ACAD_PLAYERS;
    if (coachFilter !== "all") {
      arr = arr.filter((p) => p.coach.toLowerCase().startsWith(coachFilter));
    }
    if (q.trim()) {
      const qq = q.trim().toLowerCase();
      arr = arr.filter((p) => p.name.toLowerCase().includes(qq));
    }
    return arr;
  }, [q, coachFilter]);

  const flagged = ACAD_PLAYERS.filter((p) => p.status === "flag").length;
  const paused = ACAD_PLAYERS.filter((p) => p.status === "paused").length;

  return (
    <>
      <Topbar
        title={t("allPlayers.title")}
        breadcrumb={[{ label: t("crumb.academy") }, { label: t("allPlayers.title") }]}
        actions={
          <>
            <GhostBtn icon="adjustments-horizontal">{t("allPlayers.filters")}</GhostBtn>
            <GhostBtn icon="arrows-right-left">{t("allPlayers.reassign")}</GhostBtn>
            <PrimaryBtn icon="file-spreadsheet">{t("allPlayers.exportCsv")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="ap-kpis">
          <div className="ap-kpi">
            <div className="ap-kpi-ic" style={{ background: "rgba(168,216,71,0.10)", color: "#A8D847" }}>
              <Icon name="users-group" />
            </div>
            <div>
              <div className="ap-kpi-k">{t("allPlayers.kpis.total")}</div>
              <div className="ap-kpi-v">
                {fmt.d(ACAD_PLAYERS.length)}
                <span className="ap-kpi-sub" style={{ color: "var(--fgMute)" }}>{t("allPlayers.subAcross")}</span>
              </div>
            </div>
          </div>
          <div className="ap-kpi">
            <div className="ap-kpi-ic" style={{ background: "rgba(168,216,71,0.10)", color: "#A8D847" }}>
              <Icon name="user-plus" />
            </div>
            <div>
              <div className="ap-kpi-k">{t("allPlayers.kpis.newQ")}</div>
              <div className="ap-kpi-v">
                {fmt.d(4)}
                <span className="ap-kpi-sub" style={{ color: "#A8D847" }}>{t("allPlayers.subNewPct")}</span>
              </div>
            </div>
          </div>
          <div className="ap-kpi">
            <div className="ap-kpi-ic" style={{ background: "rgba(229,104,93,0.10)", color: "#E5685D" }}>
              <Icon name="alert-triangle" />
            </div>
            <div>
              <div className="ap-kpi-k">{t("allPlayers.kpis.flagged")}</div>
              <div className="ap-kpi-v">
                {fmt.d(flagged)}
                <span className="ap-kpi-sub" style={{ color: "#E5685D" }}>{t("allPlayers.subNeedReview")}</span>
              </div>
            </div>
          </div>
          <div className="ap-kpi">
            <div className="ap-kpi-ic" style={{ background: "rgba(125,211,252,0.10)", color: "#7DD3FC" }}>
              <Icon name="player-pause" />
            </div>
            <div>
              <div className="ap-kpi-k">{t("allPlayers.kpis.paused")}</div>
              <div className="ap-kpi-v">
                {fmt.d(paused)}
                <span className="ap-kpi-sub" style={{ color: "var(--fgMute)" }}>{t("allPlayers.subTemp")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ap-privacy">
          <Icon name="shield-lock" style={{ color: "var(--accent)" }} />
          <span><strong>{t("allPlayers.privacy")}</strong> {t("allPlayers.privacyBody")}</span>
        </div>

        <div className="ap-search-row">
          <div className="ap-search">
            <Icon name="search" style={{ color: "var(--fgMute)" }} />
            <input
              placeholder={t("allPlayers.searchPh")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={"ap-chip " + (coachFilter === "all" ? "on" : "")}
            onClick={() => setCoachFilter("all")}
          >
            {t("common.all")}
          </button>
          {COACHES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={"ap-chip " + (coachFilter === c.id ? "on" : "")}
              onClick={() => setCoachFilter(c.id)}
            >
              {c.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <div className="ap-coach-row">
          <span className="h">{t("allPlayers.coaches")}</span>
          {COACHES.map((c, i) => {
            const colors = ["#A8D847", "#7DD3FC", "#F2B544", "#D8B4FE", "#B879E0", "#E5685D"];
            return (
              <span key={c.id} className="ap-coach-pill">
                <span className="dot" style={{ background: colors[i] }} />
                {c.name.split(" ")[0]}
              </span>
            );
          })}
        </div>

        <div className="ap-table">
          <div className="ap-th">
            <div>{t("allPlayers.th.num")}</div>
            <div>{t("allPlayers.th.player")}</div>
            <div>{t("allPlayers.th.level")}</div>
            <div>{t("allPlayers.th.coach")}</div>
            <div>{t("allPlayers.th.itn")}</div>
            <div>{t("allPlayers.th.trend")}</div>
            <div>{t("allPlayers.th.status")}</div>
          </div>
          {filtered.map((p) => {
            const lv = LEVEL_COLORS[p.level];
            const st = STATUS_COLORS[p.status];
            const trendCls = p.trend > 0 ? "up" : p.trend < 0 ? "dn" : "flat";
            return (
              <div className="ap-tr" key={p.id}>
                <div className="ap-num">{fmt.d(p.num)}</div>
                <div className="ap-player">
                  <div className="ap-av">{p.initials}</div>
                  <div>
                    <div className="ap-name">
                      {p.flag} {p.name}
                    </div>
                    <div className="ap-sub">
                      {t("common.age")} {fmt.d(p.age)} · {t("finance.start").toLowerCase()} {p.joined}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="ap-pill" style={{ background: lv.bg, color: lv.fg }}>
                    {t(`levels.${p.level}`)}
                  </span>
                </div>
                <div className="ap-coach-cell">
                  <span className="dot" />
                  {p.coach.split(" ")[0]} {p.coach.split(" ")[1]?.charAt(0) ? p.coach.split(" ")[1].charAt(0) + "." : ""}
                </div>
                <div className="ap-itn">ITN {fmt.d(p.itn)}</div>
                <div className={"ap-trend " + trendCls}>
                  {p.trend > 0 ? "↑" : p.trend < 0 ? "↓" : "→"} {fmt.d(Math.abs(p.trend).toFixed(1))}
                </div>
                <div>
                  <span className="ap-pill" style={{ background: st.bg, color: st.fg }}>{p.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
