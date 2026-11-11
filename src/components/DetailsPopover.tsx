import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import type { ReactElement, ReactNode } from "react";

const cleared = {
  padding: 0,
  maxWidth: "none",
  backgroundColor: "transparent",
  border: 0,
  boxShadow: "none",
};

/*
 * The popover a stability mark, a maturity, or a DateTime opens on hover, focus, or tap,
 * and an app's own, for what a word on its page means.
 * Its content draws its own card (DetailsCard), so the tooltip's is cleared.
 * `hoverOnly` is for something a tap does something else on, such as a table row: it opens
 * after a moment on hover, lets the pointer through to what's under it, and never on a tap.
 */
export type DetailsPopoverProps = {
  /** What it opens: a DetailsCard. */
  title: ReactNode;
  hoverOnly?: boolean;
  /** What it opens over, which takes focus (`tabIndex={0}` on a span) and shows `cursor: help`. */
  children: ReactElement;
};

export function DetailsPopover({ title, hoverOnly = false, children }: DetailsPopoverProps) {
  return (
    <Tooltip
      describeChild
      enterTouchDelay={0}
      leaveTouchDelay={8000}
      enterDelay={hoverOnly ? 250 : undefined}
      disableInteractive={hoverOnly}
      disableTouchListener={hoverOnly}
      title={title}
      slotProps={{
        tooltip: {
          /* Cleared in dark too: a theme's dark tooltip styles (Exalynt's
             included) sit behind a more specific selector than plain sx, and
             would draw the tooltip's own box around the card's corners. */
          sx: (theme) => ({ ...cleared, ...theme.applyStyles("dark", cleared) }),
        },
      }}
    >
      {children}
    </Tooltip>
  );
}

/* The popover's card, or with `card={false}` just its text, for a card of your own. */
export type DetailsCardProps = { card: boolean; children: ReactNode };

export function DetailsCard({ card, children }: DetailsCardProps) {
  return (
    <Box
      sx={[
        {
          boxSizing: "border-box",
          fontSize: card ? 12.5 : 14,
          fontWeight: 400,
          lineHeight: 1.5,
          textAlign: "left",
          color: "text.primary",
        },
        card && {
          width: 300,
          maxWidth: "calc(100vw - 24px)",
          px: 2,
          py: 1.75,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderRadius: 2.5,
          boxShadow: 8,
        },
      ]}
    >
      {children}
    </Box>
  );
}

/* The small uppercase line a popover opens with. */
export type DetailsEyebrowProps = { children: ReactNode };

export function DetailsEyebrow({ children }: DetailsEyebrowProps) {
  return (
    <Box
      sx={{
        fontSize: "0.84em",
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "text.secondary",
      }}
    >
      {children}
    </Box>
  );
}

/* A popover's closing link: an ordinary link, in the theme's link color and underlined. To
   the readme, it opens in a new tab so the reader keeps their place; with `newTab={false}`,
   for a page in the app, it opens in the same tab. */
export type DetailsLinkProps = { href: string; newTab?: boolean; children: ReactNode };

export function DetailsLink({ href, newTab = true, children }: DetailsLinkProps) {
  return (
    <Link
      href={href}
      {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      underline="always"
      sx={{
        display: "inline-block",
        mt: 1.5,
        fontSize: "0.92em",
        fontWeight: 500,
        textUnderlineOffset: 2,
      }}
    >
      {children}
      {newTab ? " ↗" : null}
    </Link>
  );
}
