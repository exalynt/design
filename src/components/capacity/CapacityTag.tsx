import Box from "@mui/material/Box";
import { CAPACITY_BLOCKS, type CapacityBlockId } from "./capacity";
import { CapacityBadge } from "./CapacityBadge";
import { CapacityDetails } from "./CapacityDetails";
import { CapacityFigure } from "./CapacityFigure";
import { DetailsPopover } from "../DetailsPopover";

export type CapacityTagProps = {
  block: CapacityBlockId;
  /** Its number after the badge: "BLK-0042". */
  number?: string;
  /** Open CapacityDetails over it on hover, focus, or tap. */
  details?: boolean;
  /**
   * It sits inside a link or button: with `details`, it takes no keyboard
   * focus of its own, and a tap opens its popover rather than the link.
   */
  inLink?: boolean;
};

/*
 * A capacity block named inline, where a card is too much: a 24px figure,
 * its badge, and its number, such as in a byline saying which block a piece
 * of progress came from. CapacityMiniCard starts with one.
 */
export function CapacityTag({ block, number, details = false, inLink = false }: CapacityTagProps) {
  const tag = (
    <Box
      component="span"
      tabIndex={details && !inLink ? 0 : undefined}
      onClick={
        details && inLink
          ? (event) => {
              event.preventDefault();
              event.stopPropagation();
            }
          : undefined
      }
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        flex: "none",
        verticalAlign: "middle",
        borderRadius: 0.5,
        cursor: details ? "help" : undefined,
        "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
      }}
    >
      <CapacityFigure units={CAPACITY_BLOCKS[block].units} size={24} />
      <CapacityBadge block={block} />
      {number ? (
        <Box
          component="span"
          sx={{ color: "text.secondary", fontSize: 12.5, fontVariantNumeric: "tabular-nums" }}
        >
          {number}
        </Box>
      ) : null}
    </Box>
  );
  return details ? (
    <DetailsPopover title={<CapacityDetails block={block} />}>{tag}</DetailsPopover>
  ) : (
    tag
  );
}
