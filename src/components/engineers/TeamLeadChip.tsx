import Chip from "@mui/material/Chip";
import { leadColors } from "./leadColors";
import { TeamLeadIcon } from "./UserAvatar";

export type TeamLeadChipProps = Record<string, never>;

/* A Chip's text and outline in a shade, and a sheen of the metal behind them, as the star's. */
const metal = (shade: string, main: string) => ({
  color: shade,
  borderColor: `color-mix(in srgb, ${shade} 70%, transparent)`,
  backgroundImage: `linear-gradient(135deg, color-mix(in srgb, ${main} 8%, transparent), color-mix(in srgb, ${main} 22%, transparent) 50%, color-mix(in srgb, ${main} 8%, transparent))`,
});

/*
 * "Team Lead" as a small outlined Chip with the blue-silver star, for beside
 * a lead's name. The words and outline are in the lead role's dark, or its
 * main in dark mode, so they hold their contrast on either surface, as
 * TeamLeadLabel's do.
 */
export function TeamLeadChip() {
  return (
    <Chip
      size="small"
      variant="outlined"
      icon={<TeamLeadIcon />}
      label="Team Lead"
      sx={(theme) => {
        const { main, dark } = leadColors(theme);
        return {
          /* The level badge's size and spacing, so the two sit alike beside a name. */
          height: 20,
          fontSize: 11,
          fontWeight: 500,
          verticalAlign: "middle",
          "& .MuiChip-label": { px: "6px" },
          "& .MuiChip-icon": { fontSize: 13, ml: "5px", mr: "-2px" },
          ...metal(dark, main),
          ...theme.applyStyles("dark", metal(main, main)),
        };
      }}
    />
  );
}
