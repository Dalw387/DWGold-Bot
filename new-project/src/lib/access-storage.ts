const KEY = "locallaunch.platform.v1";

export interface PlatformAccess {
  unlocked: boolean;
  sessionId: string;
  unlockedAt: string;
  hydrated: boolean;
}

const empty: PlatformAccess = {
  unlocked: false,
  sessionId: "",
  unlockedAt: "",
  hydrated: false,
};

type Listener = () => void;
const listeners = new Set<Listener>();
let snapshot: PlatformAccess = empty;
let loaded = false;

function emit() {
  for (const listener of listeners) listener();
}

function persist() {
  try {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({
        unlocked: snapshot.unlocked,
        sessionId: snapshot.sessionId,
        unlockedAt: snapshot.unlockedAt,
      }),
    );
  } catch {
    // ignore
  }
}

export function subscribeAccess(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getAccessSnapshot(): PlatformAccess {
  return snapshot;
}

export function getServerAccessSnapshot(): PlatformAccess {
  return empty;
}

export function hydrateAccessStore(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<PlatformAccess>) : {};
    snapshot = {
      unlocked: Boolean(parsed.unlocked),
      sessionId: parsed.sessionId ?? "",
      unlockedAt: parsed.unlockedAt ?? "",
      hydrated: true,
    };
  } catch {
    snapshot = { ...empty, hydrated: true };
  }
  emit();
}

export function hasPlatformAccess(): boolean {
  return snapshot.unlocked;
}

export function unlockPlatform(sessionId: string | null): void {
  snapshot = {
    unlocked: true,
    sessionId: sessionId?.trim() ?? "",
    unlockedAt: new Date().toISOString(),
    hydrated: true,
  };
  loaded = true;
  persist();
  emit();
}
