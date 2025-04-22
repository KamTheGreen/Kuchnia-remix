// app/api/search/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query");
    const apiKey = process.env.SPOONACULAR_API_KEY;

    if (!query || !apiKey) {
        return new Response("Missing query or API key", { status: 400 });
    }

    const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`
    );

    const data = await response.json();
    return Response.json(data);
}