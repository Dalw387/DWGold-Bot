import { addLead, isValidEmail, notifyOwner } from "@/lib/leads";

export async function POST(request: Request) {
  let body: { email?: string; name?: string; source?: string } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json({ error: "Send a name and email." }, { status: 400 });
  }

  if (!isValidEmail(body.email ?? "")) {
    return Response.json(
      { error: "Enter a real email address." },
      { status: 400 },
    );
  }

  const { lead, created } = await addLead({
    email: body.email ?? "",
    name: body.name,
    source: body.source,
  });

  if (created) {
    void notifyOwner(lead);
  }

  return Response.json({
    ok: true,
    created,
    email: lead.email,
  });
}
