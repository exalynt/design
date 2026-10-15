import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import type { ReactNode } from "react";
import type { StabilityLevelId } from "../stability/stability";
import { StabilityMark } from "../stability/StabilityMark";
import { Grip } from "../Grip";

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
