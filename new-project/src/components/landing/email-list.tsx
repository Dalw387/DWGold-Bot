import { Container } from "@/components/container";
import { EmailCapture } from "@/components/landing/email-capture";

export function EmailList() {
  return (
    <section id="email" aria-labelledby="email-heading" className="bg-[#efe8db] py-16 sm:py-24">
      <Container className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
            Stay on the list
          </p>
          <h2
            id="email-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl"
          >
            Leave your email, even if you are not paying today.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            We collect addresses for LocalLaunch updates and later products. If
            you then pay, Stripe can open with this email already filled. We do
            not sell the list.
          </p>
        </div>
        <div className="paper-card rounded-3xl border border-stone-200 p-6 sm:p-8">
          <EmailCapture source="homepage" />
        </div>
      </Container>
    </section>
  );
}
