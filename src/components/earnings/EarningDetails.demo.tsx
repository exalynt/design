import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { CodeBlock } from "../../docs/CodeBlock";
import { collectedEarnings, engineerPayout, upcomingEarnings } from "../../docs/earnings";
import { Example } from "../../docs/Example";
import { EarningDetails } from "./EarningDetails";

export function EarningDetailsDemo() {
  return (
    <>
      <Example title="Paid, earned, and upcoming, on a card of their own">
        <Grid container spacing={2}>
          {[engineerPayout[1], collectedEarnings[0], upcomingEarnings[0]].map((earning) => (
            <Grid key={earning.id} size="auto">
              <EarningDetails earning={earning} />
            </Grid>
          ))}
        </Grid>
      </Example>
      <Example title="As EarningInfo's modal has it, with no card">
        <Card sx={{ p: 2, maxWidth: 444 }}>
          <EarningDetails earning={engineerPayout[4]} card={false} />
        </Card>
      </Example>
      <CodeBlock code={`<EarningDetails earning={earning} card={false} />`} />
    </>
  );
}
