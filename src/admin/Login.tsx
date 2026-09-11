import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldAlert, ArrowLeft } from "lucide-react";
import { useApp } from "../store";
import { navigate } from "./router";

export default function Login() {
  const { login } = useApp();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const res = await login(user, pass);
    setLoading(false);
    if (res.ok) {
      setError("");
      navigate("/admin");
    } else {
      setError(res.message ?? "تعذر تسجيل الدخول");
    }
  };

  return (
    <div className="dot-grid flex min-h-screen items-center justify-center bg-ink-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <a
          href="#"
          onClick={() => navigate("/")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-white/60 transition hover:text-gold-400"
        >
          <ArrowRight className="h-4 w-4" /> العودة للموقع
        </a>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl">
          <div className="border-b border-white/10 bg-gradient-to-l from-ink-900 to-ink-800 px-8 py-7 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 shadow-lg shadow-gold-500/30">
              <Lock className="h-7 w-7 text-ink-950" />
            </div>
            <h1 className="mt-4 font-head text-xl font-black text-white">لوحة إدارة الموقع</h1>
            <p className="mt-1 text-sm text-white/55">مؤسسة دار الترجمة — وصول خاص للمدير</p>
          </div>

          <form onSubmit={submit} className="space-y-5 p-8">
            <div>
              <label className="mb-2 block text-sm font-bold text-white/80">البريد الإلكتروني</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={user}
                  onChange={(e) => { setUser(e.target.value); setError(""); }}
                  placeholder="example@email.com"
                  autoComplete="email"
                  className="w-full rounded-xl border-2 border-white/15 bg-ink-950 py-3.5 pl-4 pr-12 text-white outline-none transition placeholder:text-white/30 focus:border-gold-500"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-white/80">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <input
                  type={show ? "text" : "password"}
                  value={pass}
                  onChange={(e) => { setPass(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border-2 border-white/15 bg-ink-950 py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-white/30 focus:border-gold-500"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                  aria-label="إظهار كلمة المرور"
                >
                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300"
              >
                <ShieldAlert className="h-5 w-5 shrink-0" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 py-3.5 text-base font-black text-ink-950 shadow-lg shadow-gold-500/25 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "جاري التحقق…" : "تسجيل الدخول"}
              <ArrowLeft className="h-5 w-5" />
            </button>
          </form>

          <div className="border-t border-white/10 px-8 py-4 text-center text-xs text-white/40">
            هذه الصفحة مخصصة لمسؤول الموقع فقط
          </div>
        </div>
      </motion.div>
    </div>
  );
}
