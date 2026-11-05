import { CodeBlock } from "../../docs/CodeBlock";
import { engineerPayout, leadPayout, partnerPayout, sentPayout } from "../../docs/earnings";
import { Example } from "../../docs/Example";
import { PayoutStatement } from "./PayoutStatement";

export function PayoutStatementDemo() {
  return (
    <>
      <Example title="An engineer's payout">
        <PayoutStatement
          sentOn="Friday, Oct 9"
          status="paid"
          destination="Chase ••4242"
          earnings={engineerPayout}
        />
      </Example>
      <Example title="One that's been sent and hasn't arrived">
        <PayoutStatement
          sentOn="Friday, Oct 30"
          status="sent"
          destination="Chase ••4242"
          earnings={sentPayout}
        />
      </Example>
      <Example title="A Team Lead's: a share of each teammate's block, and no Team Support">
        <PayoutStatement
          sentOn="Friday, Oct 9"
          status="paid"
          destination="Chase ••4242"
          earnings={leadPayout}
        />
      </Example>
      <Example title="A partner's that came back: a block and its client, never the client's work">
        <PayoutStatement
          sentOn="Friday, Oct 30"
          status="failed"
          destination="Mercury ••0193"
          earnings={partnerPayout}
          failure="The bank returned it because the account is closed. It goes out again once there's an account that can take it."
        />
      </Example>
      <CodeBlock
        code={`<PayoutStatement
  sentOn="Friday, Oct 9"
  status={payout.status}
  destination={accountLabel(payout.account)}
  earnings={payout.earnings}
/>`}
      />
    </>
  );
}
