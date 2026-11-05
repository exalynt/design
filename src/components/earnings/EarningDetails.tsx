import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { DetailsCard, DetailsEyebrow, DetailsLink } from "../DetailsPopover";
import { EarningCalculation } from "./EarningCalculation";
import { EarningFor } from "./EarningFor";
import { EarningKind } from "./EarningKind";
import { EarningStatus } from "./EarningStatus";
import { EarningType } from "./EarningType";
import {
  EARNING_TYPES,
  earningDocsUrl,
  earningReason,
  earningStatus,
  formatEarningAmount,
  type Earning,
} from "./earnings";

export type EarningDetailsProps = {
  earning: Earning;
  /** Draw a popover's card. `card={false}` leaves it out, as EarningInfo's modal does. */
  card?: boolean;
  /** End with a link to how this type is paid on readme.exalynt.com, in a new tab. */
  link?: boolean;
};

/* A part of the details, set off from the one before it by a line and some room. */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>
      <DetailsEyebrow>{title}</DetailsEyebrow>
      <Box sx={{ mt: 1 }}>{children}</Box>
    </Box>
  );
}

/*
 * One earning in full: its facts, what it's for, why the reader is paid it and what
 * that type pays for, and the sum behind the amount. The status keeps its place at
 * any width, with the type and period wrapping beside it. Only ever the
 * reader's own share: never what the block paid anyone else, or what the client paid.
 */
export function EarningDetails({ earning, card = true, link = true }: EarningDetailsProps) {
  const { kind, type, period } = earning;
  const { name, descriptions } = EARNING_TYPES[type];
  return (
    <DetailsCard card={card}>
      <EarningKind kind={kind} details />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          columnGap: 1.5,
          alignItems: "start",
          mt: 0.75,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <EarningType type={type} kind={kind} details />
          <Box sx={{ mt: 0.25, fontSize: "0.92em", color: "text.secondary" }}>{period}</Box>
        </Box>
        <EarningStatus earning={earning} align="end" />
      </Box>
      <Box
        sx={{
          mt: 1.25,
          fontSize: "2em",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
          fontVariantNumeric: "tabular-nums",
          color: earningStatus(earning) === "upcoming" ? "text.secondary" : undefined,
        }}
      >
        {formatEarningAmount(earning)}
      </Box>

      <Section title="What it’s for">
        <EarningFor earning={earning} />
      </Section>

      <Section title="Why it’s paid">
        <Box sx={{ fontWeight: 500 }}>{earningReason(earning)}</Box>
        <Box sx={{ mt: 0.75, fontSize: "0.92em", color: "text.secondary" }}>
          {descriptions[kind]}
        </Box>
      </Section>

      <Section title="How it’s worked out">
        <Box sx={{ p: 1.5, bgcolor: "action.hover", borderRadius: 1 }}>
          <EarningCalculation earning={earning} />
        </Box>
        {link ? <DetailsLink href={earningDocsUrl(earning)}>How {name} is paid</DetailsLink> : null}
      </Section>
    </DetailsCard>
  );
}
