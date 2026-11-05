import Box from "@mui/material/Box";
import type { ReactNode } from "react";

/*
 * What type of thing something is, named quietly: a block's size or an operations
 * plan. Small text in a hairline outline, the same for all of them, so it says which
 * type without competing with what's beside it.
 */
export function TypeBadge({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        flex: "none",
        boxSizing: "border-box",
        height: 20,
        px: 0.625,
        fontSize: 11.5,
        lineHeight: 1,
        color: "text.secondary",
        whiteSpace: "nowrap",
        border: 1,
        borderColor: "divider",
        borderRadius: "4px",
      }}
    >
      {children}
    </Box>
  );
}
