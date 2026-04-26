import { CaseMindFooter } from "@/components/CaseMindFooter";
import { CaseMindHeader } from "@/components/CaseMindHeader";

export function CaseMindShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <CaseMindHeader />
      {children}
      <CaseMindFooter />
    </main>
  );
}
