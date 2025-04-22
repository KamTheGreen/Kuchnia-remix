import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AccessibilityProvider } from "@/context/AccessibilityContext";
import AccessibilityPanel from "@/components/AccessibilityPanel";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kuchnia Remix",
    description: "Kuchnia Remix Dev",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden`}>
        <AccessibilityProvider>
            {children}
            <AccessibilityPanel />
        </AccessibilityProvider>
        </body>
        </html>
    );
}