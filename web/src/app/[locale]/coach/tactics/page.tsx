"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Topbar, GhostBtn, PrimaryBtn } from "@/components/shell";
import { Icon } from "@/components/icon";

type ElementKind = "player" | "opponent" | "ball" | "cone";

type CourtItem = {
  id: number;
  kind: ElementKind;
  label: string;
  x: number;
  y: number;
};

const ELEMENT_DEFS: { kind: ElementKind; label: string; color: string; ink: string; full: string }[] = [
  { kind: "player", label: "P", color: "#A8D847", ink: "#0E1A00", full: "Our player" },
  { kind: "opponent", label: "O", color: "#E5685D", ink: "#fff", full: "Opponent" },
  { kind: "ball", label: "●", color: "#FFD700", ink: "#3a2a00", full: "Tennis ball" },
  { kind: "cone", label: "▲", color: "#F2B544", ink: "#3a2a00", full: "Cone" },
];

const TOOLS = ["Select", "Draw", "Arrow", "Curve", "Erase"];
const COLORS = ["#A8D847", "#7DD3FC", "#E5685D", "#F2B544", "#FFFFFF"];
const STROKES = ["Solid", "Dashed", "Dotted"];
const FRAMES = ["Frame 1", "Frame 2", "Frame 3"];
const SAVED_SCHEMES = [
  { name: "T-serve return", kind: "image" as const },
  { name: "Cross-court rally", kind: "video" as const },
  { name: "Net approach", kind: "video" as const },
  { name: "Wide return + DTL", kind: "image" as const },
];

function Styles() {
  return (
    <style>{`
.tbd-grid{display:grid;grid-template-columns:96px 1fr 280px;gap:14px;align-items:start}

.tbd-tools{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:10px;display:flex;flex-direction:column;gap:6px}
.tbd-tool-h{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700;text-align:center;padding:6px 0 2px}
.tbd-tool{width:100%;padding:10px 0;border-radius:8px;border:1px solid var(--hairline2);background:transparent;color:var(--fgDim);font-weight:700;font-size:10px;cursor:pointer;letter-spacing:.12em;text-transform:uppercase;font-family:inherit}
.tbd-tool.on{background:var(--accent);color:var(--accentInk);border-color:transparent}
.tbd-color{width:32px;height:32px;border-radius:8px;border:2px solid transparent;cursor:pointer;margin:0 auto}
.tbd-color.on{border-color:var(--accent);box-shadow:0 0 0 2px rgba(168,216,71,0.30)}

.tbd-canvas{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:14px}
.tbd-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px}
.tbd-orient{display:inline-flex;background:var(--surface3);border:1px solid var(--hairline2);border-radius:8px;padding:3px;gap:3px}
.tbd-orient button{padding:6px 12px;border-radius:6px;border:none;background:transparent;color:var(--fgDim);font-weight:700;font-size:11px;cursor:pointer;font-family:inherit}
.tbd-orient button.on{background:var(--accent);color:var(--accentInk)}
.tbd-zoom{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--fgMute)}
.tbd-zoom-track{width:100px;height:5px;background:var(--surface3);border-radius:3px;overflow:hidden}
.tbd-zoom-fill{height:100%;background:var(--accent);width:60%}

.court-wrap{position:relative;background:#0c130c;border:1px solid var(--hairline2);border-radius:12px;padding:24px;display:flex;justify-content:center}
.court{position:relative;width:480px;height:560px;background:#0E2F3A;border-radius:6px;box-shadow:inset 0 0 0 2px #1a4a5a, inset 0 0 0 24px #0E2F3A, inset 0 0 0 26px #1a4a5a}
.court::before,.court::after{content:'';position:absolute;left:0;right:0;height:2px;background:#fff}
.court::before{top:50%;margin-top:-1px}
.court::after{display:none}
.court .net{position:absolute;left:24px;right:24px;top:50%;height:3px;background:repeating-linear-gradient(90deg,#fff 0 8px,#0E2F3A 8px 12px);transform:translateY(-50%)}
.court .vline{position:absolute;top:24px;bottom:24px;width:2px;background:#fff;left:50%;margin-left:-1px}
.court .service-h{position:absolute;left:90px;right:90px;height:2px;background:#fff}
.court .service-h.top{top:30%}
.court .service-h.bot{bottom:30%}
.court .service-v{position:absolute;width:2px;background:#fff;left:50%;margin-left:-1px}
.court .service-v.top{top:30%;height:20%}
.court .service-v.bot{bottom:30%;height:20%}

.court-item{position:absolute;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:14px;cursor:grab;transform:translate(-50%,-50%);box-shadow:0 4px 10px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.30);user-select:none}
.court-item.cone{border-radius:4px;font-size:18px}

.tbd-side{display:flex;flex-direction:column;gap:14px}
.tbd-panel{background:var(--surface2);border:1px solid var(--hairline);border-radius:14px;padding:14px 16px}
.tbd-panel-h{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--fgMute);font-weight:700;margin-bottom:10px}

.tbd-scheme{font-size:14px;font-weight:700;color:var(--fg);margin-bottom:4px}
.tbd-scheme-meta{font-size:11px;color:var(--fgMute);display:flex;justify-content:space-between}

.tbd-elements{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.tbd-elem{padding:10px;border-radius:10px;background:var(--surface3);border:1px solid var(--hairline2);cursor:pointer;text-align:center;transition:.15s}
.tbd-elem:hover{border-color:var(--accentRing)}
.tbd-elem-bubble{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-weight:800;margin:0 auto 6px;font-size:13px}
.tbd-elem-name{font-size:10px;color:var(--fgDim);font-weight:600}

.tbd-frames{display:flex;flex-direction:column;gap:6px}
.tbd-frame{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-radius:8px;background:var(--surface3);border:1px solid var(--hairline2);cursor:pointer;font-size:12px}
.tbd-frame.on{background:rgba(168,216,71,0.10);border-color:var(--accentRing);color:var(--accent);font-weight:700}
.tbd-frame-add{padding:8px;border-radius:8px;border:1px dashed var(--hairline2);background:transparent;color:var(--fgMute);font-size:11px;cursor:pointer;font-family:inherit;text-align:center;font-weight:700}

.tbd-anim{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:10px;font-size:10px;color:var(--fgMute);font-family:'JetBrains Mono',ui-monospace,monospace}
.tbd-anim-track{flex:1;height:4px;background:var(--surface3);border-radius:2px}
.tbd-anim-btn{width:32px;height:32px;border-radius:50%;background:var(--accent);color:var(--accentInk);border:none;display:grid;place-items:center;cursor:pointer}

.tbd-saved{display:flex;flex-direction:column;gap:6px}
.tbd-saved-row{display:flex;justify-content:space-between;align-items:center;padding:8px 10px;border-radius:8px;background:var(--surface3);border:1px solid var(--hairline2);font-size:12px}
.tbd-saved-tag{font-size:9px;font-weight:800;letter-spacing:.14em;padding:2px 7px;border-radius:4px;text-transform:uppercase}
.tbd-saved-tag.image{background:rgba(168,216,71,0.12);color:var(--accent)}
.tbd-saved-tag.video{background:rgba(125,211,252,0.12);color:#7DD3FC}
`}</style>
  );
}

const INITIAL: CourtItem[] = [
  { id: 1, kind: "player", label: "P1", x: 40, y: 78 },
  { id: 2, kind: "player", label: "P2", x: 60, y: 78 },
  { id: 3, kind: "opponent", label: "OP", x: 50, y: 16 },
  { id: 4, kind: "ball", label: "●", x: 50, y: 50 },
  { id: 5, kind: "cone", label: "▲", x: 32, y: 58 },
  { id: 6, kind: "cone", label: "▲", x: 50, y: 58 },
  { id: 7, kind: "cone", label: "▲", x: 68, y: 58 },
];

export default function TacticsBoardPage() {
  const t = useTranslations();
  const [items, setItems] = useState<CourtItem[]>(INITIAL);
  const [tool, setTool] = useState("Select");
  const [color, setColor] = useState(COLORS[0]);
  const [stroke, setStroke] = useState("Solid");
  const [orient, setOrient] = useState<"Vertical" | "Horizontal">("Vertical");
  const [frame, setFrame] = useState(0);
  const [dragId, setDragId] = useState<number | null>(null);
  const courtRef = useRef<HTMLDivElement | null>(null);

  function onPointerDown(id: number, e: React.PointerEvent) {
    setDragId(id);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (dragId == null || !courtRef.current) return;
    const rect = courtRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setItems((prev) =>
      prev.map((it) => (it.id === dragId ? { ...it, x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) } : it))
    );
  }

  function onPointerUp() {
    setDragId(null);
  }

  return (
    <>
      <Topbar
        title={t("tactics.title")}
        breadcrumb={[
          { label: t("crumb.workspace") },
          { label: "Arman Rahimi" },
          { label: t("tactics.title") },
        ]}
        actions={
          <>
            <GhostBtn icon="trash">{t("tactics.clear")}</GhostBtn>
            <GhostBtn icon="photo">{t("tactics.saveImage")}</GhostBtn>
            <GhostBtn icon="video">{t("tactics.saveVideo")}</GhostBtn>
            <PrimaryBtn icon="device-floppy">{t("tactics.saveScheme")}</PrimaryBtn>
          </>
        }
      />
      <Styles />
      <div className="r-page">
        <div className="tbd-grid">
          <div className="tbd-tools">
            <div className="tbd-tool-h">Tools</div>
            {TOOLS.map((t) => (
              <button key={t} className={"tbd-tool " + (tool === t ? "on" : "")} onClick={() => setTool(t)}>
                {t}
              </button>
            ))}
            <div className="tbd-tool-h" style={{ marginTop: 6 }}>Color</div>
            {COLORS.map((c) => (
              <button
                key={c}
                className={"tbd-color " + (color === c ? "on" : "")}
                style={{ background: c }}
                onClick={() => setColor(c)}
                aria-label={`Color ${c}`}
              />
            ))}
            <div className="tbd-tool-h" style={{ marginTop: 6 }}>Stroke</div>
            {STROKES.map((s) => (
              <button key={s} className={"tbd-tool " + (stroke === s ? "on" : "")} onClick={() => setStroke(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="tbd-canvas">
            <div className="tbd-toolbar">
              <div className="tbd-orient">
                <button className={orient === "Vertical" ? "on" : ""} onClick={() => setOrient("Vertical")}>
                  Vertical
                </button>
                <button className={orient === "Horizontal" ? "on" : ""} onClick={() => setOrient("Horizontal")}>
                  Horizontal
                </button>
              </div>
              <div className="tbd-zoom">
                <span>Zoom</span>
                <div className="tbd-zoom-track">
                  <div className="tbd-zoom-fill" />
                </div>
                <span style={{ color: "var(--fg)", fontFamily: "'JetBrains Mono', monospace" }}>60%</span>
                <button
                  type="button"
                  style={{
                    background: "var(--surface3)",
                    border: "1px solid var(--hairline2)",
                    borderRadius: 6,
                    width: 26,
                    height: 26,
                    color: "var(--fg)",
                    cursor: "pointer",
                  }}
                  aria-label="Zoom out"
                >
                  −
                </button>
                <button
                  type="button"
                  style={{
                    background: "var(--surface3)",
                    border: "1px solid var(--hairline2)",
                    borderRadius: 6,
                    width: 26,
                    height: 26,
                    color: "var(--fg)",
                    cursor: "pointer",
                  }}
                  aria-label="Zoom in"
                >
                  +
                </button>
              </div>
            </div>

            <div className="court-wrap">
              <div
                ref={courtRef}
                className="court"
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                style={
                  orient === "Horizontal"
                    ? { transform: "rotate(90deg)", width: 560, height: 480 }
                    : undefined
                }
              >
                <div className="net" />
                <div className="vline" />
                <div className="service-h top" />
                <div className="service-h bot" />
                <div className="service-v top" />
                <div className="service-v bot" />

                {items.map((it) => {
                  const def = ELEMENT_DEFS.find((d) => d.kind === it.kind)!;
                  return (
                    <div
                      key={it.id}
                      className={"court-item" + (it.kind === "cone" ? " cone" : "")}
                      style={{
                        left: `${it.x}%`,
                        top: `${it.y}%`,
                        background: def.color,
                        color: def.ink,
                      }}
                      onPointerDown={(e) => onPointerDown(it.id, e)}
                    >
                      {it.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="tbd-side">
            <div className="tbd-panel">
              <div className="tbd-panel-h">Scheme</div>
              <div className="tbd-scheme">Serve Return Tactic</div>
              <div className="tbd-scheme-meta">
                <span>Arman Rahimi</span>
                <span>2 min ago</span>
              </div>
            </div>

            <div className="tbd-panel">
              <div className="tbd-panel-h">Elements</div>
              <div className="tbd-elements">
                {ELEMENT_DEFS.map((d) => (
                  <button
                    type="button"
                    key={d.kind}
                    className="tbd-elem"
                    onClick={() => {
                      setItems((prev) => [
                        ...prev,
                        {
                          id: Math.max(0, ...prev.map((p) => p.id)) + 1,
                          kind: d.kind,
                          label: d.label,
                          x: 50,
                          y: 50,
                        },
                      ]);
                    }}
                  >
                    <div
                      className="tbd-elem-bubble"
                      style={{
                        background: d.color,
                        color: d.ink,
                        borderRadius: d.kind === "cone" ? 4 : "50%",
                      }}
                    >
                      {d.label}
                    </div>
                    <div className="tbd-elem-name">{d.full}</div>
                  </button>
                ))}
              </div>
              <button
                className="tbd-frame-add"
                style={{ marginTop: 8, width: "100%" }}
                type="button"
              >
                + Custom element
              </button>
            </div>

            <div className="tbd-panel">
              <div className="tbd-panel-h">Animation frames</div>
              <div className="tbd-frames">
                {FRAMES.map((f, i) => (
                  <button
                    key={f}
                    type="button"
                    className={"tbd-frame " + (frame === i ? "on" : "")}
                    onClick={() => setFrame(i)}
                  >
                    <span>{f}</span>
                    <span style={{ color: "var(--fgMute)", fontFamily: "'JetBrains Mono', monospace" }}>
                      {(i * 1.2).toFixed(1)}s
                    </span>
                  </button>
                ))}
                <button type="button" className="tbd-frame-add">
                  + Add frame
                </button>
              </div>
              <div className="tbd-anim">
                <span>0:00</span>
                <button className="tbd-anim-btn">
                  <Icon name="player-play" />
                </button>
                <div className="tbd-anim-track">
                  <div style={{ width: "30%", height: "100%", background: "var(--accent)", borderRadius: 2 }} />
                </div>
                <span>0:03</span>
              </div>
            </div>

            <div className="tbd-panel">
              <div className="tbd-panel-h">Saved schemes</div>
              <div className="tbd-saved">
                {SAVED_SCHEMES.map((s) => (
                  <div key={s.name} className="tbd-saved-row">
                    <span>{s.name}</span>
                    <span className={"tbd-saved-tag " + s.kind}>{s.kind}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
