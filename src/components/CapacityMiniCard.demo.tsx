import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../docs/CodeBlock";
import { MARCUS, PRIYA } from "../docs/engineers";
import { Example } from "../docs/Example";
import { CapacityMiniCard } from "./CapacityMiniCard";

export function CapacityMiniCardDemo() {
  return (
    <>
      <Example title="In a side column: the capacity a Focus came from (hover a badge for its size; each opens its block)">
        <Stack spacing={1} sx={{ maxWidth: 300 }}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            From capacity
          </Typography>
          <CapacityMiniCard
            block="core"
            week="This week"
            status="in_progress"
            engineer={MARCUS}
            number="BLK-0042"
            details
            href="#capacity/blocks/BLK-0042"
          />
          <CapacityMiniCard
            block="flex"
            week="Week of Oct 5"
            status="fulfilled"
            engineer={PRIYA}
            number="BLK-0038"
            details
            href="#capacity/blocks/BLK-0038"
          />
          <CapacityMiniCard
            block="flex"
            week="Week of Sep 28"
            status="fulfilled"
            engineer={PRIYA}
            number="BLK-0031"
            details
            href="#capacity/blocks/BLK-0031"
          />
        </Stack>
      </Example>
      <CodeBlock
        code={`import { CapacityMiniCard } from "@exalynt/design/components";

<CapacityMiniCard
  block={capacity.type}
  week={weekLabel(capacity.week_starts_on)}
  status={capacity.status}
  engineer={engineerProfile}
  number={capacity.number}
  details
  href={\`/capacity/blocks/\${capacity.number}\`}
/>`}
      />

      <Example title="With less: just its badge and week, no engineer yet, or not scheduled">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CapacityMiniCard block="dedicated" week="Week of Oct 19" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CapacityMiniCard
              block="core"
              week="Week of Oct 26"
              status="scheduled"
              engineer={null}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <CapacityMiniCard block="flex" status="available" number="BLK-0045" />
          </Grid>
        </Grid>
      </Example>
    </>
  );
}
