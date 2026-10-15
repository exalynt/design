import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { CalloutPanel } from "../layout/CalloutPanel";
import { STABILITY, type StabilityLevelId } from "./stability";
import { StabilityMark } from "./StabilityMark";

export type StabilityBannerProps = {
  level: StabilityLevelId;
  /**
   * What the level is on, e.g. "Scenario compare". It names the banner for
   * screen readers and opens the mark's popover with "Scenario compare is in
   * Alpha."
   */
  feature: string;
  /** The bold line. Defaults to the level's summary. */
  title?: ReactNode;
  /** The line under it. Defaults to what people can rely on it for. */
  children?: ReactNode;
  /** One button, for what you want people to do: send feedback, or open the fallback. */
  action?: ReactNode;
};

/*
 * A stability level as a callout, for the few pages where missing the level
 * would cost someone something: a Prototype's fake data, or real work going
 * into an Alpha. The extra-long mark carries the level; the panel around it
 * is CalloutPanel, with its rule in the level's color.
 */
export function StabilityBanner({ level, feature, title, children, action }: StabilityBannerProps) {
  const { summary, forUsers, colors } = STABILITY[level];
  return (
    <CalloutPanel
      component="section"
      aria-label={`${feature} stability`}
      sx={[
        { p: { xs: 2.5, md: 3 } },
        (theme: Theme) => ({
          borderLeftColor: colors.light,
          ...theme.applyStyles("dark", { borderLeftColor: colors.dark }),
        }),
      ]}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ fontSize: 16 }}>
            <StabilityMark level={level} feature={feature} size="extra-long" />
          </Box>
          <Typography variant="subtitle1" component="p" sx={{ mt: 1.25 }}>
            {title ?? summary}
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5, maxWidth: "68ch", color: "text.secondary" }}>
            {children ?? forUsers}
          </Typography>
        </Box>
        {action ? <Box sx={{ flexShrink: 0 }}>{action}</Box> : null}
      </Stack>
    </CalloutPanel>
  );
}
