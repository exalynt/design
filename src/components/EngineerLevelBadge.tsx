import Chip from "@mui/material/Chip";
import { DetailsPopover } from "./DetailsPopover";
import { ENGINEER_LEVELS, type EngineerLevelId } from "./engineerLevel";
import { EngineerLevelDetails } from "./EngineerLevelDetails";
import { EngineerLevelSquares } from "./EngineerLevelSquares";

export type EngineerLevelBadgeProps = {
  level: EngineerLevelId;
  /** End the popover with a link to the level on readme.exalynt.com. */
  link?: boolean;
  /**
   * Let the badge take keyboard focus, so its popover opens from the keyboard.
   * Pass `false` inside a button or link, which already takes focus.
   */
  focusable?: boolean;
  /**
   * Open EngineerLevelDetails on hover, focus, or tap. Pass `false` inside
   * something whose own popover already says the level, such as
   * UserAttribution with `details`, so the two don't open together.
   */
  details?: boolean;
};

/*
 * An engineer's level as a small, quiet Chip: a hairline outline, four
 * squares filled to the level, and its name, all in the theme's secondary
 * text color. It's context beside an engineer's name, so it's smaller and
 * quieter than the name, and every level looks alike, so none reads as a better or
 * cheaper deal than another. Hover, focus, or tap opens EngineerLevelDetails.
 */
export function EngineerLevelBadge({
  level,
  link = true,
  focusable = true,
  details = true,
}: EngineerLevelBadgeProps) {
  const chip = (
    <Chip
      size="small"
      icon={<EngineerLevelSquares level={level} />}
      label={ENGINEER_LEVELS[level].name}
      tabIndex={details && focusable ? 0 : undefined}
      variant="outlined"
      sx={{
        borderColor: "divider",
        color: "text.secondary",
        height: 20,
        fontSize: 11,
        fontWeight: 500,
        cursor: details ? "help" : "inherit",
        verticalAlign: "middle",
        "& .MuiChip-label": { px: "6px" },
        "& .MuiChip-icon": { color: "inherit", fontSize: 11, ml: "6px", mr: "-1px" },
        "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
      }}
    />
  );
  if (!details) return chip;
  return (
    <DetailsPopover title={<EngineerLevelDetails level={level} link={link} />}>
      {chip}
    </DetailsPopover>
  );
}
