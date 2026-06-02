export const FIN = {
  kpis: [
    { k: "Current plan", v: "Pro", sub: "Active", tone: "good" as const, icon: "crown" },
    { k: "Monthly revenue", v: "$480", sub: "↑ 12%", tone: "good" as const, icon: "cash" },
    { k: "Pending payments", v: 3, sub: "Follow up", tone: "med" as const, icon: "clock" },
    { k: "Days to expiry", v: 23, sub: "Renew now", tone: "weak" as const, icon: "calendar-off" },
  ],
  subscription: {
    plan: "Pro Coach Plan",
    start: "May 1, 2026",
    expiry: "Jun 30, 2026",
    billing: "Monthly · $29 / month",
  },
  plans: [
    {
      k: "basic",
      name: "Basic",
      price: "$9",
      cta: "Select",
      features: [
        { t: "Up to 5 players", on: true },
        { t: "Basic dashboard", on: true },
        { t: "Tactics Board", on: false },
        { t: "Financial reports", on: false },
      ],
    },
    {
      k: "pro",
      name: "Pro",
      price: "$29",
      cta: "Active",
      current: true,
      features: [
        { t: "Up to 30 players", on: true },
        { t: "Full dashboard", on: true },
        { t: "Tactics Board", on: true },
        { t: "Advanced reports", on: false },
      ],
    },
    {
      k: "elite",
      name: "Elite",
      price: "$59",
      cta: "Upgrade",
      features: [
        { t: "Unlimited players", on: true },
        { t: "Full dashboard", on: true },
        { t: "Tactics Board", on: true },
        { t: "Advanced reports", on: true },
      ],
    },
  ],
  payments: [
    { player: "Arman Rahimi", initials: "AR", amount: "$80", date: "May 5", status: "paid" as const },
    { player: "Jane Smith", initials: "JS", amount: "$80", date: "May 4", status: "paid" as const },
    { player: "Mike Karimi", initials: "MK", amount: "$60", date: "May 1", status: "pending" as const },
    { player: "Sara Hosseini", initials: "SH", amount: "$60", date: "Apr 25", status: "overdue" as const },
  ],
  invoices: [
    { player: "Arman Rahimi", initials: "AR", period: "May 2026 · Monthly", amount: "$80" },
    { player: "Jane Smith", initials: "JS", period: "May 2026 · Monthly", amount: "$80" },
    { player: "Mike Karimi", initials: "MK", period: "May 2026 · Monthly", amount: "$60" },
    { player: "Sara Hosseini", initials: "SH", period: "Apr 2026 · Monthly", amount: "$60" },
  ],
};
