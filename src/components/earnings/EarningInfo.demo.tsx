import { CodeBlock } from "../../docs/CodeBlock";
import { engineerPayout } from "../../docs/earnings";
import { Example } from "../../docs/Example";
import { EarningInfo } from "./EarningInfo";

export function EarningInfoDemo() {
  return (
    <>
      <Example title="Click it for the modal">
        <EarningInfo earning={engineerPayout[1]} />
      </Example>
      <CodeBlock code={`<EarningInfo earning={earning} />`} />
    </>
  );
}
