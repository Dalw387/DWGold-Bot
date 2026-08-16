import {
  DEFAULT_FACEBOOK_STYLES,
  FACEBOOK_STYLES,
  emptyGeneratorValues,
  type FacebookStyleId,
  type GeneratorFormValues,
  type PostLength,
  type Tone,
} from "@/lib/types";
import { isTone } from "@/lib/validation";

const KEY = "locallaunch.profile.v1";

function isPostLength(value: unknown): value is PostLength {
  return value === "short" || value === "standard" || value === "long";
}

function parseStyles(value: unknown): FacebookStyleId[] {
  if (!Array.isArray(value)) return [...DEFAULT_FACEBOOK_STYLES];
  const styles = value.filter(
    (item): item is FacebookStyleId =>
      typeof item === "string" &&
      (FACEBOOK_STYLES as readonly string[]).includes(item),
  );
  return styles.length > 0 ? styles : [...DEFAULT_FACEBOOK_STYLES];
}

export function loadProfile(): GeneratorFormValues | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<GeneratorFormValues>;
    return {
      ...emptyGeneratorValues,
      businessName: String(parsed.businessName ?? ""),
      businessType: String(parsed.businessType ?? ""),
      location: String(parsed.location ?? ""),
      offer: String(parsed.offer ?? ""),
      tone: isTone(String(parsed.tone ?? "")) ? (parsed.tone as Tone) : "friendly",
      callToAction: String(parsed.callToAction ?? ""),
      length: isPostLength(parsed.length) ? parsed.length : "standard",
      includeHashtags: Boolean(parsed.includeHashtags),
      facebookStyles: parseStyles(parsed.facebookStyles),
    };
  } catch {
    return null;
  }
}

export function saveProfile(values: GeneratorFormValues): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(KEY, JSON.stringify(values));
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(KEY);
}

type Listener = () => void;
const listeners = new Set<Listener>();
let snapshot: GeneratorFormValues = emptyGeneratorValues;
let hydrated = false;

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeProfile(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getProfileSnapshot(): GeneratorFormValues {
  return snapshot;
}

export function getServerProfileSnapshot(): GeneratorFormValues {
  return emptyGeneratorValues;
}

export function hydrateProfileStore(): void {
  if (hydrated) return;
  hydrated = true;
  snapshot = loadProfile() ?? emptyGeneratorValues;
  emit();
}

export function writeProfileStore(values: GeneratorFormValues): void {
  snapshot = values;
  try {
    saveProfile(values);
  } catch {
    // Private mode and blocked storage should not stop the studio updating.
  }
  emit();
}

export function resetProfileStore(): void {
  snapshot = emptyGeneratorValues;
  clearProfile();
  emit();
}
