import { listLeads } from "@/lib/leads";

function authorised(request: Request): boolean {
  const key = process.env.OWNER_LEADS_KEY?.trim();
  if (!key) return false;
  const url = new URL(request.url);
  const fromQuery = url.searchParams.get("key")?.trim();
  const fromHeader = request.headers.get("x-owner-key")?.trim();
  return fromQuery === key || fromHeader === key;
}

export async function GET(request: Request) {
  if (!authorised(request)) {
    return Response.json(
      {
        error:
          "Set OWNER_LEADS_KEY on the server, then open /owner/leads?key= that value.",
      },
      { status: 401 },
    );
  }

  const leads = await listLeads();
  const format = new URL(request.url).searchParams.get("format");
  if (format === "csv") {
    const rows = [
      "email,name,source,createdAt",
      ...leads.map(
        (lead) =>
          `${lead.email},"${lead.name.replaceAll('"', '""')}",${lead.source},${lead.createdAt}`,
      ),
    ];
    return new Response(`${rows.join("\n")}\n`, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": "attachment; filename=locallaunch-leads.csv",
      },
    });
  }

  return Response.json({ count: leads.length, leads });
}
