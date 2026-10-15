import Box from "@mui/material/Box";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { ProgressCapability } from "./ProgressCapability";

export function ProgressCapabilityDemo() {
  return (
    <>
      <Example title="New, made more stable, retired, and only about it (hover a name or mark)">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 1,
            rowGap: 1.75,
            pt: 0.75,
            maxWidth: 640,
          }}
        >
          <ProgressCapability
            name="Leave a photo when nobody signs"
            change="added"
            level="prototype"
          />
          <ProgressCapability
            name="Sign for a delivery"
            change="stabilized"
            from="prototype"
            level="alpha"
          />
          <ProgressCapability name="Print a delivery slip" change="retired" />
          <ProgressCapability name="Plan a driver's route" level="beta" />
        </Box>
      </Example>
      <CodeBlock
        code={`<ProgressCapability name="Sign for a delivery" change="stabilized" from="prototype" level="alpha" />`}
      />
    </>
  );
}
