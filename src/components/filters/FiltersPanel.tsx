import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useId, useState, type ReactNode } from "react";
import { filterOptions, highlight } from "../inputs/searchOptions";

export type FilterOption = {
  /** Identifies it in `value`. */
  id: string;
  label: string;
  /** How many it would match, quietly at the row's right. */
  count?: number;
};

export type FilterSection = {
  /** Its key in `value`. */
  id: string;
  /** Its heading, plural, as its search names it: "Search 13 features". */
  title: string;
  /** Shown before the heading, small, such as the icon the kind has elsewhere. */
  icon?: ReactNode;
  options: FilterOption[];
  /** `single` picks one with radios, `multiple` any number with checkboxes. Multiple by default. */
  select?: "single" | "multiple";
  /** A search box over its options, for a list too long to scan. */
  search?: boolean;
  /** How many options show before Show all. 5 by default. */
  limit?: number;
  /** Starts collapsed to its heading. */
  defaultCollapsed?: boolean;
};

/** What's picked in each section, by its id: none, one for `single`, any number for `multiple`. */
export type FiltersValue = Record<string, string[]>;

export type FiltersPanelProps = {
  sections: FilterSection[];
  value: FiltersValue;
  onChange: (value: FiltersValue) => void;
  /** Its heading. */
  title?: ReactNode;
  /** A line under the heading, such as how many it matches: "14 conversations". */
  summary?: ReactNode;
  /** Shows a close button in its header, such as when it's in a Drawer on a phone. */
  onClose?: () => void;
};

/* Out of sight but still read out. */
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;

function Section({
  section,
  picked,
  onPick,
}: {
  section: FilterSection;
  picked: string[];
  onPick: (ids: string[]) => void;
}) {
  const { title, icon, options, select = "multiple", search, limit = 5 } = section;
  const [open, setOpen] = useState(!section.defaultCollapsed);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const headingId = useId();
  const bodyId = useId();
  const name = useId();

  const matches = query ? filterOptions(options, { inputValue: query }) : options;
  /* What's picked always shows, in its place, so collapsing never hides a filter in use. */
  const shown =
    showAll || matches.length <= limit
      ? matches
      : matches.filter((option, index) => index < limit || picked.includes(option.id));
  const single = select === "single";
  const toggle = (id: string) => {
    if (single) onPick(picked.includes(id) ? [] : [id]);
    else onPick(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id]);
  };

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ px: 2, py: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mx: -1 }}>
        <Box
          component="h3"
          id={headingId}
          sx={{ m: 0, flex: 1, minWidth: 0, display: "flex", fontSize: 13.5, fontWeight: 700 }}
        >
          <ButtonBase
            aria-expanded={open}
            aria-controls={bodyId}
            onClick={() => setOpen(!open)}
            sx={{
              flex: 1,
              minWidth: 0,
              justifyContent: "flex-start",
              gap: 1,
              px: 1,
              py: 0.75,
              font: "inherit",
              borderRadius: 1,
              "&:hover": { bgcolor: "action.hover" },
              "&.Mui-focusVisible": { outline: 2, outlineColor: "primary.main", outlineOffset: -2 },
            }}
          >
            <ExpandMoreRoundedIcon
              aria-hidden
              sx={{
                fontSize: 18,
                color: "text.secondary",
                transform: open ? "none" : "rotate(-90deg)",
                transition: "transform 120ms",
              }}
            />
            {icon ? (
              <Box
                component="span"
                aria-hidden
                sx={{ display: "flex", color: "text.secondary", "& svg": { fontSize: 18 } }}
              >
                {icon}
              </Box>
            ) : null}
            <Box component="span" sx={{ color: "text.primary" }}>
              {title}
            </Box>
            {!open && picked.length ? (
              <Box component="span" sx={{ fontSize: 12.5, fontWeight: 600, color: "primary.main" }}>
                {picked.length}
                <Box component="span" sx={visuallyHidden}>
                  {" "}
                  picked
                </Box>
              </Box>
            ) : null}
          </ButtonBase>
        </Box>
        {picked.length ? (
          <Button
            size="small"
            onClick={() => onPick([])}
            aria-label={`Clear ${title}`}
            sx={{ flex: "none", minWidth: 0 }}
          >
            Clear
          </Button>
        ) : null}
      </Box>
      <Box id={bodyId} hidden={!open} sx={{ mt: 1 }}>
        {search ? (
          <TextField
            size="small"
            fullWidth
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${options.length} ${title.toLowerCase()}`}
            aria-label={`Search ${title.toLowerCase()}`}
            sx={{ mb: 1 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: query ? (
                  <InputAdornment position="end">
                    <IconButton size="small" aria-label="Clear search" onClick={() => setQuery("")}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        ) : null}
        {shown.length ? (
          <Box
            component="ul"
            role={single ? "radiogroup" : "group"}
            aria-labelledby={headingId}
            sx={{ m: 0, mx: -1, p: 0, listStyle: "none" }}
          >
            {shown.map((option) => {
              const checked = picked.includes(option.id);
              const Control = single ? Radio : Checkbox;
              return (
                <Box component="li" key={option.id}>
                  <Box
                    component="label"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      minHeight: { xs: 44, sm: 36 },
                      pr: 1,
                      borderRadius: 1,
                      cursor: "pointer",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    <Control
                      size="small"
                      checked={checked}
                      name={single ? name : undefined}
                      onChange={() => toggle(option.id)}
                      /* A picked radio changes nothing on a click, so its click unpicks it here. */
                      onClick={single && checked ? () => toggle(option.id) : undefined}
                      sx={{ flex: "none" }}
                    />
                    <Box
                      component="span"
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        fontSize: 14,
                        lineHeight: "20px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {highlight(option.label, query)}
                    </Box>
                    {option.count !== undefined ? (
                      <Box
                        component="span"
                        sx={{ flex: "none", fontSize: 12.5, color: "text.secondary" }}
                      >
                        {option.count}
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <Box sx={{ py: 1, fontSize: 13, color: "text.secondary" }}>
            No {title.toLowerCase()} match “{query}”
          </Box>
        )}
        {matches.length > limit ? (
          <Button
            size="small"
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
            sx={{ mt: 0.5, ml: -0.75, minWidth: 0 }}
          >
            {showAll ? "Show fewer" : `Show all ${matches.length}`}
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}

/*
 * What narrows a list, as a card for a side column beside it: its heading and
 * `summary`, then a section per entry in `sections`, each with a heading that
 * collapses it. A section picks one option with radios (`select: "single"`)
 * or any number with checkboxes, the default, and `search` puts a box over a
 * long list. Each shows its first `limit` options, plus any picked beyond them,
 * with Show all for the rest. Clear empties a section, and Clear all every one.
 * It holds no filter state: `value` is what's picked, by section id, and
 * `onChange` gets all of it back. Given a height, such as a sticky column's,
 * its sections scroll under its header.
 */
export function FiltersPanel({
  sections,
  value,
  onChange,
  title = "Filters",
  summary,
  onClose,
}: FiltersPanelProps) {
  const titleId = useId();
  const inUse = sections.some(({ id }) => value[id]?.length);
  return (
    <Card
      component="section"
      aria-labelledby={titleId}
      sx={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <FilterListIcon aria-hidden sx={{ mt: "3px", fontSize: 20, color: "text.secondary" }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            component="h2"
            id={titleId}
            sx={{ m: 0, typography: "subtitle1", fontWeight: 700, lineHeight: "26px" }}
          >
            {title}
          </Box>
          {summary ? (
            <Box sx={{ fontSize: 13, lineHeight: 1.5, color: "text.secondary" }}>{summary}</Box>
          ) : null}
        </Box>
        {inUse ? (
          <Button size="small" onClick={() => onChange({})} sx={{ flex: "none", mt: 0.25 }}>
            Clear all
          </Button>
        ) : null}
        {onClose ? (
          <IconButton aria-label="Close filters" onClick={onClose} sx={{ mr: -1, mt: -0.5 }}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </Box>
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          "& > section + section": { borderTop: 1, borderColor: "divider" },
        }}
      >
        {sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            picked={value[section.id] ?? []}
            onPick={(ids) => onChange({ ...value, [section.id]: ids })}
          />
        ))}
      </Box>
    </Card>
  );
}
