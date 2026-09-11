import { useState } from "react"; 
import { motion } from "framer-motion";
import {
  ScanSearch,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileUser,
  Languages,
  Briefcase,
  Wand2,
  RotateCcw,
} from "lucide-react";
import { useApp } from "../store";
import { WhatsAppIcon } from "./icons";

const waLink = (phoneRaw: string) =>
  `https://wa.me/${phoneRaw}?text=${encodeURIComponent("مرحباً، أرغب بطلب سيرة ذاتية احترافية من مؤسسة دار الترجمة.")}`;

type Check = { label: string; pass: boolean; hint: string };

function analyzeCV(text: string): { score: number; checks: Check[] } {
  const t = text.trim();
  const lower = t.toLowerCase();
  const words = t.split(/\s+/).filter(Boolean).length;
  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.]+/.test(t);
  const hasPhone = /(\+?\d[\d\s-]{6,}\d)/.test(t);
  const hasLinkedin = /linkedin|لينكد/.test(lower);
  const actionWords = ["developed", "managed", "led", "achieved", "designed", "implemented", "طور", "أدرت", "قدت", "حققت", "صممت", "نفذت", "خبرة", "experience", "مهارات", "skills"];
  const actionCount = actionWords.filter((w) => lower.includes(w)).length;
  const hasEnglish = /[a-zA-Z]{3,}/.test(t);
  const hasArabic = /[\u0600-\u06FF]{3,}/.test(t);
  const hasNumbers = /\d+%|\d+\s*(سنوات|years|مشروع|projects?)|\d{4}/.test(lower);
  const hasEducation = /بكالوريوس|ماجستير|دكتوراه|جامعة|bachelor|master|phd|university|college|education|التعليم/.test(lower);

  const checks: Check[] = [
    {
      label: "معلومات التواصل",
      pass: hasEmail && hasPhone,
      hint: hasEmail && hasPhone ? "بريد إلكتروني وهاتف موجودان — ممتاز" : "أضف بريداً إلكترونياً ورقم هاتف واضحين أعلى السيرة",
    },
    {
      label: "الملف المهني (LinkedIn)",
      pass: hasLinkedin,
      hint: hasLinkedin ? "رابط لينكدإن يعزز مصداقيتك" : "أضف رابط حساب LinkedIn — تفضله 87% من الشركات",
    },
    {
      label: "كلمات مفتاحية وأفعال إنجاز",
      pass: actionCount >= 3,
      hint: actionCount >= 3 ? `${actionCount} كلمات قوية تم رصدها` : "استخدم أفعال إنجاز: طوّرت، حققت، قدت… بدل الوصف العام",
    },
    {
      label: "أرقام ونتائج قابلة للقياس",
      pass: hasNumbers,
      hint: hasNumbers ? "الأرقام تجذب أنظمة ATS والموظفين" : "أضف أرقاماً: سنوات خبرة، نسب، أحجام مشاريع",
    },
    {
      label: "القسم التعليمي",
      pass: hasEducation,
      hint: hasEducation ? "المؤهل العلمي موثق بوضوح" : "وثّق شهادتك والجامعة وسنة التخرج",
    },
    {
      label: "ثنائية اللغة",
      pass: hasEnglish && hasArabic,
      hint: hasEnglish && hasArabic ? "محتوى عربي وإنجليزي — مثالي لسوق العمل" : "النسخة ثنائية اللغة تضاعف فرصك — نوفرها لك جاهزة",
    },
    {
      label: "الطول المناسب",
      pass: words >= 150 && words <= 800,
      hint: words < 150 ? `النص قصير (${words} كلمة) — الصق سيرتك الكاملة` : words > 800 ? "اختصر — السيرة المثالية صفحة إلى صفحتين" : `${words} كلمة — طول مثالي`,
    },
  ];

  const passed = checks.filter((c) => c.pass).length;
  const score = Math.round((passed / checks.length) * 100);
  return { score, checks };
}

const sampleCV = `أحمد محمد الجبوري — مهندس مدني
ahmed.j@example.com | 0770 123 4567 | linkedin.com/in/ahmed-j
الخبرة: 6 سنوات في إدارة مشاريع البنية التحتية. قدت فريقاً من 12 مهندساً ونفذت 8 مشاريع بقيمة تجاوزت 4 مليار دينار. حققت خفضاً في التكاليف بنسبة 18%.
المهارات: إدارة المشاريع، AutoCAD، Primavera، إعداد التقارير الفنية.
التعليم: بكالوريوس هندسة مدنية — جامعة بغداد 2017.
Experience: Civil Engineer with 6 years managing infrastructure projects. Led teams and delivered 8 projects on schedule.`;

const features = [
  { icon: FileUser, title: "متوافقة 100% مع ATS", desc: "تنسيق نظيف تقرؤه أنظمة الفلترة الآلية دون أخطاء" },
  { icon: Languages, title: "نسختان: عربي + English", desc: "صياغة احترافية بكل لغة وليست ترجمة حرفية" },
  { icon: Briefcase, title: "مصممة لتخصصك", desc: "هندسية، تقنية، إدارية، طبية — بلغة كل قطاع" },
  { icon: Wand2, title: "صياغة تسويقية", desc: "نحوّل مهامك إلى إنجازات بأرقام مقنعة" },
];

export default function CvLab() {
  const { content } = useApp();
  const phones = content.phones;
  const [text, setText] = useState("");
  const [result, setResult] = useState<{ score: number; checks: Check[] } | null>(null);

  const run = () => {
    if (text.trim().split(/\s+/).length < 10) return;
    setResult(analyzeCV(text));
  };

  const scoreColor = result
    ? result.score >= 80
      ? "text-emerald-600"
      : result.score >= 50
        ? "text-amber-600"
        : "text-red-600"
    : "";
  const ringColor = result
    ? result.score >= 80
      ? "stroke-emerald-500"
      : result.score >= 50
        ? "stroke-amber-500"
        : "stroke-red-500"
    : "stroke-slate-200";

  return (
    <section id="cv-lab" className="dot-grid-light scroll-mt-28 bg-paper py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-1.5 text-xs font-bold text-gold-400">
            <ScanSearch className="h-3.5 w-3.5" />
            تجربة تفاعلية مجانية
          </div>
          <h2 className="mt-4 font-head text-3xl font-black text-ink-900 sm:text-4xl">
            مختبر السيرة الذاتية — هل ستجتاز فلتر ATS؟
          </h2>
          <p className="mt-3 leading-8 text-slate-600">
            الصق نص سيرتك الذاتية أدناه واحصل على تقييم فوري لتوافقها مع أنظمة تتبع المتقدمين —
            تماماً كما تفعل كبرى الشركات قبل قراءتها.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* input */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-ink-900 px-5 py-4">
              <span className="text-sm font-bold text-white">الصق نص سيرتك هنا</span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setText(sampleCV); setResult(null); }}
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-gold-300 transition hover:bg-white/20"
                >
                  جرّب نصاً جاهزاً
                </button>
                <button
                  onClick={() => { setText(""); setResult(null); }}
                  className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:bg-white/20"
                >
                  <RotateCcw className="h-3 w-3" /> مسح
                </button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="مثال: الاسم، معلومات التواصل، الخبرات، المهارات، التعليم…"
              className="w-full resize-none p-5 text-sm leading-7 text-slate-700 outline-none placeholder:text-slate-400"
            />
            <div className="flex items-center justify-between border-t border-slate-100 bg-paper px-5 py-4">
              <span className="text-xs font-medium text-slate-500">
                {text.trim() ? text.trim().split(/\s+/).length : 0} كلمة
              </span>
              <button
                onClick={run}
                disabled={text.trim().split(/\s+/).length < 10}
                className="flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-2.5 text-sm font-black text-ink-950 shadow-lg shadow-gold-500/25 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                <ScanSearch className="h-4 w-4" />
                افحص سيرتي الآن
              </button>
            </div>
          </div>

          {/* result */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            {!result ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ink-50">
                  <FileUser className="h-9 w-9 text-ink-900" />
                </div>
                <h3 className="mt-4 font-head text-lg font-extrabold text-ink-900">بانتظار نص سيرتك…</h3>
                <p className="mt-2 max-w-xs text-[13px] leading-6 text-slate-500">
                  سنفحص 7 معايير حاسمة: التواصل، الكلمات المفتاحية، الأرقام، التعليم، وثنائية اللغة.
                </p>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center gap-5">
                  <div className="relative h-28 w-28 shrink-0">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#eef2fb" strokeWidth="10" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        strokeWidth="10"
                        strokeLinecap="round"
                        className={ringColor}
                        strokeDasharray={264}
                        initial={{ strokeDashoffset: 264 }}
                        animate={{ strokeDashoffset: 264 - (264 * result.score) / 100 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`font-head text-2xl font-black ${scoreColor}`}>{result.score}%</span>
                      <span className="text-[10px] font-bold text-slate-400">توافق ATS</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-head text-lg font-black text-ink-900">
                      {result.score >= 80 ? "سيرة قوية — جاهزة للتقديم!" : result.score >= 50 ? "سيرة متوسطة — تحتاج تحسين" : "سيرة ضعيفة — ستُرفض آلياً!"}
                    </h3>
                    <p className="mt-1 text-[13px] leading-6 text-slate-500">
                      {result.score >= 80
                        ? "عمل رائع! مع صياغة احترافية من فريقنا ستصبح لا تُقاوم."
                        : "لا تقلق — فريقنا يبني لك سيرة بتوافق 98% خلال 72 ساعة."}
                    </p>
                    <a
                      href={waLink(phones[0].raw)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-400"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      اطلب سيرة احترافية الآن
                    </a>
                  </div>
                </div>
                <div className="mt-5 space-y-2.5">
                  {result.checks.map((c, i) => (
                    <motion.div
                      key={c.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-start gap-3 rounded-xl border p-3 ${
                        c.pass ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
                      }`}
                    >
                      {c.pass ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      ) : (
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                      )}
                      <div>
                        <div className="text-[13px] font-extrabold text-ink-900">{c.label}</div>
                        <div className="text-xs leading-5 text-slate-600">{c.hint}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* features */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-gold-500 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-900">
                <f.icon className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-ink-900">{f.title}</div>
                <div className="mt-1 text-xs leading-5 text-slate-500">{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-2xl items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-[13px] leading-6 text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>حقيقة:</strong> أكثر من 75% من السير الذاتية تُرفض من أنظمة ATS قبل أن يراها أي موظف —
            بسبب التنسيق الخاطئ وغياب الكلمات المفتاحية. لا تدع سيرتك واحدة منها.
          </span>
        </div>
      </div>
    </section>
  );
}
