export async function GET() {
  const body = process.env.STRIPE_APPLE_PAY_DOMAIN_ASSOCIATION?.trim();
  if (!body) {
    return new Response("Apple Pay domain association file is not set yet.\n", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
