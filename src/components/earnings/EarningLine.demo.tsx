import Card from "@mui/material/Card";
import { CodeBlock } from "../../docs/CodeBlock";
import {
  collectedEarnings,
  engineerPayout,
  leadPayout,
  partnerPayout,
  sentPayout,
  upcomingEarnings,
} from "../../docs/earnings";
import { Example } from "../../docs/Example";
import { EarningLine } from "./EarningLine";

const EACH_STATUS = [
  upcomingEarnings[0],
  upcomingEarnings[2],
  collectedEarnings[0],
  sentPayout[0],
  engineerPayout[0],
];

const EACH_TYPE = [
  engineerPayout[0],
  engineerPayout[1],
  leadPayout[1],
  partnerPayout[0],
  leadPayout[3],
  engineerPayout[4],
];

export function EarningLineDemo() {
  return (
    <>
      <Example title="Each type (hover a type for what it means, and Why this amount? for the rest)">
        <Card>
          {EACH_TYPE.map((earning) => (
            <EarningLine key={earning.id} earning={earning} />
          ))}
        </Card>
      </Example>
      <Example title="Each status, in order">
        <Card>
          {EACH_STATUS.map((earning) => (
            <EarningLine key={earning.id} earning={earning} />
          ))}
        </Card>
      </Example>
      <CodeBlock
        code={`<Card>
  {earnings.map((earning) => (
    <EarningLine key={earning.id} earning={earning} />
  ))}
</Card>`}
      />
    </>
  );
}
