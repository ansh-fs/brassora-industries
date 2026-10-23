import { createFileRoute } from "@tanstack/react-router";
import { EnquiryForm, PageIntro } from "@/components/site/EnquiryForm";
import { CATEGORIES } from "@/lib/products";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/export")({
  head: () =>
    pageHead(
      "Export Enquiries — Brass Pooja Items from India | Brassora Industries",
      "Overseas importers and retailers: send an enquiry for brass diyas, pooja thalis and handicrafts from Moradabad, India.",
    ),
  component: Export,
});

function Export() {
  return (
    <>
      <PageIntro eyebrow="International buyers" title="Brass from Moradabad, for buyers abroad.">
        <p>We are building relationships with importers, temple suppliers and retailers outside India. If you source brass pooja ware or décor, we'd like to hear what you need.</p>
      </PageIntro>
      <section className="container-x grid gap-12 py-20 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <h2 className="text-3xl">What to include</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>— Products or categories you're interested in</li>
              <li>— Destination country and port / city</li>
              <li>— Estimated quantity per design</li>
              <li>— Packing or labelling requirements</li>
            </ul>
          </div>
          <p className="border-l-2 border-gold pl-4 text-sm text-muted-foreground">We'll review your enquiry and reply honestly about what we can supply, timelines and the documentation involved.</p>
        </div>
        <div className="lg:col-span-3">
          <EnquiryForm
            title="Export enquiry"
            submitLabel="Send export enquiry"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "company", label: "Company", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone / WhatsApp", type: "tel" },
              { name: "country", label: "Destination country", required: true },
              { name: "interest", label: "Product category", type: "select", options: CATEGORIES.map((c) => c.name) },
              { name: "quantity", label: "Estimated quantity", full: true },
              { name: "packing", label: "Packing requirements", type: "textarea" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
