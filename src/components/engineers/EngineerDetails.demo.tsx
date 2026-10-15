import Grid from "@mui/material/Grid";
import { Example } from "../../docs/Example";
import { MARCUS, PRIYA } from "../../docs/engineers";
import { EngineerDetails } from "./EngineerDetails";
import { SectionCard } from "../layout/SectionCard";

export function EngineerDetailsDemo() {
  return (
    <>
      <Example title="As the popover shows it: with a picture and a profile link, and without">
        <Grid container spacing={2}>
          {[PRIYA, MARCUS].map((engineer) => (
            <Grid
              key={engineer.name}
              size={{ xs: 12, md: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <EngineerDetails engineer={engineer} />
            </Grid>
          ))}
        </Grid>
      </Example>
      <Example title="In a card of your own, with card={false}">
        <SectionCard title="Your engineer">
          <EngineerDetails engineer={PRIYA} card={false} />
        </SectionCard>
      </Example>
    </>
  );
}
