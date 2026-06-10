
-- 1. legal_documents SELECT split
DROP POLICY IF EXISTS "Anyone can view legal documents" ON public.legal_documents;
CREATE POLICY "Public seeded documents readable"
  ON public.legal_documents
  FOR SELECT
  TO anon, authenticated
  USING (user_id IS NULL);
CREATE POLICY "Owners and admins view uploaded documents"
  ON public.legal_documents
  FOR SELECT
  TO authenticated
  USING (user_id IS NOT NULL AND (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::app_role)));

-- 2. storage: restrict reads to owners/admins
DROP POLICY IF EXISTS "Legal documents are readable" ON storage.objects;
CREATE POLICY "Owners and admins read legal documents"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'legal-documents'
    AND (
      (auth.uid())::text = (storage.foldername(name))[1]
      OR public.has_role(auth.uid(), 'admin'::app_role)
    )
  );

-- 3. consultation_requests insert tightening
DROP POLICY IF EXISTS "Anyone can submit consultation request" ON public.consultation_requests;
CREATE POLICY "Anon can submit without user_id"
  ON public.consultation_requests
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);
CREATE POLICY "Authenticated submit own request"
  ON public.consultation_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- 4. wallets admin delete policy
DROP POLICY IF EXISTS "Admins delete wallets" ON public.wallets;
CREATE POLICY "Admins delete wallets"
  ON public.wallets
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 5. credit_wallet hardening
CREATE OR REPLACE FUNCTION public.credit_wallet(_user_id uuid, _amount numeric)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  IF auth.uid() IS NULL OR auth.uid() <> _user_id THEN
    RAISE EXCEPTION 'Not authorized to credit this wallet';
  END IF;
  IF _amount IS NULL OR _amount <= 0 THEN
    RAISE EXCEPTION 'Invalid amount';
  END IF;
  INSERT INTO public.wallets (user_id, balance, total_earned)
  VALUES (_user_id, _amount, _amount)
  ON CONFLICT (user_id) DO UPDATE
    SET balance = wallets.balance + _amount,
        total_earned = wallets.total_earned + _amount,
        updated_at = now();
END; $function$;

REVOKE EXECUTE ON FUNCTION public.credit_wallet(uuid, numeric) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.credit_wallet(uuid, numeric) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
