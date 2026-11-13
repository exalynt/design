import Typography from "@mui/material/Typography";
import { DateTime } from "../../components";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { Rules } from "./Rules";

export function DatesAndTimesGuideline() {
  return (
    <>
      <Guidance title="UTC from the server, the reader's time on screen">
        <p>
          The API sends and takes every point in time as an RFC 3339 timestamp in UTC, such as{" "}
          <code>2026-10-08T19:30:00Z</code>. Keep it as that string in the app&apos;s types and
          state, and turn it into anything else only to show it.
        </p>
        <p>
          Show it with <a href="#DateTime">DateTime</a>. It formats the time in the reader&apos;s
          own time zone and locale, as their browser has them, so nobody has to work out what
          &ldquo;19:30 UTC&rdquo; is for them. Hover, focus or a tap sets it side by side in their
          zone, with their place and offset from UTC, and in UTC, with the value as the server sent
          it. Two people in different zones can then agree on the moment.
        </p>
      </Guidance>

      <Example title="One moment, read in the reader's zone">
        <Typography variant="body2">
          Estimate approved <DateTime value="2026-10-08T03:05:12Z" />.
        </Typography>
      </Example>

      <Rules
        title="Every timestamp"
        items={[
          "Is shown with DateTime, in tables, lists and running text alike. Never format one by hand with toLocaleString or by slicing the string.",
          "Never hard-codes a locale or a time zone. The reader's browser decides both.",
          "Doesn't say its time zone in the text, except stacked. It's the reader's own, and the popover names it.",
          "Drops the time of day with dateOnly only where the day is all the reader needs, such as when a project was created. The popover keeps the full time.",
          "Shows it in full with stacked, the weekday and day over the time and its zone, where each entry has room beside it for two lines, as on a timeline. It's the one place the zone is in the text, since the reader compares entries far apart in time.",
          "Sorts by Date.parse(value), the moment itself, rather than by the text.",
        ]}
      />

      <Guidance title="A calendar date isn't a timestamp">
        <p>
          A due date, a birthday or the day an invoice was issued is a day, not a moment. The API
          sends it as a date alone, such as <code>2026-10-08</code>, and it&apos;s the same day in
          every time zone. Converting it to the reader&apos;s zone would show the day before for
          anyone west of UTC.
        </p>
        <p>
          So DateTime shows anything that isn&apos;t a full timestamp as given, without its popover.
          Format a calendar date in UTC, so it stays the day it was sent:
        </p>
        <CodeBlock
          code={`const day = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeZone: "UTC" });
day.format(new Date(invoice.issued)); // "2026-10-08" → Oct 8, 2026, everywhere`}
        />
      </Guidance>

      <Guidance title="Sending a time back">
        <p>
          A <code>TextField type=&quot;datetime-local&quot;</code> gives a time in the reader&apos;s
          zone with no zone on it. Turn it into UTC before it goes to the API:
        </p>
        <CodeBlock
          code={`new Date(localValue).toISOString(); // "2026-10-08T14:30" → "2026-10-08T19:30:00.000Z" in Chicago`}
        />
      </Guidance>
    </>
  );
}
