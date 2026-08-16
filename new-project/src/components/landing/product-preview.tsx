import { Container } from "@/components/container";

export function ProductPreview() {
  return (
    <section
      id="product-preview"
      aria-labelledby="preview-heading"
      className="bg-stone-100/60 py-16 sm:py-20"
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="preview-heading"
            className="font-display text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl"
          >
            Facebook Post Studio, with extra styles
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-600">
            The original three drafts are still there. You can now add a community
            question, a behind-the-scenes note, a reminder, an explainer, and a
            short punchy version. The example below is labelled as a preview.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-3xl border border-stone-200 bg-[#fffcf7] shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-stone-200 bg-stone-50 px-4 py-3">
            <p className="text-xs font-medium text-stone-500">
              Example preview — Harbour & Hearth is not a live listing
            </p>
            <p className="text-xs text-indigo-700">Friendly · Standard length</p>
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-stone-200 p-6 lg:border-r lg:border-b-0">
              <p className="text-sm font-semibold text-stone-900">Styles in this pack</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {[
                  "Neighbourhood update",
                  "Offer update",
                  "Helpful introduction",
                  "Community question",
                  "Useful explainer",
                  "Short and punchy",
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6">
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-700 text-sm font-semibold text-white">
                    HH
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Harbour & Hearth</p>
                    <p className="text-xs text-stone-500">Preview · not published</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-stone-700">
                  Hello from Harbour & Hearth in Falmouth. We are a cafe, and we
                  wanted neighbours to know about weekend brunch plates and filter
                  coffee. Message us to ask what is on this weekend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
