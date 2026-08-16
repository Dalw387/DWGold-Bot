import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { valuePoints } from "@/lib/offer";

export function ValueForMoney() {
  return (
    <section id="value" aria-labelledby="value-heading" className="bg-[#fffaf3] py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
            Value for money
          </p>
          <h2
            id="value-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            {HOUSE_PRICE_SHORT} once. Aimed at more customers, which is more money in the till.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            We will not invent a diary of bookings. We will give you a full
            desk whose only job is to help strangers become enquiries, and
            enquiries become work you can log.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {valuePoints.map((item) => (
            <li key={item.title} className="paper-card rounded-3xl border border-stone-200 p-6 sm:p-8">
              <h3 className="font-display text-2xl text-stone-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
