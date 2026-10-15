import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { useId, type ReactNode } from "react";
import { CAPACITY_BLOCKS, type CapacityBlockId } from "../capacity/capacity";
import { CapacityTag } from "../capacity/CapacityTag";
import { CapabilityStability } from "../catalog/CapabilityLabel";
import type { StabilityLevelId } from "../stability/stability";

type RelatedBase = {
  /** Keeps its row, and tells `onRemove` which it was. */
  id: string;
  /**
   * Its own page: the row links there. Rendered with the theme's
   * LinkComponent, so an app's router link works where its theme sets one on
   * MuiButtonBase.
   */
  href?: string;
};

export type RelatedItem =
  | (RelatedBase & { kind: "product" | "focus" | "feature"; name: string })
  | (RelatedBase & {
      kind: "capability";
      name: string;
      /** Its stability, or null for a draft. */
      level: StabilityLevelId | null;
    })
  | (RelatedBase & {
      kind: "capacity";
      block: CapacityBlockId;
      /** Its number, to refer to it by: "BLK-0042". */
      number?: string;
      /** When it's worked on, as the app words it: "Week of Oct 5". */
      week?: string;
    });

export type RelatedKind = RelatedItem["kind"];

export type RelatedPanelProps = {
  /** What it's related to, in any order: they're grouped by kind. */
  items: RelatedItem[];
  /** Its heading. */
  title?: ReactNode;
  /** A line under the heading on what belongs here, and who adds to it. */
  description?: ReactNode;
  /** What its empty state says when there's nothing yet: "Nothing related yet". */
  empty?: ReactNode;
  /**
   * What the reader can add here, and how. Add shows in its header for the
   * `kinds` given, in any order, and `onAdd` answers it with the app's
   * picker of those kinds alone, handed the button to anchor a popover to.
   * Without it, or with no `kinds`, nothing can be added.
   */
  add?: { kinds: RelatedKind[]; onAdd: (anchor: HTMLElement) => void };
  /**
   * Shows a remove button on each row, which hands the app the item. Without
   * it, nothing can be removed. Confirming, if it's wanted, is the app's.
   */
  onRemove?: (item: RelatedItem) => void;
};

/* Each kind's section, in the order they're shown: broadest first, then the capacity that went to them. */
const KINDS: {
  kind: RelatedKind;
  label: string;
  /** One of it, for saying what can be added: "a Feature". */
  one: string;
  Icon?: SvgIconComponent;
  color?: string;
}[] = [
  {
    kind: "product",
    label: "Products",
    one: "Product",
    Icon: WebAssetOutlinedIcon,
    color: "text.secondary",
  },
  {
    kind: "focus",
    label: "Focuses",
    one: "Focus",
    Icon: CenterFocusStrongOutlinedIcon,
    color: "text.secondary",
  },
  {
    kind: "feature",
    label: "Features",
    one: "Feature",
    Icon: WidgetsOutlinedIcon,
    color: "secondary.main",
  },
  {
    kind: "capability",
    label: "Capabilities",
    one: "Capability",
    Icon: BoltOutlinedIcon,
    color: "primary.main",
  },
  { kind: "capacity", label: "Capacity", one: "capacity block" },
];

/* The kinds that can be added, in the panel's order, as a phrase: "a Feature or Capability". */
function addable(kinds: RelatedKind[]) {
  const words = KINDS.filter(({ kind }) => kinds.includes(kind)).map(({ one }) => one);
  if (words.length < 3) return `a ${words.join(" or ")}`;
  return `a ${words.slice(0, -1).join(", ")}, or ${words.at(-1)}`;
}

/* What a row is called, for its remove button. */
function nameOf(item: RelatedItem) {
  if (item.kind !== "capacity") return item.name;
  return item.number ?? `${CAPACITY_BLOCKS[item.block].name} block`;
}

const cut = {
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
} as const;

/* A row's icon, name, and whatever follows it, such as a Capability's stability. */
function Content({ item, linked }: { item: RelatedItem; linked: boolean }) {
  if (item.kind === "capacity") {
    return (
      <>
        <CapacityTag block={item.block} number={item.number} details inLink={linked} />
        {item.week ? (
          <Tooltip title={item.week}>
            <Box
              component="span"
              sx={{ ...cut, ml: "auto", pl: 1, fontSize: 12.5, color: "text.secondary" }}
            >
              {item.week}
            </Box>
          </Tooltip>
        ) : null}
      </>
    );
  }
  const { Icon, color } = KINDS.find(({ kind }) => kind === item.kind)!;
  return (
    <>
      {Icon ? <Icon aria-hidden sx={{ flex: "none", fontSize: 18, color }} /> : null}
      <Tooltip title={item.name}>
        <Box
          component="span"
          className="name"
          sx={{ ...cut, flex: 1, fontSize: 14, lineHeight: "20px" }}
        >
          {item.name}
        </Box>
      </Tooltip>
      {item.kind === "capability" ? (
        <Box component="span" sx={{ flex: "none", display: "flex", alignItems: "center" }}>
          <CapabilityStability name={item.name} level={item.level} focusable={!linked} />
        </Box>
      ) : null}
    </>
  );
}

const row = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  flex: 1,
  minWidth: 0,
  px: 1,
  py: 1,
  textAlign: "left",
  color: "text.primary",
  borderRadius: 1,
} as const;

function Row({ item, onRemove }: { item: RelatedItem; onRemove?: (item: RelatedItem) => void }) {
  const linked = Boolean(item.href);
  const content = <Content item={item} linked={linked} />;
  return (
    <Box
      component="li"
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: 1,
        transition: "background-color 120ms",
        "&:hover": { bgcolor: "action.hover" },
        /* The remove button shows on the row's hover or focus, and always where nothing hovers. */
        "& .remove": { opacity: 0, transition: "opacity 120ms" },
        "&:hover .remove, &:focus-within .remove": { opacity: 1 },
        "@media (hover: none)": { "& .remove": { opacity: 1 } },
      }}
    >
      {item.href ? (
        <ButtonBase
          href={item.href}
          sx={{
            ...row,
            justifyContent: "flex-start",
            "&:hover .name": { textDecoration: "underline" },
            "&.Mui-focusVisible": { outline: 2, outlineColor: "primary.main", outlineOffset: -2 },
          }}
        >
          {content}
        </ButtonBase>
      ) : (
        <Box sx={row}>{content}</Box>
      )}
      {onRemove ? (
        <Tooltip title="Remove">
          <IconButton
            className="remove"
            size="small"
            aria-label={`Remove ${nameOf(item)}`}
            onClick={() => onRemove(item)}
            sx={{ flex: "none", mr: 0.5 }}
          >
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
}

/*
 * What something is related to, such as the Products, Focuses, Features,
 * Capabilities, and capacity a conversation or a Focus is about, as a card
 * for a side column: its heading, with Add where the reader can add to it,
 * a line on what belongs here, then a section per kind it has, broadest
 * first, leaving out any kind it has none of. Each row is one line: the
 * thing's icon and name, cut short with the whole name on hover, a
 * Capability's stability, and a capacity block's tag and week; `href`
 * makes a row a link to its page. Add offers only the kinds `add` names,
 * since what belongs depends on where it is. With nothing yet, it says so
 * in a dashed outline, and where the reader can add, what. Where the
 * reader can remove them, each row's remove button shows on its hover or
 * focus. The same card read-only, without `add` and `onRemove`, is how
 * someone who can't change it sees it.
 */
export function RelatedPanel({
  items,
  title = "Related",
  description,
  empty = "Nothing related yet",
  add,
  onRemove,
}: RelatedPanelProps) {
  const titleId = useId();
  const canAdd = Boolean(add?.kinds.length);
  return (
    <Card component="section" aria-labelledby={titleId} sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minHeight: 30 }}>
        <Box
          component="h2"
          id={titleId}
          sx={{ m: 0, flex: 1, minWidth: 0, typography: "subtitle1", fontWeight: 700 }}
        >
          {title}
        </Box>
        {add && canAdd ? (
          <Button
            size="small"
            startIcon={<AddRoundedIcon />}
            onClick={(event) => add.onAdd(event.currentTarget)}
            sx={{ mr: -0.75, flex: "none" }}
          >
            Add
          </Button>
        ) : null}
      </Box>
      {description ? (
        <Box sx={{ mt: 0.5, fontSize: 13, lineHeight: 1.5, color: "text.secondary" }}>
          {description}
        </Box>
      ) : null}
      {items.length ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 1.5 }}>
          {KINDS.map(({ kind, label }) => {
            const ofKind = items.filter((item) => item.kind === kind);
            if (!ofKind.length) return null;
            return (
              <Box component="section" key={kind} aria-label={label}>
                <Box sx={{ mb: 0.25, fontSize: 12.5, fontWeight: 600, color: "text.secondary" }}>
                  {label}
                </Box>
                <Box component="ul" sx={{ m: 0, mx: -1, p: 0, listStyle: "none" }}>
                  {ofKind.map((item) => (
                    <Row key={`${item.kind}:${item.id}`} item={item} onRemove={onRemove} />
                  ))}
                </Box>
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            mt: 1.5,
            px: 2,
            py: 2.5,
            border: 1,
            borderStyle: "dashed",
            borderColor: "divider",
            borderRadius: 1,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <HubOutlinedIcon aria-hidden sx={{ fontSize: 24, mb: 0.5, opacity: 0.6 }} />
          <Box sx={{ fontSize: 14, fontWeight: 600 }}>{empty}</Box>
          {add && canAdd ? (
            <Box sx={{ fontSize: 13, lineHeight: 1.5 }}>Use Add to link {addable(add.kinds)}.</Box>
          ) : null}
        </Box>
      )}
    </Card>
  );
}
