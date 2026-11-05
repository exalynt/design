import Stack from "@mui/material/Stack";
import { CodeBlock } from "../../docs/CodeBlock";
import { engineerPayout, partnerPayout } from "../../docs/earnings";
import { Example } from "../../docs/Example";
import { EarningFor } from "./EarningFor";

export function EarningForDemo() {
  return (
    <>
      <Example title="A block, a product being operated, and a partner's block: the same shape">
        <Stack spacing={1.5} sx={{ alignItems: "flex-start" }}>
          <EarningFor earning={engineerPayout[0]} />
          <EarningFor earning={engineerPayout[4]} />
          <EarningFor earning={partnerPayout[0]} />
        </Stack>
      </Example>
      <CodeBlock code={`<EarningFor earning={earning} />`} />
    </>
  );
}
