import {
  Children,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Portal from "@mui/material/Portal";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme, type SxProps, type Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/CloseRounded";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import FilterNoneRoundedIcon from "@mui/icons-material/FilterNoneRounded";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { ConversationThread, type OrganizationProfile } from "./ConversationMessage";
import { ConversationPlace } from "./ConversationPlace";
import { ConversationRelatedDetails } from "./ConversationRelatedDetails";
import { ConversationTile } from "./ConversationTile";
import { MessageComposer } from "./MessageComposer";
import type { MentionProfile } from "./mentions";
import type { ConversationRelated } from "./related";
import { TypingIndicator } from "./TypingIndicator";
import type { UserProfile } from "../engineers/UserAttribution";

/* Its size where the screen has room, and the smallest it sizes to: still room to read a message above the reply box. */
const WIDTH = 560;
const HEIGHT = 560;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 360;
/* From the screen's edges, where it opens and when maximized. */
const MARGIN = 16;
/* The title bar's height, which is all a minimized popout shows. */
const BAR_HEIGHT = 44;
/* The Related sidebar, or most of a narrower popout, so a strip of the messages still shows beside it. */
const SIDEBAR_WIDTH = 300;

/* Normal is where it was put, at the size it was given. */
type Mode = "normal" | "minimized" | "maximized";

export type ConversationPopoutProps = {
  /** The conversation's subject, in the title bar. */
  title: string;
  /** The space it's in, by name, in a line over the title, as ConversationRow has it, where it could be any of several. */
  space?: string;
  /** Its space's organization, by its logo and name before the space, where it could be any of several organizations'. */
  organization?: OrganizationProfile;
  /** Its messages, oldest first: each a ConversationMessage. A long conversation's latest few, with `earlier`. */
  children?: ReactNode;
  /** How many came before those shown, counted at the top (ConversationThread's). */
  earlier?: number;
  /** Show more of the `earlier` ones, from beside their count. What's being read holds still as they come in above it. */
  onShowEarlier?: () => void;
  /** While `onShowEarlier` reads them. */
  loadingEarlier?: boolean;
  onClose: () => void;
  /** Send a reply: the text trimmed, with mentions as `<@id>`, and any files attached. Without it, no reply box. The box empties unless it returns `false`. */
  onSend?: (body: string, attachments: File[]) => boolean | void | Promise<boolean | void>;
  /** Who can be @mentioned in a reply, such as everyone in the conversation but the reader. */
  people?: MentionProfile[];
  /** Let a reply carry images, videos and documents, attached with the paperclip or dropped on the reply box. */
  canAttach?: boolean;
  /** Who else is writing in it now, said just above the reply box (TypingIndicator). */
  typing?: UserProfile[];
  /** While a reply is on its way: the button waits, and the text stays as written. */
  sending?: boolean;
  /** While its messages load: a spinner in their place, and no reply box yet. */
  loading?: boolean;
  /** In place of the reply box, for a conversation that takes no replies, such as a closed one. */
  notice?: ReactNode;
  /** The conversation's own page, opened in a new tab from the title bar. */
  href?: string;
  /** Mark it unread to come back to, from the title bar, which then closes it, as an inbox goes back to the list. */
  onMarkUnread?: () => void;
  /** What it's related to: a Related tab at the top right opens them in a sidebar (ConversationRelatedDetails) that slides in over the messages. */
  related?: ConversationRelated[];
  /** Ahead of the title bar's controls, such as a StabilityMark. */
  actions?: ReactNode;
  /** Where its top-left corner first opens, in px from the screen's. Bottom right by default. */
  defaultPosition?: { x: number; y: number };
  /** Its stacking, for several at once: raise the one in `onFocus`. Just above a drawer by default. */
  zIndex?: number;
  /** When it's clicked or takes focus, so several can bring the latest to the front. */
  onFocus?: () => void;
};

/*
 * A conversation in a window that floats over the page, to read and reply to
 * without leaving it. Drag its title bar to put it anywhere, and its
 * bottom-right corner to size it. The title bar minimizes it to just the
 * bar, maximizes it to fill the screen (as does double-clicking the bar),
 * restores it from either, and opens `href` in a new tab. Esc or its X
 * closes it. It opens at the first `unread` ConversationMessage, or else the
 * latest, with the cursor in the reply box (MessageComposer), and scrolls to
 * the latest as more arrive. A long one can open at its latest few, with
 * `earlier` and `onShowEarlier` to bring in more above. Keep which were unread as it opened, so marking
 * it read on opening doesn't clear them while they're read; `onMarkUnread`
 * puts a Mark as unread button in the title bar, and `related` a Related tab
 * that slides what it's related to in from the right, as a sidebar. `space`
 * and `organization` say where it is, in a quiet line over the title. Its draft,
 * and any files attached with `canAttach`, last while it's minimized.
 *
 * It keeps its own place, size and mode, but not which are open: render one
 * per open conversation and drop it on `onClose`. Only the corner sizes it,
 * not its edges.
 */
export function ConversationPopout({
  title,
  space,
  organization,
  children,
  earlier,
  onShowEarlier,
  loadingEarlier,
  onClose,
  onSend,
  people = [],
  canAttach = false,
  typing = [],
  sending = false,
  loading = false,
  notice,
  href,
  onMarkUnread,
  related = [],
  actions,
  defaultPosition,
  zIndex,
  onFocus,
}: ConversationPopoutProps) {
  const theme = useTheme();
  const phone = useMediaQuery(theme.breakpoints.down("sm"));
  const [size, setSize] = useState(() => ({
    width: Math.min(WIDTH, globalThis.innerWidth - MARGIN * 2),
    height: Math.min(HEIGHT, globalThis.innerHeight - MARGIN * 2),
  }));
  const [position, setPosition] = useState(
    () =>
      defaultPosition ?? {
        x: Math.max(0, globalThis.innerWidth - size.width - MARGIN),
        y: Math.max(0, globalThis.innerHeight - size.height - MARGIN),
      },
  );
  const [mode, setMode] = useState<Mode>("normal");
  const [showRelated, setShowRelated] = useState(false);
  const relatedId = useId();
  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const paperRef = useRef<HTMLDivElement>(null);
  const replyRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  /* How many messages it last scrolled for: none, until it first shows some. */
  const scrolledFor = useRef(0);
  /* While earlier messages come in: how far the view was from the bottom, to hold it there. */
  const fromBottom = useRef<number | null>(null);
  /* While the title bar is being dragged: where in it the pointer took hold. */
  const grab = useRef<{ x: number; y: number } | null>(null);
  /* While the corner is being dragged: where the pointer and the size started. */
  const stretch = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  const open = phone || mode !== "minimized";
  const movable = !phone && mode !== "maximized";
  const count = Children.count(children);
  const canReply = Boolean(onSend) && !notice && !loading;

  /* Reading the latest and maybe replying is what it's opened for, so start there. */
  useEffect(() => {
    if (open && canReply) replyRef.current?.focus({ preventScroll: true });
  }, [open, canReply]);

  /*
   * First to where the new messages start, if any, under a little of what
   * came before; then the latest as more arrive. Earlier ones shown above
   * leave what's being read where it was. Before paint, so it never jumps.
   */
  useLayoutEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    if (fromBottom.current !== null && count > scrolledFor.current) {
      scroller.scrollTop = scroller.scrollHeight - fromBottom.current;
      fromBottom.current = null;
      scrolledFor.current = count;
      return;
    }
    const line = scrolledFor.current
      ? null
      : scroller.querySelector<HTMLElement>("[data-new-messages]");
    if (count) scrolledFor.current = count;
    scroller.scrollTo({
      top: line
        ? scroller.scrollTop +
          line.getBoundingClientRect().top -
          scroller.getBoundingClientRect().top -
          48
        : scroller.scrollHeight,
    });
  }, [open, count]);

  function startDrag(event: PointerEvent<HTMLElement>) {
    if (!movable || event.button !== 0 || (event.target as HTMLElement).closest("a, button"))
      return;
    event.currentTarget.setPointerCapture(event.pointerId);
    grab.current = { x: event.clientX - position.x, y: event.clientY - position.y };
  }

  /* Anywhere on screen, as long as the title bar can still be reached. */
  function drag(event: PointerEvent<HTMLElement>) {
    if (!grab.current || !paperRef.current) return;
    setPosition({
      x: clamp(
        event.clientX - grab.current.x,
        0,
        globalThis.innerWidth - paperRef.current.offsetWidth,
      ),
      y: clamp(event.clientY - grab.current.y, 0, globalThis.innerHeight - BAR_HEIGHT),
    });
  }

  function startStretch(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    stretch.current = { x: event.clientX, y: event.clientY, ...size };
  }

  /* No smaller than the minimum, and no further than the screen's edge. */
  function resize(event: PointerEvent<HTMLElement>) {
    const start = stretch.current;
    if (!start) return;
    setSize({
      width: clamp(
        start.width + event.clientX - start.x,
        MIN_WIDTH,
        globalThis.innerWidth - position.x,
      ),
      height: clamp(
        start.height + event.clientY - start.y,
        MIN_HEIGHT,
        globalThis.innerHeight - position.y,
      ),
    });
  }

  function toggle(to: Exclude<Mode, "normal">) {
    setMode((current) => (current === to ? "normal" : to));
  }

  async function send(body: string) {
    if (!onSend || (await onSend(body, attachments)) === false) return;
    setDraft("");
    setAttachments([]);
  }

  return (
    <Portal>
      <Paper
        ref={paperRef}
        role="dialog"
        aria-label={title}
        elevation={12}
        onPointerDownCapture={onFocus}
        onFocusCapture={onFocus}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          /* The sidebar first, then the popout. */
          if (showRelated) setShowRelated(false);
          else onClose();
        }}
        sx={[
          {
            position: "fixed",
            zIndex: zIndex ?? theme.zIndex.drawer + 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: 1,
            borderColor: "divider",
          },
          phone
            ? { inset: 0, borderRadius: 0 }
            : mode === "maximized"
              ? { inset: MARGIN }
              : {
                  left: position.x,
                  top: position.y,
                  width: size.width,
                  height: mode === "minimized" ? "auto" : size.height,
                  maxWidth: `calc(100vw - ${MARGIN * 2}px)`,
                  maxHeight: `calc(100vh - ${MARGIN * 2}px)`,
                },
        ]}
      >
        <Box
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={() => (grab.current = null)}
          onPointerCancel={() => (grab.current = null)}
          onDoubleClick={(event) => {
            if (!phone && !(event.target as HTMLElement).closest("a, button")) toggle("maximized");
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            minHeight: BAR_HEIGHT,
            pl: 1.5,
            pr: 1,
            borderBottom: open ? 1 : 0,
            borderColor: "divider",
            bgcolor: "action.hover",
            cursor: movable ? "grab" : undefined,
            touchAction: "none",
            userSelect: "none",
            "&:active": movable ? { cursor: "grabbing" } : undefined,
          }}
        >
          <ConversationTile />
          <Box sx={{ flex: 1, minWidth: 0, py: 0.75 }}>
            {space || organization ? (
              <ConversationPlace space={space} organization={organization} />
            ) : null}
            <Typography variant="subtitle2" component="h2" noWrap>
              {title}
            </Typography>
          </Box>
          {actions}
          {related.length ? (
            <RelatedTab
              selected={open && showRelated}
              controls={relatedId}
              onClick={() => {
                /* Minimized, it opens back up to show them. */
                if (!open) {
                  setMode("normal");
                  setShowRelated(true);
                } else setShowRelated(!showRelated);
              }}
            />
          ) : null}
          {/* The window's own controls, set close together, as a desktop window's are. */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
            {onMarkUnread ? (
              <BarButton
                label="Mark as unread"
                onClick={() => {
                  onMarkUnread();
                  onClose();
                }}
              >
                <MarkChatUnreadOutlinedIcon />
              </BarButton>
            ) : null}
            {href ? (
              <BarButton label="Open in a new tab" href={href}>
                <OpenInNewRoundedIcon />
              </BarButton>
            ) : null}
            {phone ? null : (
              <>
                <BarButton
                  label={mode === "minimized" ? "Restore" : "Minimize"}
                  onClick={() => toggle("minimized")}
                >
                  <RemoveRoundedIcon />
                </BarButton>
                <BarButton
                  label={mode === "maximized" ? "Restore" : "Maximize"}
                  onClick={() => toggle("maximized")}
                >
                  {mode === "maximized" ? (
                    <FilterNoneRoundedIcon sx={{ fontSize: "14px !important" }} />
                  ) : (
                    <CropSquareRoundedIcon />
                  )}
                </BarButton>
              </>
            )}
            <BarButton label="Close" onClick={onClose} danger>
              <CloseIcon />
            </BarButton>
          </Box>
        </Box>

        {open ? (
          <Box
            sx={{
              position: "relative",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box ref={scrollRef} sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: 2 }}>
              {loading ? (
                <Box sx={{ display: "grid", placeItems: "center", py: 6 }}>
                  <CircularProgress size={24} aria-label="Loading the conversation" />
                </Box>
              ) : (
                <ConversationThread
                  earlier={earlier}
                  loadingEarlier={loadingEarlier}
                  onShowEarlier={
                    onShowEarlier &&
                    (() => {
                      const scroller = scrollRef.current;
                      if (scroller) fromBottom.current = scroller.scrollHeight - scroller.scrollTop;
                      onShowEarlier();
                    })
                  }
                >
                  {children}
                </ConversationThread>
              )}
            </Box>

            {notice || canReply ? (
              <Box sx={{ p: 2, pt: notice ? 1.5 : 0.75, borderTop: 1, borderColor: "divider" }}>
                {notice ?? (
                  <>
                    <Box sx={{ mb: 0.5 }}>
                      <TypingIndicator people={typing} />
                    </Box>
                    <MessageComposer
                      inputRef={replyRef}
                      value={draft}
                      onChange={setDraft}
                      onSend={(body) => void send(body)}
                      sending={sending}
                      people={people}
                      attachments={attachments}
                      onAttachmentsChange={canAttach ? setAttachments : undefined}
                    />
                  </>
                )}
              </Box>
            ) : null}

            {related.length ? (
              <RelatedSidebar
                id={relatedId}
                open={showRelated}
                related={related}
                onClose={() => setShowRelated(false)}
              />
            ) : null}
          </Box>
        ) : null}

        {movable && open ? (
          <Box
            aria-hidden
            onPointerDown={startStretch}
            onPointerMove={resize}
            onPointerUp={() => (stretch.current = null)}
            onPointerCancel={() => (stretch.current = null)}
            sx={(theme) => ({
              position: "absolute",
              /* Small enough to stay clear of the Reply button above it. */
              right: 1,
              bottom: 1,
              width: 18,
              height: 18,
              display: "grid",
              placeItems: "center",
              borderRadius: 1,
              color: "text.secondary",
              cursor: "nwse-resize",
              touchAction: "none",
              transition: theme.transitions.create(["color", "background-color"], {
                duration: theme.transitions.duration.shortest,
              }),
              "&:hover, &:active": {
                color: "primary.main",
                bgcolor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`,
              },
            })}
          >
            {/* A triangle of dots in the corner, the usual grip for a corner that sizes. */}
            <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="8.5" cy="1.5" r="1.25" />
              <circle cx="8.5" cy="5" r="1.25" />
              <circle cx="5" cy="5" r="1.25" />
              <circle cx="8.5" cy="8.5" r="1.25" />
              <circle cx="5" cy="8.5" r="1.25" />
              <circle cx="1.5" cy="8.5" r="1.25" />
            </svg>
          </Box>
        ) : null}
      </Paper>
    </Portal>
  );
}

/*
 * The title bar's Related tab, at its top right ahead of the window's
 * controls: its icon and name, filled in the primary color while its
 * sidebar is open, as a selected tab is.
 */
function RelatedTab({
  selected,
  controls,
  onClick,
}: {
  selected: boolean;
  controls: string;
  onClick: () => void;
}) {
  return (
    <Box
      component="button"
      type="button"
      aria-expanded={selected}
      aria-controls={controls}
      onClick={onClick}
      sx={(theme) => ({
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        gap: 0.5,
        height: { xs: 40, sm: 28 },
        px: 1,
        border: 0,
        borderRadius: 1.5,
        font: "inherit",
        typography: "caption",
        fontWeight: 600,
        cursor: "pointer",
        color: selected ? "primary.main" : "text.secondary",
        bgcolor: selected
          ? `rgba(${theme.vars.palette.primary.mainChannel} / 0.12)`
          : "transparent",
        transition: theme.transitions.create(["background-color", "color"], {
          duration: theme.transitions.duration.shortest,
        }),
        "& svg": { fontSize: 16 },
        "&:hover": selected
          ? { bgcolor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.18)` }
          : { color: "text.primary", bgcolor: "action.selected" },
        "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: -2 },
      })}
    >
      <HubOutlinedIcon />
      Related
    </Box>
  );
}

/*
 * What the conversation is related to, in a sidebar that slides in from the
 * right over the messages and reply box, as tall as they are: 300px, or most
 * of a narrower popout, scrolling on its own. Shut, it's out of sight and
 * out of the tab order. It appears without sliding for anyone who's asked
 * for less motion.
 */
function RelatedSidebar({
  id,
  open,
  related,
  onClose,
}: {
  id: string;
  open: boolean;
  related: ConversationRelated[];
  onClose: () => void;
}) {
  return (
    <Box
      component="aside"
      id={id}
      aria-label="Related"
      sx={(theme) => ({
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        maxWidth: "85%",
        display: "flex",
        flexDirection: "column",
        borderLeft: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: open ? theme.shadows[8] : "none",
        transform: open ? "none" : "translateX(100%)",
        visibility: open ? "visible" : "hidden",
        transition: theme.transitions.create(["transform", "visibility", "box-shadow"], {
          duration: open
            ? theme.transitions.duration.enteringScreen
            : theme.transitions.duration.leavingScreen,
          easing: theme.transitions.easing.easeOut,
        }),
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
      })}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <BarButton label="Close related" onClick={onClose}>
          <CloseIcon />
        </BarButton>
      </Box>
      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", p: 2, pr: 6 }}>
        <ConversationRelatedDetails related={related} card={false} />
      </Box>
    </Box>
  );
}

/*
 * A title bar control: an action, or a link that opens in a new tab given
 * `href`. A muted 16px icon in a rounded square that only shows on hover, so
 * the controls don't outweigh the title. `danger` (Close) turns red on hover.
 */
function BarButton({
  label,
  onClick,
  href,
  danger = false,
  children,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
  children: ReactNode;
}) {
  const sx: SxProps<Theme> = (theme) => ({
    /* Full size to tap on a phone, where it's just Close and the link. */
    width: { xs: 40, sm: 28 },
    height: { xs: 40, sm: 28 },
    p: 0,
    borderRadius: 1.5,
    color: "text.secondary",
    "& svg": { fontSize: 16 },
    transition: theme.transitions.create(["background-color", "color"], {
      duration: theme.transitions.duration.shortest,
    }),
    "&:hover": danger
      ? { color: "error.main", bgcolor: `rgba(${theme.vars.palette.error.mainChannel} / 0.12)` }
      : { color: "text.primary", bgcolor: "action.selected" },
  });
  return (
    <Tooltip title={label}>
      {href ? (
        <IconButton aria-label={label} href={href} target="_blank" rel="noopener" sx={sx}>
          {children}
        </IconButton>
      ) : (
        <IconButton aria-label={label} onClick={onClick} sx={sx}>
          {children}
        </IconButton>
      )}
    </Tooltip>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}
