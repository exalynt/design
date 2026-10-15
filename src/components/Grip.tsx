import Box from "@mui/material/Box";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";

/* The mark on what can be dragged, faint until the row or card is hovered. */
export function Grip() {
  return (
    <Box
      className="grip"
      aria-hidden
      sx={{
        display: "flex",
        flex: "none",
        color: "text.disabled",
        transition: "color 120ms",
      }}
    >
      <DragIndicatorRoundedIcon sx={{ fontSize: 18 }} />
    </Box>
  );
}
