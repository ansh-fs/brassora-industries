import { useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "textarea" | "checkbox" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  full?: boolean;
  defaultValue?: string | undefined;
};

const inputCls =
  "w-full rounded-sm border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none";

export function EnquiryForm({
  title,
  fields,
  submitLabel,
  heading,
}: {
  title: string;
  fields: Field[];
  submitLabel: string;
  heading?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return; // honeypot
    const errs: Record<string, string> = {};
    const lines: string[] = [`*${title}* — via brassora website`];
    for (const f of fields) {
      const raw = f.type === "checkbox" ? (fd.get(f.name) ? "Yes" : "") : String(fd.get(f.name) ?? "").trim();
      if (f.required && !raw) errs[f.name] = `${f.label} is required`;
      else if (raw.length > 1000) errs[f.name] = "Too long";
      else if (raw && f.type === "email" && !z.string().email().safeParse(raw).success) errs[f.name] = "Enter a valid email";
      else if (raw && f.type === "tel" && !/^[+\d\s()-]{7,20}$/.test(raw)) errs[f.name] = "Enter a valid phone number";
      if (raw) lines.push(`${f.label}: ${raw}`);
    }
    if (!fd.get("consent")) errs["consent"] = "Please agree so we can reply to you";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  }

  if (sent)
    return (
      <div className="border border-border bg-card p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-gold" />
        <p className="mt-4 font-serif text-2xl">Your enquiry is ready in WhatsApp</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Press send in WhatsApp to deliver it to our team. If WhatsApp did not open, please allow pop-ups and try again.
        </p>
        <button onClick={() => setSent(false)} className="mt-6 text-sm underline underline-offset-4">Send another enquiry</button>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="border border-border bg-card p-6 md:p-8">
      {heading && <p className="mb-6 font-serif text-2xl">{heading}</p>}
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={cn(f.full || f.type === "textarea" || f.type === "checkbox" ? "md:col-span-2" : "")}>
            {f.type === "checkbox" ? (
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" name={f.name} className="mt-1 h-4 w-4 accent-[var(--color-primary)]" />
                {f.label}
              </label>
            ) : (
              <>
                <label htmlFor={f.name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/75">
                  {f.label} {f.required && <span className="text-gold">*</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea id={f.name} name={f.name} rows={4} placeholder={f.placeholder} defaultValue={f.defaultValue} className={inputCls} aria-invalid={!!errors[f.name]} />
                ) : f.type === "select" ? (
                  <select id={f.name} name={f.name} className={inputCls} defaultValue={f.defaultValue ?? ""}>
                    <option value="">Select…</option>
                    {f.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input id={f.name} name={f.name} type={f.type ?? "text"} placeholder={f.placeholder} defaultValue={f.defaultValue} className={inputCls} aria-invalid={!!errors[f.name]} />
                )}
              </>
            )}
            {errors[f.name] && <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>}
          </div>
        ))}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-xs text-muted-foreground">
            <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4" />
            I agree that Brassora Industries may use these details only to reply to this enquiry.
          </label>
          {errors["consent"] && <p className="mt-1 text-xs text-destructive">{errors["consent"]}</p>}
        </div>
      </div>
      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 md:w-auto">
        {submitLabel}
      </button>
      <p className="mt-3 text-xs text-muted-foreground">Your enquiry opens in WhatsApp, pre-filled, so it reaches our team directly.</p>
    </form>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="border-b border-border">
      <div className="container-x py-16 md:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}
