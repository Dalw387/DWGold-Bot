import { Container } from "@/components/container";
import { EmailCapture } from "@/components/landing/email-capture";

export function EmailList() {
  return (
    <section id="email" aria-labelledby="email-heading" className="border-b border-border py-20 sm:py-28">
      <Container className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            Stay on the list
          </p>
          <h2
            id="email-heading"
            className="font-display mt-6 text-4xl font-medium text-ice sm:text-5xl"
          >
            Leave your email, even if you are not paying today.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate">
            We collect addresses for LocalLaunch updates and the later live
            workforce. If you then pay, Stripe can open with this email already
            filled. We do not sell the list.
          </p>
        </div>
        <div className="surface rounded-2xl p-6 sm:p-8">
          <EmailCapture source="homepage" />
        </div>
      </Container>
    </section>
  );
}
