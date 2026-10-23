import { Link } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { type Product, categoryBySlug, shortName } from "@/lib/products";
import { useBasket } from "@/lib/basket";
import { cn } from "@/lib/utils";

export function ProductPhoto({ src, alt, size = "md", className }: { src: string; alt: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const h = size === "lg" ? "h-44" : size === "sm" ? "h-16" : "h-28";
  return (
    <div className={cn("flex items-center justify-center bg-card", className)}>
      <img src={src} alt={alt} loading="lazy" className={cn("w-auto object-contain mix-blend-multiply", h)} />
    </div>
  );
}

export function AddToEnquiry({ sku, className }: { sku: string; className?: string }) {
  const { has, toggle } = useBasket();
  const on = has(sku);
  return (
    <button
      type="button"
      onClick={() => toggle(sku)}
      aria-pressed={on}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-sm border px-3 py-2 text-xs font-semibold transition-colors",
        on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-gold",
        className,
      )}
    >
      {on ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      {on ? "In enquiry list" : "Add to enquiry"}
    </button>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const cat = categoryBySlug(p.category);
  return (
    <article className="group flex flex-col border border-border bg-card transition-shadow hover:shadow-[0_18px_40px_-24px_var(--color-gold)]">
      <Link to="/products/$slug" params={{ slug: p.slug }} className="block">
        <ProductPhoto src={p.thumbs[0] ?? ""} alt={`${shortName(p.name)} — ${cat?.name}, Brassora Industries Moradabad`} className="aspect-[4/3] border-b border-border" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{cat?.name}</span>
          <span>{p.sku}</span>
        </div>
        <h3 className="mt-2 text-lg leading-snug">
          <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-gold">{shortName(p.name)}</Link>
        </h3>
        <dl className="mt-3 grid grid-cols-2 gap-x-3 text-xs text-muted-foreground">
          <dt className="sr-only">Weight</dt><dd>{p.weight}</dd>
          <dt className="sr-only">MOQ</dt><dd className="text-right">MOQ {p.moq}</dd>
        </dl>
        <p className="mt-1 text-xs font-medium text-foreground/80">Price on request</p>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Link to="/products/$slug" params={{ slug: p.slug }} className="inline-flex items-center justify-center rounded-sm bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
            View details
          </Link>
          <AddToEnquiry sku={p.sku} />
        </div>
      </div>
    </article>
  );
}
