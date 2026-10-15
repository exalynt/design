import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";

export type CalloutPanelProps = BoxProps;

/*
 * A raised band for the one or two panels on a page that speak to the reader
 * rather than show their data (e.g. buy more capacity). It follows the
 * light/dark toggle: inside an app, an always-dark panel just reads as a
 * component that ignored the reader's choice.
 */
export function CalloutPanel({ sx, children, ...props }: CalloutPanelProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          borderLeft: 3,
          borderLeftColor: "primary.main",
          borderRadius: 1,
          p: { xs: 3, md: 4 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
