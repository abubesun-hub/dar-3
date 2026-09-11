import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronsLeftRight, FileText, Award, Building2, GraduationCap } from "lucide-react";
import { useApp } from "../store";

const filters = [
  { id: "all", label: "الكل" },
  { id: "docs", label: "مستندات مترجمة" },
  { id: "cv", label: "سير ذاتية" },
  { id: "profile", label: "بروفايل شركات" },
  { id: "academic", label: "أعمال أكاديمية" },
];

function CompareSlider() {
  const [pos, setPos] = useState(50);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink-950 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <ChevronsLeftRight className="h-5 w-5 text-gold-400" />
          اسحب المقبض لمقارنة الأصل العربي مع الترجمة الإنجليزية
        </div>
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="rounded-full bg-gold-500 px-3 py-1 text-ink-950">الأصل: عربي</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-white">الترجمة: English</span>
        </div>
      </div>

      <div className="relative h-[430px] select-none sm:h-[380px]" dir="ltr">
        {/* English layer (base) */}
        <div className="absolute inset-0 bg-cream p-6 sm:p-10" dir="ltr">
          <div className="mx-auto max-w-2xl rounded-xl border border-slate-300 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b-2 border-ink-900 pb-3">
              <span className="font-head text-lg font-black text-ink-900">Service Agreement</span>
              <span className="rounded bg-ink-900 px-2 py-1 text-[10px] font-bold text-gold-400">CERTIFIED TRANSLATION</span>
            </div>
            <p className="mt-4 text-[13px] leading-7 text-slate-600">
              <strong className="text-ink-900">Article One — Scope of Work:</strong> The Second Party
              undertakes to provide certified translation services for all project documents, including
              contracts, technical manuals, and progress reports, in accordance with the approved
              terminology and within the agreed timelines.
            </p>
            <p className="mt-3 text-[13px] leading-7 text-slate-600">
              <strong className="text-ink-900">Article Two — Quality Assurance:</strong> All translated
              texts shall undergo a three-stage review process — linguistic proofreading, stylistic
              refinement, and final validation — to ensure full compliance with international standards.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-600 text-gold-600">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-[11px] font-bold text-slate-500">Stamped &amp; Certified<br />Dar Al-Tarjama — Baghdad</div>
            </div>
          </div>
        </div>

        {/* Arabic layer (clipped with clip-path so content stays aligned) */}
        <div
          className="absolute inset-0 overflow-hidden bg-ink-900"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <div className="h-full w-full p-6 sm:p-10">
            <div className="mx-auto max-w-2xl rounded-xl border border-gold-500/30 bg-ink-950 p-6 shadow-sm" dir="rtl">
              <div className="flex items-center justify-between border-b-2 border-gold-500 pb-3">
                <span className="font-head text-lg font-black text-white">عقد تقديم خدمات</span>
                <span className="rounded bg-gold-500 px-2 py-1 text-[10px] font-bold text-ink-950">ترجمة معتمدة</span>
              </div>
              <p className="mt-4 text-[13px] leading-8 text-white/75">
                <strong className="text-gold-400">المادة الأولى — نطاق العمل:</strong> يتعهد الطرف الثاني
                بتقديم خدمات الترجمة المعتمدة لجميع مستندات المشروع، بما فيها العقود والأدلة التقنية
                وتقارير سير العمل، وفق المصطلحات المعتمدة وضمن المدد الزمنية المتفق عليها.
              </p>
              <p className="mt-3 text-[13px] leading-8 text-white/75">
                <strong className="text-gold-400">المادة الثانية — ضمان الجودة:</strong> تخضع جميع النصوص
                المترجمة لمراجعة من ثلاث مراحل — التدقيق اللغوي، والضبط الأسلوبي، والاعتماد النهائي —
                لضمان المطابقة الكاملة للمعايير الدولية.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold-400 text-gold-400">
                  <Award className="h-6 w-6" />
                </div>
                <div className="text-[11px] font-bold text-white/60">مختوم ومعتمد<br />مؤسسة دار الترجمة — بغداد</div>
              </div>
            </div>
          </div>
        </div>

        {/* handle */}
        <div className="absolute inset-y-0 z-10 w-1 bg-gold-500 shadow-[0_0_20px_rgba(201,162,39,.8)]" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-ink-950 bg-gold-500 shadow-xl">
            <ChevronsLeftRight className="h-5 w-5 text-ink-950" />
          </div>
        </div>

        <input
          type="range"
          min={8}
          max={92}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="compare-range absolute inset-0 z-20 h-full w-full"
          aria-label="مقارنة الترجمة"
        />
      </div>
    </div>
  );
}

const catIcon: Record<string, React.ReactNode> = {
  "مستند مترجم": <FileText className="h-4 w-4" />,
  "سيرة ذاتية": <Award className="h-4 w-4" />,
  "ملف تعريفي": <Building2 className="h-4 w-4" />,
  "ترجمة شفوية": <FileText className="h-4 w-4" />,
  "عمل أكاديمي": <GraduationCap className="h-4 w-4" />,
  "ترجمة محلفة": <Award className="h-4 w-4" />,
};

export default function Showcase() {
  const { content } = useApp();
  const works = content.works;
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = filter === "all" ? works : works.filter((w) => w.filter === filter);
  const current = lightbox !== null ? works.find((w) => w.id === lightbox) : null;

  return (
    <section id="works" className="scroll-mt-28 bg-ink-900 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold text-ink-950">
            <ZoomIn className="h-3.5 w-3.5" />
            نماذج حقيقية من أعمالنا
          </div>
          <h2 className="mt-4 font-head text-3xl font-black text-white sm:text-4xl">
            مستندات عربية.. بترجمة إنجليزية رصينة
          </h2>
          <p className="mt-3 leading-8 text-white/65">
            سير ذاتية للأفراد، ملفات تعريفية للشركات، عقود محلفة، ورسائل جامعية —
            تصفح عينات من جودة عملنا.
          </p>
        </div>

        {/* compare */}
        <div className="mt-10">
          <CompareSlider />
        </div>

        {/* filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                filter === f.id
                  ? "bg-gold-500 text-ink-950 shadow-lg shadow-gold-500/25"
                  : "border border-white/15 bg-white/5 text-white/70 hover:border-gold-400 hover:text-gold-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((w) => (
              <motion.article
                layout
                key={w.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-ink-950 transition hover:border-gold-500/60 hover:shadow-2xl hover:shadow-gold-500/10"
                onClick={() => setLightbox(w.id)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={w.image}
                    alt={w.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-ink-950/20 transition group-hover:bg-ink-950/10" />
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1.5 text-[11px] font-black text-ink-950 shadow-lg">
                    {catIcon[w.cat]} {w.cat}
                  </span>
                  <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink-900 opacity-0 shadow-lg transition group-hover:opacity-100">
                    <ZoomIn className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-head text-base font-extrabold text-white transition group-hover:text-gold-400">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-white/60">{w.desc}</p>
                  <div className="mt-3 border-t border-white/10 pt-3 text-xs font-bold text-gold-400">
                    {w.meta}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* lightbox */}
        <AnimatePresence>
          {current && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={current.image} alt={current.title} className="h-[380px] w-full object-cover sm:h-[440px]" />
                <div className="p-6">
                  <span className="rounded-full bg-ink-900 px-3 py-1 text-xs font-bold text-gold-400">{current.cat}</span>
                  <h3 className="mt-3 font-head text-xl font-black text-ink-900">{current.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{current.desc}</p>
                  <div className="mt-3 text-sm font-bold text-gold-600">{current.meta}</div>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink-950/80 text-white backdrop-blur transition hover:bg-gold-500 hover:text-ink-950"
                  aria-label="إغلاق"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
