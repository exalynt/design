import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { MARCUS, PRIYA } from "../../docs/engineers";
import { Example } from "../../docs/Example";
import { SAMPLE_PROGRESS, onBlock, progressCounts } from "../../docs/progress";
import { CapacityBlock } from "./CapacityBlock";
import { When } from "./CapacityBlock.demo";
import { CapacityEngineer } from "./CapacityEngineer";
import { CapacityPlacement } from "./CapacityPlacement";
import { CapacityProgress } from "./CapacityProgress";
import { CapacityStatus } from "./CapacityStatus";
import { ProgressCard } from "../progress/ProgressCard";
import { useToast } from "../feedback/toast";

const placement = <CapacityPlacement product="Delivery app" focus="Signing for deliveries" />;

/* The block whose progress the page's sample records mostly came of. */
function Blk0042({
  onClick,
  onProgressClick,
}: {
  onClick?: () => void;
  onProgressClick?: () => void;
}) {
  return (
    <CapacityBlock
      onClick={onClick}
      block="core"
      number="BLK-0042"
      scheduled
      locked="Its week has started, so it can't be changed."
      badge={<CapacityStatus status="in_progress" />}
      footer={
        <>
          <CapacityEngineer engineer={MARCUS} />
          <When week="This week" />
          <CapacityProgress counts={progressCounts("BLK-0042")} onClick={onProgressClick} />
        </>
      }
    >
      {placement}
    </CapacityBlock>
  );
}

export function CapacityProgressDemo() {
  const toast = useToast();
  const delivered = SAMPLE_PROGRESS.filter((record) => record.block === "BLK-0042");
  /* What an app would do; here, say so. */
  const openProgress = (number: string) => toast.info(`Opens ${number}'s progress.`);
  return (
    <>
      <Example title="On blocks that have started: what came of each, at a glance (hover a line; click it, or the block, to see each does its own thing)">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <Blk0042
              onClick={() => toast.info("Opens BLK-0042.")}
              onProgressClick={() => openProgress("BLK-0042")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="flex"
              number="BLK-0038"
              locked="It's been fulfilled."
              badge={<CapacityStatus status="fulfilled" />}
              footer={
                <>
                  <CapacityEngineer engineer={PRIYA} />
                  <When week="Week of Sep 28" />
                  <CapacityProgress
                    counts={progressCounts("BLK-0038")}
                    onClick={() => openProgress("BLK-0038")}
                  />
                </>
              }
            >
              {placement}
            </CapacityBlock>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }} sx={{ display: "flex" }}>
            <CapacityBlock
              block="core"
              number="BLK-0046"
              scheduled
              locked="Its week has started, so it can't be changed."
              badge={<CapacityStatus status="in_progress" />}
              footer={
                <>
                  <CapacityEngineer engineer={PRIYA} />
                  <When week="This week" />
                  <CapacityProgress counts={{}} />
                </>
              }
            >
              <CapacityPlacement product="Delivery app" focus="Route planning" />
            </CapacityBlock>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<CapacityBlock
  block={capacity.type}
  badge={<CapacityStatus status={capacity.status} />}
  footer={
    <>
      <CapacityEngineer engineer={capacity.engineer} />
      <When capacity={capacity} />
      {capacity.status === "in_progress" || capacity.status === "fulfilled" ? (
        <CapacityProgress
          counts={capacity.progress_counts}
          onClick={() => navigate(\`/blocks/\${capacity.id}#progress\`)}
        />
      ) : null}
    </>
  }
/>`}
      />

      <Example title="On the block's page: the block, then what came of it">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Blk0042 />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle2" component="h3">
                What BLK-0042 delivered
              </Typography>
              {delivered.map((record) => (
                <ProgressCard key={record.id} {...onBlock(record)} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Example>
    </>
  );
}
