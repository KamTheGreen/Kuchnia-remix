import Link from "next/link";

type Recipe = {
    id: number;
    title: string;
    image: string;
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
        <Link href={`/recipe/${recipe.id}`} className="block bg-white p-4 rounded shadow hover:shadow-lg transition">
            <img
                src={recipe.image}
                alt={`Zdjęcie potrawy: ${recipe.title}`}
                className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
        </Link>
    );
}