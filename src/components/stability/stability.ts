import type { Theme } from "@mui/material/styles";

// Exalynt stability levels: Prototype, Alpha, Beta, and GA. Each level sets
// the expectation for how stable something is, for the people who use it and
// the engineers who build on it. The wording and colors are defined here, and
// the readme installs this package to show them; what the levels mean, and
// how work moves between them, is explained there (STABILITY_DOCS_URL).

export const STABILITY_LEVEL_IDS = ["prototype", "alpha", "beta", "ga"] as const;

export type StabilityLevelId = (typeof STABILITY_LEVEL_IDS)[number];

export type StabilityLevel = {
  id: StabilityLevelId;
  /** Short name shown on marks, e.g. "GA". */
  name: string;
  /** Name in running text and the popover, e.g. "General Availability". */
  fullName: string;
  /** How stable it is, in a word or two, e.g. "Refining". The extra-long mark and the popover show it. */
  stability: string;
  /** One-sentence definition, used in tooltips and the glossary. */
  summary: string;
  /** How much it will change. */
  changes: string;
  /** What to expect from bugs. */
  bugs: string;
  /** What people using it can expect, and rely on it for. */
  forUsers: string;
  /** What engineers building on it can expect. */
  forEngineers: string;
  /**
   * The stability palette: pewter, rose, blue, and green, the one place in
   * src/components/ with colors of its own rather than palette roles. They're
   * part of what a level is, so they look the same under every theme. `light`
   * is for light surfaces and clears 4.5:1 on white and on Exalynt's page
   * background, but not on tinted surfaces; `dark` clears 6:1 on dark ones.
   * Prototype's pewter is kept apart from body-text grey, so it reads as a
   * level, not as muted text.
   */
  colors: { light: string; dark: string };
  /** GitHub label for issues and pull requests that target this level. */
  label: { name: string; color: string; description: string };
};

export const STABILITY: Record<StabilityLevelId, StabilityLevel> = {
  prototype: {
    id: "prototype",
    name: "Prototype",
    fullName: "Prototype",
    stability: "Exploring",
    summary:
      "Explores an idea so we can choose a direction. Its data may be fake, and it may change completely or be thrown away.",
    changes: "Anything can change, or it may be thrown away.",
    bugs: "Only what's being shown is expected to work, and its data may be fake.",
    forUsers:
      "React to it and help choose the direction. Don't use it for real work, or trust the data it shows.",
    forEngineers: "Don't build on it. Expect it to be rewritten.",
    colors: { light: "#6d6a7c", dark: "#aeabbe" },
    label: {
      name: "stability: prototype",
      color: "6d6a7c",
      description: "Prototype: exploring an idea; expect it to change completely or be thrown away",
    },
  },
  alpha: {
    id: "alpha",
    name: "Alpha",
    fullName: "Alpha",
    stability: "Developing",
    summary: "Works, but is still taking shape. Expect frequent breaking changes and bugs.",
    changes: "Frequent breaking changes, sometimes without notice.",
    bugs: "Expected, even in the main workflow.",
    forUsers:
      "Try it with real work and share feedback. Keep your current way of working as a fallback.",
    forEngineers: "Build on it only to experiment. Expect its interfaces to change.",
    colors: { light: "#9c4f6c", dark: "#de9cb6" },
    label: {
      name: "stability: alpha",
      color: "9c4f6c",
      description: "Alpha: works but still taking shape; expect frequent breaking changes and bugs",
    },
  },
  beta: {
    id: "beta",
    name: "Beta",
    fullName: "Beta",
    stability: "Refining",
    summary:
      "Settled enough for real use. Breaking changes and bugs are occasional. We aim to announce breaking changes ahead of time, but can't always.",
    changes: "Occasional breaking changes, announced ahead of time when we can.",
    bugs: "Occasional, mostly at the edges, and fixed as they're found.",
    forUsers: "Use it for real work, with a fallback for anything critical.",
    forEngineers: "Build on it, and watch for changes. We aim to announce them ahead of time.",
    colors: { light: "#3f6f88", dark: "#8ab4cc" },
    label: {
      name: "stability: beta",
      color: "3f6f88",
      description:
        "Beta: refining; occasional breaking changes, announced ahead of time when we can",
    },
  },
  ga: {
    id: "ga",
    name: "GA",
    fullName: "General Availability",
    stability: "Stable",
    summary:
      "Generally available and stable. It keeps working as it does today; breaking changes only come in a new version.",
    changes: "No breaking changes to this version. They come in a new version.",
    bugs: "Rare, and fixed first.",
    forUsers: "Depend on it, including for business-critical work.",
    forEngineers: "Build on it freely. Its interfaces are stable and versioned.",
    colors: { light: "#4c7a58", dark: "#94bd9f" },
    label: {
      name: "stability: ga",
      color: "4c7a58",
      description: "GA: generally available and stable; breaking changes only in a new version",
    },
  },
};

export const STABILITY_LEVELS: StabilityLevel[] = STABILITY_LEVEL_IDS.map((id) => STABILITY[id]);

/** The level's position, 1 (Prototype) to 4 (GA). */
export function stabilityStep(id: StabilityLevelId): number {
  return STABILITY_LEVEL_IDS.indexOf(id) + 1;
}

/** Where each level is explained; the popover links to `${STABILITY_DOCS_URL}#stability-<id>`. */
export const STABILITY_DOCS_URL = "https://readme.exalynt.com/how-it-works/stability-levels";

/** A level's color as the text color, in the shade for the color scheme it's in. */
export function levelColor(id: StabilityLevelId) {
  const { light, dark } = STABILITY[id].colors;
  return (theme: Theme) => ({ color: light, ...theme.applyStyles("dark", { color: dark }) });
}
