import Box from "@mui/material/Box";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { ProgressFeature } from "./ProgressFeature";

export function ProgressFeatureDemo() {
  return (
    <>
      <Example title="Beside each other, a long name cut short (hover it)">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, maxWidth: 420 }}>
          <ProgressFeature name="Signing for deliveries" />
          <ProgressFeature name="Route planning" />
          <ProgressFeature name="Signing for deliveries and collections across every depot" />
        </Box>
      </Example>
      <CodeBlock code={`<ProgressFeature name={feature.title} />`} />
    </>
  );
}
