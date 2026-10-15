import Grid from "@mui/material/Grid";
import { Example } from "../../docs/Example";
import { ENGINEER_LEVEL_IDS } from "./engineerLevel";
import { EngineerLevelDetails } from "./EngineerLevelDetails";
import { SectionCard } from "../layout/SectionCard";

export function EngineerLevelDetailsDemo() {
  return (
    <>
      <Example title="Each level, as the popover shows it">
        <Grid container spacing={2}>
          {ENGINEER_LEVEL_IDS.map((id) => (
            <Grid
              key={id}
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <EngineerLevelDetails level={id} />
            </Grid>
          ))}
        </Grid>
      </Example>
      <Example title="In a card of your own, with card={false}">
        <SectionCard title="Your level">
          <EngineerLevelDetails level="mid" card={false} />
        </SectionCard>
      </Example>
    </>
  );
}
