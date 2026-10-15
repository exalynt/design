import { useCallback, type ReactNode } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/CloseRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { fileExtension, fileSize } from "./attachments";

const tile = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  width: { xs: "100%", sm: 220 },
  minWidth: 0,
  p: 0.75,
  border: 1,
  borderColor: "divider",
  borderRadius: 1,
  bgcolor: "background.paper",
  textAlign: "left",
} as const;

/*
 * A file as a message shows it, written or sent: a look at it (`preview`, or
 * a document's icon), its name, and its type and size. Given `href`, the
 * whole tile opens it in a new tab; given `onRemove`, a button takes it off.
 */
export function FileTile({
  name,
  size,
  preview,
  href,
  onRemove,
}: {
  name: string;
  /** In bytes. */
  size?: number;
  /** A picture or a video's first frame, in place of the icon. */
  preview?: ReactNode;
  href?: string;
  onRemove?: () => void;
}) {
  const type = fileExtension(name).toUpperCase() || "File";
  const content = (
    <>
      <Box
        aria-hidden
        sx={{
          position: "relative",
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 0.5,
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
          bgcolor: "action.hover",
          color: "text.secondary",
          "& img, & video": { width: "100%", height: "100%", objectFit: "cover" },
        }}
      >
        {preview ??
          (fileExtension(name) === "pdf" ? (
            <PictureAsPdfOutlinedIcon fontSize="small" />
          ) : (
            <DescriptionOutlinedIcon fontSize="small" />
          ))}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" noWrap title={name}>
          {name}
        </Typography>
        <Typography variant="caption" noWrap component="div" sx={{ color: "text.secondary" }}>
          {size === undefined ? type : `${type} · ${fileSize(size)}`}
        </Typography>
      </Box>
    </>
  );

  if (href) {
    return (
      <ButtonBase
        component="a"
        href={href}
        target="_blank"
        rel="noopener"
        aria-label={`Open ${name}`}
        sx={{
          ...tile,
          pr: 1,
          justifyContent: "flex-start",
          "&:hover": { bgcolor: "action.hover" },
          "&.Mui-focusVisible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        }}
      >
        {content}
      </ButtonBase>
    );
  }
  return (
    <Box sx={{ ...tile, pr: 0.25 }}>
      {content}
      {onRemove ? (
        <IconButton aria-label={`Remove ${name}`} onClick={onRemove}>
          <CloseIcon fontSize="small" />
        </IconButton>
      ) : null}
    </Box>
  );
}

/* A file attached to a message being written: its picture or video's first frame from the file itself, and a button to take it off. */
export function LocalFileTile({ file, onRemove }: { file: File; onRemove: () => void }) {
  /* A local address for the picture or video, let go of when it's taken off. */
  const preview = useCallback(
    (element: HTMLImageElement | HTMLVideoElement | null) => {
      if (!element) return;
      const url = URL.createObjectURL(file);
      element.src = url;
      return () => URL.revokeObjectURL(url);
    },
    [file],
  );

  return (
    <FileTile
      name={file.name}
      size={file.size}
      onRemove={onRemove}
      preview={
        file.type.startsWith("image/") ? (
          <img ref={preview} alt="" />
        ) : file.type.startsWith("video/") ? (
          <>
            <video ref={preview} muted playsInline preload="metadata" />
            <PlayArrowRoundedIcon
              sx={(theme) => ({
                position: "absolute",
                fontSize: 20,
                color: "common.white",
                filter: `drop-shadow(0 0 2px ${theme.vars.palette.common.black})`,
              })}
            />
          </>
        ) : undefined
      }
    />
  );
}
