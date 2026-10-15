import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Example } from "../../docs/Example";
import { PageHeader } from "../layout/PageHeader";
import { StabilityBanner } from "./StabilityBanner";

export function StabilityBannerDemo() {
  return (
    <>
      <Example title="The level's own words, by default">
        <Stack spacing={2}>
          <StabilityBanner level="prototype" feature="Assistant" />
          <StabilityBanner level="alpha" feature="Scenario compare" />
          <StabilityBanner level="beta" feature="Payroll export" />
        </Stack>
      </Example>
      <Example title="Opening a page, with copy for it and one action">
        <PageHeader
          title="Scenario compare"
          description="Put two forecasts side by side and see where they part."
        />
        <StabilityBanner
          level="alpha"
          feature="Scenario compare"
          title="Scenario compare is new, and still changing week to week."
          action={<Button variant="outlined">Send feedback</Button>}
        >
          Try it on this quarter&rsquo;s numbers and tell us what&rsquo;s missing. Keep your
          spreadsheet until it&rsquo;s in Beta.
        </StabilityBanner>
      </Example>
    </>
  );
}
