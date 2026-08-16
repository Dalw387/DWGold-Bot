import { Features } from "@/components/landing/features";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { ProductPreview } from "@/components/landing/product-preview";
import { ToolsBand } from "@/components/landing/tools-band";
import { ToolsMarquee } from "@/components/landing/tools-marquee";
import { OfferJsonLd } from "@/components/pay/offer-json-ld";

export default function Home() {
  return (
    <>
      <OfferJsonLd />
      <Hero />
      <ToolsMarquee />
      <ToolsBand />
      <ProductPreview />
      <Features />
      <HowItWorks />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
