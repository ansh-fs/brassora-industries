import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, MessageCircle, ClipboardList, Phone, MapPin } from "lucide-react";
import { SITE, ADDRESS_LINE, MAPS_URL, waLink } from "@/lib/site";
import { CATEGORIES } from "@/lib/products";
import { useBasket } from "@/lib/basket";
import { SocialLinks } from "./Social";

const NAV = [
  { to: "/products", label: "Products" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/export", label: "Export" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex flex-col leading-none" aria-label="Brassora Industries home">
      <span className="font-serif text-2xl font-semibold tracking-wide text-foreground">BRASSORA</span>
      <span className="text-[0.6rem] tracking-[0.42em] text-gold">INDUSTRIES · MORADABAD</span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { items } = useBasket();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden border-b border-border bg-primary text-primary-foreground md:block">
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <span>Wholesale supply of brass pooja items · Moradabad, Uttar Pradesh</span>
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE.phoneE164}`} className="hover:text-gold-soft">{SITE.phoneDisplay}</a>
            <a href={SITE.whatsappCatalogue} target="_blank" rel="noopener" className="hover:text-gold-soft">WhatsApp Catalogue</a>
          </div>
        </div>
      </div>
      <div className="container-x flex h-18 items-center justify-between gap-6 py-3">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-foreground/80 hover:text-foreground" activeProps={{ className: "text-foreground font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/enquiry" className="relative inline-flex h-10 items-center gap-2 rounded-sm border border-border px-3 text-sm hover:border-gold" aria-label={`Enquiry list, ${items.length} items`}>
            <ClipboardList className="h-4 w-4" />
            <span className="hidden sm:inline">Enquiry list</span>
            {items.length > 0 && (
              <span className="rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-foreground">{items.length}</span>
            )}
          </Link>
          <Link to="/wholesale" hash="rfq" className="hidden h-10 items-center rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 md:inline-flex">
            Get Quote
          </Link>
          <button className="inline-flex h-10 w-10 items-center justify-center lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-background lg:hidden" aria-label="Mobile">
          <div className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border py-3 text-base">
                {n.label}
              </Link>
            ))}
            <Link to="/wholesale" hash="rfq" onClick={() => setOpen(false)} className="mt-4 rounded-sm bg-primary py-3 text-center text-primary-foreground">
              Get Wholesale Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-primary pb-24 text-primary-foreground md:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-serif text-3xl">Brassora Industries</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            Wholesale supplier of brass pooja items, diyas, agarbatti stands and pooja thali sets from Moradabad — for distributors, retailers and bulk buyers.
          </p>
          <SocialLinks className="mt-6" tone="light" />
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow !text-gold-soft">Products</p>
          <ul className="mt-4 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to="/products" search={{ category: c.slug }} className="text-primary-foreground/80 hover:text-primary-foreground">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow !text-gold-soft">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.slice(1).map((n) => (
              <li key={n.to}><Link to={n.to} className="text-primary-foreground/80 hover:text-primary-foreground">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow !text-gold-soft">Visit / Call</p>
          <address className="mt-4 space-y-3 text-sm not-italic text-primary-foreground/85">
            <p className="font-semibold text-primary-foreground">Brassora Industries</p>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="flex gap-2 hover:text-primary-foreground"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{ADDRESS_LINE}</a>
            <a href={`tel:${SITE.phoneE164}`} className="flex gap-2 hover:text-primary-foreground"><Phone className="h-4 w-4" />{SITE.phoneDisplay}</a>
          </address>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="container-x flex flex-col justify-between gap-2 py-5 text-xs text-primary-foreground/60 md:flex-row">
          <span>© {new Date().getFullYear()} Brassora Industries, Moradabad. All rights reserved.</span>
          <span>Brass pooja items wholesale · Brass handicrafts Moradabad</span>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const msg = "Hello Brassora Industries, I'd like wholesale prices for your brass products.";
  return (
    <>
      <a
        href={waLink(msg)}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-gold/60 hover:scale-105 md:flex"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background md:hidden">
        <a href={waLink(msg)} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 py-4 text-sm font-semibold">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <Link to="/wholesale" hash="rfq" className="flex items-center justify-center bg-primary py-4 text-sm font-semibold text-primary-foreground">
          Get Bulk Quote
        </Link>
      </div>
    </>
  );
}
