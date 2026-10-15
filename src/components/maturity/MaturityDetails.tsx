import Box from "@mui/material/Box";
import type { ReactNode } from "react";
import { DetailsCard, DetailsEyebrow, DetailsLink } from "../DetailsPopover";
import { MATURITY_BANDS, MATURITY_DOCS_URL, clampMaturity, maturityBand } from "./maturity";
import { RingGlyph } from "./RingGlyph";
import { levelColor, type StabilityLevelId } from "../stability/stability";

export type MaturitySubject = "feature" | "project";

export type MaturityDetailsProps = {
  /** 0 to 100; anything outside is clamped, and fractions rounded. */
  progress: number;
  /** A Feature's maturity, from its Capabilities, or a project's, from its Features. */
  subject: MaturitySubject;
  /** How many Capabilities (a Feature) or Features (a project) it's worked out from. */
  count?: number;
  /**
   * What it's made of, under the scale: each Capability with its
   * StabilityMark, or each Feature with a small MaturityRing, most mature first.
   */
  breakdown?: ReactNode;
  /** End with a link to how maturity works on readme.exalynt.com, in a new tab. */
  link?: boolean;
  /** Draw the popover's card. `card={false}` leaves it out, for a card of your own. */
  card?: boolean;
};

/* What each band means for the client, of a Feature's Capabilities or a project's Features. */
function bandSummary(band: StabilityLevelId, subject: MaturitySubject) {
  const parts = subject === "feature" ? "its capabilities" : "its features";
  return {
    prototype: `Early work. On average, ${parts} are still being explored, so expect much of it to change, and some of its data may be fake.`,
    alpha: `Taking shape. On average, ${parts} work but are still changing often, and bugs are to be expected.`,
    beta: `Settled enough for real use. On average, ${parts} are being refined, with occasional breaking changes we aim to announce ahead of time.`,
    ga: `Stable and dependable. On average, ${parts} keep working as they do today.`,
  }[band];
}

function basis(subject: MaturitySubject, count: number) {
  return subject === "feature"
    ? `Based on the ${count} ${count === 1 ? "capability" : "capabilities"} listed today`
    : `The average of its ${count} ${count === 1 ? "feature" : "features"}`;
}

const section = { mt: 1.5, pt: 1.5, borderTop: 1, borderColor: "divider" } as const;

/*
 * How mature a Feature or a project is, for the client looking at it: its
 * ring and band, what that band means, optionally what it's made of, and what
 * maturity is. It's the content of MaturityRing's popover. Maturity is
 * always drawn as the ring, here too, never as a bar.
 */
export function MaturityDetails({
  progress,
  subject,
  count,
  breakdown,
  link = true,
  card = true,
}: MaturityDetailsProps) {
  const value = clampMaturity(progress);
  const band = maturityBand(value);
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>
        {subject === "feature" ? "Feature maturity" : "Project maturity"}
      </DetailsEyebrow>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
        <RingGlyph progress={value} size={56} />
        <Box sx={{ minWidth: 0, lineHeight: 1.3 }}>
          <Box sx={[{ fontSize: "1.12em", fontWeight: 700 }, levelColor(band)]}>
            {MATURITY_BANDS[band]}
          </Box>
          {count === undefined ? null : (
            <Box sx={{ color: "text.secondary" }}>{basis(subject, count)}</Box>
          )}
        </Box>
      </Box>
      <Box sx={{ mt: 1.5 }}>{bandSummary(band, subject)}</Box>
      {breakdown ? <Box sx={section}>{breakdown}</Box> : null}
      <Box sx={[section, { fontSize: "0.92em", color: "text.secondary" }]}>
        Maturity is how complete and stable{" "}
        {subject === "feature" ? "a feature is" : "a project's features are"}, as presently known,
        from the stability of what&rsquo;s been built. It can go down as well as up as new work is
        added.
      </Box>
      {link ? <DetailsLink href={MATURITY_DOCS_URL}>How maturity works</DetailsLink> : null}
    </DetailsCard>
  );
}
