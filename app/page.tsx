"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import RecipeCard from "@/components/RecipeCard";

type Recipe = {
    id: number;
    title: string;
    image: string;
};

export default function HomePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastQuery, setLastQuery] = useState<string>("");

    const handleSearch = async (query: string) => {
        setLoading(true);
        setLastQuery(query);

        try {
            const res = await fetch(
                `/api/search?query=${encodeURIComponent(query)}`
            );
            const data = await res.json();
            setRecipes(data.results || []);
        } catch (err) {
            console.error("Błąd wyszukiwania:", err);
            setRecipes([]);
        }

        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-white text-black">
            <section
                className="w-full min-h-screen bg-cover bg-center bg-no-repeat px-4 flex items-center justify-center"
                style={{
                    backgroundImage: "url('/bgmain.jpg')",
                }}
            >
                <div className="bg-white/80 p-6 rounded shadow-lg w-full max-w-xl text-center">
                    <h1 className="text-4xl font-bold mb-4 text-red-600">Kuchnia Remix</h1>
                    <SearchBar onSearch={handleSearch} />
                </div>
            </section>

            {(loading || recipes.length > 0) && (
                <section className="max-w-6xl mx-auto px-4 py-8">
                    {loading && (
                        <p className="text-center text-gray-600">Wyszukiwanie przepisów...</p>
                    )}

                    {!loading && recipes.length > 0 && (
                        <p className="text-sm text-gray-500 text-center mb-4">
                            Wyniki dla: <strong>{lastQuery}</strong>
                        </p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recipes.map((r) => (
                            <RecipeCard key={r.id} recipe={r} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
