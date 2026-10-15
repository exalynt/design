// Progress: what came of work on a Focus within a block of capacity, told
// in three kinds: Functionality, what the software can do; Improvement, how
// well it works; and Clarity, what we now understand. Any record can be
// about Features and Capabilities, and what it did to a Capability (added,
// made more stable, or retired) is on that Capability, not its kind. The
// readme explains what value is (PROGRESS_DOCS_URL).

export const PROGRESS_KIND_IDS = ["functionality", "improvement", "clarity"] as const;

export type ProgressKindId = (typeof PROGRESS_KIND_IDS)[number];

export type ProgressKindInfo = {
  id: ProgressKindId;
  /** "Functionality": the kind as a record is labelled. */
  name: string;
  /** What it means to the client, in a sentence. */
  meaning: string;
};

export const PROGRESS_KINDS: Record<ProgressKindId, ProgressKindInfo> = {
  functionality: {
    id: "functionality",
    name: "Functionality",
    meaning: "What the software can do: new or intentionally changed behavior that delivers value.",
  },
  improvement: {
    id: "improvement",
    name: "Improvement",
    meaning:
      "How well the software works: existing behavior made faster, easier, more reliable, secure, maintainable, or correct.",
  },
  clarity: {
    id: "clarity",
    name: "Clarity",
    meaning:
      "What we now understand: uncertainty resolved, decisions made, or direction defined so better work can happen.",
  },
};

/** What the readme means by value. */
export const PROGRESS_DOCS_URL = "https://readme.exalynt.com/clients/what-we-mean-by-value";
