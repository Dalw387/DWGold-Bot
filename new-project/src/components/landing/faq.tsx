import { Container } from "@/components/container";

const items = [
  {
    q: "Is this a real AI model?",
    a: "Not in this demo. The studio assistant and the drafts run from templates in your browser so the product can stay free. A connected model can be added later without changing how you enter facts.",
  },
  {
    q: "Do I need to pay or create an account?",
    a: "No. This version is complimentary. There is no card, no login, and no server-side store of your details.",
  },
  {
    q: "Can I use this for a real shop?",
    a: "Yes, as a drafting room. Always check names, prices, times, and claims before you post. The tool will not invent awards or customer numbers.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-[#fffaf3] py-16 sm:py-24">
      <Container>
        <h2
          id="faq-heading"
          className="font-display text-3xl font-medium tracking-tight text-stone-900 sm:text-5xl"
        >
          A few quiet answers
        </h2>
        <dl className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
          {items.map((item) => (
            <div key={item.q} className="grid gap-3 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
              <dt className="font-display text-xl text-stone-900">{item.q}</dt>
              <dd className="text-sm leading-7 text-stone-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
