import Box from "@mui/material/Box";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { ProgressLink } from "./ProgressLink";

export function ProgressLinkDemo() {
  return (
    <>
      <Example title="Beside each other, a long name cut short (hover it)">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, maxWidth: 520 }}>
          <ProgressLink
            name="Queue signatures while offline"
            url="https://github.com/acme/driver-app/pull/398"
          />
          <ProgressLink
            name="Signatures lost without signal"
            url="https://linear.app/acme/issue/DRV-212"
          />
          <ProgressLink
            name="Ride-along notes: signing on the road with gloves, in the rain, and without signal"
            url="https://docs.google.com/document/d/ride-along-notes"
          />
        </Box>
      </Example>
      <Example title="Compact, as a closed ProgressCard lists them">
        <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 0.5 }}>
          <ProgressLink
            compact
            name="Queue signatures while offline"
            url="https://github.com/acme/driver-app/pull/398"
          />
          <ProgressLink
            compact
            name="Signatures lost without signal"
            url="https://linear.app/acme/issue/DRV-212"
          />
        </Box>
      </Example>
      <CodeBlock code={`<ProgressLink name={link.title} url={link.url} />`} />
    </>
  );
}
