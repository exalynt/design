import { useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import { EMOJI_GROUPS, searchEmoji, type Emoji } from "./emoji";

/*
 * A button opening the emoji to pick from: a search, then every emoji by
 * group, or what the search finds, with Enter taking the first. Under them,
 * the one pointed at or focused, with its shortcode, so people learn the
 * `:shortcode` that's quicker next time. Picking one closes it and hands
 * the emoji to `onPick`.
 */
export function EmojiPicker({ onPick }: { onPick: (emoji: string) => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<Emoji | null>(null);
  const results = query.trim() ? searchEmoji(query) : null;

  function close() {
    setAnchor(null);
    setQuery("");
    setHovered(null);
  }

  function pick(emoji: Emoji) {
    close();
    /* Once the picker has given focus back, so whatever takes the emoji can take focus too. */
    setTimeout(() => onPick(emoji.char));
  }

  const grid = (emoji: Emoji[]) => (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))" }}>
      {emoji.map((each) => (
        <ButtonBase
          key={each.char}
          aria-label={each.name.replace(/_/g, " ")}
          onClick={() => pick(each)}
          onMouseEnter={() => setHovered(each)}
          onFocus={() => setHovered(each)}
          sx={{
            height: 36,
            borderRadius: 1,
            fontSize: 22,
            lineHeight: 1,
            "&:hover": { bgcolor: "action.hover" },
            "&.Mui-focusVisible": { bgcolor: "action.selected" },
          }}
        >
          {each.char}
        </ButtonBase>
      ))}
    </Box>
  );

  return (
    <>
      <Tooltip title="Emoji">
        {/* An outlined button with just its icon, square and as tall as the Reply button beside it. */}
        <Button
          variant="outlined"
          size="small"
          aria-label="Add an emoji"
          onClick={(event) => setAnchor(event.currentTarget)}
          sx={{ minWidth: 30, px: 0 }}
        >
          <InsertEmoticonOutlinedIcon sx={{ fontSize: 18 }} />
        </Button>
      </Tooltip>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={close}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{ paper: { sx: { width: 336, maxWidth: "calc(100vw - 32px)" } } }}
      >
        <Box sx={{ p: 1 }}>
          <TextField
            size="small"
            fullWidth
            autoFocus
            placeholder="Search emoji"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && results?.length) {
                event.preventDefault();
                pick(results[0]);
              }
            }}
            slotProps={{ htmlInput: { "aria-label": "Search emoji" } }}
          />
        </Box>
        <Box sx={{ height: 260, overflowY: "auto", px: 1, pb: 1 }}>
          {results ? (
            results.length ? (
              grid(results)
            ) : (
              <Typography variant="body2" sx={{ p: 1, color: "text.secondary" }}>
                No emoji match “{query.trim()}”.
              </Typography>
            )
          ) : (
            EMOJI_GROUPS.map((group) => (
              <Box key={group.title} role="group" aria-label={group.title}>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ px: 0.5, pt: 1, pb: 0.5, color: "text.secondary", fontWeight: 600 }}
                >
                  {group.title}
                </Typography>
                {grid(group.emoji)}
              </Box>
            ))
          )}
        </Box>
        <Box
          aria-hidden
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minHeight: 40,
            px: 1.5,
            borderTop: 1,
            borderColor: "divider",
            typography: "caption",
            color: "text.secondary",
          }}
        >
          {hovered ? (
            <>
              <Box component="span" sx={{ fontSize: 20, lineHeight: 1 }}>
                {hovered.char}
              </Box>
              <Box component="code" sx={{ fontFamily: "monospace", color: "text.primary" }}>
                :{hovered.name}:
              </Box>
            </>
          ) : (
            "Or type : and a name in the message, such as :tada"
          )}
        </Box>
      </Popover>
    </>
  );
}
