export type ProofSource =
  | "website"
  | "facebook"
  | "instagram"
  | "google"
  | "whatsapp"
  | "other";

export type ProofKind = "enquiry" | "message" | "call" | "visit" | "sale";

export interface ProofEntry {
  id: string;
  recordedAt: string;
  source: ProofSource;
  kind: ProofKind;
  note: string;
}

const KEY = "locallaunch.proof.v1";

type Listener = () => void;
const listeners = new Set<Listener>();
let snapshot: ProofEntry[] = [];
let hydrated = false;

function emit() {
  for (const listener of listeners) listener();
}

function persist(entries: ProofEntry[]) {
  snapshot = entries;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    // Private mode should not break the ledger.
  }
  emit();
}

export function subscribeProof(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getProofSnapshot(): ProofEntry[] {
  return snapshot;
}

export function getServerProofSnapshot(): ProofEntry[] {
  return [];
}

export function hydrateProofStore(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) {
      snapshot = [];
      emit();
      return;
    }
    const parsed = JSON.parse(raw) as ProofEntry[];
    snapshot = Array.isArray(parsed) ? parsed : [];
  } catch {
    snapshot = [];
  }
  emit();
}

export function addProofEntry(entry: Omit<ProofEntry, "id" | "recordedAt">): void {
  persist([
    {
      ...entry,
      id: crypto.randomUUID(),
      recordedAt: new Date().toISOString(),
    },
    ...snapshot,
  ]);
}

export function clearProofStore(): void {
  persist([]);
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export const PROOF_SOURCE_LABELS: Record<ProofSource, string> = {
  website: "Website",
  facebook: "Facebook",
  instagram: "Instagram",
  google: "Google",
  whatsapp: "WhatsApp",
  other: "Other",
};

export const PROOF_KIND_LABELS: Record<ProofKind, string> = {
  enquiry: "Enquiry",
  message: "Message",
  call: "Call",
  visit: "Visit",
  sale: "Sale",
};
