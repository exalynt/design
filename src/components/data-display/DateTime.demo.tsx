import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { DateTime } from "./DateTime";
import { ListTable } from "../table/ListTable";
import type { Column } from "../table/DataTable";

type Activity = { id: string; what: string; who: string; at: string };

const activity: Activity[] = [
  { id: "1", what: "Invoice INV-0104 sent", who: "Dana Wu", at: "2026-10-08T19:30:00Z" },
  { id: "2", what: "Estimate approved", who: "Acme Corp", at: "2026-10-08T03:05:12Z" },
  { id: "3", what: "Hours logged", who: "Sam Okafor", at: "2026-10-06T22:47:00.512Z" },
  { id: "4", what: "Project created", who: "Dana Wu", at: "2026-09-30T14:00:00Z" },
];

const columns: Column<Activity>[] = [
  { id: "what", header: "What", value: (row) => row.what },
  { id: "who", header: "Who", value: (row) => row.who, hideBelow: "sm" },
  {
    id: "at",
    header: "When",
    /* Sort by the moment, not the text, so any precision or offset sorts right. */
    value: (row) => Date.parse(row.at),
    render: (row) => <DateTime value={row.at} />,
    sortable: true,
  },
];

/* Moments before now, so they always read as recent. */
const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

export function DateTimeDemo() {
  return (
    <>
      <Example title="In running text">
        <Typography variant="body2">
          Invoice INV-0104 was sent <DateTime value="2026-10-08T19:30:00Z" /> and is due{" "}
          <DateTime value="2026-11-07T19:30:00Z" dateOnly />.
        </Typography>
      </Example>
      <CodeBlock
        code={`Invoice INV-0104 was sent <DateTime value={invoice.sentAt} /> and is due{" "}
<DateTime value={invoice.dueAt} dateOnly />.`}
      />

      <Example title="How long ago, with relative, as a list of conversations has it: hover one for its full time">
        <Typography variant="body2" component="div" sx={{ display: "grid", gap: 0.5 }}>
          <span>
            <DateTime value={ago(0)} relative />
          </span>
          <span>
            <DateTime value={ago(5)} relative />
          </span>
          <span>
            <DateTime value={ago(180)} relative />
          </span>
          <span>
            <DateTime value={ago(60 * 30)} relative />
          </span>
          <span>
            <DateTime value="2026-10-02T13:40:00Z" relative />
          </span>
        </Typography>
      </Example>
      <CodeBlock code={`<DateTime value={conversation.last_activity_at} relative />`} />

      <Example title="In a table">
        <ListTable
          title="Activity"
          noun={{ one: "event", other: "events" }}
          columns={columns}
          rows={activity}
          rowKey={(row) => row.id}
          defaultSort={{ column: "at", direction: "desc" }}
        />
      </Example>
      <CodeBlock
        code={`{
  id: "at",
  header: "When",
  value: (row) => Date.parse(row.at),
  render: (row) => <DateTime value={row.at} />,
  sortable: true,
}`}
      />

      <Example title="In a button, and what isn't a timestamp">
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Button variant="outlined">
            Restore the copy from&nbsp;
            <DateTime value="2026-10-07T09:15:00Z" focusable={false} />
          </Button>
          <Typography variant="body2">
            A calendar date, shown as given: <DateTime value="2026-10-08" />
          </Typography>
        </Stack>
      </Example>
    </>
  );
}
