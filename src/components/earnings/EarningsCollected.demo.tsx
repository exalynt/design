import Box from "@mui/material/Box";
import { CodeBlock } from "../../docs/CodeBlock";
import { unsentEarnings } from "../../docs/earnings";
import { Example } from "../../docs/Example";
import { EarningsCollected } from "./EarningsCollected";

export function EarningsCollectedDemo() {
  return (
    <>
      <Example title="Collecting toward a Friday">
        <Box sx={{ maxWidth: 480 }}>
          <EarningsCollected
            earnings={unsentEarnings}
            goesOutOn="Friday, Nov 13"
            cutoff="Sunday, Nov 8"
            destination="Chase ••4242"
          />
        </Box>
      </Example>
      <CodeBlock
        code={`<EarningsCollected
  earnings={earnings}
  goesOutOn="Friday, Nov 13"
  cutoff="Sunday, Nov 8"
  destination={accountLabel(active)}
/>`}
      />
    </>
  );
}
