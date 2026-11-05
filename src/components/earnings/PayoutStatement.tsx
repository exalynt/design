import { useState, type ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ScheduleSendRoundedIcon from "@mui/icons-material/ScheduleSendRounded";
import { formatMoney } from "../data-display/money";
import { EarningKind } from "./EarningKind";
import { EarningLine } from "./EarningLine";
import { EarningType } from "./EarningType";
import {
  EARNING_KIND_IDS,
  EARNING_TYPE_IDS,
  earningsCount,
  earningsTotal,
  type Earning,
  type EarningKindId,
} from "./earnings";

export type PayoutStatementProps = {
  /** When it was sent, as the app words it: "Friday, Oct 30". */
  sentOn: string;
  /** Sent until it arrives, then Paid, or Failed if it's returned. */
  status: "sent" | "paid" | "failed";
  /** Where it went, as the app words it: "Chase ••4242". */
  destination: string;
  /** The earnings it pays out. */
  earnings: Earning[];
  /** Why it failed and where its earnings went, links included. */
  failure?: ReactNode;
  /**
   * How its lines are arranged under their kinds: all in view, for reading through
   * it, or as subtotals by type that open to their lines, for many small lines.
   */
  groupBy?: "kind" | "type";
};

/* Some earnings in the order their types are listed. */
function byType(earnings: Earning[]) {
  return [...earnings].sort(
    (a, b) => EARNING_TYPE_IDS.indexOf(a.type) - EARNING_TYPE_IDS.indexOf(b.type),
  );
}

/* A payout's own state, which is more than its earnings say. */
const PAYOUT_STATES = {
  sent: {
    label: "Sent",
    color: "info",
    Icon: ScheduleSendRoundedIcon,
    description: "This payout has gone out and hasn't arrived yet.",
  },
  paid: {
    label: "Paid",
    color: "success",
    Icon: CheckCircleRoundedIcon,
    description: "This payout arrived.",
  },
  failed: {
    label: "Failed",
    color: "error",
    Icon: ErrorOutlineRoundedIcon,
    description: "This payout was returned, so its earnings go out again in a new one.",
  },
} as const;

/* A type's subtotal, which opens to its lines. They leave off the type it says. */
function TypeGroup({ earnings, currency }: { earnings: Earning[]; currency?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ borderTop: 1, borderColor: "divider" }}>
      <ButtonBase
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
          px: 2,
          py: 1,
          fontSize: 14,
          lineHeight: 1.45,
          textAlign: "left",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            columnGap: 1,
            minWidth: 0,
          }}
        >
          <EarningType type={earnings[0].type} kind={earnings[0].kind} details inLink />
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.25,
              fontSize: 12.5,
              color: "text.secondary",
              whiteSpace: "nowrap",
            }}
          >
            {earningsCount(earnings.length)}
            <ExpandMoreRoundedIcon
              sx={{
                fontSize: 20,
                transform: open ? "rotate(180deg)" : undefined,
                transition: (theme) => theme.transitions.create("transform"),
              }}
            />
          </Box>
        </Box>
        <Box sx={{ flex: "none", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
          {formatMoney(earningsTotal(earnings), { currency })}
        </Box>
      </ButtonBase>
      <Collapse in={open}>
        <Box sx={{ borderTop: 1, borderColor: "divider" }}>
          {earnings.map((earning) => (
            <EarningLine
              key={earning.id}
              earning={earning}
              kind={false}
              type={false}
              status={false}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}

/* A kind's band and subtotal, then its lines, or with `groupBy="type"`, its types. */
function KindSection({
  kind,
  earnings,
  groupBy,
  currency,
}: {
  kind: EarningKindId;
  earnings: Earning[];
  groupBy: PayoutStatementProps["groupBy"];
  currency?: string;
}) {
  const sorted = byType(earnings);
  const types = EARNING_TYPE_IDS.flatMap((type) => {
    const ofType = sorted.filter((earning) => earning.type === type);
    return ofType.length ? [{ type, earnings: ofType }] : [];
  });
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          px: 2,
          py: 1,
          fontSize: 14,
          bgcolor: "action.hover",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <EarningKind kind={kind} details />
        <Box sx={{ flex: "none", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
          {formatMoney(earningsTotal(earnings), { currency })}
        </Box>
      </Box>
      {groupBy === "type" ? (
        types.map(({ type, earnings: ofType }) => (
          <TypeGroup key={type} earnings={ofType} currency={currency} />
        ))
      ) : (
        <Box sx={{ borderTop: 1, borderColor: "divider" }}>
          {sorted.map((earning) => (
            <EarningLine key={earning.id} earning={earning} kind={false} status={false} />
          ))}
        </Box>
      )}
    </Box>
  );
}

/*
 * A payout read as a pay statement: how much, where it went, and whether it arrived,
 * then every earning it paid out, each a click from why it's paid. A payout is money
 * already sent; what's still to come is EarningsCollected.
 */
export function PayoutStatement({
  sentOn,
  status,
  destination,
  earnings,
  failure,
  groupBy = "kind",
}: PayoutStatementProps) {
  const currency = earnings[0]?.currency;
  const total = formatMoney(earningsTotal(earnings), { currency });
  const { label, color, Icon, description } = PAYOUT_STATES[status];

  return (
    <Card>
      <Box sx={{ px: 2, py: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ fontSize: 14, fontWeight: 600, color: "text.secondary" }}>
            Payout sent {sentOn}
          </Box>
          <Tooltip describeChild enterTouchDelay={0} leaveTouchDelay={3000} title={description}>
            <Chip
              size="small"
              variant="outlined"
              color={color}
              icon={<Icon />}
              label={label}
              tabIndex={0}
              sx={{
                cursor: "help",
                "& .MuiChip-icon": { fontSize: 16, ml: "6px" },
                "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
              }}
            />
          </Tooltip>
        </Box>
        <Box
          sx={{
            mt: 1,
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {total}
        </Box>
        <Box sx={{ mt: 0.75, fontSize: 12.5, color: "text.secondary" }}>
          To {destination}, paying out {earningsCount(earnings.length)}
        </Box>
        {failure ? (
          <Alert severity="error" sx={{ mt: 2 }}>
            {failure}
          </Alert>
        ) : null}
      </Box>
      {EARNING_KIND_IDS.map((kind) => {
        const ofKind = earnings.filter((earning) => earning.kind === kind);
        return ofKind.length ? (
          <KindSection
            key={kind}
            kind={kind}
            earnings={ofKind}
            groupBy={groupBy}
            currency={currency}
          />
        ) : null;
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          px: 2,
          py: 1.5,
          fontSize: 14,
          fontWeight: 700,
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <span>Total</span>
        <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
          {total}
        </Box>
      </Box>
    </Card>
  );
}
