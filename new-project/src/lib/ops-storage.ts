import type { GeneratedPost } from "@/lib/types";
import type { OperationAgentId } from "@/lib/operations/agents";
import { OPERATION_AGENTS } from "@/lib/operations/agents";

const KEY = "locallaunch.ops.results.v1";

export type OpsResults = Record<OperationAgentId, GeneratedPost[]>;

function emptyResults(): OpsResults {
  const next = {} as OpsResults;
  for (const agent of OPERATION_AGENTS) next[agent.id] = [];
  return next;
}

type Listener = () => void;
const listeners = new Set<Listener>();
let snapshot: OpsResults = emptyResults();
let hydrated = false;

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeOps(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getOpsSnapshot(): OpsResults {
  return snapshot;
}

export function getServerOpsSnapshot(): OpsResults {
  return emptyResults();
}

export function hydrateOpsStore(): void {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    snapshot = raw ? { ...emptyResults(), ...(JSON.parse(raw) as OpsResults) } : emptyResults();
  } catch {
    snapshot = emptyResults();
  }
  emit();
}

export function writeOpsResults(results: OpsResults): void {
  snapshot = results;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(results));
  } catch {
    // ignore
  }
  emit();
}

export function patchOpsResults(id: OperationAgentId, posts: GeneratedPost[]): void {
  writeOpsResults({ ...snapshot, [id]: posts });
}

export function clearOpsResults(): void {
  writeOpsResults(emptyResults());
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
