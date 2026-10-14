import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

// Public contact for privacy / terms questions (also the support email on Google's consent screen).
export const CONTACT_EMAIL = "vi12091994@gmail.com";
export const UPDATED_AT = "14/10/2026";

export default function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main className="legal">
      <header className="legal-top">
        <Link href="/" aria-label="Về trang chủ TV-English"><Logo size={40} /></Link>
        <nav>
          <Link href="/privacy">Chính sách bảo mật</Link>
          <Link href="/terms">Điều khoản sử dụng</Link>
        </nav>
      </header>
      <article className="legal-card">
        <h1>{title}</h1>
        <p className="legal-meta">Cập nhật lần cuối: {UPDATED_AT}</p>
        <p className="legal-intro">{intro}</p>
        {children}
        <section>
          <h2>Liên hệ</h2>
          <p>Mọi câu hỏi hoặc yêu cầu, vui lòng gửi email tới <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </section>
      </article>
      <footer className="legal-foot"><Link href="/">← Quay lại TV-English</Link></footer>
    </main>
  );
}
