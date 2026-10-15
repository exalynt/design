import type { Ref } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import type { Toaster } from "./toast";

export type ToastSeverity = keyof Toaster;

const icons = {
  success: CheckCircleRoundedIcon,
  info: InfoRoundedIcon,
  warning: WarningRoundedIcon,
  error: ErrorRoundedIcon,
};

/* The width every toast is, from sm up. Below that it fills the screen. */
export const TOAST_WIDTH = 356;

export type ToastCardProps = {
  severity: ToastSeverity;
  message: string;
  onClose?: () => void;
  /** The card's height inside its border; ToastProvider sets it to stack cards. */
  height?: number;
  /** Hides the content, for a card tucked behind the one in front. */
  hideContent?: boolean;
  /** The content row, whose height is the card's natural height. */
  contentRef?: Ref<HTMLDivElement>;
};

/*
 * One toast: a slim card with the severity's icon in its color, the message
 * in regular body text, and a close button that shows on hover (always, on a
 * touch screen). Internal to ToastProvider, and to the docs' static examples.
 * The border sits outside `height` (content-box), so a stacked card cut to the
 * front card's height keeps its bottom edge, which is the part that peeks out.
 */
export function ToastCard({
  severity,
  message,
  onClose,
  height,
  hideContent,
  contentRef,
}: ToastCardProps) {
  const Icon = icons[severity];
  return (
    <Box
      sx={{
        boxSizing: "content-box",
        height,
        overflow: "hidden",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        boxShadow: 6,
        transition: "height 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        "@media (hover: hover)": {
          "& .ToastCard-close": { opacity: 0, transition: "opacity 150ms" },
          "&:hover .ToastCard-close, &:focus-within .ToastCard-close": { opacity: 1 },
        },
      }}
    >
      <Box
        ref={contentRef}
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.25,
          py: 1.5,
          pl: 1.75,
          pr: onClose ? 1 : 1.75,
          typography: "body2",
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 400,
          color: "text.primary",
          opacity: hideContent ? 0 : 1,
          transition: "opacity 200ms",
        }}
      >
        <Icon sx={{ fontSize: 18, mt: "1px", flexShrink: 0, color: `${severity}.main` }} />
        <Box sx={{ flex: 1, minWidth: 0, overflowWrap: "anywhere" }}>{message}</Box>
        {onClose ? (
          <IconButton
            className="ToastCard-close"
            aria-label="Dismiss"
            onClick={onClose}
            sx={{
              p: "2px",
              m: "-1px 0",
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
              /* 22px to look at, 38px to tap. */
              "&::after": { content: '""', position: "absolute", inset: -8 },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        ) : null}
      </Box>
    </Box>
  );
}
