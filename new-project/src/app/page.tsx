import { ClosePay } from "@/components/landing/close-pay";
import { AgentShowroom } from "@/components/landing/agent-showroom";
import { Capability } from "@/components/landing/capability";
import { EmailList } from "@/components/landing/email-list";
import { Faq } from "@/components/landing/faq";
import { HonestSplit } from "@/components/landing/honest-split";
import { IndustryExplorer } from "@/components/landing/industry-explorer";
import { JobDemo } from "@/components/landing/job-demo";
import { RoiCalculator } from "@/components/landing/roi-calculator";
import { StarterPath } from "@/components/landing/starter-path";
import { TeamPricing } from "@/components/landing/team-pricing";
import { WorkforceHero } from "@/components/landing/workforce-hero";
import { GrowthLayer } from "@/components/nano/growth-layer";
import { SignalTracker } from "@/components/nano/signal-tracker";
import { OfferJsonLd } from "@/components/pay/offer-json-ld";

export default function Home() {
  return (
    <>
      <OfferJsonLd />
      <SignalTracker kind="home" />
      <WorkforceHero />
      <AgentShowroom />
      <IndustryExplorer />
      <StarterPath />
      <Capability />
      <RoiCalculator />
      <JobDemo />
      <GrowthLayer />
      <HonestSplit />
      <TeamPricing />
      <EmailList />
      <Faq />
      <ClosePay />
    </>
  );
}
