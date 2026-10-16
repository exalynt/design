import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import type { DragEvent, KeyboardEvent, ReactElement, ReactNode } from "react";
import { CAPACITY_BLOCKS, ICON_COLUMN, ICON_GAP, type CapacityBlockId } from "./capacity";
import { CapacityBadge } from "./CapacityBadge";
import { CapacityBlockHeading } from "./CapacityBlockHeading";
import { CapacityDetails } from "./CapacityDetails";
import { CapacityFigure } from "./CapacityFigure";
import type { OrganizationProfile } from "../conversations/ConversationMessage";
import { DetailsPopover } from "../DetailsPopover";
import { OrganizationLogo } from "../OrganizationLogo";

/** Why a block needs someone's attention, from the app. */
export type CapacityAttention = {
  /** The kind of attention, in a word or two: "Unassigned", "Overbooked". */
  label: string;
  /** An icon for that kind, such as PersonOffOutlined for "Unassigned". A warning sign without one. */
  icon?: ReactElement;
  /** Said on hover: what's wrong, and what would fix it. */
  hint?: string;
  /**
   * How pressing it is. `warning`, the default, for something to see to, such
   * as a block nobody's on; `error`, edged and tinted in red, where the block
   * can't go ahead as it's booked, such as overbooking its engineer's week.
   */
  severity?: "warning" | "error";
};

export type CapacityBlockProps = {
  block: CapacityBlockId;
  /** Its number, to refer to it by: "BLK-0042". At the top left, after the handle or lock. */
  number?: string;
  /** What the block is on, under its size: its product and Focus (CapacityPlacement), from the app. */
  children?: ReactNode;
  /**
   * Pinned to the foot over a hairline: who works on it (CapacityEngineer) and
   * when, or the way to schedule it, as CapacityLines so its icons line up
   * with the figure.
   */
  footer?: ReactNode;
  /** At the top right, across from the drag handle or lock: its CapacityStatus. */
  badge?: ReactNode;
  /**
   * The client organization it was bought for, where the organization is what
   * a view is about, such as Exalynt's admin views across clients: its logo and
   * name lead the card, under its number, and the block's type moves to the
   * bottom left, its figure and badge on the icons' axis, opening CapacityDetails. Leave
   * CapacityPlacement's own `organization` out then, so it isn't said twice.
   */
  organization?: OrganizationProfile;
  /**
   * Needs someone to act on it: edged and tinted in warning, or in error with
   * `severity: "error"`, with what kind of attention it needs at the top. One
   * reason at a time, the most pressing.
   */
  attention?: CapacityAttention;
  /** In its week on a schedule: tinted and edged in primary, like a calendar event. */
  scheduled?: boolean;
  /** Picked, to act on it: outlined in primary. */
  selected?: boolean;
  /** The outline of where a block being moved will land: dashed, and does nothing itself. */
  preview?: boolean;
  /** Being dragged away from where it shows. */
  faded?: boolean;
  /** Why it can't be moved yet, said on hover over a lock where the drag handle would be. */
  locked?: string;
  /** Makes the whole card a button. Clicks in `children` and `footer` stay there. */
  onClick?: () => void;
  /** Makes it draggable, with a handle. Put what's being moved on `event.dataTransfer`. */
  onDragStart?: (event: DragEvent<HTMLElement>) => void;
  onDragEnd?: () => void;
  /** What dragging it does, said on the handle, e.g. "Drag onto a week to schedule it." */
  dragHint?: string;
};

const handle = { fontSize: 18, color: "text.secondary" } as const;

/*
 * A capacity block as a card, the same wherever it is: waiting for a week,
 * in its week on a schedule, or being moved, so a block always looks like
 * itself. A top row with its drag handle or lock, its number, and its status, then its
 * heading (CapacityBlockHeading) across the full width, then what the app says
 * it's on and when. Given its organization, the card leads with that instead,
 * its logo and name in the heading's place, and its type, a small figure and
 * its badge, is at the bottom left. One card per block, never one for several.
 */
export function CapacityBlock({
  block,
  number,
  children,
  footer,
  badge,
  organization,
  attention,
  scheduled = false,
  selected = false,
  preview = false,
  faded = false,
  locked,
  onClick,
  onDragStart,
  onDragEnd,
  dragHint,
}: CapacityBlockProps) {
  const highlighted = selected || preview;
  const draggable = !preview && Boolean(onDragStart);
  const clickable = !preview && Boolean(onClick);
  const interactive = draggable || clickable;

  const grip = preview ? (
    <DragIndicatorRoundedIcon sx={handle} />
  ) : draggable ? (
    <Tooltip title={dragHint ?? ""} describeChild>
      <DragIndicatorRoundedIcon sx={handle} />
    </Tooltip>
  ) : locked ? (
    <Tooltip title={locked} describeChild>
      <LockOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
    </Tooltip>
  ) : null;

  return (
    <Box
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-pressed={clickable ? selected : undefined}
      aria-hidden={preview || undefined}
      draggable={draggable}
      onClick={clickable ? onClick : undefined}
      onKeyDown={(event: KeyboardEvent) => {
        if (!clickable || event.target !== event.currentTarget) return;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        onClick?.();
      }}
      onDragStart={(event: DragEvent<HTMLElement>) => {
        event.dataTransfer.effectAllowed = "move";
        onDragStart?.(event);
      }}
      onDragEnd={() => onDragEnd?.()}
      sx={(theme) => {
        const tint = (alpha: number) =>
          `rgba(${theme.vars.palette.primary.mainChannel} / ${alpha})`;
        const tone = attention?.severity ?? "warning";
        const warn = (alpha: number) => `rgba(${theme.vars.palette[tone].mainChannel} / ${alpha})`;
        return {
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
          boxSizing: "border-box",
          p: 1.5,
          textAlign: "left",
          color: "text.primary",
          border: 1,
          borderStyle: preview ? "dashed" : "solid",
          borderRadius: 1,
          borderColor: highlighted
            ? "primary.main"
            : attention
              ? warn(0.6)
              : scheduled
                ? tint(0.4)
                : "divider",
          bgcolor: highlighted
            ? "action.selected"
            : attention
              ? warn(0.1)
              : scheduled
                ? tint(0.14)
                : "background.paper",
          ...(attention
            ? { borderLeft: 4, borderLeftColor: `${tone}.main` }
            : scheduled && { borderLeft: 4, borderLeftColor: "primary.main" }),
          boxShadow: selected ? `inset 0 0 0 1px ${theme.vars.palette.primary.main}` : "none",
          opacity: faded ? 0.4 : 1,
          pointerEvents: preview ? "none" : "auto",
          cursor: draggable ? "grab" : clickable ? "pointer" : locked ? "not-allowed" : "default",
          transition: "border-color 120ms, background-color 120ms, opacity 120ms",
          "&:hover":
            highlighted || !interactive
              ? {}
              : attention
                ? { bgcolor: warn(0.16), borderColor: `${tone}.main` }
                : scheduled
                  ? { bgcolor: tint(0.22), borderColor: "primary.main" }
                  : { borderColor: "text.secondary" },
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        };
      }}
    >
      {/* The handle or lock, its number, what attention it needs, and the status share
          a row of their own above the heading, so none takes width from the heading's
          words. The attention is what's cut short where the row is narrow. */}
      {grip || number || attention || badge ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minHeight: 24 }}>
          {grip}
          {number ? (
            <Box
              component="span"
              sx={{
                flex: "none",
                color: "text.secondary",
                fontSize: 12.5,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {number}
            </Box>
          ) : null}
          {attention ? <Attention {...attention} /> : null}
          {badge ? <Box sx={{ flex: "none", display: "flex", ml: "auto" }}>{badge}</Box> : null}
        </Box>
      ) : null}
      {organization ? (
        <Organization organization={organization} />
      ) : (
        <CapacityBlockHeading block={block} focusable={!preview} />
      )}
      {children || footer ? (
        <Box
          onClick={clickable ? (event) => event.stopPropagation() : undefined}
          onKeyDown={clickable ? (event) => event.stopPropagation() : undefined}
          sx={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }}
        >
          {children}
          {footer ? (
            <Box
              sx={{ mt: "auto", pt: 1, borderTop: 1, borderColor: "divider", cursor: "default" }}
            >
              {footer}
            </Box>
          ) : null}
        </Box>
      ) : null}
      {organization ? <BlockType block={block} focusable={!preview} /> : null}
    </Box>
  );
}

/*
 * The organization a block was bought for, in the heading's place: its logo
 * as wide as the icon column, as the heading's figure is, so it lines up with
 * the icons below, and its name, level with their text, cut short where the
 * card is narrow and in full on hover. It never changes, so it's read-only.
 */
function Organization({ organization }: { organization: OrganizationProfile }) {
  return (
    <Tooltip
      title={`${organization.name}: the organization this block was bought for.`}
      describeChild
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: ICON_GAP,
          minWidth: 0,
          maxWidth: "100%",
        }}
      >
        <OrganizationLogo organization={organization} size={ICON_COLUMN} />
        <Typography
          variant="subtitle1"
          component="span"
          noWrap
          aria-hidden
          sx={{ fontWeight: 700 }}
        >
          {organization.name}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/*
 * The block's type at the foot of a card led by its organization: its figure
 * centred in the icon column, on the axis the icons above share, and its
 * badge level with their text, as one target that opens CapacityDetails.
 */
function BlockType({ block, focusable }: { block: CapacityBlockId; focusable: boolean }) {
  return (
    <DetailsPopover title={<CapacityDetails block={block} />}>
      <Box
        tabIndex={focusable ? 0 : undefined}
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: ICON_GAP,
          mt: "auto",
          borderRadius: 0.5,
          cursor: "help",
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", width: ICON_COLUMN }}>
          <CapacityFigure units={CAPACITY_BLOCKS[block].units} size={ICON_COLUMN} />
        </Box>
        <CapacityBadge block={block} />
      </Box>
    </DetailsPopover>
  );
}

/*
 * What attention a block needs, in warning or error, as the top row's text:
 * its icon and its label, cut short where the row is narrow, and its hint on
 * hover.
 */
function Attention({ label, icon, hint, severity = "warning" }: CapacityAttention) {
  return (
    <Tooltip title={hint ?? label} describeChild>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          minWidth: 0,
          color: `${severity}.main`,
          fontSize: 12.5,
          fontWeight: 600,
          "& .MuiSvgIcon-root": { fontSize: 16, flex: "none" },
        }}
      >
        {icon ?? <WarningAmberRoundedIcon />}
        <Box
          component="span"
          sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {label}
        </Box>
      </Box>
    </Tooltip>
  );
}
