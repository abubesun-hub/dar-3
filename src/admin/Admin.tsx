import { useState } from "react";
import {
  LayoutDashboard,
  Settings,
  Layers,
  Briefcase,
  Star,
  HelpCircle,
  Calculator,
  Phone,
  LogOut,
  Save,
  RotateCcw,
  ExternalLink,
  Check,
  Trash2,
  Plus,
} from "lucide-react";
import { useApp } from "../store";
import { navigate } from "./router";
import { Field, NumberField, SelectField } from "./fields";

const tabs = [
  { id: "general", label: "الإعدادات العامة", icon: Settings },
  { id: "services", label: "الخدمات", icon: Layers },
  { id: "works", label: "أعمالنا", icon: Briefcase },
  { id: "testimonials", label: "آراء العملاء", icon: Star },
  { id: "faqs", label: "الأسئلة الشائعة", icon: HelpCircle },
  { id: "pricing", label: "عرض الأسعار", icon: Calculator },
  { id: "contact", label: "التواصل", icon: Phone },
];

export default function Admin() {
  const { content, setContent, saveContent, resetContent, logout } = useApp();
  const [tab, setTab] = useState("general");
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const update = (updater: (prev: typeof content) => typeof content) => {
    setContent(updater);
    setDirty(true);
  };

  const flash = () => {
    saveContent(content);
    setSaved(true);
    setDirty(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const doReset = () => {
    resetContent();
    setConfirmReset(false);
    setDirty(false);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-ink-900 shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500">
              <LayoutDashboard className="h-5 w-5 text-ink-950" />
            </div>
            <div className="leading-tight">
              <div className="font-head text-base font-black text-white">لوحة الإدارة</div>
              <div className="text-[11px] text-white/50">مؤسسة دار الترجمة</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#/"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-white/80 transition hover:text-gold-400"
            >
              <ExternalLink className="h-4 w-4" /> عرض الموقع
            </a>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/20"
            >
              <LogOut className="h-4 w-4" /> خروج
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                tab === t.id
                  ? "bg-ink-900 text-gold-400 shadow-lg"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* content */}
        <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {tab === "general" && <GeneralTab content={content} update={update} />}

          {tab === "services" && (
            <ServicesTab
              services={content.services}
              onUpdate={(s) => update((prev) => ({ ...prev, services: s }))}
            />
          )}

          {tab === "works" && (
            <WorksTab
              works={content.works}
              onUpdate={(w) => update((prev) => ({ ...prev, works: w }))}
            />
          )}

          {tab === "testimonials" && (
            <TestimonialsTab
              list={content.testimonials}
              onUpdate={(t) => update((prev) => ({ ...prev, testimonials: t }))}
            />
          )}

          {tab === "faqs" && (
            <FaqsTab
              list={content.faqs}
              onUpdate={(f) => update((prev) => ({ ...prev, faqs: f }))}
            />
          )}

          {tab === "pricing" && (
            <PricingTab
              quoteServices={content.quoteServices}
              urgency={content.urgency}
              onUpdate={(q, u) => update((prev) => ({ ...prev, quoteServices: q, urgency: u }))}
            />
          )}

          {tab === "contact" && (
            <ContactTab content={content} update={update} />
          )}
        </div>

        {/* footer actions */}
        <div className="sticky bottom-0 z-20 mt-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur">
            <div className="flex items-center gap-2 text-sm">
              {dirty ? (
                <span className="flex items-center gap-1.5 font-bold text-amber-600">
                  <span className="h-2 w-2 rounded-full bg-amber-500" /> لديك تغييرات غير محفوظة
                </span>
              ) : saved ? (
                <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                  <Check className="h-4 w-4" /> تم الحفظ بنجاح
                </span>
              ) : (
                <span className="text-slate-400">جميع التغييرات تُحفظ تلقائياً في قاعدة البيانات</span>
              )}
            </div>
            <div className="flex gap-2">
              {confirmReset ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-600">تأكيد إعادة الضبط؟</span>
                  <button onClick={doReset} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white">نعم، أعد الضبط</button>
                  <button onClick={() => setConfirmReset(false)} className="rounded-lg bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700">إلغاء</button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                  >
                    <RotateCcw className="h-4 w-4" /> إعادة الافتراضي
                  </button>
                  <button
                    onClick={flash}
                    className="flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-black text-ink-950 shadow-lg transition hover:bg-gold-400"
                  >
                    <Save className="h-4 w-4" /> حفظ التغييرات
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ GENERAL ============ */
function GeneralTab({ content, update }: { content: ReturnType<typeof useApp>["content"]; update: (u: (p: any) => any) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 font-head text-lg font-black text-ink-900">
        <Settings className="h-5 w-5 text-gold-600" /> الإعدادات العامة
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="اسم المؤسسة" value={content.brandName} onChange={(v) => update((p: any) => ({ ...p, brandName: v }))} />
        <Field label="الوصف تحت الاسم" value={content.brandSub} onChange={(v) => update((p: any) => ({ ...p, brandSub: v }))} />
        <div className="sm:col-span-2">
          <Field label="النص التعريفي (قسم البطل)" as="textarea" rows={4} value={content.tagline} onChange={(v) => update((p: any) => ({ ...p, tagline: v }))} />
        </div>
        <Field label="البريد الإلكتروني المعتمد" dir="ltr" value={content.email} onChange={(v) => update((p: any) => ({ ...p, email: v }))} />
        <Field label="رابط منصة نطاق (يُفتح عند النقر على شعار المنصة)" dir="ltr" type="url" value={content.nitaqUrl} onChange={(v) => update((p: any) => ({ ...p, nitaqUrl: v }))} />
      </div>
    </div>
  );
}

/* ============ SERVICES ============ */
function ServicesTab({ services, onUpdate }: { services: any[]; onUpdate: (s: any[]) => void }) {
  const [activeId, setActiveId] = useState(services[0]?.id);
  const active = services.find((s) => s.id === activeId) || services[0];

  const setField = (key: string, val: any) => {
    onUpdate(services.map((s) => (s.id === active.id ? { ...s, [key]: val } : s)));
  };

  const setPoint = (idx: number, key: "title" | "desc", val: string) => {
    const points = active.points.map((p: any, i: number) => (i === idx ? { ...p, [key]: val } : p));
    setField("points", points);
  };

  const setChip = (idx: number, val: string) => {
    const chips = active.chips.map((c: string, i: number) => (i === idx ? val : c));
    setField("chips", chips);
  };

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 font-head text-lg font-black text-ink-900">
        <Layers className="h-5 w-5 text-gold-600" /> تحرير الخدمات
      </h2>
      <div className="flex flex-wrap gap-2">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveId(s.id)}
            className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
              s.id === active.id ? "bg-ink-900 text-gold-400" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {s.num} — {s.title}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="العنوان (عربي)" value={active.title} onChange={(v) => setField("title", v)} />
        <Field label="العنوان (إنجليزي)" dir="ltr" value={active.en} onChange={(v) => setField("en", v)} />
        <div className="sm:col-span-2">
          <Field label="الشعار الوصفي (Tagline)" value={active.tagline} onChange={(v) => setField("tagline", v)} />
        </div>
        <Field label="مسار الصورة" dir="ltr" value={active.image} onChange={(v) => setField("image", v)} />
      </div>
      <div>
        <div className="mb-2 text-sm font-black text-ink-900">النقاط التفصيلية</div>
        <div className="space-y-3">
          {active.points.map((p: any, i: number) => (
            <div key={i} className="rounded-xl border border-slate-200 p-3">
              <Field label={`النقطة ${i + 1} — العنوان`} value={p.title} onChange={(v) => setPoint(i, "title", v)} />
              <div className="mt-2">
                <Field label="الوصف" as="textarea" rows={2} value={p.desc} onChange={(v) => setPoint(i, "desc", v)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-2 text-sm font-black text-ink-900">الوسوم (Chips)</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {active.chips.map((c: string, i: number) => (
            <Field key={i} label={`وسم ${i + 1}`} value={c} onChange={(v) => setChip(i, v)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ WORKS ============ */
function WorksTab({ works, onUpdate }: { works: any[]; onUpdate: (w: any[]) => void }) {
  const [activeId, setActiveId] = useState(works[0]?.id);
  const active = works.find((w) => w.id === activeId) || works[0];

  const setField = (key: string, val: any) => {
    onUpdate(works.map((w) => (w.id === active.id ? { ...w, [key]: val } : w)));
  };

  const remove = (id: number) => onUpdate(works.filter((w) => w.id !== id));

  return (
    <div className="space-y-6">
      <h2 className="flex items-center gap-2 font-head text-lg font-black text-ink-900">
        <Briefcase className="h-5 w-5 text-gold-600" /> تحرير أعمالنا
      </h2>
      <div className="flex flex-wrap gap-2">
        {works.map((w) => (
          <button
            key={w.id}
            onClick={() => setActiveId(w.id)}
            className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
              w.id === active.id ? "bg-ink-900 text-gold-400" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {w.title}
          </button>
        ))}
        <button
          onClick={() => {
            const id = Math.max(0, ...works.map((w) => w.id)) + 1;
            onUpdate([...works, { id, title: "عمل جديد", cat: "مستند مترجم", filter: "docs", image: "images/doc-translation.jpg", desc: "", meta: "" }]);
            setActiveId(id);
          }}
          className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-400"
        >
          <Plus className="h-3.5 w-3.5" /> إضافة عمل
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="العنوان" value={active.title} onChange={(v) => setField("title", v)} />
        <Field label="التصنيف" value={active.cat} onChange={(v) => setField("cat", v)} />
        <SelectField
          label="نوع الفلتر"
          value={active.filter}
          onChange={(v) => setField("filter", v)}
          options={[
            { value: "all", label: "الكل" },
            { value: "docs", label: "مستندات مترجمة" },
            { value: "cv", label: "سير ذاتية" },
            { value: "profile", label: "بروفايل شركات" },
            { value: "academic", label: "أكاديمي" },
          ]}
        />
        <Field label="مسار الصورة" dir="ltr" value={active.image} onChange={(v) => setField("image", v)} />
        <div className="sm:col-span-2">
          <Field label="الوصف" as="textarea" rows={2} value={active.desc} onChange={(v) => setField("desc", v)} />
        </div>
        <Field label="معلومات مختصرة (Meta)" value={active.meta} onChange={(v) => setField("meta", v)} />
      </div>
      <button onClick={() => remove(active.id)} className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50">
        <Trash2 className="h-4 w-4" /> حذف هذا العمل
      </button>
    </div>
  );
}

/* ============ TESTIMONIALS ============ */
function TestimonialsTab({ list, onUpdate }: { list: any[]; onUpdate: (t: any[]) => void }) {
  const setItem = (idx: number, key: string, val: any) => {
    onUpdate(list.map((t, i) => (i === idx ? { ...t, [key]: val } : t)));
  };
  const remove = (idx: number) => onUpdate(list.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-head text-lg font-black text-ink-900">
          <Star className="h-5 w-5 text-gold-600" /> آراء العملاء
        </h2>
        <button
          onClick={() => onUpdate([...list, { name: "عميل جديد", role: "الوظيفة", text: "", stars: 5 }])}
          className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-400"
        >
          <Plus className="h-3.5 w-3.5" /> إضافة رأي
        </button>
      </div>
      <div className="space-y-4">
        {list.map((t, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-400">رأي #{i + 1}</span>
              <button onClick={() => remove(i)} className="text-red-500 transition hover:text-red-600" aria-label="حذف">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="الاسم" value={t.name} onChange={(v) => setItem(i, "name", v)} />
              <Field label="المنصب" value={t.role} onChange={(v) => setItem(i, "role", v)} />
            </div>
            <div className="mt-3">
              <Field label="النص" as="textarea" rows={3} value={t.text} onChange={(v) => setItem(i, "text", v)} />
            </div>
            <div className="mt-3 max-w-[140px]">
              <NumberField label="التقييم (نجوم)" value={t.stars} min={1} max={5} onChange={(v) => setItem(i, "stars", v)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ FAQS ============ */
function FaqsTab({ list, onUpdate }: { list: any[]; onUpdate: (f: any[]) => void }) {
  const setItem = (idx: number, key: string, val: string) => {
    onUpdate(list.map((f, i) => (i === idx ? { ...f, [key]: val } : f)));
  };
  const remove = (idx: number) => onUpdate(list.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-head text-lg font-black text-ink-900">
          <HelpCircle className="h-5 w-5 text-gold-600" /> الأسئلة الشائعة
        </h2>
        <button
          onClick={() => onUpdate([...list, { q: "سؤال جديد", a: "" }])}
          className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-400"
        >
          <Plus className="h-3.5 w-3.5" /> إضافة سؤال
        </button>
      </div>
      <div className="space-y-4">
        {list.map((f, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-400">سؤال #{i + 1}</span>
              <button onClick={() => remove(i)} className="text-red-500 transition hover:text-red-600" aria-label="حذف">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3">
              <Field label="السؤال" value={f.q} onChange={(v) => setItem(i, "q", v)} />
            </div>
            <div className="mt-3">
              <Field label="الإجابة" as="textarea" rows={3} value={f.a} onChange={(v) => setItem(i, "a", v)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ PRICING ============ */
function PricingTab({
  quoteServices,
  urgency,
  onUpdate,
}: {
  quoteServices: any[];
  urgency: any[];
  onUpdate: (q: any[], u: any[]) => void;
}) {
  const [activeId, setActiveId] = useState(quoteServices[0]?.id);
  const active = quoteServices.find((q) => q.id === activeId) || quoteServices[0];

  const setServiceField = (key: string, val: any) => {
    onUpdate(quoteServices.map((q) => (q.id === active.id ? { ...q, [key]: val } : q)), urgency);
  };

  const setUrgency = (idx: number, key: string, val: any) => {
    onUpdate(quoteServices, urgency.map((u, i) => (i === idx ? { ...u, [key]: val } : u)));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="flex items-center gap-2 font-head text-lg font-black text-ink-900">
          <Calculator className="h-5 w-5 text-gold-600" /> إعدادات حاسبة عرض الأسعار
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          قم بتعديل الأسعار الأساسية لكل خدمة لتحديث حاسبة عرض السعر في الموقع فوراً.
        </p>
      </div>

      {/* services pricing */}
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          {quoteServices.map((q) => (
            <button
              key={q.id}
              onClick={() => setActiveId(q.id)}
              className={`rounded-lg px-3 py-2 text-xs font-bold transition ${
                q.id === active.id ? "bg-ink-900 text-gold-400" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="اسم الخدمة" value={active.label} onChange={(v) => setServiceField("label", v)} />
            <Field label="وحدة القياس" value={active.unit} onChange={(v) => setServiceField("unit", v)} />
            <NumberField label="الحد الأدنى للسعر (د.ع / وحدة)" value={active.baseMin} min={0} step={500} onChange={(v) => setServiceField("baseMin", v)} />
            <NumberField label="الحد الأعلى للسعر (د.ع / وحدة)" value={active.baseMax} min={0} step={500} onChange={(v) => setServiceField("baseMax", v)} />
            <NumberField label="الكمية الدنيا" value={active.min} min={1} onChange={(v) => setServiceField("min", v)} />
            <NumberField label="الكمية القصوى" value={active.max} min={1} onChange={(v) => setServiceField("max", v)} />
            <NumberField label="خطوة العداد" value={active.step} min={1} onChange={(v) => setServiceField("step", v)} />
            <Field label="مدة التسليم" value={active.delivery} onChange={(v) => setServiceField("delivery", v)} />
          </div>
        </div>
      </div>

      {/* urgency */}
      <div>
        <h3 className="mb-2 font-head text-base font-black text-ink-900">مستويات الأولوية (المضاعفات)</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {urgency.map((u, i) => (
            <div key={u.id} className="rounded-xl border border-slate-200 p-4">
              <Field label="الاسم" value={u.label} onChange={(v) => setUrgency(i, "label", v)} />
              <div className="mt-2">
                <Field label="الوصف" value={u.desc} onChange={(v) => setUrgency(i, "desc", v)} />
              </div>
              <div className="mt-2">
                <NumberField label="المضاعف" value={u.mult} min={1} max={5} step={0.1} onChange={(v) => setUrgency(i, "mult", v)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============ CONTACT ============ */
function ContactTab({ content, update }: { content: any; update: (u: (p: any) => any) => void }) {
  const setPhone = (idx: number, key: string, val: string) => {
    const phones = content.phones.map((p: any, i: number) => (i === idx ? { ...p, [key]: val } : p));
    update((prev: any) => ({ ...prev, phones }));
  };
  const setSocial = (idx: number, key: string, val: string) => {
    const socials = content.socials.map((s: any, i: number) => (i === idx ? { ...s, [key]: val } : s));
    update((prev: any) => ({ ...prev, socials }));
  };

  return (
    <div className="space-y-8">
      <h2 className="flex items-center gap-2 font-head text-lg font-black text-ink-900">
        <Phone className="h-5 w-5 text-gold-600" /> بيانات التواصل
      </h2>

      <div>
        <h3 className="mb-2 text-sm font-black text-ink-900">أرقام الهاتف والواتساب</h3>
        <div className="space-y-3">
          {content.phones.map((p: any, i: number) => (
            <div key={p.id} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
              <Field label={`رقم ${i + 1} — العرض`} dir="ltr" value={p.display} onChange={(v) => setPhone(i, "display", v)} />
              <Field label={`رقم ${i + 1} — للاتصال (بدون +)`} dir="ltr" value={p.raw} onChange={(v) => setPhone(i, "raw", v)} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-black text-ink-900">حسابات التواصل الاجتماعي</h3>
        <div className="space-y-3">
          {content.socials.map((s: any, i: number) => (
            <div key={s.id} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-3">
              <Field label="الاسم" value={s.label} onChange={(v) => setSocial(i, "label", v)} />
              <Field label="المعرف (Handle)" dir="ltr" value={s.handle} onChange={(v) => setSocial(i, "handle", v)} />
              <Field label="الرابط (URL)" dir="ltr" value={s.url} onChange={(v) => setSocial(i, "url", v)} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-800">
        البريد الإلكتروني المعتمد مُعدّ من تبويب «الإعدادات العامة».
        ملاحظة: عند تعديل رقم الهاتف، حدّث خانة العرض والصيغة الرقمية معاً ليظل زر الاتصال والواتساب يعملان بشكل صحيح.
      </div>
    </div>
  );
}
