import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { DetailsCard, DetailsEyebrow, DetailsLink, DetailsPopover } from "./DetailsPopover";

function Details({ card = true }: { card?: boolean }) {
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>Term</DetailsEyebrow>
      <Box sx={{ mt: 1, fontSize: "1.12em", fontWeight: 700 }}>Team Support Share</Box>
      <Box sx={{ mt: 0.75 }}>
        What you earn when a teammate fulfills a block, for being there to review, pair, and share
        context in a week you have availability.
      </Box>
      <DetailsLink href="https://readme.exalynt.com/engineers/compensation#team-support">
        How team support is paid
      </DetailsLink>
    </DetailsCard>
  );
}

export function DetailsPopoverDemo() {
  return (
    <>
      <Example title="A word that explains itself (hover or focus it)">
        <DetailsPopover title={<Details />}>
          <Box
            component="span"
            tabIndex={0}
            sx={{
              fontWeight: 600,
              cursor: "help",
              borderRadius: 0.5,
              "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
            }}
          >
            Team Support Share
          </Box>
        </DetailsPopover>
      </Example>
      <Example title="The card it opens">
        <Grid container spacing={2}>
          <Grid size="auto">
            <Details />
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<DetailsPopover
  title={
    <DetailsCard card>
      <DetailsEyebrow>Term</DetailsEyebrow>
      <Box sx={{ mt: 1, fontSize: "1.12em", fontWeight: 700 }}>{name}</Box>
      <Box sx={{ mt: 0.75 }}>{description}</Box>
      <DetailsLink href={readmeUrl}>How it's paid</DetailsLink>
    </DetailsCard>
  }
>
  <Box component="span" tabIndex={0} sx={{ cursor: "help" }}>
    {name}
  </Box>
</DetailsPopover>`}
      />
    </>
  );
}
