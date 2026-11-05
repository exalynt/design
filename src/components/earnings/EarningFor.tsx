import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import { CapacityFigure } from "../capacity/CapacityFigure";
import { CapacityBadge } from "../capacity/CapacityBadge";
import { CAPACITY_BLOCKS, ICON_COLUMN } from "../capacity/capacity";
import { TypeBadge } from "../TypeBadge";
import type { Earning } from "./earnings";

export type EarningForProps = {
  earning: Earning;
};

/*
 * Every earning's thing in one shape, so a reader always knows where to look. Each
 * kind of thing fills in the same parts, and a new kind only adds a case here.
 */
function parts(earning: Earning): { icon: ReactNode; name: string; type: ReactNode } {
  if (earning.kind === "engineering_capacity") {
    return {
      icon: <CapacityFigure units={CAPACITY_BLOCKS[earning.block].units} size={24} />,
      name: earning.number,
      type: <CapacityBadge block={earning.block} />,
    };
  }
  return {
    icon: <WebAssetOutlinedIcon sx={{ fontSize: 22, color: "text.secondary" }} />,
    name: earning.product,
    type: <TypeBadge>{earning.plan}</TypeBadge>,
  };
}

/*
 * The specific thing an earning was for, as a tile that's the same whatever the
 * thing is: its icon, its name, its type, and its client, and nothing more. A block
 * and a product being operated read alike. The time it's for is the earning's, not
 * the thing's, so the earning says it (its `period`).
 */
export function EarningFor({ earning }: EarningForProps) {
  const { icon, name, type } = parts(earning);
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        maxWidth: "100%",
        boxSizing: "border-box",
        px: 1,
        py: 0.75,
        fontSize: 12.5,
        lineHeight: 1.4,
        textAlign: "left",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: "flex", flex: "none", justifyContent: "center", width: ICON_COLUMN }}>
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 0.75 }}>
          <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
            {name}
          </Box>
          {type}
        </Box>
        <Box sx={{ mt: 0.25, color: "text.secondary" }}>{earning.organization}</Box>
      </Box>
    </Box>
  );
}
