const KEY = "locallaunch.house.v1";

export interface HouseMembership {
  returnedFromCheckout: boolean;
  sessionId: string;
  returnedAt: string;
  verifiedOnServer: false;
}

const empty: HouseMembership = {
  returnedFromCheckout: false,
  sessionId: "",
  returnedAt: "",
  verifiedOnServer: false,
};

type Listener = () => void;
const listeners = new Set<Listener>();
let snapshot: HouseMembership = empty;
let hydrated = false;

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeHouse(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getHouseSnapshot(): HouseMembership {
  return snapshot;
}

export function getServerHouseSnapshot(): HouseMembership {
  return empty;
}

export function hydrateHouseStore(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    snapshot = raw ? ({ ...empty, ...(JSON.parse(raw) as HouseMembership) }) : empty;
  } catch {
    snapshot = empty;
  }
  emit();
}

export function markHouseReturn(sessionId: string | null): void {
  snapshot = {
    returnedFromCheckout: true,
    sessionId: sessionId?.trim() ?? "",
    returnedAt: new Date().toISOString(),
    verifiedOnServer: false,
  };
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    // ignore
  }
  emit();
}
