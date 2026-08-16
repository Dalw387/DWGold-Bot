import { Container } from "@/components/container";
import { EmailCapture } from "@/components/landing/email-capture";

const nextItems = [
  "Live workforce",
  "More specialist desks",
  "Deeper integrations",
  "New industry workflows",
];

export function EmailList() {
  return (
    <section id="email" aria-labelledby="email-heading" className="py-14 sm:py-16">
      <Container>
        <div className="glass grid items-start gap-8 rounded-[1.4rem] p-6 lg:grid-cols-[1.1fr_0.9fr] sm:p-8">
          <div>
            <p className="kicker">
              <span className="kicker-dot" aria-hidden="true" />
              Stay in the loop
            </p>
            <h2 id="email-heading" className="font-display display-3 mt-4 text-ice">
              Not ready to build the team yet?
            </h2>
            <p className="prose-narrow mt-3 text-sm leading-7 text-slate">
              Get new LocalLaunch capabilities, specialist releases and practical
              customer-growth ideas.
            </p>
            <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan">
              Next from LocalLaunch
            </p>
            <ul className="mt-3 grid gap-2 text-sm text-silver sm:grid-cols-2">
              {nextItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan/20 bg-void/50 p-5">
            <p className="label">Communications terminal</p>
            <div className="mt-4">
              <EmailCapture source="homepage" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
