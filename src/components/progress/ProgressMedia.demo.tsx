import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { SAMPLE_PROGRESS } from "../../docs/progress";
import { ProgressMedia } from "./ProgressMedia";

const items = SAMPLE_PROGRESS.flatMap((record) => record.media ?? []);

export function ProgressMediaDemo() {
  return (
    <>
      <Example title="A recording and screenshots (click one to open it full size)">
        <ProgressMedia items={items} />
      </Example>
      <CodeBlock
        code={`<ProgressMedia
  items={[
    { kind: "video", url: recording.url, name: "Signing with no signal", poster: recording.poster },
    { kind: "image", url: screenshot.url, name: "The old signature box" },
  ]}
/>`}
      />
    </>
  );
}
