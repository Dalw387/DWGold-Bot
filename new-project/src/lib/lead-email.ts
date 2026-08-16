type Listener = () => void;
const listeners = new Set<Listener>();
const KEY = "locallaunch.lead.email.v1";
let snapshot = "";
let loaded = false;

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeLeadEmail(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLeadEmailSnapshot(): string {
  return snapshot;
}

export function getServerLeadEmailSnapshot(): string {
  return "";
}

export function hydrateLeadEmail(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    snapshot = window.localStorage.getItem(KEY)?.trim() ?? "";
  } catch {
    snapshot = "";
  }
  emit();
}

export function saveLeadEmail(email: string): void {
  const value = email.trim().toLowerCase();
  snapshot = value;
  loaded = true;
  try {
    if (value) window.localStorage.setItem(KEY, value);
    else window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
  emit();
}

export function readLeadEmail(): string {
  return snapshot;
}
