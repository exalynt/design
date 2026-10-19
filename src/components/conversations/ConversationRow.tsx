import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import { ConversationPreview, type ConversationPreviewProps } from "./ConversationPreview";
import { ConversationRelatedPopover } from "./ConversationRelatedPopover";
import { ConversationTile } from "./ConversationTile";
import type { OrganizationProfile } from "./ConversationMessage";
import type { MentionProfile } from "./mentions";
import { RELATED, groupRelated, relatedName, type ConversationRelated } from "./related";
import { DateTime } from "../data-display/DateTime";
import { UserAvatar } from "../engineers/UserAvatar";
import { CapacityName } from "../capacity/CapacityName";
import { OrganizationLogo } from "../OrganizationLogo";

export type { ConversationRelated } from "./related";

const day = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });
/* Out of sight but still read out. */
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;
/* One line, cut short where it's long. */
const cut = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;
/* Between what it's related to, at the foot. */
const RELATED_GAP = 1.25;

export type ConversationRowProps = {
  /** What it's about, which the row links by. */
  subject: string;
  /** Its own page: the whole row links there, and with `onOpen`, a new tab still opens it. */
  href: string;
  /** Opens it in place, such as in a ConversationPopout, rather than going to `href`. */
  onOpen?: () => void;
  /** The space it's in, by name, in a line over its subject, for a list that spans more than one. */
  space?: string;
  /** Its space's organization, by its logo and name before the space, for a list that spans more than one organization's spaces. */
  organization?: OrganizationProfile;
  /** When it last moved: an RFC 3339 timestamp in UTC, shown as how long ago, with DateTime's popover for the full time. */
  at: string;
  /** Everyone in it, in the order they joined, at the foot. */
  people: MentionProfile[];
  /** How many messages it has. */
  count: number;
  /** How many of those the reader hasn't read. */
  unread?: number;
  /** One of the unread messages mentions the reader. */
  mentionsYou?: boolean;
  /** Who closed it, and when (RFC 3339): no one can send messages in it until it's reopened. It still opens, with `onOpen` or `preview`, such as in a ConversationPopout with a `notice` for its reply box. */
  closed?: { by: string; at: string };
  /** What it's related to, at the right of its foot, on one line: its products, Features, Capabilities, Focuses and blocks of capacity. One of a kind is named, more are counted, and what doesn't fit is "+N more", which opens all of it (ConversationRelatedPopover). */
  related?: ConversationRelated[];
  /** At the end of its top line: the app's menu for it. */
  actions?: ReactNode;
  /** A glance at its latest messages on hover or focus (ConversationPreview). */
  preview?: Omit<ConversationPreviewProps, "title" | "children" | "suppressed">;
};

/*
 * One conversation in a list, built to be scanned: its subject in full, and
 * how long ago it last moved, and at the foot who's in it and, by a message
 * icon, how much has been said, with what it's related to (`related`) at
 * the right, on one line. Its messages are a hover away, in `preview`. The
 * whole row is one link.
 *
 * Unread, it stands out from the read ones around it at a glance: a bar
 * down its left edge, a faint tint behind it, a bold subject, and a pill
 * counting what's new beside its time. Those are in the primary color, or
 * the warning color where one of the new messages mentions the reader, as
 * ConversationMessage marks that, and Mentioned you says so at the foot.
 * Read, it's plain. Closed, it says so beside its time, and its tile fades,
 * but it opens as any other does. With `space` or `organization`, where it is
 * leads the row, in a quiet line over its subject, for lists that span more
 * than one: the organization's logo and name, then the space's.
 *
 * With `preview`, hovering or focusing it opens ConversationPreview, except
 * over `actions` or "+N more", which the preview would cover.
 */
export function ConversationRow({
  subject,
  href,
  onOpen,
  space,
  organization,
  at,
  people,
  count,
  unread = 0,
  mentionsYou = false,
  closed,
  related = [],
  actions,
  preview,
}: ConversationRowProps) {
  const [overControls, setOverControls] = useState(false);
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
        {space || organization ? <Place space={space} organization={organization} /> : null}
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
            sx={{
              flex: 1,
              minWidth: 0,
              /* In full, wrapping as it needs to, but on a phone one line, cut short. */
              overflowWrap: "anywhere",
              whiteSpace: { xs: "nowrap", sm: "normal" },
              overflow: { xs: "hidden", sm: "visible" },
              textOverflow: { xs: "ellipsis", sm: "clip" },
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
            <Box sx={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
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
          {/* Above the link that covers the row, so its popover opens, and the row's preview waits meanwhile. */}
          <Box
            onPointerEnter={() => setOverControls(true)}
            onPointerLeave={() => setOverControls(false)}
            onFocus={() => setOverControls(true)}
            onBlur={() => setOverControls(false)}
            sx={{
              position: "relative",
              zIndex: 1,
              flexShrink: 0,
              typography: "caption",
              color: isUnread ? "text.primary" : "text.secondary",
              fontWeight: isUnread ? 600 : undefined,
            }}
          >
            <DateTime value={at} relative />
          </Box>
          {actions ? (
            /* Above the link that covers the row. */
            <Box
              onPointerEnter={() => setOverControls(true)}
              onPointerLeave={() => setOverControls(false)}
              sx={{ position: "relative", zIndex: 1, alignSelf: "flex-start", mt: -0.5, mr: -0.75 }}
            >
              {actions}
            </Box>
          ) : null}
        </Box>

        {/*
         * Who's in it and how much has been said at the bottom left, at their
         * size; what it's related to takes the rest of the line. On a phone,
         * that takes a line of its own.
         */}
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            alignItems: "center",
            columnGap: 1.25,
            rowGap: 1,
            mt: 1.25,
          }}
        >
          <AvatarGroup
            max={4}
            sx={{
              flexShrink: 0,
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
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              flexShrink: 0,
              minHeight: 22,
              gap: 0.5,
              typography: "caption",
              color: "text.secondary",
            }}
          >
            <ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />
            {count}
            <Box component="span" sx={visuallyHidden}>
              {count === 1 ? "message" : "messages"}
            </Box>
          </Box>
          {mentionsYou ? (
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                flexShrink: 0,
                minHeight: 22,
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
          {related.length ? <Related items={related} onOverMore={setOverControls} /> : null}
        </Box>
      </Box>
    </Box>
  );

  return preview ? (
    <ConversationPreview {...preview} title={subject} suppressed={overControls}>
      {row}
    </ConversationPreview>
  ) : (
    row
  );
}

/*
 * Where a conversation is, over its subject: its organization's logo and
 * name, then its space's, as "Acme Logistics / Billing", on one line, cut
 * short where it's long. Without an organization, the space's icon leads
 * in the logo's place. The logo names the organization to assistive tech,
 * so its name beside it is hidden from it.
 */
function Place({ space, organization }: { space?: string; organization?: OrganizationProfile }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        minWidth: 0,
        mb: 0.5,
        typography: "caption",
        lineHeight: "16px",
        color: "text.secondary",
      }}
    >
      {organization ? (
        <OrganizationLogo organization={organization} size={16} />
      ) : (
        <WorkspacesOutlinedIcon aria-hidden sx={{ fontSize: 16, flex: "none" }} />
      )}
      <Box component="span" sx={{ minWidth: 0, ...cut }}>
        {organization ? (
          <Box component="span" aria-hidden sx={{ fontWeight: 600 }}>
            {organization.name}
          </Box>
        ) : null}
        {organization && space ? (
          <Box component="span" aria-hidden sx={{ mx: 0.75, color: "text.disabled" }}>
            /
          </Box>
        ) : null}
        {space ? (
          <>
            {space}
            <Box component="span" sx={visuallyHidden}>
              {" "}
              space
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}

/*
 * What a conversation is related to, at the right of its row's foot, never more
 * than a line: one entry per kind, its icon and its name where there's
 * one, cut short where it's long, or how many where there are more, their
 * names read out to assistive tech. As many kinds as fit, in order, then
 * "+N more" counting what's left, a ConversationRelatedPopover that opens
 * all of it, by kind. Hovering or clicking any of the rest is hovering or
 * clicking the row, so its preview opens there as anywhere else; only
 * "+N more" keeps it shut. On a phone it takes a line of its own, from the
 * left.
 */
function Related({
  items,
  onOverMore,
}: {
  items: ConversationRelated[];
  /** The pointer or focus is on "+N more", whose popover the row's preview would cover. */
  onOverMore: (over: boolean) => void;
}) {
  const groups = groupRelated(items);
  const listRef = useRef<HTMLUListElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(groups.length);

  /* How many kinds fit beside "+N more", from a hidden copy of them all: before it's first drawn, and again as the row's width changes. */
  useLayoutEffect(() => {
    const list = listRef.current;
    const measure = measureRef.current;
    if (!list || !measure) return;
    const fit = () => {
      const [more, ...widths] = Array.from(
        measure.children,
        (child) => child.getBoundingClientRect().width,
      );
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
      const room = list.clientWidth;
      /* The first n kinds, each with the gap after it. */
      const width = (n: number) => widths.slice(0, n).reduce((sum, w) => sum + w + gap, 0);
      if (width(widths.length) - gap <= room) {
        setShown(widths.length);
        return;
      }
      let n = widths.length - 1;
      while (n > 0 && width(n) + more > room) n--;
      setShown(n);
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(list);
    return () => observer.disconnect();
  }, [items]);

  const rest = groups.slice(shown).reduce((sum, group) => sum + group.items.length, 0);
  /* Gone, such as the row widening while it's hovered, it can't keep the preview shut. */
  useEffect(() => {
    if (!rest) onOverMore(false);
  }, [rest, onOverMore]);

  return (
    <Box
      sx={{
        position: "relative",
        flex: { xs: "1 1 100%", sm: "1 1 0" },
        minWidth: 0,
        /* Through to the link that covers the row, as the message is, but for "+N more". */
        pointerEvents: "none",
      }}
    >
      <Box
        component="ul"
        ref={listRef}
        aria-label="Related"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "flex-start", sm: "flex-end" },
          columnGap: RELATED_GAP,
          m: 0,
          p: 0,
          listStyle: "none",
        }}
      >
        {groups.slice(0, shown).map((group) => (
          <Box
            component="li"
            key={group.kind}
            sx={{ display: "flex", alignItems: "center", minWidth: 0, maxWidth: 200 }}
          >
            <RelatedEntry {...group} />
          </Box>
        ))}
        {rest ? (
          /* Above the link that covers the row, so its popover opens rather than the row. */
          <Box
            component="li"
            onPointerEnter={() => onOverMore(true)}
            onPointerLeave={() => onOverMore(false)}
            onFocus={() => onOverMore(true)}
            onBlur={() => onOverMore(false)}
            sx={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flex: "none",
              pointerEvents: "auto",
            }}
          >
            <ConversationRelatedPopover
              related={items}
              label={shown ? `+${rest} more` : undefined}
            />
          </Box>
        ) : null}
      </Box>
      {/* Every kind, and "+N more" at its widest, laid out but never seen, to measure what fits. */}
      <Box
        ref={measureRef}
        aria-hidden
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "max-content",
          display: "flex",
          columnGap: RELATED_GAP,
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        <ConversationRelatedPopover related={items} label={`+${items.length} more`} />
        {groups.map((group) => (
          <Box key={group.kind} sx={{ display: "flex", alignItems: "center", maxWidth: 200 }}>
            <RelatedEntry {...group} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/* One kind at the foot: a block as its CapacityName, anything else as its icon and its name, or how many. */
function RelatedEntry({ kind, items }: ReturnType<typeof groupRelated>[number]) {
  const { one, many, Icon, color } = RELATED[kind];
  const [first] = items;
  if (first.kind === "capacity" && items.length === 1) {
    return (
      <Box
        component="span"
        sx={{ display: "inline-flex", minWidth: 0, typography: "caption", color: "text.secondary" }}
      >
        <CapacityName block={first.block} number={relatedName(first)} />
      </Box>
    );
  }
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        minWidth: 0,
        typography: "caption",
        color: "text.secondary",
      }}
    >
      <Icon aria-hidden sx={{ fontSize: 16, flex: "none", color }} />
      {items.length === 1 ? (
        <>
          <Box component="span" sx={visuallyHidden}>
            {one}:{" "}
          </Box>
          <Box
            component="span"
            sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {relatedName(first)}
          </Box>
        </>
      ) : (
        <Box component="span" sx={{ whiteSpace: "nowrap" }}>
          {items.length} {many}
          <Box component="span" sx={visuallyHidden}>
            : {items.map(relatedName).join(", ")}
          </Box>
        </Box>
      )}
    </Box>
  );
}
