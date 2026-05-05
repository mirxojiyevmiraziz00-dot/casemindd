import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { countries, legalAreas } from "@/lib/casemind-data";

const socials = [
  { Icon: Instagram, href: "https://instagram.com/_miraziz.1", label: "Instagram" },
  { Icon: Facebook, href: "https://facebook.com/Ado.Vis", label: "Facebook" },
  { Icon: Send, href: "https://t.me/mirxojiyev", label: "Telegram" },
];

export function CaseMindFooter() {
  return (
    <footer className="border-t bg-secondary/35 px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
        <div>
          <h2 className="text-3xl font-black text-foreground">CaseMind</h2>
          <p className="mt-4 max-w-sm leading-7 text-muted-foreground">
            O‘zbekiston va global huquqiy tajribani birlashtiruvchi AI legal-tech platforma.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ Icon, href, label }) => (
              <Button key={label} variant="legal" size="icon" asChild aria-label={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            ))}
            <Button variant="legal" size="icon" asChild aria-label="Email">
              <Link to="/yurist-bilan-boglanish"><Mail className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-foreground">Huquq sohalari</h3>
          <div className="mt-4 space-y-2">
            {legalAreas.slice(0, 6).map((area) => (
              <Link key={area.slug} to="/huquq-bolimlari" className="block text-sm text-muted-foreground hover:text-foreground">{area.title}</Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-foreground">Mamlakatlar</h3>
          <div className="mt-4 space-y-2">
            {countries.slice(0, 6).map((country) => (
              <Link key={country.slug} to="/mamlakatlar/$countryId" params={{ countryId: country.slug }} className="block text-sm text-muted-foreground hover:text-foreground">
                {country.flag} {country.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-foreground">Platforma</h3>
          <div className="mt-4 space-y-2">
            <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms" className="block text-sm text-muted-foreground hover:text-foreground">Terms of Use</Link>
            <Link to="/yurist-bilan-boglanish" className="block text-sm text-muted-foreground hover:text-foreground">Contact</Link>
            <Link to="/pricing" className="block text-sm text-muted-foreground hover:text-foreground">Tariflar</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
