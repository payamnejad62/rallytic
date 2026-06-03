"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { ROSTER, type RosterPlayer } from "@/lib/coach-data";
import { useLocaleFormat } from "@/lib/use-locale-format";

const LEVELS: ("All" | RosterPlayer["level"])[] = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "Professional",
];

const LEVEL_TONES: Record<RosterPlayer["level"], string> = {
  Beginner: "info",
  Intermediate: "med",
  Advanced: "good",
  Professional: "good",
};

const TONE_BG: Record<string, string> = {
  good: "rgba(168,216,71,0.10)",
  med: "rgba(242,181,68,0.10)",
  weak: "rgba(229,104,93,0.10)",
  info: "rgba(125,211,252,0.10)",
};
const TONE_FG: Record<string, string> = {
  good: "#A8D847",
  med: "#F2B544",
  weak: "#E5685D",
  info: "#7DD3FC",
};

function Styles() {
  return (
    <style>{`
.rst-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.rst-kpi{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:14px}
.rst-kpi-ic{width:40px;height:40px;border-radius:10px;display:grid;place-items:center;font-size:18px;border:1px solid var(--hairline2)}
.rst-kpi-k{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.rst-kpi-v{font-size:24px;font-weight:800;letter-spacing:-.02em;margin-top:4px;font-family:'JetBrains Mono',ui-monospace,monospace}
.rst-kpi-sub{font-size:11px;font-weight:600;margin-left:6px}

.rst-tools{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.rst-search{flex:1;display:flex;align-items:center;gap:8px;padding:8px 12px;background:var(--surface3);border:1px solid var(--hairline2);border-radius:10px;min-width:240px}
.rst-search input{background:transparent;border:none;outline:none;color:var(--fg);font-family:inherit;font-size:13px;flex:1}
.rst-search input::placeholder{color:var(--fgMute)}
.rst-count-badge{font-size:10px;font-weight:700;color:var(--fgMute);padding:3px 8px;background:var(--surface2);border:1px solid var(--hairline2);border-radius:6px;font-family:'JetBrains Mono',ui-monospace,monospace}
.rst-chip{padding:7px 14px;border-radius:10px;border:1px solid var(--hairline2);background:transparent;color:var(--fgDim);font-family:inherit;font-size:12px;font-weight:700;cursor:pointer;transition:.15s}
.rst-chip:hover{color:var(--fg)}
.rst-chip.on{background:var(--accent);color:var(--accentInk);border-color:transparent}
.rst-fab{width:36px;height:36px;border-radius:10px;border:1px solid var(--accentRing);background:var(--accentBg);color:var(--accent);display:grid;place-items:center;cursor:pointer;font-size:16px}

.rst-table{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.rst-th,.rst-tr{display:grid;grid-template-columns:48px 2fr 1fr 0.8fr 0.9fr 1fr 0.8fr;align-items:center;gap:12px;padding:12px 18px}
.rst-th{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;border-bottom:1px solid var(--hairline);background:linear-gradient(180deg,#0c100c,#0a0d0a)}
.rst-tr{border-bottom:1px solid var(--hairline);font-size:13px;cursor:pointer;transition:.15s}
.rst-tr:last-child{border-bottom:none}
.rst-tr:hover{background:rgba(168,216,71,0.04)}
.rst-num{font-family:'JetBrains Mono',ui-monospace,monospace;color:var(--fgMute);font-size:11px}
.rst-player{display:flex;align-items:center;gap:12px}
.rst-av{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#1d2a1d 0%,#2a3a2a 100%);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:11px;flex-shrink:0}
.rst-name{font-weight:700;color:var(--fg)}
.rst-sub{font-size:10px;color:var(--fgMute);margin-top:2px;display:flex;align-items:center;gap:5px}
.rst-pill{display:inline-block;padding:4px 10px;border-radius:4px;font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}
.rst-itn{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;font-weight:700;color:var(--accent)}
.rst-matches{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12.5px;color:var(--fg)}
.rst-matches em{font-style:normal;color:var(--fgMute);margin:0 6px}
.rst-trend{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;font-weight:700}
.rst-trend.up{color:var(--good)}
.rst-trend.dn{color:var(--weak)}
.rst-trend.flat{color:var(--fgMute)}

.rst-foot{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;border-top:1px solid var(--hairline);font-size:12px;color:var(--fgMute)}
.rst-pages{display:flex;gap:4px}
.rst-page{width:30px;height:30px;border-radius:8px;border:1px solid var(--hairline2);background:transparent;color:var(--fgDim);font-family:inherit;cursor:pointer;font-size:12px;font-weight:700}
.rst-page.on{background:var(--accent);color:var(--accentInk);border-color:transparent}
`}</style>
  );
}

export default function PlayersRosterPage() {
  const locale = useLocale();
  const t = useTranslations();
  const fmt = useLocaleFormat();
  const [q, setQ] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let out = ROSTER;
    if (level !== "All") out = out.filter((p) => p.level === level);
    if (q.trim()) {
      const qq = q.trim().toLowerCase();
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(qq) || p.focus.toLowerCase().includes(qq)
      );
    }
    return out;
  }, [q, level]);

  const active = ROSTER.filter((p) => p.status === "Active").length;
  const flagged = ROSTER.filter((p) => p.status === "Flag").length;
  const avgItn = (ROSTER.reduce((a, b) => a + b.itn, 0) / ROSTER.length).toFixed(1);

  return (
    <>
      <Topbar
        title={t("players.title")}
        breadcrumb={[{ label: t("crumb.workspace"), dim: true }, { label: t("crumb.roster") }]}
        actions={
          <>
            <GhostBtn icon="adjustments-horizontal">{t("common.filters")}</GhostBtn>
            <GhostBtn icon="file-spreadsheet">{t("common.exportCsv")}</GhostBtn>
            <Link href={`/${locale}/coach`} style={{ textDecoration: "none" }}>
              <PrimaryBtn icon="user-plus">{t("players.newPlayer")}</PrimaryBtn>
            </Link>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="rst-kpis">
          <div className="rst-kpi">
            <div className="rst-kpi-ic" style={{ background: "rgba(168,216,71,0.10)", color: "#A8D847" }}>
              <Icon name="users" />
            </div>
            <div>
              <div className="rst-kpi-k">{t("players.kpis.total")}</div>
              <div className="rst-kpi-v">
                {fmt.d(ROSTER.length)}
                <span className="rst-kpi-sub" style={{ color: "#A8D847" }}>
                  {t("players.subTotal")}
                </span>
              </div>
            </div>
          </div>
          <div className="rst-kpi">
            <div className="rst-kpi-ic" style={{ background: "rgba(168,216,71,0.10)", color: "#A8D847" }}>
              <Icon name="user-check" />
            </div>
            <div>
              <div className="rst-kpi-k">{t("players.kpis.active")}</div>
              <div className="rst-kpi-v">
                {fmt.d(active)}
                <span className="rst-kpi-sub" style={{ color: "#A8D847" }}>
                  {fmt.d(Math.round((active / ROSTER.length) * 100))}%
                </span>
              </div>
            </div>
          </div>
          <div className="rst-kpi">
            <div className="rst-kpi-ic" style={{ background: "rgba(229,104,93,0.10)", color: "#E5685D" }}>
              <Icon name="alert-triangle" />
            </div>
            <div>
              <div className="rst-kpi-k">{t("players.kpis.needsAttention")}</div>
              <div className="rst-kpi-v">
                {fmt.d(flagged)}
                <span className="rst-kpi-sub" style={{ color: "#E5685D" }}>
                  {t("players.subFlagged")}
                </span>
              </div>
            </div>
          </div>
          <div className="rst-kpi">
            <div className="rst-kpi-ic" style={{ background: "rgba(242,181,68,0.10)", color: "#F2B544" }}>
              <Icon name="chart-bar" />
            </div>
            <div>
              <div className="rst-kpi-k">{t("players.kpis.avgItn")}</div>
              <div className="rst-kpi-v">
                {fmt.d(avgItn)}
                <span className="rst-kpi-sub" style={{ color: "#A8D847" }}>
                  {t("players.subYoy")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rst-tools">
          <div className="rst-search">
            <Icon name="search" style={{ color: "var(--fgMute)" }} />
            <input
              placeholder="Search by name, focus, country…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
            <span className="rst-count-badge">{filtered.length}</span>
          </div>
          {LEVELS.map((lv) => (
            <button
              key={lv}
              type="button"
              className={"rst-chip" + (level === lv ? " on" : "")}
              onClick={() => {
                setLevel(lv);
                setPage(1);
              }}
            >
              {lv}
            </button>
          ))}
          <button type="button" className="rst-fab" aria-label="Add view">
            <Icon name="plus" />
          </button>
        </div>

        <div className="rst-table">
          <div className="rst-th">
            <div>#</div>
            <div>Player</div>
            <div>Level</div>
            <div>ITN</div>
            <div>M · Win</div>
            <div>Trend</div>
            <div>Status</div>
          </div>
          {filtered.map((p) => {
            const tone = LEVEL_TONES[p.level];
            const statusTone =
              p.status === "Active"
                ? { bg: "rgba(168,216,71,0.10)", fg: "#A8D847" }
                : p.status === "Flag"
                  ? { bg: "rgba(229,104,93,0.10)", fg: "#E5685D" }
                  : { bg: "rgba(125,211,252,0.10)", fg: "#7DD3FC" };
            const trendCls =
              p.trend > 0 ? "up" : p.trend < 0 ? "dn" : "flat";
            return (
              <div className="rst-tr" key={p.id}>
                <div className="rst-num">{p.num}</div>
                <div className="rst-player">
                  <div className="rst-av">{p.initials}</div>
                  <div>
                    <div className="rst-name">
                      {p.flag} {p.name}
                    </div>
                    <div className="rst-sub">
                      age {p.age} · {p.focus}
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    className="rst-pill"
                    style={{ background: TONE_BG[tone], color: TONE_FG[tone] }}
                  >
                    {p.level}
                  </span>
                </div>
                <div className="rst-itn">ITN {p.itn}</div>
                <div className="rst-matches">
                  {p.matches} <em>·</em> {p.winRate}%
                </div>
                <div className={"rst-trend " + trendCls}>
                  {p.trend > 0 ? "↑" : p.trend < 0 ? "↓" : "→"}{" "}
                  {Math.abs(p.trend).toFixed(1)}
                </div>
                <div>
                  <span
                    className="rst-pill"
                    style={{ background: statusTone.bg, color: statusTone.fg }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="rst-foot">
            <div>
              Showing <strong style={{ color: "var(--fg)" }}>{filtered.length}</strong> of{" "}
              {ROSTER.length} players
            </div>
            <div className="rst-pages">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={"rst-page" + (page === n ? " on" : "")}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
