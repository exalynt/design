// Exalynt's engineer levels: Associate, Mid, Senior, and Principal. The names
// and what each level leads are defined here, and the readme installs this
// package to show them, as it does the stability levels. What the levels mean, how they're set, and how someone grows
// between them are the readme's to explain (ENGINEER_LEVEL_DOCS_URL), and the
// Engineer Share each one sets is for engineers, so none of that is here.

export const ENGINEER_LEVEL_IDS = ["associate", "mid", "senior", "principal"] as const;

export type EngineerLevelId = (typeof ENGINEER_LEVEL_IDS)[number];

export type EngineerLevel = {
  id: EngineerLevelId;
  /** "Senior"; an engineer is "a Senior engineer" in running text. */
  name: string;
  /** The kinds of problems an engineer at this level leads, as a strength. */
  summary: string;
};

export const ENGINEER_LEVELS: Record<EngineerLevelId, EngineerLevel> = {
  associate: {
    id: "associate",
    name: "Associate",
    summary: "Delivers well-defined features with care, backed by reviews that keep quality high.",
  },
  mid: {
    id: "mid",
    name: "Mid",
    summary: "Delivers scoped features independently, raising risks and tradeoffs early.",
  },
  senior: {
    id: "senior",
    name: "Senior",
    summary: "Leads ambiguous problems, shaping the work itself and guiding other engineers.",
  },
  principal: {
    id: "principal",
    name: "Principal",
    summary: "Sets technical direction for complex, open-ended work across engagements.",
  },
};

/** The level's position, 1 (Associate) to 4 (Principal): how many of its squares are filled. */
export function engineerLevelStep(id: EngineerLevelId): number {
  return ENGINEER_LEVEL_IDS.indexOf(id) + 1;
}

/** Where each level is explained; the popover links to `${ENGINEER_LEVEL_DOCS_URL}#<id>`. */
export const ENGINEER_LEVEL_DOCS_URL = "https://readme.exalynt.com/engineers/levels-and-growth";
