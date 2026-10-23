export const SITE = {
  name: "Brassora Industries",
  tagline: "Brass pooja items & handicrafts — wholesale from Moradabad",
  phoneDisplay: "+91 90275 51365",
  phoneE164: "+919027551365",
  whatsappNumber: "919027551365",
  whatsappCatalogue: "https://wa.me/c/919027551365",
  address: {
    street: "Sector 10/232, Buddhi Vihar Phase 2, near MGR Restaurant",
    city: "Moradabad",
    region: "Uttar Pradesh",
    postalCode: "244103",
    country: "IN",
  },
  social: {
    instagram: "https://www.instagram.com/brassoraindustries/",
    facebook: "https://www.facebook.com/profile.php?id=61573333850472",
    linkedin: "https://www.linkedin.com/company/brassora-industries/",
    youtube: "https://www.youtube.com/@BrassoraIndustries",
  },
} as const;

export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}, India`;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Brassora Industries, " + ADDRESS_LINE,
)}`;

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const SAME_AS = Object.values(SITE.social);

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description:
      "Wholesale supplier of brass pooja items, diyas, agarbatti stands, pooja thalis and brass handicrafts from Moradabad, Uttar Pradesh.",
    telephone: SITE.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    sameAs: SAME_AS,
  };
}

export function pageHead(title: string, description: string, extra: { path?: string } = {}) {
  void extra;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  };
}
