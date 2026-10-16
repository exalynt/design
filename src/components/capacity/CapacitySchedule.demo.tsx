import Grid from "@mui/material/Grid";
import { CodeBlock } from "../../docs/CodeBlock";
import { PRIYA } from "../../docs/engineers";
import { Example } from "../../docs/Example";
import { CapacityBlock } from "./CapacityBlock";
import { CapacityEngineer } from "./CapacityEngineer";
import { CapacityPlacement } from "./CapacityPlacement";
import { CapacitySchedule } from "./CapacitySchedule";

const placement = <CapacityPlacement product="Customer Portal" upNext="Invoice export" />;

/* The app opens its own picker at the line; here, nothing. */
const pick = () => {};

export function CapacityScheduleDemo() {
  return (
    <>
      <Example title="In an admin view: schedule one, or move it to another week (hover a line)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              footer={
                <>
                  <CapacityEngineer engineer={PRIYA} onAssignClick={pick} />
                  <CapacitySchedule week={null} onScheduleClick={pick} />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              scheduled
              footer={
                <>
                  <CapacityEngineer engineer={PRIYA} onAssignClick={pick} />
                  <CapacitySchedule week="Week of Oct 19" onScheduleClick={pick} />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              footer={
                <>
                  <CapacityEngineer engineer={null} onAssignClick={pick} />
                  <CapacitySchedule week={null} onProduct={false} onScheduleClick={pick} />
                </>
              }
            >
              <CapacityPlacement product={null} onProductClick={pick} />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacitySchedule
  week={capacity.week_starts_on ? weekLabel(capacity.week_starts_on) : null}
  onProduct={Boolean(capacity.product_id)}
  onScheduleClick={canSchedule ? (anchor) => openWeekPicker(anchor) : undefined}
/>`}
      />

      <Example title="In a client's view, or once its week has started: when, read-only">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex" footer={<CapacitySchedule week={null} />}>
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              scheduled
              footer={<CapacitySchedule week="Week of Oct 12" />}
            >
              {placement}
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock code={`<CapacitySchedule week={weekLabel(capacity.week_starts_on)} />`} />
    </>
  );
}
