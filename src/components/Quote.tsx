import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Copy,
  Check,
  Zap,
  Languages,
  FileText,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { useApp } from "../store";
import { WhatsAppIcon } from "./icons";

const pairs = [
  { id: "ar-en", label: "عربي ← إنجليزي", mult: 1 },
  { id: "en-ar", label: "إنجليزي ← عربي", mult: 1 },
  { id: "ar-ar", label: "تدقيق / تنسيق عربي", mult: 0.9 },
  { id: "en-en", label: "تدقيق / تنسيق إنجليزي", mult: 1.1 },
];

const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

export default function Quote() {
  const { content } = useApp();
  const quoteServices = content.quoteServices;
  const urgencyLevels = content.urgency;
  const phones = content.phones;
  const [serviceId, setServiceId] = useState("written");
  const [qty, setQty] = useState(10);
  const [pairId, setPairId] = useState("ar-en");
  const [urgencyId, setUrgencyId] = useState("normal");
  const [sealed, setSealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const service = quoteServices.find((s) => s.id === serviceId)!;
  const pair = pairs.find((p) => p.id === pairId)!;
  const urgency = urgencyLevels.find((u) => u.id === urgencyId)!;

  const calc = useMemo(() => {
    const q = Math.min(Math.max(qty, service.min), service.max);
    let lo = service.baseMin * q * pair.mult * urgency.mult;
    let hi = service.baseMax * q * pair.mult * urgency.mult;
    if (sealed) {
      lo += 15000;
      hi += 25000;
    }
    return { lo, hi, q };
  }, [qty, service, pair, urgency, sealed]);

  // reset qty when service changes
  const selectService = (id: string) => {
    setServiceId(id);
    const s = quoteServices.find((x) => x.id === id)!;
    setQty(Math.min(Math.max(10, s.min), s.max));
  };

  const quoteText = `طلب عرض سعر — مؤسسة دار الترجمة
----------------------------
الخدمة: ${service.label}
الكمية: ${calc.q} ${service.unit}
اللغة: ${pair.label}
الأولوية: ${urgency.label}
توثيق وختم: ${sealed ? "نعم" : "لا"}
----------------------------
السعر التقديري: ${fmt(calc.lo)} – ${fmt(calc.hi)} د.ع
مدة التسليم: ${service.delivery}
(عضو معتمد — منصة نطاق)`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(quoteText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="quote" className="scroll-mt-28 bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold text-gold-400">
            <Calculator className="h-3.5 w-3.5" />
            شفافية كاملة في الأسعار
          </div>
          <h2 className="mt-4 font-head text-3xl font-black text-ink-900 sm:text-4xl">
            احسب عرض سعرك بنفسك — خلال ثوانٍ
          </h2>
          <p className="mt-3 leading-8 text-slate-600">
            اختر الخدمة والكمية والأولوية، واحصل على تقدير فوري بالدينار العراقي —
            ثم انسخ العرض وأرسله لنا لاعتماده رسمياً.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* controls */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            {/* service select */}
            <div className="flex items-center gap-2 text-sm font-black text-ink-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-xs font-black text-gold-400">1</span>
              اختر الخدمة
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {quoteServices.map((s) => (
                <button
                  key={s.id}
                  onClick={() => selectService(s.id)}
                  className={`rounded-xl border-2 px-3 py-2.5 text-[13px] font-bold transition ${
                    s.id === serviceId
                      ? "border-ink-900 bg-ink-900 text-gold-400 shadow-lg"
                      : "border-slate-200 bg-paper text-slate-600 hover:border-gold-500"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* qty */}
            <div className="mt-7 flex items-center gap-2 text-sm font-black text-ink-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-xs font-black text-gold-400">2</span>
              حدد الكمية: <span className="text-gold-600">{service.unit}</span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <input
                type="range"
                min={service.min}
                max={service.max}
                step={service.step}
                value={calc.q}
                onChange={(e) => setQty(Number(e.target.value))}
                className="gold-range flex-1"
              />
              <div className="w-20 shrink-0 rounded-xl bg-ink-900 py-2 text-center font-head text-xl font-black text-gold-400">
                {calc.q}
              </div>
            </div>
            <div className="mt-1 flex justify-between text-[11px] font-medium text-slate-400">
              <span>{service.min}</span>
              <span>{service.max}</span>
            </div>

            {/* pair + urgency */}
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-sm font-black text-ink-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-xs font-black text-gold-400">3</span>
                  الاتجاه اللغوي
                </div>
                <div className="mt-3 space-y-2">
                  {pairs.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPairId(p.id)}
                      className={`flex w-full items-center gap-2 rounded-xl border-2 px-3 py-2 text-[13px] font-bold transition ${
                        p.id === pairId
                          ? "border-gold-500 bg-gold-500/10 text-ink-900"
                          : "border-slate-200 text-slate-500 hover:border-gold-500/50"
                      }`}
                    >
                      <Languages className="h-4 w-4" /> {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm font-black text-ink-900">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-900 text-xs font-black text-gold-400">4</span>
                  الأولوية
                </div>
                <div className="mt-3 space-y-2">
                  {urgencyLevels.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setUrgencyId(u.id)}
                      className={`flex w-full items-center justify-between rounded-xl border-2 px-3 py-2 text-[13px] font-bold transition ${
                        u.id === urgencyId
                          ? "border-gold-500 bg-gold-500/10 text-ink-900"
                          : "border-slate-200 text-slate-500 hover:border-gold-500/50"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Zap className="h-4 w-4" /> {u.label}
                      </span>
                      <span className="text-[11px] font-medium opacity-70">{u.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* sealed */}
            <label className="mt-6 flex cursor-pointer items-center justify-between rounded-2xl border-2 border-dashed border-slate-300 bg-paper p-4 transition hover:border-gold-500">
              <span className="flex items-center gap-2 text-sm font-bold text-ink-900">
                <BadgeCheck className="h-5 w-5 text-gold-600" />
                توثيق رسمي وختم معتمد
                <span className="text-xs font-medium text-slate-500">(+15 – 25 ألف د.ع)</span>
              </span>
              <button
                role="switch"
                aria-checked={sealed}
                onClick={(e) => { e.preventDefault(); setSealed(!sealed); }}
                className={`relative h-7 rounded-full transition ${sealed ? "bg-ink-900" : "bg-slate-300"}`}
                style={{ width: 52 }}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${sealed ? "right-1" : "right-[27px]"}`}
                />
              </button>
            </label>
          </div>

          {/* result card */}
          <div className="flex flex-col overflow-hidden rounded-3xl bg-ink-900 shadow-2xl">
            <div className="dot-grid p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm font-bold text-gold-400">
                <FileText className="h-4 w-4" />
                عرض السعر التقديري — Quotation
              </div>
              <div className="mt-4 rounded-2xl bg-ink-950/70 p-5">
                <div className="text-xs font-medium text-white/50">السعر التقديري (دينار عراقي)</div>
                <motion.div
                  key={`${calc.lo}-${calc.hi}`}
                  initial={{ opacity: 0.4, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 font-head text-3xl font-black leading-snug text-white sm:text-4xl"
                >
                  {fmt(calc.lo)} <span className="text-lg text-gold-400">–</span> {fmt(calc.hi)}
                  <span className="mr-2 text-base font-bold text-gold-400">د.ع</span>
                </motion.div>
                <div className="mt-3 space-y-2 border-t border-white/10 pt-3 text-[13px]">
                  <div className="flex justify-between text-white/70">
                    <span>الخدمة</span>
                    <strong className="text-white">{service.label}</strong>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>الكمية</span>
                    <strong className="text-white">{calc.q} {service.unit}</strong>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>الأولوية</span>
                    <strong className="text-gold-400">{urgency.label}</strong>
                  </div>
                  <div className="flex items-center justify-between text-white/70">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> التسليم المتوقع</span>
                    <strong className="text-white">{service.delivery}</strong>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={copy}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 py-3 text-sm font-black text-ink-950 transition hover:bg-gold-400"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "تم النسخ!" : "نسخ العرض"}
                </button>
                <a
                  href={`https://wa.me/${phones[0].raw}?text=${encodeURIComponent(quoteText)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-400"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  اعتماده عبر واتساب
                </a>
              </div>
              <p className="mt-4 text-[11px] leading-5 text-white/45">
                * أسعار استرشادية تشمل المراجعة ثلاثية المراحل. السعر النهائي يُعتمد بعد مراجعة الملفات
                ويُرسل لك في عرض سعر رسمي (Quotation) مختوم.
              </p>
            </div>
            <div className="mt-auto bg-gold-500 px-6 py-3 text-center text-xs font-black text-ink-950">
              ضمان منصة نطاق: استرداد كامل إذا لم تعجبك الجودة
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
