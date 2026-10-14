import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import type { ReactNode } from "react";
import { SearchOptionContent } from "./SearchOptionContent";
import { filterOptions, highlight, popperBelow, type SearchSelectOption } from "./searchOptions";

export type { SearchSelectOption };

export type SearchSelectProps = {
  label: string;
  options: SearchSelectOption[];
  value: SearchSelectOption | null;
  onChange: (value: SearchSelectOption | null) => void;
  placeholder?: string;
  helperText?: ReactNode;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
  /** Says the options are still being fetched, while `options` is empty. */
  loading?: boolean;
  noOptionsText?: ReactNode;
};

/**
 * Picks one option from a list long enough to want searching: people, clients,
 * projects. Typing filters on every word, matches are bolded, and Enter takes
 * the top match.
 */
export function SearchSelect({
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
}: SearchSelectProps) {
  const grouped = options.some((option) => option.group);
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(_, option) => onChange(option)}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selected) => option.id === selected.id}
      filterOptions={filterOptions}
      groupBy={grouped ? (option) => option.group ?? "" : undefined}
      autoHighlight
      disabled={disabled}
      loading={loading}
      noOptionsText={noOptionsText}
      slotProps={{ popper: popperBelow }}
      renderOption={({ key, ...props }, option, state) => (
        <li key={key} {...props}>
          <SearchOptionContent
            option={option}
            label={
              /* Reopening on a chosen value shows the whole list; don't bold its label in every row. */
              state.inputValue === value?.label
                ? option.label
                : highlight(option.label, state.inputValue)
            }
          />
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          helperText={helperText}
          error={error}
          required={required}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              startAdornment: (
                <InputAdornment position="start" sx={{ ml: 0.5, mr: 0 }}>
                  <SearchIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
}
