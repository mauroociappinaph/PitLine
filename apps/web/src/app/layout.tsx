import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PitLine | F1 Analysis Platform',
  description: 'AI-powered Formula 1 analysis and predictions for the 2026 season.',
};

import { Navbar } from '@/components/layout/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Navbar />
        <main className="min-h-screen bg-background pt-24">{children}</main>
      </body>
    </html>
  );
}
