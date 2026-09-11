import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BadgeCheck, FileText, Phone } from "lucide-react";
import { FacebookIcon, WhatsAppIcon } from "./icons";
import { useApp } from "../store";

const waLink = (phoneRaw: string) =>
  `https://wa.me/${phoneRaw}?text=${encodeURIComponent("مرحباً، أرغب بالاستفسار عن خدمات مؤسسة دار الترجمة.")}`;

const links = [
  { href: "#services", label: "خدماتنا" },
  { href: "#works", label: "أعمالنا" },
  { href: "#cv-lab", label: "مختبر السيرة" },
  { href: "#quote", label: "عرض سعر" },
  { href: "#faq", label: "الأسئلة الشائعة" },
  { href: "#contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const { content } = useApp();
  const phones = content.phones;
  const fbUrl = content.socials.find((s) => s.id === "facebook")?.url || "#";
  const fbHandle = content.socials.find((s) => s.id === "facebook")?.handle || "@transh2016";
  const brandName = content.brandName;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Nitaq ribbon */}
      <div className="bg-ink-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-1.5 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-gold-400" />
            <span className="font-medium">
              عضو معتمد في <span className="font-bold text-gold-400">منصة نطاق ونقابة المترجمين العراقين </span> — جودة موثقة وضمان لحقوق العملاء
            </span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            {phones.map((p) => (
              <a key={p.id} href={`tel:${p.raw}`} className="flex items-center gap-1.5 text-white/80 transition hover:text-gold-400" dir="ltr">
                <Phone className="h-3 w-3" />
                <span className="font-semibold tracking-wide">{p.display}</span>
              </a>
            ))}
            <a href={fbUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-white/80 transition hover:text-gold-400">
              <FacebookIcon className="h-3.5 w-3.5" /> {fbHandle}
            </a>
          </div>
        </div>
      </div>

      {/* main nav */}
      <div className={`transition-all duration-300 ${scrolled ? "bg-ink-900/95 shadow-xl shadow-black/20 backdrop-blur-md" : "bg-ink-900"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* logo */}
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-500 shadow-lg shadow-gold-500/30">
              <span className="font-head text-base font-black text-ink-950">دار</span>
            </div>
            <div className="leading-tight">
              <div className="font-head text-lg font-extrabold text-white">
                {brandName}
              </div>
              <div className="text-[11px] font-medium text-white/60">{content.brandSub}</div>
            </div>
          </a>

          {/* desktop links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-gold-400"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={waLink(phones[0].raw)}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 transition hover:border-emerald-400 hover:text-emerald-400"
              aria-label="واتساب"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={fbUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/80 transition hover:border-gold-400 hover:text-gold-400"
              aria-label="فيسبوك"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href="#quote"
              className="flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-2.5 text-sm font-bold text-ink-950 shadow-lg shadow-gold-500/25 transition hover:bg-gold-400"
            >
              <FileText className="h-4 w-4" />
              اطلب عرض سعر
            </a>
          </div>

          {/* mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white lg:hidden"
            aria-label="القائمة"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 bg-ink-950/98 backdrop-blur-md lg:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-gold-400"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="#quote"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 py-3 text-sm font-bold text-ink-950"
                  >
                    <FileText className="h-4 w-4" /> اطلب عرض سعر
                  </a>
                  <a
                    href={waLink(phones[0].raw)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> واتساب
                  </a>
                  <a
                    href={fbUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white"
                  >
                    <FacebookIcon className="h-4 w-4" /> {fbHandle}
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
