import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { CATEGORIES, PRODUCTS, categoryBySlug, moqNumber } from "@/lib/products";
import { ProductCard } from "@/components/site/Product";
import { PageIntro } from "@/components/site/EnquiryForm";
import { pageHead } from "@/lib/site";

const search = z.object({
  category: z.string().optional().catch(undefined),
  q: z.string().optional().catch(undefined),
  sort: z.enum(["default", "name", "moq", "weight"]).optional().catch(undefined),
});

export const Route = createFileRoute("/products/")({
  validateSearch: search,
  head: () =>
    pageHead(
      "Brass Pooja Items Catalogue — Wholesale | Brassora Industries",
      "Browse brass diyas, kuthu vilakku, agarbatti stands, pooja plates, bells and thali sets. Specifications and MOQ listed. Bulk prices on request.",
    ),
  component: Catalogue,
});

function Catalogue() {
  const { category, q = "", sort = "default" } = Route.useSearch();
  const navigate = useNavigate({ from: "/products/" });
  const cat = category ? categoryBySlug(category) : undefined;

  const list = useMemo(() => {
    const term = q.toLowerCase();
    const r = PRODUCTS.filter(
      (p) =>
        (!cat || p.category === cat.slug) &&
        (!term || `${p.name} ${p.sku} ${p.subcategory} ${p.finish}`.toLowerCase().includes(term)),
    );
    if (sort === "name") r.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "moq") r.sort((a, b) => moqNumber(a.moq) - moqNumber(b.moq));
    if (sort === "weight") r.sort((a, b) => parseInt(b.weight) - parseInt(a.weight));
    return r;
  }, [cat, q, sort]);

  return (
    <>
      <PageIntro eyebrow="Wholesale catalogue" title={cat ? `Brass ${cat.name}` : "Brass pooja items catalogue"}>
        <p>{cat ? cat.short : "Solid brass pooja essentials from Moradabad, with full specifications and minimum order quantities. Prices are shared on request."}</p>
      </PageIntro>
      <section className="container-x py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
            <Link to="/products" search={{ q, sort }} className={`rounded-full border px-4 py-2 text-xs font-semibold ${!cat ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-gold"}`}>
              All ({PRODUCTS.length})
            </Link>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} to="/products" search={{ category: c.slug, q, sort }} className={`rounded-full border px-4 py-2 text-xs font-semibold ${cat?.slug === c.slug ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-gold"}`}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <label className="relative flex-1">
              <span className="sr-only">Search products</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                defaultValue={q}
                onChange={(e) => navigate({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })}
                placeholder="Search name or SKU"
                className="w-full rounded-sm border border-input bg-card py-2.5 pl-9 pr-3 text-sm focus:border-gold focus:outline-none lg:w-60"
              />
            </label>
            <label>
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => navigate({ search: (s) => ({ ...s, sort: e.target.value as "default" }), replace: true })} className="rounded-sm border border-input bg-card px-3 py-2.5 text-sm">
                <option value="default">Sort: Catalogue</option>
                <option value="name">Name A–Z</option>
                <option value="moq">Lowest MOQ</option>
                <option value="weight">Heaviest</option>
              </select>
            </label>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{list.length} products</p>
        {list.length ? (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => <ProductCard key={p.sku} p={p} />)}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-border p-12 text-center">
            <p className="font-serif text-2xl">No products match your search</p>
            <p className="mt-2 text-sm text-muted-foreground">Looking for something specific? Tell us your requirement.</p>
            <Link to="/wholesale" hash="rfq" className="mt-5 inline-block rounded-sm bg-primary px-5 py-2.5 text-sm text-primary-foreground">Send a custom requirement</Link>
          </div>
        )}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border border-border bg-secondary p-8 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-2xl">Custom or bulk requirement?</p>
            <p className="text-sm text-muted-foreground">Different size, finish or packing — tell us what you need.</p>
          </div>
          <Link to="/wholesale" hash="rfq" className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Request a quote</Link>
        </div>
      </section>
    </>
  );
}
