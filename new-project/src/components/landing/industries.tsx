import Link from "next/link";
import { Container } from "@/components/container";
import { industries } from "@/lib/workforce";

export function Industries() {
  return (
    <section id="solutions" aria-labelledby="solutions-heading" className="border-b border-border py-20 sm:py-28">
      <Container>
        <p className="kicker">
          <span className="kicker-dot" aria-hidden="true" />
          Built for businesses where every lead matters
        </p>
        <h2
          id="solutions-heading"
          className="font-display mt-6 max-w-3xl text-4xl font-medium leading-[1.02] text-ice sm:text-5xl"
        >
          Trades. Clinics. Estate agents. Legal and financial.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate">
          Small and mid-sized firms cannot afford a missed call, a cold enquiry,
          or ads pointed at a login wall. That is who this team is for.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${item.slug}`}
                className="surface flex h-full flex-col rounded-2xl p-6 transition duration-200 hover:-translate-y-0.5 hover:border-cobalt/40"
              >
                <h3 className="font-display text-2xl text-ice">{item.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate">{item.intent}</p>
                <p className="mt-5 text-sm font-semibold text-cobalt">See the fit →</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
