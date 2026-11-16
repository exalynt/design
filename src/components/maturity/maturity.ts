import { STABILITY_LEVEL_IDS, type StabilityLevelId } from "../stability/stability";

// Maturity: how far along a Feature or a project is, meaning how close the
// work under way is to being stable and supported, as a percentage worked out
// from its Capabilities' stability levels.
// The rules are the readme's (https://readme.exalynt.com/how-it-works/maturity).

/** Where maturity counts as healthy for most businesses; the last quarter is room to keep evolving. */
export const HEALTHY_MATURITY = 75;

/** What maturity is and how it's measured. */
export const MATURITY_DOCS_URL = "https://readme.exalynt.com/how-it-works/maturity";

/** Each band's name, by the level it's named for, whose color it takes. */
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
 * The band a maturity is in, a quarter of the scale each, named and colored
 * for a level: 0–24% is Prototype's, 25–49% Alpha's, 50–74% Beta's, and
 * 75–100% GA's. A Feature whose Capabilities are all at one level lands in
 * that level's band (see MATURITY_LEVELS).
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
 * What a Capability at each level adds to its Feature's maturity: its score,
 * and how much weight that score carries in the average. Higher levels weigh
 * more, one GA as much as 2 Betas, 3 Alphas, or 6 Prototypes, so dependable work lifts a Feature more than early work holds it
 * back. Each score sits inside its level's band, so a Feature whose
 * Capabilities are all at one level shows in that level's band. Drafts have
 * neither: they're ideas that may never be built, so they don't count.
 */
export const MATURITY_LEVELS: Record<StabilityLevelId, { score: number; weight: number }> = {
  prototype: { score: 15, weight: 1 },
  alpha: { score: 35, weight: 2 },
  beta: { score: 60, weight: 3 },
  ga: { score: 100, weight: 6 },
};

/**
 * A Feature's maturity from its Capabilities' levels, `null` for a draft:
 * the weighted average of their scores in MATURITY_LEVELS, rounded. Drafts
 * are left out. `null` when none has a level yet, since a Feature shows no
 * maturity until then.
 */
export function featureMaturity(levels: (StabilityLevelId | null)[]): number | null {
  const started = levels.filter((level): level is StabilityLevelId => level !== null);
  if (started.length === 0) return null;
  let total = 0;
  let weights = 0;
  for (const level of started) {
    const { score, weight } = MATURITY_LEVELS[level];
    total += score * weight;
    weights += weight;
  }
  return Math.round(total / weights);
}

/**
 * A project's maturity from its Features' maturities, `null` for one nobody
 * has started on: their weighted average, each Feature weighted as a
 * Capability in its band would be (MATURITY_LEVELS), however many
 * Capabilities it has. Unstarted Features are left out, like drafts. Bugs
 * have no maturity, so leave them out. `null` when no Feature has started.
 */
export function projectMaturity(features: (number | null)[]): number | null {
  const started = features.filter((progress): progress is number => progress !== null);
  if (started.length === 0) return null;
  let total = 0;
  let weights = 0;
  for (const progress of started) {
    const { weight } = MATURITY_LEVELS[maturityBand(progress)];
    total += progress * weight;
    weights += weight;
  }
  return Math.round(total / weights);
}
