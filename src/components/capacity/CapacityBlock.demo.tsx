import { useState } from "react";
import Grid from "@mui/material/Grid";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import { CodeBlock } from "../../docs/CodeBlock";
import { MARCUS, PRIYA } from "../../docs/engineers";
import { Example } from "../../docs/Example";
import { CAPACITY_BLOCK_IDS } from "./capacity";
import type { CapacityBlockProps } from "./CapacityBlock";
import { CapacityBlock } from "./CapacityBlock";
import { CapacityEngineer } from "./CapacityEngineer";
import { CapacityPlacement } from "./CapacityPlacement";
import { CapacitySchedule } from "./CapacitySchedule";
import { CapacityStatus, type CapacityStatusProps } from "./CapacityStatus";

const placement = (
  <CapacityPlacement product="Customer Portal" upNext="Invoice export" onFocusClick={() => {}} />
);

/* One block at each status, as an app might draw it there. */
const LIFE: (CapacityBlockProps & { status: CapacityStatusProps["status"] })[] = [
  {
    status: "available",
    number: "BLK-0045",
    block: "core",
    onDragStart: () => {},
    dragHint: "Drag onto a week to schedule it.",
    footer: (
      <>
        <CapacityEngineer engineer={null} />
        <CapacitySchedule week={null} onScheduleClick={() => {}} />
      </>
    ),
    children: placement,
  },
  {
    status: "scheduled",
    number: "BLK-0044",
    block: "dedicated",
    scheduled: true,
    onDragStart: () => {},
    dragHint: "Drag onto another week to move it.",
    footer: (
      <>
        <CapacityEngineer engineer={PRIYA} />
        <CapacitySchedule week="Week of Oct 19" />
      </>
    ),
    children: placement,
  },
  {
    status: "in_progress",
    number: "BLK-0042",
    block: "core",
    scheduled: true,
    locked: "Its week has started, so it can't be changed.",
    footer: (
      <>
        <CapacityEngineer engineer={MARCUS} />
        <CapacitySchedule week="This week" />
      </>
    ),
    children: <CapacityPlacement product="Customer Portal" focus="Invoice export" />,
  },
  {
    status: "fulfilled",
    number: "BLK-0038",
    block: "flex",
    locked: "It's been fulfilled.",
    footer: (
      <>
        <CapacityEngineer engineer={PRIYA} />
        <CapacitySchedule week="Week of Oct 5" />
      </>
    ),
    children: <CapacityPlacement product="Customer Portal" focus="Saved searches" />,
  },
];

export function CapacityBlockDemo() {
  const [picked, setPicked] = useState<string | null>("core");
  return (
    <>
      <Example title="Each block, waiting for a week (click one to pick it)">
        <Grid container spacing={2}>
          {CAPACITY_BLOCK_IDS.map((id) => (
            <Grid key={id} size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
              <CapacityBlock
                block={id}
                selected={picked === id}
                onClick={() => setPicked(picked === id ? null : id)}
                footer={<CapacitySchedule week={null} onScheduleClick={() => {}} />}
              >
                {placement}
              </CapacityBlock>
            </Grid>
          ))}
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityBlock
  block={capacity.type}
  selected={picked === capacity.id}
  onClick={() => pick(capacity.id)}
  footer={<CapacitySchedule week={weekLabel(capacity)} onScheduleClick={openWeekPicker} />}
>
  <CapacityPlacement product={product?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />

      <Example title="Through its life: Available, Scheduled, In progress, and Fulfilled">
        <Grid container spacing={2}>
          {LIFE.map(({ status, ...props }) => (
            <Grid key={status} size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
              <CapacityBlock {...props} badge={<CapacityStatus status={status} />} />
            </Grid>
          ))}
        </Grid>
      </Example>
      <Example title="Where cards are narrow, such as a week's column: the status as just its icon">
        <Grid container spacing={2}>
          {LIFE.map(({ status, ...props }) => (
            <Grid key={status} size={{ xs: 12, sm: 6, lg: 3 }} sx={{ display: "flex" }}>
              <CapacityBlock {...props} badge={<CapacityStatus status={status} iconOnly />} />
            </Grid>
          ))}
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityBlock
  block={capacity.type}
  badge={<CapacityStatus status={capacity.status} iconOnly={narrow} />}
/>`}
      />

      <Example title="Needs attention: edged in warning, with the kind of attention it needs (hover it)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              scheduled
              onDragStart={() => {}}
              dragHint="Drag onto another week to move it."
              number="BLK-0046"
              attention={{
                label: "Unassigned",
                icon: <PersonOffOutlinedIcon />,
                hint: "It's scheduled for next week with no one on it. Assign an engineer.",
              }}
              badge={<CapacityStatus status="scheduled" iconOnly />}
              footer={
                <>
                  <CapacityEngineer engineer={null} onAssignClick={() => {}} />
                  <CapacitySchedule week="Week of Oct 19" />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="dedicated"
              scheduled
              onDragStart={() => {}}
              dragHint="Drag onto another week to move it."
              number="BLK-0043"
              attention={{
                label: "Overbooked",
                icon: <EventBusyOutlinedIcon />,
                hint: "Priya has more than a full engineer's capacity booked that week. Move a block or assign someone else.",
              }}
              badge={<CapacityStatus status="scheduled" iconOnly />}
              footer={
                <>
                  <CapacityEngineer engineer={PRIYA} onAssignClick={() => {}} />
                  <CapacitySchedule week="Week of Oct 19" />
                </>
              }
            >
              <CapacityPlacement product="Customer Portal" focus="Invoice export" />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              onDragStart={() => {}}
              dragHint="Drag onto a week to schedule it."
              number="BLK-0039"
              attention={{
                label: "Waiting 3 weeks",
                icon: <HourglassBottomRoundedIcon />,
                hint: "Bought three weeks ago and still not scheduled. Choose a week for it.",
              }}
              badge={<CapacityStatus status="available" iconOnly />}
              footer={
                <>
                  <CapacityEngineer engineer={null} onAssignClick={() => {}} />
                  <CapacitySchedule week={null} onScheduleClick={() => {}} />
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
  attention={
    overbooked
      ? { label: "Overbooked", icon: <EventBusyOutlinedIcon />, hint: \`\${engineer.name} has more than a full engineer's capacity booked that week.\` }
      : undefined
  }
/>`}
      />

      <Example title="On a schedule: scheduled, draggable, locked, and where one will land">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              scheduled
              footer={<CapacitySchedule week="Week of Oct 12" />}
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              onDragStart={() => {}}
              dragHint="Drag onto a week after this one to schedule it."
              badge={<CapacityStatus status="available" />}
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="dedicated"
              scheduled
              locked="Its week has started, so it can't be changed."
              footer={<CapacitySchedule week="This week" />}
            >
              <CapacityPlacement product="Customer Portal" focus="Invoice export" />
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <CapacityBlock block="flex" preview>
              <CapacityPlacement product="Customer Portal" upNext="Invoice export" />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
    </>
  );
}
