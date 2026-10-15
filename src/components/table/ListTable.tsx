import { useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { EmptyState } from "../data-display/EmptyState";
import { SectionCard } from "../layout/SectionCard";
import { DataTable, type Column, type DataTableProps, type TableSort } from "./DataTable";
import { SearchSelect, type SearchSelectOption } from "../inputs/SearchSelect";
import { TablePager } from "./TablePager";
import { TableToolbar } from "./TableToolbar";

/** A filter on one field of the rows: a row shows when its value is the one chosen. */
export type ListFilter<T> = {
  id: string;
  label: string;
  /** The row's value for this filter. */
  value: (row: T) => string;
  /** The choices, in order, each `id` being a value. Left out, they're every value in the rows, sorted. */
  options?: SearchSelectOption[];
};

export type ListTableProps<T> = Omit<DataTableProps<T>, "sort" | "onSort"> & {
  /** Names a row and rows, for the copy: "No invoices match", "42 invoices". */
  noun: { one: string; other: string };
  /** A heading for the card. */
  title?: ReactNode;
  /** Adds a search box that looks through every column's `value`. */
  search?: boolean;
  /** Adds a Filters button with these filters under it. */
  filters?: ListFilter<T>[];
  /** Splits the rows into pages. */
  pagination?: boolean;
  /** The page sizes offered; the first is the default. */
  pageSizes?: number[];
  /** The order before a heading is clicked. Left out, rows keep the order given. */
  defaultSort?: TableSort;
  /** Replaces the plain state shown when there are no rows at all, to invite adding the first. */
  emptyState?: ReactNode;
};

function compare(a: string | number, b: string | number) {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true });
}

/*
 * A whole table in a card, with each extra picked by a prop: `search`,
 * `filters`, `pagination`, and sorting from any column marked `sortable`.
 * Rows that open something take `onRowClick`. It searches, filters, sorts
 * and pages the rows it's given in memory, so it suits lists an app already
 * has in full. For rows paged by a server, drive DataTable from the server's
 * state instead.
 *
 * Changing the search, a filter, the sort or the page size goes back to the
 * first page.
 */
export function ListTable<T>({
  columns,
  rows,
  noun,
  title,
  search: searchable = false,
  filters: filterDefs = [],
  pagination = false,
  pageSizes = [10, 25, 50],
  defaultSort,
  emptyState,
  ...tableProps
}: ListTableProps<T>) {
  const [search, setSearch] = useState("");
  const [chosen, setChosen] = useState<Record<string, string | null>>({});
  const [sort, setSort] = useState<TableSort | null>(defaultSort ?? null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(pageSizes[0]);

  const query = search.trim().toLowerCase();
  const filtersInUse = filterDefs.filter((filter) => chosen[filter.id]).length;
  const narrowed = query !== "" || filtersInUse > 0;

  const matching = rows.filter(
    (row) =>
      filterDefs.every((filter) => !chosen[filter.id] || filter.value(row) === chosen[filter.id]) &&
      (query === "" ||
        columns.some((column) =>
          String(column.value?.(row) ?? "")
            .toLowerCase()
            .includes(query),
        )),
  );

  const sortColumn: Column<T> | undefined = columns.find((column) => column.id === sort?.column);
  const sorted =
    sort && sortColumn?.value
      ? [...matching].sort(
          (a, b) =>
            compare(sortColumn.value!(a), sortColumn.value!(b)) *
            (sort.direction === "asc" ? 1 : -1),
        )
      : matching;

  const shown = pagination ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;
  const plural = noun.other;

  /* Wraps a change that reorders or narrows the rows, so it starts from the first page. */
  function fromFirstPage<A extends unknown[]>(change: (...args: A) => void) {
    return (...args: A) => {
      change(...args);
      setPage(0);
    };
  }

  const toggleSort = fromFirstPage((column: string) =>
    setSort((current) =>
      current?.column === column
        ? { column, direction: current.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" },
    ),
  );
  const clearFilters = fromFirstPage(() => setChosen({}));
  const clear = fromFirstPage(() => {
    setSearch("");
    setChosen({});
  });

  const filters = filterDefs.length ? (
    <>
      {filterDefs.map((filter) => {
        const options =
          filter.options ??
          [...new Set(rows.map(filter.value))]
            .sort(compare)
            .map((value) => ({ id: value, label: value }));
        return (
          <Box key={filter.id} sx={{ width: { xs: "100%", sm: 220 } }}>
            <SearchSelect
              label={filter.label}
              options={options}
              value={options.find((option) => option.id === chosen[filter.id]) ?? null}
              onChange={fromFirstPage((option: SearchSelectOption | null) =>
                setChosen((current) => ({ ...current, [filter.id]: option?.id ?? null })),
              )}
            />
          </Box>
        );
      })}
    </>
  ) : undefined;

  function body() {
    if (rows.length === 0) {
      return emptyState ?? <EmptyState icon={InboxOutlinedIcon} title={`No ${plural} yet`} />;
    }
    if (matching.length === 0) {
      return (
        <EmptyState
          icon={SearchOffOutlinedIcon}
          title={`No ${plural} match`}
          description="Try another search, or clear the filters to see every one."
          action={<Button onClick={clear}>Clear search and filters</Button>}
        />
      );
    }
    return (
      <>
        <DataTable {...tableProps} columns={columns} rows={shown} sort={sort} onSort={toggleSort} />
        {pagination ? (
          <>
            <Divider />
            <TablePager
              page={page}
              pageSize={pageSize}
              pageSizes={pageSizes}
              total={sorted.length}
              noun={noun}
              onPageChange={setPage}
              onPageSizeChange={fromFirstPage(setPageSize)}
            />
          </>
        ) : null}
      </>
    );
  }

  const toolbar = searchable || filters;
  const count = (n: number) => `${n} ${n === 1 ? noun.one : plural}`;

  return (
    /* A plain block, so the card's height: 100% (meant for grid rows) sizes to the table. */
    <Box>
      <SectionCard title={title} disableContentPadding>
        {toolbar ? (
          <>
            <TableToolbar
              search={searchable ? search : undefined}
              onSearchChange={fromFirstPage(setSearch)}
              searchPlaceholder={`Search ${plural}`}
              filters={filters}
              filtersInUse={filtersInUse}
              onClearFilters={clearFilters}
              summary={
                rows.length === 0
                  ? null
                  : narrowed
                    ? `${matching.length} of ${count(rows.length)}`
                    : count(rows.length)
              }
            />
            <Divider />
          </>
        ) : null}
        {body()}
      </SectionCard>
    </Box>
  );
}
