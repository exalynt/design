import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import type { ReactNode } from "react";
import { SearchOptionContent } from "./SearchOptionContent";
import { filterOptions, highlight, popperBelow, type SearchSelectOption } from "./searchOptions";

export type SearchMultiSelectProps = {
  label: string;
  options: SearchSelectOption[];
  /** The chosen options, in the order they were chosen. */
  value: SearchSelectOption[];
  onChange: (value: SearchSelectOption[]) => void;
  /** Shown only while nothing is chosen. */
  placeholder?: string;
  helperText?: ReactNode;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** Says the options are still being fetched, while `options` is empty. */
  loading?: boolean;
  noOptionsText?: ReactNode;
  /** Past this many chips, the rest are counted ("+3") until the field is focused. */
  limitChips?: number;
};

/**
 * Picks several options from a list long enough to want searching: people,
 * clients, projects. It searches like SearchSelect. The list stays open while
 * picking, each row has a checkbox saying whether it's chosen, and the chosen
 * options show as chips in the field. Backspace in an empty field removes the
 * last chip.
 */
export function SearchMultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  helperText,
  error,
  required,
  disabled,
  loading,
  noOptionsText = "Nothing matches",
  limitChips,
}: SearchMultiSelectProps) {
  const grouped = options.some((option) => option.group);
  return (
    <Autocomplete
      multiple
      options={options}
      value={value}
      onChange={(_, chosen) => onChange(chosen)}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      filterOptions={filterOptions}
      groupBy={grouped ? (option) => option.group ?? "" : undefined}
      disableCloseOnSelect
      autoHighlight
      limitTags={limitChips}
      getLimitTagsText={(more) => `+${more}`}
      disabled={disabled}
      loading={loading}
      noOptionsText={noOptionsText}
      slotProps={{ chip: { size: "small" }, popper: popperBelow }}
      renderOption={({ key, ...props }, option, state) => (
        <li key={key} {...props}>
          <Checkbox
            checked={state.selected}
            size="small"
            tabIndex={-1}
            disableRipple
            sx={{ p: 0, mr: 1.25 }}
            slotProps={{ input: { "aria-hidden": true } }}
          />
          <SearchOptionContent option={option} label={highlight(option.label, state.inputValue)} />
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={value.length ? undefined : placeholder}
          helperText={helperText}
          error={error}
          required={required}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              startAdornment: (
                <>
                  <InputAdornment position="start" sx={{ ml: 0.5, mr: 0 }}>
                    <SearchIcon sx={{ fontSize: 18 }} />
                  </InputAdornment>
                  {params.slotProps.input.startAdornment}
                </>
              ),
            },
            /* The browser would call the field empty with chips in it, as its
               text is; only ask it to check while nothing is chosen. */
            htmlInput: { ...params.slotProps.htmlInput, required: required && !value.length },
          }}
        />
      )}
    />
  );
}
