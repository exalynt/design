import Box from "@mui/material/Box";
import { CAPACITY_BLOCKS, type CapacityBlockId } from "./capacity";

// Prototype: a block's name on a metal, bronze for Flex, silver for Core, and
// gold for Dedicated. Fixed colors, like the stability levels', so a metal
// reads as itself under any theme: a sheen from light to mid, a darker rim,
// and dark text that holds its contrast on either scheme's card.
const METALS: Record<CapacityBlockId, { light: string; mid: string; rim: string; text: string }> = {
  flex: { light: "#f3c597", mid: "#cd8a4e", rim: "#8a5225", text: "#3b1d06" },
  core: { light: "#f4f6f9", mid: "#bec5cf", rim: "#7a8391", text: "#262c35" },
  dedicated: { light: "#fde9a0", mid: "#dcae36", rim: "#977010", text: "#3a2a00" },
};

export type CapacityBadgeProps = { block: CapacityBlockId };

/* A block's name in a small badge of its metal, with slightly rounded corners. */
export function CapacityBadge({ block }: CapacityBadgeProps) {
  const { light, mid, rim, text } = METALS[block];
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        flex: "none",
        height: 20,
        px: 0.75,
        borderRadius: "4px",
        border: `1px solid ${rim}`,
        background: `linear-gradient(135deg, ${light}, ${mid})`,
        boxShadow: `inset 0 1px 0 rgba(255 255 255 / 0.45)`,
        color: text,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.04em",
        lineHeight: 1,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {CAPACITY_BLOCKS[block].name}
    </Box>
  );
}
