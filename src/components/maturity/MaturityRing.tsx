import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { DetailsPopover } from "../DetailsPopover";
import { MaturityDetails, type MaturitySubject } from "./MaturityDetails";
import { MATURITY_BANDS, clampMaturity, maturityBand } from "./maturity";
import { RingGlyph } from "./RingGlyph";

export type MaturityRingProps = {
  /** 0 to 100; anything outside is clamped, and fractions rounded. */
  progress: number;
  /** A Feature's maturity, from its Capabilities, or a project's, from its Features. */
  subject: MaturitySubject;
  /** How many Capabilities (a Feature) or Features (a project) it's worked out from. */
  count?: number;
  /** What it's the maturity of, for screen readers, e.g. a Feature's name in a list. */
  label?: string;
  /**
   * Diameter in px. 52 by default; 40 and up shows the percentage inside,
   * smaller (24 in a list row) shows it beside.
   */
  size?: number;
  /** Show "Maturity" and the count beside the ring, as at the top of a project's page. */
  labelled?: boolean;
  /**
   * What it's made of, for the popover: each Capability with its
   * StabilityMark, or each Feature with a small MaturityRing, most mature
   * first, drafts last.
   */
  breakdown?: ReactNode;
  /** End the popover with a link to how maturity works. */
  link?: boolean;
  /**
   * Let the ring take keyboard focus, so its popover opens from the keyboard.
   * Pass `false` inside a button or link, such as a project's card.
   */
  focusable?: boolean;
};

const countLabel = (subject: MaturitySubject, count: number) =>
  subject === "feature"
    ? `${count} ${count === 1 ? "capability" : "capabilities"}`
    : `${count} ${count === 1 ? "feature" : "features"}`;

/*
 * A Feature's or a project's maturity, always as a ring (see RingGlyph), so
 * it never looks like a stability mark, with a popover (hover, focus, or
 * tap) saying how mature it is and what that means.
 */
export function MaturityRing({
  progress,
  subject,
  count,
  label,
  size = 52,
  labelled = false,
  breakdown,
  link = true,
  focusable = true,
}: MaturityRingProps) {
  const value = clampMaturity(progress);
  const band = maturityBand(value);
  const name = label ?? (subject === "project" ? "Project maturity" : "Feature maturity");
  const across = count === undefined ? "" : `, across ${countLabel(subject, count)}`;

  return (
    <DetailsPopover
      title={
        <MaturityDetails
          progress={value}
          subject={subject}
          count={count}
          breakdown={breakdown}
          link={link}
        />
      }
    >
      <Box
        component="span"
        role="img"
        aria-label={`${name}: ${value}%${across}, ${MATURITY_BANDS[band]}`}
        tabIndex={focusable ? 0 : undefined}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1.5,
          verticalAlign: "middle",
          borderRadius: 999,
          cursor: "help",
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        }}
      >
        <RingGlyph progress={value} size={size} />
        {labelled ? (
          <Box component="span" aria-hidden sx={{ display: "flex", flexDirection: "column" }}>
            <Typography component="span" variant="subtitle2" sx={{ lineHeight: 1.3 }}>
              Maturity
            </Typography>
            {count === undefined ? null : (
              <Typography component="span" variant="caption" sx={{ color: "text.secondary" }}>
                {countLabel(subject, count)}
              </Typography>
            )}
          </Box>
        ) : null}
      </Box>
    </DetailsPopover>
  );
}
