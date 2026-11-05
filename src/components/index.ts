// Components for any Exalynt-built app, internal or client. They take every
// color, size and font from the MUI theme they render under, so they look
// like whichever brand that theme is.

export * from "./layout/CalloutPanel";
export * from "./layout/PageHeader";
export * from "./layout/SectionCard";

export * from "./data-display/DateTime";
export * from "./data-display/EmptyState";
export * from "./data-display/StatCard";

export * from "./stability/StabilityBanner";
export * from "./stability/StabilityDetails";
export * from "./stability/StabilityMark";

export * from "./maturity/MaturityDetails";
export * from "./maturity/MaturityRing";

export * from "./catalog/CapabilityCard";
export * from "./catalog/FeatureCard";

export * from "./capacity/CapacityBlock";
export * from "./capacity/CapacityDetails";
export * from "./capacity/CapacityEngineer";
export * from "./capacity/CapacityFigure";
export * from "./capacity/CapacityLine";
export * from "./capacity/CapacityMiniCard";
export * from "./capacity/CapacityName";
export * from "./capacity/CapacityPlacement";
export * from "./capacity/CapacityProgress";
export * from "./capacity/CapacitySchedule";
export * from "./capacity/CapacityStatus";
export * from "./capacity/CapacityTag";

export * from "./earnings/EarningCalculation";
export * from "./earnings/EarningDetails";
export * from "./earnings/EarningFor";
export * from "./earnings/EarningInfo";
export * from "./earnings/EarningKind";
export * from "./earnings/EarningKindDetails";
export * from "./earnings/EarningLine";
export * from "./earnings/EarningStatus";
export * from "./earnings/EarningType";
export * from "./earnings/EarningTypeDetails";
export * from "./earnings/EarningsCollected";
export * from "./earnings/PayoutStatement";

export * from "./progress/ProgressCapability";
export * from "./progress/ProgressCard";
export * from "./progress/ProgressFeature";
export * from "./progress/ProgressKind";
export * from "./progress/ProgressLink";
export * from "./progress/ProgressMedia";
export * from "./progress/ProgressMetric";

export * from "./engineers/EngineerDetails";
export * from "./engineers/TeamLeadChip";
export * from "./engineers/UserAttribution";

export * from "./conversations/ConversationMessage";
export * from "./conversations/ConversationPopout";
export * from "./conversations/ConversationPreview";
export * from "./conversations/ConversationRelatedDetails";
export * from "./conversations/ConversationRelatedPopover";
export * from "./conversations/ConversationRow";
export * from "./conversations/MentionField";
export * from "./conversations/MessageComposer";
export * from "./conversations/TypingIndicator";

export * from "./related/RelatedPanel";

export * from "./focus/FocusCard";
export * from "./focus/FocusPriorityList";

export * from "./filters/FiltersPanel";

export * from "./inputs/DatePickerField";
export * from "./inputs/SearchMultiSelect";
export * from "./inputs/SearchSelect";

export * from "./table";

export * from "./feedback/ToastProvider";

export * from "./actions/ConfirmDialog";
export * from "./actions/ThemeToggle";

// Stability levels and maturity: what each level means, and how maturity is
// worked out from them. The components' own helpers stay internal.
export {
  STABILITY,
  STABILITY_DOCS_URL,
  STABILITY_LEVELS,
  STABILITY_LEVEL_IDS,
  PLANNED,
  stabilityStep,
  type StabilityLevel,
  type StabilityLevelId,
  type StabilityMarkLevel,
} from "./stability/stability";
// Mentions: someone who can be @mentioned, by an id that survives a rename.
// MentionField writes them into a message as `<@id>` and ConversationMessage reads them.
export { type MentionProfile } from "./conversations/mentions";
// Toasts: raised with useToast() under a ToastProvider.
export { useToast, type Toaster } from "./feedback/toast";
// Money: the API's cents, as text for the reader and back.
export { formatMoney, parseMoney, type MoneyOptions } from "./data-display/money";
export {
  HEALTHY_MATURITY,
  MATURITY_BANDS,
  MATURITY_DOCS_URL,
  featureMaturity,
  maturityBand,
  projectMaturity,
} from "./maturity/maturity";

// Capacity blocks: their names and sizes. What capacity is, and how blocks are
// priced, is the readme's (CAPACITY_DOCS_URL).
export {
  CAPACITY_BLOCKS,
  CAPACITY_BLOCK_IDS,
  CAPACITY_DOCS_URL,
  CAPACITY_STATUSES,
  CAPACITY_STATUS_IDS,
  WEEK_UNITS,
  capacitySize,
  type CapacityBlockId,
  type CapacityBlockSize,
  type CapacityStatusId,
} from "./capacity/capacity";

// Earnings: their kinds, types, and statuses, and why each is paid in words. How
// the money works is the readme's (earningDocsUrl).
export {
  EARNING_KINDS,
  EARNING_KIND_IDS,
  EARNING_STATUSES,
  EARNING_STATUS_IDS,
  EARNING_TYPES,
  EARNING_TYPE_IDS,
  earningDocsUrl,
  earningReason,
  earningStatus,
  earningTypeDocsUrl,
  earningTypeKinds,
  earningsTotal,
  formatEarningAmount,
  formatEarningShare,
  type CapacityEarning,
  type Earning,
  type EarningKindId,
  type EarningPayout,
  type EarningStatusId,
  type EarningTypeId,
  type OperationalEarning,
} from "./earnings/earnings";

// Progress: what came of work on a Focus within a block of capacity, in the
// readme's forms of value (PROGRESS_DOCS_URL).
export {
  PROGRESS_DOCS_URL,
  PROGRESS_KINDS,
  PROGRESS_KIND_IDS,
  type ProgressKindId,
  type ProgressKindInfo,
} from "./progress/progress";
