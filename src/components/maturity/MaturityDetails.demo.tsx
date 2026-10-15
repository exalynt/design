import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Example } from "../../docs/Example";
import { MaturityDetails } from "./MaturityDetails";
import { SectionCard } from "../layout/SectionCard";

export function MaturityDetailsDemo() {
  return (
    <>
      <Example title="A Feature's, on its card, as its ring's popover shows it">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MaturityDetails progress={67} subject="feature" count={3} />
        </Box>
      </Example>
      <Example title="A project's, in two bands">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <MaturityDetails progress={48} subject="project" count={4} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <MaturityDetails progress={81} subject="project" count={6} />
          </Grid>
        </Grid>
      </Example>
      <Example title="On a page, in a card of your own">
        <Box sx={{ maxWidth: 420 }}>
          <SectionCard title="How mature this project is">
            <MaturityDetails progress={48} subject="project" count={4} card={false} />
          </SectionCard>
        </Box>
      </Example>
    </>
  );
}
