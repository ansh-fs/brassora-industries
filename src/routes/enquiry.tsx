import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useBasket } from "@/lib/basket";
import { PRODUCTS, shortName } from "@/lib/products";
import { ProductPhoto } from "@/components/site/Product";
import { PageIntro } from "@/components/site/EnquiryForm";
import { waLink } from "@/lib/site";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Your Enquiry List | Brassora Industries" },
      { name: "description", content: "Send one quote request for multiple Brassora brass products." },
      { property: "og:title", content: "Your Enquiry List | Brassora Industries" },
      { property: "og:description", content: "Send one quote request for multiple Brassora brass products." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Enquiry,
});

function Enquiry() {
  const { items, remove, clear } = useBasket();
  const [qty, setQty] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const list = items.map((s) => PRODUCTS.find((p) => p.sku === s)).filter((p) => !!p);

  const send = () => {
    const lines = [
      "*Bulk quote request* — via brassora website",
      name ? `Name: ${name}` : "",
      city ? `City: ${city}` : "",
      ...list.map((p, i) => `${i + 1}. ${shortName(p.name)} (${p.sku}) — Qty: ${qty[p.sku] || p.moq}`),
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  };

  return (
    <>
      <PageIntro eyebrow="Enquiry list" title="One request, many products." />
      <section className="container-x py-12">
        {list.length === 0 ? (
          <div className="border border-dashed border-border p-12 text-center">
            <p className="font-serif text-2xl">Your enquiry list is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Use "Add to enquiry" on any product to build your list.</p>
            <Link to="/products" className="mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm text-primary-foreground">Browse catalogue</Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-3">
            <ul className="divide-y divide-border border-y border-border lg:col-span-2">
              {list.map((p) => (
                <li key={p.sku} className="flex items-center gap-4 py-4">
                  <ProductPhoto src={p.thumbs[0] ?? ""} alt="" size="sm" className="h-20 w-20 shrink-0 border border-border" />
                  <div className="min-w-0 flex-1">
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="font-serif text-lg hover:text-gold">{shortName(p.name)}</Link>
                    <p className="text-xs text-muted-foreground">{p.sku} · MOQ {p.moq}</p>
                  </div>
                  <label className="text-xs">
                    <span className="sr-only">Quantity for {p.sku}</span>
                    <input value={qty[p.sku] ?? ""} onChange={(e) => setQty({ ...qty, [p.sku]: e.target.value })} placeholder={p.moq} className="w-24 rounded-sm border border-input bg-card px-2 py-2 text-sm" />
                  </label>
                  <button onClick={() => remove(p.sku)} aria-label={`Remove ${p.sku}`} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </li>
              ))}
            </ul>
            <div className="h-fit border border-border bg-card p-6">
              <p className="font-serif text-2xl">Send your list</p>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name / business" className="mt-4 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="mt-3 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm" />
              <button onClick={send} className="mt-5 w-full rounded-sm bg-primary py-3.5 text-sm font-semibold text-primary-foreground">Send on WhatsApp ({list.length})</button>
              <button onClick={clear} className="mt-3 w-full text-xs text-muted-foreground underline">Clear list</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
