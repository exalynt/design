import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import { levelColor, STABILITY, type StabilityLevelId } from "../stability/stability";
import { StabilityMark } from "../stability/StabilityMark";

export type ProgressCapabilityProps = {
  /** The Capability's name: "Sign for a delivery". */
  name: string;
  /**
   * What the progress did to it: `added` at `level`, `stabilized` from `from`
   * to `level`, or `retired`. Left out, the progress was only about it, such
   * as an Improvement to it or Clarity on it, and it shows at `level`.
   */
  change?: "added" | "stabilized" | "retired";
  /** Its level now: the one it was added at, reached, or is at. */
  level?: StabilityLevelId;
  /** Where a `stabilized` Capability was before. */
  from?: StabilityLevelId;
};

const CHANGES = { added: "New", stabilized: "More stable", retired: "Retired" };

/*
 * One Capability a record of progress touched, as a small outlined card
 * that sits beside others: its icon, its name, and its level as a short
 * stability mark, or for one made more stable its old level, faded, to its
 * new. What the progress did to it is in its outline, with the change named
 * in the outline's top edge: New in primary, Reached and the level it
 * reached in that level's color, such as Reached Alpha (More stable, where
 * no `level` is given), and Retired dashed and muted, its name struck
 * through. One it was only about has the plain outline. The name is cut
 * short before the marks are, and says itself in full on hover. A reached
 * Capability's marks don't say it's in either level, since the record is
 * of it moving.
 */
export function ProgressCapability({ name, change, level, from }: ProgressCapabilityProps) {
  const retired = change === "retired";
  return (
    <Box
      sx={[
        {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          px: 1.25,
          py: 0.75,
          border: 1,
          borderStyle: retired ? "dashed" : "solid",
          borderRadius: 1,
          bgcolor: "background.paper",
          /* The outline takes the change's color, set as the text color below. */
          borderColor: change ? "currentColor" : "divider",
          color: change === "added" ? "primary.main" : "text.secondary",
        },
        change === "stabilized" && level ? levelColor(level) : false,
      ]}
    >
      {change ? (
        <Box
          component="span"
          sx={{
            position: "absolute",
            top: 0,
            left: 8,
            transform: "translateY(-50%)",
            px: 0.5,
            bgcolor: "background.paper",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.04em",
            lineHeight: 1,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {change === "stabilized" && level ? `Reached ${STABILITY[level].name}` : CHANGES[change]}
        </Box>
      ) : null}
      <BoltOutlinedIcon
        sx={{ fontSize: 16, flex: "none", color: retired ? "text.secondary" : "primary.main" }}
      />
      <Tooltip title={name}>
        <Box
          component="span"
          sx={{
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 14,
            color: retired ? "text.secondary" : "text.primary",
            textDecoration: retired ? "line-through" : undefined,
          }}
        >
          {name}
        </Box>
      </Tooltip>
      {change === "stabilized" && from && level ? (
        <Box
          component="span"
          sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, flex: "none" }}
        >
          <Box component="span" sx={{ display: "inline-flex", opacity: 0.55 }}>
            <StabilityMark level={from} feature={name} size="short" statement={false} />
          </Box>
          <ArrowForwardRoundedIcon sx={{ fontSize: 13, color: "text.secondary" }} />
          <StabilityMark level={level} feature={name} size="short" statement={false} />
        </Box>
      ) : level && !retired ? (
        <StabilityMark level={level} feature={name} size="short" />
      ) : null}
    </Box>
  );
}
