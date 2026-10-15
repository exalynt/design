// Progress: what came of work on a Focus within a block of capacity, told
// in the readme's three forms of value. Capability is doing something new,
// Improvement doing something better, and Clarity deciding. A Capability
// record also says how it changed: added, made more stable, or retired.
// What value is, and why these three, are the readme's to explain
// (PROGRESS_DOCS_URL), so the meanings here are its words, cut short.

export const PROGRESS_KIND_IDS = [
  "capability_added",
  "capability_stabilized",
  "capability_retired",
  "improvement",
  "clarity",
] as const;

export type ProgressKindId = (typeof PROGRESS_KIND_IDS)[number];

export type ProgressKindInfo = {
  id: ProgressKindId;
  /** "More stable": the kind as a record is labelled. */
  name: string;
  /** The readme's form of value it is: Capability, Improvement, or Clarity. */
  form: "Capability" | "Improvement" | "Clarity";
  /** What it means to the client, in a sentence. */
  meaning: string;
};

export const PROGRESS_KINDS: Record<ProgressKindId, ProgressKindInfo> = {
  capability_added: {
    id: "capability_added",
    name: "New capability",
    form: "Capability",
    meaning: "The software can now do something useful it couldn't before.",
  },
  capability_stabilized: {
    id: "capability_stabilized",
    name: "More stable",
    form: "Capability",
    meaning: "Something it already does moved up a stability level, so it can be relied on more.",
  },
  capability_retired: {
    id: "capability_retired",
    name: "Retired",
    form: "Capability",
    meaning:
      "Something was intentionally removed or made simpler, so there's less to use, run, and look after.",
  },
  improvement: {
    id: "improvement",
    name: "Improvement",
    form: "Improvement",
    meaning: "Something it already did is now easier, faster, safer, or more reliable.",
  },
  clarity: {
    id: "clarity",
    name: "Clarity",
    form: "Clarity",
    meaning: "A need is better understood, a question answered, or a direction chosen.",
  },
};

/** What the readme means by value, and the three forms progress is told in. */
export const PROGRESS_DOCS_URL = "https://readme.exalynt.com/clients/what-we-mean-by-value";
