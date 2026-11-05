import Box from "@mui/material/Box";
import { DetailsCard, DetailsEyebrow, DetailsLink } from "../DetailsPopover";
import { EarningKind } from "./EarningKind";
import {
  EARNING_KINDS,
  EARNING_TYPES,
  earningTypeDocsUrl,
  earningTypeKinds,
  type EarningKindId,
  type EarningTypeId,
} from "./earnings";

export type EarningTypeDetailsProps = {
  type: EarningTypeId;
  /**
   * The kind it's under here, for a type under more than one, as Team Lead is. Left
   * out, it explains every kind the type goes under.
   */
  kind?: EarningKindId;
  /** End with a link to how this type is paid on readme.exalynt.com, in a new tab. */
  link?: boolean;
  /** Draw the popover's card. `card={false}` leaves it out, for a card of your own. */
  card?: boolean;
};

/*
 * What a type of earning means, for someone who doesn't know: its name, what it pays
 * for and the kind it goes under, and a link to the readme, which has the rates and
 * the rest. A type under more than one kind pays for something different in each, so
 * with no `kind`, it says what it pays for under each. It's the content of
 * EarningType's popover.
 */
export function EarningTypeDetails({
  type,
  kind,
  link = true,
  card = true,
}: EarningTypeDetailsProps) {
  const { name, descriptions } = EARNING_TYPES[type];
  const kinds = kind ? [kind] : earningTypeKinds(type);
  const single = kinds.length === 1;
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>Earning type</DetailsEyebrow>
      <Box sx={{ mt: 1, fontSize: "1.12em", fontWeight: 700 }}>{name}</Box>
      {single ? <Box sx={{ mt: 0.75 }}>{descriptions[kinds[0]]}</Box> : null}
      {kinds.map((under) => (
        <Box key={under} sx={{ mt: 1.5, pt: 1.5, borderTop: 1, borderColor: "divider" }}>
          <EarningKind kind={under} />
          {single ? null : <Box sx={{ mt: 0.5 }}>{descriptions[under]}</Box>}
          <Box sx={{ mt: 0.5, fontSize: "0.92em", color: "text.secondary" }}>
            {EARNING_KINDS[under].description}
          </Box>
        </Box>
      ))}
      {link ? (
        <DetailsLink href={earningTypeDocsUrl(type, single ? kinds[0] : undefined)}>
          How {name} is paid
        </DetailsLink>
      ) : null}
    </DetailsCard>
  );
}
