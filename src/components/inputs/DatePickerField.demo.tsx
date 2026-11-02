import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { DatePickerField } from "./DatePickerField";

export function DatePickerFieldDemo() {
  const [date, setDate] = useState<string | null>("2026-11-02");
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);

  return (
    <>
      <Example title="One date, typed or picked">
        <Stack spacing={1} sx={{ maxWidth: 240 }}>
          <DatePickerField label="Starts on" value={date} onChange={setDate} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {date ?? "No date"}
          </Typography>
        </Stack>
      </Example>
      <CodeBlock
        code={`<DatePickerField
  label="Starts on"
  value={date}                 // "2026-11-02", or null
  onChange={setDate}           // only ever a whole date, or null when cleared
/>`}
      />

      <Example title="A range: each date limits the other">
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ maxWidth: 480 }}>
          <DatePickerField label="Start date" value={start} max={end} onChange={setStart} />
          <DatePickerField label="End date" value={end} min={start} onChange={setEnd} />
        </Stack>
      </Example>

      <Example title="Required, with help, and disabled">
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ maxWidth: 480 }}>
          <DatePickerField
            label="Due on"
            value={date}
            onChange={setDate}
            required
            helperText="Invoices fall due on this date."
          />
          <DatePickerField label="Paid on" value={date} onChange={setDate} disabled />
        </Stack>
      </Example>
    </>
  );
}
