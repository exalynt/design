import Box from "@mui/material/Box";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";

/* The Focus a record went to, as a block's listing shows it. */
export function FocusRef({ title }: { title: string }) {
  return (
    <Box
      component="span"
      sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color: "text.secondary" }}
    >
      <CenterFocusStrongOutlinedIcon sx={{ fontSize: 18 }} />
      <Box component="span" sx={{ color: "text.primary" }}>
        {title}
      </Box>
    </Box>
  );
}
