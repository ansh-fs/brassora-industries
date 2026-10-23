import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { EnquiryForm, PageIntro } from "@/components/site/EnquiryForm";
import { CATEGORIES } from "@/lib/products";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/wholesale")({
  validateSearch: z.object({ product: z.string().max(200).optional().catch(undefined) }),
  head: () =>
    pageHead(
      "Brass Wholesale Supplier for Distributors & Retailers | Brassora Industries",
      "Bulk brass pooja items from Moradabad for distributors, retailers and corporate buyers. Request a wholesale quote — South India distributor enquiries welcome.",
    ),
  component: Wholesale,
});

function Wholesale() {
  const { product } = Route.useSearch();
  return (
    <>
      <PageIntro eyebrow="Wholesale & distribution" title="Brass pooja items, supplied in bulk.">
        <p>We work with distributors, retailers, gift buyers and corporate procurement teams who need reliable brass pooja ware from Moradabad.</p>
      </PageIntro>
      <section className="container-x grid gap-6 py-16 md:grid-cols-3">
        {[
          ["Distributors", "Regular supply for regional distribution — with priority for South Indian markets."],
          ["Retailers & pooja stores", "Mixed assortments of diyas, stands, plates and thali sets for your counter."],
          ["Corporate & gifting", "Festive gifting in bulk, with custom packing discussed on enquiry."],
        ].map(([t, d]) => (
          <div key={t} className="border border-border bg-card p-8">
            <h2 className="text-2xl">{t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="border-y border-border bg-secondary">
        <div className="container-x grid gap-8 py-16 md:grid-cols-4">
          {[
            ["Share your list", "Products, quantities and delivery city."],
            ["Get a quotation", "Prices, MOQ and dispatch timeline."],
            ["Confirm", "Agree quantities and payment terms."],
            ["Dispatch", "Packed and sent from Moradabad."],
          ].map(([t, d], i) => (
            <div key={t}>
              <p className="font-serif text-5xl text-gold">0{i + 1}</p>
              <p className="mt-2 font-semibold">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="rfq" className="container-x grid scroll-mt-28 gap-12 py-20 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow">Request for quotation</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Become a wholesale buyer</h2>
          <p className="mt-4 text-muted-foreground">Tell us what you need. We reply with a quotation — usually on WhatsApp — so you can decide quickly.</p>
        </div>
        <div className="lg:col-span-3">
          <EnquiryForm
            title="Wholesale RFQ"
            submitLabel="Send quote request"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "company", label: "Business / shop name" },
              { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
              { name: "email", label: "Email", type: "email" },
              { name: "location", label: "City & state", required: true },
              { name: "interest", label: "Product category", type: "select", options: [...CATEGORIES.map((c) => c.name), "Custom / bulk requirement"] },
              { name: "product", label: "Products of interest", full: true, defaultValue: product, placeholder: "e.g. Kamal deep BI-DYA-004, 7-piece thali set" },
              { name: "quantity", label: "Estimated quantity", required: true, placeholder: "e.g. 200 pcs" },
              { name: "notes", label: "Notes", type: "textarea", placeholder: "Finish, packing, delivery timeline…" },
              { name: "south", label: "I'm enquiring as a distributor in South India", type: "checkbox" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
