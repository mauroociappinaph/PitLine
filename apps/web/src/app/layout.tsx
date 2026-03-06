import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PitLine | F1 Analysis Platform",
  description: "AI-powered Formula 1 analysis and predictions for the 2026 season.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
