"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() !== "") {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                type="text"
                placeholder="Wyszukaj dowolny przepis...(Po Angielsku)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit">Wyszukaj</Button>
        </form>
    );
}