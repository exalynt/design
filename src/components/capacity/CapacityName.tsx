import Box from "@mui/material/Box";
import { CAPACITY_BLOCKS, type CapacityBlockId } from "./capacity";
import { CapacityFigure } from "./CapacityFigure";

export type CapacityNameProps = {
  block: CapacityBlockId;
  /** What it's called: "BLK-0042". */
  number: string;
};

/*
 * A capacity block at its smallest, where even CapacityTag is too much,
 * such as in a line of small print: a 16px figure, filled to the block's
 * size, and its number, in the text's own size and color. Its type isn't
 * shown, only read out to assistive tech ("Core block BLK-0042").
 */
export function CapacityName({ block, number }: CapacityNameProps) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        minWidth: 0,
        verticalAlign: "middle",
      }}
    >
      <CapacityFigure units={CAPACITY_BLOCKS[block].units} size={16} />
      <Box
        component="span"
        sx={{
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <Box
          component="span"
          sx={{
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
          }}
        >
          {CAPACITY_BLOCKS[block].name} block{" "}
        </Box>
        {number}
      </Box>
    </Box>
  );
}
