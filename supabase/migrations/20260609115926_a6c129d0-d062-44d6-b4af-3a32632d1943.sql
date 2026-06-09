
-- wallets
CREATE TABLE public.wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  balance numeric(12,2) NOT NULL DEFAULT 0,
  total_earned numeric(12,2) NOT NULL DEFAULT 0,
  total_withdrawn numeric(12,2) NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.wallets TO authenticated;
GRANT ALL ON public.wallets TO service_role;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own wallet select" ON public.wallets FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own wallet insert" ON public.wallets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own wallet update" ON public.wallets FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_wallets_updated BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- payment_cards (PCI-safe: only last 4)
CREATE TABLE public.payment_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_holder text NOT NULL,
  last4 text NOT NULL CHECK (last4 ~ '^[0-9]{4}$'),
  expiry_month int NOT NULL CHECK (expiry_month BETWEEN 1 AND 12),
  expiry_year int NOT NULL CHECK (expiry_year BETWEEN 2024 AND 2099),
  bank_name text,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.payment_cards TO authenticated;
GRANT ALL ON public.payment_cards TO service_role;
ALTER TABLE public.payment_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own cards all" ON public.payment_cards FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_cards_updated BEFORE UPDATE ON public.payment_cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- withdrawal_requests
CREATE TABLE public.withdrawal_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id uuid NOT NULL REFERENCES public.payment_cards(id) ON DELETE RESTRICT,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  status text NOT NULL DEFAULT 'pending',
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.withdrawal_requests TO authenticated;
GRANT ALL ON public.withdrawal_requests TO service_role;
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own withdrawals select" ON public.withdrawal_requests FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "own withdrawals insert" ON public.withdrawal_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "admin withdrawals update" ON public.withdrawal_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_withdrawals_updated BEFORE UPDATE ON public.withdrawal_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- auto-create wallet for new auth users
CREATE OR REPLACE FUNCTION public.handle_new_user_wallet()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.wallets (user_id) VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS on_auth_user_created_wallet ON auth.users;
CREATE TRIGGER on_auth_user_created_wallet AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_wallet();

-- backfill wallets for existing users
INSERT INTO public.wallets (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- function to credit wallet (called from serverFn when user asks AI a question)
CREATE OR REPLACE FUNCTION public.credit_wallet(_user_id uuid, _amount numeric)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.wallets (user_id, balance, total_earned)
  VALUES (_user_id, _amount, _amount)
  ON CONFLICT (user_id) DO UPDATE
    SET balance = wallets.balance + _amount,
        total_earned = wallets.total_earned + _amount,
        updated_at = now();
END; $$;
GRANT EXECUTE ON FUNCTION public.credit_wallet(uuid, numeric) TO authenticated;
