import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import TimelapseRoundedIcon from "@mui/icons-material/TimelapseRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import { CAPACITY_STATUSES, type CapacityStatusId } from "./capacity";

export type CapacityStatusProps = {
  status: CapacityStatusId;
  /** Just the icon, with the word on hover and for assistive tech, where a card is narrow. */
  iconOnly?: boolean;
};

/*
 * In progress's violet: with Stability's colors, the one other place in
 * src/components/ with colors of its own rather than palette roles. No role
 * is free for it: a theme's primary and info are often the same blue, which
 * Scheduled has, warning is CapacityBlock's `attention`, success is
 * Fulfilled, and error would read as a fault. `light` clears 6.5:1 on white
 * and on Exalynt's page background, and `dark` 6:1 on dark surfaces.
 */
const IN_PROGRESS = { light: "#6d28d9", dark: "#a78bfa" };

/* Each status's icon and color: a palette role, or In progress's own violet. */
const LOOK: Record<
  CapacityStatusId,
  { Icon: SvgIconComponent; color: "default" | "info" | "violet" | "success" }
> = {
  available: { Icon: RadioButtonUncheckedRoundedIcon, color: "default" },
  scheduled: { Icon: EventRoundedIcon, color: "info" },
  in_progress: { Icon: TimelapseRoundedIcon, color: "violet" },
  fulfilled: { Icon: CheckCircleRoundedIcon, color: "success" },
};

/* The violet as a Chip's text, icon, and outline, which MUI's own colors draw at 70%. */
const violet = (shade: string) => ({
  color: shade,
  borderColor: `color-mix(in srgb, ${shade} 70%, transparent)`,
  "& .MuiChip-icon": { fontSize: 16, ml: "6px", color: shade },
});

/*
 * A block's status, for CapacityBlock's `badge`: its icon and its word as a
 * small outlined Chip, or, with `iconOnly`, the icon alone in the same color.
 */
export function CapacityStatus({ status, iconOnly = false }: CapacityStatusProps) {
  const { Icon, color } = LOOK[status];
  const { name } = CAPACITY_STATUSES[status];
  if (iconOnly) {
    return (
      <Tooltip title={name} enterTouchDelay={0} leaveTouchDelay={3000}>
        <Box
          component="span"
          role="img"
          aria-label={name}
          sx={(theme) => ({
            display: "inline-flex",
            ...(color === "violet"
              ? {
                  color: IN_PROGRESS.light,
                  ...theme.applyStyles("dark", { color: IN_PROGRESS.dark }),
                }
              : {
                  color:
                    color === "default"
                      ? theme.vars.palette.text.secondary
                      : theme.vars.palette[color].main,
                }),
          })}
        >
          <Icon sx={{ fontSize: 18 }} />
        </Box>
      </Tooltip>
    );
  }
  return (
    <Chip
      size="small"
      variant="outlined"
      color={color === "violet" ? "default" : color}
      icon={<Icon />}
      label={name}
      sx={(theme) => ({
        "& .MuiChip-icon": { fontSize: 16, ml: "6px" },
        ...(color === "violet" && {
          ...violet(IN_PROGRESS.light),
          ...theme.applyStyles("dark", violet(IN_PROGRESS.dark)),
        }),
      })}
    />
  );
}
