import Box from "@mui/material/Box";
import { DetailsPopover } from "../DetailsPopover";
import { STABILITY, levelColor, type StabilityLevelId } from "./stability";
import { StabilityDetails } from "./StabilityDetails";
import { StabilityTrack } from "./StabilityTrack";

export type StabilityMarkSize = "short" | "long" | "extra-long";

export type StabilityMarkProps = {
  level: StabilityLevelId;
  /**
   * What the level is on, e.g. "Invoice export", so the popover says
   * "Invoice export is in Alpha." Pass it wherever the mark isn't right
   * beside that name, and on short marks.
   */
  feature?: string;
  /**
   * Say "Invoice export is in Alpha." in the popover, where `feature` is
   * given. `false` where the mark isn't where it stands now, such as the
   * levels on a record of a Capability that reached Alpha; `feature` still
   * names a short mark for assistive tech.
   */
  statement?: boolean;
  /**
   * `short` is the Track alone, for tabs, buttons, and other tight spots.
   * `long` (the default) adds the name. `extra-long` also adds how stable it
   * is, e.g. "Beta · Refining", beside a page or Feature title.
   */
  size?: StabilityMarkSize;
  /** End the popover with a link to the level on readme.exalynt.com. */
  link?: boolean;
  /**
   * Let the mark take keyboard focus, so its popover opens from the keyboard.
   * Pass `false` inside a button or link, which already takes focus.
   */
  focusable?: boolean;
};

/*
 * A stability level's mark: the Track and the level's name, in the level's
 * color, with a popover (hover, focus, or tap) saying how stable it is.
 * It's text, not a badge, sized in em to sit beside the text around it.
 *
 * No mark means GA. Render one for GA only in Exalynt's own tools, where
 * clients follow the stability of the Features being built for them.
 */
export function StabilityMark({
  level,
  feature,
  statement = true,
  size = "long",
  link = true,
  focusable = true,
}: StabilityMarkProps) {
  const { name, stability } = STABILITY[level];
  return (
    <DetailsPopover
      title={<StabilityDetails level={level} feature={feature} statement={statement} link={link} />}
    >
      <Box
        component="span"
        role={size === "short" ? "img" : undefined}
        aria-label={
          size === "short" ? `${feature ? `${feature}: ` : ""}${name} stability` : undefined
        }
        tabIndex={focusable ? 0 : undefined}
        sx={[
          {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5em",
            fontSize: "0.86em",
            fontWeight: 500,
            lineHeight: 1,
            whiteSpace: "nowrap",
            verticalAlign: "middle",
            borderRadius: "3px",
            cursor: "help",
            "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
          },
          levelColor(level),
        ]}
      >
        <StabilityTrack level={level} />
        {size !== "short" ? name : null}
        {size === "extra-long" ? (
          <Box
            component="span"
            sx={(theme) => ({
              fontWeight: 400,
              /* Faded only on dark surfaces, where it keeps its contrast. */
              ...theme.applyStyles("dark", { opacity: 0.75 }),
            })}
          >
            · {stability}
          </Box>
        ) : null}
      </Box>
    </DetailsPopover>
  );
}
