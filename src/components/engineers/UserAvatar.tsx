import { useId } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import SvgIcon from "@mui/material/SvgIcon";
import { useTheme, type SxProps, type Theme } from "@mui/material/styles";
import { leadColors } from "./leadColors";

/*
 * Someone's profile picture, or their initials where they have none or it
 * doesn't load. Decorative: their name is always beside it. `lead` marks a
 * Team Lead with a blue-silver star (TeamLeadIcon) over the picture's bottom
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

/* MUI's StarRounded, so the mark is drawn with a gradient of its own. */
const STAR =
  "m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08z";

/*
 * The Team Lead mark, a star in the lead metal: a sheen from the role's light
 * to main and back, and a rim in its dark. Decorative: show it beside "Team
 * Lead" or a label saying it.
 */
export function TeamLeadIcon({ sx, className }: { sx?: SxProps<Theme>; className?: string }) {
  const gradient = `team-lead-${useId().replace(/[^\w-]/g, "")}`;
  const { light, main, dark } = leadColors(useTheme());
  return (
    <SvgIcon aria-hidden sx={sx} className={className}>
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: light }} />
          <stop offset="0.5" style={{ stopColor: main }} />
          <stop offset="0.7" style={{ stopColor: light }} />
          <stop offset="1" style={{ stopColor: main }} />
        </linearGradient>
      </defs>
      <path
        d={STAR}
        fill={`url(#${gradient})`}
        strokeWidth={1.25}
        strokeLinejoin="round"
        style={{ stroke: dark }}
      />
    </SvgIcon>
  );
}

/*
 * The mark and "Team Lead", in the type of the text around it, as
 * EngineerDetails's eyebrow has them. The words are in the lead role's dark,
 * or its main in dark mode, so they hold their contrast on either card.
 */
export function TeamLeadLabel() {
  return (
    <Box
      component="span"
      sx={(theme) => ({
        whiteSpace: "nowrap",
        color: leadColors(theme).dark,
        ...theme.applyStyles("dark", { color: leadColors(theme).main }),
      })}
    >
      {/* Inline on the text's baseline, lowered to center on the capitals without growing the line. */}
      <TeamLeadIcon sx={{ fontSize: "1.3em", verticalAlign: "-0.3em", mr: 0.25 }} />
      Team Lead
    </Box>
  );
}

/* "Priya Shah" is "PS": the first and last names' first letters. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
