import { applyBrief, parseBrief } from "../src/lib/agent/parse-brief";
import { generateForTool } from "../src/lib/copy";
import { DW_GOLD_TRIAL, EXAMPLE_PROFILE } from "../src/lib/example-profile";
import {
  OPERATION_AGENTS,
  runOperationAgent,
} from "../src/lib/operations/agents";
import { stripePaymentLink } from "../src/lib/payments";
import { TOOLS } from "../src/lib/tools";
import {
  FACEBOOK_STYLES,
  emptyGeneratorValues,
  type GeneratorFormValues,
  type ToolSlug,
} from "../src/lib/types";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function checkPosts(label: string, posts: { id: string; label: string; text: string }[]) {
  assert(posts.length > 0, `${label} produced no drafts`);
  for (const post of posts) {
    assert(post.id.trim(), `${label} has a draft with an empty id`);
    assert(post.label.trim(), `${label} draft ${post.id} has no label`);
    assert(post.text.trim().length >= 40, `${label} draft ${post.id} is too short`);
    assert(
      !post.text.includes("undefined"),
      `${label} draft ${post.id} contains undefined`,
    );
  }
}

function runProfile(name: string, values: GeneratorFormValues) {
  for (const tool of TOOLS) {
    const posts = generateForTool(tool.slug as ToolSlug, values);
    checkPosts(`${name} / ${tool.slug}`, posts);
  }

  const facebook = generateForTool("facebook-post-generator", {
    ...values,
    facebookStyles: [...FACEBOOK_STYLES],
  });
  assert(
    facebook.length === FACEBOOK_STYLES.length,
    `${name} Facebook pack should include every style`,
  );

  for (const agent of OPERATION_AGENTS) {
    const posts = runOperationAgent(agent.id, values);
    checkPosts(`${name} / agent ${agent.id}`, posts);
  }
}

const seo = generateForTool("seo-brief", EXAMPLE_PROFILE);
const clusters = seo.find((post) => post.id === "clusters");
assert(clusters, "SEO brief is missing local search themes");
assert(
  clusters.text.includes("\n2."),
  "SEO search themes should keep numbered lines, not flatten them",
);

const ads = generateForTool("ads-copy", DW_GOLD_TRIAL);
assert(
  ads.some((post) => post.id === "fb-primary"),
  "Ads copy is missing Facebook primary text",
);
assert(
  ads.some((post) => post.id === "google-rsa"),
  "Ads copy is missing Google Ads lines",
);
assert(
  ads.some((post) => /trad|invest|gold|restricted/i.test(post.text)),
  "DW Gold ads copy should include a financial-education caution",
);

const link = stripePaymentLink();
assert(link, "Stripe Payment Link is not wired");
assert(
  link.startsWith("https://buy.stripe.com/4gM14ndrHburaZpfZV48001"),
  `Unexpected Payment Link: ${link}`,
);
assert(
  link.includes("client_reference_id=locallaunch-house"),
  "Payment Link should tag House Operations for Stripe reporting",
);

runProfile("Harbour & Hearth", EXAMPLE_PROFILE);
runProfile("DW Gold Trading", DW_GOLD_TRIAL);

const cafeBrief = parseBrief(
  "Harbour & Hearth is a cafe in Falmouth offering weekend brunch plates and filter coffee. Message us to ask what is on this weekend.",
);
assert(cafeBrief.patch.businessName === "Harbour & Hearth", "Brief parser missed the cafe name");
assert(cafeBrief.patch.location === "Falmouth", "Brief parser missed Falmouth");
assert(cafeBrief.patch.businessType === "cafe", "Brief parser missed cafe");
assert(cafeBrief.patch.offer, "Brief parser missed the cafe offer");

const goldBrief = parseBrief(
  "DW Gold Trading is gold trading education in Alfreton offering education and market insight. Enquire to ask what teaching is currently available.",
);
const goldValues = applyBrief(emptyGeneratorValues, goldBrief.patch);
assert(goldValues.businessName.includes("DW Gold"), "Brief parser missed DW Gold Trading");
assert(goldValues.location.includes("Alfreton"), "Brief parser missed Alfreton");
assert(
  goldValues.businessType.includes("gold trading education"),
  "Brief parser missed gold trading education",
);

console.log(
  `Smoke OK: ${TOOLS.length} tools, ${OPERATION_AGENTS.length} agents, two businesses, Stripe link live.`,
);
