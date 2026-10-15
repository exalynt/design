import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/* ConversationMessage's avatar, so a note's marker sits in line with the avatars. */
const AVATAR_SIZE = 32;
const MARKER_SIZE = 22;

/*
 * A line in a ConversationThread that isn't a message, such as how many
 * came before, on a small marker where an avatar would be. `aside` follows
 * the text, such as a button that does something about it.
 */
export function ThreadNote({
  icon,
  children,
  aside,
}: {
  icon: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Stack
      component="li"
      data-side="start"
      direction="row"
      spacing={1.5}
      sx={{ alignItems: "center" }}
    >
      <Box
        sx={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Box
          sx={{
            width: MARKER_SIZE,
            height: MARKER_SIZE,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            border: 1,
            borderColor: "divider",
            color: "text.secondary",
            bgcolor: "background.paper",
            "& svg": { fontSize: 13 },
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography variant="caption" sx={{ minWidth: 0, color: "text.secondary" }}>
        {children}
      </Typography>
      {aside}
    </Stack>
  );
}
