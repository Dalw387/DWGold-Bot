import { ClosePay } from "@/components/landing/close-pay";
import { DeskTeam } from "@/components/landing/desk-team";
import { EmailList } from "@/components/landing/email-list";
import { Faq } from "@/components/landing/faq";
import { HelpBusiness } from "@/components/landing/help-business";
import { HonestSplit } from "@/components/landing/honest-split";
import { OfferHero } from "@/components/landing/offer-hero";
import { OneJobCover } from "@/components/landing/one-job-cover";
import { OutcomesStrip } from "@/components/landing/outcomes-strip";
import { Pipeline } from "@/components/landing/pipeline";
import { StarterPath } from "@/components/landing/starter-path";
import { ValueStack } from "@/components/landing/value-stack";
import { WeekWithUs } from "@/components/landing/week-with-us";
import { WhatYouGet } from "@/components/landing/what-you-get";
import { OfferJsonLd } from "@/components/pay/offer-json-ld";

export default function Home() {
  return (
    <>
      <OfferJsonLd />
      <OfferHero />
      <OutcomesStrip />
      <DeskTeam />
      <StarterPath />
      <Pipeline />
      <OneJobCover />
      <ValueStack />
      <HelpBusiness />
      <WhatYouGet />
      <WeekWithUs />
      <HonestSplit />
      <EmailList />
      <Faq />
      <ClosePay />
    </>
  );
}
