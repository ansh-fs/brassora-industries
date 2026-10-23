import { createFileRoute, Link } from "@tanstack/react-router";
import diyas from "@/assets/cat-diyas.jpg";
import { PageIntro } from "@/components/site/EnquiryForm";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About Brassora Industries — Brass Handicrafts from Moradabad",
      "Brassora Industries supplies brass pooja items and handicrafts from Moradabad, India's Brass City, to distributors and retailers.",
    ),
  component: About,
});

function About() {
  return (
    <>
      <PageIntro eyebrow="About us" title="Moradabad brass, supplied with care.">
        <p>Brassora Industries is a Moradabad-based supplier of brass pooja items and traditional brassware for the trade.</p>
      </PageIntro>
      <section className="container-x grid items-center gap-12 py-20 md:grid-cols-2">
        <img src={diyas} alt="Brass kuthu vilakku and diyas" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
        <div className="space-y-5 leading-relaxed text-muted-foreground">
          <p className="eyebrow">Brass City heritage</p>
          <h2 className="text-4xl text-foreground">A city known for its metalwork</h2>
          <p>Moradabad in Uttar Pradesh has been a centre of brass craft for generations, earning it the name Peetal Nagri — the Brass City. Its workshops produce the lamps, bells, plates and ritual ware used in homes and temples across India.</p>
          <p>Brassora Industries brings that craft to wholesale buyers. We concentrate on everyday pooja essentials that sell steadily: diyas, agarbatti stands, pooja plates, bells and complete thali sets.</p>
        </div>
      </section>
      <section className="bg-primary text-primary-foreground">
        <div className="container-x grid gap-10 py-20 md:grid-cols-3">
          {[
            ["Honest specifications", "Dimensions, weight, finish and MOQ are listed for every product, so buyers know what to expect."],
            ["Dependable relationships", "We value repeat buyers and clear communication over one-time sales."],
            ["Room to grow", "We are expanding our range and are open to custom, bulk and international enquiries."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="text-2xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-x py-20 text-center">
        <h2 className="text-4xl">Work with us</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/products" className="rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground">View catalogue</Link>
          <Link to="/contact" className="rounded-sm border border-border px-6 py-3.5 text-sm font-semibold hover:border-gold">Contact us</Link>
        </div>
      </section>
    </>
  );
}
