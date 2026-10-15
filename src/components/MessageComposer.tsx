import { useRef, useState, type DragEvent, type KeyboardEvent, type Ref } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { EmojiPicker } from "./EmojiPicker";
import { MentionField, type MentionFieldHandle } from "./MentionField";
import { ATTACHABLE, isAttachable } from "./attachments";
import { LocalFileTile } from "./FileTile";
import type { MentionProfile } from "./mentions";

export type MessageComposerProps = {
  /** The message being written, with mentions as `<@id>`. Kept by the caller, so it outlasts the composer, such as while a popout is minimized. */
  value: string;
  onChange: (value: string) => void;
  /** Send it, with the text trimmed, which may be empty when files are attached. Empty `value` and `attachments` once it's gone. */
  onSend: (body: string) => void;
  /** While it's on its way: the button waits, and Enter doesn't send it twice. */
  sending?: boolean;
  /** Who can be @mentioned, such as everyone in the conversation but the reader. */
  people?: MentionProfile[];
  /** The images, videos and documents attached to it, kept by the caller like `value`. */
  attachments?: File[];
  /** With it, files can be attached with the paperclip or dropped on the composer. Without it, they can't. */
  onAttachmentsChange?: (files: File[]) => void;
  inputRef?: Ref<HTMLTextAreaElement>;
};

/*
 * Where a reply is written: a MentionField, the files attached to it, and
 * under them the emoji and attach buttons, a hint, and the Reply button.
 * Enter sends and Shift+Enter starts a new line, as in any chat; the button
 * waits until there's something to send, words or files.
 *
 * Files come from the paperclip, are dropped anywhere on the composer,
 * which says so while they're dragged over it, or are pasted, such as a
 * screenshot. Only images, videos and
 * documents are taken; any others are named in a line saying they weren't.
 */
export function MessageComposer({
  value,
  onChange,
  onSend,
  sending = false,
  people = [],
  attachments = [],
  onAttachmentsChange,
  inputRef,
}: MessageComposerProps) {
  const fieldRef = useRef<MentionFieldHandle>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  /* Drag events fire for every element crossed inside, so count them to know when it's left. */
  const dragDepth = useRef(0);
  const [dragging, setDragging] = useState(false);
  /* The names of files just left out, as they weren't images, videos or documents. */
  const [refused, setRefused] = useState<string[]>([]);
  const body = value.trim();
  const canSend = Boolean(body || attachments.length);

  function send() {
    if (canSend && !sending) onSend(body);
  }

  function sendOnEnter(event: KeyboardEvent) {
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
    event.preventDefault();
    send();
  }

  function attach(files: File[]) {
    if (!onAttachmentsChange || !files.length) return;
    const taken = files.filter(isAttachable);
    setRefused(files.filter((file) => !isAttachable(file)).map((file) => file.name));
    if (taken.length) onAttachmentsChange([...attachments, ...taken]);
  }

  /* Only a drag carrying files, and only where they can be attached. */
  const carriesFiles = (event: DragEvent) =>
    Boolean(onAttachmentsChange) && event.dataTransfer.types.includes("Files");

  return (
    <Box
      onDragEnter={(event) => {
        if (!carriesFiles(event)) return;
        dragDepth.current += 1;
        setDragging(true);
      }}
      onDragOver={(event) => {
        if (!carriesFiles(event)) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
      }}
      onDragLeave={(event) => {
        if (!carriesFiles(event)) return;
        dragDepth.current -= 1;
        if (dragDepth.current <= 0) setDragging(false);
      }}
      onPaste={(event) => {
        /*
         * Files from the clipboard, such as a screenshot or a copied image,
         * unless it has text too: copying from Word or a spreadsheet adds a
         * picture of the selection, and it's the words that are wanted.
         */
        const clipboard = event.clipboardData;
        if (
          !onAttachmentsChange ||
          !clipboard.files.length ||
          clipboard.types.includes("text/plain")
        )
          return;
        event.preventDefault();
        attach([...clipboard.files].map(pastedName));
      }}
      onDrop={(event) => {
        if (!carriesFiles(event)) return;
        event.preventDefault();
        dragDepth.current = 0;
        setDragging(false);
        attach([...event.dataTransfer.files]);
      }}
      sx={{ position: "relative" }}
    >
      <MentionField
        ref={fieldRef}
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        people={people}
        onKeyDown={sendOnEnter}
        placeholder="Write a reply…"
        aria-label="Reply"
      />

      {attachments.length ? (
        <Box
          component="ul"
          aria-label="Attached files"
          sx={{ display: "flex", flexWrap: "wrap", gap: 1, listStyle: "none", m: 0, mt: 1, p: 0 }}
        >
          {attachments.map((file, index) => (
            <Box
              component="li"
              key={`${file.name}-${index}`}
              sx={{ minWidth: 0, maxWidth: "100%" }}
            >
              <LocalFileTile
                file={file}
                onRemove={() => onAttachmentsChange?.(attachments.filter((_, i) => i !== index))}
              />
            </Box>
          ))}
        </Box>
      ) : null}

      {refused.length ? (
        <Typography
          variant="caption"
          component="p"
          role="alert"
          sx={{ mt: 1, mb: 0, color: "error.main" }}
        >
          Couldn&apos;t attach {refused.join(", ")}. Only images, videos and documents can be
          attached.
        </Typography>
      ) : null}

      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1 }}>
        <EmojiPicker onPick={(emoji) => fieldRef.current?.insert(emoji)} />
        {onAttachmentsChange ? (
          <>
            <Tooltip title="Attach images, videos or documents">
              <Button
                variant="outlined"
                size="small"
                aria-label="Attach files"
                onClick={() => fileRef.current?.click()}
                sx={{ minWidth: 30, px: 0 }}
              >
                <AttachFileRoundedIcon sx={{ fontSize: 18 }} />
              </Button>
            </Tooltip>
            <input
              ref={fileRef}
              type="file"
              multiple
              hidden
              accept={ATTACHABLE}
              onChange={(event) => {
                attach([...(event.target.files ?? [])]);
                /* So the same file can be picked again after it's taken off. */
                event.target.value = "";
              }}
            />
          </>
        ) : null}
        <Box sx={{ flex: 1 }} />
        {/* Phones have no shortcuts to speak of, so the hint is for keyboards only. */}
        <Typography
          variant="caption"
          sx={{ display: { xs: "none", sm: "block" }, color: "text.secondary", pr: 0.5 }}
        >
          Enter to send · Shift+Enter for a new line
        </Typography>
        <Button
          variant="contained"
          size="small"
          disabled={!canSend}
          loading={sending}
          onClick={send}
        >
          Reply
        </Button>
      </Stack>

      {dragging ? (
        <Box
          aria-hidden
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            zIndex: 1,
            display: "grid",
            placeItems: "center",
            border: 2,
            borderStyle: "dashed",
            borderColor: "primary.main",
            borderRadius: 1,
            bgcolor: `rgba(${theme.vars.palette.background.paperChannel} / 0.9)`,
            color: "primary.main",
            typography: "subtitle2",
            pointerEvents: "none",
          })}
        >
          Drop to attach
        </Box>
      ) : null}
    </Box>
  );
}

/*
 * A pasted screenshot is always "image.png", so each gets the time it was
 * pasted instead, to tell them apart: "Pasted image 14.30.05.png".
 */
function pastedName(file: File) {
  if (!/^image\.\w+$/.test(file.name)) return file;
  const time = new Date().toTimeString().slice(0, 8).replaceAll(":", ".");
  return new File([file], `Pasted image ${time}.${file.name.split(".").pop()}`, {
    type: file.type,
  });
}
