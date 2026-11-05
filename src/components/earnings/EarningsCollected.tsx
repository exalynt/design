import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { formatMoney } from "../data-display/money";
import { EarningKind } from "./EarningKind";
import { EarningType } from "./EarningType";
import {
  EARNING_KIND_IDS,
  EARNING_TYPE_IDS,
  earningStatus,
  earningsCount,
  earningsTotal,
  type Earning,
} from "./earnings";

export type EarningsCollectedProps = {
  /** Their earnings. Only what's Earned or Upcoming is counted, not what's gone out. */
  earnings: Earning[];
  /** The Friday it goes out, as the app words it: "Friday, Nov 13". */
  goesOutOn: string;
  /** The day an approval has to land by to go with it: "Sunday, Nov 8". */
  cutoff?: string;
  /** Where it goes, as the app words it: "Chase ••4242". */
  destination?: string;
};

const grid = {
  display: "grid",
  gridTemplateColumns: { xs: "minmax(0, 1fr) auto", sm: "minmax(0, 1fr) auto auto" },
  columnGap: 2,
  rowGap: 0.75,
  alignItems: "baseline",
  pt: 1.5,
  fontSize: 14,
  borderTop: 1,
  borderColor: "divider",
};

const number = { fontVariantNumeric: "tabular-nums", textAlign: "right" };

/* A phone has room for a type's name and amount, and not how many earnings too. */
const count = [number, { display: { xs: "none", sm: "block" }, fontSize: 12.5 }];

/*
 * What someone has earned and not been sent yet, and when it goes out: the total, and
 * what it's made up of by kind and type. What's upcoming sits under it, apart, as it isn't earned.
 * It only adds up: each earning's own why is on its line.
 */
export function EarningsCollected({
  earnings,
  goesOutOn,
  cutoff,
  destination,
}: EarningsCollectedProps) {
  const collected = earnings.filter((earning) => earningStatus(earning) === "earned");
  const upcoming = earnings.filter((earning) => earningStatus(earning) === "upcoming");
  const currency = earnings[0]?.currency;
  const kinds = EARNING_KIND_IDS.flatMap((kind) => {
    const ofKind = collected.filter((earning) => earning.kind === kind);
    const types = EARNING_TYPE_IDS.flatMap((type) => {
      const ofType = ofKind.filter((earning) => earning.type === type);
      return ofType.length ? [{ type, earnings: ofType }] : [];
    });
    return types.length ? [{ kind, types }] : [];
  });

  return (
    <Card sx={{ p: 2 }}>
      <Box sx={{ fontSize: 14, fontWeight: 600, color: "text.secondary" }}>Collected so far</Box>
      <Box
        sx={{
          mt: 1,
          fontSize: 30,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          fontVariantNumeric: "tabular-nums",
          color: "primary.main",
        }}
      >
        {formatMoney(earningsTotal(collected), { currency })}
      </Box>
      <Box sx={{ mt: 0.75, fontSize: 12.5, color: "text.secondary" }}>
        Goes out {goesOutOn}
        {destination ? ` to ${destination}` : ""}.
        {cutoff ? ` Anything approved by ${cutoff} goes with it.` : ""}
      </Box>
      {kinds.length ? (
        <Box sx={[grid, { mt: 2 }]}>
          {kinds.map(({ kind, types }, index) => (
            <Box key={kind} sx={{ display: "contents" }}>
              <Box sx={{ gridColumn: "1 / -1", mt: index ? 1 : 0 }}>
                <EarningKind kind={kind} details />
              </Box>
              {types.map(({ type, earnings: ofType }) => (
                <Box key={type} sx={{ display: "contents" }}>
                  <Box sx={{ minWidth: 0 }}>
                    <EarningType type={type} kind={kind} details />
                  </Box>
                  <Box sx={[...count, { color: "text.secondary" }]}>
                    {earningsCount(ofType.length)}
                  </Box>
                  <Box sx={[number, { fontWeight: 600 }]}>
                    {formatMoney(earningsTotal(ofType), { currency })}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      ) : null}
      {upcoming.length ? (
        <Box sx={[grid, { mt: 1.5, color: "text.secondary" }]}>
          <Box sx={{ minWidth: 0 }}>Upcoming</Box>
          <Box sx={count}>{earningsCount(upcoming.length)}</Box>
          <Box sx={number}>~{formatMoney(earningsTotal(upcoming), { currency })}</Box>
        </Box>
      ) : null}
    </Card>
  );
}
