
CREATE TABLE public.case_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  area TEXT,
  situation TEXT NOT NULL,
  ai_response TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.case_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own history" ON public.case_history
FOR SELECT TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users insert own history" ON public.case_history
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own history" ON public.case_history
FOR DELETE TO authenticated USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'));

CREATE INDEX idx_case_history_user ON public.case_history(user_id, created_at DESC);

CREATE TABLE public.lawyers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  photo_url TEXT,
  areas TEXT[] NOT NULL DEFAULT '{}',
  languages TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL,
  city TEXT,
  rating NUMERIC(2,1) DEFAULT 5.0,
  experience_years INT DEFAULT 0,
  contact_email TEXT,
  contact_phone TEXT,
  telegram TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone view active lawyers" ON public.lawyers
FOR SELECT USING (is_active = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage lawyers" ON public.lawyers
FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

ALTER TABLE public.consultation_requests
ADD COLUMN IF NOT EXISTS lawyer_id UUID REFERENCES public.lawyers(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS user_email TEXT;

INSERT INTO public.lawyers (full_name, photo_url, areas, languages, bio, city, rating, experience_years, contact_email, telegram) VALUES
('Mirxojiyev Aziz', null, ARRAY['Jinoyat huquqi','Fuqarolik huquqi','Biznes huquqi'], ARRAY['uz','ru','en'], 'Toshkent shahridagi tajribali advokat. Jinoyat va fuqarolik ishlari, shartnomalar va sud jarayonlarida 8 yillik tajriba.', 'Toshkent', 4.9, 8, 'mirxojiyev@casemind.uz', 'mirxojiyev'),
('Karimova Aziza', null, ARRAY['Oila huquqi','Mehnat huquqi'], ARRAY['uz','ru'], 'Oila, nikoh, aliment va mehnat nizolari bo''yicha mutaxassis. 6 yillik amaliyot.', 'Toshkent', 4.8, 6, 'aziza.k@casemind.uz', null),
('Daniel Reed', null, ARRAY['Biznes huquqi','Intellektual mulk','Migratsiya huquqi'], ARRAY['en','uz'], 'International counsel for cross-border business, IP licensing, and migration matters.', 'Dubai', 4.9, 12, 'daniel@casemind.uz', null),
('Saidov Javohir', null, ARRAY['Soliq huquqi','Biznes huquqi','Ma''muriy huquq'], ARRAY['uz','ru','en'], 'Soliq tekshiruvlari, biznes audit va davlat organlari bilan ishlash bo''yicha tajribali.', 'Toshkent', 4.7, 10, 'javohir@casemind.uz', null),
('Anvar Tursunov', null, ARRAY['Kiber huquq','Intellektual mulk'], ARRAY['uz','en','ru'], 'Data privacy, GDPR compliance va raqamli huquqlar bo''yicha mutaxassis.', 'Toshkent', 4.8, 5, 'anvar@casemind.uz', 'anvartech');
