export const TOK = {
  bg: "#0A0D0A",
  surface1: "#10141090",
  surface2: "#141A14",
  surface3: "#1A211A",
  hairline: "#1F2820",
  hairline2: "#283228",
  fg: "#EAF0E6",
  fgDim: "#9BA89B",
  fgMute: "#5E6B5E",
  accent: "#A8D847",
  accentDk: "#8FBE2E",
  accentBg: "rgba(168,216,71,0.10)",
  accentRing: "rgba(168,216,71,0.30)",
  accentInk: "#0E1A00",
  good: "#A8D847",
  med: "#F2B544",
  weak: "#E5685D",
  font: "'Barlow', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
} as const;

export type ScoreBand = { label: string; color: string };

export function scoreBand(v: number): ScoreBand {
  if (v >= 7) return { label: "Strong", color: TOK.good };
  if (v >= 5) return { label: "Working", color: TOK.med };
  return { label: "Needs work", color: TOK.weak };
}
