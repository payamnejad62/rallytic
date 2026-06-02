export function TrendLine({
  points,
  color = "#A8D847",
  height = 140,
  labels,
  yMax,
  yMin,
  fill = true,
}: {
  points: number[];
  color?: string;
  height?: number;
  labels?: string[];
  yMax?: number;
  yMin?: number;
  fill?: boolean;
}) {
  const width = 600;
  const pad = { l: 28, r: 12, t: 16, b: 24 };
  const max = yMax ?? Math.max(...points) * 1.1;
  const min = yMin ?? Math.min(...points) * 0.9;
  const range = max - min || 1;
  const stepX = (width - pad.l - pad.r) / (points.length - 1);

  const coords = points.map((v, i) => {
    const x = pad.l + i * stepX;
    const y = pad.t + ((max - v) / range) * (height - pad.t - pad.b);
    return { x, y };
  });

  const pathD = coords.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD =
    pathD +
    ` L ${coords[coords.length - 1].x} ${height - pad.b} L ${coords[0].x} ${height - pad.b} Z`;

  const gradId = `g-${color.replace("#", "")}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((m) => (
        <line
          key={m}
          x1={pad.l}
          x2={width - pad.r}
          y1={pad.t + m * (height - pad.t - pad.b)}
          y2={pad.t + m * (height - pad.t - pad.b)}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
      ))}
      {fill && <path d={areaD} fill={`url(#${gradId})`} />}
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="4" fill={color} />
      {labels &&
        labels.map((l, i) => (
          <text
            key={i}
            x={pad.l + i * stepX}
            y={height - 6}
            fill="#5E6B5E"
            fontSize="9"
            fontWeight="700"
            textAnchor="middle"
          >
            {l}
          </text>
        ))}
    </svg>
  );
}

export function Donut({
  segments,
  size = 180,
  centerLabel,
  centerSub,
}: {
  segments: { v: number; color: string }[];
  size?: number;
  centerLabel: string;
  centerSub?: string;
}) {
  const total = segments.reduce((a, b) => a + b.v, 0);
  const r = (size - 24) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const stroke = 18;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1F2820" strokeWidth={stroke} />
        {segments.map((s, i) => {
          const len = (s.v / total) * circ;
          const dash = `${len} ${circ - len}`;
          const node = (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={dash}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return node;
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 22,
              fontWeight: 800,
              color: "var(--accent)",
              letterSpacing: "-0.02em",
            }}
          >
            {centerLabel}
          </div>
          {centerSub && (
            <div style={{ fontSize: 10, color: "var(--fgMute)", letterSpacing: ".14em", fontWeight: 700 }}>
              {centerSub}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
