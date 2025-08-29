import { days_of_week } from "./days_of_week.js";
export function generate_schema_struct(item, listings) {
  const logo = item?.photos?.find((x) => x?.logo === true);
  const shop = item?.attributes?.find(
    (x) => x?.externalId === "url_shop_online",
  );
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: item.name,
    image: logo?.publicUrl || "N/A",
    "@id": shop?.value || "N/A",
    url: item.website || "N/A",
    telephone: item.phone,
    priceRange: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: item.streetAndNumber,
      addressLocality: item.city,
      addressRegion: item.state || "N/A",
      postalCode: item.zip,
      addressCountry: item.country || "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: item.latitude,
      longitude: item.longitude,
    },
    openingHoursSpecification: Array.isArray(item.openingHours)
      ? item.openingHours.map((hours) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days_of_week[hours.dayOfWeek],
        opens: hours.from1 || "00:00",
        closes: hours.to1 || "00:00",
      }))
      : [],
    sameAs: listings?.map((listing) => listing?.listingUrl), // Add the listings under sameAs
  };
}
