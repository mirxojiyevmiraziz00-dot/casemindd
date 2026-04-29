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
  { label: "Yurist", to: "/yurist-bilan-boglanish" },
  { label: "Academy", to: "/academy" },
] as const;

export const legalAreas = [
  { slug: "jinoyat", title: "Jinoyat huquqi", icon: ShieldCheck, tone: "Tergov, sud va javobgarlik xavfini baholash." },
  { slug: "fuqarolik", title: "Fuqarolik huquqi", icon: Scale, tone: "Shartnomalar, zarar, mulk va majburiyatlar." },
  { slug: "oila", title: "Oila huquqi", icon: HeartHandshake, tone: "Nikoh, aliment, vasiylik va farzand masalalari." },
  { slug: "mehnat", title: "Mehnat huquqi", icon: UsersRound, tone: "Ishdan bo‘shatish, ish haqi, intizom va kompensatsiya." },
  { slug: "soliq", title: "Soliq huquqi", icon: Banknote, tone: "Tekshiruv, jarima, hisob-kitob va rezidentlik." },
  { slug: "mamuriy", title: "Ma’muriy huquq", icon: Landmark, tone: "Davlat organlari qarorlari va ma’muriy javobgarlik." },
  { slug: "biznes", title: "Biznes huquqi", icon: BriefcaseBusiness, tone: "Kompaniya, investitsiya, M&A va compliance." },
  { slug: "kiber", title: "Kiber huquq", icon: LockKeyhole, tone: "Data privacy, fraud, raqamli dalillar va xavfsizlik." },
  { slug: "ip", title: "Intellektual mulk", icon: Fingerprint, tone: "Brend, patent, mualliflik huquqi va litsenziyalar." },
  { slug: "migratsiya", title: "Migratsiya huquqi", icon: Globe2, tone: "Viza, yashash ruxsati, deportatsiya va fuqarolik." },
  { slug: "konstitutsiya", title: "Konstitutsiyaviy huquq", icon: ScrollText, tone: "Asosiy huquqlar, erkinliklar va davlat kafolatlari." },
];

export const countries = [
  { slug: "usa", name: "USA", region: "Common law", flag: "🇺🇸", laws: "Federal + state law, Constitution, U.S. Code", courts: "Federal courts, state courts, Supreme Court", precedents: "Marbury v. Madison, Miranda, Brown", culture: "Precedent va litigation kuchli", resolution: "Settlement, mediation, jury trial" },
  { slug: "uk", name: "UK", region: "Common law", flag: "🇬🇧", laws: "Acts of Parliament, common law, Human Rights Act", courts: "Magistrates, Crown Court, High Court, Supreme Court", precedents: "Donoghue v Stevenson, Miller", culture: "Professional advocacy va precedent", resolution: "Barrister opinion, mediation, court claim" },
  { slug: "germany", name: "Germany", region: "EU civil law", flag: "🇩🇪", laws: "Grundgesetz, BGB, StGB, EU law", courts: "Ordinary, administrative, constitutional courts", precedents: "Lüth, Solange, BVerfG cases", culture: "Kodifikatsiya va protsessual aniqlik", resolution: "Legal notice, settlement, court procedure" },
  { slug: "france", name: "France", region: "EU civil law", flag: "🇫🇷", laws: "Code civil, Code pénal, EU regulations", courts: "Tribunal judiciaire, Cour d'appel, Cour de cassation", precedents: "Perruche, Jand'heur", culture: "Davlat-huquqiy institutlar kuchli", resolution: "Conciliation, administrative appeal, court" },
  { slug: "uae", name: "UAE", region: "Mixed / civil law", flag: "🇦🇪", laws: "Federal laws, emirate regulations, DIFC/ADGM rules", courts: "Federal, local emirate, DIFC/ADGM courts", precedents: "DIFC commercial cases", culture: "Tezkor biznes va arbitraj muhit", resolution: "Arbitration, mediation, court filing" },
  { slug: "turkey", name: "Turkey", region: "Civil law", flag: "🇹🇷", laws: "Constitution, Turkish Civil Code, Penal Code", courts: "Civil, criminal, administrative, constitutional courts", precedents: "Constitutional Court individual applications", culture: "Kodifikatsiya va davlat nazorati", resolution: "Notarial notice, mediation, lawsuit" },
  { slug: "japan", name: "Japan", region: "Civil law", flag: "🇯🇵", laws: "Civil Code, Penal Code, Companies Act", courts: "District courts, High Courts, Supreme Court", precedents: "Sunagawa, pharmaceutical cases", culture: "Konsensus, aniqlik va reputatsiya", resolution: "Negotiation, ADR, court" },
  { slug: "south-korea", name: "South Korea", region: "Civil law", flag: "🇰🇷", laws: "Constitution, Civil Act, Criminal Act", courts: "District, High, Supreme, Constitutional Court", precedents: "Constitutional freedom cases", culture: "Digital compliance va tezkor sudlar", resolution: "Mediation, prosecution, court" },
  { slug: "uzbekistan", name: "Uzbekistan", region: "Civil law", flag: "🇺🇿", laws: "Konstitutsiya, kodekslar, qonunlar", courts: "Fuqarolik, jinoyat, iqtisodiy, ma’muriy sudlar", precedents: "Oliy sud Plenum qarorlari", culture: "Kodifikatsiya va Plenum sharhlari", resolution: "Ariza, shikoyat, mediatsiya, sud" },
  { slug: "international", name: "Xalqaro huquq", region: "Treaties / arbitration", flag: "🌐", laws: "Treaties, conventions, model laws", courts: "ICJ, ICC, arbitration tribunals", precedents: "Barcelona Traction, Nicaragua, investment awards", culture: "Davlatlararo va transchegaraviy tahlil", resolution: "Diplomatic, arbitration, treaty claim" },
];

export type CaseRecord = {
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
  visualPrompt: string;
};

export const caseDatabase: CaseRecord[] = [
  {
    title: "Miranda v. Arizona",
    country: "USA",
    area: "Jinoyat",
    risk: "Yuqori",
    summary: "Gumon qilinuvchiga huquqlarini tushuntirish zarurligi bo‘yicha mashhur precedent.",
    facts: "Politsiya so‘roqida shaxsga sukut saqlash va advokat olish huquqi tushuntirilmagan.",
    comparison: "O‘zbekistonda ham himoya huquqi, advokat ishtiroki va dalilning qonuniyligi muhim; AQSHda warning berilmasa, ko‘rsatma chiqarib tashlanishi mumkin.",
    nextSteps: ["So‘roq bayonnomasini tekshirish", "Advokat ishtiroki bo‘lgan-bo‘lmaganini aniqlash", "Dalilni maqbul emas deb topish masalasini ko‘tarish"],
    tags: ["due process", "police", "rights"],
    source: "U.S. Supreme Court landmark precedent",
    visualPrompt: "cinematic interrogation room, legal rights card, courthouse silhouette, premium global justice style",
  },
  {
    title: "Donoghue v Stevenson",
    country: "UK",
    area: "Fuqarolik",
    risk: "O‘rta",
    summary: "Ehtiyotkorlik majburiyati va zarar uchun javobgarlik konsepsiyasi.",
    facts: "Iste’molchi mahsulotdagi xavf sabab zarar ko‘rgan va ishlab chiqaruvchi javobgarligi muhokama qilingan.",
    comparison: "Fuqarolik huquqida zarar, sababiy bog‘liqlik va ayb tahlil qilinadi; common law tizimida duty of care asosiy testga aylangan.",
    nextSteps: ["Zararni hujjatlashtirish", "Ekspertiza va cheklarni saqlash", "Da’vo yoki settlement yo‘lini tanlash"],
    tags: ["negligence", "tort", "duty"],
    source: "UK House of Lords tort law precedent",
    visualPrompt: "premium product liability courtroom, evidence table, consumer protection documents, London legal atmosphere",
  },
  {
    title: "Lüth Case",
    country: "Germany",
    area: "Konstitutsiyaviy",
    risk: "O‘rta",
    summary: "Asosiy huquqlarning xususiy huquq munosabatlariga ta’siri.",
    facts: "Shaxsning fikr bildirish erkinligi va xususiy nizodagi cheklovlar muvozanati ko‘rilgan.",
    comparison: "Germaniyada konstitutsiyaviy qadriyatlar xususiy huquqqa ham ta’sir qiladi; O‘zbekistonda ham sha’n, qadr-qimmat va so‘z erkinligi muvozanatlanadi.",
    nextSteps: ["Huquqiy manfaatlarni ajratish", "Cheklov mutanosibligini baholash", "Konstitutsiyaviy kafolatlarni ko‘rsatish"],
    tags: ["rights", "speech", "constitution"],
    source: "German Federal Constitutional Court doctrine",
    visualPrompt: "German constitutional court chamber, freedom of expression documents, balanced scales, cinematic silver lighting",
  },
  {
    title: "DIFC Commercial Injunction",
    country: "UAE",
    area: "Biznes",
    risk: "Yuqori",
    summary: "Transchegaraviy biznes nizosida vaqtinchalik himoya chorasi.",
    facts: "Kompaniya aktivlar chiqib ketish xavfi borligini ko‘rsatib, tezkor injunction so‘ragan.",
    comparison: "BAAda DIFC/ADGM kabi zonalarda common law uslubi kuchli; O‘zbekistonda iqtisodiy sud orqali ta’minlash chorasi so‘raladi.",
    nextSteps: ["Shartnoma va yurisdiksiya bandini tekshirish", "Aktivlar bo‘yicha dalil yig‘ish", "Arbitraj yoki sud strategiyasini tanlash"],
    tags: ["injunction", "commercial", "arbitration"],
    source: "DIFC/ADGM commercial court practice",
    visualPrompt: "Dubai financial district arbitration room, frozen assets dashboard, premium legal-tech motion scene",
  },
  {
    title: "Oliy sud Plenum — dalillar",
    country: "Uzbekistan",
    area: "Jinoyat",
    risk: "Yuqori",
    summary: "Dalillar qonuniyligi va sudda baholanishi bo‘yicha yo‘nalish.",
    facts: "Tergovda olingan dalilning protsessual tartibga mosligi va suddagi bahosi tekshiriladi.",
    comparison: "Ko‘plab davlatlarda noqonuniy dalil exclusionary rule yoki maqbullik testi orqali cheklanadi.",
    nextSteps: ["Dalil manbasini aniqlash", "Protsessual buzilishlarni yozib chiqish", "Sudga iltimosnoma tayyorlash"],
    tags: ["dalil", "sud", "plenum"],
    source: "O‘zbekiston Oliy sudi Plenum amaliyoti",
    visualPrompt: "Uzbek courtroom evidence board, procedural code pages, judge bench, cinematic blue silver lighting",
  },
  {
    title: "EU GDPR enforcement",
    country: "EU",
    area: "Kiber",
    risk: "Yuqori",
    summary: "Shaxsiy ma’lumotlarni qayta ishlashda compliance va jarimalar.",
    facts: "Kompaniya foydalanuvchi roziligisiz ma’lumot yig‘gani yoki himoya choralarini yetarli ko‘rmagani da’vo qilingan.",
    comparison: "EUda jarimalar yuqori; O‘zbekistonda ham shaxsga doir ma’lumotlar bo‘yicha rozilik, maqsad va xavfsizlik talablari bor.",
    nextSteps: ["Privacy policy va consent loglarni tekshirish", "Data breach timeline tuzish", "Regulyatorga javob strategiyasini tayyorlash"],
    tags: ["privacy", "GDPR", "data"],
    source: "European Data Protection Board and GDPR enforcement practice",
    visualPrompt: "European data privacy command center, encrypted user records, regulatory dashboard, cinematic interface",
  },
  {
    title: "Ish haqi kechiktirilishi — employee claim",
    country: "Uzbekistan",
    area: "Mehnat",
    risk: "O‘rta",
    summary: "Ish beruvchi maoshni kechiktirganida xodim talab qilishi mumkin bo‘lgan choralar.",
    facts: "Xodim bir necha oy ish haqi olmagan, mehnat shartnomasi va tabel mavjud.",
    comparison: "UK va EUda wage claim tribunal/inspeksiya orqali yuradi; O‘zbekistonda mehnat organlari va sudga murojaat qilinadi.",
    nextSteps: ["Mehnat shartnomasi va tabelni yig‘ish", "Ish beruvchiga yozma talab yuborish", "Inspeksiya yoki sudga ariza tayyorlash"],
    tags: ["mehnat", "ish haqi", "employee"],
    source: "O‘zbekiston mehnat nizolari va xalqaro tribunal amaliyoti",
    visualPrompt: "worker wage claim documents, office payroll screen, labor inspection desk, premium legal illustration",
  },
  {
    title: "Online firibgarlik va karta tranzaksiyasi",
    country: "International",
    area: "Kiber",
    risk: "Yuqori",
    summary: "Raqamli firibgarlikda bank, platforma va huquqni muhofaza organlariga murojaat yo‘li.",
    facts: "Foydalanuvchi fishing link orqali karta ma’lumotlarini kiritgan va mablag‘ yechilgan.",
    comparison: "AQSH va EUda chargeback, fraud report va data breach protseduralari bor; O‘zbekistonda bankka hamda tergov organiga murojaat qilinadi.",
    nextSteps: ["Kartani bloklash", "Bankka chargeback/fraud ariza berish", "Skrinshot, SMS va tranzaksiya IDlarni saqlash"],
    tags: ["fraud", "bank", "cyber"],
    source: "FBI IC3, Europol cybercrime and banking dispute practice",
    visualPrompt: "cyber fraud transaction trail, bank card alert, digital forensics map, dark premium command center",
  },
  {
    title: "Startup investment term sheet dispute",
    country: "USA",
    area: "Biznes",
    risk: "O‘rta",
    summary: "Investor va founder o‘rtasida term sheet shartlari bo‘yicha kelishmovchilik.",
    facts: "Valuation, vesting va investor rights bandlari turlicha talqin qilingan.",
    comparison: "AQSHda Delaware practice va venture norms muhim; O‘zbekistonda shartnoma, korporativ hujjatlar va investitsiya shartlari asos bo‘ladi.",
    nextSteps: ["Term sheet bandlarini risk bo‘yicha belgilash", "Cap table ta’sirini hisoblash", "Yurisdiksiya va arbitration bandini tekshirish"],
    tags: ["startup", "investment", "contract"],
    source: "Delaware corporate and venture financing practice",
    visualPrompt: "startup boardroom, cap table hologram, investor contract negotiation, silver blue cinematic lights",
  },
];

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
  { label: "Mutaxassis bilan bog‘lanish", to: "/yurist-bilan-boglanish", icon: UsersRound },
  { label: "Mamlakatlarni solishtirish", to: "/mamlakatlar", icon: Flag },
  { label: "Tariflarni ko‘rish", to: "/pricing", icon: BadgeCheck },
  { label: "Dashboard", to: "/dashboard", icon: Building2 },
] as const;
