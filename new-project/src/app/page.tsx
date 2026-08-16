import { Features } from "@/components/landing/features";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { ProductPreview } from "@/components/landing/product-preview";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductPreview />
      <Features />
      <HowItWorks />
      <Pricing />
      <FinalCta />
    </>
  );
}
