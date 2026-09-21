"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Mode = "login" | "register" | "forgot" | "upgrade" | "recovery";

type Props = {
  user: User | null;
  recoveryMode?: boolean;
  onPrepareGuestMigration?: (nextMode: "login" | "register", email?: string) => Promise<void>;
  onRecoveryDone?: () => void;
};

function friendlyError(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) return "Email hoặc mật khẩu chưa đúng.";
  if (lower.includes("email not confirmed")) return "Bạn cần xác nhận email trước khi đăng nhập.";
  if (lower.includes("user already registered") || lower.includes("already been registered")) return "Email này đã có tài khoản. Hãy đăng nhập.";
  if (lower.includes("password should be") || lower.includes("weak password")) return "Mật khẩu chưa đạt yêu cầu. Hãy dùng ít nhất 8 ký tự.";
  if (lower.includes("rate limit") || lower.includes("email rate limit")) {
    return "Supabase đang giới hạn gửi email trong thời gian ngắn. Hãy chờ một lúc rồi thử lại, hoặc tắt Confirm email khi đang phát triển.";
  }
  return message;
}

export default function AuthScreen({
  user,
  recoveryMode = false,
  onPrepareGuestMigration,
  onRecoveryDone,
}: Props) {
  const [mode, setMode] = useState<Mode>(recoveryMode ? "recovery" : user?.is_anonymous ? "upgrade" : "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (recoveryMode) {
      setMode("recovery");
      return;
    }

    if (user?.is_anonymous) {
      setMode("upgrade");
      return;
    }

    const nextMode = localStorage.getItem("lexibloom-auth-next-mode");
    const prefillEmail = localStorage.getItem("lexibloom-auth-prefill-email");

    if (nextMode === "register" || nextMode === "login") {
      setMode(nextMode);
      localStorage.removeItem("lexibloom-auth-next-mode");
    } else {
      setMode("login");
    }

    if (prefillEmail) {
      setEmail(prefillEmail);
      localStorage.removeItem("lexibloom-auth-prefill-email");
    }
  }, [recoveryMode, user]);

  const resetFeedback = () => {
    setError("");
    setNotice("");
  };

  const switchMode = (next: Mode) => {
    resetFeedback();
    setPassword("");
    setConfirmPassword("");
    setMode(next);
  };

  async function login(e: FormEvent) {
    e.preventDefault();
    resetFeedback();
    setBusy(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setBusy(false);
    if (authError) setError(friendlyError(authError.message));
  }

  async function register(e: FormEvent) {
    e.preventDefault();
    resetFeedback();

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Hai mật khẩu không giống nhau.");
      return;
    }

    setBusy(true);
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: name.trim() || undefined },
        emailRedirectTo: `${window.location.origin}/?verified=1`,
      },
    });
    setBusy(false);

    if (authError) {
      setError(friendlyError(authError.message));
      return;
    }

    if (!data.session) {
      setNotice("Tài khoản đã được tạo. Hãy mở email xác nhận, sau đó quay lại đăng nhập. Dữ liệu guest đã được giữ tạm trên trình duyệt và sẽ chuyển sau khi bạn đăng nhập.");
    } else {
      setNotice("Tạo tài khoản thành công. Đang chuyển dữ liệu cũ vào tài khoản...");
    }
  }

  async function forgotPassword(e: FormEvent) {
    e.preventDefault();
    resetFeedback();
    setBusy(true);

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/?recovery=1`,
    });

    setBusy(false);
    if (authError) {
      setError(friendlyError(authError.message));
      return;
    }
    setNotice("Nếu email này có tài khoản, Supabase sẽ gửi liên kết đặt lại mật khẩu.");
  }

  async function updatePassword(e: FormEvent) {
    e.preventDefault();
    resetFeedback();

    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Hai mật khẩu không giống nhau.");
      return;
    }

    setBusy(true);
    const { error: authError } = await supabase.auth.updateUser({ password });
    setBusy(false);

    if (authError) {
      setError(friendlyError(authError.message));
      return;
    }

    setNotice("Mật khẩu đã được cập nhật.");
    onRecoveryDone?.();
  }

  async function keepGuestDataAndCreateAccount(e: FormEvent) {
    e.preventDefault();
    resetFeedback();
    if (!user?.is_anonymous || !onPrepareGuestMigration) return;

    setBusy(true);
    try {
      await onPrepareGuestMigration("register", email.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể chuẩn bị dữ liệu guest để chuyển tài khoản.");
      setBusy(false);
    }
  }

  async function keepGuestDataAndLogin() {
    resetFeedback();
    if (!user?.is_anonymous || !onPrepareGuestMigration) return;

    setBusy(true);
    try {
      await onPrepareGuestMigration("login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể chuẩn bị dữ liệu guest để chuyển tài khoản.");
      setBusy(false);
    }
  }

  const isPasswordMode = mode === "register" || mode === "recovery";

  return (
    <main className="auth-page">
      <section className="auth-showcase">
        <div className="auth-brand">
          <span className="logo-icon"><BookOpen size={22} /></span>
          <div><strong>LexiBloom</strong><span>Vocabulary that stays with you</span></div>
        </div>
        <div className="auth-showcase-copy">
          <span className="auth-kicker"><Sparkles size={15} /> LEARN • REVIEW • REMEMBER</span>
          <h1>Một tài khoản.<br />Toàn bộ từ vựng của bạn.</h1>
          <p>Đăng nhập trên laptop, điện thoại hoặc máy khác và tiếp tục đúng tiến độ học đã lưu trên Supabase.</p>
          <div className="auth-benefits">
            <div><CheckCircle2 size={18} /><span><strong>Lưu lâu dài</strong><small>Từ vựng và lịch sử ôn tập nằm trên cloud.</small></span></div>
            <div><CheckCircle2 size={18} /><span><strong>Đồng bộ realtime</strong><small>Cùng một tài khoản trên nhiều thiết bị.</small></span></div>
            <div><CheckCircle2 size={18} /><span><strong>Dữ liệu riêng tư</strong><small>RLS chỉ cho phép user đọc dữ liệu của chính mình.</small></span></div>
          </div>
        </div>
        <div className="auth-quote">“A little progress each day adds up to big results.”</div>
      </section>

      <section className="auth-panel-wrap">
        <div className="auth-card">
          {mode === "login" && (
            <>
              <div className="auth-heading"><span className="auth-icon"><LockKeyhole size={20} /></span><div><h2>Đăng nhập</h2><p>Mở lại kho từ vựng và tiến độ học của bạn.</p></div></div>
              <form className="auth-form" onSubmit={login}>
                <Field label="Email"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></Field>
                <Field label="Mật khẩu"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" /><button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></Field>
                <button type="button" className="auth-link forgot-link" onClick={() => switchMode("forgot")}>Quên mật khẩu?</button>
                <Feedback error={error} notice={notice} />
                <button className="auth-submit" disabled={busy}>{busy ? <Loader2 className="spin" size={18} /> : <LockKeyhole size={17} />} Đăng nhập</button>
              </form>
              <div className="auth-switch">Chưa có tài khoản? <button onClick={() => switchMode("register")}>Tạo tài khoản</button></div>
            </>
          )}

          {mode === "register" && (
            <>
              <button className="auth-back" onClick={() => switchMode("login")}><ArrowLeft size={16} /> Quay lại đăng nhập</button>
              <div className="auth-heading"><span className="auth-icon"><UserPlus size={20} /></span><div><h2>Tạo tài khoản</h2><p>Từ vựng sẽ được gắn với tài khoản và đồng bộ giữa các thiết bị.</p></div></div>
              <form className="auth-form" onSubmit={register}>
                <label className="auth-label"><span>Tên hiển thị</span><div className="auth-input"><UserPlus size={17} /><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên của bạn" /></div></label>
                <Field label="Email"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></Field>
                <Field label="Mật khẩu"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ít nhất 8 ký tự" /><button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></Field>
                <Field label="Nhập lại mật khẩu"><ShieldCheck size={17} /><input type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" /></Field>
                <Feedback error={error} notice={notice} />
                <button className="auth-submit" disabled={busy}>{busy ? <Loader2 className="spin" size={18} /> : <UserPlus size={17} />} Tạo tài khoản</button>
              </form>
            </>
          )}

          {mode === "forgot" && (
            <>
              <button className="auth-back" onClick={() => switchMode("login")}><ArrowLeft size={16} /> Quay lại</button>
              <div className="auth-heading"><span className="auth-icon"><Mail size={20} /></span><div><h2>Quên mật khẩu</h2><p>Nhập email để nhận liên kết đặt lại mật khẩu.</p></div></div>
              <form className="auth-form" onSubmit={forgotPassword}>
                <Field label="Email"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></Field>
                <Feedback error={error} notice={notice} />
                <button className="auth-submit" disabled={busy}>{busy ? <Loader2 className="spin" size={18} /> : <Mail size={17} />} Gửi email đặt lại</button>
              </form>
            </>
          )}

          {mode === "upgrade" && (
            <>
              <div className="auth-heading"><span className="auth-icon"><ShieldCheck size={20} /></span><div><h2>Chuyển dữ liệu sang tài khoản</h2><p>Không dùng Manual Linking nữa. LexiBloom sẽ sao lưu dữ liệu guest trong trình duyệt, sau đó chuyển sang tài khoản thật khi bạn đăng nhập.</p></div></div>
              <div className="guest-data-note"><ShieldCheck size={19} /><div><strong>Giữ deck, vocabulary và lịch sử ôn</strong><span>Dữ liệu sẽ được copy sang user_id của tài khoản mới sau khi đăng nhập thành công.</span></div></div>
              <form className="auth-form" onSubmit={keepGuestDataAndCreateAccount}>
                <Field label="Email tài khoản mới"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></Field>
                <Feedback error={error} notice={notice} />
                <button className="auth-submit" disabled={busy}>{busy ? <Loader2 className="spin" size={18} /> : <ShieldCheck size={17} />} Giữ dữ liệu và tạo tài khoản</button>
              </form>
              <div className="auth-divider"><span>hoặc</span></div>
              <button className="auth-secondary" disabled={busy} onClick={keepGuestDataAndLogin}>Giữ dữ liệu và đăng nhập tài khoản đã có</button>
              <p className="auth-warning">Bản sửa này không gọi updateUser(email) trên anonymous user nên không còn lỗi Manual Linking ở bước chuyển dữ liệu.</p>
            </>
          )}

          {mode === "recovery" && (
            <>
              <div className="auth-heading"><span className="auth-icon"><ShieldCheck size={20} /></span><div><h2>Tạo mật khẩu mới</h2><p>Đặt mật khẩu mới cho tài khoản của bạn.</p></div></div>
              <form className="auth-form" onSubmit={updatePassword}>
                <Field label="Mật khẩu mới"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ít nhất 8 ký tự" /><button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></Field>
                <Field label="Nhập lại mật khẩu"><ShieldCheck size={17} /><input type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" /></Field>
                <Feedback error={error} notice={notice} />
                <button className="auth-submit" disabled={busy}>{busy ? <Loader2 className="spin" size={18} /> : <ShieldCheck size={17} />} Lưu mật khẩu</button>
              </form>
            </>
          )}

          {isPasswordMode && <p className="auth-footnote">Mật khẩu được Supabase Auth xử lý; app không lưu mật khẩu trong bảng vocabulary.</p>}
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="auth-label"><span>{label}</span><div className="auth-input">{children}</div></label>;
}

function Feedback({ error, notice }: { error: string; notice: string }) {
  if (!error && !notice) return null;
  return <div className={`auth-feedback ${error ? "error" : "success"}`}>{error || notice}</div>;
}
