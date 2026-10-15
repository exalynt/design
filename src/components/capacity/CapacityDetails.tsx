import Box from "@mui/material/Box";
import { CAPACITY_BLOCKS, CAPACITY_DOCS_URL, capacitySize } from "./capacity";
import type { CapacityBlockId } from "./capacity";
import { CapacityFigure } from "./CapacityFigure";
import { DetailsCard, DetailsEyebrow, DetailsLink } from "../DetailsPopover";

export type CapacityDetailsProps = {
  block: CapacityBlockId;
  /** End with a link to Engineering Capacity on readme.exalynt.com, in a new tab. */
  link?: boolean;
  /** Draw the popover's card. `card={false}` leaves it out, for a card of your own. */
  card?: boolean;
};

/*
 * How big a block is, for the client looking at it: its figure, its name,
 * its share of an engineer's capacity, the hours it's comparable to as a sense
 * of size, and that the price is for the block, not hours. Written for
 * someone who doesn't know what a capacity unit is, so it never says "unit". It's the content
 * of CapacityBlock's popover. What a block supports and how it's priced are
 * the readme's, which it links to rather than repeats.
 */
export function CapacityDetails({ block, link = true, card = true }: CapacityDetailsProps) {
  const { name, units, referenceHours } = CAPACITY_BLOCKS[block];
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>Capacity block</DetailsEyebrow>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
        <CapacityFigure units={units} size={64} />
        <Box sx={{ minWidth: 0, lineHeight: 1.3 }}>
          <Box sx={{ fontSize: "1.12em", fontWeight: 700 }}>{name} block</Box>
          <Box sx={{ color: "text.secondary" }}>{capacitySize(units)}</Box>
        </Box>
      </Box>
      <Box sx={{ mt: 1.5 }}>
        Comparable to ~{referenceHours} hours of engineering focus, attention, and effort.
      </Box>
      <Box
        sx={{
          mt: 1.5,
          pt: 1.5,
          borderTop: 1,
          borderColor: "divider",
          fontSize: "0.92em",
          color: "text.secondary",
        }}
      >
        You pay a fixed price for the block, not by the hour. The hours are a guide, not a count:
        each block has a little room for the work to run shorter or longer, within a firm limit we
        don&rsquo;t go past.
      </Box>
      {link ? (
        <DetailsLink href={CAPACITY_DOCS_URL}>How Engineering Capacity works</DetailsLink>
      ) : null}
    </DetailsCard>
  );
}
