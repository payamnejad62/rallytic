export type AcademyPlayer = {
  id: string;
  num: string;
  initials: string;
  name: string;
  flag: string;
  age: number;
  joined: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  coach: string;
  coachInitials: string;
  itn: number;
  trend: number;
  status: "active" | "flag" | "paused";
};

export const ACAD_PLAYERS: AcademyPlayer[] = [
  { id: "arman", num: "01", initials: "AR", name: "Arman Rahimi", flag: "🇩🇪", age: 14, joined: "Sep 2023", level: "Intermediate", coach: "Payam Nejad", coachInitials: "PN", itn: 4, trend: 0.6, status: "active" },
  { id: "sara", num: "02", initials: "SL", name: "Sara Lindqvist", flag: "🇸🇪", age: 19, joined: "Mar 2022", level: "Professional", coach: "Payam Nejad", coachInitials: "PN", itn: 8, trend: 0.4, status: "active" },
  { id: "jane", num: "03", initials: "JS", name: "Jane Smith", flag: "🇺🇸", age: 17, joined: "Jan 2023", level: "Advanced", coach: "Sarah Klein", coachInitials: "SK", itn: 6, trend: 0.3, status: "active" },
  { id: "lena", num: "04", initials: "LV", name: "Lena Vogel", flag: "🇩🇪", age: 15, joined: "Sep 2023", level: "Intermediate", coach: "Sarah Klein", coachInitials: "SK", itn: 4, trend: 0.5, status: "active" },
  { id: "kenji", num: "05", initials: "KT", name: "Kenji Tanaka", flag: "🇯🇵", age: 16, joined: "Feb 2023", level: "Advanced", coach: "Marco Bianchi", coachInitials: "MB", itn: 5, trend: 0.4, status: "active" },
  { id: "sofia", num: "06", initials: "SR", name: "Sofia Rossi", flag: "🇮🇹", age: 20, joined: "Aug 2022", level: "Professional", coach: "Marco Bianchi", coachInitials: "MB", itn: 7, trend: 0.3, status: "active" },
  { id: "amir", num: "07", initials: "AM", name: "Amir Mohammadi", flag: "🇮🇷", age: 11, joined: "Mar 2024", level: "Beginner", coach: "Anika Schmidt", coachInitials: "AS", itn: 2, trend: 0.6, status: "active" },
  { id: "maya", num: "08", initials: "MK", name: "Maya Klein", flag: "🇩🇪", age: 10, joined: "Feb 2024", level: "Beginner", coach: "Anika Schmidt", coachInitials: "AS", itn: 2, trend: 0.5, status: "active" },
  { id: "oliver", num: "09", initials: "OB", name: "Oliver Becker", flag: "🇩🇪", age: 18, joined: "Jun 2022", level: "Advanced", coach: "Payam Nejad", coachInitials: "PN", itn: 6, trend: 0, status: "active" },
  { id: "noah", num: "10", initials: "NA", name: "Noah Andersson", flag: "🇸🇪", age: 13, joined: "Oct 2023", level: "Intermediate", coach: "Sarah Klein", coachInitials: "SK", itn: 3, trend: 0.4, status: "active" },
  { id: "leo", num: "11", initials: "LD", name: "Leo Dubois", flag: "🇫🇷", age: 14, joined: "Nov 2023", level: "Intermediate", coach: "Léa Dubois", coachInitials: "LD", itn: 4, trend: -0.2, status: "flag" },
  { id: "hugo", num: "12", initials: "HM", name: "Hugo Marchand", flag: "🇫🇷", age: 16, joined: "Jan 2023", level: "Advanced", coach: "Léa Dubois", coachInitials: "LD", itn: 5, trend: 0.2, status: "active" },
  { id: "mike", num: "13", initials: "MK", name: "Mike Karimi", flag: "🇮🇷", age: 12, joined: "Apr 2024", level: "Beginner", coach: "James Park", coachInitials: "JP", itn: 2, trend: -0.1, status: "flag" },
  { id: "maria", num: "14", initials: "ML", name: "Maria Lopez", flag: "🇪🇸", age: 13, joined: "May 2023", level: "Intermediate", coach: "Marco Bianchi", coachInitials: "MB", itn: 3, trend: 0, status: "paused" },
  { id: "ali", num: "15", initials: "AR", name: "Ali Rezaei", flag: "🇮🇷", age: 15, joined: "Sep 2023", level: "Intermediate", coach: "Payam Nejad", coachInitials: "PN", itn: 4, trend: 0.4, status: "active" },
];

export const ACAD_NOTIFICATIONS = {
  filters: [
    { k: "all", label: "All", count: 8 },
    { k: "coaches", label: "Coaches", count: 3 },
    { k: "players", label: "Players", count: 1 },
    { k: "finance", label: "Finance", count: 1 },
    { k: "analytics", label: "Analytics", count: 2 },
    { k: "system", label: "System", count: 1 },
  ],
  groups: [
    {
      day: "Today",
      items: [
        { id: 1, tone: "good", title: "Anika Schmidt: score +6 this quarter", body: "Rising trend continues. Parent sat 4.7/5. Consider senior promotion.", when: "2h ago", unread: true },
        { id: 2, tone: "weak", title: "James Park: review recommended", body: "Score 68 · trend -4 · retention dropped to 75%. Schedule 1:1.", when: "4h ago", unread: true },
        { id: 3, tone: "med", title: "3 payments overdue · $1,280", body: "Karimi family, Dubois family, Rezaei family — 5-11 days overdue.", when: "6h ago", unread: true },
      ],
    },
    {
      day: "Yesterday",
      items: [
        { id: 4, tone: "info", title: "2 new players this week", body: "Maya Klein (assigned to Anika), Ali Rezaei (assigned to Payam).", when: "1d", unread: false },
        { id: 5, tone: "med", title: "Q2 evaluation cycle opens in 5 days", body: "Set ratings for 6 coaches between May 30 - Jun 13.", when: "1d", unread: false },
        { id: 6, tone: "good", title: "Academy win rate hit 66% (+6 pts YoY)", body: "Best quarterly result since 2024. Driven by senior cohort wins.", when: "1d", unread: false },
      ],
    },
    {
      day: "This week",
      items: [
        { id: 7, tone: "info", title: "Hannah Müller accepted invite", body: "New junior coach starts June 1. Onboarding plan sent.", when: "3d", unread: false },
        { id: 8, tone: "weak", title: "Second serve weakness: 15 of 38 players", body: "Affects multiple coaches. Consider academy clinic.", when: "4d", unread: false },
      ],
    },
  ],
};

export const ACAD_EVAL_HISTORY = {
  quarters: ["Q3 24", "Q4 24", "Q1 25", "Q2 25", "Q3 25", "Q4 25", "Q1 26", "Q2 26"],
  coaches: [
    { id: "payam", name: "Payam Nejad", initials: "PN", color: "#A8D847", data: [83, 85, 86, 87, 88, 89, 90, 92] },
    { id: "sarah", name: "Sarah Klein", initials: "SK", color: "#7DD3FC", data: [78, 79, 80, 82, 82, 83, 83, 85] },
    { id: "marco", name: "Marco Bianchi", initials: "MB", color: "#F2B544", data: [78, 79, 80, 81, 81, 81, 81, 81] },
    { id: "anika", name: "Anika Schmidt", initials: "AS", color: "#D8B4FE", data: [65, 66, 68, 70, 71, 72, 74, 76] },
    { id: "lea", name: "Léa Dubois", initials: "LD", color: "#B879E0", data: [76, 76, 75, 75, 74, 74, 73, 73] },
    { id: "james", name: "James Park", initials: "JP", color: "#E5685D", data: [78, 76, 74, 73, 72, 71, 70, 68] },
  ],
};

export const ACAD_LEDGER = [
  { id: 1, type: "income" as const, cat: "Court rentals", amt: 5200, date: "May 12", desc: "External court bookings — May wk 2", method: "Bank transfer", source: "manual" },
  { id: 2, type: "expense" as const, cat: "Facilities & utilities", amt: 2350, date: "May 10", desc: "Electricity + water + heating", method: "Direct debit", source: "manual" },
  { id: 3, type: "income" as const, cat: "Tournament hosting", amt: 8000, date: "May 08", desc: "Berlin Open U16 — hosting fee", method: "Bank transfer", source: "manual" },
  { id: 4, type: "expense" as const, cat: "Court maintenance", amt: 1800, date: "May 06", desc: "Resurfacing court 3 + net replacement", method: "Card", source: "manual" },
  { id: 5, type: "income" as const, cat: "Equipment & shop", amt: 1450, date: "May 05", desc: "Pro-shop sales — racquets & strings", method: "Card", source: "manual" },
  { id: 6, type: "expense" as const, cat: "Marketing", amt: 1500, date: "May 03", desc: "Instagram ads + local flyers", method: "Card", source: "manual" },
  { id: 7, type: "income" as const, cat: "Coaching fees", amt: 34920, date: "May 01", desc: "Synced from 6 coaches (auto)", method: "Aggregated", source: "auto" },
  { id: 8, type: "expense" as const, cat: "Coach payroll", amt: 22600, date: "May 28", desc: "Synced from payroll (auto)", method: "Aggregated", source: "auto" },
];

export const ACAD_PAYROLL = [
  { id: "payam",  name: "Payam Nejad",   initials: "PN", players: 8, monthlyRev: 9600, payroll: 5400, model: "Base + 15% rev share", nextPaid: "May 28", status: "on track" },
  { id: "sarah",  name: "Sarah Klein",   initials: "SK", players: 6, monthlyRev: 6480, payroll: 4200, model: "Base + 12% rev share", nextPaid: "May 28", status: "on track" },
  { id: "marco",  name: "Marco Bianchi", initials: "MB", players: 7, monthlyRev: 6720, payroll: 4000, model: "Base + 10% rev share", nextPaid: "May 28", status: "on track" },
  { id: "anika",  name: "Anika Schmidt", initials: "AS", players: 5, monthlyRev: 4200, payroll: 3000, model: "Salary",               nextPaid: "May 28", status: "on track" },
  { id: "lea",    name: "Léa Dubois",    initials: "LD", players: 4, monthlyRev: 3840, payroll: 3000, model: "Salary",               nextPaid: "May 28", status: "on track" },
  { id: "james",  name: "James Park",    initials: "JP", players: 5, monthlyRev: 4080, payroll: 3000, model: "Salary",               nextPaid: "May 28", status: "review" },
];

export const ACAD_PAYMENTS_RECENT = [
  { id: 1, payer: "Hossein Rahimi", player: "Arman Rahimi", amt: 480, date: "May 12", status: "paid" as const },
  { id: 2, payer: "Mr. Smith", player: "Jane Smith", amt: 480, date: "May 11", status: "paid" as const },
  { id: 3, payer: "A. Mohammadi", player: "Amir Mohammadi", amt: 320, date: "May 10", status: "paid" as const },
  { id: 4, payer: "Karimi family", player: "Mike Karimi", amt: 320, date: "May 02", status: "overdue" as const, daysOverdue: 11 },
  { id: 5, payer: "Dubois family", player: "Leo Dubois", amt: 480, date: "May 06", status: "overdue" as const, daysOverdue: 7 },
  { id: 6, payer: "Rezaei family", player: "Ali Rezaei", amt: 480, date: "May 08", status: "overdue" as const, daysOverdue: 5 },
  { id: 7, payer: "O. Becker", player: "Oliver Becker", amt: 480, date: "May 14", status: "pending" as const },
];

export const ACAD_SCORE_WEIGHTS = [
  { k: "itnGain", label: "ITN improvement", v: 20 },
  { k: "winRate", label: "Tournament win", v: 15 },
  { k: "retention", label: "Player retention", v: 15 },
  { k: "adherence", label: "Session adherence", v: 10 },
  { k: "planCompletion", label: "Plan completion", v: 10 },
  { k: "parentSat", label: "Parent satisfaction", v: 15 },
  { k: "playerPerf", label: "Player perf growth", v: 10 },
  { k: "directorRating", label: "Director rating", v: 5 },
];
