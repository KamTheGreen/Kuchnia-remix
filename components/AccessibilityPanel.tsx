"use client";

import { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";

export default function AccessibilityPanel() {
    const [open, setOpen] = useState(false);
    const {
        increaseFont,
        decreaseFont,
        toggleFont,
        toggleGrayscale,
        toggleHighContrast,
    } = useAccessibility();

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                className="bg-red-600 text-white rounded-full w-12 h-12 shadow-lg hover:bg-red-700"
                onClick={() => setOpen(!open)}
                aria-label="Dostępność"
            >
                ♿
            </button>

            {open && (
                <div className="mt-2 bg-white text-black p-4 rounded shadow-lg w-64 space-y-2 text-sm">
                    <h3 className="font-semibold mb-2">Ustawienia dostępności</h3>
                    <div className="space-x-2">
                        <button className="bg-gray-200 px-2 rounded" onClick={decreaseFont}>A−</button>
                        <button className="bg-gray-200 px-2 rounded" onClick={increaseFont}>A+</button>
                    </div>
                    <button className="block w-full bg-gray-200 rounded px-2 py-1" onClick={toggleFont}>
                        Przełącz czcionkę (Arial)
                    </button>
                    <button className="block w-full bg-gray-200 rounded px-2 py-1" onClick={toggleGrayscale}>
                        Skala szarości
                    </button>
                    <button className="block w-full bg-gray-200 rounded px-2 py-1" onClick={toggleHighContrast}>
                        Wysoki kontrast
                    </button>
                </div>
            )}
        </div>
    );
}