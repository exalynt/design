import Box from "@mui/material/Box";
import { STABILITY_LEVEL_IDS, stabilityStep, type StabilityLevelId } from "./stability";

/*
 * The Track: four cells, one per level from Prototype to GA, lit up to
 * `level` in the current text color, so whatever sets the level's color sets
 * the Track's. Sized in em, so it scales with the text around it: 4px cells
 * next to 12px text. Decorative: the mark around it carries the name.
 */
export function StabilityTrack({ level }: { level: StabilityLevelId }) {
  const step = stabilityStep(level);
  return (
    <Box
      component="span"
      aria-hidden
      sx={{ display: "inline-flex", flex: "none", gap: "0.0833em", verticalAlign: "middle" }}
    >
      {STABILITY_LEVEL_IDS.map((id, index) => (
        <Box
          key={id}
          component="span"
          sx={{
            width: "0.3333em",
            height: "0.3333em",
            borderRadius: "0.0833em",
            bgcolor: index < step ? "currentColor" : "divider",
          }}
        />
      ))}
    </Box>
  );
}
