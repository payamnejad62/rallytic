"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn, SearchBar } from "@/components/shell";
import { Icon } from "@/components/icon";
import { PERFORMANCE } from "@/lib/coach-extra-data";
import { useLocaleFormat } from "@/lib/use-locale-format";

function scoreColor(v: number) {
  if (v >= 7) return "#A8D847";
  if (v >= 5) return "#F2B544";
  return "#E5685D";
}

function Styles() {
  return (
    <style>{`
.pp-grid{display:grid;grid-template-columns:280px 1fr 320px;gap:14px;align-items:start}
.pp-roster{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px}
.pp-roster-h{display:flex;justify-content:space-between;align-items:center;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:10px}
.pp-roster-search{background:var(--surface3);border:1px solid var(--hairline2);border-radius:8px;padding:7px 10px;font-size:12px;color:var(--fgMute);margin-bottom:8px;display:flex;align-items:center;gap:8px}
.pp-roster-row{display:grid;grid-template-columns:28px 1fr auto;gap:10px;align-items:center;padding:9px 10px;border-radius:10px;cursor:pointer;transition:.15s}
.pp-roster-row:hover{background:var(--surface3)}
.pp-roster-row.on{background:rgba(168,216,71,0.08);border:1px solid var(--accentRing)}
.pp-roster-av{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:10px}
.pp-roster-name{font-size:12.5px;font-weight:700}
.pp-roster-sub{font-size:10px;color:var(--fgMute);margin-top:1px}
.pp-roster-status{font-size:9px;font-weight:800;letter-spacing:.14em;padding:2px 6px;border-radius:4px;text-transform:uppercase;background:rgba(168,216,71,0.10);color:var(--accent)}
.pp-roster-status.trial{background:rgba(125,211,252,0.10);color:#7DD3FC}

.pp-hero{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:22px 24px;display:grid;grid-template-columns:auto 1fr auto;gap:20px;align-items:center}
.pp-hero-av{width:96px;height:96px;border-radius:48px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:2px solid var(--accent);display:grid;place-items:center;color:var(--accent);font-weight:900;font-size:30px;position:relative}
.pp-hero-av::after{content:'';position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;border-radius:9px;background:var(--accent);border:3px solid var(--surface2)}
.pp-hero-meta{font-size:10px;color:var(--fgMute);letter-spacing:.16em;text-transform:uppercase;font-weight:700}
.pp-hero-name{font-size:36px;font-weight:900;letter-spacing:-.025em;margin:6px 0 4px;line-height:1}
.pp-hero-sub{font-size:12px;color:var(--fgDim);display:flex;gap:14px}
.pp-hero-id{font-size:10px;color:var(--fgMute);font-family:'JetBrains Mono',monospace;letter-spacing:.14em}
.pp-hero-actions{display:flex;flex-direction:column;gap:8px;align-items:flex-end}

.pp-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:16px 18px}
.pp-card-h{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center}
.pp-row2{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.pp-info-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px;font-size:13px}
.pp-info-k{font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:2px}
.pp-info-v{font-weight:600;color:var(--fg)}

.pp-level{margin-top:14px}
.pp-level-bar{height:6px;background:var(--surface3);border-radius:3px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:2px}
.pp-level-seg{background:var(--hairline2);border-radius:3px}
.pp-level-seg.on{background:var(--accent)}
.pp-level-labels{display:flex;justify-content:space-between;margin-top:6px;font-size:9.5px;color:var(--fgMute);font-weight:700;letter-spacing:.04em}
.pp-level-labels span.on{color:var(--accent)}

.pp-motivation{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.pp-motiv-row{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;font-size:12px;color:var(--fg)}
.pp-dots{display:flex;gap:3px}
.pp-dot{width:8px;height:8px;border-radius:4px;background:var(--hairline2)}
.pp-dot.on{background:var(--accent)}

.pp-skills-card{padding:16px 18px}
.pp-skills-bars{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
.pp-skill-bar{background:var(--surface3);border:1px solid var(--hairline2);border-radius:10px;padding:9px 12px;cursor:pointer;transition:.15s}
.pp-skill-bar.on{background:rgba(168,216,71,0.10);border-color:var(--accent)}
.pp-skill-bar-k{font-size:11px;color:var(--fgDim);font-weight:700;display:flex;justify-content:space-between;align-items:center}
.pp-skill-bar-v{font-family:'JetBrains Mono',monospace;font-weight:800}
.pp-skill-bar-act{font-size:8px;font-weight:800;letter-spacing:.16em;padding:1px 6px;border-radius:3px;background:var(--accent);color:var(--accentInk)}

.pp-group{margin-top:14px}
.pp-group-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.pp-group-name{font-size:14px;font-weight:800}
.pp-group-avg{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:12px}
.pp-skill-row{display:grid;grid-template-columns:140px 1fr 60px;gap:12px;align-items:center;padding:6px 0}
.pp-skill-label{font-size:12px;color:var(--fgDim)}
.pp-skill-track{height:6px;background:var(--surface3);border-radius:3px;overflow:hidden}
.pp-skill-fill{height:100%;border-radius:3px}
.pp-skill-pill{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;background:var(--surface3);text-align:center}

.pp-overall{padding:20px 18px;text-align:center}
.pp-overall-v{font-family:'JetBrains Mono',monospace;font-size:54px;font-weight:800;color:var(--accent);letter-spacing:-.03em;line-height:1;text-shadow:0 0 24px rgba(168,216,71,0.30)}
.pp-overall-lvl{font-size:13px;color:var(--fg);margin-top:6px;font-weight:600}
.pp-overall-prog{margin-top:12px;height:6px;background:var(--surface3);border-radius:3px;overflow:hidden}
.pp-overall-prog-fill{height:100%;background:var(--accent);width:69%}

.pp-radar{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:16px;display:flex;flex-direction:column;align-items:center;gap:8px}

.pp-trend{padding:16px 18px}
.pp-trend-svg{width:100%;height:140px}

.pp-suggest-row{padding:10px 0;display:flex;gap:10px;align-items:flex-start;border-bottom:1px solid var(--hairline)}
.pp-suggest-row:last-child{border-bottom:none}
.pp-suggest-tag{font-size:9.5px;font-weight:800;letter-spacing:.14em;padding:3px 7px;border-radius:4px;background:var(--accent);color:var(--accentInk);text-transform:uppercase;flex-shrink:0}
.pp-suggest-text{font-size:12px;line-height:1.5;color:var(--fg)}

.pp-strengths-row{display:flex;align-items:center;gap:8px;font-size:12px;padding:5px 0}
.pp-strengths-bubble{padding:3px 8px;border-radius:4px;background:rgba(168,216,71,0.10);color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700}
.pp-needs-bubble{padding:3px 8px;border-radius:4px;background:rgba(229,104,93,0.10);color:#E5685D;font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:700}
`}</style>
  );
}

const ROSTER_PREVIEW = [
  { id: "arman", name: "Arman Rahimi", flag: "🇩🇪", initials: "AR", sub: "Intermediate · ITN 4", status: "Active", on: true },
  { id: "jane", name: "Jane Smith", flag: "🇺🇸", initials: "JS", sub: "Advanced · ITN 6", status: "Active" },
  { id: "mike", name: "Mike Karimi", flag: "🇮🇷", initials: "MK", sub: "Beginner · ITN 2", status: "Active" },
  { id: "lena", name: "Lena Vogel", flag: "🇩🇪", initials: "LV", sub: "Advanced · ITN 5", status: "Trial", trial: true },
  { id: "omar", name: "Omar Haddad", flag: "🇪🇬", initials: "OH", sub: "Intermediate · ITN 4", status: "Active" },
  { id: "sara", name: "Sara Lindqvist", flag: "🇸🇪", initials: "SL", sub: "Professional · ITN 8", status: "Active" },
];

function RadarSvg({ data }: { data: { k: string; v: number }[] }) {
  const cx = 130;
  const cy = 130;
  const r = 90;
  const n = data.length;
  const angles = data.map((_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);
  const points = data.map((p, i) => {
    const rad = (p.v / 10) * r;
    return [cx + Math.cos(angles[i]) * rad, cy + Math.sin(angles[i]) * rad];
  });
  const rings = [0.25, 0.5, 0.75, 1].map((m) => {
    const pts = angles.map((a) => {
      const rad = m * r;
      return [cx + Math.cos(a) * rad, cy + Math.sin(a) * rad];
    });
    return pts.map((p) => p.join(",")).join(" ");
  });
  return (
    <svg viewBox="0 0 260 260" width="240" height="240">
      {rings.map((p, i) => (
        <polygon key={i} points={p} fill="none" stroke="rgba(168,216,71,0.10)" strokeWidth="1" />
      ))}
      {angles.map((a, i) => (
        <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="rgba(168,216,71,0.08)" />
      ))}
      <polygon points={points.map((p) => p.join(",")).join(" ")} fill="rgba(168,216,71,0.25)" stroke="#A8D847" strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#A8D847" />
      ))}
      {data.map((d, i) => {
        const a = angles[i];
        const lx = cx + Math.cos(a) * (r + 16);
        const ly = cy + Math.sin(a) * (r + 16);
        return (
          <text key={d.k} x={lx} y={ly} fill="#A8D847" fontSize="10" fontWeight="700" textAnchor="middle" dominantBaseline="middle">
            {d.k} {d.v}
          </text>
        );
      })}
    </svg>
  );
}

function TrendSvg({ data }: { data: { name: string; values: number[]; color: string }[] }) {
  const months = PERFORMANCE.trend.months;
  const width = 460;
  const height = 140;
  const pad = { l: 8, r: 8, t: 10, b: 18 };
  const min = 4;
  const max = 9;
  const stepX = (width - pad.l - pad.r) / (months.length - 1);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {data.map((line) => {
        const d = line.values
          .map((v, i) => {
            const x = pad.l + i * stepX;
            const y = pad.t + ((max - v) / (max - min)) * (height - pad.t - pad.b);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");
        return <path key={line.name} d={d} fill="none" stroke={line.color} strokeWidth="2" />;
      })}
      {months.map((m, i) => (
        <text key={m} x={pad.l + i * stepX} y={height - 4} fill="#5E6B5E" fontSize="9" fontWeight="700" textAnchor="middle">
          {m}
        </text>
      ))}
    </svg>
  );
}

export default function PerformancePage() {
  const t = useTranslations();
  const [tab, setTab] = useState<"profile" | "performance">("performance");
  const [activeSkill, setActiveSkill] = useState("Technical");
  const fmt = useLocaleFormat();
  const p = PERFORMANCE.player;
  const groups = PERFORMANCE.groups.Technical;

  return (
    <>
      <Topbar
        title={t("performance.title")}
        breadcrumb={[{ label: t("crumb.roster") }, { label: `${p.first} ${p.last}` }]}
        actions={
          <>
            <SearchBar />
            <GhostBtn icon="user-plus">{t("dashboard.newPlayer")}</GhostBtn>
            <GhostBtn icon="file-type-pdf">{t("common.exportPdf")}</GhostBtn>
            <PrimaryBtn icon="device-floppy">{t("common.saveChanges")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="r-tabs" style={{ marginBottom: 14 }}>
          <button className={"r-tab " + (tab === "profile" ? "on" : "")} onClick={() => setTab("profile")}>
            <Icon name="id-badge-2" /> {t("performance.tabProfile")}
          </button>
          <button className={"r-tab " + (tab === "performance" ? "on" : "")} onClick={() => setTab("performance")}>
            <Icon name="chart-radar" /> {t("performance.tabPerformance")}
          </button>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, color: "var(--fgMute)", fontSize: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "var(--accent)" }} />
            {t("common.autoSaved")} · 2 min ago
          </div>
        </div>

        {tab === "profile" && (
          <div className="pp-grid">
            <div className="pp-roster">
              <div className="pp-roster-h">
                <span>{t("crumb.roster")}</span>
                <span style={{ color: "var(--fgMute)" }}>{ROSTER_PREVIEW.length} {t("common.players")}</span>
              </div>
              <div className="pp-roster-search">
                <Icon name="search" />
                <span>{t("common.search")} player…</span>
              </div>
              {ROSTER_PREVIEW.map((r) => (
                <div key={r.id} className={"pp-roster-row" + (r.on ? " on" : "")}>
                  <div className="pp-roster-av">{r.initials}</div>
                  <div>
                    <div className="pp-roster-name">
                      {r.flag} {r.name}
                    </div>
                    <div className="pp-roster-sub">{r.sub}</div>
                  </div>
                  <span className={"pp-roster-status" + (r.trial ? " trial" : "")}>{r.status}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="pp-hero">
                <div className="pp-hero-av">{p.initials}</div>
                <div>
                  <div className="pp-hero-meta">
                    {p.flag.toUpperCase()} {p.country} · <span style={{ color: "var(--accent)" }}>ACTIVE</span>
                  </div>
                  <div className="pp-hero-name">
                    {p.first} {p.last}
                  </div>
                  <div className="pp-hero-sub">
                    <span>{fmt.d(p.age)} yrs</span>
                    <span>{p.hand}-handed</span>
                    <span>{p.eye} eye</span>
                  </div>
                  <div className="pp-hero-id">PLAYER ID {p.playerId}</div>
                </div>
                <div className="pp-hero-actions">
                  <GhostBtn icon="edit">{t("performance.edit")}</GhostBtn>
                  <GhostBtn icon="archive">{t("performance.archive")}</GhostBtn>
                  <button className="r-btn" style={{ background: "var(--weak)", color: "#fff", padding: "7px 14px" }}>
                    <Icon name="trash" /> {t("performance.delete")}
                  </button>
                </div>
              </div>

              <div className="pp-row2">
                <div className="pp-card">
                  <div className="pp-card-h">{t("performance.physical")}</div>
                  <div className="pp-info-grid">
                    <div>
                      <div className="pp-info-k">Height</div>
                      <div className="pp-info-v">{fmt.d(p.height)} cm</div>
                    </div>
                    <div>
                      <div className="pp-info-k">Weight</div>
                      <div className="pp-info-v">{fmt.d(p.weight)} kg</div>
                    </div>
                    <div>
                      <div className="pp-info-k">{t("common.age")}</div>
                      <div className="pp-info-v">{fmt.d(p.age)}</div>
                    </div>
                    <div>
                      <div className="pp-info-k">Gender</div>
                      <div className="pp-info-v">{p.gender}</div>
                    </div>
                    <div>
                      <div className="pp-info-k">Date of birth</div>
                      <div className="pp-info-v">{p.dob}</div>
                    </div>
                  </div>
                  <div className="pp-level">
                    <div className="pp-info-k">{t("common.level").toUpperCase()}</div>
                    <div className="pp-level-bar">
                      {p.levelTrack.map((lv, i) => (
                        <div key={lv} className={"pp-level-seg" + (i <= 1 ? " on" : "")} />
                      ))}
                    </div>
                    <div className="pp-level-labels">
                      {p.levelTrack.map((lv) => (
                        <span key={lv} className={lv === p.level ? "on" : ""}>
                          {t(`levels.${lv}`)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pp-card">
                  <div className="pp-card-h">{t("performance.identity")}</div>
                  <div className="pp-info-grid">
                    <div>
                      <div className="pp-info-k">First name</div>
                      <div className="pp-info-v">{p.first}</div>
                    </div>
                    <div>
                      <div className="pp-info-k">Last name</div>
                      <div className="pp-info-v">{p.last}</div>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <div className="pp-info-k">Mobile</div>
                      <div className="pp-info-v">{p.mobile}</div>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <div className="pp-info-k">Email</div>
                      <div className="pp-info-v">{p.email}</div>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <div className="pp-info-k">Address</div>
                      <div className="pp-info-v">{p.address}</div>
                    </div>
                    <div>
                      <div className="pp-info-k">National ID</div>
                      <div className="pp-info-v">{p.natId}</div>
                    </div>
                    <div>
                      <div className="pp-info-k">Nationality</div>
                      <div className="pp-info-v">{p.flag} {p.nationality}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="pp-card">
                <div className="pp-card-h">
                  <span>{t("performance.motivation")}</span>
                  <span style={{ color: "var(--accent)" }}>{t("performance.addPriority")}</span>
                </div>
                <div className="pp-motivation">
                  {PERFORMANCE.motivation.map((m) => (
                    <div className="pp-motiv-row" key={m.k}>
                      <span>{m.k}</span>
                      <span className="pp-dots">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={"pp-dot" + (n <= m.v ? " on" : "")} />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pp-card" style={{ marginTop: 14 }}>
                <div className="pp-card-h">{t("performance.coachNarrative")}</div>
                <div style={{ fontSize: 12.5, color: "var(--fgDim)", lineHeight: 1.6 }}>
                  {PERFORMANCE.motivationNote}
                </div>
              </div>

              <div className="pp-card" style={{ marginTop: 14 }}>
                <div className="pp-card-h">{t("performance.coachNotes")}</div>
                <div style={{ fontSize: 12.5, color: "var(--fgDim)", lineHeight: 1.6 }}>
                  {PERFORMANCE.coachNote}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "performance" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>
            <div>
              <div className="pp-card pp-skills-card">
                <div className="pp-skills-bars">
                  {(["Technical", "Tactical", "Mental", "Physical"] as const).map((skill) => {
                    const v = PERFORMANCE.skills[skill];
                    const on = activeSkill === skill;
                    return (
                      <button
                        key={skill}
                        type="button"
                        className={"pp-skill-bar" + (on ? " on" : "")}
                        onClick={() => setActiveSkill(skill)}
                      >
                        <div className="pp-skill-bar-k">
                          <span>{skill}</span>
                          {on ? <span className="pp-skill-bar-act">ACTIVE</span> : <span style={{ fontSize: 9, color: "var(--fgMute)", letterSpacing: ".16em" }}>VIEW</span>}
                        </div>
                        <div className="pp-skill-bar-v" style={{ color: scoreColor(v), marginTop: 6, fontSize: 22 }}>
                          {fmt.d(v.toFixed(1))}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pp-card-h">
                  <span>{t("performance.technicalSkill")}</span>
                  <span>
                    {t("performance.categoryAvg")} <span style={{ color: scoreColor(7.2), marginLeft: 6 }}>{fmt.d("7.2")}</span>
                  </span>
                </div>

                {groups.slice(0, 2).map((g) => (
                  <div className="pp-group" key={g.name}>
                    <div className="pp-group-h">
                      <span className="pp-group-name">{g.name}</span>
                      <span className="pp-group-avg" style={{ color: scoreColor(g.avg) }}>
                        AVG {fmt.d(g.avg.toFixed(1))}
                      </span>
                    </div>
                    {g.subs.map((s) => (
                      <div key={s.k} className="pp-skill-row">
                        <span className="pp-skill-label">{s.k}</span>
                        <div className="pp-skill-track">
                          <div className="pp-skill-fill" style={{ width: `${(s.v / 10) * 100}%`, background: scoreColor(s.v) }} />
                        </div>
                        <span className="pp-skill-pill" style={{ color: scoreColor(s.v) }}>
                          {fmt.d(s.v.toFixed(1))}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 12 }}>
                  {groups.slice(2).map((g) => (
                    <div key={g.name}>
                      <div className="pp-group-h">
                        <span className="pp-group-name">{g.name}</span>
                        <span className="pp-group-avg" style={{ color: scoreColor(g.avg) }}>
                          AVG {fmt.d(g.avg.toFixed(1))}
                        </span>
                      </div>
                      {g.subs.map((s) => (
                        <div key={s.k} className="pp-skill-row">
                          <span className="pp-skill-label">{s.k}</span>
                          <div className="pp-skill-track">
                            <div className="pp-skill-fill" style={{ width: `${(s.v / 10) * 100}%`, background: scoreColor(s.v) }} />
                          </div>
                          <span className="pp-skill-pill" style={{ color: scoreColor(s.v) }}>
                            {fmt.d(s.v.toFixed(1))}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pp-card" style={{ marginTop: 14 }}>
                <div className="pp-card-h">
                  <span>{t("performance.smartSuggestions")}</span>
                  <span style={{ background: "var(--accentBg)", padding: "3px 7px", borderRadius: 4, color: "var(--accent)" }}>BETA</span>
                </div>
                {PERFORMANCE.smartSuggestions.map((s, i) => (
                  <div className="pp-suggest-row" key={i}>
                    <div className="pp-suggest-tag">{s.tag}</div>
                    <div className="pp-suggest-text">{s.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="pp-card pp-overall">
                <div className="pp-card-h" style={{ justifyContent: "center" }}>
                  {t("performance.overall")}
                </div>
                <div className="pp-overall-v">{fmt.d(PERFORMANCE.overall.avg.toFixed(1))}</div>
                <div style={{ fontSize: 10, color: "var(--fgMute)", letterSpacing: ".16em", fontWeight: 700 }}>OF 10</div>
                <div className="pp-overall-lvl">{PERFORMANCE.overall.label}</div>
                <div className="pp-overall-prog">
                  <div className="pp-overall-prog-fill" />
                </div>
                <div style={{ fontSize: 10, color: "var(--fgMute)", marginTop: 4 }}>
                  +{fmt.d(PERFORMANCE.overall.toNext.toFixed(1))} to Advanced
                </div>
              </div>

              <div className="pp-radar">
                <div className="pp-card-h" style={{ width: "100%", margin: 0 }}>
                  <span>{t("performance.performanceRadar")}</span>
                  <span style={{ background: "var(--accent)", color: "var(--accentInk)", padding: "3px 7px", borderRadius: 4 }}>{t("performance.current")}</span>
                </div>
                <RadarSvg data={PERFORMANCE.radar} />
              </div>

              <div className="pp-card pp-trend">
                <div className="pp-card-h">
                  <span>{t("performance.monthTrend")}</span>
                  <span style={{ color: "#7DD3FC", fontFamily: "'JetBrains Mono', monospace" }}>
                    Tactical {fmt.d("5.8")}
                  </span>
                </div>
                <TrendSvg
                  data={[
                    { name: "Technical", values: PERFORMANCE.trend.technical, color: "#A8D847" },
                    { name: "Tactical", values: PERFORMANCE.trend.tactical, color: "#7DD3FC" },
                    { name: "Mental", values: PERFORMANCE.trend.mental, color: "#F2B544" },
                    { name: "Physical", values: PERFORMANCE.trend.physical, color: "#E5685D" },
                  ]}
                />
              </div>

              <div className="pp-card">
                <div className="pp-card-h">{t("performance.strengthsNeeds")}</div>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 10, color: "var(--good)", letterSpacing: ".16em", fontWeight: 800, marginBottom: 6 }}>
                    {t("performance.strengths").toUpperCase()}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {PERFORMANCE.strengths.map((s) => (
                      <span key={s.k} className="pp-strengths-bubble">
                        {s.k} {fmt.d(s.v.toFixed(1))}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "var(--weak)", letterSpacing: ".16em", fontWeight: 800, marginBottom: 6 }}>
                    {t("performance.needsWork").toUpperCase()}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {PERFORMANCE.needsWork.map((s) => (
                      <span key={s.k} className="pp-needs-bubble">
                        {s.k} {fmt.d(s.v.toFixed(1))}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
