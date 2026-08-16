import { Container } from "@/components/container";

const previewFields = [
  { label: "Business name", value: "Harbour & Hearth" },
  { label: "Business type", value: "Cafe" },
  { label: "Town or area", value: "Falmouth" },
  { label: "Offer", value: "Weekend brunch plates and filter coffee" },
];

const previewPost = `Hello from Harbour & Hearth in Falmouth.

We are a cafe, and we wanted neighbours to know about weekend brunch plates and filter coffee. This is a simple update from us, not a promise about results or a claim we cannot back up.

Pop us a message if you would like to know more.`;

export function ProductPreview() {
  return (
    <section
      id="product-preview"
      aria-labelledby="preview-heading"
      className="bg-slate-50 py-16 sm:py-20"
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="preview-heading"
            className="text-3xl font-semibold tracking-tight text-slate-900"
          >
            See the generator before you use it
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The live tool asks for a few facts you already know. It then builds
            three different Facebook drafts. The example below is labelled as a
            preview so it is not mistaken for a real customer story.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
            <p className="ml-2 text-xs font-medium text-slate-500">
              Example preview — not a live business listing
            </p>
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r">
              <p className="text-sm font-semibold text-slate-900">Example details</p>
              <dl className="mt-4 space-y-3">
                {previewFields.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                  >
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      {field.label}
                    </dt>
                    <dd className="mt-1 text-sm text-slate-900">{field.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold text-slate-900">
                Example neighbourhood draft
              </p>
              <p className="mt-1 text-xs text-slate-500">Friendly tone</p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 whitespace-pre-wrap text-slate-700">
                {previewPost}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
