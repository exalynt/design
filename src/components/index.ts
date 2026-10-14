// Components for any Exalynt-built app, internal or client. They take every
// color, size and font from the MUI theme they render under, so they look
// like whichever brand that theme is.

export * from "./CalloutPanel";
export * from "./CapacityBlock";
export * from "./CapacityDetails";
export * from "./CapacityEngineer";
export * from "./CapacityFigure";
export * from "./CapacityLine";
export * from "./CapacityPlacement";
export * from "./ConfirmDialog";
export * from "./DateTime";
export * from "./EmptyState";
export * from "./EngineerDetails";
export * from "./EngineerLevelBadge";
export * from "./EngineerLevelDetails";
export * from "./MaturityDetails";
export * from "./MaturityRing";
export * from "./PageHeader";
export * from "./SearchMultiSelect";
export * from "./SearchSelect";
export * from "./SectionCard";
export * from "./StabilityBanner";
export * from "./StabilityDetails";
export * from "./StabilityMark";
export * from "./StatCard";
export * from "./ThemeToggle";
export * from "./ToastProvider";
export * from "./table";

// Stability levels and maturity: what each level means, and how maturity is
// worked out from them. The components' own helpers stay internal.
export {
  STABILITY,
  STABILITY_DOCS_URL,
  STABILITY_LEVELS,
  STABILITY_LEVEL_IDS,
  stabilityStep,
  type StabilityLevel,
  type StabilityLevelId,
} from "./stability";
// Engineer levels: their names and what each is trusted with. What the levels
// mean, and how they're set, is the readme's (ENGINEER_LEVEL_DOCS_URL).
export {
  ENGINEER_LEVELS,
  ENGINEER_LEVEL_DOCS_URL,
  ENGINEER_LEVEL_IDS,
  type EngineerLevel,
  type EngineerLevelId,
} from "./engineerLevel";
// Toasts: raised with useToast() under a ToastProvider.
export { useToast, type Toaster } from "./toast";
// Money: the API's cents, as text for the reader and back.
export { formatMoney, parseMoney, type MoneyOptions } from "./money";
export {
  HEALTHY_MATURITY,
  MATURITY_BANDS,
  MATURITY_DOCS_URL,
  featureMaturity,
  maturityBand,
  projectMaturity,
} from "./maturity";

// Capacity blocks: their names and sizes. What capacity is, and how blocks are
// priced, is the readme's (CAPACITY_DOCS_URL).
export {
  CAPACITY_BLOCKS,
  CAPACITY_BLOCK_IDS,
  CAPACITY_DOCS_URL,
  WEEK_UNITS,
  capacitySize,
  type CapacityBlockId,
  type CapacityBlockSize,
} from "./capacity";
