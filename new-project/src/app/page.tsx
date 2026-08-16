import { Features } from "@/components/landing/features";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { ProductPreview } from "@/components/landing/product-preview";
import { ToolsBand } from "@/components/landing/tools-band";

export default function Home() {
  return (
    <>
      <Hero />
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
