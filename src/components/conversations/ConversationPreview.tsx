import {
  Children,
  cloneElement,
  useState,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ConversationThread } from "./ConversationMessage";
import { ConversationTile } from "./ConversationTile";
import { ThreadNote } from "./ThreadNote";

/* A little narrower than ConversationPopout, so the glance reads as a small one. */
const WIDTH = 400;

type PointerHandlers = {
  onPointerEnter?: (event: PointerEvent<HTMLElement>) => void;
  onPointerLeave?: (event: PointerEvent<HTMLElement>) => void;
};

export type ConversationPreviewProps = {
  /** The conversation's subject, in the title bar. */
  title: string;
  /** The latest few messages, oldest first: each a ConversationMessage, cut short with `lines`. */
  messages?: ReactNode;
  /** How many came before `messages`, counted rather than drawn. */
  earlier?: number;
  /** While the messages load: a spinner in their place. */
  loading?: boolean;
  /** The messages couldn't be loaded, so it says so in their place. */
  failed?: boolean;
  /** Each time it opens, so the messages can be read then rather than for every row of a list. */
  onOpen?: () => void;
  /** Keeps it shut meanwhile, such as while the pointer's over a menu in the row, which it would cover. */
  suppressed?: boolean;
  /** What it previews, such as a conversation's row in a list: one element that takes a ref. */
  children: ReactElement<PointerHandlers>;
};

/*
 * A glance at a conversation's latest messages, on hovering or focusing
 * what it previews (`children`), without opening it: ConversationPopout's
 * title bar and messages, read-only, on the same paper, so opening the
 * popout after a glance changes nothing but the size. Anything earlier is
 * counted, not drawn.
 *
 * Under a mouse it follows the pointer, below it, so it never covers the
 * row being read; from the keyboard it opens beside the row. A tap never
 * opens it, since a tap opens the row. Nothing in it can be clicked: it
 * closes as the pointer leaves the row.
 */
export function ConversationPreview({
  title,
  messages,
  earlier = 0,
  loading = false,
  failed = false,
  onOpen,
  suppressed = false,
  children,
}: ConversationPreviewProps) {
  const [open, setOpen] = useState(false);
  const [underMouse, setUnderMouse] = useState(false);
  const count = Children.count(messages);

  /* Known before it opens, so the pointer is followed from the first frame. */
  const trigger = cloneElement(children, {
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      setUnderMouse(event.pointerType === "mouse");
      children.props.onPointerEnter?.(event);
    },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => {
      setUnderMouse(false);
      children.props.onPointerLeave?.(event);
    },
  });

  return (
    <Tooltip
      title={
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              minHeight: 44,
              px: 1.5,
              borderBottom: 1,
              borderColor: "divider",
              bgcolor: "action.hover",
            }}
          >
            <ConversationTile />
            <Typography variant="subtitle2" component="p" noWrap sx={{ flex: 1, minWidth: 0 }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {loading ? (
              <Box sx={{ display: "grid", placeItems: "center", py: 2 }}>
                <CircularProgress size={20} aria-label="Loading the latest messages" />
              </Box>
            ) : failed ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                The latest messages could not be loaded.
              </Typography>
            ) : (
              <ConversationThread>
                {earlier > 0 ? (
                  <ThreadNote icon={<MoreHorizIcon />}>
                    {earlier} earlier {earlier === 1 ? "message" : "messages"}
                  </ThreadNote>
                ) : null}
                {messages}
                {count === 0 && earlier === 0 ? (
                  <ThreadNote icon={<ChatBubbleOutlineIcon />}>No messages yet</ThreadNote>
                ) : null}
              </ConversationThread>
            )}
          </Box>
        </Box>
      }
      open={open && !suppressed}
      onOpen={() => {
        setOpen(true);
        onOpen?.();
      }}
      onClose={() => setOpen(false)}
      describeChild
      disableInteractive
      disableTouchListener
      enterDelay={500}
      enterNextDelay={300}
      followCursor={underMouse}
      placement={underMouse ? "bottom-start" : "right-start"}
      slotProps={{
        tooltip: {
          sx: (theme) => ({
            p: 0,
            width: WIDTH,
            maxWidth: "calc(100vw - 32px)",
            overflow: "hidden",
            color: "text.primary",
            bgcolor: "background.paper",
            backgroundImage: "none",
            border: 1,
            borderColor: "divider",
            borderRadius: `${theme.shape.borderRadius}px`,
            boxShadow: theme.shadows[12],
          }),
        },
      }}
    >
      {trigger}
    </Tooltip>
  );
}
