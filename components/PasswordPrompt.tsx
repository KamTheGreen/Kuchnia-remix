"use client";

import { useEffect, useState } from "react";

export default function PasswordPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setShowPrompt(true);
        }
    }, []);

    const handleSubmit = async () => {
        const res = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: input }),
        });

        if (res.ok) {
            localStorage.setItem("access_token", input);
            setShowPrompt(false);
        } else {
            setError("Błędne hasło");
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 shadow-lg w-80 space-y-4 text-center">
                <h2 className="text-xl font-semibold">Podaj hasło</h2>
                <input
                    type="password"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    onClick={handleSubmit}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Zatwierdź
                </button>
            </div>
        </div>
    );
}