import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { CAPACITY_BLOCKS, type CapacityBlockId } from "../capacity/capacity";

/** Something a conversation is related to: a product, Feature, Capability or Focus by name, or a block of capacity. */
export type ConversationRelated =
  | { kind: "product" | "feature" | "capability" | "focus"; name: string }
  | { kind: "capacity"; block: CapacityBlockId; number?: string };

export type RelatedKind = ConversationRelated["kind"];

/*
 * Each kind, in the order they show, by the icon it has elsewhere:
 * CapacityPlacement's product and Focus, ProgressFeature's and
 * ProgressCapability's, and the catalog's for blocks of capacity, which
 * only shows where they're counted; one is its CapacityName in a row's
 * foot, and its CapacityTag in ConversationRelatedDetails.
 */
export const RELATED: Record<
  RelatedKind,
  {
    one: string;
    many: string;
    heading: string;
    Icon: ComponentType<SvgIconProps>;
    color: string;
  }
> = {
  product: {
    one: "Product",
    many: "Products",
    heading: "Products",
    Icon: WebAssetOutlinedIcon,
    color: "text.secondary",
  },
  feature: {
    one: "Feature",
    many: "Features",
    heading: "Features",
    Icon: WidgetsOutlinedIcon,
    color: "secondary.main",
  },
  capability: {
    one: "Capability",
    many: "Capabilities",
    heading: "Capabilities",
    Icon: BoltOutlinedIcon,
    color: "primary.main",
  },
  focus: {
    one: "Focus",
    many: "Focuses",
    heading: "Focuses",
    Icon: CenterFocusStrongOutlinedIcon,
    color: "text.secondary",
  },
  capacity: {
    one: "block",
    many: "blocks",
    heading: "Capacity",
    Icon: ViewWeekOutlinedIcon,
    color: "text.secondary",
  },
};

export const relatedName = (item: ConversationRelated) =>
  item.kind === "capacity" ? (item.number ?? CAPACITY_BLOCKS[item.block].name) : item.name;

/* Grouped by kind, in RELATED's order, leaving out the kinds there are none of. */
export function groupRelated(related: ConversationRelated[]) {
  return (Object.keys(RELATED) as RelatedKind[])
    .map((kind) => ({ kind, items: related.filter((item) => item.kind === kind) }))
    .filter(({ items }) => items.length);
}
