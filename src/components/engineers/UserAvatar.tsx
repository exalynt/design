import NavigationRoundedIcon from "@mui/icons-material/NavigationRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import type { SxProps, Theme } from "@mui/material/styles";

/*
 * Someone's profile picture, or their initials where they have none or it
 * doesn't load. Decorative: their name is always beside it. `lead` marks a
 * Team Lead with a gold arrowhead (TeamLeadIcon) over the picture's bottom
 * right; whatever shows it says "Team Lead" in words.
 */
export function UserAvatar({
  name,
  src,
  size,
  lead = false,
}: {
  name: string;
  src?: string;
  size: number;
  lead?: boolean;
}) {
  const avatar = (
    <Avatar
      src={src}
      alt=""
      sx={{ width: size, height: size, fontSize: size * 0.42, fontWeight: 600 }}
    >
      {initials(name)}
    </Avatar>
  );
  if (!lead) return avatar;
  const mark = Math.max(12, Math.round(size * 0.45));
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <TeamLeadIcon
          sx={{
            fontSize: mark,
            /* A thin edge of the page's paper, so it reads over any photo. */
            filter: (theme: Theme) => {
              const paper = (theme.vars ?? theme).palette.background.paper;
              return `drop-shadow(0 0 1px ${paper}) drop-shadow(0 0 1px ${paper})`;
            },
          }}
        />
      }
      sx={{
        flexShrink: 0,
        "& .MuiBadge-badge": { minWidth: 0, width: mark, height: mark, p: 0 },
      }}
    >
      {avatar}
    </Badge>
  );
}

/* The Team Lead mark, an arrowhead leading the way, in the lead color. Decorative: show it beside "Team Lead" or a label saying it. */
function TeamLeadIcon({ sx }: { sx?: SxProps<Theme> }) {
  return (
    <NavigationRoundedIcon
      aria-hidden
      sx={[{ color: leadColor }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}

/* The mark and "Team Lead", both in the lead color, in the type of the text around it, as EngineerDetails's eyebrow has them. */
export function TeamLeadLabel() {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.25,
        verticalAlign: "bottom",
        color: leadColor,
      }}
    >
      <TeamLeadIcon sx={{ fontSize: "1.3em" }} />
      Team Lead
    </Box>
  );
}

/* Exalynt's theme has a `lead` role for Team Leads; a theme without one uses its primary color. */
function leadColor(theme: Theme) {
  const palette = (theme.vars ?? theme).palette as {
    lead?: { main?: string };
    primary: { main: string };
  };
  return palette.lead?.main ?? palette.primary.main;
}

/* "Priya Shah" is "PS": the first and last names' first letters. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
