export type KPI = {
  k: string;
  v: string | number;
  sub: string;
  tone: "good" | "med" | "warn" | "weak" | "info";
  icon: string;
};

export type ScheduleItem = {
  t: string;
  dur: string;
  title: string;
  who: string;
  kind: "session" | "test" | "match";
  tone: "good" | "med" | "info" | "weak";
  status: "done" | "now" | "next";
};

export type ActivePlayer = {
  id: string;
  name: string;
  level: string;
  itn: number;
  flag: string;
  trend: number;
  focus: string;
  initials: string;
  age?: number;
};

export type RecentMatch = {
  p1: string;
  p2: string;
  score: string;
  type: "Official" | "Friendly" | "Training";
  won: boolean;
  date: string;
};

export type Notification = {
  tone: "good" | "med" | "weak" | "info";
  text: string;
  when: string;
  icon: string;
};

export type SmartSuggestion = {
  tag: "Drill" | "Watch" | "Plan";
  text: string;
  who: string;
  impact: string;
};

export const DASH = {
  kpis: [
    { k: "Active players", v: 24, sub: "+2 this month", tone: "good", icon: "users" },
    { k: "Matches this week", v: 12, sub: "8W · 4L", tone: "good", icon: "trophy" },
    { k: "Upcoming events", v: 8, sub: "3 new", tone: "med", icon: "calendar-event" },
    { k: "Plan", v: "Pro Coach", sub: "15 days left", tone: "warn", icon: "crown" },
  ] as KPI[],

  today: [
    { t: "08:00", dur: "60m", title: "Technical · Forehand", who: "Arman Rahimi", kind: "session", tone: "good", status: "done" },
    { t: "09:30", dur: "90m", title: "Physical · Endurance", who: "Mike Karimi", kind: "session", tone: "info", status: "now" },
    { t: "11:30", dur: "45m", title: "ITN Assessment", who: "Arman Rahimi", kind: "test", tone: "med", status: "next" },
    { t: "14:00", dur: "90m", title: "Match · vs. Becker", who: "Jane Smith", kind: "match", tone: "good", status: "next" },
    { t: "16:00", dur: "60m", title: "Tactical drill", who: "Lena Vogel", kind: "session", tone: "info", status: "next" },
  ] as ScheduleItem[],

  topPlayers: [
    { id: "arman", initials: "AR", name: "Arman Rahimi", level: "Intermediate", focus: "Backhand FT", flag: "🇩🇪", itn: 4, trend: 0.4 },
    { id: "jane", initials: "JS", name: "Jane Smith", level: "Advanced", focus: "Net play", flag: "🇺🇸", itn: 6, trend: 0.2 },
    { id: "sara", initials: "SL", name: "Sara Lindqvist", level: "Professional", focus: "Match prep", flag: "🇸🇪", itn: 8, trend: 0.1 },
    { id: "mike", initials: "MK", name: "Mike Karimi", level: "Beginner", focus: "Footwork", flag: "🇮🇷", itn: 2, trend: -0.1 },
  ] as ActivePlayer[],

  recentMatches: [
    { p1: "Arman", p2: "Hoffmann", score: "6-4 · 7-5", type: "Official", won: true, date: "Sun" },
    { p1: "Jane", p2: "Larson", score: "3-6 · 4-6", type: "Friendly", won: false, date: "Sat" },
    { p1: "Mike", p2: "Arman", score: "6-3 · 6-2", type: "Training", won: true, date: "Fri" },
    { p1: "Jane", p2: "Becker", score: "7-6 · 6-4", type: "Official", won: true, date: "Thu" },
  ] as RecentMatch[],

  notifications: [
    { tone: "good", text: "ITN Test for Arman completed", when: "2h ago", icon: "circle-check" },
    { tone: "med", text: "Payment from Jane Smith received", when: "Yesterday", icon: "wallet" },
    { tone: "weak", text: "Subscription expires in 15 days", when: "Action", icon: "alert-circle" },
    { tone: "info", text: "Lena Vogel completed Motivation Letter", when: "2 days", icon: "mail-opened" },
  ] as Notification[],

  smartSuggestions: [
    { tag: "Drill", text: "3× weekly cross-court backhand drill for Arman — addresses Follow Through (3.5).", who: "Arman", impact: "+0.8" },
    { tag: "Watch", text: "Jane's serve down to 58% 1st-in over last 3 matches — book a serve review.", who: "Jane", impact: "⚠" },
  ] as SmartSuggestion[],

  coachNote:
    "Backhand drills working for Arman. Mike attendance dropping — call parents this week. Push Jane on net approach drills before Saturday.",
};

export type RosterPlayer = {
  id: string;
  num: string;
  initials: string;
  name: string;
  age: number;
  focus: string;
  flag: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  itn: number;
  matches: number;
  winRate: number;
  trend: number;
  status: "Active" | "Paused" | "Flag";
};

export const ROSTER: RosterPlayer[] = [
  { id: "arman", num: "01", initials: "AR", name: "Arman Rahimi", age: 14, focus: "Backhand FT", flag: "🇩🇪", level: "Intermediate", itn: 4, matches: 18, winRate: 72, trend: 0.4, status: "Active" },
  { id: "jane", num: "02", initials: "JS", name: "Jane Smith", age: 18, focus: "Net play", flag: "🇺🇸", level: "Advanced", itn: 6, matches: 24, winRate: 79, trend: 0.2, status: "Active" },
  { id: "sara", num: "03", initials: "SL", name: "Sara Lindqvist", age: 19, focus: "Match prep", flag: "🇸🇪", level: "Professional", itn: 8, matches: 42, winRate: 83, trend: 0.1, status: "Active" },
  { id: "mike", num: "04", initials: "MK", name: "Mike Karimi", age: 15, focus: "Footwork", flag: "🇮🇷", level: "Beginner", itn: 2, matches: 6, winRate: 50, trend: -0.1, status: "Flag" },
  { id: "lena", num: "05", initials: "LV", name: "Lena Vogel", age: 17, focus: "Motivation", flag: "🇩🇪", level: "Intermediate", itn: 4, matches: 14, winRate: 64, trend: 0.3, status: "Active" },
  { id: "kenji", num: "06", initials: "KT", name: "Kenji Tanaka", age: 16, focus: "Serve power", flag: "🇯🇵", level: "Advanced", itn: 5, matches: 21, winRate: 71, trend: 0.5, status: "Active" },
  { id: "maria", num: "07", initials: "ML", name: "Maria Lopez", age: 13, focus: "Forehand", flag: "🇪🇸", level: "Intermediate", itn: 3, matches: 11, winRate: 55, trend: 0.2, status: "Paused" },
  { id: "oliver", num: "08", initials: "OB", name: "Oliver Becker", age: 18, focus: "Mental game", flag: "🇩🇪", level: "Advanced", itn: 6, matches: 28, winRate: 68, trend: 0.0, status: "Active" },
  { id: "amir", num: "09", initials: "AM", name: "Amir Mohammadi", age: 11, focus: "Basics", flag: "🇮🇷", level: "Beginner", itn: 2, matches: 4, winRate: 50, trend: 0.6, status: "Active" },
  { id: "sofia", num: "10", initials: "SR", name: "Sofia Rossi", age: 22, focus: "Match prep", flag: "🇮🇹", level: "Professional", itn: 7, matches: 36, winRate: 77, trend: 0.2, status: "Active" },
  { id: "leo", num: "11", initials: "LD", name: "Leo Dubois", age: 19, focus: "Topspin", flag: "🇫🇷", level: "Intermediate", itn: 4, matches: 15, winRate: 46, trend: -0.2, status: "Flag" },
  { id: "anna", num: "12", initials: "AK", name: "Anna Kowalski", age: 16, focus: "Volleys", flag: "🇵🇱", level: "Intermediate", itn: 5, matches: 13, winRate: 62, trend: 0.3, status: "Active" },
];
