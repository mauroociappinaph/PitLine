import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PitLine | F1 Analysis Platform',
  description: 'AI-powered Formula 1 analysis and predictions for the 2026 season.',
};

import { Navbar } from '@/components/layout/Navbar';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-1 bg-background pt-24 pb-8">{children}</main>
        <ChatInterface />
      </body>
    </html>
  );
}
