const TRANSLATION_API_URL = "https://translate.kamela.ink";

export async function translateToEnglish(query: string): Promise<string> {
    try {
        const res = await fetch(TRANSLATION_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: query,
                source: "pl",
                target: "en",
            }),
        });

        if (!res.ok) throw new Error("Failed to translate");

        const data = await res.json();
        return data.translated || query;
    } catch (err) {
        console.error("Błąd tłumaczenia (pl→en):", err);
        return query;
    }
}

export async function translateToPolish(text: string): Promise<string> {
    try {
        const res = await fetch(TRANSLATION_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text,
                source: "en",
                target: "pl",
            }),
        });

        if (!res.ok) throw new Error("Failed to translate");

        const data = await res.json();
        return data.translated || text;
    } catch (err) {
        console.error("Błąd tłumaczenia (en→pl):", err);
        return text;
    }
}

export async function translateLineByLineToPolish(lines: string[]): Promise<string[]> {
    const translated: string[] = [];

    for (const line of lines) {
        if (!line.trim()) {
            translated.push("");
            continue;
        }

        try {
            const res = await fetch(TRANSLATION_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: line,
                    source: "en",
                    target: "pl",
                }),
            });

            if (!res.ok) {
                console.warn(`⚠️ Błąd HTTP ${res.status} dla "${line}"`);
                translated.push(line);
                continue;
            }

            const data = await res.json();
            translated.push(data.translated || line);
        } catch (err) {
            console.error("❌ Błąd przy tłumaczeniu linii:", err);
            translated.push(line);
        }
    }

    return translated;
}