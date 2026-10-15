import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

export type ProgressFeatureProps = {
  /** The Feature's name: "Signing for deliveries". */
  name: string;
};

/*
 * One Feature a record of progress is about, as a small outlined card that
 * sits beside others, like a ProgressCapability: its icon, as on a
 * FeatureCard, and its name, cut short with the whole name on hover.
 */
export function ProgressFeature({ name }: ProgressFeatureProps) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        px: 1.25,
        py: 0.75,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <WidgetsOutlinedIcon sx={{ fontSize: 16, flex: "none", color: "secondary.main" }} />
      <Tooltip title={name}>
        <Box
          component="span"
          sx={{
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 14,
          }}
        >
          {name}
        </Box>
      </Tooltip>
    </Box>
  );
}
