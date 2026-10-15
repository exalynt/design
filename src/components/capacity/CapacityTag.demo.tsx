import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { CAPACITY_BLOCK_IDS } from "./capacity";
import { CapacityTag } from "./CapacityTag";

export function CapacityTagDemo() {
  return (
    <>
      <Example title="Each block, with its number (hover one for its size)">
        <Stack spacing={1.5}>
          {CAPACITY_BLOCK_IDS.map((id, index) => (
            <CapacityTag key={id} block={id} number={`BLK-004${index}`} details />
          ))}
        </Stack>
      </Example>
      <Example title="In a line of text">
        <Typography variant="body2">
          Reported by Lena Brooks from <CapacityTag block="core" number="BLK-0042" details /> on Oct
          9.
        </Typography>
      </Example>
      <CodeBlock code={`<CapacityTag block={capacity.type} number={capacity.number} details />`} />
    </>
  );
}
