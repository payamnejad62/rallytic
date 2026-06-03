"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";
import { ACAD_EVAL_HISTORY } from "@/lib/academy-extra-data";
import { useLocaleFormat } from "@/lib/use-locale-format";

function Styles() {
  return (
    <style>{`
.eh-chart-card{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:20px}
.eh-chart-h{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px}
.eh-chart-t{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700}
.eh-chart-period{font-size:11px;color:var(--fgMute);font-family:'JetBrains Mono',monospace}
.eh-legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:12px}
.eh-legend-item{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--fgDim);cursor:pointer;padding:5px 10px;border-radius:8px;background:var(--surface3);border:1px solid var(--hairline2)}
.eh-legend-item.off{opacity:0.4}
.eh-legend-dot{width:10px;height:10px;border-radius:5px}

.eh-percoach{margin-top:14px;background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;overflow:hidden}
.eh-pc-h{padding:14px 18px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgDim);font-weight:700;border-bottom:1px solid var(--hairline)}
.eh-pc-row{display:grid;grid-template-columns:24px 32px 1fr 200px 80px 80px;gap:14px;padding:14px 18px;align-items:center;border-bottom:1px solid var(--hairline)}
.eh-pc-row:last-child{border-bottom:none}
.eh-pc-dot{width:10px;height:10px;border-radius:5px;justify-self:center}
.eh-pc-av{width:30px;height:30px;border-radius:10px;background:linear-gradient(135deg,#1d2a1d,#2a3a2a);border:1px solid var(--accentRing);display:grid;place-items:center;color:var(--accent);font-weight:700;font-size:10px}
.eh-pc-name{font-size:13px;font-weight:700}
.eh-spark{height:24px}
.eh-pc-k{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--fgMute);font-weight:700;text-align:right}
.eh-pc-current{font-family:'JetBrains Mono',monospace;font-weight:800;font-size:18px;text-align:right;color:var(--accent)}
.eh-pc-delta{font-family:'JetBrains Mono',monospace;font-weight:700;text-align:right}
.eh-pc-delta.up{color:var(--good)}
.eh-pc-delta.dn{color:var(--weak)}
`}</style>
  );
}

function ChartSvg({ visible }: { visible: Record<string, boolean> }) {
  const width = 920;
  const height = 320;
  const pad = { l: 30, r: 20, t: 20, b: 28 };
  const min = 60;
  const max = 95;
  const qs = ACAD_EVAL_HISTORY.quarters;
  const stepX = (width - pad.l - pad.r) / (qs.length - 1);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {/* gridlines */}
      {[65, 70, 75, 80, 85, 90].map((y) => {
        const yp = pad.t + ((max - y) / (max - min)) * (height - pad.t - pad.b);
        return (
          <g key={y}>
            <line x1={pad.l} x2={width - pad.r} y1={yp} y2={yp} stroke="rgba(255,255,255,0.04)" />
            <text x={pad.l - 6} y={yp + 3} fill="#5E6B5E" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
              {y}
            </text>
          </g>
        );
      })}
      {/* lines */}
      {ACAD_EVAL_HISTORY.coaches.map((c) => {
        if (!visible[c.id]) return null;
        const d = c.data
          .map((v, i) => {
            const x = pad.l + i * stepX;
            const y = pad.t + ((max - v) / (max - min)) * (height - pad.t - pad.b);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");
        return (
          <g key={c.id}>
            <path d={d} fill="none" stroke={c.color} strokeWidth="2" strokeLinecap="round" />
            {c.data.map((v, i) => {
              const x = pad.l + i * stepX;
              const y = pad.t + ((max - v) / (max - min)) * (height - pad.t - pad.b);
              return <circle key={i} cx={x} cy={y} r="3" fill={c.color} />;
            })}
            <text
              x={pad.l + (qs.length - 1) * stepX + 6}
              y={pad.t + ((max - c.data[c.data.length - 1]) / (max - min)) * (height - pad.t - pad.b) + 3}
              fill={c.color}
              fontSize="11"
              fontWeight="700"
            >
              {c.data[c.data.length - 1]}
            </text>
          </g>
        );
      })}
      {/* x axis */}
      {qs.map((q, i) => (
        <text
          key={q}
          x={pad.l + i * stepX}
          y={height - 8}
          fill="#5E6B5E"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
        >
          {q}
        </text>
      ))}
    </svg>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 180;
  const h = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = w / (data.length - 1);
  const d = data
    .map((v, i) => {
      const x = i * stepX;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="eh-spark">
      <path d={d} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export default function EvalHistoryPage() {
  const t = useTranslations();
  const fmt = useLocaleFormat();
  const [visible, setVisible] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ACAD_EVAL_HISTORY.coaches.map((c) => [c.id, true]))
  );

  return (
    <>
      <Topbar
        title={t("nav.history")}
        breadcrumb={[{ label: t("crumb.academy") }, { label: t("nav.history") }]}
        actions={
          <>
            <GhostBtn icon="calendar">8 quarters</GhostBtn>
            <PrimaryBtn icon="file-export">Export trends</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="eh-chart-card">
          <div className="eh-chart-h">
            <div className="eh-chart-t">Coach score trajectory · 2 years</div>
            <div className="eh-chart-period">
              {ACAD_EVAL_HISTORY.quarters[0]} → {ACAD_EVAL_HISTORY.quarters[ACAD_EVAL_HISTORY.quarters.length - 1]}
            </div>
          </div>
          <ChartSvg visible={visible} />
          <div className="eh-legend">
            {ACAD_EVAL_HISTORY.coaches.map((c) => (
              <div
                key={c.id}
                className={"eh-legend-item " + (visible[c.id] ? "" : "off")}
                onClick={() => setVisible({ ...visible, [c.id]: !visible[c.id] })}
              >
                <span className="eh-legend-dot" style={{ background: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>

        <div className="eh-percoach">
          <div className="eh-pc-h">Per-coach 2-year movement</div>
          {ACAD_EVAL_HISTORY.coaches.map((c) => {
            const delta = c.data[c.data.length - 1] - c.data[0];
            return (
              <div className="eh-pc-row" key={c.id}>
                <span className="eh-pc-dot" style={{ background: c.color }} />
                <div className="eh-pc-av">{c.initials}</div>
                <div className="eh-pc-name">{c.name}</div>
                <Sparkline data={c.data} color={c.color} />
                <div>
                  <div className="eh-pc-k">CURRENT</div>
                  <div className="eh-pc-current" style={{ color: c.color }}>
                    {fmt.d(c.data[c.data.length - 1])}
                  </div>
                </div>
                <div>
                  <div className="eh-pc-k">2-YR</div>
                  <div className={"eh-pc-delta " + (delta >= 0 ? "up" : "dn")}>
                    {delta > 0 ? "+" : ""}{fmt.d(delta)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
