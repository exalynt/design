import { STABILITY_LEVEL_IDS, stabilityStep, type StabilityLevelId } from "../stability/stability";

// Maturity: how complete and stable a Feature or a project is, as presently
// known, as a percentage worked out from its Capabilities' stability levels.
// The rules are the readme's (https://readme.exalynt.com/how-it-works/maturity).

/** Where maturity counts as healthy for most businesses; the last quarter is room to keep evolving. */
export const HEALTHY_MATURITY = 75;

/** What maturity is and how it's measured. */
export const MATURITY_DOCS_URL = "https://readme.exalynt.com/how-it-works/maturity";

/** Each band's name, by the level at its top, whose color it takes. */
export const MATURITY_BANDS: Record<StabilityLevelId, string> = {
  prototype: "Experimental",
  alpha: "Emerging",
  beta: "Promising",
  ga: "Established",
};

/** A percentage kept to a whole number from 0 to 100. */
export function clampMaturity(progress: number): number {
  return Math.min(Math.max(Math.round(progress), 0), 100);
}

/**
 * The band a maturity is in: the quarter between two levels, named and
 * colored for the level at its top. 0–24% is Prototype's, 25–49% Alpha's,
 * 50–74% Beta's, and 75–100% GA's.
 */
export function maturityBand(progress: number): StabilityLevelId {
  return STABILITY_LEVEL_IDS[Math.min(Math.floor(clampMaturity(progress) / 25), 3)];
}

/** How far a maturity reaches into each level's quarter, 0 to 1, Prototype first. */
export function maturityFills(progress: number): number[] {
  const value = clampMaturity(progress);
  return STABILITY_LEVEL_IDS.map((_, index) => Math.min(Math.max((value - index * 25) / 25, 0), 1));
}

/**
 * A Feature's maturity from its Capabilities' levels, `null` for a draft:
 * each counts 25% for every level it has reached, and a draft 0%, averaged
 * and rounded. `null` when none has a level yet, since a Feature shows no
 * maturity until then.
 */
export function featureMaturity(levels: (StabilityLevelId | null)[]): number | null {
  if (!levels.some((level) => level !== null)) return null;
  const total = levels.reduce((sum, level) => sum + (level ? stabilityStep(level) * 25 : 0), 0);
  return Math.round(total / levels.length);
}

/**
 * A project's maturity from its Features' maturities, `null` for one nobody
 * has started on: each Feature counts the same, and an unstarted one 0%.
 * Bugs have no maturity, so leave them out. `null` for a project with no
 * Features.
 */
export function projectMaturity(features: (number | null)[]): number | null {
  if (features.length === 0) return null;
  const total = features.reduce<number>((sum, progress) => sum + (progress ?? 0), 0);
  return Math.round(total / features.length);
}
