import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { CATEGORIES, PRODUCTS, productsIn } from "@/lib/products";
import { ProductCard } from "@/components/site/Product";
import { SocialLinks } from "@/components/site/Social";
import { FAQS } from "@/lib/faqs";
import { SITE, localBusinessJsonLd, pageHead } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "Brassora Industries | Brass Pooja Items Wholesale Supplier, Moradabad",
      "Wholesale supplier of brass diyas, agarbatti stands, pooja thali sets and brass handicrafts from Moradabad. Bulk quotes for distributors and retailers across India.",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd()) }],
  }),
  component: Home,
});

const FEATURED = ["BI-THL-001", "BI-SMY-001", "BI-DYA-004", "BI-AGD-002", "BI-DYA-005", "BI-PLT-003", "BI-BEL-001", "BI-KUM-001"];

function Home() {
  const featured = FEATURED.map((s) => PRODUCTS.find((p) => p.sku === s)!).filter(Boolean);
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <img src={hero} alt="Brass diyas, pooja thali and incense holder on green linen" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover object-right opacity-90" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="container-x py-24 md:py-36">
          <p className="eyebrow !text-gold-soft">Moradabad, India · Wholesale enquiries welcome</p>
          <h1 className="mt-6 max-w-2xl text-5xl leading-[1.02] md:text-[5.5rem]">
            Crafted in Brass.<br /><em className="font-normal text-gold-soft">Rooted in Heritage.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-foreground/80">
            Brass pooja essentials, diyas, agarbatti stands and thali sets from Moradabad — supplied in bulk to distributors, retailers and corporate buyers.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground hover:bg-gold-soft">
              Explore collection <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/wholesale" hash="rfq" className="inline-flex items-center rounded-sm border border-primary-foreground/40 px-6 py-3.5 text-sm font-semibold hover:bg-primary-foreground/10">
              Request wholesale quote
            </Link>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section className="border-b border-border bg-card">
        <div className="container-x grid grid-cols-2 divide-x divide-border text-center md:grid-cols-4">
          {[
            [String(PRODUCTS.length), "Catalogue designs"],
            ["Solid brass", "Material"],
            ["From 15 pcs", "Minimum order"],
            ["Pan-India", "Dispatch from Moradabad"],
          ].map(([a, b]) => (
            <div key={b} className="px-4 py-7">
              <p className="font-serif text-3xl">{a}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Product range</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Brass pooja items, by category</h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">View full catalogue <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {CATEGORIES.slice(0, 5).map((c, i) => (
            <Link
              key={c.slug}
              to="/products"
              search={{ category: c.slug }}
              className={`group relative block overflow-hidden bg-muted ${i === 0 ? "md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto" : "aspect-[4/5]"}`}
            >
              <img src={c.image} alt={`${c.name} — brass wholesale`} loading="lazy" width={1024} height={1280} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-5 text-primary-foreground">
                <p className="font-serif text-2xl md:text-3xl">{c.name}</p>
                <p className="mt-1 text-xs text-primary-foreground/80">{productsIn(c.slug).length} designs</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-x grid gap-12 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow !text-gold-soft">About Brassora</p>
            <h2 className="mt-3 text-4xl leading-tight md:text-5xl">From India's Brass City, to your shelves.</h2>
          </div>
          <div className="space-y-5 text-primary-foreground/80 leading-relaxed">
            <p>Moradabad has worked brass for generations — its lamps, bells and pooja ware are found in homes and temples across India. Brassora Industries supplies that craft to the trade.</p>
            <p>We focus on dependable everyday pooja essentials: well-finished pieces with consistent sizes and weights, listed with clear specifications so you know exactly what you are ordering.</p>
            <Link to="/about" className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-gold-soft hover:text-primary-foreground">Read our story <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-x py-20 md:py-28">
        <p className="eyebrow">Featured catalogue</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Popular with retailers</h2>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.sku} p={p} />)}
        </div>
      </section>

      {/* Why / process */}
      <section className="border-y border-border bg-card">
        <div className="container-x grid gap-16 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="eyebrow">Wholesale supply</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Built for distributors and retailers</h2>
            <ul className="mt-8 space-y-5">
              {[
                ["Clear specifications", "Every product lists dimensions, weight, finish and MOQ."],
                ["Mixed-product orders", "Combine diyas, stands, plates and sets in one order."],
                ["Festive season planning", "Enquire early for Diwali, Navratri and wedding-season stock."],
                ["Custom requirements", "Discuss finishes, sizes and packing for bulk quantities."],
              ].map(([t, d]) => (
                <li key={t} className="border-l-2 border-gold pl-4">
                  <p className="font-semibold">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">How bulk orders work</p>
            <ol className="mt-8 space-y-0">
              {[
                ["Explore", "Browse the catalogue and add products to your enquiry list."],
                ["Enquire", "Send your list with quantities on WhatsApp or the quote form."],
                ["Receive quote", "We reply with prices, availability and dispatch timeline."],
                ["Confirm order", "Confirm quantities and payment; we pack and dispatch from Moradabad."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5 border-b border-border py-5 last:border-0">
                  <span className="font-serif text-4xl text-gold">0{i + 1}</span>
                  <div>
                    <p className="font-serif text-2xl">{t}</p>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* South India + Export */}
      <section className="container-x grid gap-6 py-20 md:grid-cols-2 md:py-28">
        <div className="border border-border p-8 md:p-12">
          <p className="eyebrow">South India supply</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Kuthu vilakku, samayi & pooja ware for South Indian markets</h2>
          <p className="mt-4 text-muted-foreground">We welcome distributors and retailers in Tamil Nadu, Kerala, Karnataka, Andhra Pradesh and Telangana looking for a steady Moradabad brass source.</p>
          <Link to="/wholesale" hash="rfq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">Distributor enquiry <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="border border-border bg-secondary p-8 md:p-12">
          <p className="eyebrow">International buyers</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Open to export enquiries</h2>
          <p className="mt-4 text-muted-foreground">Importers and overseas retailers can share their product interest, destination and volumes. We'll tell you honestly what we can supply.</p>
          <Link to="/export" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">Export enquiry <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-card">
        <div className="container-x grid gap-12 py-20 md:grid-cols-3 md:py-28">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-3 text-4xl">Buyer questions</h2>
            <Link to="/faq" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:text-gold">All questions <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="md:col-span-2">
            {FAQS.slice(0, 4).map((f) => (
              <details key={f.q} className="group border-b border-border py-5">
                <summary className="cursor-pointer list-none font-serif text-xl marker:hidden">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-x flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-4xl md:text-5xl">Ready to stock Brassora brass?</h2>
            <p className="mt-3 text-primary-foreground/75">Call {SITE.phoneDisplay} or request a quote — we reply on WhatsApp.</p>
            <SocialLinks tone="light" className="mt-6" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/wholesale" hash="rfq" className="rounded-sm bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground hover:bg-gold-soft">Become a wholesale buyer</Link>
            <a href={SITE.whatsappCatalogue} target="_blank" rel="noopener" className="rounded-sm border border-primary-foreground/40 px-6 py-3.5 text-sm font-semibold hover:bg-primary-foreground/10">WhatsApp catalogue</a>
          </div>
        </div>
      </section>
    </>
  );
}
