import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaSupport from "@/components/PwaSupport";

export const metadata: Metadata = {
  title: "TV-English — Learn English vocabulary",
  description: "Realtime vocabulary learning, flashcards and spaced repetition powered by Supabase.",
  applicationName: "TV-English",
  appleWebApp: { capable: true, title: "TV-English", statusBarStyle: "default" },
  icons: { apple: "/icons/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#5b8ed8",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        {children}
        <PwaSupport />
      </body>
    </html>
  );
}
