import { Container } from "@/components/container";
import { HOUSE_PRICE_SHORT } from "@/lib/commerce";
import { AGENT_COUNT_WORDS, ROOM_COUNT_WORDS } from "@/lib/counts";
import { stackItems, vsAgency } from "@/lib/offer";

export function ValueStack() {
  return (
    <section id="stack" aria-labelledby="stack-heading" className="bg-[#eceae4] py-16 sm:py-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4d5c57]">
            What {HOUSE_PRICE_SHORT} actually buys
          </p>
          <h2
            id="stack-heading"
            className="font-display mt-3 text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
          >
            A full customer-getting desk, not a thin pack of posts.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            {ROOM_COUNT_WORDS.charAt(0).toUpperCase() + ROOM_COUNT_WORDS.slice(1)}{" "}
            rooms and {AGENT_COUNT_WORDS} agents. The point is not more files. The
            point is more people who enquire, visit, and pay you. One extra job
            covers the desk. Everything after that is the return.
          </p>
        </div>
        <ol className="mt-12 grid gap-8 border-t border-[#d8d4cc] pt-10 md:grid-cols-2">
          {stackItems.map((item, index) => (
            <li key={item.item}>
              <p className="text-sm text-[#5f5c56]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="font-display mt-2 text-xl text-[#191919]">{item.item}</h3>
              <p className="mt-2 text-sm leading-7 text-[#5f5c56]">{item.why}</p>
            </li>
          ))}
        </ol>
        <h3 className="font-display mt-16 text-2xl text-stone-900 sm:text-3xl">
          Against the usual bill
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">
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
                <th scope="col" className="border-b border-stone-300 pb-3 pr-4 font-semibold text-stone-900">
                  Instead of
                </th>
                <th scope="col" className="border-b border-stone-300 px-4 pb-3 font-semibold text-stone-900">
                  What that often costs
                </th>
                <th scope="col" className="border-b border-stone-300 pl-4 pb-3 font-semibold text-stone-900">
                  What you get here
                </th>
              </tr>
            </thead>
            <tbody>
              {vsAgency.map((row) => (
                <tr key={row.other}>
                  <th scope="row" className="border-b border-stone-200 py-4 pr-4 align-top font-medium text-stone-900">
                    {row.other}
                  </th>
                  <td className="border-b border-stone-200 px-4 py-4 align-top text-stone-600">
                    {row.typical}
                  </td>
                  <td className="border-b border-stone-200 py-4 pl-4 align-top text-stone-600">
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
