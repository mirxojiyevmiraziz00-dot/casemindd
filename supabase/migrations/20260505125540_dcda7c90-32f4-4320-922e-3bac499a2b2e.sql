CREATE TABLE public.consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  full_name text NOT NULL,
  contact text NOT NULL,
  situation text NOT NULL,
  area text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit consultation request"
ON public.consultation_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view all requests"
ON public.consultation_requests FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view own requests"
ON public.consultation_requests FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
