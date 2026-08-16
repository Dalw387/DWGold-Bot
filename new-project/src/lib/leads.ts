import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface Lead {
  id: string;
  email: string;
  name: string;
  source: string;
  createdAt: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normaliseEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  const email = normaliseEmail(value);
  return email.length >= 5 && email.length <= 120 && EMAIL_PATTERN.test(email);
}

function leadsPath(): string {
  return path.join(process.cwd(), "data", "leads.json");
}

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await readFile(leadsPath(), "utf8");
    const parsed = JSON.parse(raw) as Lead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function listLeads(): Promise<Lead[]> {
  const leads = await readLeads();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addLead(input: {
  email: string;
  name?: string;
  source?: string;
}): Promise<{ lead: Lead; created: boolean }> {
  const email = normaliseEmail(input.email);
  const name = (input.name ?? "").replace(/\s+/g, " ").trim().slice(0, 80);
  const source = (input.source ?? "site").trim().slice(0, 40) || "site";
  const leads = await readLeads();
  const existing = leads.find((item) => item.email === email);
  if (existing) {
    return { lead: existing, created: false };
  }
  const lead: Lead = {
    id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    email,
    name,
    source,
    createdAt: new Date().toISOString(),
  };
  leads.push(lead);
  await mkdir(path.dirname(leadsPath()), { recursive: true });
  await writeFile(leadsPath(), `${JSON.stringify(leads, null, 2)}\n`, "utf8");
  return { lead, created: true };
}

export async function notifyOwner(lead: Lead): Promise<void> {
  const inbox = process.env.LEADS_NOTIFY_EMAIL?.trim() || "nftdee@gmail.com";
  try {
    await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "LocalLaunch email list: new address",
        name: lead.name || "Not given",
        email: lead.email,
        source: lead.source,
        collectedAt: lead.createdAt,
      }),
    });
  } catch {
    // Inbox notify is a bonus. The on-site list still saved.
  }
}
