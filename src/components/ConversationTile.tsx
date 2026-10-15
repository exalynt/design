import Box from "@mui/material/Box";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

/*
 * What marks a conversation wherever one appears: its row in a list, and the
 * title bars of ConversationPopout and ConversationPreview, so a glance and
 * the window it opens match. Square so it never reads as a person, who are
 * always round.
 */
export function ConversationTile({ size = 28 }: { size?: number }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        flexShrink: 0,
        borderRadius: 1,
        display: "grid",
        placeItems: "center",
        color: "primary.main",
        bgcolor: "action.hover",
      }}
    >
      <ForumOutlinedIcon sx={{ fontSize: Math.round(size * 0.55) }} />
    </Box>
  );
}
