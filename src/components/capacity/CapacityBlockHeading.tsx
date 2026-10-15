import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  CAPACITY_BLOCKS,
  ICON_COLUMN,
  ICON_GAP,
  capacitySize,
  type CapacityBlockId,
} from "./capacity";
import { CapacityBadge } from "./CapacityBadge";
import { CapacityDetails } from "./CapacityDetails";
import { CapacityFigure } from "./CapacityFigure";
import { DetailsPopover } from "../DetailsPopover";

export type CapacityBlockHeadingProps = {
  block: CapacityBlockId;
  /** Take keyboard focus to open its popover. `false` for a preview, which does nothing. */
  focusable?: boolean;
};

/*
 * The top of a CapacityBlock card: its figure, its badge, and its size in
 * words, as one target that opens CapacityDetails on hover, focus, or tap.
 * It's as wide as what it shows, so the rest of the row stays the card's.
 */
export function CapacityBlockHeading({ block, focusable = true }: CapacityBlockHeadingProps) {
  const { units } = CAPACITY_BLOCKS[block];
  return (
    <DetailsPopover title={<CapacityDetails block={block} />}>
      <Box
        tabIndex={focusable ? 0 : undefined}
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-start",
          gap: ICON_GAP,
          minWidth: 0,
          maxWidth: "100%",
          borderRadius: 0.5,
          cursor: "help",
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        }}
      >
        <CapacityFigure units={units} size={ICON_COLUMN * 2} />
        <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex" }}>
            <CapacityBadge block={block} />
          </Box>
          <Typography variant="caption" component="span" sx={{ color: "text.secondary" }}>
            {capacitySize(units)}
          </Typography>
        </Box>
      </Box>
    </DetailsPopover>
  );
}
