import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        console.log("🔄 Tłumaczę zapytanie:", query);

        const key = process.env.MYMEMORY_API_KEY;
        const email = process.env.MYMEMORY_EMAIL;

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=pl|en&de=${email}&key=${key}`;

        const res = await fetch(url, {
            headers: {
                "User-Agent": "KuchniaRemix/1.0.0",
            },
        });

        const text = await res.text();
        console.log("📦 Odpowiedź z MyMemory:", text);

        const data = JSON.parse(text);

        const translated = data?.responseData?.translatedText;
        const warning = translated?.startsWith("MYMEMORY WARNING");

        return NextResponse.json({
            translatedText: warning ? query : translated || query,
        });
    } catch (err) {
        console.error("❌ Błąd w /api/translate:", err);
        return NextResponse.json({ translatedText: query }, { status: 500 });
    }
}