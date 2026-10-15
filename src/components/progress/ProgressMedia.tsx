import { useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

export type ProgressMediaItem = {
  kind: "image" | "video";
  url: string;
  /** What it shows, for assistive tech and as its caption when open. */
  name: string;
  /** A still for a video's thumbnail. Without one, the thumbnail is a plain play button. */
  poster?: string;
};

export type ProgressMediaProps = {
  items: ProgressMediaItem[];
};

/*
 * What shows the progress, such as screenshots and screen recordings, as a
 * row of thumbnails that wraps. Each opens full size over the page, darkened
 * behind it, with its name under it and the others a step away by button or
 * arrow key; a video plays there with its controls. A click on the dark
 * around it, the close button, or Escape closes it.
 */
/* The previous and next buttons, on the dark either side of what's open. */
const side = (edge: "left" | "right") => ({
  position: "absolute",
  top: "50%",
  [edge]: { xs: 4, sm: 16 },
  transform: "translateY(-50%)",
  color: "common.white",
  bgcolor: "rgba(0 0 0 / 0.4)",
  "&:hover": { bgcolor: "rgba(0 0 0 / 0.6)" },
});

export function ProgressMedia({ items }: ProgressMediaProps) {
  const [open, setOpen] = useState<number | null>(null);
  const item = open === null ? null : items[open];
  const step = (by: number) =>
    setOpen((index) => (index === null ? null : (index + by + items.length) % items.length));

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {items.map((media, index) => (
          <ButtonBase
            key={media.url}
            onClick={() => setOpen(index)}
            aria-label={`${media.kind === "video" ? "Play" : "Open"} ${media.name}`}
            sx={{
              position: "relative",
              width: 128,
              aspectRatio: "16 / 10",
              overflow: "hidden",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              bgcolor: "action.hover",
              "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
            }}
          >
            {media.kind === "image" || media.poster ? (
              <Box
                component="img"
                src={media.kind === "image" ? media.url : media.poster}
                alt=""
                sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            ) : null}
            {media.kind === "video" ? (
              <PlayArrowRoundedIcon
                sx={{
                  position: "absolute",
                  fontSize: 28,
                  p: 0.5,
                  borderRadius: "50%",
                  color: "common.white",
                  bgcolor: "rgba(0 0 0 / 0.55)",
                }}
              />
            ) : null}
          </ButtonBase>
        ))}
      </Box>

      <Dialog
        open={item !== null}
        onClose={() => setOpen(null)}
        fullScreen
        aria-label={item?.name}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") step(-1);
          if (event.key === "ArrowRight") step(1);
        }}
        slotProps={{
          backdrop: { sx: { bgcolor: "rgba(0 0 0 / 0.75)" } },
          /* Cleared of the theme's dialog card, edge to edge on a phone too. */
          paper: {
            sx: {
              "&&": {
                m: 0,
                width: "100%",
                maxWidth: "100%",
                maxHeight: "100%",
                border: 0,
                borderRadius: 0,
                boxShadow: "none",
                bgcolor: "transparent",
                backgroundImage: "none",
              },
            },
          },
        }}
      >
        {item ? (
          <Box
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(null);
            }}
            sx={{
              position: "relative",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              px: { xs: 1, sm: 9 },
              py: 8,
              boxSizing: "border-box",
              color: "common.white",
            }}
          >
            <IconButton
              aria-label="Close"
              onClick={() => setOpen(null)}
              sx={{ position: "absolute", top: 12, right: 12, color: "inherit" }}
            >
              <CloseRoundedIcon />
            </IconButton>
            {items.length > 1 ? (
              <>
                <IconButton aria-label="Previous" onClick={() => step(-1)} sx={side("left")}>
                  <ChevronLeftRoundedIcon />
                </IconButton>
                <IconButton aria-label="Next" onClick={() => step(1)} sx={side("right")}>
                  <ChevronRightRoundedIcon />
                </IconButton>
              </>
            ) : null}
            {item.kind === "image" ? (
              <Box
                component="img"
                src={item.url}
                alt={item.name}
                sx={{
                  display: "block",
                  minHeight: 0,
                  maxWidth: "min(100%, 1200px)",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box
                component="video"
                key={item.url}
                src={item.url}
                poster={item.poster}
                controls
                autoPlay
                sx={{
                  display: "block",
                  minHeight: 0,
                  maxWidth: "min(100%, 1200px)",
                  maxHeight: "100%",
                }}
              />
            )}
            <Box sx={{ flex: "none", textAlign: "center", fontSize: 15 }}>
              {item.name}
              {items.length > 1 ? (
                <Box component="span" sx={{ ml: 1, opacity: 0.6 }}>
                  {open! + 1} of {items.length}
                </Box>
              ) : null}
            </Box>
          </Box>
        ) : null}
      </Dialog>
    </>
  );
}
