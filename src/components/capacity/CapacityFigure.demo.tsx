import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Example } from "../../docs/Example";
import { CAPACITY_BLOCK_IDS, CAPACITY_BLOCKS, capacitySize } from "./capacity";
import { CapacityFigure } from "./CapacityFigure";

export function CapacityFigureDemo() {
  return (
    <>
      <Example title="Each block, with its size in words">
        <Grid container spacing={2} sx={{ maxWidth: 520 }}>
          {CAPACITY_BLOCK_IDS.map((id) => {
            const { name, units } = CAPACITY_BLOCKS[id];
            return (
              <Grid key={id} size={4}>
                <Stack spacing={0.5} sx={{ alignItems: "center", textAlign: "center" }}>
                  <CapacityFigure units={units} size={80} />
                  <Typography variant="subtitle2" sx={{ pt: 0.5 }}>
                    {name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {capacitySize(units)}
                  </Typography>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Example>
      <Example title="Sizes: 48 on a card, 64 in the popover, 80 where it's the point">
        <Stack direction="row" spacing={3} sx={{ alignItems: "flex-end" }}>
          <CapacityFigure units={2} />
          <CapacityFigure units={2} size={64} />
          <CapacityFigure units={2} size={80} />
        </Stack>
      </Example>
      <Example title="Picked, and a choice not picked yet">
        <Stack direction="row" spacing={3}>
          <CapacityFigure units={2} size={64} />
          <CapacityFigure units={2} size={64} color="text.secondary" />
        </Stack>
      </Example>
    </>
  );
}
