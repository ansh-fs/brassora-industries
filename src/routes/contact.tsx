import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { EnquiryForm, PageIntro } from "@/components/site/EnquiryForm";
import { SocialLinks } from "@/components/site/Social";
import { ADDRESS_LINE, MAPS_URL, SITE, localBusinessJsonLd, pageHead, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageHead(
      "Contact Brassora Industries — Brass Supplier in Moradabad",
      "Call or WhatsApp Brassora Industries, Buddhi Vihar, Moradabad, Uttar Pradesh for brass pooja items wholesale enquiries.",
    ),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(localBusinessJsonLd()) }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Talk to Brassora Industries">
        <p>For prices, catalogues and bulk orders, WhatsApp is the fastest way to reach us.</p>
      </PageIntro>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-2">
          <address className="space-y-5 not-italic">
            <p className="font-serif text-2xl">Brassora Industries</p>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="flex gap-3 hover:text-gold"><MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />{ADDRESS_LINE}</a>
            <a href={`tel:${SITE.phoneE164}`} className="flex gap-3 hover:text-gold"><Phone className="h-5 w-5 text-gold" />{SITE.phoneDisplay}</a>
            <a href={waLink("Hello Brassora Industries, I have a wholesale enquiry.")} target="_blank" rel="noopener" className="flex gap-3 hover:text-gold"><MessageCircle className="h-5 w-5 text-gold" />WhatsApp {SITE.phoneDisplay}</a>
          </address>
          <div>
            <p className="eyebrow">Follow us</p>
            <SocialLinks className="mt-3" />
          </div>
          <iframe
            title="Brassora Industries location on Google Maps"
            src={`https://www.google.com/maps?q=${encodeURIComponent("Brassora Industries, " + ADDRESS_LINE)}&output=embed`}
            className="aspect-[4/3] w-full border border-border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="lg:col-span-3">
          <EnquiryForm
            title="Contact enquiry"
            heading="Send us a message"
            submitLabel="Send message"
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true },
              { name: "email", label: "Email", type: "email" },
              { name: "city", label: "City" },
              { name: "message", label: "Message", type: "textarea", required: true },
            ]}
          />
        </div>
      </section>
    </>
  );
}
