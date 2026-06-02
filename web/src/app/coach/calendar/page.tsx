"use client";

import { useState } from "react";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import {
  CAL_EVENTS,
  CAL_NOTIFICATIONS,
  CAL_UPCOMING,
  CAL_WORKLOAD,
  EVENT_TYPES,
} from "@/lib/calendar-data";

const TONE_FG: Record<string, string> = {
  good: "#A8D847",
  med: "#F2B544",
  weak: "#E5685D",
  info: "#7DD3FC",
  warn: "#F2B544",
};

function Styles() {
  return (
    <style>{`
.cal-grid{display:grid;grid-template-columns:1fr 320px;gap:14px;align-items:start}
.cal-top{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px}
.cal-types{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:11px;color:var(--fgMute)}
.cal-types .h{letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-right:6px}
.cal-type{display:inline-flex;align-items:center;gap:6px;padding:3px 8px;border-radius:4px;background:var(--surface2);border:1px solid var(--hairline2);font-size:11px;color:var(--fgDim)}
.cal-type .dot{width:8px;height:8px;border-radius:4px}

.cal-legend{display:inline-flex;align-items:center;gap:8px;font-size:10.5px;color:var(--fgMute);font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.cal-conflict-pip{width:8px;height:8px;border-radius:4px;background:var(--weak)}
.cal-recurring-pip{width:8px;height:8px;border-radius:4px;background:var(--med)}

.cal-table{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.cal-week-h{display:grid;grid-template-columns:repeat(7,1fr);padding:10px 0;background:linear-gradient(180deg,#0c100c,#0a0d0a);border-bottom:1px solid var(--hairline)}
.cal-week-h div{text-align:center;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.cal-month{display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:minmax(108px,auto)}
.cal-day{border-right:1px solid var(--hairline);border-bottom:1px solid var(--hairline);padding:6px 8px;display:flex;flex-direction:column;gap:3px;min-height:108px;cursor:pointer;transition:.15s}
.cal-day:hover{background:rgba(168,216,71,0.02)}
.cal-day.dim{background:#0a0d0a;color:var(--fgMute)}
.cal-day.today{background:rgba(168,216,71,0.08);outline:1px solid var(--accentRing);outline-offset:-1px}
.cal-day-n{font-size:13px;font-weight:700;font-family:'JetBrains Mono',ui-monospace,monospace;color:var(--fg)}
.cal-day.today .cal-day-n{color:var(--accent)}
.cal-day-evt{font-size:10px;padding:3px 6px;border-radius:4px;background:rgba(168,216,71,0.10);color:var(--fg);font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-left:3px solid var(--accent);display:flex;align-items:center;gap:4px}
.cal-day-more{font-size:9.5px;color:var(--fgMute);font-weight:700;padding-left:3px}

.cal-side{display:flex;flex-direction:column;gap:14px}
.cal-side-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.cal-side-h{padding:12px 16px;border-bottom:1px solid var(--hairline);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700;display:flex;justify-content:space-between;align-items:center}
.cal-notif-row{display:grid;grid-template-columns:24px 1fr auto;gap:10px;padding:10px 16px;border-bottom:1px solid var(--hairline);align-items:flex-start;font-size:12px}
.cal-notif-row:last-child{border-bottom:none}
.cal-notif-text{color:var(--fg);line-height:1.4}
.cal-notif-when{font-size:10px;color:var(--fgMute);font-family:'JetBrains Mono',ui-monospace,monospace}

.cal-today-list{padding:8px 0}
.cal-today-evt{display:grid;grid-template-columns:60px 1fr;gap:8px;padding:8px 16px;font-size:12px;border-left:3px solid transparent;align-items:center}
.cal-today-time{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;font-weight:700}
.cal-today-evt strong{font-size:12.5px;display:block;font-weight:600;color:var(--fg)}
.cal-today-evt small{font-size:10px;color:var(--fgMute)}

.cal-work-row{display:grid;grid-template-columns:80px 1fr 50px;gap:10px;align-items:center;padding:7px 16px}
.cal-work-name{font-size:12px;color:var(--fg)}
.cal-work-bar{height:7px;background:var(--surface3);border-radius:3px;overflow:hidden}
.cal-work-fill{height:100%;border-radius:3px}
.cal-work-h{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;font-weight:700;text-align:right;color:var(--fgDim)}
.cal-warn-note{padding:8px 14px;color:var(--weak);font-size:11px;font-weight:600;background:rgba(229,104,93,0.06);border-top:1px solid var(--hairline)}

.cal-up-row{display:grid;grid-template-columns:50px 1fr;gap:10px;padding:10px 16px;border-bottom:1px solid var(--hairline);align-items:center}
.cal-up-row:last-child{border-bottom:none}
.cal-up-date{text-align:center;background:var(--surface3);border:1px solid var(--hairline2);border-radius:8px;padding:5px}
.cal-up-day{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:18px;font-weight:800;line-height:1}
.cal-up-mon{font-size:9px;color:var(--fgMute);letter-spacing:.14em;margin-top:2px;font-weight:700}
.cal-up-title{font-size:12.5px;color:var(--fg);font-weight:600}
.cal-up-meta{font-size:10px;color:var(--fgMute);margin-top:2px}
`}</style>
  );
}

const TODAY = { y: 2026, m: 4, d: 14 };
const MONTH_LABEL = "May 2026";

function buildCells() {
  const y = TODAY.y;
  const m = TODAY.m;
  const first = new Date(y, m, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: { y: number; m: number; d: number; dim: boolean }[] = [];
  for (let i = 0; i < startWeekday; i++) {
    const date = new Date(y, m, -startWeekday + i + 1);
    cells.push({ y: date.getFullYear(), m: date.getMonth(), d: date.getDate(), dim: true });
  }
  for (let d = 1; d <= daysInMonth; d++) cells.push({ y, m, d, dim: false });
  while (cells.length % 7 !== 0) {
    const date = new Date(y, m + 1, cells.length - (startWeekday + daysInMonth) + 1);
    cells.push({ y: date.getFullYear(), m: date.getMonth(), d: date.getDate(), dim: true });
  }
  return cells;
}

export default function CalendarPage() {
  const [view, setView] = useState<"Month" | "Week" | "Day">("Month");
  const cells = buildCells();

  function eventsFor(y: number, m: number, d: number) {
    const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    return CAL_EVENTS.filter((e) => e.date === key);
  }

  const todays = eventsFor(TODAY.y, TODAY.m, TODAY.d);

  return (
    <>
      <Topbar
        title="Calendar"
        breadcrumb={[{ label: "Workspace" }, { label: "Week of May 10" }]}
        actions={
          <>
            <GhostBtn icon="chevron-left">&nbsp;</GhostBtn>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "var(--fg)",
                padding: "0 12px",
                fontWeight: 700,
              }}
            >
              {MONTH_LABEL}
            </div>
            <GhostBtn icon="chevron-right">&nbsp;</GhostBtn>
            <GhostBtn>Today</GhostBtn>
            <div className="r-seg">
              {(["Month", "Week", "Day"] as const).map((v) => (
                <button key={v} className={view === v ? "on" : ""} onClick={() => setView(v)}>
                  {v}
                </button>
              ))}
            </div>
            <GhostBtn icon="file-export">Export</GhostBtn>
            <PrimaryBtn icon="calendar-plus">Add event</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="cal-top">
          <div className="cal-types">
            <span className="h">Types</span>
            {EVENT_TYPES.map((t) => (
              <span className="cal-type" key={t.k}>
                <span className="dot" style={{ background: t.color }} />
                {t.label}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span className="cal-legend">
              <span className="cal-conflict-pip" /> Conflict
            </span>
            <span className="cal-legend">
              <span className="cal-recurring-pip" /> Recurring
            </span>
          </div>
        </div>

        <div className="cal-grid">
          <div className="cal-table">
            <div className="cal-week-h">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="cal-month">
              {cells.map((c, i) => {
                const evts = eventsFor(c.y, c.m, c.d);
                const isToday = c.y === TODAY.y && c.m === TODAY.m && c.d === TODAY.d && !c.dim;
                return (
                  <div
                    key={i}
                    className={"cal-day" + (c.dim ? " dim" : "") + (isToday ? " today" : "")}
                  >
                    <div className="cal-day-n">{c.d}</div>
                    {evts.slice(0, 3).map((e) => {
                      const ec = EVENT_TYPES.find((t) => t.k === e.type)!.color;
                      return (
                        <div
                          key={e.id}
                          className="cal-day-evt"
                          style={{
                            borderLeftColor: ec,
                            background: `${ec}1A`,
                            color: "var(--fg)",
                          }}
                        >
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: ec }}>
                            {e.time}
                          </span>{" "}
                          {e.title}
                          {e.conflict && (
                            <span className="cal-conflict-pip" style={{ marginLeft: "auto" }} />
                          )}
                        </div>
                      );
                    })}
                    {evts.length > 3 && (
                      <div className="cal-day-more">+ {evts.length - 3} more</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="cal-side">
            <div className="cal-side-card">
              <div className="cal-side-h">
                Notifications
                <span
                  style={{
                    background: "var(--weak)",
                    color: "#fff",
                    borderRadius: 999,
                    minWidth: 18,
                    height: 18,
                    display: "inline-grid",
                    placeItems: "center",
                    fontSize: 10,
                    padding: "0 5px",
                  }}
                >
                  4
                </span>
              </div>
              {CAL_NOTIFICATIONS.map((n, i) => (
                <div className="cal-notif-row" key={i}>
                  <Icon name={n.icon} style={{ color: TONE_FG[n.tone] }} />
                  <div className="cal-notif-text">{n.text}</div>
                  <div className="cal-notif-when">{n.when}</div>
                </div>
              ))}
            </div>

            <div className="cal-side-card">
              <div className="cal-side-h">
                Today · Thu, May 14
                <span style={{ color: "var(--fgMute)", letterSpacing: 0, fontSize: 11 }}>
                  {todays.length} events
                </span>
              </div>
              <div className="cal-today-list">
                {todays.map((e) => {
                  const ec = EVENT_TYPES.find((t) => t.k === e.type)!.color;
                  return (
                    <div
                      key={e.id}
                      className="cal-today-evt"
                      style={{ borderLeftColor: ec }}
                    >
                      <div className="cal-today-time" style={{ color: ec }}>
                        {e.time}
                      </div>
                      <div>
                        <strong>● {e.title}</strong>
                        <small>
                          {e.player} · {e.loc}
                        </small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="cal-side-card">
              <div className="cal-side-h">
                Weekly workload
                <span style={{ color: "var(--fgMute)", letterSpacing: 0, fontSize: 11 }}>
                  by player · max 10 h
                </span>
              </div>
              <div style={{ padding: "8px 0" }}>
                {CAL_WORKLOAD.map((w) => (
                  <div key={w.name} className="cal-work-row">
                    <div className="cal-work-name">{w.name}</div>
                    <div className="cal-work-bar">
                      <div
                        className="cal-work-fill"
                        style={{ width: `${(w.hours / 10) * 100}%`, background: w.color }}
                      />
                    </div>
                    <div className="cal-work-h">
                      {w.hours} h {w.warn && "⚠"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="cal-warn-note">
                ⚠ Sara H. may be overloaded — consider rebalancing
              </div>
            </div>

            <div className="cal-side-card">
              <div className="cal-side-h">Upcoming highlights</div>
              {CAL_UPCOMING.map((u) => (
                <div className="cal-up-row" key={u.day}>
                  <div className="cal-up-date">
                    <div className="cal-up-day" style={{ color: u.color }}>
                      {u.day}
                    </div>
                    <div className="cal-up-mon">{u.mon}</div>
                  </div>
                  <div>
                    <div className="cal-up-title">{u.title}</div>
                    <div className="cal-up-meta">{u.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
