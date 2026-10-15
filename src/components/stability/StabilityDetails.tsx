import Box from "@mui/material/Box";
import { DetailsCard, DetailsEyebrow, DetailsLink } from "../DetailsPopover";
import {
  STABILITY,
  STABILITY_DOCS_URL,
  STABILITY_LEVEL_IDS,
  levelColor,
  stabilityStep,
  type StabilityLevelId,
} from "./stability";

export type StabilityDetailsProps = {
  level: StabilityLevelId;
  /**
   * What the level is on, e.g. "Invoice export". Given, the popover says
   * "Invoice export is in Alpha." before what to expect.
   */
  feature?: string;
  /**
   * Say "Invoice export is in Alpha." where `feature` is given. `false`
   * where the level isn't where it stands now, such as the levels on a
   * record of a Capability that reached Alpha.
   */
  statement?: boolean;
  /** End with a link to the level on readme.exalynt.com, in a new tab. */
  link?: boolean;
  /**
   * Draw the popover's card. `card={false}` leaves it out, for showing the
   * details on a page inside a card of your own.
   */
  card?: boolean;
};

/*
 * The four levels as the mark's Track draws them, larger: one box per level,
 * lit up to this one, with each level's name centred under its box. Whole
 * boxes with square-ish corners, so it doesn't read as maturity's scale,
 * which fills a rounded bar to a percentage.
 */
function LevelBoxes({ level }: { level: StabilityLevelId }) {
  const step = stabilityStep(level);
  const columns = { display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "6px" };
  return (
    <Box aria-hidden sx={[{ width: "100%" }, levelColor(level)]}>
      <Box sx={columns}>
        {STABILITY_LEVEL_IDS.map((id, index) => (
          <Box
            key={id}
            sx={{
              height: 14,
              borderRadius: "3px",
              bgcolor: index < step ? "currentColor" : "divider",
            }}
          />
        ))}
      </Box>
      <Box sx={[columns, { mt: 0.75 }]}>
        {STABILITY_LEVEL_IDS.map((id) => (
          <Box
            key={id}
            component="span"
            sx={{
              fontSize: 12,
              textAlign: "center",
              whiteSpace: "nowrap",
              ...(id === level ? { fontWeight: 700 } : { color: "text.secondary" }),
            }}
          >
            {STABILITY[id].name}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/*
 * How stable something is, for the client looking at it: the level's full
 * name and how stable it is in a word, where it sits among the four levels,
 * what to expect from it (naming the feature, if given, unless `statement`
 * is off), and what stability
 * is. It's the content of StabilityMark's popover, and draws its own card there.
 */
export function StabilityDetails({
  level,
  feature,
  statement = true,
  link = true,
  card = true,
}: StabilityDetailsProps) {
  const { fullName, stability, summary } = STABILITY[level];
  const says = Boolean(feature) && statement;
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>Stability</DetailsEyebrow>
      <Box
        sx={[
          {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            columnGap: 1,
            mt: 0.5,
            fontSize: "1.12em",
            fontWeight: 700,
            lineHeight: 1.3,
          },
          levelColor(level),
        ]}
      >
        {fullName}
        <Box component="span" sx={{ fontSize: "0.89em", fontWeight: 500 }}>
          {stability}
        </Box>
      </Box>
      <Box sx={{ mt: 1.25 }}>
        <LevelBoxes level={level} />
      </Box>
      {/* What it's on, then the level's definition on a line of its own. */}
      {says ? (
        <Box sx={{ mt: 1.5 }}>
          <Box component="strong" sx={{ fontWeight: 600 }}>
            {feature}
          </Box>{" "}
          is in {fullName}.
        </Box>
      ) : null}
      <Box sx={{ mt: says ? 0.75 : 1.5 }}>{summary}</Box>
      <Box
        sx={{
          mt: 1.5,
          pt: 1.5,
          borderTop: 1,
          borderColor: "divider",
          fontSize: "0.92em",
          color: "text.secondary",
        }}
      >
        Stability is how much something will still change, and how far you can rely on it today. It
        moves up from Prototype through Alpha and Beta to General Availability as it&rsquo;s proven
        in real use.
      </Box>
      {link ? (
        <DetailsLink href={`${STABILITY_DOCS_URL}#stability-${level}`}>
          How stability levels work
        </DetailsLink>
      ) : null}
    </DetailsCard>
  );
}
