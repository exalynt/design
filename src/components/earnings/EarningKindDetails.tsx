import Box from "@mui/material/Box";
import { DetailsCard, DetailsEyebrow, DetailsLink } from "../DetailsPopover";
import { EARNING_KINDS, EARNING_TYPES, EARNING_TYPE_IDS, type EarningKindId } from "./earnings";

export type EarningKindDetailsProps = {
  kind: EarningKindId;
  /** End with a link to how this kind is paid on readme.exalynt.com, in a new tab. */
  link?: boolean;
  /** Draw the popover's card. `card={false}` leaves it out, for a card of your own. */
  card?: boolean;
};

/*
 * What a kind of earning means, for someone who doesn't know: its name, a few words on
 * what was sold, the types that go under it, and a link to the readme. It's the content
 * of EarningKind's popover.
 */
export function EarningKindDetails({ kind, link = true, card = true }: EarningKindDetailsProps) {
  const { name, description, docsUrl } = EARNING_KINDS[kind];
  const types = EARNING_TYPE_IDS.filter((type) => kind in EARNING_TYPES[type].descriptions);
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>Earning kind</DetailsEyebrow>
      <Box sx={{ mt: 1, fontSize: "1.12em", fontWeight: 700 }}>{name}</Box>
      <Box sx={{ mt: 0.75 }}>{description}</Box>
      <Box
        sx={{
          mt: 1.5,
          pt: 1.5,
          fontSize: "0.92em",
          color: "text.secondary",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        Its types: {types.map((type) => EARNING_TYPES[type].name).join(", ")}.
      </Box>
      {link ? <DetailsLink href={docsUrl}>How {name} is paid</DetailsLink> : null}
    </DetailsCard>
  );
}
