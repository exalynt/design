import Box from "@mui/material/Box";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { ProgressMetric } from "./ProgressMetric";

export function ProgressMetricDemo() {
  return (
    <>
      <Example title="Before and after, in a grid that fits as many as there's room for">
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
          />
          <ProgressMetric name="Time to sign" before="12 seconds" after="4 seconds" />
          <ProgressMetric
            name="Slips typed in by the office"
            before="About 60 a day"
            after="None"
          />
        </Box>
      </Example>
      <CodeBlock
        code={`<ProgressMetric name="Time to sign" before="12 seconds" after="4 seconds" />`}
      />
    </>
  );
}
