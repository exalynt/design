import Box from "@mui/material/Box";
import { DetailsCard, DetailsEyebrow, DetailsLink } from "../DetailsPopover";
import {
  ENGINEER_LEVELS,
  ENGINEER_LEVEL_DOCS_URL,
  ENGINEER_LEVEL_IDS,
  type EngineerLevelId,
} from "./engineerLevel";
import { EngineerLevelSquares } from "./EngineerLevelSquares";

export type EngineerLevelDetailsProps = {
  level: EngineerLevelId;
  /** End with a link to the level on readme.exalynt.com, in a new tab. */
  link?: boolean;
  /**
   * Draw the popover's card. `card={false}` leaves it out, for showing the
   * details on a page inside a card of your own.
   */
  card?: boolean;
};

/*
 * The four levels side by side, each one's squares in a tile with its name
 * under it, so the popover says what the squares count. Every tile is the
 * badge's quiet outline; this level's is a step brighter, in the primary text
 * color with a faint wash, and its name bold.
 */
function LevelRow({ level }: { level: EngineerLevelId }) {
  return (
    <Box
      aria-hidden
      sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "6px" }}
    >
      {ENGINEER_LEVEL_IDS.map((id) => (
        <Box
          key={id}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75 }}
        >
          <Box
            sx={[
              {
                display: "grid",
                placeItems: "center",
                width: 32,
                height: 32,
                borderRadius: 1.5,
                border: 1,
                borderColor: "divider",
                color: "text.secondary",
                fontSize: 16,
              },
              id === level &&
                ((theme) => ({
                  borderColor: theme.vars.palette.text.secondary,
                  color: theme.vars.palette.text.primary,
                  backgroundColor: `rgba(${theme.vars.palette.text.primaryChannel} / 6%)`,
                })),
            ]}
          >
            <EngineerLevelSquares level={id} />
          </Box>
          <Box
            component="span"
            sx={{
              fontSize: 12,
              whiteSpace: "nowrap",
              ...(id === level ? { fontWeight: 700 } : { color: "text.secondary" }),
            }}
          >
            {ENGINEER_LEVELS[id].name}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

/*
 * What an engineer's level means, for whoever is looking at it: the level,
 * where it sits among the four, what an engineer at it leads, and what a
 * level is. It's the content of EngineerLevelBadge's popover, and
 * draws its own card there. It never mentions pay: the Engineer Share a
 * level sets is the readme's, for engineers.
 */
export function EngineerLevelDetails({
  level,
  link = true,
  card = true,
}: EngineerLevelDetailsProps) {
  const { name, summary } = ENGINEER_LEVELS[level];
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>Engineer level</DetailsEyebrow>
      <Box sx={{ mt: 0.5, fontSize: "1.12em", fontWeight: 700, lineHeight: 1.3 }}>
        {name} engineer
      </Box>
      <Box sx={{ mt: 1.25 }}>
        <LevelRow level={level} />
      </Box>
      <Box sx={{ mt: 1.5 }}>{summary}</Box>
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
        Every Exalynt engineer owns their work end to end and is held to the same standard. A level
        reflects the kinds of problems an engineer has the experience to lead, and each piece of
        work goes to the engineer it suits.
      </Box>
      {link ? (
        <DetailsLink href={`${ENGINEER_LEVEL_DOCS_URL}#${level}`}>
          How engineer levels work
        </DetailsLink>
      ) : null}
    </DetailsCard>
  );
}
