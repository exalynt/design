import { useState } from "react";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { CodeBlock } from "../docs/CodeBlock";
import { PEOPLE, YOU } from "../docs/conversations";
import { Example } from "../docs/Example";
import { TypingIndicator } from "./TypingIndicator";

/* Everyone but the reader, and two more, so four can be typing and some get counted. */
const OTHERS = [
  ...PEOPLE.filter((person) => person.id !== YOU.id),
  { name: "Avery Chen" },
  { name: "Lena Brooks" },
];

export function TypingIndicatorDemo() {
  const [count, setCount] = useState(1);

  return (
    <>
      <Example title="However many are typing: none keeps its line, and past three the rest are counted">
        <Stack spacing={2} sx={{ maxWidth: 480 }}>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={count}
            onChange={(_, value: number | null) => value !== null && setCount(value)}
            aria-label="How many are typing"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <ToggleButton key={n} value={n}>
                {n}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          <TypingIndicator people={OTHERS.slice(0, count)} />
        </Stack>
      </Example>
      <CodeBlock
        code={`<TypingIndicator people={typing.filter((person) => person.id !== me.id)} />
<MessageComposer value={draft} onChange={setDraft} onSend={send} />`}
      />
    </>
  );
}
