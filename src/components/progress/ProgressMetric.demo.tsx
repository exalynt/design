import Box from "@mui/material/Box";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { ProgressMetric } from "./ProgressMetric";

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: 1,
  maxWidth: 640,
};

export function ProgressMetricDemo() {
  return (
    <>
      <Example title="With the difference, the highlight: down for the better, up, and neither way better (hover an info icon, or a value cut short)">
        <Box sx={grid}>
          <ProgressMetric
            name="Time to sign a delivery"
            description="From opening the delivery in the app to the signature being sent."
            before={12}
            after={4}
            unit="s"
            direction="down"
            showDifference
          />
          <ProgressMetric
            name="Signatures that fail to send"
            before={9.6}
            after={0}
            unit="%"
            direction="down"
            showDifference
          />
          <ProgressMetric
            name="Deliveries signed first time"
            description="Signed on the first try, without the driver going back or calling the office."
            before={71}
            after={98}
            unit="%"
            direction="up"
            showDifference
          />
          <ProgressMetric
            name="Slips typed in by the office"
            before={1240}
            after={0}
            unit="per month"
            direction="down"
            showDifference
          />
          <ProgressMetric name="Drivers on the new app" before={6} after={24} showDifference />
        </Box>
      </Example>

      <Example title="Without it, After is the highlight: with the trend, with nothing measured before, with no unit, and with neither way better">
        <Box sx={grid}>
          <ProgressMetric
            name="Time to sign a delivery"
            before={12}
            after={4}
            unit="s"
            direction="down"
          />
          <ProgressMetric
            name="Missed deliveries left with a photo"
            after={14}
            unit="per week"
            direction="up"
          />
          <ProgressMetric name="Taps to sign" before={5} after={2} direction="down" />
          <ProgressMetric name="Drivers on the new app" before={6} after={24} />
        </Box>
      </Example>
      <CodeBlock
        code={`<ProgressMetric name="Time to sign a delivery" before={12} after={4} unit="s" direction="down" showDifference />
<ProgressMetric name="Missed deliveries left with a photo" after={14} unit="per week" direction="up" />`}
      />
    </>
  );
}
