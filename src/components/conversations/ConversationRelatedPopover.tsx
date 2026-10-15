import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { DetailsPopover } from "../DetailsPopover";
import { ConversationRelatedDetails } from "./ConversationRelatedDetails";
import type { ConversationRelated } from "./related";

export type ConversationRelatedPopoverProps = {
  /** Everything it's related to, which the popover lists (ConversationRelatedDetails). */
  related: ConversationRelated[];
  /** What opens it: "12 related" by default, or such as "+4 more" after the few shown beside it. */
  label?: ReactNode;
};

/*
 * Everything a conversation is related to, a hover, focus or tap away: a
 * small button, quiet as the caption text around it until it's hovered,
 * that opens ConversationRelatedDetails in a popover, to read, not to
 * change. ConversationRow ends its foot with one, as "+N more", for what
 * doesn't fit on its line.
 */
export function ConversationRelatedPopover({ related, label }: ConversationRelatedPopoverProps) {
  return (
    <DetailsPopover title={<ConversationRelatedDetails related={related} />}>
      <Box
        component="button"
        type="button"
        sx={{
          p: 0,
          border: 0,
          borderRadius: 0.5,
          bgcolor: "transparent",
          font: "inherit",
          typography: "caption",
          fontWeight: 600,
          color: "text.secondary",
          whiteSpace: "nowrap",
          cursor: "pointer",
          "&:hover": { color: "text.primary", textDecoration: "underline" },
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        }}
      >
        {label ?? `${related.length} related`}
      </Box>
    </DetailsPopover>
  );
}
