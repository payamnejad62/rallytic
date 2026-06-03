// Smart Coaching Plan data
export const COACH_PLAN = {
  player: { name: "Arman Rahimi", initials: "AR", flag: "🇩🇪", itn: 4, level: "Intermediate" },
  generated: "May 12, 2026 · 09:22",
  aiInputs: [
    { k: "Player", v: "23 · Right-handed" },
    { k: "Current level", v: "Intermediate · ITN 4" },
    { k: "Hours / wk", v: "8 h" },
    { k: "Needs work", v: "Backhand · Tactical" },
    { k: "Target", v: "ITN 3" },
  ],
  phases: [
    {
      n: 1,
      name: "Phase 1 · Foundation",
      weeks: "W 1–4",
      totalHours: 32,
      mix: [
        { week: "W 1–2", bars: [{ k: "tech", pct: 50 }, { k: "phys", pct: 25 }, { k: "tact", pct: 25 }] },
        { week: "W 3–4", bars: [{ k: "tech", pct: 40 }, { k: "phys", pct: 30 }, { k: "tact", pct: 30 }] },
      ],
      focus: [
        "Backhand cross-court — Follow Through",
        "Base physical fitness — endurance",
        "Serve consistency",
      ],
    },
    {
      n: 2,
      name: "Phase 2 · Development",
      weeks: "W 5–8",
      totalHours: 36,
      mix: [
        { week: "W 5–6", bars: [{ k: "tech", pct: 35 }, { k: "tact", pct: 35 }, { k: "ment", pct: 30 }] },
        { week: "W 7–8", bars: [{ k: "tact", pct: 35 }, { k: "tech", pct: 25 }, { k: "phys", pct: 20 }, { k: "ment", pct: 20 }] },
      ],
      focus: [
        "Tactical point construction",
        "Competitive point play",
        "Competitive mindset",
      ],
    },
    {
      n: 3,
      name: "Phase 3 · Mastery",
      weeks: "W 9–12",
      totalHours: 40,
      mix: [
        { week: "W 9–10", bars: [{ k: "tact", pct: 30 }, { k: "tech", pct: 30 }, { k: "ment", pct: 25 }, { k: "phys", pct: 15 }] },
        { week: "W 11–12", bars: [{ k: "tact", pct: 30 }, { k: "tech", pct: 25 }, { k: "ment", pct: 25 }, { k: "phys", pct: 20 }] },
      ],
      focus: [
        "Weekly practice matches",
        "Tactical serve and volley",
        "ITN Test preparation",
        "Match pressure management",
      ],
    },
  ],
  intensity: [
    { k: "Technical", pct: 70, color: "#A8D847" },
    { k: "Physical", pct: 60, color: "#E5685D" },
    { k: "Tactical", pct: 55, color: "#7DD3FC" },
    { k: "Mental", pct: 40, color: "#F2B544" },
  ],
};

export const PLAN_FORECAST = {
  windows: [
    { months: 3, advance: "+18%", conf: 81, fromItn: 4, toItn: "ITN 4+" },
    { months: 6, advance: "+38%", conf: 71, fromItn: 4, toItn: "ITN 3" },
    { months: 12, advance: "+65%", conf: 58, fromItn: 4, toItn: "ITN 2–3" },
  ],
  path: [
    { when: "Now · May 2026", title: "Current level", body: "ITN 4 · Intermediate · Avg 6.9", tag: "INTERMEDIATE" },
    { when: "Aug 2026 · 3 mo", title: "First milestone", body: "Backhand fixed · tactical play improving", tag: "INTERMEDIATE+" },
    { when: "Nov 2026 · 6 mo", title: "Level upgrade", body: "ITN test ready · entering advanced", tag: "ADVANCED" },
    { when: "May 2027 · 12 mo", title: "Final goal", body: "Competing in official tournaments", tag: "ADVANCED+" },
  ],
  projection: [
    { k: "Forehand", from: 7.3, to: 8.5, delta: "+1.2", color: "#A8D847" },
    { k: "Backhand", from: 5.5, to: 7.5, delta: "+2", color: "#F2B544" },
    { k: "Tactical", from: 5.8, to: 7.4, delta: "+1.6", color: "#7DD3FC" },
    { k: "Physical", from: 8.1, to: 9, delta: "+0.9", color: "#A8D847" },
  ],
  assumptions: [
    "Regular attendance",
    "8 hours of training per week",
    "Daily backhand self-practice",
    "No long-term injuries",
    "At least 2 matches per month",
  ],
};

// Performance profile additional data — uses TIQ-like fields
export const PERFORMANCE = {
  player: {
    initials: "AR",
    first: "Arman",
    last: "Rahimi",
    flag: "🇩🇪",
    country: "Germany",
    age: 23,
    dob: "Jan 5, 2002",
    height: 175,
    weight: 72,
    gender: "Male",
    hand: "Right",
    eye: "Right",
    mobile: "+49 171 000 0000",
    email: "arman@email.com",
    address: "Musterstraße 12, Berlin, Germany",
    natId: "DE-1234567",
    nationality: "Germany",
    itn: 4,
    level: "Intermediate",
    levelTrack: ["Beginner", "Intermediate", "Advanced", "Professional"],
    playerId: "#ARM-54",
  },
  motivation: [
    { k: "Improve tennis skills", v: 5 },
    { k: "Competitive spirit", v: 5 },
    { k: "Improve level", v: 4 },
    { k: "Health & fitness", v: 4 },
    { k: "Official competitions", v: 4 },
    { k: "Energy & vitality", v: 3 },
    { k: "Find new friends", v: 2 },
    { k: "Family & friends", v: 2 },
    { k: "Suitable joining", v: 5 },
  ],
  motivationNote:
    "Arman shows strong intrinsic motivation. Highly competitive and eager to improve backhand. Responds well to challenge-based drills, less so to passive correction.",
  coachNote:
    "Backhand needs serious work — Follow Through is the weakest sub-skill. Plan: 3× weekly cross-court backhand drills, video review every Friday. Watch for grip tension under pressure.",
  overall: { avg: 6.9, label: "Intermediate+", toNext: 0.6 },
  skills: {
    Technical: 7.2,
    Tactical: 5.8,
    Mental: 6.5,
    Physical: 8.1,
  },
  groups: {
    Technical: [
      { name: "Forehand", avg: 7.3, subs: [
        { k: "Ready Position", v: 8 }, { k: "Back Swing", v: 7 }, { k: "Follow Through", v: 6.5 }, { k: "Contact Point", v: 7.5 },
      ]},
      { name: "Backhand", avg: 5.1, subs: [
        { k: "Ready Position", v: 6 }, { k: "Back Swing", v: 5 }, { k: "Follow Through", v: 3.5 }, { k: "Slice", v: 6 },
      ]},
      { name: "Serve", avg: 7.6, subs: [
        { k: "Toss", v: 7.5 }, { k: "Trophy Pose", v: 8 }, { k: "Pronation", v: 7 }, { k: "Placement", v: 7.5 },
      ]},
      { name: "Volley", avg: 6.4, subs: [
        { k: "Forehand Volley", v: 7 }, { k: "Backhand Volley", v: 6 }, { k: "Drop Volley", v: 5.5 }, { k: "Overhead", v: 7 },
      ]},
    ],
  },
  radar: [
    { k: "Physical", v: 8.1 },
    { k: "Serve", v: 7.6 },
    { k: "Forehand", v: 7.3 },
    { k: "Tactical", v: 5.8 },
    { k: "Backhand", v: 5.5 },
    { k: "Mental", v: 6.5 },
  ],
  trend: {
    months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    technical: [6.1, 6.3, 6.5, 6.8, 6.9, 7.0, 7.2],
    tactical:  [4.8, 5.0, 5.1, 5.3, 5.5, 5.7, 5.8],
    mental:    [5.5, 5.7, 6.0, 6.2, 6.3, 6.4, 6.5],
    physical:  [7.4, 7.6, 7.7, 7.9, 8.0, 8.0, 8.1],
  },
  smartSuggestions: [
    { tag: "Drill", text: "3× weekly cross-court backhand drill — addresses Follow Through (3.5)." },
    { tag: "Tactic", text: "Try the \"rally-then-approach\" pattern — leverages Physical 8.1 + weak Pattern Play." },
    { tag: "Watch", text: "Backhand under pressure in last 3 matches: 38% success vs 64% in practice." },
  ],
  strengths: [
    { k: "Speed", v: 8.5 },
    { k: "Agility", v: 8.5 },
    { k: "Physical Fitness", v: 8.1 },
  ],
  needsWork: [
    { k: "Follow Through", v: 3.5 },
  ],
};

// Coach notifications inbox
export const COACH_NOTIFICATIONS = {
  filters: [
    { k: "all", label: "All", count: 8 },
    { k: "players", label: "Players", count: 3 },
    { k: "matches", label: "Matches", count: 1 },
    { k: "tests", label: "Tests", count: 2 },
    { k: "finance", label: "Finance", count: 2 },
    { k: "system", label: "System", count: 2 },
  ],
  groups: [
    {
      day: "Today",
      count: 4,
      items: [
        { id: 1, tone: "good", title: "ITN Test completed", body: "Arman Rahimi — Level 4 confirmed. New plan suggested.", when: "2h ago", unread: true, cta: "View plan" },
        { id: 2, tone: "good", title: "Payment received", body: "$480 · Monthly subscription · Invoice #2401", when: "4h ago", unread: true, cta: "View invoice" },
        { id: 3, tone: "med", title: "Motivation letter submitted", body: "Sara H. completed her quarterly motivation worksheet.", when: "6h ago", unread: true, cta: "Open form" },
        { id: 4, tone: "info", title: "New message from parent", body: "Mohammadi: \"Can Amir join Saturday's clinic?\"", when: "8h ago", unread: false, cta: "Reply" },
      ],
    },
    {
      day: "Yesterday",
      count: 3,
      items: [
        { id: 5, tone: "weak", title: "Subscription expires soon", body: "Coach plan ends in 15 days — renew now to keep AI plans.", when: "1d ago", unread: false, cta: "Renew now" },
        { id: 6, tone: "good", title: "Match logged", body: "Arman beat Hoffmann 6-4, 7-5 — Official tournament.", when: "1d ago", unread: false, cta: "Open match" },
        { id: 7, tone: "info", title: "Backup complete", body: "All plans synced to cloud · 24 players", when: "1d ago", unread: false },
      ],
    },
    {
      day: "This week",
      count: 1,
      items: [
        { id: 8, tone: "info", title: "Weekly digest", body: "5 new sessions · 3 matches · 2 ITN tests this week", when: "3d ago", unread: false },
      ],
    },
  ],
};

// Tournament data
export const TOURNAMENT = {
  name: "Spring Cup 2026",
  type: "Round-robin + knockout",
  dates: "Apr 1 — May 28",
  players: 8,
  progress: { played: 12, total: 18 },
  pointsRule: { win: 3, loss: 0 },
  ladder: [
    { rank: 1, name: "Arman R.", flag: "🇩🇪", played: 10, w: 8, l: 2, winRate: 80, points: 24 },
    { rank: 2, name: "Jane S.", flag: "🇺🇸", played: 10, w: 7, l: 3, winRate: 70, points: 21 },
    { rank: 3, name: "Mike K.", flag: "🇮🇷", played: 9, w: 5, l: 4, winRate: 56, points: 15 },
    { rank: 4, name: "Sara H.", flag: "🇸🇪", played: 8, w: 3, l: 5, winRate: 38, points: 9 },
    { rank: 5, name: "Ali R.", flag: "🇮🇷", played: 7, w: 1, l: 6, winRate: 14, points: 3 },
    { rank: 6, name: "M. Hoff.", flag: "🇩🇪", played: 6, w: 2, l: 4, winRate: 33, points: 6 },
  ],
  bracket: {
    qf: [
      { a: "Arman R.", b: "M. Hoff.", aScore: 2, bScore: 0 },
      { a: "Mike K.", b: "Sara H.", aScore: 2, bScore: 1 },
      { a: "Jane S.", b: "Ali R.", aScore: 2, bScore: 0 },
      { a: "K. Larson", b: "S. Becker", aScore: null, bScore: null },
    ],
    sf: [
      { a: "Arman R.", b: "Mike K.", aScore: null, bScore: null },
      { a: "Jane S.", b: "TBD", aScore: null, bScore: null },
    ],
    final: { a: "TBD", b: "TBD", aScore: null, bScore: null },
  },
};
