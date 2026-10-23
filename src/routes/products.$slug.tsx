import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { productBySlug, productsIn, categoryBySlug, shortName } from "@/lib/products";
import { AddToEnquiry, ProductCard, ProductPhoto } from "@/components/site/Product";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = productBySlug(params.slug);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData: p }) => {
    if (!p) return { meta: [{ title: "Product not found | Brassora Industries" }, { name: "robots", content: "noindex" }] };
    const title = `${shortName(p.name)} (${p.sku}) — Wholesale | Brassora Industries`;
    const desc = `${p.summary} MOQ ${p.moq}. Bulk supply from Moradabad, price on request.`.slice(0, 300);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            sku: p.sku,
            description: `${p.summary} ${p.description}`,
            material: p.material,
            weight: p.weight,
            category: p.subcategory,
            brand: { "@type": "Brand", name: "Brassora Industries" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="text-4xl">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block underline">Back to catalogue</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const cat = categoryBySlug(p.category);
  const related = productsIn(p.category).filter((x) => x.sku !== p.sku).slice(0, 4);
  const msg = `Hello Brassora Industries, I'd like a bulk quote for:\n${p.name}\nSKU: ${p.sku}\nQuantity: `;
  const specs = [
    ["SKU", p.sku],
    ["Category", p.subcategory],
    ["Dimensions", p.dimensions],
    ["Weight", p.weight],
    ["Material", p.material],
    ["Finish", p.finish],
    ["Minimum order", p.moq],
    ["Price", "On request"],
    ["Packing", "Confirm on enquiry"],
  ];
  return (
    <>
      <nav aria-label="Breadcrumb" className="container-x pt-8 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/products" className="hover:text-foreground">Products</Link> /{" "}
        <Link to="/products" search={{ category: p.category }} className="hover:text-foreground">{cat?.name}</Link>
      </nav>
      <section className="container-x grid gap-12 py-10 lg:grid-cols-2">
        <div>
          <ProductPhoto src={p.thumbs[active]} alt={`${shortName(p.name)} view ${active + 1}`} size="lg" className="aspect-square border border-border" />
          <div className="mt-3 flex flex-wrap gap-2">
            {p.thumbs.map((t, i) => (
              <button key={t} onClick={() => setActive(i)} aria-label={`View image ${i + 1}`} className={`border ${i === active ? "border-gold" : "border-border"}`}>
                <ProductPhoto src={t} alt="" size="sm" className="h-20 w-20" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">{cat?.name}</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{p.name}</h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground/85">{p.summary}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/enquiry" onClick={() => {}} className="hidden" />
            <a href={waLink(msg)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
              <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
            </a>
            <Link to="/wholesale" hash="rfq" search={{ product: `${p.name} (${p.sku})` }} className="inline-flex items-center rounded-sm border border-border px-6 py-3.5 text-sm font-semibold hover:border-gold">
              Request bulk quote
            </Link>
            <AddToEnquiry sku={p.sku} className="px-5 py-3.5 text-sm" />
          </div>
          <dl className="mt-10 divide-y divide-border border-y border-border">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-3 gap-4 py-3 text-sm">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="col-span-2">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      {related.length > 0 && (
        <section className="container-x border-t border-border py-16">
          <h2 className="text-3xl">More {cat?.name}</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((r) => <ProductCard key={r.sku} p={r} />)}
          </div>
        </section>
      )}
    </>
  );
}
