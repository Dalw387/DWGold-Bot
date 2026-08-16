import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { AGENT_COUNT_WORDS, ROOM_COUNT_WORDS } from "@/lib/counts";
import { stackItems, vsAgency } from "@/lib/offer";

export function ValueStack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="bg-wash py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="kicker">What {HOUSE_PRICE_SHORT} actually buys</p>
          <h2
            id="stack-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
          >
            A full customer-getting house, not a thin pack of posts.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {ROOM_COUNT_WORDS.charAt(0).toUpperCase() + ROOM_COUNT_WORDS.slice(1)}{" "}
            rooms and {AGENT_COUNT_WORDS} named desks. The point is not more
            files. The point is more people who enquire, visit, and pay you. One
            extra job covers the desk. Everything after that is the return.
          </p>
        </div>
        <ol className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
          {stackItems.map((item, index) => (
            <li key={item.item}>
              <p className="text-sm text-muted">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="font-display mt-2 text-xl text-foreground">{item.item}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{item.why}</p>
            </li>
          ))}
        </ol>
        <h3 className="font-display mt-16 text-2xl text-foreground sm:text-3xl">
          Against the usual bill
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
          These are typical ranges, not a survey and not a promise that your
          town charges the same. They are here so {HOUSE_PRICE_SHORT} has a
          fair comparison.
        </p>
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
            <caption className="sr-only">
              Typical other costs compared with LocalLaunch at {HOUSE_PRICE_SHORT}
            </caption>
            <thead>
              <tr>
                <th scope="col" className="border-b border-border pb-3 pr-4 font-semibold text-foreground">
                  Instead of
                </th>
                <th scope="col" className="border-b border-border px-4 pb-3 font-semibold text-foreground">
                  What that often costs
                </th>
                <th scope="col" className="border-b border-border pl-4 pb-3 font-semibold text-foreground">
                  What you get here
                </th>
              </tr>
            </thead>
            <tbody>
              {vsAgency.map((row) => (
                <tr key={row.other}>
                  <th scope="row" className="border-b border-border py-4 pr-4 align-top font-medium text-foreground">
                    {row.other}
                  </th>
                  <td className="border-b border-border px-4 py-4 align-top text-muted">
                    {row.typical}
                  </td>
                  <td className="border-b border-border py-4 pl-4 align-top text-muted">
                    {row.here}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
