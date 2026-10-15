import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { SAMPLE_PROGRESS, onBlock, onFocus } from "../docs/progress";
import { ProgressCard } from "./ProgressCard";

/* A week's heading in a Focus's listing: the week, its days, and who reported in it. */
function Week({ title, days, who }: { title: string; days: string; who: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Typography variant="subtitle2" component="h3" sx={{ flex: "none" }}>
        {title}
        <Box component="span" sx={{ color: "text.secondary", fontWeight: 400 }}>
          {" "}
          · {days} · {who}
        </Box>
      </Typography>
      <Box sx={{ flex: 1, borderTop: 1, borderColor: "divider" }} />
    </Box>
  );
}

export function ProgressCardDemo() {
  const thisWeek = SAMPLE_PROGRESS.filter((record) => record.block !== "BLK-0038");
  const lastWeek = SAMPLE_PROGRESS.filter((record) => record.block === "BLK-0038");
  const delivered = SAMPLE_PROGRESS.filter((record) => record.block === "BLK-0042");
  return (
    <>
      <Example title="On a Focus: its progress by week, each with the block it came from (hover a badge)">
        <Stack spacing={2} sx={{ maxWidth: 760 }}>
          <Week title="Week of Oct 5" days="Oct 5 – 11" who="Lena, Avery" />
          {thisWeek.map((record) => (
            <ProgressCard key={record.id} {...onFocus(record)} />
          ))}
          <Week title="Week of Sep 28" days="Sep 28 – Oct 4" who="Lena" />
          {lastWeek.map((record) => (
            <ProgressCard key={record.id} {...onFocus(record)} />
          ))}
        </Stack>
      </Example>
      <CodeBlock
        code={`<ProgressCard
  kind={progressKind(record)}
  text={record.text}
  at={record.created_at}
  by={{ name: record.by.name, avatarUrl: record.by.avatar_url }}
  source={<CapacityTag block={block.type} number={block.number} details />}
  capabilities={record.capabilities.map((touch) => ({
    name: catalog.capability(touch.capability_id).name,
    change: touch.change,
    from: touch.from,
    level: touch.to,
  }))}
  metrics={record.metrics}
  media={record.media}
/>`}
      />

      <Example title="On a capacity block: what it delivered, each with the Focus it went to">
        <Stack spacing={2} sx={{ maxWidth: 760 }}>
          <Typography variant="subtitle2" component="h3">
            What BLK-0042 delivered
          </Typography>
          {delivered.map((record) => (
            <ProgressCard key={record.id} {...onBlock(record)} />
          ))}
        </Stack>
      </Example>
    </>
  );
}
