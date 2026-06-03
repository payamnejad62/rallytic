"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/icon";
import { DigitalClock } from "@/components/clock";
import { LangSwitcher } from "@/components/lang-switcher";

export type NavItem = {
  href: string;
  labelKey: string;
  icon: string;
};

export const COACH_NAV: NavItem[] = [
  { href: "/coach", labelKey: "dashboard", icon: "layout-dashboard" },
  { href: "/coach/finance", labelKey: "finance", icon: "wallet" },
  { href: "/coach/players", labelKey: "players", icon: "users" },
  { href: "/coach/performance", labelKey: "performance", icon: "user-circle" },
  { href: "/coach/plan", labelKey: "plan", icon: "brain" },
  { href: "/coach/tactics", labelKey: "tactics", icon: "layout-board" },
  { href: "/coach/matches", labelKey: "matches", icon: "trophy" },
  { href: "/coach/itn", labelKey: "itn", icon: "checkup-list" },
  { href: "/coach/calendar", labelKey: "calendar", icon: "calendar" },
];

export const ACADEMY_NAV: NavItem[] = [
  { href: "/academy", labelKey: "dashboard", icon: "building-bank" },
  { href: "/academy/coaches", labelKey: "coaches", icon: "school" },
  { href: "/academy/compare", labelKey: "compare", icon: "arrows-shuffle" },
  { href: "/academy/analytics", labelKey: "analytics", icon: "chart-arcs" },
  { href: "/academy/players", labelKey: "allPlayers", icon: "users-group" },
  { href: "/academy/finance", labelKey: "academyFinance", icon: "wallet" },
  { href: "/academy/notifications", labelKey: "notifications", icon: "bell" },
  { href: "/academy/history", labelKey: "history", icon: "history" },
  { href: "/academy/settings", labelKey: "settings", icon: "settings" },
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
  const locale = useLocale();
  const t = useTranslations("nav");
  const tShell = useTranslations("shell");
  const items = navSet === "academy" ? ACADEMY_NAV : COACH_NAV;
  const pathname = usePathname() || "";

  function localized(path: string) {
    return `/${locale}${path}`;
  }

  function isActive(href: string) {
    const full = localized(href);
    if (href === "/coach" || href === "/academy") return pathname === full;
    return pathname === full || pathname.startsWith(full + "/");
  }

  return (
    <aside className="r-sidebar">
      <div className="r-sidebar-rail" />
      <div className="r-sidebar-sheen" />
      <div className="r-sidebar-inner">
        <Link
          href={localized(navSet === "academy" ? "/academy" : "/coach")}
          className="r-side-brand"
        >
          <span className="rtile">R</span>
          <span className="txt">
            ally<span>t</span>
            <span className="i">i</span>
            <span>c</span>
          </span>
        </Link>
        <div className="r-mode-badge">
          {navSet === "academy" ? tShell("modeAcademy") : tShell("modeCoach")}
        </div>

        <DigitalClock />

        <nav className="r-nav">
          {items.map((it) => {
            const active = isActive(it.href);
            return (
              <Link
                key={it.href}
                href={localized(it.href)}
                className={"r-nav-item" + (active ? " on" : "")}
              >
                <Icon name={it.icon} />
                <span>{t(it.labelKey)}</span>
                {active && <Icon name="chevron-right" className="r-nav-chev" />}
              </Link>
            );
          })}
        </nav>

        <Link
          href={localized(accountHref)}
          className={"r-user" + (pathname.startsWith(localized(accountHref)) ? " on" : "")}
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
      <div className="r-topbar-actions">
        <LangSwitcher compact />
        {actions}
      </div>
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
  const t = useTranslations("shell");
  return (
    <div className="r-search">
      <Icon name="search" />
      <span>{t("search")}</span>
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
  const tShell = useTranslations("shell");
  const user =
    navSet === "academy"
      ? { name: "Klaus Berger", initials: "KB", role: tShell("director"), club: "Berlin TA" }
      : { name: "Payam Nejad", initials: "PN", role: tShell("headCoach"), club: "Berlin TC" };
  const accountHref = navSet === "academy" ? "/academy/settings" : "/coach/account";

  return (
    <div className="r-shell">
      <Sidebar navSet={navSet} user={user} accountHref={accountHref} />
      <main className="r-main">{children}</main>
    </div>
  );
}
