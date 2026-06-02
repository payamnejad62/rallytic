export const ITN = {
  player: { initials: "AR", name: "Arman Rahimi", flag: "🇩🇪", joinedAgo: "Joined May 10, 2026" },
  testedAt: "May 14, 2026",
  sections: [
    { k: "gs", label: "GS Depth", score: 59, max: 90, tone: "good" as const },
    { k: "vol", label: "Volley Depth", score: 24, max: 72, tone: "med" as const },
    { k: "acc", label: "GS Accuracy", score: 37, max: 84, tone: "good" as const },
    { k: "ser", label: "Serve", score: 88, max: 108, tone: "good" as const },
    { k: "mob", label: "Mobility", score: 43, max: 76, tone: "med" as const },
  ],
  totalScore: 251,
  totalMax: 430,
  itnRating: "ITN 4",
  itnLevel: "Intermediate+",
  table: [
    { itn: "ITN 1", level: "Professional", m: "400–430", f: "370–430" },
    { itn: "ITN 2", level: "Advanced+", m: "360–399", f: "330–369" },
    { itn: "ITN 3", level: "Advanced", m: "300–359", f: "270–329" },
    { itn: "ITN 4", level: "Intermediate+", m: "240–299", f: "210–269", active: true },
    { itn: "ITN 5", level: "Intermediate", m: "180–239", f: "150–209" },
    { itn: "ITN 6", level: "Beginner+", m: "120–179", f: "90–149" },
    { itn: "ITN 7–10", level: "Beginner", m: "0–119", f: "0–89" },
  ],
  summary: {
    strokesTotal: 208,
    strokesMax: 354,
    mobility: 43,
    mobilityMax: 76,
    total: 251,
    totalMax: 430,
    assessments: 3,
    assessmentDate: "May 10, 2026",
  },
  coachNote:
    "Serve is the strongest section — 81%. Volley needs work. Suggestion: net approach volley drills, 2× per week.",
};

export const TALENT = {
  totalScore: 75,
  maxScore: 100,
  label: "High talent",
  factors: [
    { k: "eye", name: "Eye-Hand Coordination", value: 7, cat: "physical" as const },
    { k: "speed", name: "Reaction & Speed", value: 8, cat: "physical" as const },
    { k: "bal", name: "Balance & Agility", value: 7, cat: "physical" as const },
    { k: "flex", name: "Flexibility", value: 6, cat: "physical" as const },
    { k: "foot", name: "Footwork & Court Mov.", value: 7, cat: "physical" as const },
    { k: "rhy", name: "Rhythm & Timing", value: 8, cat: "motor" as const },
    { k: "mot", name: "Motor Learning", value: 9, cat: "motor" as const },
    { k: "foc", name: "Focus & Mindset", value: 7, cat: "mental" as const },
    { k: "comp", name: "Competitive Attitude", value: 8, cat: "mental" as const },
    { k: "coach", name: "Coachability", value: 8, cat: "mental" as const },
  ],
  categories: [
    { k: "physical", name: "Physical", value: 35, max: 50, color: "#A8D847" },
    { k: "motor", name: "Motor", value: 17, max: 20, color: "#7DD3FC" },
    { k: "mental", name: "Mental", value: 23, max: 30, color: "#F2B544" },
  ],
  strongest: [
    { k: "Motor Learning", v: 9 },
    { k: "Rhythm & Timing", v: 8 },
    { k: "Competitive Attitude", v: 8 },
  ],
  needsWork: [
    { k: "Flexibility", v: 6 },
    { k: "Focus & Mindset", v: 7 },
    { k: "Footwork & Court Mov.", v: 7 },
  ],
  coachNote:
    "Fast learner with strong motor skills. Footwork needs attention. Recommend a 6-month structured program focused on lateral movement + court coverage.",
};
