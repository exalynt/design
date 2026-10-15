import Box from "@mui/material/Box";
import { Example } from "../../docs/Example";
import { SectionCard } from "../layout/SectionCard";
import { StabilityDetails } from "./StabilityDetails";

export function StabilityDetailsDemo() {
  return (
    <>
      <Example title="On its card, as the popover shows it">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <StabilityDetails level="beta" feature="Invoice export" />
        </Box>
      </Example>
      <Example title="On a page, in a card of your own">
        <Box sx={{ maxWidth: 420 }}>
          <SectionCard title="What Prototype means">
            <StabilityDetails level="prototype" card={false} />
          </SectionCard>
        </Box>
      </Example>
    </>
  );
}
