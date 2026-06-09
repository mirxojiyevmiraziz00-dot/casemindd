import {
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Building2,
  Cpu,
  FileText,
  Fingerprint,
  Flag,
  Gavel,
  Globe2,
  HeartHandshake,
  Landmark,
  Languages,
  LockKeyhole,
  Scale,
  ScrollText,
  Search,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  { label: "AI tahlil", to: "/ai-tahlil" },
  { label: "Case database", to: "/case-database" },
  { label: "Bo‘limlar", to: "/huquq-bolimlari" },
  { label: "Mamlakatlar", to: "/mamlakatlar" },
  { label: "Yuristlar", to: "/yuristlar" },
  { label: "Media", to: "/media" },
  { label: "Academy", to: "/academy" },
  { label: "Hamyon", to: "/hamyon" },
] as const;

export type LegalArea = {
  slug: string;
  title: string;
  icon: typeof ShieldCheck;
  tone: string;
  description: string;
  sources: { label: string; url: string }[];
  caseSlugs: string[];
};

export const legalAreas: LegalArea[] = [
  { slug: "jinoyat", title: "Jinoyat huquqi", icon: ShieldCheck, tone: "Tergov, sud va javobgarlik xavfini baholash.", description: "Gumon, ayblov, tergov, ekspertiza va sud bosqichida shaxs huquqlari. O‘zbekiston Jinoyat va Jinoyat-protsessual kodekslari hamda xalqaro standartlar.",
    sources: [
      { label: "Lex.uz — Jinoyat kodeksi", url: "https://lex.uz/docs/111453" },
      { label: "Lex.uz — JPK", url: "https://lex.uz/docs/111463" },
      { label: "BAILII (UK common law)", url: "https://www.bailii.org/" },
    ], caseSlugs: ["miranda-v-arizona", "oliy-sud-plenum-dalillar"] },
  { slug: "fuqarolik", title: "Fuqarolik huquqi", icon: Scale, tone: "Shartnomalar, zarar, mulk va majburiyatlar.", description: "Shartnoma majburiyatlari, zarar, mulk huquqi va kompensatsiya. UK Tort va Fransiya Code civil tajribasi.",
    sources: [
      { label: "Lex.uz — Fuqarolik kodeksi", url: "https://lex.uz/docs/180550" },
      { label: "EUR-Lex civil law", url: "https://eur-lex.europa.eu/" },
    ], caseSlugs: ["donoghue-v-stevenson", "france-jandheur", "japan-product-recall"] },
  { slug: "oila", title: "Oila huquqi", icon: HeartHandshake, tone: "Nikoh, aliment, vasiylik va farzand masalalari.", description: "Oila kodeksi va xalqaro Hague Convention amaliyoti.",
    sources: [
      { label: "Lex.uz — Oila kodeksi", url: "https://lex.uz/docs/104720" },
      { label: "HCCH Hague Conventions", url: "https://www.hcch.net/" },
    ], caseSlugs: [] },
  { slug: "mehnat", title: "Mehnat huquqi", icon: UsersRound, tone: "Ishdan bo‘shatish, ish haqi, intizom va kompensatsiya.", description: "Mehnat shartnomasi, intizom, kompensatsiya, ILO standartlari.",
    sources: [
      { label: "Lex.uz — Mehnat kodeksi", url: "https://lex.uz/docs/142859" },
      { label: "ILO Conventions", url: "https://www.ilo.org/dyn/normlex/" },
    ], caseSlugs: ["ish-haqi-claim"] },
  { slug: "soliq", title: "Soliq huquqi", icon: Banknote, tone: "Tekshiruv, jarima, hisob-kitob va rezidentlik.", description: "Soliq tekshiruvi, rezidentlik, OECD BEPS va xalqaro shartnomalar.",
    sources: [
      { label: "Lex.uz — Soliq kodeksi", url: "https://lex.uz/docs/4674893" },
      { label: "OECD Tax", url: "https://www.oecd.org/tax/" },
    ], caseSlugs: [] },
  { slug: "mamuriy", title: "Ma’muriy huquq", icon: Landmark, tone: "Davlat organlari qarorlari va ma’muriy javobgarlik.", description: "Ma’muriy ish, jarima, ma’muriy sud va shikoyat tartibi.",
    sources: [
      { label: "Lex.uz — Ma'muriy kodeks", url: "https://lex.uz/docs/97661" },
    ], caseSlugs: ["miller-prorogation"] },
  { slug: "biznes", title: "Biznes huquqi", icon: BriefcaseBusiness, tone: "Kompaniya, investitsiya, M&A va compliance.", description: "Korporativ tuzilma, investitsiya, M&A, arbitraj va xalqaro compliance.",
    sources: [
      { label: "Lex.uz — Aksiyadorlik to‘g‘risida", url: "https://lex.uz/docs/142859" },
      { label: "ICC Arbitration", url: "https://iccwbo.org/dispute-resolution-services/" },
    ], caseSlugs: ["difc-injunction", "startup-term-sheet", "barcelona-traction"] },
  { slug: "kiber", title: "Kiber huquq", icon: LockKeyhole, tone: "Data privacy, fraud, raqamli dalillar va xavfsizlik.", description: "Shaxsiy ma'lumotlar, GDPR, kiber jinoyatlar va data breach.",
    sources: [
      { label: "Lex.uz — Personal data law", url: "https://lex.uz/docs/4831939" },
      { label: "GDPR full text", url: "https://gdpr-info.eu/" },
    ], caseSlugs: ["eu-gdpr", "online-fraud-card", "deutsche-wohnen", "korea-defamation"] },
  { slug: "ip", title: "Intellektual mulk", icon: Fingerprint, tone: "Brend, patent, mualliflik huquqi va litsenziyalar.", description: "Tovar belgisi, patent, mualliflik huquqi, WIPO mexanizmlari.",
    sources: [
      { label: "WIPO", url: "https://www.wipo.int/" },
      { label: "Lex.uz — IP qonunlari", url: "https://lex.uz/" },
    ], caseSlugs: [] },
  { slug: "migratsiya", title: "Migratsiya huquqi", icon: Globe2, tone: "Viza, yashash ruxsati, deportatsiya va fuqarolik.", description: "Viza, yashash ruxsati, fuqarolik va xalqaro himoya.",
    sources: [
      { label: "UNHCR", url: "https://www.unhcr.org/" },
      { label: "EU Migration Portal", url: "https://home-affairs.ec.europa.eu/" },
    ], caseSlugs: [] },
  { slug: "konstitutsiya", title: "Konstitutsiyaviy huquq", icon: ScrollText, tone: "Asosiy huquqlar, erkinliklar va davlat kafolatlari.", description: "Asosiy huquqlar, erkinliklar va konstitutsiyaviy nazorat amaliyoti.",
    sources: [
      { label: "Lex.uz — Konstitutsiya", url: "https://lex.uz/docs/35869" },
      { label: "Venice Commission", url: "https://www.venice.coe.int/" },
    ], caseSlugs: ["luth-case", "brown-v-board", "turkey-individual-app"] },
];

export type Country = {
  slug: string; name: string; region: string; flag: string;
  laws: string; courts: string; precedents: string; culture: string; resolution: string;
  sourceUrl: string;
};

export const countries: Country[] = [
  { slug: "usa", name: "USA", region: "Common law", flag: "🇺🇸", laws: "Federal + state law, Constitution, U.S. Code", courts: "Federal courts, state courts, Supreme Court", precedents: "Marbury v. Madison, Miranda, Brown", culture: "Precedent va litigation kuchli", resolution: "Settlement, mediation, jury trial", sourceUrl: "https://www.supremecourt.gov/" },
  { slug: "uk", name: "UK", region: "Common law", flag: "🇬🇧", laws: "Acts of Parliament, common law, Human Rights Act", courts: "Magistrates, Crown Court, High Court, Supreme Court", precedents: "Donoghue v Stevenson, Miller", culture: "Professional advocacy va precedent", resolution: "Barrister opinion, mediation, court claim", sourceUrl: "https://www.bailii.org/" },
  { slug: "germany", name: "Germany", region: "EU civil law", flag: "🇩🇪", laws: "Grundgesetz, BGB, StGB, EU law", courts: "Ordinary, administrative, constitutional courts", precedents: "Lüth, Solange, BVerfG cases", culture: "Kodifikatsiya va protsessual aniqlik", resolution: "Legal notice, settlement, court procedure", sourceUrl: "https://www.bundesverfassungsgericht.de/EN/" },
  { slug: "france", name: "France", region: "EU civil law", flag: "🇫🇷", laws: "Code civil, Code pénal, EU regulations", courts: "Tribunal judiciaire, Cour d'appel, Cour de cassation", precedents: "Perruche, Jand'heur", culture: "Davlat-huquqiy institutlar kuchli", resolution: "Conciliation, administrative appeal, court", sourceUrl: "https://www.legifrance.gouv.fr/" },
  { slug: "uae", name: "UAE", region: "Mixed / civil law", flag: "🇦🇪", laws: "Federal laws, emirate regulations, DIFC/ADGM rules", courts: "Federal, local emirate, DIFC/ADGM courts", precedents: "DIFC commercial cases", culture: "Tezkor biznes va arbitraj muhit", resolution: "Arbitration, mediation, court filing", sourceUrl: "https://www.difccourts.ae/" },
  { slug: "turkey", name: "Turkey", region: "Civil law", flag: "🇹🇷", laws: "Constitution, Turkish Civil Code, Penal Code", courts: "Civil, criminal, administrative, constitutional courts", precedents: "Constitutional Court individual applications", culture: "Kodifikatsiya va davlat nazorati", resolution: "Notarial notice, mediation, lawsuit", sourceUrl: "https://www.anayasa.gov.tr/en/" },
  { slug: "japan", name: "Japan", region: "Civil law", flag: "🇯🇵", laws: "Civil Code, Penal Code, Companies Act", courts: "District courts, High Courts, Supreme Court", precedents: "Sunagawa, pharmaceutical cases", culture: "Konsensus, aniqlik va reputatsiya", resolution: "Negotiation, ADR, court", sourceUrl: "https://www.courts.go.jp/english/" },
  { slug: "south-korea", name: "South Korea", region: "Civil law", flag: "🇰🇷", laws: "Constitution, Civil Act, Criminal Act", courts: "District, High, Supreme, Constitutional Court", precedents: "Constitutional freedom cases", culture: "Digital compliance va tezkor sudlar", resolution: "Mediation, prosecution, court", sourceUrl: "https://english.ccourt.go.kr/" },
  { slug: "uzbekistan", name: "Uzbekistan", region: "Civil law", flag: "🇺🇿", laws: "Konstitutsiya, kodekslar, qonunlar", courts: "Fuqarolik, jinoyat, iqtisodiy, ma’muriy sudlar", precedents: "Oliy sud Plenum qarorlari", culture: "Kodifikatsiya va Plenum sharhlari", resolution: "Ariza, shikoyat, mediatsiya, sud", sourceUrl: "https://lex.uz/" },
  { slug: "international", name: "Xalqaro huquq", region: "Treaties / arbitration", flag: "🌐", laws: "Treaties, conventions, model laws", courts: "ICJ, ICC, arbitration tribunals", precedents: "Barcelona Traction, Nicaragua, investment awards", culture: "Davlatlararo va transchegaraviy tahlil", resolution: "Diplomatic, arbitration, treaty claim", sourceUrl: "https://www.icj-cij.org/" },
];

export type CaseRecord = {
  slug: string;
  title: string;
  country: string;
  area: string;
  risk: string;
  summary: string;
  facts: string;
  comparison: string;
  nextSteps: string[];
  tags: string[];
  source: string;
  sourceUrl: string;
  visualPrompt: string;
};

export const caseDatabase: CaseRecord[] = [
  { slug: "miranda-v-arizona", title: "Miranda v. Arizona", country: "USA", area: "Jinoyat", risk: "Yuqori",
    summary: "Gumon qilinuvchiga huquqlarini tushuntirish zarurligi bo‘yicha mashhur precedent.",
    facts: "Politsiya so‘roqida shaxsga sukut saqlash va advokat olish huquqi tushuntirilmagan.",
    comparison: "O‘zbekistonda ham himoya huquqi, advokat ishtiroki va dalilning qonuniyligi muhim; AQSHda warning berilmasa, ko‘rsatma chiqarib tashlanishi mumkin.",
    nextSteps: ["So‘roq bayonnomasini tekshirish", "Advokat ishtiroki bo‘lgan-bo‘lmaganini aniqlash", "Dalilni maqbul emas deb topish masalasini ko‘tarish"],
    tags: ["due process", "police", "rights"], source: "U.S. Supreme Court 384 U.S. 436 (1966)",
    sourceUrl: "https://supreme.justia.com/cases/federal/us/384/436/",
    visualPrompt: "cinematic interrogation room, legal rights card, courthouse silhouette, premium global justice style" },
  { slug: "donoghue-v-stevenson", title: "Donoghue v Stevenson", country: "UK", area: "Fuqarolik", risk: "O‘rta",
    summary: "Ehtiyotkorlik majburiyati va zarar uchun javobgarlik konsepsiyasi.",
    facts: "Iste’molchi mahsulotdagi xavf sabab zarar ko‘rgan va ishlab chiqaruvchi javobgarligi muhokama qilingan.",
    comparison: "Fuqarolik huquqida zarar, sababiy bog‘liqlik va ayb tahlil qilinadi; common law tizimida duty of care asosiy testga aylangan.",
    nextSteps: ["Zararni hujjatlashtirish", "Ekspertiza va cheklarni saqlash", "Da’vo yoki settlement yo‘lini tanlash"],
    tags: ["negligence", "tort", "duty"], source: "UK House of Lords [1932] AC 562",
    sourceUrl: "https://www.bailii.org/uk/cases/UKHL/1932/100.html",
    visualPrompt: "premium product liability courtroom, evidence table, consumer protection documents, London legal atmosphere" },
  { slug: "luth-case", title: "Lüth Case", country: "Germany", area: "Konstitutsiyaviy", risk: "O‘rta",
    summary: "Asosiy huquqlarning xususiy huquq munosabatlariga ta’siri.",
    facts: "Shaxsning fikr bildirish erkinligi va xususiy nizodagi cheklovlar muvozanati ko‘rilgan.",
    comparison: "Germaniyada konstitutsiyaviy qadriyatlar xususiy huquqqa ham ta’sir qiladi; O‘zbekistonda ham sha’n, qadr-qimmat va so‘z erkinligi muvozanatlanadi.",
    nextSteps: ["Huquqiy manfaatlarni ajratish", "Cheklov mutanosibligini baholash", "Konstitutsiyaviy kafolatlarni ko‘rsatish"],
    tags: ["rights", "speech", "constitution"], source: "BVerfGE 7, 198 (1958)",
    sourceUrl: "https://www.bundesverfassungsgericht.de/SharedDocs/Entscheidungen/DE/1958/01/rs19580115_1bvr040051.html",
    visualPrompt: "German constitutional court chamber, freedom of expression documents, balanced scales, cinematic silver lighting" },
  { slug: "difc-injunction", title: "DIFC Commercial Injunction", country: "UAE", area: "Biznes", risk: "Yuqori",
    summary: "Transchegaraviy biznes nizosida vaqtinchalik himoya chorasi.",
    facts: "Kompaniya aktivlar chiqib ketish xavfi borligini ko‘rsatib, tezkor injunction so‘ragan.",
    comparison: "BAAda DIFC/ADGM kabi zonalarda common law uslubi kuchli; O‘zbekistonda iqtisodiy sud orqali ta’minlash chorasi so‘raladi.",
    nextSteps: ["Shartnoma va yurisdiksiya bandini tekshirish", "Aktivlar bo‘yicha dalil yig‘ish", "Arbitraj yoki sud strategiyasini tanlash"],
    tags: ["injunction", "commercial", "arbitration"], source: "DIFC Courts judgments database",
    sourceUrl: "https://www.difccourts.ae/rules-decisions/judgments-orders",
    visualPrompt: "Dubai financial district arbitration room, frozen assets dashboard, premium legal-tech motion scene" },
  { slug: "oliy-sud-plenum-dalillar", title: "Oliy sud Plenum — dalillar", country: "Uzbekistan", area: "Jinoyat", risk: "Yuqori",
    summary: "Dalillar qonuniyligi va sudda baholanishi bo‘yicha yo‘nalish.",
    facts: "Tergovda olingan dalilning protsessual tartibga mosligi va suddagi bahosi tekshiriladi.",
    comparison: "Ko‘plab davlatlarda noqonuniy dalil exclusionary rule yoki maqbullik testi orqali cheklanadi.",
    nextSteps: ["Dalil manbasini aniqlash", "Protsessual buzilishlarni yozib chiqish", "Sudga iltimosnoma tayyorlash"],
    tags: ["dalil", "sud", "plenum"], source: "Oliy sud Plenum qarori",
    sourceUrl: "https://lex.uz/docs/3937012",
    visualPrompt: "Uzbek courtroom evidence board, procedural code pages, judge bench, cinematic blue silver lighting" },
  { slug: "eu-gdpr", title: "EU GDPR enforcement", country: "EU", area: "Kiber", risk: "Yuqori",
    summary: "Shaxsiy ma’lumotlarni qayta ishlashda compliance va jarimalar.",
    facts: "Kompaniya foydalanuvchi roziligisiz ma’lumot yig‘gani yoki himoya choralarini yetarli ko‘rmagani da’vo qilingan.",
    comparison: "EUda jarimalar yuqori; O‘zbekistonda ham shaxsga doir ma’lumotlar bo‘yicha rozilik, maqsad va xavfsizlik talablari bor.",
    nextSteps: ["Privacy policy va consent loglarni tekshirish", "Data breach timeline tuzish", "Regulyatorga javob strategiyasini tayyorlash"],
    tags: ["privacy", "GDPR", "data"], source: "EDPB enforcement decisions",
    sourceUrl: "https://www.edpb.europa.eu/our-work-tools/consistency-findings_en",
    visualPrompt: "European data privacy command center, encrypted user records, regulatory dashboard, cinematic interface" },
  { slug: "ish-haqi-claim", title: "Ish haqi kechiktirilishi — employee claim", country: "Uzbekistan", area: "Mehnat", risk: "O‘rta",
    summary: "Ish beruvchi maoshni kechiktirganida xodim talab qilishi mumkin bo‘lgan choralar.",
    facts: "Xodim bir necha oy ish haqi olmagan, mehnat shartnomasi va tabel mavjud.",
    comparison: "UK va EUda wage claim tribunal/inspeksiya orqali yuradi; O‘zbekistonda mehnat organlari va sudga murojaat qilinadi.",
    nextSteps: ["Mehnat shartnomasi va tabelni yig‘ish", "Ish beruvchiga yozma talab yuborish", "Inspeksiya yoki sudga ariza tayyorlash"],
    tags: ["mehnat", "ish haqi", "employee"], source: "Lex.uz Mehnat kodeksi",
    sourceUrl: "https://lex.uz/docs/142859",
    visualPrompt: "worker wage claim documents, office payroll screen, labor inspection desk, premium legal illustration" },
  { slug: "online-fraud-card", title: "Online firibgarlik va karta tranzaksiyasi", country: "International", area: "Kiber", risk: "Yuqori",
    summary: "Raqamli firibgarlikda bank, platforma va huquqni muhofaza organlariga murojaat yo‘li.",
    facts: "Foydalanuvchi fishing link orqali karta ma’lumotlarini kiritgan va mablag‘ yechilgan.",
    comparison: "AQSH va EUda chargeback, fraud report va data breach protseduralari bor; O‘zbekistonda bankka hamda tergov organiga murojaat qilinadi.",
    nextSteps: ["Kartani bloklash", "Bankka chargeback/fraud ariza berish", "Skrinshot, SMS va tranzaksiya IDlarni saqlash"],
    tags: ["fraud", "bank", "cyber"], source: "FBI IC3 cybercrime portal",
    sourceUrl: "https://www.ic3.gov/",
    visualPrompt: "cyber fraud transaction trail, bank card alert, digital forensics map, dark premium command center" },
  { slug: "startup-term-sheet", title: "Startup investment term sheet dispute", country: "USA", area: "Biznes", risk: "O‘rta",
    summary: "Investor va founder o‘rtasida term sheet shartlari bo‘yicha kelishmovchilik.",
    facts: "Valuation, vesting va investor rights bandlari turlicha talqin qilingan.",
    comparison: "AQSHda Delaware practice va venture norms muhim; O‘zbekistonda shartnoma, korporativ hujjatlar va investitsiya shartlari asos bo‘ladi.",
    nextSteps: ["Term sheet bandlarini risk bo‘yicha belgilash", "Cap table ta’sirini hisoblash", "Yurisdiksiya va arbitration bandini tekshirish"],
    tags: ["startup", "investment", "contract"], source: "Delaware Court of Chancery",
    sourceUrl: "https://courts.delaware.gov/chancery/",
    visualPrompt: "startup boardroom, cap table hologram, investor contract negotiation, silver blue cinematic lights" },
  { slug: "brown-v-board", title: "Brown v. Board of Education", country: "USA", area: "Konstitutsiyaviy", risk: "Yuqori",
    summary: "Teng himoya prinsipi va diskriminatsiyani taqiqlash bo‘yicha landmark precedent.",
    facts: "Maktab segregatsiyasi Konstitutsiyadagi equal protection talablariga zid deb topilgan.",
    comparison: "AQSHda fundamental rights strict scrutiny bilan ko‘riladi; O‘zbekistonda kamsitmaslik va ta’lim huquqi konstitutsiyaviy kafolatlar orqali baholanadi.",
    nextSteps: ["Diskriminatsiya faktlarini yig‘ish", "Davlat organi qarorini tekshirish", "Konstitutsiyaviy va ma’muriy himoya yo‘lini tanlash"],
    tags: ["equality", "education", "constitution"], source: "U.S. Supreme Court 347 U.S. 483 (1954)",
    sourceUrl: "https://supreme.justia.com/cases/federal/us/347/483/",
    visualPrompt: "constitutional equality courtroom, school documents, diverse citizens, premium justice light beams" },
  { slug: "miller-prorogation", title: "Miller prorogation case", country: "UK", area: "Konstitutsiyaviy", risk: "Yuqori",
    summary: "Parlament suvereniteti va ijro hokimiyati vakolatlari chegarasi bo‘yicha UK Supreme Court ishi.",
    facts: "Hukumat parlament ishini to‘xtatish vakolatidan foydalanganda sud konstitutsiyaviy nazorat o‘tkazgan.",
    comparison: "UKda unwritten constitution va judicial review muhim; O‘zbekistonda davlat organlari vakolatlari qonuniylik va konstitutsiyaviylik mezoni bilan tekshiriladi.",
    nextSteps: ["Vakolat manbasini aniqlash", "Qarorning oqibatini tahlil qilish", "Sudga shikoyat yoki parlament nazorati yo‘lini baholash"],
    tags: ["parliament", "judicial review", "power"], source: "UK Supreme Court [2019] UKSC 41",
    sourceUrl: "https://www.supremecourt.uk/cases/uksc-2019-0192.html",
    visualPrompt: "Westminster constitutional hearing, parliament lights, supreme court bench, cinematic blue silver scene" },
  { slug: "deutsche-wohnen", title: "Deutsche Wohnen GDPR fine", country: "EU", area: "Kiber", risk: "Yuqori",
    summary: "GDPR jarimalarida kompaniya javobgarligi va data controller majburiyatlari bo‘yicha CJEU yondashuvi.",
    facts: "Kompaniya shaxsiy ma’lumotlarni saqlash, o‘chirish va compliance nazorati bo‘yicha tekshiruvga tushgan.",
    comparison: "EUda data minimization va accountability qat’iy; O‘zbekistonda ham shaxsga doir ma’lumotlar rozilik, maqsad va xavfsizlik bilan himoyalanadi.",
    nextSteps: ["Data inventory tuzish", "Consent va retention siyosatini tekshirish", "Regulyator javobi va tuzatish rejasini tayyorlash"],
    tags: ["GDPR", "controller", "fine"], source: "CJEU C-807/21",
    sourceUrl: "https://curia.europa.eu/juris/liste.jsf?num=C-807/21",
    visualPrompt: "European privacy regulator room, data vault hologram, compliance risk meters, premium cinematic UI" },
  { slug: "turkey-individual-app", title: "Turkey Constitutional Court individual application", country: "Turkey", area: "Konstitutsiyaviy", risk: "O‘rta",
    summary: "Shaxsiy ariza orqali asosiy huquqlar buzilishini konstitutsiyaviy sudda ko‘rib chiqish modeli.",
    facts: "Fuqarolik yoki jinoyat ishida yakuniy qarordan keyin shaxs huquqi buzilganini ko‘rsatadi.",
    comparison: "Turkiyada individual application mexanizmi kuchli; O‘zbekistonda shikoyat, nazorat, ombudsman va konstitutsiyaviy himoya yo‘llari alohida baholanadi.",
    nextSteps: ["Ichki himoya vositalari tugaganini tekshirish", "Buzilgan huquqni aniq ko‘rsatish", "Muddat va dalillarni tizimlash"],
    tags: ["rights", "appeal", "constitutional"], source: "Anayasa Mahkemesi",
    sourceUrl: "https://www.anayasa.gov.tr/en/individual-application/",
    visualPrompt: "Ankara constitutional court facade, rights petition documents, judge chamber, premium motion glow" },
  { slug: "france-jandheur", title: "France Jand’heur liability doctrine", country: "France", area: "Fuqarolik", risk: "O‘rta",
    summary: "Narsa nazorati ostidagi zarar uchun javobgarlik doktrinasi fuqarolik javobgarligini kengaytirgan.",
    facts: "Transport yoki xavfli predmet sabab zarar kelganda ayb va nazorat masalasi muhokama qilingan.",
    comparison: "Fransiyada civil code asosidagi strict liability rivojlangan; O‘zbekistonda zarar, xavf manbai va sababiy bog‘liqlik asosiy elementlar.",
    nextSteps: ["Zarar manbasini aniqlash", "Egasi/nazoratchisini belgilash", "Tibbiy va moddiy zarar dalillarini jamlash"],
    tags: ["liability", "civil", "damage"], source: "Cour de cassation, Ch. Réunies, 13 février 1930",
    sourceUrl: "https://www.legifrance.gouv.fr/",
    visualPrompt: "Paris civil court, accident evidence folder, liability diagram, elegant legal-tech cinematic mood" },
  { slug: "japan-product-recall", title: "Japan product safety recall dispute", country: "Japan", area: "Fuqarolik", risk: "O‘rta",
    summary: "Mahsulot xavfsizligi, iste’molchi zarari va kompaniya reputatsiyasi bo‘yicha yapon yondashuvi.",
    facts: "Mahsulot nuqsoni tufayli zarar yuz bergan, ishlab chiqaruvchi recall va kompensatsiya masalasini baholaydi.",
    comparison: "Yaponiyada reputatsiya, ichki tekshiruv va kelishuv muhim; O‘zbekistonda iste’molchi huquqlari va fuqarolik javobgarligi qo‘llanadi.",
    nextSteps: ["Mahsulot partiyasi va xarid dalilini saqlash", "Ekspertiza talab qilish", "Kompensatsiya yoki da’vo strategiyasini tuzish"],
    tags: ["consumer", "product", "ADR"], source: "Japan Consumer Affairs Agency",
    sourceUrl: "https://www.caa.go.jp/en/",
    visualPrompt: "Tokyo legal office, product recall board, consumer evidence, minimalist premium courtroom style" },
  { slug: "korea-defamation", title: "Korea digital platform defamation", country: "South Korea", area: "Kiber", risk: "Yuqori",
    summary: "Onlayn sha’n-qadr masalalari, platforma kontenti va raqamli dalillar bo‘yicha Koreya tajribasi.",
    facts: "Ijtimoiy tarmoqdagi post shaxs reputatsiyasiga zarar yetkazgani da’vo qilingan.",
    comparison: "Koreyada cyber defamation jiddiy baholanadi; O‘zbekistonda sha’n, qadr-qimmat, haqorat va tuhmat normalari bilan solishtiriladi.",
    nextSteps: ["Post skrinshotini va URLni saqlash", "Platformaga takedown yuborish", "Fuqarolik yoki jinoyat yo‘lini baholash"],
    tags: ["defamation", "platform", "evidence"], source: "Korean Constitutional Court",
    sourceUrl: "https://english.ccourt.go.kr/",
    visualPrompt: "Seoul digital evidence lab, social media posts, reputation risk graph, premium cyber legal motion" },
  { slug: "barcelona-traction", title: "Barcelona Traction diplomatic protection", country: "International", area: "Biznes", risk: "Yuqori",
    summary: "Korporativ shaxs, investor huquqlari va davlatlararo diplomatik himoya chegarasi bo‘yicha ICJ ishi.",
    facts: "Xorijiy kompaniya aksiyadorlari davlatlararo himoya talab qilganida yuridik shaxs mansubligi va zarar masalasi ko‘rilgan.",
    comparison: "Xalqaro huquqda investor-state va diplomatic protection alohida; O‘zbekistonda investitsiya shartnomasi, BIT va arbitraj bandi muhim.",
    nextSteps: ["Kompaniya yurisdiksiyasini aniqlash", "BIT/arbitraj bandlarini tekshirish", "Davlat organi harakati va zarar miqdorini hujjatlashtirish"],
    tags: ["ICJ", "investment", "company"], source: "ICJ Reports 1970, p. 3",
    sourceUrl: "https://www.icj-cij.org/case/50",
    visualPrompt: "international court chamber, treaty documents, world map arbitration lines, luxury global justice scene" },
];

export const getCountryCases = (countryName: string) => {
  if (countryName === "Xalqaro huquq") return caseDatabase.filter((item) => item.country === "International").slice(0, 3);
  const direct = caseDatabase.filter((item) => item.country === countryName).slice(0, 3);
  return direct.length >= 2 ? direct : [...direct, ...caseDatabase.filter((item) => item.country === "International")].slice(0, 3);
};

export const getAreaCases = (areaTitle: string) => {
  return caseDatabase.filter((c) => areaTitle.toLowerCase().startsWith(c.area.toLowerCase()) || c.area.toLowerCase().startsWith(areaTitle.split(" ")[0].toLowerCase())).slice(0, 4);
};

export const featureCards = [
  { title: "Global AI tahlil", icon: Cpu, text: "Vaziyatni huquq sohasi, davlatlar va xavf darajasi bo‘yicha ajratadi." },
  { title: "Case search", icon: Search, text: "Precedent, real sud ishlari va o‘xshash holatlarni topish uchun filterlar." },
  { title: "Ko‘p tillilik", icon: Languages, text: "O‘zbek, rus va ingliz interfeys rejimi uchun tayyor UI." },
  { title: "PDF report", icon: FileText, text: "Tahlil natijasini professional hisobot ko‘rinishida yuklab olish." },
];

export const stats = [
  { value: "10+", label: "huquqiy yurisdiksiya" },
  { value: "11", label: "huquq sohasi" },
  { value: "24/7", label: "AI yordamchi" },
  { value: "100+", label: "tilga mos javob" },
];

export const testimonials = [
  { name: "Aziza Karimova", role: "Startup founder", quote: "CaseMind masalani davlatlar kesimida ko‘rib, qaysi hujjat kerakligini aniq ko‘rsatdi." },
  { name: "Daniel Reed", role: "International counsel", quote: "The interface feels like a global legal command center, but remains simple for non-lawyers." },
  { name: "Javohir Saidov", role: "Business owner", quote: "Yuristga borishdan oldin vaziyatimni tartiblab olishim juda oson bo‘ldi." },
];

export const pricingPlans = [
  { name: "Free", price: "$0", features: ["AI chatbot", "Case qidiruv", "3 ta saqlangan tahlil"], cta: "Boshlash" },
  { name: "Pro", price: "$19", features: ["PDF report", "Case compare", "Premium precedentlar", "Dashboard"], cta: "Pro olish" },
  { name: "Team", price: "$99", features: ["Jamoa profili", "Video konsultatsiya", "Priority support", "Enterprise export"], cta: "Bog‘lanish" },
];

export const quickActions = [
  { label: "Vaziyatni tahlil qilish", to: "/ai-tahlil", icon: Cpu },
  { label: "Xalqaro tajribalarni ko‘rish", to: "/case-database", icon: Globe2 },
  { label: "Yuristlar bazasi", to: "/yuristlar", icon: UsersRound },
  { label: "Mamlakatlarni solishtirish", to: "/mamlakatlar", icon: Flag },
  { label: "Tariflarni ko‘rish", to: "/pricing", icon: BadgeCheck },
  { label: "Dashboard", to: "/dashboard", icon: Building2 },
] as const;
