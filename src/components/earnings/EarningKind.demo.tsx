import Stack from "@mui/material/Stack";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { EARNING_KIND_IDS } from "./earnings";
import { EarningKind } from "./EarningKind";

export function EarningKindDemo() {
  return (
    <>
      <Example title="Each kind (hover one for what it means)">
        <Stack spacing={1.5} sx={{ alignItems: "flex-start" }}>
          {EARNING_KIND_IDS.map((kind) => (
            <EarningKind key={kind} kind={kind} details />
          ))}
        </Stack>
      </Example>
      <CodeBlock code={`<EarningKind kind={earning.kind} details />`} />
    </>
  );
}
