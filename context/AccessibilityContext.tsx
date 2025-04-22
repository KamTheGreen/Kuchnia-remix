"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type AccessibilityContextType = {
    fontSize: number;
    isArial: boolean;
    grayscale: boolean;
    highContrast: boolean;
    increaseFont: () => void;
    decreaseFont: () => void;
    toggleFont: () => void;
    toggleGrayscale: () => void;
    toggleHighContrast: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [fontSize, setFontSize] = useState(100);
    const [isArial, setIsArial] = useState(false);
    const [grayscale, setGrayscale] = useState(false);
    const [highContrast, setHighContrast] = useState(false);

    const increaseFont = () => setFontSize((s) => Math.min(s + 10, 200));
    const decreaseFont = () => setFontSize((s) => Math.max(s - 10, 50));
    const toggleFont = () => setIsArial((a) => !a);
    const toggleGrayscale = () => setGrayscale((g) => !g);
    const toggleHighContrast = () => setHighContrast((c) => !c);

    useEffect(() => {
        document.documentElement.style.setProperty("font-size", `${fontSize}%`);
        document.body.classList.toggle("font-arial", isArial);
        document.body.classList.toggle("grayscale", grayscale);
        document.body.classList.toggle("high-contrast", highContrast);
    }, [fontSize, isArial, grayscale, highContrast]);

    return (
        <AccessibilityContext.Provider
            value={{
                fontSize,
                isArial,
                grayscale,
                highContrast,
                increaseFont,
                decreaseFont,
                toggleFont,
                toggleGrayscale,
                toggleHighContrast,
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (!context) throw new Error("useAccessibility must be used within AccessibilityProvider");
    return context;
}