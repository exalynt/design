import Box from "@mui/material/Box";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { CapacityLine } from "./CapacityLine";
import { PROGRESS_KIND_IDS, PROGRESS_KINDS, type ProgressKindId } from "./progress";
import { PROGRESS_LOOK } from "./progressLook";

export type CapacityProgressProps = {
  /** How many records of each kind of progress came of the block. A kind left out has none. */
  counts: Partial<Record<ProgressKindId, number>>;
  /**
   * What the app does when it's clicked, such as going to the listing on the
   * block's page, handed the line to anchor a popover to. Without it, it's
   * read-only. A click here never reaches the block's own `onClick`.
   */
  onClick?: (anchor: HTMLElement) => void;
};

const srOnly = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;

/*
 * What progress came of a block, at a glance, as a line for its footer:
 * each kind it has, in order, as its icon in its color and how many, said in
 * words on hover. With none, "No progress yet". Only for a block that's
 * started; one waiting for its week has nothing to report.
 */
export function CapacityProgress({ counts, onClick }: CapacityProgressProps) {
  const kinds = PROGRESS_KIND_IDS.filter((id) => (counts[id] ?? 0) > 0);
  const icon = <ShowChartRoundedIcon sx={{ color: "text.secondary" }} />;
  if (!kinds.length) {
    return (
      <CapacityLine icon={icon} muted onClick={onClick}>
        No progress yet
      </CapacityLine>
    );
  }
  const said = kinds.map((id) => `${counts[id]} ${PROGRESS_KINDS[id].name}`).join(", ");
  return (
    <CapacityLine icon={icon} hint={said} onClick={onClick}>
      {/* The numbers alone mean nothing to assistive tech, so it hears the words instead. */}
      <Box
        component="span"
        aria-hidden
        sx={{ display: "inline-flex", alignItems: "center", gap: 1.25 }}
      >
        {kinds.map((id) => {
          const { Icon, color } = PROGRESS_LOOK[id];
          return (
            <Box
              key={id}
              component="span"
              sx={{ display: "inline-flex", alignItems: "center", gap: 0.375, fontWeight: 600 }}
            >
              <Icon sx={{ fontSize: 16, color: `${color}.main` }} />
              {counts[id]}
            </Box>
          );
        })}
      </Box>
      <Box component="span" sx={srOnly}>
        {said}
      </Box>
    </CapacityLine>
  );
}
