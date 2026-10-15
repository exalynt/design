import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { FeatureCard } from "./FeatureCard";

const signing = [
  { name: "Sign for a delivery", level: "alpha" as const },
  { name: "Leave a photo when nobody signs", level: "prototype" as const },
  { name: "Send signatures once back online", level: null },
];

export function FeatureCardDemo() {
  return (
    <>
      <Example title="On a canvas: draggable, with a way to add a Capability (hover the ring)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FeatureCard
              name="Signing for deliveries"
              description="Proof that each delivery reached someone, even with no signal."
              capabilities={signing}
              grip
              onAddCapability={() => {}}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FeatureCard name="Route planning" capabilities={[]} grip onAddCapability={() => {}} />
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<FeatureCard
  name={feature.title}
  description={feature.description}
  capabilities={capabilities.map((capability) => ({
    id: capability.id,
    name: capability.text,
    level: capability.level,
    actions: <CapabilityMenu capability={capability} />,
  }))}
  grip
  onAddCapability={() => addCapability(feature.id)}
/>`}
      />

      <Example title="Long names: the Feature's and each Capability's are cut short on one line (hover one for the whole name)">
        <Stack sx={{ maxWidth: 340 }}>
          <FeatureCard
            name="Signing for deliveries and collections across every depot"
            description="Proof that each delivery reached someone, even with no signal."
            capabilities={[
              {
                name: "Sign for a delivery on the driver's phone or the customer's",
                level: "beta",
              },
              { name: "Leave a photo and a note when nobody is home to sign", level: "alpha" },
              { name: "Send signatures and photos once the van is back online", level: null },
            ]}
            grip
          />
        </Stack>
      </Example>

      <Example title="Read-only, such as in a product's summary">
        <Stack sx={{ maxWidth: 400 }}>
          <FeatureCard
            name="Signing for deliveries"
            description="Proof that each delivery reached someone, even with no signal."
            capabilities={signing}
          />
        </Stack>
      </Example>
    </>
  );
}
