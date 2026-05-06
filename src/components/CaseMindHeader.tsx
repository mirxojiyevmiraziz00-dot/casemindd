import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, Gavel, Menu, Search, X } from "lucide-react";

import { AuthStatus } from "@/components/AuthStatus";
import { GlobalSearch } from "@/components/GlobalSearch";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/casemind-data";

export function CaseMindHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
          <Button variant="legal" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="legal" size="icon" asChild aria-label="Notifications">
            <Link to="/notifications"><Bell className="h-4 w-4" /></Link>
          </Button>
          <AuthStatus />
        </div>

        <Button variant="legal" size="icon" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Menu">
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl lg:hidden" role="dialog">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <span className="font-black text-foreground">Menyu</span>
            <Button variant="legal" size="icon" onClick={() => setMenuOpen(false)} aria-label="Yopish"><X className="h-4 w-4" /></Button>
          </div>
          <nav className="flex flex-col gap-1 p-5">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className="rounded-lg border bg-card px-4 py-3 font-semibold text-foreground hover:bg-secondary">
                {link.label}
              </Link>
            ))}
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="rounded-lg border bg-card px-4 py-3 font-semibold text-foreground hover:bg-secondary">Dashboard</Link>
            <Link to="/yurist-bilan-boglanish" onClick={() => setMenuOpen(false)} className="rounded-lg border bg-card px-4 py-3 font-semibold text-foreground hover:bg-secondary">Yurist bilan bog‘lanish</Link>
            <Button variant="legal" onClick={() => { setMenuOpen(false); setSearchOpen(true); }}><Search className="h-4 w-4" /> Qidiruv</Button>
            <div className="mt-3"><AuthStatus /></div>
          </nav>
        </div>
      )}

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
