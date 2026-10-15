import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useColorScheme } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

/*
 * Light/dark toggle. Like the site's, it flips between the two explicit modes
 * rather than cycling through "system" — once someone has expressed a
 * preference, a third state they have to click past is just friction.
 */
export function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  /* `mode` is "system" until the visitor chooses; resolve it for the icon. */
  const resolved = mode === "system" ? systemMode : mode;
  const isDark = resolved === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={() => setMode(isDark ? "light" : "dark")}
        aria-label={label}
        size="small"
        sx={{
          width: 34,
          height: 34,
          border: 1,
          borderColor: "divider",
          color: "text.secondary",
          "&:hover": { color: "text.primary", borderColor: "text.primary" },
        }}
      >
        {isDark ? (
          <LightModeOutlinedIcon sx={{ fontSize: 18 }} />
        ) : (
          <DarkModeOutlinedIcon sx={{ fontSize: 18 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}
