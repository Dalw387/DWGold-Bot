import { Container } from "@/components/container";
import { helpPoints, problems } from "@/lib/offer";

export function HelpBusiness() {
  return (
    <section id="help" aria-labelledby="help-heading" className="bg-[#fffaf3] py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8c6a38]">
            How we help your business
          </p>
          <h2
            id="help-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            The job is more local people who actually get in touch.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            LocalLaunch is a marketing desk for small businesses. It writes the
            words you need to be understood in your town, then asks you to log
            only real enquiries. It is not a promise of new customers. It is
            the work that makes new customers possible.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {problems.map((item) => (
            <li key={item.title} className="paper-card rounded-3xl border border-stone-200 p-6 sm:p-8">
              <h3 className="font-display text-2xl text-stone-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{item.body}</p>
            </li>
          ))}
        </ul>
        <h3 className="font-display mt-16 text-2xl text-stone-900 sm:text-3xl">
          What that looks like in practice
        </h3>
        <ol className="mt-8 space-y-6">
          {helpPoints.map((item, index) => (
            <li key={item.title} className="grid gap-3 border-t border-stone-200 pt-6 md:grid-cols-[4rem_minmax(0,1fr)]">
              <p className="font-display text-sm tracking-[0.2em] text-[#8c6a38]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h4 className="font-display text-xl text-stone-900">{item.title}</h4>
                <p className="mt-2 text-sm leading-7 text-stone-600">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
