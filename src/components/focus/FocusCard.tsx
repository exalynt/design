import type { ComponentType, ReactNode } from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { DateTime } from "../data-display/DateTime";
import type { UserProfile } from "../engineers/UserAttribution";
import { UserAvatar } from "../engineers/UserAvatar";
import { Grip } from "../Grip";

/* Out of sight but still read out. */
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;

export type FocusCardProps = {
  /** What it is, in the client's words, which the card links by. */
  title: string;
  /** Its own page: the whole card links there, and with `onOpen`, a new tab still opens it. */
  href: string;
  /** Opens it in place, such as in a dialog, rather than going to `href`. */
  onOpen?: () => void;
  /** A few words under the title: where things stand, in focus, or why it was addressed or set aside. */
  note?: string;
  /** How many lines `note` shows before it's cut short. */
  noteLines?: number;
  /** Who's on it in this week's capacity, named "Avery, Jordan this week". */
  onIt?: UserProfile[];
  /** How many Features it's about. */
  features?: number;
  /** How many Capabilities it's about. */
  capabilities?: number;
  /** How many conversations there are about it. */
  conversations?: number;
  /** How many of those have messages the reader hasn't read. */
  unread?: number;
  /** One of the unread messages mentions the reader. */
  mentionsYou?: boolean;
  /** When anything last happened on it: an RFC 3339 timestamp in UTC, shown as how long ago, with DateTime's popover for the full time. */
  at: string;
  /** Show a drag grip, where the app lets it be dragged. Hidden on phones, where `actions` does the moves. */
  grip?: boolean;
  /** At the end of its title: the app's menu for it. */
  actions?: ReactNode;
};

/*
 * One Focus on a board: its title, and a little of how it's going. Under
 * the title, `note` in the engineers' words; who's on it this week; then,
 * quietly, how many Features, Capabilities and conversations it's about
 * and when anything last happened, and less quietly, how many of those
 * conversations have something unread. No percentages or estimates: a
 * Focus isn't a ticket to close.
 *
 * The whole card is one link. Dragging is the app's: `grip` shows where
 * it can be picked up, and `actions` holds a menu doing the same moves
 * from the keyboard or a touch screen.
 */
export function FocusCard({
  title,
  href,
  onOpen,
  note,
  noteLines = 3,
  onIt = [],
  features = 0,
  capabilities = 0,
  conversations = 0,
  unread = 0,
  mentionsYou = false,
  at,
  grip = false,
  actions,
}: FocusCardProps) {
  return (
    <Card
      component="article"
      aria-label={title}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: 1,
        pl: grip ? { xs: 1.75, md: 0.75 } : 1.75,
        pr: 0.75,
        py: 1.5,
        cursor: grip ? "grab" : "pointer",
        transition: (theme) => theme.transitions.create("border-color"),
        "&:hover": { borderColor: "text.disabled", "& .grip": { color: "text.secondary" } },
        "&:has(a:focus-visible)": { outline: 2, outlineColor: "primary.main" },
      }}
    >
      {grip ? (
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", height: 22 }}>
          <Grip />
        </Box>
      ) : null}
      <CenterFocusStrongOutlinedIcon
        aria-hidden
        sx={{ flex: "none", mt: "2px", fontSize: 18, color: "text.secondary" }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Link
          href={href}
          draggable={false}
          onClick={(event) => {
            /* A new tab or window still goes to its page. */
            if (!onOpen || event.metaKey || event.ctrlKey || event.shiftKey) return;
            event.preventDefault();
            onOpen();
          }}
          underline="none"
          color="textPrimary"
          variant="body2"
          sx={{
            display: "block",
            fontWeight: 600,
            lineHeight: "22px",
            overflowWrap: "anywhere",
            "&:focus-visible": { outline: "none" },
            /* The whole card opens it. */
            "&::after": { content: '""', position: "absolute", inset: 0 },
          }}
        >
          {title}
        </Link>

        {note ? (
          <Box sx={{ mt: 0.5, typography: "body2", color: "text.secondary", ...clamp(noteLines) }}>
            {note}
          </Box>
        ) : null}

        {onIt.length ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <AvatarGroup
              max={3}
              sx={{
                "& .MuiAvatar-root": {
                  width: 20,
                  height: 20,
                  fontSize: 9,
                  borderWidth: 1.5,
                  borderColor: "background.paper",
                },
              }}
            >
              {onIt.map((person) => (
                <UserAvatar key={person.name} name={person.name} src={person.avatarUrl} size={20} />
              ))}
            </AvatarGroup>
            <Box sx={{ typography: "caption", color: "text.secondary", ...clamp(1) }}>
              {onIt.map((person) => person.name.split(/\s+/)[0]).join(", ")} this week
            </Box>
          </Box>
        ) : null}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            columnGap: 1.5,
            rowGap: 0.5,
            mt: 1,
            typography: "caption",
            color: "text.secondary",
          }}
        >
          {features ? (
            <Count Icon={WidgetsOutlinedIcon} n={features} one="Feature" many="Features" />
          ) : null}
          {capabilities ? (
            <Count Icon={BoltOutlinedIcon} n={capabilities} one="Capability" many="Capabilities" />
          ) : null}
          {conversations ? (
            <Count
              Icon={ForumOutlinedIcon}
              n={conversations}
              one="conversation"
              many="conversations"
            />
          ) : null}
          {unread ? (
            <Box
              component="span"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              {mentionsYou ? (
                /* The warning color for a mention, as ConversationMessage marks one. */
                <AlternateEmailIcon aria-hidden sx={{ fontSize: 14, color: "warning.main" }} />
              ) : null}
              {unread} unread
              {mentionsYou ? (
                <Box component="span" sx={visuallyHidden}>
                  , mentions you
                </Box>
              ) : null}
            </Box>
          ) : null}
          {/* Above the link that covers the card, so its popover opens. */}
          <Box component="span" sx={{ position: "relative", zIndex: 1, ml: "auto" }}>
            <DateTime value={at} relative />
          </Box>
        </Box>
      </Box>

      {actions ? (
        /* Above the link that covers the card. */
        <Box sx={{ position: "relative", zIndex: 1, mt: "-3px" }}>{actions}</Box>
      ) : null}
    </Card>
  );
}

/* A count at the foot: its icon and the number, named to assistive tech. */
function Count({
  Icon,
  n,
  one,
  many,
}: {
  Icon: ComponentType<SvgIconProps>;
  n: number;
  one: string;
  many: string;
}) {
  return (
    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
      <Icon aria-hidden sx={{ fontSize: 14 }} />
      {n}
      <Box component="span" sx={visuallyHidden}>
        {n === 1 ? one : many}
      </Box>
    </Box>
  );
}

function clamp(lines: number) {
  return {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  } as const;
}
