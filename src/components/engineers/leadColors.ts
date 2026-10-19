import type { Theme } from "@mui/material/styles";

/* Exalynt's theme has a `lead` role for Team Leads, its blue-silver metal; a theme without one uses its primary color. */
export function leadColors(theme: Theme) {
  type Colors = { light: string; main: string; dark: string };
  const palette = (theme.vars ?? theme).palette as { lead?: Colors; primary: Colors };
  return palette.lead ?? palette.primary;
}
