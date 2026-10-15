import Grid from "@mui/material/Grid";
import { CodeBlock } from "../../docs/CodeBlock";
import { SAMPLE_RELATED } from "../../docs/conversations";
import { Example } from "../../docs/Example";
import { SectionCard } from "../layout/SectionCard";
import { ConversationRelatedDetails } from "./ConversationRelatedDetails";

export function ConversationRelatedDetailsDemo() {
  return (
    <>
      <Example title="As ConversationRow's +N more opens it: about more than one of every kind, and about just a few">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <ConversationRelatedDetails related={SAMPLE_RELATED} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <ConversationRelatedDetails
              related={[
                { kind: "product", name: "Customer Portal" },
                { kind: "capability", name: "Email invoices" },
                { kind: "capacity", block: "core", number: "BLK-0042" },
              ]}
            />
          </Grid>
        </Grid>
      </Example>
      <Example title="In a card of your own, with card={false}">
        <SectionCard title="About this conversation">
          <ConversationRelatedDetails related={SAMPLE_RELATED} card={false} />
        </SectionCard>
      </Example>
      <CodeBlock
        code={`<ConversationRelatedDetails
  related={[
    { kind: "product", name: "Customer Portal" },
    { kind: "feature", name: "Sign-in" },
    { kind: "capability", name: "Sign in with Google" },
    { kind: "focus", name: "Single sign-on" },
    { kind: "capacity", block: "core", number: "BLK-0042" },
  ]}
/>`}
      />
    </>
  );
}
