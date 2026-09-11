import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  ShieldCheck,
  Star,
  Languages,
  FileCheck2,
  GraduationCap,
  Sparkles,
  Phone,
} from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { useApp } from "../store";

const waLink = (phoneRaw: string) =>
  `https://wa.me/${phoneRaw}?text=${encodeURIComponent("مرحباً، أرغب بالاستفسار عن خدمات مؤسسة دار الترجمة.")}`;

function Counter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {val.toLocaleString("ar-IQ")}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 10, suffix: "+", label: "سنوات من الخبرة", sub: "منذ 2016" },
  { value: 12500, suffix: "+", label: "مشروع منجز", sub: "ترجمة وأكاديميا" },
  { value: 4800, suffix: "+", label: "عميل يثق بنا", sub: "أفراد وشركات" },
  { value: 99, suffix: "%", label: "دقة معتمدة", sub: "مراجعة 3 مراحل" },
];

export default function Hero() {
  const { content } = useApp();
  const phones = content.phones;
  return (
    <section id="top" className="relative overflow-hidden bg-ink-900 pt-[118px]">
      <div className="grid-lines absolute inset-0" />
      <div className="dot-grid absolute inset-0 opacity-60" />
      {/* gold arc decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full border-[60px] border-gold-500/10" />
      <div className="pointer-events-none absolute -bottom-56 -right-40 h-[420px] w-[420px] rounded-full border-[50px] border-white/5" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-16">
        {/* copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-ink-950/60 px-4 py-1.5 text-xs font-semibold text-gold-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            مركز شامل: ترجمة • أكاديميا • سير ذاتية • تدقيق لغوي
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-5 font-head text-4xl font-black leading-[1.25] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            شريكك الاستراتيجي في
            <br />
            <span className="text-gold-400">النجاح الأكاديمي</span> والمهني
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-5 max-w-xl text-base leading-8 text-white/75 sm:text-lg"
          >
            {content.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#quote"
              className="animate-pulse-ring flex items-center gap-2 rounded-2xl bg-gold-500 px-7 py-3.5 text-base font-bold text-ink-950 transition hover:bg-gold-400"
            >
              احصل على عرض سعر فوري
              <ArrowLeft className="h-5 w-5" />
            </a>
            <a
              href={waLink(phones[0].raw)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 text-base font-bold text-white transition hover:bg-emerald-400"
            >
              <WhatsAppIcon className="h-5 w-5" />
              تواصل عبر واتساب
            </a>
            <a
              href={`tel:${phones[0].raw}`}
              className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-base font-bold text-white backdrop-blur transition hover:border-gold-400 hover:text-gold-400"
            >
              <Phone className="h-5 w-5 text-gold-400" />
              <span dir="ltr">{phones[0].display}</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/65"
          >
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-gold-400" /> ترجمة محلفة معتمدة
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-gold-400" /> سرية تامة للمستندات
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" /> تقييم 4.9 من عملائنا
            </span>
          </motion.div>
        </div>

        {/* visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/40">
            <img
              src="images/doc-translation.jpg"
              alt="مستند عربي مترجم إلى الإنجليزية"
              className="h-[280px] w-full object-cover sm:h-[480px]"
            />
            {/* bottom caption bar */}
            <div className="flex items-center justify-between bg-ink-950/95 px-5 py-3.5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Languages className="h-4 w-4 text-gold-400" />
                عربي <span className="text-gold-400">⇄</span> English
              </div>
              <div className="text-xs font-medium text-white/60">ترجمة قانونية محلفة • 42 صفحة</div>
            </div>
          </div>

          {/* floating card 1 */}
          <div className="animate-float absolute -right-3 top-6 flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-4 shadow-xl sm:-right-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-900">
              <FileCheck2 className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-ink-900">توافق ATS بنسبة 98%</div>
              <div className="text-xs text-slate-500">سير ذاتية تقبلها كبرى الشركات</div>
            </div>
          </div>

          {/* floating card 2 */}
          <div className="animate-float-delay absolute -left-3 bottom-20 flex items-center gap-3 rounded-2xl bg-ink-950 p-3.5 pr-4 shadow-xl sm:-left-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500">
              <GraduationCap className="h-5 w-5 text-ink-950" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white">+900 رسالة جامعية</div>
              <div className="text-xs text-white/60">تنسيق وتدقيق معتمد</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* stats */}
      <div className="relative border-t border-white/10 bg-ink-950/70 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-head text-3xl font-black text-gold-400 sm:text-4xl">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm font-bold text-white">{s.label}</div>
              <div className="text-xs text-white/50">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
