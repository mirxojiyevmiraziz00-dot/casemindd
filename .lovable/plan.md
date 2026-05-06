## Maqsad
Dark mode'dan tashqari barcha asosiy yaxshilanishlarni amalga oshirish — har bir tugma, har bir bo'lim ichkarigacha ishlaydigan, aniq, premium darajada.

## Bajariladigan ishlar

### 1. Auth + Foydalanuvchi tarixi
- `/login` va `/register` to'liq ishlaydigan: email+parol va Google OAuth (Lovable Cloud orqali)
- `case_history` jadvali (migration): user_id, title, area, input, ai_response, image_url, created_at + RLS
- `/dashboard` — foydalanuvchi o'z AI tahlillari, statistika (jami case, soha bo'yicha taqsimot, oxirgi 5 ta)
- Header'da AuthStatus: kirgan bo'lsa avatar+nom, chiqish; aks holda "Kirish"

### 2. AI imkoniyatlari (to'liq ishlaydigan)
- **Streaming javob** — `/api/ai-chat` SSE/stream qo'shish, AiLegalAssistant typing-effect bilan
- **Ovozli kirish** — Web Speech API (uz, ru, en, de, ur va h.k. avtomatik aniqlash)
- **Hujjat yuklash** — PDF/JPG/PNG → Gemini vision orqali tahlil (bor `legal-documents` bucket'ga yuklab, signed URL bilan AI'ga uzatish)
- **Multi-turn chat** — har bir tahlil tarixi `case_history`'ga saqlanadi, davom ettirish mumkin
- **Visual rasm** — har bir AI javobiga avtomatik 1 ta sahna rasmi (Gemini image)
- **Ko'p tilda** — system prompt allaqachon mos, lekin UI tugmalari ham auto-translate (i18n keys)

### 3. Yurist marketplace + admin
- `lawyers` jadvali: name, photo, areas[], bio, languages[], rating, contact
- `/yuristlar` — kartochkalar, soha bo'yicha filter, har biriga "Bog'lanish" tugmasi → consultation form
- `/admin` (faqat admin role) — kelgan `consultation_requests`, status o'zgartirish, eksport

### 4. Email orqali xabar (yurist forma)
- Email infrastructure setup + transactional email scaffold
- Forma yuborilganda: ham `consultation_requests`'ga yoziladi, ham foydalanuvchi emailiga tasdiq, ham admin emailiga ogohlantirish keladi
- Foydalanuvchidan admin email so'raymiz (yoki default `mirxojiyev@…`)

### 5. Mamlakatlar / Bo'limlar / Case database — hammasi ishlaydigan
- Har bir mamlakat, har bir huquq bo'limi, har bir case kartasidagi tugmalar real ishlaydi:
  - "AI tahlil" → `/ai-tahlil`'ga prompt bilan o'tadi va avtomatik tahlil boshlanadi
  - "Manba" → ishonchli tashqi havola (Lex.uz, EUR-Lex, BAILII, Google Scholar)
  - "PDF yuklab olish" → jspdf bilan to'liq report
- "Manba yo'q" muammosi yo'qoladi — har bir item'da `sourceUrl` maydoni bo'ladi

### 6. Global search + UX polish
- ⌘K global search (cmdk) — case, mamlakat, bo'lim, AI prompt orqali topish
- Mobile menu (sheet)
- Framer Motion: sahifa tranzitsiyalari, hover, scroll-reveal
- Loading skeletonlar har joyda

### 7. SEO
- Har bir route'da unique `head()` (title/description/og)
- `/sitemap.xml` va `/robots.txt` server route

### 8. Ijtimoiy tarmoqlar
- Footer'da Telegram (@mirxojiyev), Instagram (@_miraziz.1), Facebook (@Ado.Vis) ishlaydigan linklar
- Telegram orqali video yuborish bo'limi: `/media` sahifasida embed Telegram channel widget va Instagram feed (oddiy iframe/embed)

### 9. Xavfsizlik
- Barcha jadvallarda RLS tekshiruv
- Rate limit `/api/ai-chat` (IP+user bo'yicha, oddiy in-memory yoki Cloud KV)

## Texnik detallar

**Yangi fayllar:**
- `supabase/migrations/...` — `case_history`, `lawyers` jadvallari
- `src/routes/register.tsx`, `src/routes/yuristlar.tsx`, `src/routes/yuristlar.$id.tsx`, `src/routes/admin.tsx`, `src/routes/media.tsx`
- `src/routes/api/sitemap.xml.ts`, `src/routes/api/robots.txt.ts`
- `src/components/GlobalSearch.tsx`, `src/components/MobileMenu.tsx`, `src/components/PageTransition.tsx`
- `src/server/case-history.functions.ts`, `src/server/lawyers.functions.ts`
- `supabase/functions/auth-email-hook/...` va transactional email funksiyalari

**Yangilanadigan:**
- `src/routes/api/ai-chat.ts` — streaming + image+text birga + rate limit
- `src/components/AiLegalAssistant.tsx`, `AiCaseAnalyzer.tsx` — voice, file upload, history save
- `src/lib/casemind-data.ts` — har bir item'ga `sourceUrl`
- `src/components/CaseMindHeader.tsx` — auth status, ⌘K, mobile menu
- `src/components/CaseMindFooter.tsx` — to'g'ri social linklar

**Paketlar:** `cmdk`, `framer-motion` (yo'q bo'lsa), `react-dropzone`

## Sizdan kerak (1 ta savol)

**Admin email** — yurist formalari va consultation xabarlari qaysi emailga kelishi kerak? (masalan, `mirxojiyev@gmail.com`). Bitta email yozib bering, qolgani avtomatik bo'ladi.

Tasdiqlasangiz, ketma-ket: **migration → auth → AI streaming/voice/file → mamlakatlar/bo'limlar tugmalari → marketplace+admin → email → search/SEO/UX → social** tartibida qilaman.
