import Box from "@mui/material/Box";
import { CapacityTag } from "../capacity/CapacityTag";
import { DetailsCard, DetailsEyebrow } from "../DetailsPopover";
import { RELATED, groupRelated, type ConversationRelated } from "./related";

export type ConversationRelatedDetailsProps = {
  /** Everything it's related to. */
  related: ConversationRelated[];
  /** Draw the popover's card. `card={false}` leaves it out, for a card of your own. */
  card?: boolean;
};

/*
 * Everything a conversation is related to, to read, not to change: its products,
 * Features, Capabilities, Focuses and blocks of capacity, each under its
 * kind, by the icon it has elsewhere and its whole name, a block as its
 * CapacityTag, under Related. It's the content of ConversationRelatedPopover,
 * as ConversationRow's "+N more" opens it. A
 * long list scrolls within it.
 */
export function ConversationRelatedDetails({
  related,
  card = true,
}: ConversationRelatedDetailsProps) {
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>Related</DetailsEyebrow>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          mt: 1,
          maxHeight: card ? "min(360px, 60vh)" : undefined,
          overflowY: card ? "auto" : undefined,
        }}
      >
        {groupRelated(related).map(({ kind, items }) => {
          const { heading, Icon, color } = RELATED[kind];
          return (
            <Box component="section" key={kind} aria-label={heading}>
              <Box sx={{ mb: 0.5, fontWeight: 600, color: "text.secondary" }}>{heading}</Box>
              <Box
                component="ul"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  m: 0,
                  p: 0,
                  listStyle: "none",
                }}
              >
                {items.map((item, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{ display: "flex", alignItems: "flex-start", gap: 0.75, minWidth: 0 }}
                  >
                    {item.kind === "capacity" ? (
                      <CapacityTag block={item.block} number={item.number} />
                    ) : (
                      <>
                        <Icon aria-hidden sx={{ fontSize: 16, flex: "none", mt: "1px", color }} />
                        <Box component="span" sx={{ minWidth: 0, overflowWrap: "anywhere" }}>
                          {item.name}
                        </Box>
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
    </DetailsCard>
  );
}
