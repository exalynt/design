import Stack from "@mui/material/Stack";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { CAPACITY_STATUS_IDS } from "./capacity";
import { CapacityStatus } from "./CapacityStatus";

export function CapacityStatusDemo() {
  return (
    <>
      <Example title="Icon and word">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {CAPACITY_STATUS_IDS.map((id) => (
            <CapacityStatus key={id} status={id} />
          ))}
        </Stack>
      </Example>
      <Example title="Just the icon (hover for the word)">
        <Stack direction="row" spacing={2}>
          {CAPACITY_STATUS_IDS.map((id) => (
            <CapacityStatus key={id} status={id} iconOnly />
          ))}
        </Stack>
      </Example>
      <CodeBlock
        code={`import { CapacityStatus } from "@exalynt/design/components";

<CapacityStatus status="in_progress" />
<CapacityStatus status="in_progress" iconOnly />`}
      />
    </>
  );
}
