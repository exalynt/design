import { useState, type ReactNode } from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ConversationPreview, type ConversationPreviewProps } from "./ConversationPreview";
import { ConversationTile } from "./ConversationTile";
import { mentionLabel, parseMentions, type MentionProfile } from "./mentions";
import { UserAvatar } from "./UserAvatar";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const day = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });

export type ConversationRowProps = {
  /** What it's about, which the row links by. */
  subject: string;
  /** Its own page: the whole row links there, and with `onOpen`, a new tab still opens it. */
  href: string;
  /** Opens it in place, such as in a ConversationPopout, rather than going to `href`. */
  onOpen?: () => void;
  /** When it last moved: an RFC 3339 timestamp in UTC, shown as how long ago. */
  at: string;
  /** Its latest message, by name ("You" where it's the reader's), its `<@id>` mentions read from `people`. */
  latest?: { author: string; body: string };
  /** Everyone in it, in the order they joined, at the foot; also who its latest message can mention. */
  people: MentionProfile[];
  /** How many messages it has. */
  count: number;
  /** How many of those the reader hasn't read. */
  unread?: number;
  /** One of the unread messages mentions the reader. */
  mentionsYou?: boolean;
  /** Who closed it, and when (RFC 3339): no one can send messages in it until it's reopened. */
  closed?: { by: string; at: string };
  /** Under its latest message: what else it touches, such as links to what it's about. */
  related?: ReactNode;
  /** At the end of its top line: the app's menu for it. */
  actions?: ReactNode;
  /** A glance at its latest messages on hover or focus (ConversationPreview). */
  preview?: Omit<ConversationPreviewProps, "title" | "children" | "suppressed">;
};

/*
 * One conversation in a list, built to be scanned: its subject and how long
 * ago it last moved on one line, its latest message under that, two lines at
 * most and introduced by who wrote it, and at the foot who's in it and how
 * much has been said. The whole row is one link.
 *
 * Unread, it stands out from the read ones around it at a glance: a bar
 * down its left edge, a faint tint behind it, the subject and latest message
 * in full-strength text, and a pill counting what's new beside its time.
 * Those are in the primary color, or the warning color where one of the new
 * messages mentions the reader, as ConversationMessage marks that, and
 * Mentioned you says so at the foot. Read, it's plain, its latest message
 * quieter. Closed, it says so beside its time, and its tile fades.
 *
 * With `preview`, hovering or focusing it opens ConversationPreview, except
 * over `actions`, which the preview would cover.
 */
export function ConversationRow({
  subject,
  href,
  onOpen,
  at,
  latest,
  people,
  count,
  unread = 0,
  mentionsYou = false,
  closed,
  related,
  actions,
  preview,
}: ConversationRowProps) {
  const [overActions, setOverActions] = useState(false);
  const isUnread = unread > 0;
  /* The warning color for a mention, as ConversationMessage marks one. */
  const accent = mentionsYou ? "warning" : "primary";

  const row = (
    <Box
      sx={(theme) => ({
        position: "relative",
        display: "flex",
        gap: 1.75,
        px: { xs: 2, sm: 2.5 },
        py: 2,
        transition: theme.transitions.create("background-color"),
        bgcolor: isUnread ? `rgba(${theme.vars.palette[accent].mainChannel} / 0.07)` : undefined,
        "&:hover": {
          bgcolor: isUnread
            ? `rgba(${theme.vars.palette[accent].mainChannel} / 0.12)`
            : "action.hover",
        },
        "&:has(a:focus-visible)": {
          outline: `2px solid ${theme.vars.palette.primary.main}`,
          outlineOffset: -2,
        },
      })}
    >
      {isUnread ? (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            bgcolor: `${accent}.main`,
          }}
        />
      ) : null}
      <Box sx={{ opacity: closed ? 0.5 : 1 }}>
        <ConversationTile size={36} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
          <Link
            href={href}
            onClick={(event) => {
              /* A new tab or window still goes to its page. */
              if (!onOpen || event.metaKey || event.ctrlKey || event.shiftKey) return;
              event.preventDefault();
              onOpen();
            }}
            aria-label={
              isUnread
                ? `${subject}, ${unread} unread${mentionsYou ? ", mentions you" : ""}`
                : undefined
            }
            variant="subtitle1"
            underline="none"
            color="textPrimary"
            noWrap
            sx={{
              flex: 1,
              minWidth: 0,
              fontWeight: isUnread ? 700 : 500,
              lineHeight: 1.4,
              "&:focus-visible": { outline: "none" },
              /* The whole row opens it. */
              "&::after": { content: '""', position: "absolute", inset: 0 },
            }}
          >
            {subject}
          </Link>
          {closed ? (
            /* Above the link that covers the row, so its tooltip opens. */
            <Box sx={{ position: "relative", zIndex: 1, flexShrink: 0, alignSelf: "center" }}>
              <Tooltip
                title={`Closed by ${closed.by} · ${day.format(new Date(closed.at))}. No one can send messages in it until it's reopened.`}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 0.75,
                    py: 0.125,
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider",
                    typography: "caption",
                    fontWeight: 600,
                    color: "text.secondary",
                    whiteSpace: "nowrap",
                  }}
                >
                  <LockOutlinedIcon sx={{ fontSize: 14 }} />
                  Closed
                </Box>
              </Tooltip>
            </Box>
          ) : null}
          {isUnread ? (
            <Box
              aria-hidden
              sx={{
                flexShrink: 0,
                alignSelf: "center",
                px: 0.75,
                borderRadius: 999,
                typography: "caption",
                fontWeight: 700,
                lineHeight: "18px",
                whiteSpace: "nowrap",
                color: `${accent}.contrastText`,
                bgcolor: `${accent}.main`,
              }}
            >
              {unread} new
            </Box>
          ) : null}
          <Typography
            variant="caption"
            component="time"
            dateTime={at}
            sx={{
              flexShrink: 0,
              color: isUnread ? "text.primary" : "text.secondary",
              fontWeight: isUnread ? 600 : undefined,
              whiteSpace: "nowrap",
            }}
          >
            {timeAgo(at)}
          </Typography>
          {actions ? (
            /* Above the link that covers the row. */
            <Box
              onPointerEnter={() => setOverActions(true)}
              onPointerLeave={() => setOverActions(false)}
              sx={{ position: "relative", zIndex: 1, alignSelf: "center", my: -0.75, mr: -0.75 }}
            >
              {actions}
            </Box>
          ) : null}
        </Box>

        {latest ? (
          <Typography
            variant="body2"
            sx={{
              mt: 0.25,
              color: isUnread ? "text.primary" : "text.secondary",
              overflowWrap: "anywhere",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            <Box component="span" sx={{ color: "text.primary", fontWeight: 600 }}>
              {latest.author}:
            </Box>{" "}
            {parseMentions(latest.body)
              .map((part) => ("id" in part ? mentionLabel(part.id, people) : part.text))
              .join("")}
          </Typography>
        ) : null}
        {related}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mt: 1.25 }}>
          <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": {
                width: 22,
                height: 22,
                fontSize: 10,
                borderWidth: 1.5,
                borderColor: "background.paper",
              },
            }}
          >
            {people.map((person) => (
              <UserAvatar key={person.id} name={person.name} src={person.avatarUrl} size={22} />
            ))}
          </AvatarGroup>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {count} {count === 1 ? "message" : "messages"}
          </Typography>
          {mentionsYou ? (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.25,
                typography: "caption",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <AlternateEmailIcon sx={{ fontSize: 14, color: "warning.main" }} />
              Mentioned you
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );

  return preview ? (
    <ConversationPreview {...preview} title={subject} suppressed={overActions}>
      {row}
    </ConversationPreview>
  ) : (
    row
  );
}

/* "Just now", "5 minutes ago", "3 hours ago" today, "Yesterday", then the day. */
function timeAgo(timestamp: string, now = new Date()) {
  const then = new Date(timestamp);
  const elapsed = now.getTime() - then.getTime();
  if (elapsed < MINUTE) return "Just now";
  if (elapsed < HOUR) {
    const minutes = Math.floor(elapsed / MINUTE);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (then >= startOfToday) {
    const hours = Math.floor(elapsed / HOUR);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  if (then >= startOfYesterday) return "Yesterday";
  return day.format(then);
}
