export type CoachMetric = { v: string; pct: number; note: string };

export type Coach = {
  id: string;
  name: string;
  initials: string;
  flag: string;
  role: string;
  since: number;
  players: number;
  score: number;
  rank: number;
  trend: number;
  directorRating: number;
  metrics: {
    itnGain: CoachMetric;
    winRate: CoachMetric;
    retention: CoachMetric;
    adherence: CoachMetric;
    planCompletion: CoachMetric;
    parentSat: CoachMetric;
    playerPerf: CoachMetric;
  };
  strengths: string[];
  weaknesses: string[];
  topPlayers: string[];
  needsAttention?: boolean;
};

export const ACADEMY = {
  name: "Berlin Tennis Academy",
  city: "Berlin · Charlottenburg",
  coaches: 6,
  players: 38,
  founded: 2008,
};

export const ACAD_KPIS = [
  { k: "Academy score", v: "82", sub: "+3 vs Q4", tone: "accent" as const, icon: "shield-star" },
  { k: "Active coaches", v: 6, sub: "1 onboarding", tone: "med" as const, icon: "school" },
  { k: "Active players", v: 38, sub: "+5 this quarter", tone: "good" as const, icon: "users-group" },
  { k: "Avg ITN gain", v: "+0.4", sub: "per coach / yr", tone: "accent" as const, icon: "trending-up" },
  { k: "Retention", v: "88%", sub: "12-month rolling", tone: "good" as const, icon: "heart-handshake" },
  { k: "Win rate", v: "66%", sub: "all tournaments", tone: "med" as const, icon: "trophy" },
];

export const COACHES: Coach[] = [
  {
    id: "payam",
    name: "Payam Nejad",
    initials: "PN",
    flag: "🇮🇷",
    role: "Head Coach",
    since: 2019,
    players: 8,
    score: 92,
    rank: 1,
    trend: 4,
    directorRating: 4.8,
    metrics: {
      itnGain: { v: "+0.6", pct: 95, note: "fastest in academy" },
      winRate: { v: "72%", pct: 90, note: "5 of 8 ranked top-tier" },
      retention: { v: "95%", pct: 95, note: "1 transfer in 2 years" },
      adherence: { v: "98%", pct: 98, note: "never skips a session" },
      planCompletion: { v: "94%", pct: 94, note: "1 of 24 plans dropped" },
      parentSat: { v: "4.9", pct: 98, note: "18 reviews" },
      playerPerf: { v: "+18%", pct: 92, note: "YoY skill index" },
    },
    strengths: ["Technical depth", "Parent communication", "Long-term planning"],
    weaknesses: ["Limited weekend availability"],
    topPlayers: ["Arman Rahimi", "Sara Lindqvist"],
  },
  {
    id: "sarah",
    name: "Sarah Klein",
    initials: "SK",
    flag: "🇩🇪",
    role: "Senior Coach",
    since: 2020,
    players: 6,
    score: 85,
    rank: 2,
    trend: 2,
    directorRating: 4.5,
    metrics: {
      itnGain: { v: "+0.5", pct: 85, note: "consistent across levels" },
      winRate: { v: "68%", pct: 82, note: "strong with U16" },
      retention: { v: "88%", pct: 85, note: "1 transfer last year" },
      adherence: { v: "92%", pct: 92, note: "rarely reschedules" },
      planCompletion: { v: "89%", pct: 89, note: "2 of 18 plans dropped" },
      parentSat: { v: "4.6", pct: 92, note: "14 reviews" },
      playerPerf: { v: "+14%", pct: 84, note: "YoY skill index" },
    },
    strengths: ["Junior development", "Mental coaching", "Consistency"],
    weaknesses: ["Tournament prep depth"],
    topPlayers: ["Lena Vogel", "Noah Andersson"],
  },
  {
    id: "marco",
    name: "Marco Bianchi",
    initials: "MB",
    flag: "🇮🇹",
    role: "Coach",
    since: 2021,
    players: 7,
    score: 81,
    rank: 3,
    trend: 0,
    directorRating: 4.3,
    metrics: {
      itnGain: { v: "+0.4", pct: 78, note: "plateaus on advanced" },
      winRate: { v: "65%", pct: 79, note: "good baseline players" },
      retention: { v: "90%", pct: 88, note: "stable group" },
      adherence: { v: "90%", pct: 90, note: "few cancellations" },
      planCompletion: { v: "85%", pct: 85, note: "3 of 20 dropped" },
      parentSat: { v: "4.5", pct: 90, note: "12 reviews" },
      playerPerf: { v: "+11%", pct: 76, note: "YoY skill index" },
    },
    strengths: ["Footwork specialist", "Group sessions"],
    weaknesses: ["Match analysis depth", "Plan completion"],
    topPlayers: ["Kenji Tanaka", "Sofia Rossi"],
  },
  {
    id: "anika",
    name: "Anika Schmidt",
    initials: "AS",
    flag: "🇩🇪",
    role: "Junior Coach",
    since: 2022,
    players: 5,
    score: 76,
    rank: 4,
    trend: 6,
    directorRating: 4.2,
    metrics: {
      itnGain: { v: "+0.4", pct: 78, note: "rising fast with kids" },
      winRate: { v: "60%", pct: 70, note: "mostly U12, low sample" },
      retention: { v: "85%", pct: 82, note: "1 left to other club" },
      adherence: { v: "88%", pct: 88, note: "few reschedules" },
      planCompletion: { v: "82%", pct: 82, note: "newer to system" },
      parentSat: { v: "4.7", pct: 94, note: "9 reviews — loved by kids" },
      playerPerf: { v: "+9%", pct: 70, note: "YoY skill index" },
    },
    strengths: ["Energetic teaching", "Beginner programs"],
    weaknesses: ["Advanced tactical work", "Sample size"],
    topPlayers: ["Amir Mohammadi", "Maya Klein"],
  },
  {
    id: "lea",
    name: "Léa Dubois",
    initials: "LD",
    flag: "🇫🇷",
    role: "Coach",
    since: 2021,
    players: 4,
    score: 73,
    rank: 5,
    trend: -2,
    directorRating: 3.9,
    metrics: {
      itnGain: { v: "+0.3", pct: 65, note: "slow ITN progression" },
      winRate: { v: "58%", pct: 68, note: "losing close matches" },
      retention: { v: "82%", pct: 78, note: "2 transfers out" },
      adherence: { v: "85%", pct: 85, note: "occasional reschedules" },
      planCompletion: { v: "78%", pct: 78, note: "4 of 18 dropped" },
      parentSat: { v: "4.2", pct: 84, note: "7 reviews" },
      playerPerf: { v: "+7%", pct: 62, note: "YoY skill index" },
    },
    strengths: ["Stroke biomechanics", "Video analysis"],
    weaknesses: ["Player retention", "Match strategy", "Parent engagement"],
    topPlayers: ["Leo Dubois", "Hugo Marchand"],
  },
  {
    id: "james",
    name: "James Park",
    initials: "JP",
    flag: "🇬🇧",
    role: "Coach",
    since: 2023,
    players: 5,
    score: 68,
    rank: 6,
    trend: -4,
    directorRating: 3.6,
    metrics: {
      itnGain: { v: "+0.2", pct: 55, note: "flat trajectory" },
      winRate: { v: "55%", pct: 62, note: "inconsistent results" },
      retention: { v: "75%", pct: 70, note: "3 transfers last year" },
      adherence: { v: "82%", pct: 82, note: "most reschedules in academy" },
      planCompletion: { v: "72%", pct: 72, note: "plans often pivot" },
      parentSat: { v: "3.9", pct: 78, note: "5 reviews · mixed" },
      playerPerf: { v: "+5%", pct: 55, note: "YoY skill index" },
    },
    strengths: ["Serve mechanics"],
    weaknesses: ["Retention", "Adherence", "Match prep", "Parent reviews"],
    topPlayers: ["Mike Karimi"],
    needsAttention: true,
  },
];

export const ACAD_TRENDS = {
  months: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
  academyScore: [76, 78, 77, 79, 80, 81, 80, 81, 82, 82, 82, 82],
  avgItnGain: [0.30, 0.32, 0.33, 0.35, 0.36, 0.36, 0.37, 0.38, 0.39, 0.40, 0.40, 0.40],
  retention: [82, 83, 84, 85, 86, 86, 87, 87, 88, 88, 88, 88],
  winRate: [60, 61, 62, 63, 64, 65, 65, 65, 66, 66, 66, 66],
};

export const ACAD_WEAK_SPOTS = [
  { area: "Second serve consistency", pct: 38, level: "critical", note: "15 of 38 below benchmark" },
  { area: "Backhand under pressure", pct: 52, level: "warning", note: "mostly U16 group" },
  { area: "Net play volleys", pct: 65, level: "ok", note: "improving with focused drills" },
  { area: "Mental composure 3rd set", pct: 48, level: "warning", note: "tournament data signals" },
];

export const ACAD_ACTIONS = [
  { id: 1, title: "Review James Park", body: "Score dropped -4 this quarter. Retention 75%.", cta: "Open scorecard" },
  { id: 2, title: "Q2 evaluation due", body: "Set ratings for 6 coaches before May 30.", cta: "Start" },
  { id: 3, title: "Anika Schmidt promotion", body: "Score +6, parent sat 4.7. Eligible for senior coach.", cta: "Review" },
];

export const ACAD_FINANCE = {
  mrr: 38400,
  yearRevenue: 412800,
  yearCost: 286500,
  netProfit: 126300,
  margin: 30.6,
  trendRevenue: [28, 30, 31, 33, 34, 35, 36, 37, 37, 38, 38, 38.4],
  trendProfit: [7, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12.6],
  sources: [
    { k: "Coaching fees", v: 285000, pct: 69, color: "#A8D847" },
    { k: "Court rentals", v: 62000, pct: 15, color: "#F2B544" },
    { k: "Tournament hosting", v: 28000, pct: 7, color: "#D8B4FE" },
    { k: "Equipment & shop", v: 22000, pct: 5, color: "#7DD3FC" },
    { k: "Other", v: 15800, pct: 4, color: "#5E6B5E" },
  ],
  costs: [
    { k: "Coach payroll", v: 178000, pct: 62, color: "#A8D847" },
    { k: "Court maintenance", v: 48000, pct: 17, color: "#F2B544" },
    { k: "Facilities & utilities", v: 28000, pct: 10, color: "#D8B4FE" },
    { k: "Marketing", v: 18000, pct: 6, color: "#7DD3FC" },
    { k: "Equipment", v: 8500, pct: 3, color: "#E5685D" },
    { k: "Admin", v: 6000, pct: 2, color: "#5E6B5E" },
  ],
};

export const ACAD_PLANS = [
  {
    id: "starter",
    name: "Academy Starter",
    perCoach: 24,
    tagline: "Small clubs getting organized",
    maxCoaches: "Up to 5 coaches",
    features: ["Coach scorecards", "Basic analytics", "All Players roster", "Email support"],
  },
  {
    id: "pro",
    name: "Academy Pro",
    perCoach: 34,
    tagline: "Growing academies",
    maxCoaches: "Up to 12 coaches",
    features: [
      "Everything in Starter",
      "Compare coaches",
      "Academy finance + ledger",
      "Weak-spot analytics",
      "Priority support",
    ],
  },
  {
    id: "elite",
    name: "Academy Elite",
    perCoach: 39,
    popular: true,
    tagline: "Full performance management",
    maxCoaches: "Unlimited coaches",
    features: [
      "Everything in Pro",
      "Evaluation history",
      "Custom score weights",
      "Revenue per coach + payroll",
      "Dedicated account manager",
      "API & data export",
    ],
  },
];

export const ACAD_SUB = {
  plan: "elite",
  coaches: 6,
  billing: "annual" as const,
  nextRenewal: "Jan 1, 2027",
  method: { brand: "Visa", last4: "4242", holder: "Berlin Tennis Academy", expiry: "08 / 28" },
};

// Iran payment integration
export const IRAN_PAYMENT = {
  // 1 USD = 60,000 Toman (editable when central rate changes)
  usdToToman: 60000,
  // Bank transfer details for receipt-based payments
  bank: {
    name: "Bank Mellat",
    accountHolder: "Rallytic Iran",
    cardNumber: "6104-3378-1234-5678",
    sheba: "IR62-0120-0000-0000-1234-5678-91",
    accountNumber: "1234-5678-9012-34",
  },
  // Recent Iran-payment activity (used in Payments tab)
  recentPayments: [
    { id: "ir-1", academy: "Tehran Tennis Club", method: "Zarinpal", amount: 14040000, usd: 234, date: "May 12", status: "paid" as const },
    { id: "ir-2", academy: "Isfahan Sport Academy", method: "Bank transfer", amount: 14040000, usd: 234, date: "May 10", status: "verifying" as const },
    { id: "ir-3", academy: "Shiraz Tennis Center", method: "Zarinpal", amount: 28080000, usd: 468, date: "May 8", status: "paid" as const },
  ],
};
