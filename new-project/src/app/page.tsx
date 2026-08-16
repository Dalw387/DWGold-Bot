import { ClosePay } from "@/components/landing/close-pay";
import { Faq } from "@/components/landing/faq";
import { HelpBusiness } from "@/components/landing/help-business";
import { HonestSplit } from "@/components/landing/honest-split";
import { OfferHero } from "@/components/landing/offer-hero";
import { WeekWithUs } from "@/components/landing/week-with-us";
import { WhatYouGet } from "@/components/landing/what-you-get";
import { OfferJsonLd } from "@/components/pay/offer-json-ld";

export default function Home() {
  return (
    <>
      <OfferJsonLd />
      <OfferHero />
      <HelpBusiness />
      <WhatYouGet />
      <WeekWithUs />
      <HonestSplit />
      <Faq />
      <ClosePay />
    </>
  );
}
