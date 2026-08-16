import { Container } from "@/components/container";
import { EmailCapture } from "@/components/landing/email-capture";

export function EmailList() {
  return (
    <section id="email" aria-labelledby="email-heading" className="py-24 sm:py-32">
      <Container className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="kicker">
            <span className="kicker-dot" aria-hidden="true" />
            Stay close
          </p>
          <h2 id="email-heading" className="font-display display-2 mt-6 text-ice">
            Not ready yet?
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-slate">
            Product updates, new specialists and practical growth ideas. No noise.
            Leave whenever you like.
          </p>
        </div>
        <div className="titanium rounded-[1.5rem] p-6 sm:p-8">
          <EmailCapture source="homepage" />
        </div>
      </Container>
    </section>
  );
}
