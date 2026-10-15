import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DateTime } from "./DateTime";
import { FileTile } from "./FileTile";
import { mentionLabel, parseMentions, type MentionProfile } from "./mentions";
import { ProgressMedia, type ProgressMediaItem } from "./ProgressMedia";
import { ThreadNote } from "./ThreadNote";
import { DetailsPopover } from "./DetailsPopover";
import { EngineerDetails, type EngineerProfile } from "./EngineerDetails";
import type { UserProfile } from "./UserAttribution";
import { UserAvatar } from "./UserAvatar";

/* The author's picture beside a card, and in its header, at the header's text size. */
const AVATAR_SIZE = 32;
const HEADER_AVATAR_SIZE = 20;
const GAP = 2;
/*
 * With the reader's own messages in a thread, how far every message keeps
 * from the other side, as texts do: the same for both, so every card is
 * the same width, and the reader's sit off-centre to the right.
 */
const SIDE_INSET = "max(48px, 15%)";
/* A message longer than LONG lines starts cut to COLLAPSED of them, so a long one doesn't bury the rest; a line or two over isn't worth cutting. */
const COLLAPSED = 8;
/* A card narrow enough that the header's organization is just its logo, as in a popout or on a phone. */
const NARROW = "@container (max-width: 399.98px)";
/* Narrower still, the author's name goes too, leaving their picture, so the rest of the header isn't squeezed to nothing. */
const TIGHT = "@container (max-width: 339.98px)";
/* Out of sight but still read out, for what makes way on a tight card. */
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;
const LONG = 10;

export type ConversationThreadProps = {
  /** The messages, oldest first: each a ConversationMessage. */
  children: ReactNode;
  /** How many came before those shown, counted at the top of it. */
  earlier?: number;
  /** Show more of the `earlier` ones, from a button beside their count: read the next few, or reveal ones already to hand. */
  onShowEarlier?: () => void;
  /** While `onShowEarlier` reads them: a spinner in the button's place. */
  loadingEarlier?: boolean;
};

/*
 * A conversation's messages, as a list, each its own card, so no two run
 * together. The reader's own messages (`mine`) sit on
 * the right and everyone else's on the left, their teammates' included, and
 * where there are both, every card keeps the same distance from the other
 * side, so all are the same width, and the reader's sit off-centre as
 * texts do. Above the first `unread` message, a line across it counts the new ones, so where
 * they start is plain. A long conversation can start with its latest few,
 * the rest counted at the top (`earlier`), with Show more to bring in more
 * of them (`onShowEarlier`) as they're wanted.
 */
export function ConversationThread({
  children,
  earlier = 0,
  onShowEarlier,
  loadingEarlier = false,
}: ConversationThreadProps) {
  const items = Children.toArray(children);
  const isNew = (child: ReactNode): child is ReactElement<ConversationMessageProps> =>
    isValidElement<ConversationMessageProps>(child) && Boolean(child.props.unread);
  const first = items.find(isNew);
  if (first) {
    items.splice(
      items.indexOf(first),
      0,
      <NewMessagesLine key="new-messages" count={items.filter(isNew).length} />,
    );
  }

  return (
    <Stack
      component="ol"
      spacing={GAP}
      sx={{
        listStyle: "none",
        m: 0,
        p: 0,
        "& > li[data-side='end']": { pl: SIDE_INSET },
        "&:has(> li[data-side='end']) > li[data-side='start']": { pr: SIDE_INSET },
      }}
    >
      {earlier > 0 ? (
        <ThreadNote
          icon={<MoreHorizIcon />}
          aside={
            loadingEarlier ? (
              <CircularProgress size={16} aria-label="Loading earlier messages" />
            ) : onShowEarlier ? (
              <Button size="small" onClick={onShowEarlier} sx={{ my: -0.5 }}>
                Show more
              </Button>
            ) : null
          }
        >
          {earlier} earlier {earlier === 1 ? "message" : "messages"}
        </ThreadNote>
      ) : null}
      {items}
    </Stack>
  );
}

/*
 * Where the new messages start: a line in the primary color, saying how
 * many, across the whole thread, that ConversationPopout opens at.
 */
function NewMessagesLine({ count }: { count: number }) {
  return (
    <Box
      component="li"
      data-new-messages
      sx={{ display: "flex", alignItems: "center", gap: 1, color: "primary.main" }}
    >
      <Box sx={{ flex: 1, height: "1px", bgcolor: "primary.main" }} />
      <Typography variant="caption" sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
        {count} new {count === 1 ? "message" : "messages"}
      </Typography>
    </Box>
  );
}

/** The organization someone writes on behalf of, such as Exalynt or a client. */
export type OrganizationProfile = {
  name: string;
  /** Its logo's URL. Without one, or if it doesn't load, its initials. */
  logoUrl?: string;
};

/** A file sent with a message: an image or video, shown as ProgressMedia shows them, or a document. */
export type ConversationAttachment =
  | ProgressMediaItem
  | {
      kind: "document";
      url: string;
      /** The file's name, with its extension, which gives its type. */
      name: string;
      /** In bytes. */
      size?: number;
    };

export type ConversationMessageProps = {
  /** Who wrote it. An `EngineerProfile` can also open EngineerDetails, with `details`. */
  author: UserProfile | EngineerProfile;
  /** Open EngineerDetails on hover, focus, or tap of an engineer author's name or picture, as UserAttribution's `details` does. Ignored for anyone else. */
  details?: boolean;
  /** The organization they wrote it on behalf of, beside their name, where a conversation has people from more than one. */
  organization?: OrganizationProfile;
  /** From a teammate, in the organization the reader's in context of: on the left with everyone else's, but tagged Teammate after their name, their picture ringed, and tinted in the secondary color. */
  ours?: boolean;
  /** Where the author's picture goes: beside the card, or `header`, small, before their name in the card's top corner, which leaves the card the room. */
  avatar?: "beside" | "header";
  /** The author is on one of the reader's assigned teams, as a client's engineers at Exalynt are: tagged Your team, filled in the primary color. */
  assignedTeam?: boolean;
  /** The organization as just its logo, where room is short; it is anyway on a card under 400px wide. Hovering it still names it. */
  condensed?: boolean;
  /** The reader wrote it: on the right, its avatar too, off-centre and filled in the primary color, as a sent text is. Takes the place of `ours`. */
  mine?: boolean;
  /** When it was sent: an RFC 3339 timestamp in UTC, shown with DateTime. */
  at: string;
  /** What they wrote. Line breaks are kept, and as a string, its `<@id>` mentions (MentionField's) read as "@Name". */
  children?: ReactNode;
  /** The files sent with it: its pictures and videos as thumbnails that open full size, and its documents as tiles that open in a new tab. */
  attachments?: ConversationAttachment[];
  /** Who it can mention, so each `<@id>` reads as their current name: everyone in the conversation, past members too. */
  people?: MentionProfile[];
  /** Whoever's reading: their mentions are picked out in their own color. */
  you?: MentionProfile;
  /** The message that started the conversation, quietly marked as such. */
  original?: boolean;
  /** It names whoever's reading, so the header says so. Whether the text mentions `you` by default. */
  mentionsYou?: boolean;
  /** At most this many lines of it, for a glance at it, such as a row's preview, with no Show more. Its attachments are then just counted. Without it, a long message starts cut short with Show more, unless it's `unread`. */
  lines?: number;
  /** The reader hadn't read it when the conversation opened: a thick primary edge on its side and New in its header, over whichever color it has, under a line counting the new ones. */
  unread?: boolean;
};

/*
 * One message in a ConversationThread: the author's avatar beside a card,
 * or with `avatar="header"` small in its top corner before their name, and
 * the card's header saying who, on behalf of which
 * organization where that's given, and when. Each kind has its own color,
 * so none is mistaken for another: `mine`, the reader's own, sits on the
 * right, the avatar after the card, filled in the primary color as a sent
 * text is; `ours`, a teammate's, is tagged Teammate, its picture ringed,
 * and tinted in the secondary color, so it never rests on color alone; and
 * everyone else's is plain. The header is
 * one line, the name cut short
 * before the time is. Under the text, any files
 * sent with it. Each mention in the text,
 * kept by id, reads as "@" and that person's name in `people` now, so a
 * rename never leaves an old one behind. Others are picked out in the
 * primary color, and the reader in the warning color, as the header's
 * Mentions you is. Unread, it has a thick primary edge on its side and New
 * beside its time, a mark rather than a color, so it shows over a
 * teammate's tint as well as on a plain card.
 */
export function ConversationMessage({
  author,
  organization,
  ours: ourSide = false,
  mine = false,
  avatar = "beside",
  assignedTeam = false,
  details = false,
  condensed = false,
  at,
  children,
  people = [],
  you,
  original = false,
  mentionsYou,
  attachments = [],
  lines,
  unread = false,
}: ConversationMessageProps) {
  const media = attachments.filter((file): file is ProgressMediaItem => file.kind !== "document");
  const documents = attachments.filter(
    (file): file is Extract<ConversationAttachment, { kind: "document" }> =>
      file.kind === "document",
  );
  const hasText = typeof children === "string" ? Boolean(children.trim()) : children != null;
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  /* Whether it's long enough to cut, measured as it lays out, and whether the reader's opened or closed it; unread, it starts open. */
  const [long, setLong] = useState(false);
  const [expanded, setExpanded] = useState<boolean>();
  const open = expanded ?? unread;
  const clamp = lines ?? (long && !open ? COLLAPSED : undefined);

  /* Its whole height, cut or not, against its line height: again as its width changes, such as a popout being sized. */
  useEffect(() => {
    const text = textRef.current;
    if (!text || lines) return;
    const observer = new ResizeObserver(() => {
      const lineHeight = parseFloat(getComputedStyle(text).lineHeight);
      setLong(text.scrollHeight > lineHeight * LONG);
    });
    observer.observe(text);
    return () => observer.disconnect();
  }, [lines]);

  function toggle() {
    setExpanded(!open);
    /* Closing a long one can leave its top above the view: bring it back. */
    if (open) requestAnimationFrame(() => cardRef.current?.scrollIntoView({ block: "nearest" }));
  }
  const segments = typeof children === "string" ? parseMentions(children) : null;
  /*
   * Each kind in its own color, so none is mistaken for another: the
   * reader's own filled in the primary color, as a sent text is, their
   * teammates' in the secondary color, and everyone else's plain.
   */
  const tone = mine ? "primary" : ourSide ? "secondary" : null;
  /* A teammate's also say so in words and by a ring round their picture, so they never rest on color alone. */
  const teammate = ourSide && !mine;
  const engineer = details && "level" in author ? author : null;
  const showMentionsYou =
    mentionsYou ?? Boolean(you && segments?.some((part) => "id" in part && part.id === you.id));

  return (
    <Stack
      component="li"
      data-side={mine ? "end" : "start"}
      direction={mine ? "row-reverse" : "row"}
      spacing={1.5}
      sx={{ alignItems: "flex-start" }}
    >
      {avatar === "beside" ? (
        <Picture author={author} size={AVATAR_SIZE} ringed={teammate} engineer={engineer} />
      ) : null}
      <Box
        ref={cardRef}
        sx={(theme) => {
          const tint = (alpha: number) =>
            tone ? `rgba(${theme.vars.palette[tone].mainChannel} / ${alpha})` : undefined;
          const body = tint(mine ? 0.09 : 0.07);
          return {
            minWidth: 0,
            flex: 1,
            border: 1,
            borderColor: tint(0.35) ?? theme.vars.palette.divider,
            /* Unread, a thick edge on the side it comes from, whoever wrote it, with New in the header. */
            ...(unread && {
              [mine ? "borderRightWidth" : "borderLeftWidth"]: 3,
              [mine ? "borderRightColor" : "borderLeftColor"]: theme.vars.palette.primary.main,
            }),
            borderRadius: 1,
            overflow: "hidden",
            /* So what's in its header can make way by the card's own width, such as in a narrow popout, not just the screen's. */
            containerType: "inline-size",
            /* The tint over the paper, so it stays solid over whatever's behind. */
            bgcolor: "background.paper",
            backgroundImage: body ? `linear-gradient(${body}, ${body})` : undefined,
          };
        }}
      >
        {/* The reader's own mirror the rest: their name by their avatar, on the right, and the time on the left. */}
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: mine ? "row-reverse" : "row",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 0.75,
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: tone
              ? `rgba(${theme.vars.palette[tone].mainChannel} / 0.16)`
              : theme.vars.palette.action.hover,
          })}
        >
          {avatar === "header" ? (
            <Picture
              author={author}
              size={HEADER_AVATAR_SIZE}
              ringed={teammate}
              engineer={engineer}
            />
          ) : null}
          <AuthorName name={author.name} engineer={engineer} />
          {teammate ? (
            <HeaderTag
              icon={<GroupsOutlinedIcon />}
              label="Teammate"
              hint={organization ? `Your teammate at ${organization.name}` : "Your teammate"}
              color="secondary"
            />
          ) : null}
          {assignedTeam ? (
            <HeaderTag
              icon={<HandshakeOutlinedIcon />}
              label="Your team"
              hint={`On your ${organization ? `${organization.name} ` : ""}Engineering Team`}
              color="primary"
            />
          ) : null}
          {organization ? (
            <>
              <Separator />
              <Organization organization={organization} condensed={condensed} />
            </>
          ) : null}
          {original ? (
            /* The name matters more where there's only room for one. */
            <>
              <Separator hideOn={NARROW} />
              <Typography
                variant="caption"
                noWrap
                sx={{ color: "text.secondary", [NARROW]: { display: "none" } }}
              >
                Original message
              </Typography>
            </>
          ) : null}
          <Box sx={{ flex: 1 }} />
          {showMentionsYou ? (
            <Box
              role="img"
              aria-label="Mentions you"
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
              {/* On a phone the icon alone, so the name keeps its room. */}
              <Box component="span" aria-hidden sx={{ display: { xs: "none", sm: "inline" } }}>
                Mentions you
              </Box>
            </Box>
          ) : null}
          {unread ? (
            <Box
              sx={{
                flexShrink: 0,
                px: 0.75,
                borderRadius: 999,
                typography: "caption",
                fontWeight: 700,
                lineHeight: "18px",
                color: "primary.contrastText",
                bgcolor: "primary.main",
              }}
            >
              New
            </Box>
          ) : null}
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            <DateTime value={at} />
          </Typography>
        </Box>
        <Stack spacing={1.5} sx={{ px: 2, py: 1.5 }}>
          {hasText ? (
            <Typography
              ref={textRef}
              variant="body2"
              sx={[
                { whiteSpace: "pre-wrap", overflowWrap: "anywhere" },
                Boolean(clamp) && {
                  display: "-webkit-box",
                  WebkitLineClamp: clamp,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                },
                /* Cut short, it fades out, so it reads as more to come. A mask: only its opacity counts. */
                Boolean(clamp && !lines) && {
                  maskImage: "linear-gradient(to bottom, rgb(0 0 0) calc(100% - 3em), transparent)",
                },
              ]}
            >
              {segments
                ? segments.map((part, index) =>
                    "id" in part ? (
                      <Mention key={index} you={part.id === you?.id}>
                        {mentionLabel(part.id, you ? [you, ...people] : people)}
                      </Mention>
                    ) : (
                      part.text
                    ),
                  )
                : children}
            </Typography>
          ) : null}
          {hasText && long && !lines ? (
            <Button
              size="small"
              onClick={toggle}
              aria-expanded={open}
              endIcon={open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
              sx={{ alignSelf: "flex-start", mt: "-8px !important", ml: -1 }}
            >
              {open ? "Show less" : "Show more"}
            </Button>
          ) : null}
          {attachments.length && lines ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                typography: "caption",
                color: "text.secondary",
              }}
            >
              <AttachFileRoundedIcon sx={{ fontSize: 14 }} />
              {attachments.length} {attachments.length === 1 ? "attachment" : "attachments"}
            </Box>
          ) : null}
          {media.length && !lines ? <ProgressMedia items={media} /> : null}
          {documents.length && !lines ? (
            <Box
              component="ul"
              aria-label="Documents"
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, listStyle: "none", m: 0, p: 0 }}
            >
              {documents.map((file) => (
                <Box component="li" key={file.url} sx={{ minWidth: 0, maxWidth: "100%" }}>
                  <FileTile name={file.name} size={file.size} href={file.url} />
                </Box>
              ))}
            </Box>
          ) : null}
        </Stack>
      </Box>
    </Stack>
  );
}

/* A mention in a message: tinted in the primary color, or the warning color where it's the reader. */
function Mention({ you, children }: { you: boolean; children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={(theme) => {
        const role = you ? theme.vars.palette.warning : theme.vars.palette.primary;
        return {
          px: 0.25,
          borderRadius: 0.5,
          fontWeight: 600,
          color: role.main,
          bgcolor: `rgba(${role.mainChannel} / 0.12)`,
        };
      }}
    >
      {children}
    </Box>
  );
}

/*
 * Who someone writes on behalf of, after their name and a Separator: the
 * organization's logo, or its initials, and its name. On a card under 400px
 * wide, or `condensed`, just the logo, so the person's name keeps its room;
 * the logo names it to assistive tech either way, and on hover.
 */
function Organization({
  organization,
  condensed,
}: {
  organization: OrganizationProfile;
  /** Just its logo, which names it on hover. */
  condensed: boolean;
}) {
  const initials = organization.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  return (
    /* The logo and name together, so hovering either names it, as it must once just the logo shows. */
    <Tooltip title={organization.name}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          /* Its logo always, however far its name is cut. */
          minWidth: 16,
          flexShrink: 1000,
          color: "text.secondary",
        }}
      >
        <Avatar
          variant="rounded"
          src={organization.logoUrl}
          alt=""
          role="img"
          aria-label={organization.name}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0.5,
            fontSize: 8,
            fontWeight: 700,
            color: "text.primary",
            bgcolor: "action.selected",
          }}
        >
          {initials}
        </Avatar>
        <Typography
          variant="caption"
          noWrap
          aria-hidden
          sx={{
            display: condensed ? "none" : "block",
            [NARROW]: { display: "none" },
            fontWeight: 600,
            minWidth: 0,
          }}
        >
          {organization.name}
        </Typography>
      </Box>
    </Tooltip>
  );
}

/*
 * Between two things in a header: a dot, drawn so it's the same size in
 * any font, and set as its own item so the gap either side is the same.
 * It goes on a tight card, where the name it would follow has gone, and
 * with `hideOn` wherever what it introduces does.
 */
function Separator({ hideOn }: { hideOn?: string }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 4,
        height: 4,
        flexShrink: 0,
        borderRadius: "50%",
        bgcolor: "text.secondary",
        opacity: 0.6,
        [TIGHT]: { display: "none" },
        ...(hideOn && { [hideOn]: { display: "none" } }),
      }}
    />
  );
}

/*
 * The author's name, cut short where there's no room, and gone from sight
 * on a tight card. With `engineer`, it opens EngineerDetails, and takes
 * focus so it opens from the keyboard too.
 */
function AuthorName({ name, engineer }: { name: string; engineer: EngineerProfile | null }) {
  const text = (
    <Typography
      variant="subtitle2"
      noWrap
      tabIndex={engineer ? 0 : undefined}
      sx={[
        { minWidth: 0, [TIGHT]: visuallyHidden },
        Boolean(engineer) && {
          cursor: "help",
          borderRadius: 0.5,
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        },
      ]}
    >
      {name}
    </Typography>
  );
  return engineer ? (
    <DetailsPopover title={<EngineerDetails engineer={engineer} />}>{text}</DetailsPopover>
  ) : (
    text
  );
}

/*
 * Someone's picture, ringed in the secondary color for a teammate: a mark
 * of shape as well as color. With `engineer`, hovering or tapping it opens
 * EngineerDetails, as their name does; only the name takes focus, so it's
 * one stop.
 */
function Picture({
  author,
  size,
  ringed,
  engineer,
}: {
  author: UserProfile;
  size: number;
  ringed: boolean;
  engineer: EngineerProfile | null;
}) {
  const picture = (
    <Box
      sx={{
        display: "flex",
        flexShrink: 0,
        borderRadius: "50%",
        cursor: engineer ? "help" : undefined,
        ...(ringed && {
          outline: "2px solid",
          outlineColor: "secondary.main",
          outlineOffset: size > 24 ? 2 : 1,
        }),
      }}
    >
      <UserAvatar name={author.name} src={author.avatarUrl} size={size} />
    </Box>
  );
  return engineer ? (
    <DetailsPopover title={<EngineerDetails engineer={engineer} />}>{picture}</DetailsPopover>
  ) : (
    picture
  );
}

/*
 * A tag after the author's name saying who they are to the reader:
 * Teammate in the secondary color, or Your team in the primary. Just its
 * icon, filled, so the name keeps its room; its label names it to
 * assistive tech, and hovering it says more (`hint`).
 */
function HeaderTag({
  icon,
  label,
  hint,
  color,
}: {
  icon: ReactNode;
  label: string;
  hint: string;
  color: "primary" | "secondary";
}) {
  return (
    <Tooltip title={hint}>
      <Box
        role="img"
        aria-label={label}
        sx={{
          display: "inline-grid",
          placeItems: "center",
          flexShrink: 0,
          width: 18,
          height: 18,
          borderRadius: 1,
          color: `${color}.contrastText`,
          bgcolor: `${color}.main`,
          "& svg": { fontSize: 13 },
        }}
      >
        {icon}
      </Box>
    </Tooltip>
  );
}
