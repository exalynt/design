import Box from "@mui/material/Box";
import { DetailsPopover } from "../DetailsPopover";
import { EarningKindDetails } from "./EarningKindDetails";
import { EARNING_KINDS, type EarningKindId } from "./earnings";

export type EarningKindProps = {
  kind: EarningKindId;
  /** Open EarningKindDetails over it on hover, focus, or tap. */
  details?: boolean;
};

/*
 * What was sold, as a section label: small, uppercase, and muted, in words alone. It's
 * what types sit under, so it never looks like EarningType, which is a line's bold
 * name with an icon.
 */
export function EarningKind({ kind, details = false }: EarningKindProps) {
  const label = (
    <Box
      component="span"
      tabIndex={details ? 0 : undefined}
      sx={{
        fontSize: 11.5,
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "text.secondary",
        borderRadius: 0.5,
        cursor: details ? "help" : undefined,
        "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
      }}
    >
      {EARNING_KINDS[kind].name}
    </Box>
  );
  return details ? (
    <DetailsPopover title={<EarningKindDetails kind={kind} />}>{label}</DetailsPopover>
  ) : (
    label
  );
}
