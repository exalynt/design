import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { FocusMenu } from "./FocusCard.demo";
import { FocusCard } from "./FocusCard";
import { FocusPriorityList } from "./FocusPriorityList";

const UP_NEXT = [
  {
    id: "slow",
    title: "The app gets really slow during busy hours",
    conversations: 3,
    unread: 1,
    at: "2026-10-12T16:40:00Z",
  },
  {
    id: "inventory",
    title: "Could we replace our inventory spreadsheets?",
    features: 1,
    capabilities: 3,
    conversations: 3,
    at: "2026-10-05T10:15:00Z",
  },
  {
    id: "on-time",
    title: "Managers want to see on-time rate by depot",
    capabilities: 1,
    conversations: 2,
    at: "2026-09-22T14:00:00Z",
  },
];

const [{ id: _id, ...ONLY }] = UP_NEXT;

export function FocusPriorityListDemo() {
  return (
    <>
      <Example title="Up next on a board, draggable, with each card's menu">
        <Stack sx={{ maxWidth: 340 }}>
          <FocusPriorityList>
            {UP_NEXT.map(({ id, ...focus }) => (
              <FocusCard
                key={id}
                {...focus}
                href="#FocusPriorityList"
                grip
                actions={<FocusMenu title={focus.title} />}
              />
            ))}
          </FocusPriorityList>
        </Stack>
      </Example>
      <CodeBlock
        code={`<FocusPriorityList>
  {upNext.map((focus) => (
    <FocusCard key={focus.id} title={focus.title} href={focusPath(focus.id)} at={focus.lastActivityAt} grip />
  ))}
</FocusPriorityList>`}
      />

      <Example title="One item: no Lowest priority">
        <Stack sx={{ maxWidth: 340 }}>
          <FocusPriorityList>
            <FocusCard {...ONLY} href="#FocusPriorityList" />
          </FocusPriorityList>
        </Stack>
      </Example>

      <Example
        title={
          "In a card, such as a product's overview: surface=\"paper\" cuts the rail with the card's color"
        }
      >
        <Card sx={{ p: 2, maxWidth: 380 }}>
          <FocusPriorityList surface="paper">
            {UP_NEXT.map(({ id, ...focus }) => (
              <FocusCard key={id} {...focus} href="#FocusPriorityList" />
            ))}
          </FocusPriorityList>
        </Card>
      </Example>
    </>
  );
}
