import Image from "next/image";

type Recipe = {
    id: number;
    title: string;
    image: string;
    extendedIngredients: { original: string }[];
    analyzedInstructions: { steps: { number: number; step: string }[] }[];
};

async function getRecipe(id: string): Promise<Recipe | null> {
    try {
        const res = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.SPOONACULAR_API_KEY}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data;
    } catch {
        return null;
    }
}

export default async function RecipePage({ params }: { params: { id?: string } }) {
    const id = params?.id ?? "";
    const recipe = await getRecipe(id);

    if (!recipe) {
        return <p className="text-center mt-10 text-red-500">Nie udało się załadować przepisu.</p>;
    }

    const ingredients = recipe.extendedIngredients.map((i) => i.original);
    const steps = recipe.analyzedInstructions[0]?.steps.map((s) => s.step) || [];

    return (
        <main className="max-w-3xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>

            <img
                src={recipe.image}
                alt={`Zdjęcie: ${recipe.title}`}
                className="w-full max-h-96 object-cover rounded mb-6"
            />

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Składniki</h2>
                <ul className="list-disc list-inside">
                    {ingredients.map((line, i) => (
                        <li key={i}>{line}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-2">Kroki przygotowania</h2>
                {steps.length === 0 ? (
                    <p>Brak instrukcji dla tego przepisu.</p>
                ) : (
                    <ol className="list-decimal list-inside space-y-2">
                        {steps.map((line, i) => (
                            <li key={i}>{line}</li>
                        ))}
                    </ol>
                )}
            </section>
        </main>
    );
}
