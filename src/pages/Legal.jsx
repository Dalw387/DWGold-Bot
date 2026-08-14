import { EMAIL, brand } from "../content/site.js";

const pages = {
  privacy: {
    title: "Privacy",
    blocks: [
      {
        h: "Who we are",
        p: `${brand.legal} (“Kiwi”) builds websites, AI agents, automation, and related digital systems. Contact: ${EMAIL}.`,
      },
      {
        h: "What we collect",
        p: "If you write to us, we receive the content of that message and your email address. Build My Site stores a Vision Blueprint in your browser until you choose to send it. We do not sell personal data.",
      },
      {
        h: "Ask Kiwi",
        p: "Conversations with Ask Kiwi on this site are processed to answer your question. Do not send special-category data through the public assistant.",
      },
      {
        h: "Your rights",
        p: "You may ask for access, correction, deletion, or restriction, and you may complain to the ICO. Email us to begin.",
      },
    ],
  },
  cookies: {
    title: "Cookies",
    blocks: [
      {
        h: "What we use",
        p: "This site aims to work with essential storage only — for example, a client preview flag in session storage. We do not run advertising cookies.",
      },
      {
        h: "Fonts",
        p: "Type is served from Google Fonts. That request is subject to Google’s own privacy notice.",
      },
    ],
  },
  terms: {
    title: "Terms",
    blocks: [
      {
        h: "The site",
        p: "This website describes Kiwi Vision Media Limited. Showroom pieces are concepts unless stated as a live engagement. Nothing here is a guarantee of a particular commercial result.",
      },
      {
        h: "Engagements",
        p: "Paid work is set out in a separate agreement. £0 upfront and from £99 a month describe the commercial manner, not a standing public offer for unlimited work.",
      },
      {
        h: "AI",
        p: "Outputs prepared with AI are directed and approved by people before they represent a client. You remain responsible for the accuracy of material you supply.",
      },
    ],
  },
  accessibility: {
    title: "Accessibility",
    blocks: [
      {
        h: "Intent",
        p: "The site is designed to be used with a keyboard, with visible focus, captions on films, transcripts, and a reduced-motion mode that remains complete.",
      },
      {
        h: "Contact",
        p: `If something is in the way, write to ${EMAIL} and we will treat it as a defect.`,
      },
    ],
  },
};

export default function Legal({ kind }) {
  const page = pages[kind] || pages.privacy;
  return (
    <div className="page legal">
      <h1>{page.title}</h1>
      {page.blocks.map((b) => (
        <section key={b.h}>
          <h2>{b.h}</h2>
          <p>{b.p}</p>
        </section>
      ))}
    </div>
  );
}
