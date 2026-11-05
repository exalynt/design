import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { CodeBlock } from "../../docs/CodeBlock";
import { engineerPayout, partnerPayout, upcomingEarnings } from "../../docs/earnings";
import { Example } from "../../docs/Example";
import { EarningCalculation } from "./EarningCalculation";

const EXAMPLES = [
  { title: "A block they fulfilled", earning: engineerPayout[0] },
  { title: "A product month", earning: engineerPayout[4] },
  { title: "A Partner Share", earning: partnerPayout[0] },
  { title: "Upcoming", earning: upcomingEarnings[0] },
];

export function EarningCalculationDemo() {
  return (
    <>
      <Grid container spacing={2}>
        {EXAMPLES.map(({ title, earning }) => (
          <Grid key={title} size={{ xs: 12, md: 6 }}>
            <Example title={title}>
              <Card sx={{ p: 2, fontSize: 14 }}>
                <EarningCalculation earning={earning} />
              </Card>
            </Example>
          </Grid>
        ))}
      </Grid>
      <CodeBlock code={`<EarningCalculation earning={earning} />`} />
    </>
  );
}
