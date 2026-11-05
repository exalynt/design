import Box from "@mui/material/Box";
import { CAPACITY_BLOCKS } from "../capacity/capacity";
import { formatMoney } from "../data-display/money";
import {
  EARNING_TYPES,
  earningStatus,
  formatEarningAmount,
  formatEarningShare,
  type Earning,
} from "./earnings";

export type EarningCalculationProps = {
  earning: Earning;
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  gap: 2,
};

const figure = { flex: "none", fontVariantNumeric: "tabular-nums" };

/*
 * How an earning's amount is worked out, as a sum: its payout basis, the share
 * of it, and what that comes to, in its own figures as they were fixed. A sum to
 * check rather than a rate to trust.
 */
export function EarningCalculation({ earning }: EarningCalculationProps) {
  const { currency, basisCents, percentBasisPoints, type } = earning;
  const capacity = earning.kind === "engineering_capacity";
  const source = capacity ? `${CAPACITY_BLOCKS[earning.block].name} block` : `${earning.plan} plan`;

  return (
    <Box sx={{ maxWidth: 420 }}>
      <Box sx={row}>
        <Box sx={{ minWidth: 0 }}>
          {capacity ? "Capacity Payout Basis" : "Operations Payout Basis"}
          <Box sx={{ fontSize: "0.92em", color: "text.secondary" }}>{source}</Box>
        </Box>
        <Box sx={figure}>{formatMoney(basisCents, { currency })}</Box>
      </Box>
      <Box sx={[row, { mt: 0.75 }]}>
        <Box sx={{ minWidth: 0 }}>{EARNING_TYPES[type].shareName}</Box>
        <Box sx={figure}>× {formatEarningShare(percentBasisPoints)}</Box>
      </Box>
      <Box
        sx={[row, { mt: 0.75, pt: 0.75, borderTop: 1, borderColor: "divider", fontWeight: 700 }]}
      >
        <Box sx={{ minWidth: 0 }}>
          {type === "partner_share" ? "Your partnership" : "You"}{" "}
          {earningStatus(earning) === "upcoming" ? "will earn" : "earned"}
        </Box>
        <Box sx={figure}>{formatEarningAmount(earning)}</Box>
      </Box>
    </Box>
  );
}
