
-- 1. Loosen schema for catalog-style entries
ALTER TABLE public.legal_documents
  ALTER COLUMN user_id DROP NOT NULL,
  ALTER COLUMN storage_path DROP NOT NULL,
  ALTER COLUMN file_name DROP NOT NULL,
  ALTER COLUMN document_type TYPE text USING document_type::text,
  ALTER COLUMN status TYPE text USING status::text;

ALTER TABLE public.legal_documents
  ADD COLUMN IF NOT EXISTS source_url text,
  ADD COLUMN IF NOT EXISTS legal_area text,
  ADD COLUMN IF NOT EXISTS description text;

-- 2. Refresh RLS for system-curated rows
DROP POLICY IF EXISTS "Users can update own legal documents" ON public.legal_documents;
DROP POLICY IF EXISTS "Users can delete own legal documents" ON public.legal_documents;
DROP POLICY IF EXISTS "Authenticated users can upload legal documents" ON public.legal_documents;

CREATE POLICY "Insert own or admin"
  ON public.legal_documents FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Update own or admin"
  ON public.legal_documents FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Delete own or admin"
  ON public.legal_documents FOR DELETE TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- 3. Seed system-curated catalog covering all legal areas
INSERT INTO public.legal_documents
  (title, document_type, language, legal_area, source_url, description, status)
VALUES
-- === Jinoyat huquqi (Criminal) ===
('Jinoyat kodeksi (O''zbekiston Respublikasi)', 'criminal_code_uz', 'uz', 'jinoyat', 'https://lex.uz/docs/111453', 'Amaldagi Jinoyat kodeksining rasmiy matni — Lex.uz', 'ready'),
('Jinoyat-protsessual kodeksi', 'procedural_code_uz', 'uz', 'jinoyat', 'https://lex.uz/docs/111463', 'JPK — tergov, ayblov va sud bosqichlari', 'ready'),
('Jinoiy javobgarlikka tortish — Plenum qarori 17 (19.12.2003)', 'plenum_decision', 'uz', 'jinoyat', 'https://lex.uz/docs/187425', 'Oliy sud Plenumining jinoyat ishlari bo''yicha yo''riqnomasi', 'ready'),
('Sud hukmlari to''g''risida — Plenum qarori 18 (25.06.2024)', 'plenum_decision', 'uz', 'jinoyat', 'https://lex.uz/docs/6940311', 'Hukm chiqarish, jazo individualligi va dalillar bahosi', 'ready'),
('Korrupsiya jinoyatlari — Plenum qarori 27 (27.12.2016)', 'plenum_decision', 'uz', 'jinoyat', 'https://lex.uz/docs/3081366', 'Korrupsion jinoyatlar bo''yicha sud amaliyoti', 'ready'),
('Mol-mulkka qarshi jinoyatlar — Plenum qarori 23 (15.09.2000)', 'plenum_decision', 'uz', 'jinoyat', 'https://lex.uz/docs/63858', 'O''g''irlik, talonchilik, firibgarlik bo''yicha sud amaliyoti', 'ready'),
('Шарҳлар — Жиноят Кодекси, 1-китоб (Рустамбоев М.Х.)', 'commentary', 'uz', 'jinoyat', NULL, 'M.X. Rustamboev — Jinoyat kodeksiga ilmiy sharhlar, 1-jild (PDF foydalanuvchi tomonidan yuklangan)', 'uploaded'),
('Шарҳлар — Жиноят Кодекси, 2-китоб (Рустамбоев М.Х.)', 'commentary', 'uz', 'jinoyat', NULL, 'M.X. Rustamboev — Jinoyat kodeksiga ilmiy sharhlar, 2-jild', 'uploaded'),
('Шарҳлар — Жиноят Кодекси, 3-китоб (Рустамбоев М.Х.)', 'commentary', 'uz', 'jinoyat', NULL, 'M.X. Rustamboev — Jinoyat kodeksiga ilmiy sharhlar, 3-jild', 'uploaded'),

-- === Fuqarolik huquqi (Civil) ===
('Fuqarolik kodeksi (1-qism)', 'civil_code_uz', 'uz', 'fuqarolik', 'https://lex.uz/docs/180550', 'O''zbekiston Fuqarolik kodeksining birinchi qismi', 'ready'),
('Fuqarolik kodeksi (2-qism)', 'civil_code_uz', 'uz', 'fuqarolik', 'https://lex.uz/docs/180551', 'Majburiyatlar, shartnomalar va alohida turlari', 'ready'),
('Fuqarolik-protsessual kodeksi', 'procedural_code_uz', 'uz', 'fuqarolik', 'https://lex.uz/docs/3517334', 'FPK — fuqarolik ishlari sud tartibi', 'ready'),
('Shartnomalardan kelib chiqadigan nizolar — Plenum qarori 20 (25.06.2024)', 'plenum_decision', 'uz', 'fuqarolik', 'https://lex.uz/docs/6940315', 'Shartnoma bahslarida sud amaliyoti', 'ready'),
('Zarar qoplash bo''yicha amaliyot — Plenum qarori 12 (24.05.2019)', 'plenum_decision', 'uz', 'fuqarolik', 'https://lex.uz/docs/4356195', 'Yetkazilgan zararni qoplash bo''yicha tushuntirishlar', 'ready'),
('Meros huquqi — Plenum qarori 24 (12.12.2008)', 'plenum_decision', 'uz', 'fuqarolik', 'https://lex.uz/docs/1455117', 'Vorislik va merosga oid sud amaliyoti', 'ready'),

-- === Oila huquqi ===
('Oila kodeksi', 'family_code_uz', 'uz', 'oila', 'https://lex.uz/docs/104720', 'Nikoh, ajralish, aliment, vasiylik bo''yicha asosiy kodeks', 'ready'),
('Nikohni bekor qilish — Plenum qarori 23 (11.09.1998)', 'plenum_decision', 'uz', 'oila', 'https://lex.uz/docs/63881', 'Ajralish ishlarida sud amaliyoti', 'ready'),
('Bolalar manfaatlarini himoya qilish — Plenum qarori 7 (28.04.2000)', 'plenum_decision', 'uz', 'oila', 'https://lex.uz/docs/63875', 'Voyaga yetmaganlar huquqlari va aliment', 'ready'),

-- === Mehnat huquqi ===
('Mehnat kodeksi (yangi tahriri)', 'labor_code_uz', 'uz', 'mehnat', 'https://lex.uz/docs/6257290', '2023-yildan amalda — Mehnat munosabatlari to''liq tartibi', 'ready'),
('Mehnat nizolari — Plenum qarori 21 (11.12.2013)', 'plenum_decision', 'uz', 'mehnat', 'https://lex.uz/docs/2284054', 'Ishdan bo''shatish va mehnat haqi bo''yicha sud amaliyoti', 'ready'),
('Ish haqi va kompensatsiya — Plenum qarori 8 (25.11.2011)', 'plenum_decision', 'uz', 'mehnat', 'https://lex.uz/docs/1929657', 'Ish haqini undirish bo''yicha tushuntirishlar', 'ready'),

-- === Soliq huquqi ===
('Soliq kodeksi (yangi tahriri)', 'tax_code_uz', 'uz', 'soliq', 'https://lex.uz/docs/4674893', '2020-yildan amalda bo''lgan Soliq kodeksi', 'ready'),
('Soliq nizolari — Plenum qarori 36 (19.12.2020)', 'plenum_decision', 'uz', 'soliq', 'https://lex.uz/docs/5183777', 'Soliq tekshiruvlari va shikoyatlar bo''yicha amaliyot', 'ready'),
('Soliq imtiyozlari — PQ-2847 (18.03.2017)', 'presidential_decree', 'uz', 'soliq', 'https://lex.uz/docs/3146124', 'Prezident qarori — soliq tartiblarini takomillashtirish', 'ready'),

-- === Ma'muriy huquq ===
('Ma''muriy javobgarlik to''g''risidagi kodeks', 'administrative_code_uz', 'uz', 'mamuriy', 'https://lex.uz/docs/97661', 'MJK — ma''muriy huquqbuzarliklar va jazolar', 'ready'),
('Ma''muriy sud ishlari — Plenum qarori 22 (25.06.2024)', 'plenum_decision', 'uz', 'mamuriy', 'https://lex.uz/docs/6940319', 'Ma''muriy sudlovga oid yo''riqnoma', 'ready'),
('Ma''muriy tartib-taomil — Plenum qarori 35 (30.11.2018)', 'plenum_decision', 'uz', 'mamuriy', 'https://lex.uz/docs/4070290', 'Davlat organlari qarorlarini shikoyat qilish', 'ready'),

-- === Iqtisodiy/biznes huquqi ===
('Iqtisodiy-protsessual kodeksi', 'procedural_code_uz', 'uz', 'biznes', 'https://lex.uz/docs/3517336', 'Iqtisodiy sudlarda nizolarni hal etish tartibi', 'ready'),
('Aksiyadorlik jamiyatlari to''g''risida qonun', 'business_law_uz', 'uz', 'biznes', 'https://lex.uz/docs/1186559', 'Korporativ boshqaruv, aksiyadorlar huquqlari', 'ready'),
('MChJ to''g''risida qonun', 'business_law_uz', 'uz', 'biznes', 'https://lex.uz/docs/15154', 'Mas''uliyati cheklangan jamiyat — asosiy hujjat', 'ready'),
('Tadbirkorlik faoliyati erkinligi — qonun', 'business_law_uz', 'uz', 'biznes', 'https://lex.uz/docs/1721155', 'Tadbirkorlik kafolatlari va tartiblari', 'ready'),
('Bankrotlik to''g''risida qonun', 'business_law_uz', 'uz', 'biznes', 'https://lex.uz/docs/4541729', 'Tugatish, qayta tashkil etish va kreditorlar', 'ready'),
('Iqtisodiy nizolar — Plenum qarori 21 (25.06.2024)', 'plenum_decision', 'uz', 'biznes', 'https://lex.uz/docs/6940323', 'Iqtisodiy sudlardagi nizolar bo''yicha amaliyot', 'ready'),

-- === Kiber huquq ===
('Shaxsiy ma''lumotlar to''g''risida qonun', 'cyber_law_uz', 'uz', 'kiber', 'https://lex.uz/docs/4831939', 'O''zbekistondagi data protection asosiy hujjati', 'ready'),
('Elektron raqamli imzo to''g''risida qonun', 'cyber_law_uz', 'uz', 'kiber', 'https://lex.uz/docs/65651', 'ERI va elektron hujjat aylanishi', 'ready'),
('Kiberxavfsizlik to''g''risida qonun', 'cyber_law_uz', 'uz', 'kiber', 'https://lex.uz/docs/6038218', 'Kiberhujumlar va davlat AT-tizimlarini himoya qilish', 'ready'),
('Axborotlashtirish to''g''risida qonun', 'cyber_law_uz', 'uz', 'kiber', 'https://lex.uz/docs/82956', 'Axborot resurslari va ularning huquqiy maqomi', 'ready'),

-- === Konstitutsiyaviy ===
('O''zbekiston Respublikasi Konstitutsiyasi (2023)', 'constitution_uz', 'uz', 'konstitutsiya', 'https://lex.uz/docs/6445145', 'Yangi tahrir — 30.04.2023 referendumi natijasi', 'ready'),
('Konstitutsiyaviy sud to''g''risida qonun', 'constitution_uz', 'uz', 'konstitutsiya', 'https://lex.uz/docs/3251961', 'Konstitutsiyaviy nazorat va sud tartibi', 'ready'),

-- === Xalqaro konventsiyalar (uploaded) ===
('Universal Declaration of Human Rights (UDHR)', 'international_convention', 'en', 'xalqaro', 'https://www.un.org/en/about-us/universal-declaration-of-human-rights', 'BMTning Inson huquqlari umumjahon deklaratsiyasi (1948)', 'ready'),
('International Covenant on Civil and Political Rights (ICCPR)', 'international_convention', 'en', 'xalqaro', 'https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights', 'Fuqarolik va siyosiy huquqlar to''g''risidagi xalqaro pakt', 'ready'),
('International Covenant on Economic, Social and Cultural Rights', 'international_convention', 'en', 'xalqaro', 'https://www.ohchr.org/en/instruments-mechanisms/instruments/international-covenant-economic-social-and-cultural-rights', 'Iqtisodiy, ijtimoiy va madaniy huquqlar pakti', 'ready'),
('Convention on the Rights of the Child (CRC)', 'international_convention', 'en', 'xalqaro', 'https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-child', 'Bola huquqlari to''g''risidagi konventsiya', 'ready'),
('Convention against Torture (CAT)', 'international_convention', 'en', 'xalqaro', 'https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-against-torture-and-other-cruel-inhuman-or-degrading', 'Qiynoqlarga qarshi konventsiya', 'ready'),
('CEDAW — Convention on the Elimination of All Forms of Discrimination against Women', 'international_convention', 'en', 'xalqaro', 'https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-elimination-all-forms-discrimination-against-women', 'Ayollarga nisbatan kamsitishni tugatish konventsiyasi', 'ready'),
('Convention on the Rights of Persons with Disabilities (CRPD)', 'international_convention', 'en', 'xalqaro', 'https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities.html', 'Nogironlar huquqlari to''g''risidagi konventsiya', 'ready'),
('ICERD — Elimination of All Forms of Racial Discrimination', 'international_convention', 'en', 'xalqaro', 'https://www.ohchr.org/en/instruments-mechanisms/instruments/international-convention-elimination-all-forms-racial', 'Irqiy kamsitishni tugatish to''g''risidagi konventsiya', 'ready'),
('ICRMW — Rights of All Migrant Workers and Members of Their Families', 'international_convention', 'en', 'xalqaro', 'https://www.ohchr.org/en/instruments-mechanisms/instruments/international-convention-protection-rights-all-migrant-workers', 'Migrant ishchilar va ularning oilalari huquqlari', 'ready'),
('ICPPED — Protection from Enforced Disappearance', 'international_convention', 'en', 'xalqaro', 'https://www.ohchr.org/en/instruments-mechanisms/instruments/international-convention-protection-all-persons-enforced', 'Majburiy yo''qolishlardan himoya konventsiyasi', 'ready'),

-- === Qo'shimcha xalqaro/yer/intellektual ===
('Yer kodeksi', 'land_code_uz', 'uz', 'fuqarolik', 'https://lex.uz/docs/142312', 'Yer munosabatlarini tartibga soluvchi kodeks', 'ready'),
('Uy-joy kodeksi', 'housing_code_uz', 'uz', 'fuqarolik', 'https://lex.uz/docs/144234', 'Uy-joy huquqi asosiy hujjati', 'ready'),
('Bojxona kodeksi', 'customs_code_uz', 'uz', 'soliq', 'https://lex.uz/docs/2858920', 'Tashqi savdo va bojxona rejimlari', 'ready'),
('Intellektual mulk to''g''risida qonun', 'ip_law_uz', 'uz', 'biznes', 'https://lex.uz/docs/119747', 'Mualliflik huquqi va patentlar', 'ready'),
('Banklar va bank faoliyati to''g''risida qonun', 'business_law_uz', 'uz', 'biznes', 'https://lex.uz/docs/4490865', 'Bank sektori huquqiy asoslari', 'ready'),
('Telekommunikatsiyalar to''g''risida qonun', 'cyber_law_uz', 'uz', 'kiber', 'https://lex.uz/docs/132810', 'Aloqa xizmatlari, internet provayderlari', 'ready'),
('Reklama to''g''risida qonun', 'business_law_uz', 'uz', 'biznes', 'https://lex.uz/docs/35221', 'Reklama faoliyati va cheklovlar', 'ready'),
('Atrof-muhitni muhofaza qilish to''g''risida qonun', 'environmental_law_uz', 'uz', 'mamuriy', 'https://lex.uz/docs/121595', 'Ekologik huquq asosiy hujjati', 'ready'),
('Iste''molchilar huquqlarini himoya qilish to''g''risida qonun', 'consumer_law_uz', 'uz', 'fuqarolik', 'https://lex.uz/docs/35408', 'Iste''molchilar himoyasi va sifat masalalari', 'ready'),
('Sog''liqni saqlash to''g''risida qonun', 'health_law_uz', 'uz', 'mamuriy', 'https://lex.uz/docs/41329', 'Tibbiy xizmat va shifokorlik faoliyati', 'ready'),
('Ta''lim to''g''risida qonun', 'education_law_uz', 'uz', 'mamuriy', 'https://lex.uz/docs/5013007', 'Ta''lim tizimi huquqiy asoslari', 'ready'),
('Jismoniy tarbiya va sport to''g''risida qonun', 'other', 'uz', 'mamuriy', 'https://lex.uz/docs/2978621', 'Sport sohasidagi huquqiy munosabatlar', 'ready'),
('Migratsiya to''g''risida qonun', 'migration_law_uz', 'uz', 'mamuriy', 'https://lex.uz/docs/4470302', 'Migratsiya, fuqarolik va viza tartiblari', 'ready');
