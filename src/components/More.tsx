import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ClipboardCheck,
  PenTool,
  Rocket,
  Star,
  ChevronDown,
  Quote as QuoteIcon,
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  ArrowUp,
  ShieldCheck,
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useApp } from "../store";
import { FacebookIcon, NitaqMark, WhatsAppIcon, InstagramIcon, LinkedinIcon } from "./icons";

const waLink = (phoneRaw: string) =>
  `https://wa.me/${phoneRaw}?text=${encodeURIComponent("مرحباً، أرغب بالاستفسار عن خدمات مؤسسة دار الترجمة.")}`;

/* ---------- PROCESS ---------- */
const steps = [
  { icon: Send, title: "أرسل ملفاتك", desc: "راسلنا عبر فيسبوك أو النموذج مع وصف مختصر لاحتياجك — الرد خلال ساعات العمل." },
  { icon: ClipboardCheck, title: "دراسة وعرض سعر", desc: "ندرس ملفاتك ونرسل عرض سعر رسمي (Quotation) بالسعر والمدة الدقيقة." },
  { icon: PenTool, title: "التنفيذ والمراجعة", desc: "يعمل فريق متخصص على مشروعك مع مراجعة لغوية من ثلاث مراحل." },
  { icon: Rocket, title: "التسليم والضمان", desc: "تسليم بالصيغة المطلوبة مع مراجعة مجانية وضمان منصة نطاق." },
];

export function Process() {
  return (
    <section className="bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold text-gold-400">
            <Rocket className="h-3.5 w-3.5" />
            آلية عمل واضحة
          </div>
          <h2 className="mt-4 font-head text-3xl font-black text-ink-900 sm:text-4xl">من رسالتك الأولى.. إلى التسليم النهائي</h2>
        </div>
        <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute right-[12%] left-[12%] top-10 hidden h-0.5 bg-gold-500/40 lg:block" />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:border-gold-500 hover:shadow-xl"
            >
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-ink-900 shadow-lg">
                <s.icon className="h-8 w-8 text-gold-400" />
                <span className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 font-head text-sm font-black text-ink-950 shadow">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-head text-lg font-black text-ink-900">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- NITAQ STRIP ---------- */
export function NitaqStrip() {
  const { content } = useApp();
  const nitaqUrl = content.nitaqUrl?.trim();
  return (
    <section className="border-y-4 border-gold-500 bg-ink-950 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 lg:flex-row">
        <a
          href={nitaqUrl || "#"}
          target={nitaqUrl ? "_blank" : undefined}
          rel={nitaqUrl ? "noopener noreferrer" : undefined}
          title="زيارة منصة نطاق"
          className="group flex items-center gap-4 transition-opacity hover:opacity-85"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gold-500 shadow-xl shadow-gold-500/20 transition-transform group-hover:scale-105">
            <NitaqMark className="h-10 w-10 text-ink-950" />
          </div>
          <div>
            <div className="font-head text-2xl font-black text-white transition-colors group-hover:text-gold-400">منصة نطاق</div>
            <div className="text-sm font-bold text-gold-400">NITAQ PLATFORM • عضو معتمد وموثق</div>
          </div>
        </a>
        <div className="grid flex-1 gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "حماية المدفوعات", d: "حقوقك محفوظة بالكامل" },
            { icon: BadgeCheck, t: "جودة موثقة", d: "تقييمات حقيقية معتمدة" },
            { icon: Star, t: "دعم المنصة", d: "وساطة عادلة عند الحاجة" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <b.icon className="h-8 w-8 shrink-0 text-gold-400" />
              <div>
                <div className="text-sm font-extrabold text-white">{b.t}</div>
                <div className="text-xs text-white/55">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
export function Testimonials() {
  const { content } = useApp();
  const testimonials = content.testimonials;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const go = (d: number) => {
    setDir(d);
    setIdx((i) => (i + d + testimonials.length) % testimonials.length);
  };

  const t = testimonials[idx];

  return (
    <section className="dot-grid-light bg-paper py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold text-gold-400">
          <Star className="h-3.5 w-3.5 fill-gold-400" />
          قالوا عنا — 4.9 من 5
        </div>
        <h2 className="mt-4 font-head text-3xl font-black text-ink-900 sm:text-4xl">ثقة عملائنا.. شهادتنا الأغلى</h2>

        <div className="relative mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl sm:p-10">
          <QuoteIcon className="absolute right-6 top-6 h-12 w-12 text-gold-500/20" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 * dir }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex justify-center gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-9 text-slate-700 sm:text-lg">"{t.text}"</p>
              <div className="mt-6">
                <div className="font-head text-base font-black text-ink-900">{t.name}</div>
                <div className="text-sm text-slate-500">{t.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={() => go(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-ink-900 transition hover:border-gold-500 hover:bg-gold-500" aria-label="السابق">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
                  className={`h-2.5 rounded-full transition-all ${i === idx ? "w-8 bg-gold-500" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`}
                  aria-label={`رأي ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={() => go(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-ink-900 transition hover:border-gold-500 hover:bg-gold-500" aria-label="التالي">
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
export function Faq() {
  const { content } = useApp();
  const faqs = content.faqs;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-28 bg-white py-20">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold text-gold-400">
            كل ما تريد معرفته
          </div>
          <h2 className="mt-4 font-head text-3xl font-black text-ink-900 sm:text-4xl">الأسئلة الأكثر شيوعاً</h2>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border-2 transition ${isOpen ? "border-gold-500 bg-paper shadow-lg" : "border-slate-200 bg-white hover:border-slate-300"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-right"
                >
                  <span className="font-head text-[15px] font-extrabold text-ink-900">{f.q}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${isOpen ? "bg-gold-500 text-ink-950" : "bg-ink-50 text-ink-900"}`}>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-8 text-slate-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
export function Contact() {
  const { content } = useApp();
  const phones = content.phones;
  const socials = content.socials;
  const email = content.email;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "ترجمة تحريرية", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim() && form.phone.trim() && form.message.trim()) setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden bg-ink-900 py-20">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold text-ink-950">
            <Send className="h-3.5 w-3.5" />
            نرد خلال ساعات العمل
          </div>
          <h2 className="mt-4 font-head text-3xl font-black text-white sm:text-4xl">لنبدأ مشروعك القادم معاً</h2>
          <p className="mt-3 leading-8 text-white/65">
            املأ النموذج وسيتواصل معك فريقنا، أو راسلنا مباشرة عبر صفحتنا على فيسبوك.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* info */}
          <div className="space-y-4">
            {/* أزرار الاتصال والواتساب */}
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${phones[0].raw}`} className="group flex flex-col items-center gap-1 rounded-3xl bg-gold-500 p-5 text-center shadow-xl transition hover:bg-gold-400">
                <Phone className="h-7 w-7 text-ink-950" />
                <span className="font-head text-sm font-black text-ink-950">اتصل بنا الآن</span>
                <span className="text-xs font-bold text-ink-900/70" dir="ltr">{phones[0].display}</span>
              </a>
              <a href={waLink(phones[0].raw)} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-1 rounded-3xl bg-emerald-500 p-5 text-center shadow-xl transition hover:bg-emerald-400">
                <WhatsAppIcon className="h-7 w-7 text-white" />
                <span className="font-head text-sm font-black text-white">راسلنا واتساب</span>
                <span className="text-xs font-bold text-white/80" dir="ltr">{phones[0].display}</span>
              </a>
            </div>

            {/* الأرقام */}
            <div className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-extrabold text-white">
                <Phone className="h-4 w-4 text-gold-400" />
                للاتصال أو الواتساب
              </div>
              {phones.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2 rounded-2xl bg-white/5 p-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-white/85" dir="ltr">
                    <Phone className="h-4 w-4 text-gold-400" />
                    {p.display}
                  </span>
                  <div className="flex gap-1.5">
                    <a href={`tel:${p.raw}`} aria-label={`اتصال ${p.display}`} className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500 text-ink-950 transition hover:bg-gold-400">
                      <Phone className="h-4 w-4" />
                    </a>
                    <a href={waLink(p.raw)} target="_blank" rel="noreferrer" aria-label={`واتساب ${p.display}`} className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white transition hover:bg-emerald-400">
                      <WhatsAppIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* الشبكات الاجتماعية */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="mb-3 text-sm font-extrabold text-white">تابعنا على شبكات التواصل</div>
              <div className="grid grid-cols-3 gap-2">
                <a href={socials[0].url} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 p-3 text-center transition hover:bg-blue-600">
                  <FacebookIcon className="h-6 w-6 text-white/80 transition group-hover:text-white" />
                  <span className="text-[11px] font-bold text-white/70 transition group-hover:text-white">{socials[0].handle}</span>
                </a>
                <a href={socials[1].url} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 p-3 text-center transition hover:bg-pink-600">
                  <InstagramIcon className="h-6 w-6 text-white/80 transition group-hover:text-white" />
                  <span className="text-[11px] font-bold text-white/70 transition group-hover:text-white">{socials[1].handle}</span>
                </a>
                <a href={socials[2].url} target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 p-3 text-center transition hover:bg-sky-700">
                  <LinkedinIcon className="h-6 w-6 text-white/80 transition group-hover:text-white" />
                  <span className="text-[11px] font-bold text-white/70 transition group-hover:text-white" dir="ltr">{socials[2].handle}</span>
                </a>
              </div>
            </div>

            {[
              { icon: Clock, t: "ساعات العمل", d: "السبت — الخميس • 9:00 صباحاً - 8:00 مساءً" },
              { icon: Mail, t: "البريد الإلكتروني", d: email, ltr: true },
              { icon: MapPin, t: "نطاق التغطية", d: "جميع المحافظات + خدمات عن بُعد لجميع الدول" },
            ].map((c) => (
              <div key={c.t} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <c.icon className="h-5 w-5 text-gold-400" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-white">{c.t}</div>
                  <div className="mt-0.5 text-[13px] text-white/60" dir={c.ltr ? "ltr" : "rtl"} style={c.ltr ? { textAlign: "right" } : undefined}>{c.d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* form */}
          <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h3 className="mt-5 font-head text-2xl font-black text-ink-900">تم استلام طلبك بنجاح!</h3>
                <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
                  شكراً {form.name} — سيتواصل معك فريقنا خلال ساعات العمل.
                  للاستعجال راسلنا مباشرة عبر واتساب أو اتصل بنا.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <a href={waLink(phones[0].raw)} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white">
                    <WhatsAppIcon className="h-4 w-4" /> مراسلة واتساب
                  </a>
                  <a href={`tel:${phones[0].raw}`} className="flex items-center gap-2 rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-bold text-white">
                    <Phone className="h-4 w-4 text-gold-400" /> اتصال سريع
                  </a>
                  <button onClick={() => { setSent(false); setForm({ name: "", phone: "", service: "ترجمة تحريرية", message: "" }); }} className="rounded-xl border-2 border-slate-200 px-5 py-2.5 text-sm font-bold text-ink-900">
                    طلب جديد
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink-900">الاسم الكامل *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="مثال: علي حسين"
                      className="w-full rounded-xl border-2 border-slate-200 bg-paper px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-gold-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-ink-900">رقم الهاتف *</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                      placeholder="07xx xxx xxxx"
                      className="w-full rounded-xl border-2 border-slate-200 bg-paper px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-gold-500"
                      dir="ltr"
                      style={{ textAlign: "right" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-bold text-ink-900">الخدمة المطلوبة</label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-xl border-2 border-slate-200 bg-paper px-4 py-3 text-sm font-medium outline-none transition focus:border-gold-500"
                  >
                    {["ترجمة تحريرية", "ترجمة قانونية محلفة", "ترجمة شفوية / مؤتمرات", "سيرة ذاتية ATS", "بروفايل شركة", "تدقيق لغوي", "تنسيق رسالة جامعية", "استشارة علمية"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-bold text-ink-900">تفاصيل الطلب *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="اشرح لنا احتياجك: نوع المستند، عدد الصفحات، الموعد المطلوب…"
                    className="w-full resize-none rounded-xl border-2 border-slate-200 bg-paper px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-gold-500"
                  />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 py-3.5 text-base font-black text-white transition hover:bg-ink-800">
                  <Send className="h-5 w-5 text-gold-400" />
                  إرسال الطلب الآن
                </button>
                <p className="text-center text-xs leading-5 text-slate-400">
                  بإرسالك النموذج فأنت توافق على تواصل فريقنا معك. جميع بياناتك سرية ومحمية.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
export function Footer() {
  const { content } = useApp();
  const socials = content.socials;
  const phones = content.phones;
  const email = content.email;
  return (
    <footer className="bg-ink-950 pt-14 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500">
                <span className="font-head text-base font-black text-ink-950">دار</span>
              </div>
              <div className="leading-tight">
                <div className="font-head text-lg font-extrabold">{content.brandName}</div>
                <div className="text-[11px] text-white/50">للترجمة والخدمات الأكاديمية</div>
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-7 text-white/55">
              مركز شامل ومتكامل — شريك استراتيجي في النجاح الأكاديمي والبحثي والمهني للأفراد والشركات منذ 2016.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1.5 text-xs font-bold text-gold-400">
              <NitaqMark className="h-4 w-4" />
              عضو معتمد — منصة نطاق
            </div>
          </div>
          <div>
            <h4 className="font-head text-sm font-black text-gold-400">أقسام الخدمات</h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-white/65">
              {["الخدمات البحثية والأكاديمية", "السير الذاتية والملفات المهنية", "خدمات الترجمة", "الخدمات اللغوية", "الخدمات العلمية الداعمة"].map((s) => (
                <li key={s}>
                  <a href="#services" className="transition hover:text-gold-400">{s}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-head text-sm font-black text-gold-400">روابط سريعة</h4>
            <ul className="mt-4 space-y-2.5 text-[13px] text-white/65">
              {[
                { h: "#works", t: "معرض الأعمال" },
                { h: "#cv-lab", t: "مختبر السيرة الذاتية" },
                { h: "#quote", t: "حاسبة عرض السعر" },
                { h: "#faq", t: "الأسئلة الشائعة" },
                { h: "#contact", t: "تواصل معنا" },
              ].map((l) => (
                <li key={l.h}>
                  <a href={l.h} className="transition hover:text-gold-400">{l.t}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-head text-sm font-black text-gold-400">تابعنا وتواصل</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  title={`${s.label} — ${s.handle}`}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:border-gold-500 hover:text-gold-400"
                >
                  {s.id === "facebook" && <FacebookIcon className="h-5 w-5" />}
                  {s.id === "instagram" && <InstagramIcon className="h-5 w-5" />}
                  {s.id === "linkedin" && <LinkedinIcon className="h-5 w-5" />}
                </a>
              ))}
              <a
                href={waLink(phones[0].raw)}
                target="_blank"
                rel="noreferrer"
                title="واتساب"
                aria-label="واتساب"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-3 space-y-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-white/55">
              {socials.map((s) => (
                <div key={s.id} className="flex justify-between">
                  <span className="text-white/60">{s.label}</span>
                  <span dir="ltr" className="font-bold text-white/75">{s.handle}</span>
                </div>
              ))}
              {phones.map((p) => (
                <div key={p.id} className="flex justify-between">
                  <span className="text-white/60">اتصال / واتساب</span>
                  <a href={`tel:${p.raw}`} dir="ltr" className="font-bold text-gold-400 transition hover:text-gold-300">{p.display}</a>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-6 text-white/55">
              السبت — الخميس • 9ص - 8م<br />
              <span dir="ltr">{email}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-5 text-xs text-white/40 sm:flex-row">
          <span>© 2026 مؤسسة دار الترجمة — جميع الحقوق محفوظة</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
            عضو موثق في نقابة المترجمين العراقين ومنظومة منصة نطاق
          </span>

        </div>
      </div>
    </footer>
  );
}

/* ---------- FLOATERS ---------- */
export function Floaters() {
  const { content } = useApp();
  const phones = content.phones;
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href={`tel:${phones[0].raw}`}
          aria-label="اتصل بنا"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-500 text-ink-950 shadow-2xl transition hover:bg-gold-400"
        >
          <Phone className="h-6 w-6" />
        </a>
        <a
          href={waLink(phones[0].raw)}
          target="_blank"
          rel="noreferrer"
          aria-label="راسلنا على واتساب"
          className="animate-pulse-ring flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl transition hover:bg-emerald-400"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </div>
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="العودة للأعلى"
            className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink-900 text-gold-400 shadow-2xl transition hover:bg-ink-800"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
