import Grid from "@mui/material/Grid";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { EARNING_TYPE_IDS } from "./earnings";
import { EarningTypeDetails } from "./EarningTypeDetails";

export function EarningTypeDetailsDemo() {
  return (
    <>
      <Example title="Each type, as EarningType's popover shows it">
        <Grid container spacing={2}>
          {EARNING_TYPE_IDS.map((type) => (
            <Grid key={type} size="auto">
              <EarningTypeDetails type={type} />
            </Grid>
          ))}
        </Grid>
      </Example>
      <CodeBlock code={`<EarningTypeDetails type={earning.type} />`} />
    </>
  );
}
