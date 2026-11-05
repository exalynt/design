import { Fragment, useState, type KeyboardEvent, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import type { SxProps, Theme } from "@mui/material/styles";
import { DetailsCard, DetailsPopover } from "../DetailsPopover";

export type SortDirection = "asc" | "desc";

export type TableSort = { column: string; direction: SortDirection };

/** One column: its heading, its cells, and whether its heading sorts the table. */
export type Column<T> = {
  id: string;
  header: ReactNode;
  /** The cell's raw value: shown when there's no `render`, and what ListTable searches and sorts by. */
  value?: (row: T) => string | number;
  /** Draws the cell, for anything richer than the value as text. */
  render?: (row: T) => ReactNode;
  /** Lets the heading sort the table. */
  sortable?: boolean;
  align?: "left" | "right";
  /** Hides the column below this breakpoint: a secondary column a phone can do without. */
  hideBelow?: "sm" | "md";
  /**
   * Its width in pixels. Once any column has one, the table's columns are fixed:
   * they never move with what's in them, and those without a width share what's
   * left. Long content in them should be cut short, as Typography's `noWrap` does.
   */
  width?: number;
  /** Styles for this column's cells. */
  sx?: SxProps<Theme>;
};

export type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Makes every row interactive (to open it, say): it highlights on hover, takes focus, and Enter activates it. */
  onRowClick?: (row: T) => void;
  /** The current order, drawn on its column's heading. Applying it to `rows` is the caller's job. */
  sort?: TableSort | null;
  /** Called with a sortable column's id when its heading is clicked. */
  onSort?: (column: string) => void;
  /** Shades every other row so a wide row is easy to follow. On by default, except with `renderExpanded`. */
  striped?: boolean;
  /** Raises the theme's minimum width for a table with more columns than it fits. */
  minWidth?: number;
  /**
   * Makes rows collapsible: what slides open under a row, across the whole table,
   * with no padding of its own. A chevron at the row's end opens it, and so does
   * a click anywhere on the row, unless `onRowClick` has that.
   */
  renderExpanded?: (row: T) => ReactNode;
  /** The keys of the rows that start open, such as the one a link points to. */
  defaultExpanded?: string[];
  /** A preview of the row, in a popover on hover, until the row is open. Touch screens go without. */
  rowPreview?: (row: T) => ReactNode;
};

const TOGGLE_WIDTH = 56;

/*
 * Rows as a table, described by columns rather than written out cell by cell,
 * so every table shares one header, stripe and hover treatment. Sorting is drawn
 * from `sort` and reported through `onSort`, so the rows can come from anywhere,
 * a server included; the only state it holds is which rows are open. ListTable
 * wraps it with search, filters, sorting and pagination done in memory.
 *
 * It scrolls inside its own container when it's wider than the screen. A
 * column with `hideBelow` drops out on smaller screens instead, and while one
 * does, the table lets go of the theme's minimum width so what's left fits.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  onRowClick,
  sort,
  onSort,
  striped,
  minWidth,
  renderExpanded,
  defaultExpanded,
  rowPreview,
}: DataTableProps<T>) {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(() => new Set(defaultExpanded));
  const hides = columns.some((column) => column.hideBelow);
  const fixed = columns.some((column) => column.width !== undefined);
  const expandable = renderExpanded !== undefined;

  function hideSx(column: Column<T>, display: string) {
    return column.hideBelow ? { display: { xs: "none", [column.hideBelow]: display } } : {};
  }

  function cellSx(column: Column<T>): SxProps<Theme> {
    return [hideSx(column, "table-cell"), ...(Array.isArray(column.sx) ? column.sx : [column.sx])];
  }

  function onRowKeyDown(event: KeyboardEvent, row: T) {
    if (event.key === "Enter" && event.target === event.currentTarget) onRowClick?.(row);
  }

  function toggle(key: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function renderRow(row: T, last: boolean) {
    const key = rowKey(row);
    const open = expanded.has(key);
    const activate = onRowClick
      ? () => onRowClick(row)
      : expandable
        ? () => toggle(key)
        : undefined;

    const main = (
      <TableRow
        hover={activate !== undefined}
        tabIndex={onRowClick ? 0 : undefined}
        onClick={activate}
        onKeyDown={onRowClick ? (event) => onRowKeyDown(event, row) : undefined}
        /* Its closed details have no height, so the last row's border is this one's to drop. */
        sx={
          expandable && last && !open
            ? { "& > .MuiTableCell-root": { borderBottom: 0 } }
            : undefined
        }
      >
        {columns.map((column) => (
          <TableCell key={column.id} align={column.align} sx={cellSx(column)}>
            {column.render ? column.render(row) : column.value?.(row)}
          </TableCell>
        ))}
        {expandable ? (
          <TableCell align="right" sx={{ width: TOGGLE_WIDTH, px: 1 }}>
            <IconButton
              size="small"
              aria-expanded={open}
              aria-label={open ? "Hide details" : "Show details"}
              onClick={(event) => {
                event.stopPropagation();
                toggle(key);
              }}
              sx={{ p: 0.25 }}
            >
              <ExpandMoreRoundedIcon
                fontSize="small"
                sx={{
                  display: "block",
                  transform: open ? "rotate(180deg)" : "none",
                  transition: (theme) => theme.transitions.create("transform"),
                }}
              />
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
    );

    return (
      <Fragment key={key}>
        {rowPreview ? (
          <DetailsPopover
            hoverOnly
            title={open ? "" : <DetailsCard card>{rowPreview(row)}</DetailsCard>}
          >
            {main}
          </DetailsPopover>
        ) : (
          main
        )}
        {expandable ? (
          <TableRow>
            <TableCell
              colSpan={columns.length + 1}
              sx={{ p: 0, borderBottom: open ? undefined : 0 }}
            >
              <Collapse in={open} unmountOnExit>
                {renderExpanded(row)}
              </Collapse>
            </TableCell>
          </TableRow>
        ) : null}
      </Fragment>
    );
  }

  return (
    <TableContainer>
      <Table
        sx={(theme) => ({
          minWidth,
          ...(fixed && { tableLayout: "fixed" }),
          ...(hides && { [theme.breakpoints.down("sm")]: { minWidth: 0 } }),
        })}
      >
        {fixed ? (
          <colgroup>
            {columns.map((column) => (
              <Box
                key={column.id}
                component="col"
                sx={{ width: column.width, ...hideSx(column, "table-column") }}
              />
            ))}
            {expandable ? <col style={{ width: TOGGLE_WIDTH }} /> : null}
          </colgroup>
        ) : null}
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              const active = sort?.column === column.id;
              const direction = active ? sort.direction : "asc";
              return (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sortDirection={active ? direction : false}
                  sx={cellSx({ ...column, sx: undefined })}
                >
                  {column.sortable && onSort ? (
                    <TableSortLabel
                      active={active}
                      direction={direction}
                      onClick={() => onSort(column.id)}
                    >
                      {column.header}
                    </TableSortLabel>
                  ) : (
                    column.header
                  )}
                </TableCell>
              );
            })}
            {expandable ? <TableCell sx={{ width: TOGGLE_WIDTH }} /> : null}
          </TableRow>
        </TableHead>
        <TableBody sx={(theme) => bodySx(theme, striped ?? !expandable)}>
          {rows.map((row, index) => renderRow(row, index === rows.length - 1))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/*
 * Stripes are a faint wash of the text color, so they hold up in either mode
 * and under any theme. A row that does something gets a brand-tinted wash on
 * hover instead, a clear step up from a stripe, and a focus ring for the
 * keyboard. The last row drops its border, so a table in a card doesn't draw
 * a second line against the card's edge.
 */
function bodySx(theme: Theme, striped: boolean) {
  const { text, primary } = theme.vars.palette;
  return {
    ...(striped && {
      "& .MuiTableRow-root:nth-of-type(even)": {
        backgroundColor: `rgba(${text.primaryChannel} / 3%)`,
      },
    }),
    "& .MuiTableRow-root.MuiTableRow-hover": { cursor: "pointer" },
    "& .MuiTableRow-root.MuiTableRow-hover:hover": {
      backgroundColor: `rgba(${primary.mainChannel} / 8%)`,
    },
    "& .MuiTableRow-root.MuiTableRow-hover:focus-visible": {
      outline: `2px solid ${primary.main}`,
      outlineOffset: -2,
    },
    "& .MuiTableRow-root:last-of-type > .MuiTableCell-root": { borderBottom: 0 },
  };
}
