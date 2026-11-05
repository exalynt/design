import Box from "@mui/material/Box";
import { EarningFor } from "./EarningFor";
import { EarningInfo } from "./EarningInfo";
import { EarningKind } from "./EarningKind";
import { EarningStatus } from "./EarningStatus";
import { EarningType } from "./EarningType";
import { earningStatus, formatEarningAmount, type Earning } from "./earnings";

export type EarningLineProps = {
  earning: Earning;
  /** Show how far it's come. Leave it off where its payout says so already. */
  status?: boolean;
  /** Show its kind. Leave it off under a heading that says so already. */
  kind?: boolean;
  /** Show its type. Leave it off under a heading that says so already. */
  type?: boolean;
};

const period = { fontSize: 12.5, color: "text.secondary", whiteSpace: "nowrap" };

/*
 * An earning as a line item, just its facts: its kind, its type and the time it's for,
 * what it's for, its amount, and how far it's come. Why it's that amount is a click
 * away, on EarningInfo's link beside it. On a phone there's no room for that beside the
 * amount, so it goes under it, with the period opposite, and its status gets a row to
 * itself. Put several in a Card or a PayoutStatement: they draw the line between them.
 */
export function EarningLine({
  earning,
  status = true,
  kind = true,
  type = true,
}: EarningLineProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "minmax(0, 1fr) auto", sm: "minmax(0, 1fr) auto auto" },
        gridTemplateAreas: {
          xs: [
            kind && `"kind kind"`,
            `"type amount"`,
            `"period why"`,
            `"source source"`,
            status && `"status status"`,
          ]
            .filter(Boolean)
            .join(" "),
          sm: [
            kind && `"kind kind kind"`,
            `"type why amount"`,
            status ? `"source status status"` : `"source source source"`,
          ]
            .filter(Boolean)
            .join(" "),
        },
        columnGap: 1.5,
        rowGap: 0.75,
        px: 2,
        py: 1.5,
        fontSize: 14,
        lineHeight: 1.45,
        "& + &": { borderTop: 1, borderColor: "divider" },
      }}
    >
      {kind ? (
        <Box sx={{ gridArea: "kind", minWidth: 0 }}>
          <EarningKind kind={earning.kind} details />
        </Box>
      ) : null}
      <Box
        sx={{
          gridArea: "type",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          columnGap: 1,
          minWidth: 0,
        }}
      >
        {type ? <EarningType type={earning.type} kind={earning.kind} details /> : null}
        {/* With no type to go beside, it opens the line at any width. */}
        <Box sx={[period, type ? { display: { xs: "none", sm: "block" } } : {}]}>
          {earning.period}
        </Box>
      </Box>
      {type ? (
        <Box sx={[period, { gridArea: "period", display: { sm: "none" } }]}>{earning.period}</Box>
      ) : null}
      <Box
        sx={{
          gridArea: "why",
          justifySelf: "end",
          alignSelf: "center",
        }}
      >
        <EarningInfo earning={earning} />
      </Box>
      <Box
        sx={{
          gridArea: "amount",
          alignSelf: "center",
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
          textAlign: "right",
          /* Upcoming isn't money yet, so it doesn't read like what's been earned. */
          color: earningStatus(earning) === "upcoming" ? "text.secondary" : undefined,
        }}
      >
        {formatEarningAmount(earning)}
      </Box>
      <Box sx={{ gridArea: "source", minWidth: 0 }}>
        <EarningFor earning={earning} />
      </Box>
      {status ? (
        <Box sx={{ gridArea: "status", minWidth: 0, justifySelf: { xs: "stretch", sm: "end" } }}>
          <EarningStatus earning={earning} inline />
        </Box>
      ) : null}
    </Box>
  );
}
