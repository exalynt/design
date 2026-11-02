import { useId, useState, type ReactNode } from "react";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SearchIcon from "@mui/icons-material/Search";

/*
 * What narrows a table, above it, as in the console's lists: a search, and the
 * filters (SearchSelects, usually) in a section under it that the Filters button
 * opens and closes. A badge on the button counts the filters in use, and a Clear
 * button sits beside it, greyed out until there are any, so a closed section
 * still says the table is narrowed and can undo it. `summary` sits at the top
 * right: how many rows there are. Sorting isn't here: a table sorts from its
 * headings.
 */
export function TableToolbar({
  search,
  onSearchChange,
  searchPlaceholder,
  filters,
  filtersInUse,
  onClearFilters,
  summary,
}: {
  /** Left out, there's no search box. */
  search?: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  /** The filters; left out, there's no Filters button. */
  filters?: ReactNode;
  filtersInUse: number;
  onClearFilters: () => void;
  summary?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const sectionId = useId();

  return (
    <>
      {/* A gap rather than spacing, whose margins would override the summary's ml: auto. */}
      <Stack
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.5, p: 2 }}
      >
        {search !== undefined ? (
          <TextField
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            sx={{ flex: "1 1 160px", maxWidth: 400 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="Clear search"
                      onClick={() => onSearchChange("")}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        ) : null}
        {filters ? (
          <Badge
            badgeContent={filtersInUse}
            color="primary"
            sx={{ flexShrink: 0, "& .MuiBadge-badge": { top: 2, right: 2 } }}
          >
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FilterListIcon />}
              endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              aria-label={filtersInUse > 0 ? `Filters, ${filtersInUse} in use` : "Filters"}
              aria-expanded={open}
              aria-controls={sectionId}
              onClick={() => setOpen(!open)}
            >
              Filters
            </Button>
          </Badge>
        ) : null}
        {filters ? (
          <Tooltip
            describeChild
            title={
              filtersInUse === 0
                ? "No active filters to clear"
                : filtersInUse === 1
                  ? "Clear the active filter"
                  : `Clear all ${filtersInUse} active filters`
            }
          >
            {/* A disabled button takes no hover, so this holds the tooltip for it. */}
            <Box component="span" sx={{ flexShrink: 0 }}>
              <Button
                variant="outlined"
                startIcon={<FilterListOffIcon />}
                disabled={filtersInUse === 0}
                aria-label="Clear filters"
                onClick={onClearFilters}
                /* Asked for outright, as a theme may make every outlined button neutral. */
                sx={{
                  "&:not(.Mui-disabled)": { color: "primary.main", borderColor: "primary.main" },
                }}
              >
                Clear
              </Button>
            </Box>
          </Tooltip>
        ) : null}
        <Box
          sx={{
            ml: "auto",
            display: { xs: "none", sm: "block" },
            color: "text.secondary",
            typography: "body2",
            whiteSpace: "nowrap",
          }}
        >
          {summary}
        </Box>
      </Stack>
      {filters ? (
        <Collapse in={open} id={sectionId}>
          <Stack
            direction="row"
            useFlexGap
            sx={{ flexWrap: "wrap", alignItems: "center", gap: 1.5, px: 2, pb: 2 }}
          >
            {filters}
          </Stack>
        </Collapse>
      ) : null}
    </>
  );
}
