import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/EnquiryForm";
import { FAQS } from "@/lib/faqs";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...pageHead(
      "Wholesale FAQ — MOQ, Pricing & Dispatch | Brassora Industries",
      "Answers on minimum order quantity, wholesale pricing, samples, customisation, dispatch and export enquiries for Brassora brass products.",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <PageIntro eyebrow="FAQ" title="Questions from trade buyers" />
      <section className="container-x max-w-4xl py-16">
        {FAQS.map((f) => (
          <div key={f.q} className="border-b border-border py-7">
            <h2 className="text-2xl">{f.q}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
          </div>
        ))}
        <p className="mt-10 text-muted-foreground">
          Still have a question? <Link to="/contact" className="font-semibold text-foreground underline underline-offset-4">Contact us</Link>.
        </p>
      </section>
    </>
  );
}
