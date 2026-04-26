import { Link } from "@tanstack/react-router";
import { Bell, Gavel, Menu, Moon, Search } from "lucide-react";

import { AuthStatus } from "@/components/AuthStatus";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/casemind-data";

export function CaseMindHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/40 bg-card shadow-glow">
            <Gavel className="h-5 w-5 text-accent" />
          </span>
          <span>
            <span className="block text-base font-black text-foreground">CaseMind</span>
            <span className="block text-xs text-muted-foreground">Global legal intelligence</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "bg-secondary text-foreground" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="legal" size="icon" asChild aria-label="Search">
            <Link to="/case-database"><Search className="h-4 w-4" /></Link>
          </Button>
          <Button variant="legal" size="icon" asChild aria-label="Notifications">
            <Link to="/notifications"><Bell className="h-4 w-4" /></Link>
          </Button>
          <Button variant="legal" size="icon" asChild aria-label="Dark mode">
            <Link to="/settings"><Moon className="h-4 w-4" /></Link>
          </Button>
          <AuthStatus />
        </div>

        <Button variant="legal" size="icon" className="md:hidden" asChild aria-label="Menu">
          <Link to="/dashboard"><Menu className="h-4 w-4" /></Link>
        </Button>
      </div>
    </header>
  );
}
