import { useState, type ReactNode } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";

/* How the value is kept: a calendar date, as the API and the URL take one. */
const DATE_FORMAT = "YYYY-MM-DD";

export type DatePickerFieldProps = {
  label: string;
  /** The date as YYYY-MM-DD, or null for none. */
  value: string | null;
  /** Called with a whole date as YYYY-MM-DD, or null when it's cleared; never with half of one. */
  onChange: (value: string | null) => void;
  /** The earliest date on offer, as YYYY-MM-DD. */
  min?: string | null;
  /** The latest date on offer, as YYYY-MM-DD. */
  max?: string | null;
  helperText?: ReactNode;
  error?: boolean;
  /** Also leaves out its clear button. */
  required?: boolean;
  disabled?: boolean;
};

/**
 * Picks one calendar date, typed or from a calendar: MUI's DatePicker, kept
 * quiet and taking dates as the strings an app holds them in, so it brings no
 * date library into the code using it, and no LocalizationProvider to set up.
 * What's being typed is held here until it's a whole date. Every month shows
 * the same six weeks, so paging through them moves nothing.
 */
export function DatePickerField({
  label,
  value,
  onChange,
  min,
  max,
  helperText,
  error,
  required = false,
  disabled,
}: DatePickerFieldProps) {
  const [draft, setDraft] = useState<Dayjs | null>(value ? dayjs(value) : null);
  /* The value as last seen, to take up a change made elsewhere, such as clearing filters. */
  const [seen, setSeen] = useState(value);
  if (value !== seen) {
    setSeen(value);
    const drafted = draft?.isValid() ? draft.format(DATE_FORMAT) : null;
    if (drafted !== value) setDraft(value ? dayjs(value) : null);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={draft}
        disabled={disabled}
        minDate={min ? dayjs(min) : undefined}
        maxDate={max ? dayjs(max) : undefined}
        onChange={(next) => {
          setDraft(next);
          if (!next) onChange(null);
          else if (next.isValid()) onChange(next.format(DATE_FORMAT));
        }}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        sx={{ width: "100%" }}
        slots={{ openPickerIcon: CalendarMonthOutlinedIcon }}
        slotProps={{
          field: { clearable: !required },
          textField: {
            helperText,
            error,
            required,
            slotProps: { inputLabel: { shrink: true } },
          },
          openPickerButton: { size: "small", sx: { color: "text.secondary" } },
          openPickerIcon: { sx: { fontSize: 18 } },
          clearButton: { size: "small", sx: { color: "text.secondary" } },
          clearIcon: { sx: { fontSize: 16 } },
        }}
      />
    </LocalizationProvider>
  );
}
