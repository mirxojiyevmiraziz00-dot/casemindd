# CaseMind Telegram bot — doim ishlovchi huquqiy AI yordamchi

## Maqsad

CaseMind saytidagi AI yordamchi kabi, Telegram bot ham huquqiy savollarga javob bersin va 24/7 doim ishlab tursin. Bot Telegramda alohida bot sifatida ko'rinadi — foydalanuvchi yozadi, bot huquqiy javob qaytaradi. Botning «miyasi» CaseMind sayti serverida (doim ishlab turuvchi) joylashadi.

## Muhim eslatma (hosting)

Lovable ichida alohida bot jarayonini (alohida serverda doim ishlab turadigan Python/Node skript) ishlata olmayman. Lovable faqat CaseMind saytini joylashtiradi. Shuning uchun botni **CaseMind sayti serveriga webhook orqali ulaymiz** — bu botni 24/7 ishlatishning yagona amaliy yo'li. Foydalanuvchilar uchun farq yo'q: ular Telegramda botga yozadi, bot javob beradi. Bot doim ishlaydi, chunki CaseMind sayti serveri doim yoqilgan.

Agar sizda allaqachon ishlaydigan bot kodi bo'lsa, uni alohida serverda (Render, Railway, VPS) o'zingiz joylashtirishingiz mumkin — lekin bu Lovable tashqarisida. Men bu reja bilan botni CaseMind orqali ishlatishni taklif qilaman.

## Sizdan kerak bo'ladigan narsa

1. **Telegram bot tokeni** — @BotFather orqali yaratilgan bot. Sizda allaqachon bor (bot ishlagan). Bot tokenni maxfiy forma orqali kiritasiz (hech kimga ko'rsatmaymiz).

## Men nima qilaman

### 1. Telegram connector ulash
- `standard_connectors--connect` orqali Telegram connectorini loyihaga ulaymiz.
- Siz bot tokenni maxfiy formada kiritasiz. Token `TELEGRAM_API_KEY` sifatida saqlanadi va server kodida ishlatiladi.

### 2. Webhook endpoint yaratish
- `src/routes/api/public/telegram/webhook.ts` — Telegram xabarlari shu yerga keladi.
- Xavfsizlik: `X-Telegram-Bot-Api-Secret-Token` tekshiriladi (tokendan olingan).
- Xabar matni olinadi.
- AI Gateway ga yuboriladi (CaseMind saytidagi legal system prompt bilan — ko'p tilli, aniq, qisqa javob).
- AI javobi Telegram gateway orqali `sendMessage` bilan foydalanuvchiga qaytariladi.
- Xatolik bo'lsa, foydalanuvchiga aniq xabar beriladi.

### 3. Suhbat tarixini saqlash (ixtiyoriy, tavsiya etiladi)
- `telegram_messages` jadvali: `update_id`, `chat_id`, `user_id`, `text`, `ai_reply`, `raw_update`, `created_at`.
- Bu AI ga oldingi suhbatni eslab turish imkonini beradi (kontekst).
- RLS: faqat server (service_role) yozadi; foydalanuvchilar o'qiy olmaydi.

### 4. Webhookni Telegramga ro'yxatdan o'tkazish
- Stable project URL (`https://casemindd.lovable.app/api/public/telegram/webhook`) Telegramga `setWebhook` bilan ro'yxatdan o'tkaziladi.
- `getWebhookInfo` bilan tekshiriladi.

### 5. Bot komandalari (ixtiyoriy)
- `/start` — salom va ko'rsatma.
- Oddiy matn — huquqiy savol, AI javob beradi.

## Texnik tafsilotlar

- **AI model:** `google/gemini-3-flash-preview` (saytdagi bilan bir xil).
- **Gateway:** `https://connector-gateway.lovable.dev/telegram/sendMessage` — javob yuborish uchun.
- **AI:** `https://ai.gateway.lovable.dev/v1/chat/completions` — savolni tahlil qilish uchun.
- **System prompt:** saytdagi CaseMind legal promptining Telegram uchun moslashtirilgan varianti — qisqa, aniq, ko'p tilli javob, oxirida yuridik maslahat emas deb eslatma.
- **Tillar:** foydalanuvchi qaysi tilda yozsa, shu tilda javob (o'zbek, rus, ingliz, nemis, turk, urdu, arab va h.k.).

## Natija

- Bot Telegramda doim ishlaydi.
- Foydalanuvchi huquqiy savol beradi → AI aniq, qisqa javob qaytaradi.
- Suhbat tarixi saqlanadi (kontekst uchun).
- Sayt dizayni va funksiyalari o'zgarishsiz qoladi.
