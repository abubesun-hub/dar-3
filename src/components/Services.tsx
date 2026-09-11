import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  FileUser,
  Languages,
  SpellCheck,
  LifeBuoy,
  CheckCircle2,
  ArrowLeft,
  Megaphone,
} from "lucide-react";
import { useApp } from "../store";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  FileUser,
  Languages,
  SpellCheck,
  LifeBuoy,
};

const marqueeItems = [
  "ترجمة قانونية محلفة",
  "سير ذاتية متوافقة مع ATS",
  "تنسيق رسائل الماجستير والدكتوراه",
  "بروفايل شركات المقاولات",
  "تدقيق لغوي شامل",
  "ترجمة فورية للمؤتمرات",
  "خطط بحث Proposals",
  "أرشفة بحوث الترقيات",
];

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y-4 border-ink-950 bg-gold-500 py-3.5">
      <div className="animate-marquee flex w-max items-center gap-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-head text-sm font-extrabold text-ink-950">
            {item}
            <Megaphone className="h-4 w-4 opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const { content } = useApp();
  const services = content.services;
  const [active, setActive] = useState(services[2]?.id || services[0]?.id);
  const current = services.find((s) => s.id === active)!;
  const Icon = iconMap[current.icon];

  return (
    <section id="services" className="scroll-mt-28 bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold text-gold-400">
            <span className="h-2 w-2 rounded-full bg-gold-400" />
            منظومة خدمات متكاملة
          </div>
          <h2 className="mt-4 font-head text-3xl font-black text-ink-900 sm:text-4xl">
            خمسة أقسام.. مركز واحد لنجاحك
          </h2>
          <p className="mt-3 leading-8 text-slate-600">
            لا نقدم خدمة واحدة، بل منظومة متكاملة صُممت لتغطي كل احتياجاتك الأكاديمية والمهنية —
            اختر القسم لاستكشاف تفاصيله.
          </p>
        </div>

        {/* tabs */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((s) => {
            const TabIcon = iconMap[s.icon];
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`group relative overflow-hidden rounded-2xl border-2 p-4 text-right transition-all duration-300 ${
                  isActive
                    ? "border-ink-900 bg-ink-900 shadow-xl shadow-ink-900/20"
                    : "border-slate-200 bg-white hover:border-gold-500 hover:shadow-lg"
                }`}
              >
                <span
                  className={`font-head text-2xl font-black ${isActive ? "text-gold-400/40" : "text-slate-200"}`}
                >
                  {s.num}
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <TabIcon className={`h-5 w-5 shrink-0 ${isActive ? "text-gold-400" : "text-ink-900"}`} />
                  <span className={`text-sm font-extrabold leading-6 ${isActive ? "text-white" : "text-ink-900"}`}>
                    {s.title}
                  </span>
                </div>
                <div className={`mt-1 text-[11px] font-medium ${isActive ? "text-white/50" : "text-slate-400"}`} dir="ltr" style={{ textAlign: "right" }}>
                  {s.en}
                </div>
                {isActive && <span className="absolute inset-x-0 bottom-0 h-1 bg-gold-500" />}
              </button>
            );
          })}
        </div>

        {/* panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* image side */}
              <div className="relative min-h-[280px] lg:min-h-full">
                <img src={current.image} alt={current.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-ink-950/35" />
                <div className="absolute bottom-0 right-0 p-6">
                  <div className="flex flex-wrap gap-2">
                    {current.chips.map((c) => (
                      <span key={c} className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink-900 shadow">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2 shadow-lg">
                  <Icon className="h-5 w-5 text-ink-950" />
                  <span className="font-head text-sm font-black text-ink-950">{current.num} — {current.title}</span>
                </div>
              </div>

              {/* content side */}
              <div className="p-6 sm:p-9">
                <p className="text-sm font-bold text-gold-600">{current.en}</p>
                <h3 className="mt-1 font-head text-2xl font-black text-ink-900">{current.tagline}</h3>
                <div className="mt-6 space-y-4">
                  {current.points.map((p, i) => (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                      className="flex gap-3 rounded-2xl border border-slate-100 bg-paper p-4 transition hover:border-gold-500/50 hover:shadow-md"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                      <div>
                        <div className="text-sm font-extrabold text-ink-900">{p.title}</div>
                        <p className="mt-1 text-[13px] leading-6 text-slate-600">{p.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#quote"
                    className="flex items-center gap-2 rounded-xl bg-ink-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-800"
                  >
                    اطلب هذه الخدمة <ArrowLeft className="h-4 w-4" />
                  </a>
                  <a
                    href="#works"
                    className="rounded-xl border-2 border-ink-900/15 px-6 py-3 text-sm font-bold text-ink-900 transition hover:border-gold-500 hover:text-gold-600"
                  >
                    شاهد نماذج الأعمال
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
