import {
  HOUSE_PRICE_SHORT,
  HOUSE_PRODUCT_DESCRIPTION,
  HOUSE_PRODUCT_NAME,
} from "@/lib/commerce";
import { stripePaymentLink } from "@/lib/payments";

export function OfferJsonLd() {
  const url = stripePaymentLink();
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: HOUSE_PRODUCT_NAME,
    description: HOUSE_PRODUCT_DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: "197.00",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: url ?? undefined,
      name: `${HOUSE_PRODUCT_NAME} · ${HOUSE_PRICE_SHORT} one-off`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
