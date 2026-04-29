"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBoard } from "@/components/board-provider";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/login", label: "Login" },
  { href: "/registration", label: "Registration" },
  { href: "/matching", label: "Matching" },
  { href: "/messaging", label: "Messaging" },
  { href: "/friend-requests", label: "Friend Requests" },
  { href: "/profile", label: "Profile" },
  { href: "/notifications", label: "Notifications" }
];

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state, signOut, hydrated } = useBoard();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Quiet Social</p>
          <h1>Introvert Connect</h1>
          <p className="sidebar-copy">
            A low-pressure social app where introverts can match, message, and connect through calmer workflows.
          </p>
        </div>

        <nav className="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-panel">
          <span className="panel-label">Local SQL State</span>
          <p>{hydrated ? "Hydrated from local SQLite-backed APIs." : "Loading app state..."}</p>
          <p>{state.currentUser ? `Signed in as ${state.currentUser.name}` : "No active user session."}</p>
          {state.currentUser ? (
            <button className="secondary-button" type="button" onClick={() => void signOut()}>
              Sign Out
            </button>
          ) : null}
        </div>
      </aside>

      <main className="page-content">{children}</main>
    </div>
  );
}
