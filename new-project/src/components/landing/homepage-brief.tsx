"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { applyBrief, parseBrief } from "@/lib/agent/parse-brief";
import { generateFacebookPosts } from "@/lib/copy/facebook";
import { emptyGeneratorValues } from "@/lib/types";
import { writeProfileStore } from "@/lib/profile-storage";

const starter =
  "Harbour & Hearth is a cafe in Falmouth offering weekend brunch plates and filter coffee. Message us to ask what is on this weekend.";

export function HomepageBrief() {
  const router = useRouter();
  const [text, setText] = useState(starter);
  const parsed = useMemo(() => parseBrief(text), [text]);
  const preview = useMemo(() => {
    const values = applyBrief(emptyGeneratorValues, {
      ...parsed.patch,
      includeHashtags: true,
    });
    if (
      values.businessName.length < 2 ||
      values.businessType.length < 2 ||
      values.location.length < 2 ||
      values.offer.length < 2
    ) {
      return null;
    }
    return generateFacebookPosts({
      ...values,
      facebookStyles: ["neighbourhood"],
      length: "short",
    })[0];
  }, [parsed]);

  function applyAndOpen() {
    writeProfileStore(applyBrief(emptyGeneratorValues, parsed.patch));
    router.push("/tools/facebook-post-generator");
  }

  return (
    <div className="luxury-panel rounded-3xl p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d7c4a1]">
        Live studio
      </p>
      <h2 className="font-display mt-3 text-2xl text-[#f6f1e8] sm:text-3xl">
        Type the business. Watch a draft appear.
      </h2>
      <label htmlFor="home-brief" className="mt-4 block text-sm text-[#e8dcc8]">
        One sentence is enough
      </label>
      <textarea
        id="home-brief"
        rows={4}
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="mt-2 w-full resize-y rounded-2xl border border-[rgba(176,137,79,0.35)] bg-[#1a1714] px-4 py-3 text-sm leading-6 text-[#f6f1e8] outline-none focus:border-[#d7c4a1] focus:ring-2 focus:ring-[rgba(176,137,79,0.28)]"
      />
      <ul className="mt-3 flex flex-wrap gap-2">
        {parsed.summary.length > 0 ? (
          parsed.summary.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[rgba(176,137,79,0.3)] px-3 py-1 text-xs text-[#d7c4a1]"
            >
              {item}
            </li>
          ))
        ) : (
          <li className="text-xs text-[#b3a28c]">
            Add a name, a town, and what you offer.
          </li>
        )}
      </ul>
      <div className="mt-5 rounded-2xl border border-[rgba(176,137,79,0.25)] bg-[#241f1a] p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-[#d7c4a1]">
          Sketch
        </p>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#f3eee4]">
          {preview?.text ?? "The sketch appears here when the sentence has enough detail."}
        </p>
      </div>
      <div className="mt-5">
        <Button type="button" onClick={applyAndOpen}>
          Take this into the studio
        </Button>
      </div>
    </div>
  );
}
