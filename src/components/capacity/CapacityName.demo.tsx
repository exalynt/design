import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { CAPACITY_BLOCK_IDS } from "./capacity";
import { CapacityName } from "./CapacityName";

export function CapacityNameDemo() {
  return (
    <>
      <Example title="Each block, its figure filled to its size, in caption text as a conversation row's foot has it">
        <Stack spacing={1} sx={{ typography: "caption", color: "text.secondary" }}>
          {CAPACITY_BLOCK_IDS.map((id, index) => (
            <span key={id}>
              <CapacityName block={id} number={`BLK-004${index}`} />
            </span>
          ))}
        </Stack>
      </Example>
      <Example title="In a line of text, taking its size and color">
        <Typography variant="body2">
          Worked on in <CapacityName block="core" number="BLK-0042" /> this week.
        </Typography>
      </Example>
      <CodeBlock code={`<CapacityName block={capacity.type} number={capacity.number} />`} />
    </>
  );
}
