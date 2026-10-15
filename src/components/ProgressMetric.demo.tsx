import Box from "@mui/material/Box";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { ProgressMetric } from "./ProgressMetric";

export function ProgressMetricDemo() {
  return (
    <>
      <Example title="Before and after, down or up for the better, and a result with nothing before it">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 1,
            maxWidth: 640,
          }}
        >
          <ProgressMetric
            name="Signatures that fail to send"
            before="About 1 in 10"
            after="None in a week"
            direction="down"
          />
          <ProgressMetric
            name="Deliveries signed first time"
            before="About 7 in 10"
            after="All but 2 in a week"
            direction="up"
          />
          <ProgressMetric
            name="Missed deliveries left with a photo"
            after="14 in the first week"
            direction="up"
          />
          <ProgressMetric name="Time to sign" before="12 seconds" after="4 seconds" />
        </Box>
      </Example>
      <CodeBlock
        code={`<ProgressMetric name="Time to sign" before="12 seconds" after="4 seconds" direction="down" />
<ProgressMetric name="Missed deliveries left with a photo" after="14 in the first week" direction="up" />`}
      />
    </>
  );
}
