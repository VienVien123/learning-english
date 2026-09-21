import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LexiBloom — Learn vocabulary beautifully",
  description: "Realtime vocabulary learning, flashcards and spaced repetition powered by Supabase.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
