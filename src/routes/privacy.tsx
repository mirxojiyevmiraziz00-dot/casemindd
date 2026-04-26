import { createFileRoute } from "@tanstack/react-router";
import { CaseMindShell } from "@/components/CaseMindShell";
export const Route = createFileRoute("/privacy")({ component: () => <CaseMindShell><section className="mx-auto max-w-3xl px-5 py-16 sm:px-8"><h1 className="text-5xl font-black text-foreground">Privacy Policy</h1><p className="mt-6 leading-8 text-muted-foreground">CaseMind foydalanuvchi ma’lumotlari, hujjatlar va tahlil tarixini xavfsiz saqlash tamoyillariga amal qiladi.</p></section></CaseMindShell> });
