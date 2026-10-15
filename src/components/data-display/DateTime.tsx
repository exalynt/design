import Box from "@mui/material/Box";
import { DetailsCard, DetailsEyebrow, DetailsPopover } from "../DetailsPopover";

export type DateTimeProps = {
  /**
   * A point in time as the API sends it: an RFC 3339 timestamp in UTC, such
   * as `2026-10-08T19:30:00Z`. Anything else, a calendar date like
   * `2026-10-08` included, is shown as given, without the popover.
   */
  value: string;
  /**
   * Show the day without the time of day, where only the day matters to the
   * reader. The popover still gives the full time.
   */
  dateOnly?: boolean;
  /**
   * Let it take keyboard focus, so its popover opens from the keyboard.
   * Pass `false` inside a button or link, which already takes focus.
   */
  focusable?: boolean;
};

/* A full date and time with an offset. A date alone isn't a point in time, so it doesn't pass. */
const RFC_3339 = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

/* `undefined` locale and no `timeZone`: the browser's own settings, read once. */
const shortDate = new Intl.DateTimeFormat(undefined, { dateStyle: "medium" });
const shortDateTime = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

/* The popover's time and day, in the reader's zone (no `timeZone`) or in UTC. */
function zoneFormats(timeZone?: string) {
  return {
    time: new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", timeZone }),
    timeWithSeconds: new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZone,
    }),
    day: new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone,
    }),
  };
}
const local = zoneFormats();
const utc = zoneFormats("UTC");

/* "America/Argentina/Buenos_Aires" → "Buenos Aires". */
const readerPlace = (local.day.resolvedOptions().timeZone.split("/").pop() ?? "").replaceAll(
  "_",
  " ",
);

/* The reader's offset from UTC at that moment, so it follows daylight saving: "UTC−5", "UTC+5:30". */
function utcOffset(date: Date) {
  const minutes = -date.getTimezoneOffset();
  if (minutes === 0) return "UTC+0";
  const hours = Math.floor(Math.abs(minutes) / 60);
  const rest = Math.abs(minutes) % 60;
  return `UTC${minutes > 0 ? "+" : "\u2212"}${hours}${rest ? `:${String(rest).padStart(2, "0")}` : ""}`;
}

/* One side of the comparison: which zone on the left, the time and its day on the right. */
function Zone({
  label,
  detail,
  date,
  formats,
}: {
  label: string;
  detail: string;
  date: Date;
  formats: ReturnType<typeof zoneFormats>;
}) {
  /* Seconds only when there are some, so a round time reads cleanly. */
  const time = date.getUTCSeconds() ? formats.timeWithSeconds : formats.time;
  return (
    <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 2 }}>
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ fontWeight: 600 }}>{label}</Box>
        <Box sx={{ fontSize: "0.92em", color: "text.secondary" }}>{detail}</Box>
      </Box>
      <Box sx={{ textAlign: "right", whiteSpace: "nowrap" }}>
        <Box
          sx={{
            fontSize: "1.2em",
            fontWeight: 700,
            lineHeight: 1.3,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {time.format(date)}
        </Box>
        <Box sx={{ fontSize: "0.92em", color: "text.secondary" }}>{formats.day.format(date)}</Box>
      </Box>
    </Box>
  );
}

/*
 * A point in time from the server, in the reader's time zone and locale as
 * their browser has them. Hover, focus, or tap opens a popover setting it
 * side by side in their zone and in UTC, with the value as the server sent
 * it, so two people in different zones can agree on the moment.
 */
export function DateTime({ value, dateOnly = false, focusable = true }: DateTimeProps) {
  const date = new Date(value);
  if (!RFC_3339.test(value) || Number.isNaN(date.getTime())) return <>{value}</>;
  const divider = { mt: 1.25, pt: 1.25, borderTop: 1, borderColor: "divider" };
  return (
    <DetailsPopover
      title={
        <DetailsCard card>
          <DetailsEyebrow>Date and time</DetailsEyebrow>
          <Box sx={{ mt: 1 }}>
            <Zone
              label="Your time"
              detail={`${readerPlace} · ${utcOffset(date)}`}
              date={date}
              formats={local}
            />
          </Box>
          <Box sx={divider}>
            <Zone label="UTC" detail="Universal time" date={date} formats={utc} />
          </Box>
          <Box sx={[divider, { fontSize: "0.92em", color: "text.secondary" }]}>
            Sent as{" "}
            <Box
              component="code"
              sx={{ fontFamily: "monospace", color: "text.primary", overflowWrap: "anywhere" }}
            >
              {value}
            </Box>
          </Box>
        </DetailsCard>
      }
    >
      <Box
        component="time"
        dateTime={value}
        tabIndex={focusable ? 0 : undefined}
        sx={{
          whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
          textDecoration: "underline dotted",
          textDecorationThickness: "1px",
          textUnderlineOffset: "0.25em",
          borderRadius: "3px",
          cursor: "help",
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        }}
      >
        {(dateOnly ? shortDate : shortDateTime).format(date)}
      </Box>
    </DetailsPopover>
  );
}
