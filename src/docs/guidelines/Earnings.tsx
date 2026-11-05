import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import {
  EARNING_KINDS,
  EARNING_KIND_IDS,
  EARNING_STATUSES,
  EARNING_STATUS_IDS,
  EARNING_TYPES,
  EARNING_TYPE_IDS,
  EarningDetails,
  EarningFor,
  EarningInfo,
  EarningKind,
  EarningLine,
  EarningStatus,
  EarningType,
  EarningsCollected,
  ListTable,
  PayoutStatement,
  earningStatus,
  formatEarningAmount,
  type Column,
  type Earning,
  type ListFilter,
  type PayoutStatementProps,
} from "../../components";
import { CodeBlock } from "../CodeBlock";
import {
  engineerPayout,
  everyEarning,
  leadPayout,
  partnerPayout,
  unsentEarnings,
} from "../earnings";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";
import { Rules } from "./Rules";

const GROUPINGS: {
  id: NonNullable<PayoutStatementProps["groupBy"]>;
  label: string;
  note: string;
}[] = [
  {
    id: "kind",
    label: "By kind",
    note: "Every line in view, under its kind. Reads through like a pay stub.",
  },
  {
    id: "type",
    label: "By type",
    note: "A short summary under each kind, with the lines a click away, which leave off the type their heading says. For a payout with many small lines.",
  },
];

const ledgerColumns: Column<Earning>[] = [
  {
    id: "type",
    header: "Kind and type",
    value: (earning) => EARNING_TYPES[earning.type].name,
    sortable: true,
    render: (earning) => (
      <Stack spacing={0.5} sx={{ alignItems: "flex-start" }}>
        <EarningKind kind={earning.kind} details />
        <EarningType type={earning.type} kind={earning.kind} details />
        {/* The columns a phone hides, said here instead. */}
        <Stack spacing={0.5} sx={{ display: { xs: "flex", sm: "none" }, alignItems: "flex-start" }}>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {earning.period}
          </Typography>
          <EarningStatus earning={earning} />
        </Stack>
      </Stack>
    ),
  },
  {
    id: "for",
    header: "For",
    hideBelow: "md",
    value: (earning) =>
      earning.kind === "engineering_capacity" ? earning.number : earning.product,
    render: (earning) => <EarningFor earning={earning} />,
  },
  {
    id: "period",
    header: "Period",
    width: 120,
    hideBelow: "md",
    sx: { color: "text.secondary", whiteSpace: "nowrap" },
    value: (earning) => earning.period,
  },
  {
    id: "status",
    header: "Status",
    width: 150,
    hideBelow: "sm",
    value: (earning) => EARNING_STATUS_IDS.indexOf(earningStatus(earning)),
    sortable: true,
    render: (earning) => <EarningStatus earning={earning} />,
  },
  {
    id: "amount",
    header: "Amount",
    align: "right",
    width: 150,
    value: (earning) => earning.amountCents,
    sortable: true,
    sx: { fontWeight: 700, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" },
    render: (earning) => (
      <>
        {formatEarningAmount(earning)}
        <Box sx={{ display: { xs: "block", sm: "none" }, mt: 0.5, fontWeight: 400 }}>
          <EarningInfo earning={earning} />
        </Box>
      </>
    ),
  },
  {
    id: "info",
    header: "",
    width: 150,
    align: "right",
    hideBelow: "sm",
    render: (earning) => <EarningInfo earning={earning} />,
  },
];

const ledgerFilters: ListFilter<Earning>[] = [
  {
    id: "status",
    label: "Status",
    value: (earning) => EARNING_STATUSES[earningStatus(earning)].name,
  },
  { id: "kind", label: "Kind", value: (earning) => EARNING_KINDS[earning.kind].name },
  { id: "type", label: "Type", value: (earning) => EARNING_TYPES[earning.type].name },
  { id: "client", label: "Client", value: (earning) => earning.organization },
];

function Groupings() {
  const [groupBy, setGroupBy] = useState<(typeof GROUPINGS)[number]["id"]>("kind");
  const [payout, setPayout] = useState<"engineer" | "lead" | "partner">("engineer");
  const earnings = { engineer: engineerPayout, lead: leadPayout, partner: partnerPayout }[payout];
  return (
    <Stack spacing={2}>
      <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1 }}>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={groupBy}
          aria-label="Arrange the lines"
          onChange={(_, value) => value && setGroupBy(value)}
        >
          {GROUPINGS.map(({ id, label }) => (
            <ToggleButton key={id} value={id}>
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={payout}
          aria-label="Whose payout"
          onChange={(_, value) => value && setPayout(value)}
        >
          <ToggleButton value="engineer">Engineer</ToggleButton>
          <ToggleButton value="lead">Team Lead</ToggleButton>
          <ToggleButton value="partner">Partner</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "75ch" }}>
        {GROUPINGS.find(({ id }) => id === groupBy)?.note}
      </Typography>
      {/* A new key closes what was open when the arrangement changes. */}
      <PayoutStatement
        key={`${groupBy}-${payout}`}
        sentOn="Friday, Oct 9"
        status="paid"
        destination="Chase ••4242"
        earnings={earnings}
        groupBy={groupBy}
      />
    </Stack>
  );
}

export function EarningsGuideline() {
  return (
    <>
      <Guidance title="An earning answers why">
        <p>
          An earning is a line item: what someone is paid for one piece of work. They collect
          earnings as their work is approved, and a payout pays out many of them at once. Whoever
          reads one is asking whether the money is right, so it answers these, in this order:
        </p>
        <ol>
          <li>
            <strong>How much?</strong> The amount, with its cents.
          </li>
          <li>
            <strong>For what?</strong> The specific thing, as <code>EarningFor</code>: one tile in
            one shape, whether it&rsquo;s a block or a product being operated.
          </li>
          <li>
            <strong>How far has it come?</strong> Upcoming, Earned, Sent, or Paid, and once
            it&rsquo;s Sent, a link to its payout.
          </li>
          <li>
            <strong>Why me?</strong> A sentence, from <code>earningReason</code>, rather than a
            label to look up: &ldquo;Priya Shah fulfilled this block in a week you were
            available.&rdquo;
          </li>
          <li>
            <strong>Why that much?</strong> The sum: <code>$3,500.00 × 3%</code>.
          </li>
        </ol>
        <p>
          The line itself answers the first three, so a page of them stays easy to scan. The last
          two are one click away on its &ldquo;Why this amount?&rdquo; link,{" "}
          <code>EarningInfo</code>, and hovering a kind or a type says what it means.
        </p>
        <p>
          How the money works is the readme&rsquo;s:{" "}
          <ReadmeLink path="engineers/compensation">Engineer compensation</ReadmeLink> and{" "}
          <ReadmeLink path="business/partnerships">the Partnership Program</ReadmeLink>. These pages
          cover how to show it, and each earning links to the part that explains its type.
        </p>
      </Guidance>

      <Example title="One earning on a line, what its link opens, and earnings adding up">
        <Grid container spacing={2}>
          <Grid size={12}>
            <Card>
              <EarningLine earning={engineerPayout[1]} />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: 2 }}>
              <EarningDetails earning={engineerPayout[1]} card={false} />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <EarningsCollected
              earnings={unsentEarnings}
              goesOutOn="Friday, Nov 13"
              cutoff="Sunday, Nov 8"
              destination="Chase ••4242"
            />
          </Grid>
        </Grid>
      </Example>

      <Guidance title="Kind and type">
        <p>
          An earning&rsquo;s <strong>kind</strong> is what was sold. Its <strong>type</strong> is
          why this person is paid for it, and every type sits under a kind. The kind is a small
          uppercase label, like a section heading, and the type is the bold name of the line, so
          they never read as the same level.
        </p>
      </Guidance>

      <Example title="The kinds and their types">
        <Grid container spacing={2}>
          {EARNING_KIND_IDS.map((kind) => (
            <Grid key={kind} size={{ xs: 12, sm: 6 }}>
              <Card sx={{ height: "100%", p: 2 }}>
                <EarningKind kind={kind} details />
                <Stack spacing={1} sx={{ mt: 1.5, alignItems: "flex-start", fontSize: 14 }}>
                  {EARNING_TYPE_IDS.filter((type) => kind in EARNING_TYPES[type].descriptions).map(
                    (type) => (
                      <EarningType key={type} type={type} kind={kind} details />
                    ),
                  )}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Example>

      <Rules
        title="Every earning"
        items={[
          "Keeps its line to the facts, with why it's paid and how it's worked out one click away on its Why this amount? link, wherever it appears.",
          "Has its kind and type say what they mean, on hover, focus, or tap, wherever they appear, so nobody has to know the terms already.",
          "Shows its own figures, as they were fixed. Never works its amount out from today's rates, so a later change doesn't rewrite what it says.",
          "Is only ever the reader's own. It never says what the block paid anyone else, what the client paid, or whether a coupon came off.",
          "On a Partner Share, gives its block, client, and period and no more: never who fulfilled it or what they worked on, as a partner doesn't see the client's work.",
          "Shows its kind as a small uppercase label and its type as the line's bold name. Under a heading that says either, the line leaves it off, rather than saying it twice.",
          "Uses color for how far it's come and nowhere else, always with an icon and a word. Types, kinds, and what it's for stay in text colors.",
          "Names what it was for with EarningFor, wherever it appears, so the thing is always in the same shape: its icon, name, type, and client, and nothing more.",
          "Says the time it's for as a date range with its type, a week or a month alike, so it's always in the same form.",
          "Links to its payout once it's Sent or Paid, so the reader can always get from an earning to the money that paid it.",
          "Is called an earning until it's sent. A payout is money already sent, so what's still to come is collected or upcoming, never a future payout.",
          "While it's Upcoming, doesn't read as money: its amount is muted with a ~ for approximate, its status is dashed, its sentence is in the future, and it's never added into what's been collected.",
        ]}
      />

      <Guidance title="Reading a payout">
        <p>
          A statement arranges its lines in one of two ways, with <code>groupBy</code>. By kind is
          the default, and reads through like a pay stub. By type suits a payout with many small
          lines, such as a Team Lead&rsquo;s. The lines, the header, and the total stay the same.
        </p>
      </Guidance>

      <Example title="Each arrangement, for each reader">
        <Groupings />
      </Example>

      <Guidance title="The ledger">
        <p>
          A statement is for one payout. Every earning across payouts is a <code>ListTable</code>,
          for finding one: by status, kind, type, or client. Each row keeps to its facts and ends in
          its <code>EarningInfo</code> link.
        </p>
      </Guidance>

      <ListTable
        columns={ledgerColumns}
        rows={everyEarning}
        rowKey={(earning) => earning.id}
        noun={{ one: "earning", other: "earnings" }}
        search
        searchText={(earning) => earning.organization}
        filters={ledgerFilters}
        defaultSort={{ column: "status", direction: "asc" }}
      />

      <CodeBlock
        code={`<ListTable
  columns={columns}
  rows={earnings}
  rowKey={(earning) => earning.id}
  noun={{ one: "earning", other: "earnings" }}
/>`}
      />
    </>
  );
}
