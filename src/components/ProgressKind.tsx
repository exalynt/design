import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { DetailsCard, DetailsEyebrow, DetailsLink, DetailsPopover } from "./DetailsPopover";
import { PROGRESS_DOCS_URL, PROGRESS_KINDS, type ProgressKindId } from "./progress";
import { PROGRESS_LOOK } from "./progressLook";

export type ProgressKindProps = {
  kind: ProgressKindId;
  /** Just the icon, with the name on hover and for assistive tech. */
  iconOnly?: boolean;
  /** End the popover with a link to what the readme means by value. */
  link?: boolean;
};

/*
 * What kind of progress a record is, as a small tinted Chip with its icon
 * and name, or with `iconOnly` the icon alone in its color. Hover, focus, or
 * tap says what that kind means to the client.
 */
export function ProgressKind({ kind, iconOnly = false, link = true }: ProgressKindProps) {
  const { Icon, color } = PROGRESS_LOOK[kind];
  const { name, form, meaning } = PROGRESS_KINDS[kind];
  return (
    <DetailsPopover
      title={
        <DetailsCard card>
          <DetailsEyebrow>{form === name ? "Progress" : `${form} progress`}</DetailsEyebrow>
          <Box sx={{ mt: 0.5, fontSize: "1.12em", fontWeight: 700 }}>{name}</Box>
          <Box sx={{ mt: 0.5 }}>{meaning}</Box>
          {link ? <DetailsLink href={PROGRESS_DOCS_URL}>What we mean by value</DetailsLink> : null}
        </DetailsCard>
      }
    >
      {iconOnly ? (
        <Box
          component="span"
          role="img"
          aria-label={name}
          tabIndex={0}
          sx={{ display: "inline-flex", color: `${color}.main`, cursor: "help", borderRadius: 0.5 }}
        >
          <Icon sx={{ fontSize: 18 }} />
        </Box>
      ) : (
        <Chip
          size="small"
          icon={<Icon />}
          label={name}
          tabIndex={0}
          sx={(theme) => ({
            cursor: "help",
            color: theme.vars.palette[color].main,
            bgcolor: `rgba(${theme.vars.palette[color].mainChannel} / 0.12)`,
            "& .MuiChip-icon": { color: "inherit", fontSize: 16, ml: "6px" },
            "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
          })}
        />
      )}
    </DetailsPopover>
  );
}
