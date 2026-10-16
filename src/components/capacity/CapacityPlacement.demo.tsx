import Grid from "@mui/material/Grid";
import { CodeBlock } from "../../docs/CodeBlock";
import { MARCUS, PRIYA } from "../../docs/engineers";
import { Example } from "../../docs/Example";
import { CapacityBlock } from "./CapacityBlock";
import { CapacitySchedule } from "./CapacitySchedule";
import { CapacityEngineer } from "./CapacityEngineer";
import { CapacityPlacement } from "./CapacityPlacement";
import { CapacityStatus } from "./CapacityStatus";

const available = <CapacityStatus status="available" />;

/* The app opens its own picker at the line; here, nothing. */
const pick = () => {};

export function CapacityPlacementDemo() {
  return (
    <>
      <Example title="From no product to a Focus of its own (hover a line)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              badge={available}
              footer={<CapacitySchedule week={null} onProduct={false} onScheduleClick={() => {}} />}
            >
              <CapacityPlacement product={null} onProductClick={pick} />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              badge={available}
              footer={<CapacitySchedule week={null} onScheduleClick={() => {}} />}
            >
              <CapacityPlacement
                product="Customer Portal"
                upNext="Invoice export"
                onProductClick={pick}
                onFocusClick={pick}
              />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              badge={available}
              footer={<CapacitySchedule week={null} onScheduleClick={() => {}} />}
            >
              <CapacityPlacement
                product="Customer Portal"
                focus="Invoice export"
                onProductClick={pick}
                onFocusClick={pick}
              />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityPlacement
  product={product?.name ?? null}
  focus={focus?.name}
  upNext={upNext?.name}
  onProductClick={(anchor) => openProductPicker(anchor)}
  onFocusClick={(anchor) => openFocusPicker(anchor)}
/>`}
      />

      <Example title="Read-only, where it can't be changed here">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex">
              <CapacityPlacement product={null} />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex">
              <CapacityPlacement product="Customer Portal" />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex" locked="Exalynt is working on it, so it can't be changed.">
              <CapacityPlacement product="Customer Portal" focus="Invoice export" />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>

      <Example title="Across organizations, as in Exalynt's admin views: the organization first">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              badge={available}
              footer={
                <>
                  <CapacityEngineer engineer={null} onAssignClick={pick} />
                  <CapacitySchedule week={null} onProduct={false} onScheduleClick={() => {}} />
                </>
              }
            >
              <CapacityPlacement
                organization="Northwind Health"
                product={null}
                onProductClick={pick}
              />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="dedicated"
              scheduled
              badge={<CapacityStatus status="scheduled" />}
              footer={
                <>
                  <CapacityEngineer engineer={PRIYA} onAssignClick={pick} />
                  <CapacitySchedule week="Week of Oct 19" />
                </>
              }
            >
              <CapacityPlacement
                organization="Acme Logistics"
                product="Customer Portal"
                upNext="Invoice export"
                onProductClick={pick}
                onFocusClick={pick}
              />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              scheduled
              locked="Its week has started, so it can't be changed."
              badge={<CapacityStatus status="in_progress" />}
              footer={
                <>
                  <CapacityEngineer engineer={MARCUS} onAssignClick={pick} />
                  <CapacitySchedule week="This week" />
                </>
              }
            >
              <CapacityPlacement
                organization="Brightline Studios"
                product="Booking app"
                focus="Saved searches"
              />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityPlacement organization={capacity.organization.name} product={product?.name ?? null} />`}
      />
    </>
  );
}
