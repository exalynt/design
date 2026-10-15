import Stack from "@mui/material/Stack";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { PROGRESS_KIND_IDS } from "./progress";
import { ProgressKind } from "./ProgressKind";

export function ProgressKindDemo() {
  return (
    <>
      <Example title="Each kind (hover one for what it means)">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {PROGRESS_KIND_IDS.map((id) => (
            <ProgressKind key={id} kind={id} />
          ))}
        </Stack>
      </Example>
      <Example title="Just the icon">
        <Stack direction="row" spacing={2}>
          {PROGRESS_KIND_IDS.map((id) => (
            <ProgressKind key={id} kind={id} iconOnly />
          ))}
        </Stack>
      </Example>
      <CodeBlock
        code={`import { ProgressKind } from "@exalynt/design/components";

<ProgressKind kind="functionality" />
<ProgressKind kind="clarity" iconOnly />`}
      />
    </>
  );
}
