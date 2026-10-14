import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TV-English — Learn English vocabulary",
  description: "Realtime vocabulary learning, flashcards and spaced repetition powered by Supabase.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
