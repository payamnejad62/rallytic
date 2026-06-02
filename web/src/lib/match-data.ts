export type MatchRecord = {
  id: number;
  player: string;
  playerInitials: string;
  flag: string;
  opp: string;
  oppInitials: string;
  oppFlag: string;
  date: string;
  type: "Official" | "Friendly" | "Training";
  surface: "Clay" | "Hard" | "Grass";
  surfaceColor: string;
  result: "win" | "loss";
  sets: { p: number; o: number }[];
};

export const MATCHES: MatchRecord[] = [
  {
    id: 1,
    player: "Arman",
    playerInitials: "AR",
    flag: "🇩🇪",
    opp: "M. Hoffmann",
    oppInitials: "MH",
    oppFlag: "🇩🇪",
    date: "May 5, 2026",
    type: "Official",
    surface: "Clay",
    surfaceColor: "#E5685D",
    result: "win",
    sets: [
      { p: 6, o: 4 },
      { p: 7, o: 5 },
    ],
  },
  {
    id: 2,
    player: "Arman",
    playerInitials: "AR",
    flag: "🇩🇪",
    opp: "K. Larson",
    oppInitials: "KL",
    oppFlag: "🇺🇸",
    date: "May 2, 2026",
    type: "Friendly",
    surface: "Hard",
    surfaceColor: "#7DD3FC",
    result: "win",
    sets: [
      { p: 6, o: 3 },
      { p: 7, o: 6 },
    ],
  },
  {
    id: 3,
    player: "Arman",
    playerInitials: "AR",
    flag: "🇩🇪",
    opp: "Mike Karimi",
    oppInitials: "MK",
    oppFlag: "🇮🇷",
    date: "Apr 28, 2026",
    type: "Training",
    surface: "Grass",
    surfaceColor: "#A8D847",
    result: "loss",
    sets: [
      { p: 3, o: 6 },
      { p: 4, o: 6 },
    ],
  },
  {
    id: 4,
    player: "Arman",
    playerInitials: "AR",
    flag: "🇩🇪",
    opp: "S. Becker",
    oppInitials: "SB",
    oppFlag: "🇩🇪",
    date: "Apr 22, 2026",
    type: "Official",
    surface: "Hard",
    surfaceColor: "#7DD3FC",
    result: "win",
    sets: [
      { p: 7, o: 5 },
      { p: 6, o: 4 },
    ],
  },
  {
    id: 5,
    player: "Arman",
    playerInitials: "AR",
    flag: "🇩🇪",
    opp: "Jane Smith",
    oppInitials: "JS",
    oppFlag: "🇺🇸",
    date: "Apr 18, 2026",
    type: "Friendly",
    surface: "Clay",
    surfaceColor: "#E5685D",
    result: "loss",
    sets: [
      { p: 4, o: 6 },
      { p: 6, o: 7 },
    ],
  },
];

export const MATCH_STATS = {
  aces: 8,
  doubleFaults: 2,
  winners: 24,
  unforced: 11,
  firstServePct: 68,
  breakPoints: "3/5",
  coachNote:
    "Good serve today. Backhand cross-court improved. Net approach work still needs work.",
};
