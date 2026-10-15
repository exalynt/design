import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import type { ReactNode } from "react";
import type { StabilityLevelId } from "../stability/stability";
import { StabilityMark } from "../stability/StabilityMark";

/* A Capability's stability: its short mark, or "Draft" for one nobody has started on. */
export function CapabilityStability({
  name,
  level,
  focusable = true,
}: {
  name: string;
  level: StabilityLevelId | null;
  focusable?: boolean;
}) {
  return level ? (
    <StabilityMark level={level} feature={name} size="short" focusable={focusable} />
  ) : (
    <Box component="span" sx={{ fontSize: 12.5, color: "text.secondary" }}>
      Draft
    </Box>
  );
}

/* The mark on what can be dragged, faint until the row or card is hovered. */
export function Grip() {
  return (
    <Box
      className="grip"
      aria-hidden
      sx={{
        display: "flex",
        flex: "none",
        color: "text.disabled",
        transition: "color 120ms",
      }}
    >
      <DragIndicatorRoundedIcon sx={{ fontSize: 18 }} />
    </Box>
  );
}

/*
 * A Capability's line, as CapabilityCard and each row of a FeatureCard show
 * it: an optional grip, its bolt, its name, cut short on one line, its
 * stability, and the app's actions, such as its menu.
 */
export function CapabilityLabel({
  name,
  level,
  grip = false,
  actions,
}: {
  name: string;
  level: StabilityLevelId | null;
  grip?: boolean;
  actions?: ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
      {grip ? <Grip /> : null}
      <BoltOutlinedIcon sx={{ flex: "none", fontSize: 18, color: "primary.main" }} />
      <Tooltip title={name}>
        <Box
          component="span"
          sx={{
            flex: 1,
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 14,
            lineHeight: "22px",
          }}
        >
          {name}
        </Box>
      </Tooltip>
      <Box sx={{ flex: "none", display: "flex", alignItems: "center", gap: 0.5 }}>
        <CapabilityStability name={name} level={level} />
        {actions}
      </Box>
    </Box>
  );
}
