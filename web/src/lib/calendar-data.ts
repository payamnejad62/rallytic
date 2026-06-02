export type EventType = "tech" | "phys" | "tact" | "ment" | "intr" | "test" | "evt";

export const EVENT_TYPES: { k: EventType; label: string; color: string }[] = [
  { k: "tech", label: "Technical", color: "#A8D847" },
  { k: "phys", label: "Physical", color: "#E5685D" },
  { k: "tact", label: "Tactical", color: "#7DD3FC" },
  { k: "ment", label: "Mental", color: "#F2B544" },
  { k: "intr", label: "Interview", color: "#B879E0" },
  { k: "test", label: "Test", color: "#60B8F5" },
  { k: "evt", label: "Event", color: "#FFD700" },
];

export type CalEvent = {
  id: number;
  date: string;
  time: string;
  dur: number;
  title: string;
  player: string;
  type: EventType;
  loc: string;
  conflict?: boolean;
};

export const CAL_EVENTS: CalEvent[] = [
  { id: 1, date: "2026-05-06", time: "09:00", dur: 90, title: "Technical — Backhand", player: "Arman", type: "tech", loc: "Court 1" },
  { id: 2, date: "2026-05-07", time: "10:00", dur: 60, title: "Rally Patterns", player: "Sara", type: "tact", loc: "Court 2" },
  { id: 3, date: "2026-05-08", time: "14:00", dur: 90, title: "Strength", player: "Jane", type: "phys", loc: "Gym" },
  { id: 4, date: "2026-05-11", time: "09:00", dur: 90, title: "Forehand drill", player: "Arman", type: "tech", loc: "Court 1" },
  { id: 5, date: "2026-05-11", time: "11:30", dur: 60, title: "Endurance", player: "Mike", type: "phys", loc: "Gym" },
  { id: 6, date: "2026-05-12", time: "09:00", dur: 120, title: "Spring Cup R2", player: "Group", type: "evt", loc: "Club Courts" },
  { id: 7, date: "2026-05-12", time: "14:00", dur: 90, title: "Net Approach", player: "Jane", type: "tact", loc: "Court 2" },
  { id: 8, date: "2026-05-13", time: "09:00", dur: 60, title: "Serve", player: "Arman", type: "tech", loc: "Court 1" },
  { id: 9, date: "2026-05-13", time: "10:30", dur: 60, title: "Focus training", player: "Sara", type: "ment", loc: "Office" },
  { id: 10, date: "2026-05-14", time: "08:00", dur: 60, title: "Forehand", player: "Arman", type: "tech", loc: "Court 1" },
  { id: 11, date: "2026-05-14", time: "11:00", dur: 90, title: "Forehand", player: "Jane", type: "tech", loc: "Court 3" },
  { id: 12, date: "2026-05-14", time: "11:00", dur: 60, title: "Speed", player: "Mike", type: "phys", loc: "Gym", conflict: true },
  { id: 13, date: "2026-05-14", time: "14:00", dur: 90, title: "Match prep · vs Becker", player: "Jane", type: "evt", loc: "Court 1" },
  { id: 14, date: "2026-05-14", time: "16:00", dur: 60, title: "Tactical drill", player: "Lena", type: "tact", loc: "Court 2" },
  { id: 15, date: "2026-05-15", time: "18:00", dur: 60, title: "Coaches Meeting", player: "Coach", type: "evt", loc: "Academy" },
  { id: 16, date: "2026-05-16", time: "10:00", dur: 60, title: "Trial player", player: "Lena", type: "intr", loc: "Office" },
  { id: 17, date: "2026-05-19", time: "09:00", dur: 90, title: "Serve", player: "Arman", type: "tech", loc: "Court 1" },
  { id: 18, date: "2026-05-20", time: "10:00", dur: 120, title: "ITN Test", player: "Arman", type: "test", loc: "Court 1" },
  { id: 19, date: "2026-05-21", time: "14:00", dur: 60, title: "Competition prep", player: "Arman", type: "ment", loc: "Office" },
  { id: 20, date: "2026-05-22", time: "09:00", dur: 180, title: "Quarter-final", player: "Arman", type: "evt", loc: "Club Courts" },
  { id: 21, date: "2026-05-24", time: "10:00", dur: 90, title: "Talent Test", player: "Lena", type: "test", loc: "Court 2" },
  { id: 22, date: "2026-05-28", time: "15:00", dur: 180, title: "Spring Cup Final", player: "Group", type: "evt", loc: "Club Courts" },
];

export const CAL_NOTIFICATIONS = [
  { tone: "good", icon: "ball-tennis", text: "Arman · Technical session today 09:00", when: "in 2 h" },
  { tone: "med", icon: "trophy", text: "Spring Cup R2 — tomorrow 09:00", when: "Tomorrow" },
  { tone: "weak", icon: "alert-triangle", text: "Conflict: Jane & Mike both 11:00 today", when: "Action" },
  { tone: "info", icon: "users-group", text: "Coaches Meeting · May 15 · 18:00", when: "in 1 day" },
];

export const CAL_WORKLOAD = [
  { name: "Arman R.", hours: 8.5, color: "#A8D847" },
  { name: "Jane S.", hours: 7.0, color: "#7DD3FC" },
  { name: "Mike K.", hours: 5.0, color: "#F2B544" },
  { name: "Sara H.", hours: 9.5, color: "#E5685D", warn: true },
  { name: "Lena V.", hours: 4.5, color: "#B879E0" },
];

export const CAL_UPCOMING = [
  { day: 15, mon: "MAY", title: "Coaches Meeting", meta: "18:00 · Academy", color: "#F2B544" },
  { day: 20, mon: "MAY", title: "ITN Test — Arman", meta: "10:00 · Court 1", color: "#60B8F5" },
  { day: 22, mon: "MAY", title: "Quarter-final", meta: "09:00 · Club Courts", color: "#FFD700" },
  { day: 28, mon: "MAY", title: "Spring Cup Final", meta: "15:00 · Club Courts", color: "#FFD700" },
];
