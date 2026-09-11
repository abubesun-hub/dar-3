import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  services as defaultServices,
  works as defaultWorks,
  testimonials as defaultTestimonials,
  faqs as defaultFaqs,
  quoteServices as defaultQuoteServices,
  urgencyLevels as defaultUrgency,
  PHONES as defaultPhones,
  SOCIALS as defaultSocials,
  EMAIL as defaultEmail,
  NITAQ_URL as defaultNitaqUrl,
  type Service,
  type Work,
  type QuoteService,
} from "./data";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export type Urgency = { id: string; label: string; desc: string; mult: number };
export type Phone = { id: string; display: string; raw: string };
export type Social = { id: string; label: string; handle: string; url: string };
export type Testimonial = { name: string; role: string; text: string; stars: number };
export type Faq = { q: string; a: string };

export type LoginResult = { ok: boolean; message?: string };

export type SiteContent = {
  brandName: string;
  brandSub: string;
  tagline: string;
  email: string;
  nitaqUrl: string;
  phones: Phone[];
  socials: Social[];
  services: Service[];
  works: Work[];
  testimonials: Testimonial[];
  faqs: Faq[];
  quoteServices: QuoteService[];
  urgency: Urgency[];
};

const DEFAULT_CONTENT: SiteContent = {
  brandName: "مؤسسة دار الترجمة",
  brandSub: "للترجمة والخدمات الأكاديمية • منذ 2016",
  tagline:
    "مؤسسة دار الترجمة ليست داراً للترجمة فحسب — بل مركز متكامل يخدم الباحثين والطلاب والشركات: من ترجمة العقود والمستندات المحلفة، إلى السير الذاتية المتوافقة مع ATS، وتنسيق رسائل الماجستير والدكتوراه بدقة أكاديمية صارمة.",
  email: defaultEmail,
  nitaqUrl: defaultNitaqUrl,
  phones: defaultPhones,
  socials: defaultSocials,
  services: defaultServices,
  works: defaultWorks,
  testimonials: defaultTestimonials,
  faqs: defaultFaqs,
  quoteServices: defaultQuoteServices,
  urgency: defaultUrgency as unknown as Urgency[],
};

const STORAGE_KEY = "dar_altarjama_content_v1";

// دمج المحتوى مع القيم الافتراضية لضمان عدم فقدان حقول جديدة
function mergeWithDefaults(parsed: Partial<SiteContent>): SiteContent {
  return {
    ...DEFAULT_CONTENT,
    ...parsed,
    phones: Array.isArray(parsed.phones) && parsed.phones.length ? parsed.phones : defaultPhones,
    socials: Array.isArray(parsed.socials) && parsed.socials.length ? parsed.socials : defaultSocials,
    services: Array.isArray(parsed.services) && parsed.services.length ? parsed.services : defaultServices,
    works: Array.isArray(parsed.works) && parsed.works.length ? parsed.works : defaultWorks,
    testimonials: Array.isArray(parsed.testimonials) && parsed.testimonials.length ? parsed.testimonials : defaultTestimonials,
    faqs: Array.isArray(parsed.faqs) && parsed.faqs.length ? parsed.faqs : defaultFaqs,
    quoteServices: Array.isArray(parsed.quoteServices) && parsed.quoteServices.length ? parsed.quoteServices : defaultQuoteServices,
    urgency: Array.isArray(parsed.urgency) && parsed.urgency.length ? parsed.urgency : (defaultUrgency as unknown as Urgency[]),
  };
}

function loadCachedContent(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONTENT;
    const parsed = JSON.parse(raw);
    // دمج مع default لضمان عدم فقدان حقول جديدة
    return mergeWithDefaults(parsed);
  } catch {
    return DEFAULT_CONTENT;
  }
}

type Ctx = {
  content: SiteContent;
  setContent: (updater: (prev: SiteContent) => SiteContent) => void;
  saveContent: (c: SiteContent) => void;
  resetContent: () => void;
  isAdmin: boolean | null;
  login: (email: string, pass: string) => Promise<LoginResult>;
  logout: () => void;
};

const AppContext = createContext<Ctx | null>(null);

// ترجمة أخطاء تسجيل الدخول الشائعة من Firebase
function authErrorMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "لا يوجد حساب بهذا البريد في Firebase — أنشئه من Authentication ← Users ← Add user";
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "كلمة المرور غير صحيحة — أعد ضبطها من Firebase (⋮ ← Reset password)";
    case "auth/operation-not-allowed":
      return "تسجيل الدخول بالبريد غير مفعّل — فعّله من Authentication ← Providers ← Email/Password";
    case "auth/invalid-email":
      return "صيغة البريد الإلكتروني غير صحيحة";
    case "auth/too-many-requests":
      return "محاولات كثيرة — انتظر دقيقة ثم أعد المحاولة";
    case "auth/user-disabled":
      return "هذا الحساب معطّل من إعدادات Firebase";
    default:
      return `تعذر تسجيل الدخول (${code || "خطأ غير معروف"})`;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(() => loadCachedContent());
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const saveTimer = useRef<number | null>(null);

  const persistLocal = (c: SiteContent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    } catch {
      /* ignore quota errors */
    }
  };

  const persist = persistLocal;

  // حفظ المحتوى في قاعدة البيانات (Firestore)
  const pushToDb = (c: SiteContent) => {
    if (!db) return;
    setDoc(doc(db, "site_content", "main"), { data: c, updated_at: serverTimestamp() }).catch((e: unknown) => {
      console.error("فشل حفظ المحتوى في Firebase:", e instanceof Error ? e.message : e);
    });
  };

  // متابعة حالة تسجيل الدخول عبر Firebase Auth
  useEffect(() => {
    if (!auth) {
      setIsAdmin(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsub();
  }, []);

  // جلب المحتوى من قاعدة البيانات عند الإقلاع
  useEffect(() => {
    if (!db) return;
    let alive = true;
    getDoc(doc(db, "site_content", "main"))
      .then((snap) => {
        if (!alive || !snap.exists()) return;
        const remote = (snap.data() ?? {}) as { data?: Partial<SiteContent> };
        const merged = mergeWithDefaults(remote.data ?? {});
        setContentState(merged);
        persistLocal(merged);
      })
      .catch(() => {
        /* تجاهل أخطاء الشبكة */
      });
    return () => {
      alive = false;
    };
  }, []);

  const setContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContentState((prev) => {
      const next = updater(prev);
      persist(next);
      // حفظ تلقائي مؤجل إلى قاعدة البيانات (بعد توقف الكتابة بـ 1.5 ثانية)
      if (saveTimer.current !== null) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => pushToDb(next), 1500);
      return next;
    });
  };

  const saveContent = (c: SiteContent) => {
    setContentState(c);
    persist(c);
    if (saveTimer.current !== null) {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    pushToDb(c);
  };

  const resetContent = () => {
    setContentState(DEFAULT_CONTENT);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    if (saveTimer.current !== null) {
      window.clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    pushToDb(DEFAULT_CONTENT);
  };

  const login = async (email: string, pass: string): Promise<LoginResult> => {
    if (!auth) return { ok: false, message: "لم يتم إعداد Firebase بعد — تحقق من ملف .env" };
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return { ok: true };
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      return { ok: false, message: authErrorMessage(code) };
    }
  };

  const logout = () => {
    if (auth) void signOut(auth);
    setIsAdmin(false);
  };

  const value = useMemo(
    () => ({ content, setContent, saveContent, resetContent, isAdmin, login, logout }),
    [content, isAdmin]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export { DEFAULT_CONTENT };
