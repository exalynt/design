import Stack from "@mui/material/Stack";
import { CodeBlock } from "../../docs/CodeBlock";
import {
  collectedEarnings,
  engineerPayout,
  sentPayout,
  upcomingEarnings,
} from "../../docs/earnings";
import { Example } from "../../docs/Example";
import { EarningStatus } from "./EarningStatus";

export function EarningStatusDemo() {
  return (
    <>
      <Example title="Upcoming, Earned, Sent, and Paid, in order (hover one for what it means)">
        <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 3 }}>
          <EarningStatus earning={upcomingEarnings[0]} />
          <EarningStatus earning={collectedEarnings[0]} />
          <EarningStatus earning={sentPayout[0]} />
          <EarningStatus earning={engineerPayout[0]} />
        </Stack>
      </Example>
      <CodeBlock code={`<EarningStatus earning={earning} />`} />
    </>
  );
}
