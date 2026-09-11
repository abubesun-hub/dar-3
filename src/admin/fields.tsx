import { ChevronDown } from "lucide-react";

export function Field({
  label,
  value,
  onChange,
  as = "input",
  rows = 3,
  dir,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  as?: "input" | "textarea";
  rows?: number;
  dir?: "rtl" | "ltr";
  type?: string;
}) {
  const base =
    "w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm text-ink-900 outline-none transition placeholder:text-slate-400 focus:border-gold-500";
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-bold text-slate-600">{label}</span>
      {as === "textarea" ? (
        <textarea value={value} rows={rows} dir={dir} onChange={(e) => onChange(e.target.value)} className={`${base} resize-y leading-6`} />
      ) : (
        <input type={type} value={value} dir={dir} onChange={(e) => onChange(e.target.value)} className={base} />
      )}
    </label>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-bold text-slate-600">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm text-ink-900 outline-none transition focus:border-gold-500"
        dir="ltr"
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-bold text-slate-600">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-gold-500"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </label>
  );
}
