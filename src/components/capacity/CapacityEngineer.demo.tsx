import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { MARCUS, PRIYA } from "../../docs/engineers";
import { Example } from "../../docs/Example";
import { CapacityBlock } from "./CapacityBlock";
import { When } from "./CapacityBlock.demo";
import { CapacityEngineer } from "./CapacityEngineer";
import { CapacityPlacement } from "./CapacityPlacement";
import { CapacityStatus } from "./CapacityStatus";

const placement = <CapacityPlacement product="Customer Portal" upNext="Invoice export" />;

/* The app opens its own picker at the line; here, nothing. */
const pick = () => {};

export function CapacityEngineerDemo() {
  return (
    <>
      <Example title="In an admin view: assign one, or change who (hover the name)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              footer={
                <>
                  <CapacityEngineer engineer={null} onAssignClick={pick} />
                  <When />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              scheduled
              footer={
                <>
                  <CapacityEngineer engineer={PRIYA} onAssignClick={pick} />
                  <When week="Week of Oct 12" />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityBlock
  block={capacity.type}
  footer={
    <>
      <CapacityEngineer
        engineer={engineer && {
          name: engineer.name,
          level: engineer.level,
          avatarUrl: engineer.avatar_url,
          bio: engineer.bio,
          profileHref: \`/engineers/\${engineer.id}\`,
        }}
        onAssignClick={(anchor) => openEngineerPicker(anchor)}
      />
      <When capacity={capacity} />
    </>
  }
>
  <CapacityPlacement product={product?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />

      <Example title="In a client's view: who, read-only (hover the name)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              footer={
                <>
                  <CapacityEngineer engineer={null} />
                  <When />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              scheduled
              footer={
                <>
                  <CapacityEngineer engineer={MARCUS} />
                  <When week="Week of Oct 12" />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock code={`<CapacityEngineer engineer={engineerProfile} />`} />

      <Example title="Just who, where the week shows elsewhere, such as a week's column on a schedule">
        <Box
          sx={{
            maxWidth: 320,
            p: 1.5,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            bgcolor: "background.default",
          }}
        >
          <Typography variant="subtitle2" component="h3" sx={{ mb: 1.5 }}>
            Week of Oct 19
          </Typography>
          <Stack spacing={1.5}>
            <CapacityBlock
              block="dedicated"
              scheduled
              badge={<CapacityStatus status="scheduled" iconOnly />}
              footer={<CapacityEngineer engineer={PRIYA} />}
            >
              <CapacityPlacement product="Customer Portal" focus="Invoice export" />
            </CapacityBlock>
            <CapacityBlock
              block="flex"
              scheduled
              badge={<CapacityStatus status="scheduled" iconOnly />}
              footer={<CapacityEngineer engineer={null} />}
            >
              <CapacityPlacement product="Booking app" upNext="Saved searches" />
            </CapacityBlock>
          </Stack>
        </Box>
      </Example>
      <CodeBlock
        code={`<CapacityBlock block={capacity.type} scheduled footer={<CapacityEngineer engineer={engineerProfile} />} />`}
      />
    </>
  );
}
