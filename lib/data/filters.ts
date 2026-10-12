import type { Programme } from "./types";

export interface ProgrammeFilters {
  faculty?: string;
  level?: 4 | 5;
  mode?: string;
}

type Raw = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/** Reads filters from URL search params, ignoring anything unexpected. */
export function parseFilters(raw: Raw, validFaculties: string[]): ProgrammeFilters {
  const faculty = first(raw.faculty);
  const level = Number(first(raw.level));
  const mode = first(raw.mode)?.slice(0, 40);
  return {
    faculty: faculty && validFaculties.includes(faculty) ? faculty : undefined,
    level: level === 4 || level === 5 ? level : undefined,
    mode: mode || undefined,
  };
}

export function applyFilters(list: Programme[], f: ProgrammeFilters): Programme[] {
  return list.filter(
    (p) =>
      (!f.faculty || p.facultySlug === f.faculty) &&
      (!f.level || p.nqfLevel === f.level) &&
      (!f.mode || p.mode === f.mode),
  );
}

/** Builds a /programmes URL with one filter changed (pass undefined to clear it). */
export function filterHref(current: ProgrammeFilters, change: Partial<ProgrammeFilters>) {
  const next = { ...current, ...change };
  const q = new URLSearchParams();
  if (next.faculty) q.set("faculty", next.faculty);
  if (next.level) q.set("level", String(next.level));
  if (next.mode) q.set("mode", next.mode);
  const s = q.toString();
  return s ? `/programmes?${s}` : "/programmes";
}
