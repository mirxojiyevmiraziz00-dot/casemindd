import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LogIn, LogOut, UserRound } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    void supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (isLoading) {
    return <div className="h-9 w-28 animate-pulse rounded-md bg-muted" />;
  }

  if (!user) {
    return (
      <Button variant="premium" asChild>
        <Link to="/login">
          <LogIn className="h-4 w-4" /> Kirish
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm text-card-foreground md:flex">
        <UserRound className="h-4 w-4 text-legal-emerald" />
        <span className="max-w-40 truncate">{user.email}</span>
      </div>
      <Button variant="legal" onClick={() => void signOut()}>
        <LogOut className="h-4 w-4" /> Chiqish
      </Button>
    </div>
  );
}
