import Stack from "@mui/material/Stack";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { EARNING_TYPE_IDS } from "./earnings";
import { EarningType } from "./EarningType";

export function EarningTypeDemo() {
  return (
    <>
      <Example title="Each type (hover one for what it means)">
        <Stack spacing={1.5} sx={{ alignItems: "flex-start", fontSize: 14 }}>
          {EARNING_TYPE_IDS.map((type) => (
            <EarningType key={type} type={type} details />
          ))}
        </Stack>
      </Example>
      <CodeBlock code={`<EarningType type={earning.type} details />`} />
    </>
  );
}
