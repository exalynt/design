import Grid from "@mui/material/Grid";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { EARNING_KIND_IDS } from "./earnings";
import { EarningKindDetails } from "./EarningKindDetails";

export function EarningKindDetailsDemo() {
  return (
    <>
      <Example title="Each kind, as EarningKind's popover shows it">
        <Grid container spacing={2}>
          {EARNING_KIND_IDS.map((kind) => (
            <Grid key={kind} size="auto">
              <EarningKindDetails kind={kind} />
            </Grid>
          ))}
        </Grid>
      </Example>
      <CodeBlock code={`<EarningKindDetails kind={earning.kind} />`} />
    </>
  );
}
