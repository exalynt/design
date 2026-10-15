import { useId } from "react";
import Box from "@mui/material/Box";
import { WEEK_UNITS, clampUnits } from "./capacity";

export type CapacityFigureProps = {
  /** Capacity units, 0 to 4: a Flex block is 1, Core 2, and Dedicated 4. */
  units: number;
  /** Height in px; the figure is half as wide. 48 on a block's card, 80 where it's the point. */
  size?: number;
  /**
   * The filled part's color, as an sx palette path: `primary.main` for a
   * block that's the reader's, `text.secondary` for one they haven't picked.
   */
  color?: string;
};

// A gender-neutral standing figure in a 64 × 128 viewBox, the readme's
// (BlockPortion): a head, and one body shape with connected shoulders,
// straight arms, and two legs. It fills from the feet (BOTTOM) up to the top
// of the head (TOP).
const TOP = 2;
const BOTTOM = 126;
const HEAD = { cx: 32, cy: 12, r: 10 };
const BODY =
  "M8 66 V34 A8 8 0 0 1 16 26 H48 A8 8 0 0 1 56 34 V66 A4.5 4.5 0 0 1 47 66 V36 H45 " +
  "V120 A6 6 0 0 1 33 120 V74 H31 V120 A6 6 0 0 1 19 120 V36 H17 V66 A4.5 4.5 0 0 1 8 66 Z";

/*
 * A share of one engineer's capacity, drawn as one engineer filled from the feet
 * up: a quarter of the figure per capacity unit, so Flex fills to the knees,
 * Core to the waist, and Dedicated the whole person. The same figure the
 * readme pictures blocks with. Decorative: whatever shows it also says the
 * size in words.
 */
export function CapacityFigure({ units, size = 48, color = "primary.main" }: CapacityFigureProps) {
  const clipId = `capacity-figure-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  const y = BOTTOM - (clampUnits(units) / WEEK_UNITS) * (BOTTOM - TOP);
  return (
    <Box
      component="svg"
      viewBox="0 0 64 128"
      aria-hidden
      sx={{ display: "block", flex: "none", width: size / 2, height: size }}
    >
      <defs>
        <clipPath id={clipId}>
          <circle {...HEAD} />
          <path d={BODY} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <Box
          component="rect"
          width="64"
          height="128"
          sx={(theme) => ({
            fill: `color-mix(in srgb, ${theme.vars.palette.text.secondary} 30%, transparent)`,
          })}
        />
        <Box
          component="rect"
          y={y}
          width="64"
          height={128 - y}
          sx={{ color, fill: "currentColor", transition: "color 120ms" }}
        />
      </g>
    </Box>
  );
}
