import Grid from "@mui/material/Grid";
import { Example } from "../../docs/Example";
import { SectionCard } from "../layout/SectionCard";
import { CAPACITY_BLOCK_IDS } from "./capacity";
import { CapacityDetails } from "./CapacityDetails";

export function CapacityDetailsDemo() {
  return (
    <>
      <Example title="Each block, as the popover shows it">
        <Grid container spacing={2}>
          {CAPACITY_BLOCK_IDS.map((id) => (
            <Grid
              key={id}
              size={{ xs: 12, md: 4 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <CapacityDetails block={id} />
            </Grid>
          ))}
        </Grid>
      </Example>
      <Example title="In a card of your own, with card={false}">
        <SectionCard title="About this block">
          <CapacityDetails block="core" card={false} />
        </SectionCard>
      </Example>
    </>
  );
}
