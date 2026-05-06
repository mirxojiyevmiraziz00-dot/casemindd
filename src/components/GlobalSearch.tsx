import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { Bot, FileText, Globe2, Scale, UsersRound } from "lucide-react";

import { caseDatabase, countries, legalAreas, navLinks } from "@/lib/casemind-data";

type Props = { open: boolean; onClose: () => void };

export function GlobalSearch({ open, onClose }: Props) {
  const navigate = useNavigate();
  if (!open) return null;

  const go = (to: string, params?: Record<string, string>) => {
    onClose();
    void navigate({ to, params } as never);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-background/70 px-5 py-24 backdrop-blur-md" onClick={onClose} role="dialog" aria-modal="true">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border bg-card shadow-premium" onClick={(e) => e.stopPropagation()}>
        <Command label="Global qidiruv">
          <div className="border-b px-4 py-3">
            <Command.Input autoFocus placeholder="Qidiring: case, mamlakat, soha, sahifa..." className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground" />
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-center text-sm text-muted-foreground">Hech narsa topilmadi.</Command.Empty>

            <Command.Group heading="Sahifalar" className="px-2 py-2 text-xs font-semibold uppercase text-accent">
              {navLinks.map((link) => (
                <Command.Item key={link.to} value={`page ${link.label}`} onSelect={() => go(link.to)} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary aria-selected:bg-secondary">
                  <Bot className="h-4 w-4 text-accent" /> {link.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Huquq sohalari" className="px-2 py-2 text-xs font-semibold uppercase text-accent">
              {legalAreas.map((area) => (
                <Command.Item key={area.slug} value={`area ${area.title}`} onSelect={() => go("/huquq-bolimlari/$slug", { slug: area.slug })} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary aria-selected:bg-secondary">
                  <Scale className="h-4 w-4 text-accent" /> {area.title}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Mamlakatlar" className="px-2 py-2 text-xs font-semibold uppercase text-accent">
              {countries.map((c) => (
                <Command.Item key={c.slug} value={`country ${c.name}`} onSelect={() => go("/mamlakatlar/$countryId", { countryId: c.slug })} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary aria-selected:bg-secondary">
                  <Globe2 className="h-4 w-4 text-accent" /> {c.flag} {c.name}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Case'lar" className="px-2 py-2 text-xs font-semibold uppercase text-accent">
              {caseDatabase.slice(0, 12).map((c) => (
                <Command.Item key={c.slug} value={`case ${c.title} ${c.tags.join(" ")}`} onSelect={() => go("/case-database")} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary aria-selected:bg-secondary">
                  <FileText className="h-4 w-4 text-accent" /> {c.title} <span className="ml-auto text-xs text-muted-foreground">{c.country}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Yuristlar" className="px-2 py-2 text-xs font-semibold uppercase text-accent">
              <Command.Item value="lawyers list" onSelect={() => go("/yuristlar")} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-secondary aria-selected:bg-secondary">
                <UsersRound className="h-4 w-4 text-accent" /> Barcha yuristlar
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
