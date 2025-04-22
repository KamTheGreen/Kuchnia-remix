export async function POST(req: Request) {
    const body = await req.json();
    const providedPassword = body.password;
    const correctPassword = process.env.ACCESS_PASSWORD;

    if (!correctPassword) {
        return new Response("Brak hasła serwera", { status: 500 });
    }

    if (providedPassword === correctPassword) {
        return new Response("OK", { status: 200 });
    } else {
        return new Response("Błędne hasło", { status: 401 });
    }
}