"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
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

type Mode = "login" | "register" | "forgot" | "upgrade" | "recovery" | "set-password";

type Props = {
  user: User | null;
  recoveryMode?: boolean;
  needsPasswordSetup?: boolean;
  onUpgradeStarted?: () => void;
  onPasswordSet?: () => void;
  onRecoveryDone?: () => void;
};

function friendlyError(message: string) {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login credentials")) return "Email hoặc mật khẩu chưa đúng.";
  if (lower.includes("email not confirmed")) return "Bạn cần xác nhận email trước khi đăng nhập.";
  if (lower.includes("user already registered")) return "Email này đã có tài khoản. Hãy đăng nhập.";
  if (lower.includes("password should be")) return "Mật khẩu chưa đạt yêu cầu của Supabase.";
  if (lower.includes("rate limit")) return "Bạn thao tác quá nhanh. Hãy thử lại sau một lúc.";
  return message;
}

export default function AuthScreen({
  user,
  recoveryMode = false,
  needsPasswordSetup = false,
  onUpgradeStarted,
  onPasswordSet,
  onRecoveryDone,
}: Props) {
  const initialMode = useMemo<Mode>(() => {
    if (recoveryMode) return "recovery";
    if (needsPasswordSetup && user && !user.is_anonymous) return "set-password";
    if (user?.is_anonymous) return "upgrade";
    return "login";
  }, [recoveryMode, needsPasswordSetup, user]);

  const [mode, setMode] = useState<Mode>(initialMode);
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
    if (needsPasswordSetup && user && !user.is_anonymous) {
      setMode("set-password");
      return;
    }
    if (user?.is_anonymous) setMode("upgrade");
  }, [recoveryMode, needsPasswordSetup, user]);

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
      setError("Mật khẩu nên có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Hai mật khẩu không giống nhau.");
      return;
    }
    setBusy(true);
    const origin = window.location.origin;
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { display_name: name.trim() || undefined },
        emailRedirectTo: `${origin}/?verified=1`,
      },
    });
    setBusy(false);
    if (authError) {
      setError(friendlyError(authError.message));
      return;
    }
    if (!data.session) {
      setNotice("Tài khoản đã được tạo. Hãy mở email xác nhận, sau đó quay lại đăng nhập.");
    }
  }

  async function forgotPassword(e: FormEvent) {
    e.preventDefault();
    resetFeedback();
    setBusy(true);
    const redirectTo = `${window.location.origin}/?recovery=1`;
    const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
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
      setError("Mật khẩu nên có ít nhất 8 ký tự.");
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
    localStorage.removeItem("lexibloom-upgrade-needs-password");
    setNotice("Mật khẩu đã được cập nhật.");
    if (mode === "set-password") onPasswordSet?.();
    if (mode === "recovery") onRecoveryDone?.();
  }

  async function upgradeGuest(e: FormEvent) {
    e.preventDefault();
    resetFeedback();
    if (!user?.is_anonymous) return;
    setBusy(true);
    const { error: authError } = await supabase.auth.updateUser(
      { email: email.trim() },
      { emailRedirectTo: `${window.location.origin}/?upgrade=1` }
    );
    setBusy(false);
    if (authError) {
      setError(
        `${friendlyError(authError.message)} Nếu project đang chặn việc liên kết identity, bật Manual Linking trong Supabase Auth hoặc chọn “Đăng nhập tài khoản đã có”.`
      );
      return;
    }
    localStorage.setItem("lexibloom-upgrade-needs-password", "1");
    onUpgradeStarted?.();
    setNotice("Đã gửi email xác nhận. Hãy mở email đó trên cùng trình duyệt. Sau khi xác nhận, LexiBloom sẽ yêu cầu bạn tạo mật khẩu. Dữ liệu từ vựng hiện tại sẽ giữ nguyên vì user_id không đổi.");
  }

  async function leaveGuestAndLogin() {
    resetFeedback();
    setBusy(true);
    const { error: authError } = await supabase.auth.signOut();
    setBusy(false);
    if (authError) {
      setError(friendlyError(authError.message));
      return;
    }
    switchMode("login");
  }

  const isPasswordMode = mode === "register" || mode === "recovery" || mode === "set-password";

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
              <div className="auth-heading"><span className="auth-icon"><UserPlus size={20} /></span><div><h2>Tạo tài khoản</h2><p>Từ vựng sẽ gắn với tài khoản này thay vì trình duyệt.</p></div></div>
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
              <div className="auth-heading"><span className="auth-icon"><ShieldCheck size={20} /></span><div><h2>Bảo vệ dữ liệu đang có</h2><p>Trình duyệt này đang có một tài khoản khách. Bạn có thể gắn email vào chính user này để giữ nguyên toàn bộ từ đã lưu.</p></div></div>
              <div className="guest-data-note"><ShieldCheck size={19} /><div><strong>Giữ nguyên user_id hiện tại</strong><span>Deck, vocabulary và review history không cần copy sang bảng mới.</span></div></div>
              <form className="auth-form" onSubmit={upgradeGuest}>
                <Field label="Email muốn gắn vào tài khoản"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></Field>
                <Feedback error={error} notice={notice} />
                <button className="auth-submit" disabled={busy}>{busy ? <Loader2 className="spin" size={18} /> : <ShieldCheck size={17} />} Giữ dữ liệu và tạo tài khoản</button>
              </form>
              <div className="auth-divider"><span>hoặc</span></div>
              <button className="auth-secondary" disabled={busy} onClick={leaveGuestAndLogin}>Đăng nhập tài khoản đã có</button>
              <p className="auth-warning">Nếu chọn đăng nhập tài khoản khác, dữ liệu của tài khoản khách cũ vẫn còn trong Supabase nhưng sẽ không tự chuyển sang tài khoản đó.</p>
            </>
          )}

          {(mode === "recovery" || mode === "set-password") && (
            <>
              <div className="auth-heading"><span className="auth-icon"><ShieldCheck size={20} /></span><div><h2>{mode === "recovery" ? "Tạo mật khẩu mới" : "Hoàn tất tài khoản"}</h2><p>{mode === "recovery" ? "Đặt mật khẩu mới cho tài khoản của bạn." : "Email đã được xác nhận. Tạo mật khẩu để sau này có thể đăng nhập lại."}</p></div></div>
              <form className="auth-form" onSubmit={updatePassword}>
                <Field label="Mật khẩu mới"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ít nhất 8 ký tự" /><button type="button" className="password-toggle" onClick={() => setShowPassword((v) => !v)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></Field>
                <Field label="Nhập lại mật khẩu"><ShieldCheck size={17} /><input type={showPassword ? "text" : "password"} autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Nhập lại mật khẩu" /></Field>
                <Feedback error={error} notice={notice} />
                <button className="auth-submit" disabled={busy}>{busy ? <Loader2 className="spin" size={18} /> : <ShieldCheck size={17} />} Lưu mật khẩu</button>
              </form>
            </>
          )}

          {isPasswordMode && <p className="auth-footnote">Mật khẩu chỉ được gửi tới Supabase Auth qua kết nối HTTPS; app không lưu mật khẩu trong bảng vocabulary.</p>}
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
