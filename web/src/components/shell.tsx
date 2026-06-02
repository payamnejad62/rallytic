"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { DigitalClock } from "@/components/clock";

export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export const COACH_NAV: NavItem[] = [
  { href: "/coach", label: "Dashboard", icon: "layout-dashboard" },
  { href: "/coach/finance", label: "Finance & Subscription", icon: "wallet" },
  { href: "/coach/players", label: "Players Roster", icon: "users" },
  { href: "/coach/performance", label: "Performance Profile", icon: "user-circle" },
  { href: "/coach/plan", label: "Smart Coaching Plan", icon: "brain" },
  { href: "/coach/tactics", label: "Tennis Tactics Board", icon: "layout-board" },
  { href: "/coach/matches", label: "Match & Tournament", icon: "trophy" },
  { href: "/coach/itn", label: "ITN & Talent Test", icon: "checkup-list" },
  { href: "/coach/calendar", label: "Calendar", icon: "calendar" },
];

export const ACADEMY_NAV: NavItem[] = [
  { href: "/academy", label: "Dashboard", icon: "building-bank" },
  { href: "/academy/coaches", label: "Coaches", icon: "school" },
  { href: "/academy/compare", label: "Compare Coaches", icon: "arrows-shuffle" },
  { href: "/academy/analytics", label: "Analytics", icon: "chart-arcs" },
  { href: "/academy/players", label: "All Players", icon: "users-group" },
  { href: "/academy/finance", label: "Academy Finance", icon: "wallet" },
  { href: "/academy/notifications", label: "Notifications", icon: "bell" },
  { href: "/academy/history", label: "Evaluation history", icon: "history" },
  { href: "/academy/settings", label: "Settings", icon: "settings" },
];

function Sidebar({
  navSet,
  user,
  accountHref,
}: {
  navSet: "coach" | "academy";
  user: { name: string; initials: string; role: string; club: string };
  accountHref: string;
}) {
  const items = navSet === "academy" ? ACADEMY_NAV : COACH_NAV;
  const pathname = usePathname() || "";

  function isActive(href: string) {
    if (href === "/coach" || href === "/academy") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="r-sidebar">
      <div className="r-sidebar-rail" />
      <div className="r-sidebar-sheen" />
      <div className="r-sidebar-inner">
        <Link href={navSet === "academy" ? "/academy" : "/coach"} className="r-side-brand">
          <span className="rtile">R</span>
          <span className="txt">
            ally<span>t</span>
            <span className="i">i</span>
            <span>c</span>
          </span>
        </Link>
        <div className="r-mode-badge">
          {navSet === "academy" ? "Academy mode" : "Coach mode"}
        </div>

        <DigitalClock />

        <nav className="r-nav">
          {items.map((it) => {
            const active = isActive(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={"r-nav-item" + (active ? " on" : "")}
              >
                <Icon name={it.icon} />
                <span>{it.label}</span>
                {active && <Icon name="chevron-right" className="r-nav-chev" />}
              </Link>
            );
          })}
        </nav>

        <Link
          href={accountHref}
          className={"r-user" + (pathname.startsWith(accountHref) ? " on" : "")}
        >
          <div className="r-user-av">{user.initials}</div>
          <div className="r-user-meta">
            <div className="r-user-name">{user.name}</div>
            <div className="r-user-sub">
              {user.role} · {user.club}
            </div>
          </div>
          <Icon name="settings" className="r-user-ico" />
        </Link>
      </div>
    </aside>
  );
}

export function Topbar({
  title,
  breadcrumb,
  actions,
}: {
  title: string;
  breadcrumb: { label: string; dim?: boolean }[];
  actions?: ReactNode;
}) {
  return (
    <header className="r-topbar">
      <div>
        <div className="r-crumb">
          {breadcrumb.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="sep">/</span>}
              <span>{c.label}</span>
            </span>
          ))}
        </div>
        <h1 className="r-title">{title}</h1>
      </div>
      <div className="r-topbar-actions">{actions}</div>
    </header>
  );
}

export function GhostBtn({
  icon,
  children,
  onClick,
}: {
  icon?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="r-btn r-btn-ghost">
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

export function PrimaryBtn({
  icon,
  children,
  onClick,
  type = "button",
}: {
  icon?: string;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick} className="r-btn r-btn-primary">
      {icon && <Icon name={icon} />}
      {children}
    </button>
  );
}

export function SearchBar() {
  return (
    <div className="r-search">
      <Icon name="search" />
      <span>Search players, drills, matches…</span>
      <span className="kbd mono">⌘K</span>
    </div>
  );
}

export function Shell({
  navSet,
  children,
}: {
  navSet: "coach" | "academy";
  children: ReactNode;
}) {
  const user =
    navSet === "academy"
      ? { name: "Payam Nejad", initials: "PN", role: "Director", club: "Rally Court" }
      : { name: "Payam Nejad", initials: "PN", role: "Head Coach", club: "Berlin TC" };
  const accountHref = navSet === "academy" ? "/academy/settings" : "/coach/account";

  return (
    <div className="r-shell">
      <Sidebar navSet={navSet} user={user} accountHref={accountHref} />
      <main className="r-main">{children}</main>
    </div>
  );
}
