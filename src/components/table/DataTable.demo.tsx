import { useState } from "react";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { invoiceColumns, invoices, type Invoice } from "../../docs/invoices";
import { SectionCard } from "../layout/SectionCard";
import { CursorPagedInvoices } from "./CursorPager.demo";
import { DataTable, type TableSort } from "./DataTable";

const rows = invoices.slice(0, 6);

export function DataTableDemo() {
  const [opened, setOpened] = useState<Invoice | null>(null);
  const [sort, setSort] = useState<TableSort>({ column: "amount", direction: "desc" });
  const sorted = [...rows].sort(
    (a, b) => (a.amount - b.amount) * (sort.direction === "asc" ? 1 : -1),
  );

  return (
    <>
      <Example title="Striped, in a card">
        <SectionCard title="Recent invoices" disableContentPadding>
          <DataTable columns={invoiceColumns} rows={rows} rowKey={(row) => row.number} />
        </SectionCard>
      </Example>

      <Example title="Clickable rows (hover, or Tab and Enter)">
        <SectionCard title="Recent invoices" disableContentPadding>
          <DataTable
            columns={invoiceColumns}
            rows={rows}
            rowKey={(row) => row.number}
            onRowClick={setOpened}
          />
        </SectionCard>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
          {opened ? `Would open ${opened.number}` : "Click a row."}
        </Typography>
      </Example>

      {/* The caller holds the order and applies it, as a server-paged list would. */}
      <Example title="Sorted by the caller (only Amount sorts here)">
        <SectionCard disableContentPadding>
          <DataTable
            columns={invoiceColumns.map((column) => ({
              ...column,
              sortable: column.id === "amount",
            }))}
            rows={sorted}
            rowKey={(row) => row.number}
            sort={sort}
            onSort={() =>
              setSort((current) => ({
                column: "amount",
                direction: current.direction === "asc" ? "desc" : "asc",
              }))
            }
          />
        </SectionCard>
      </Example>
      <CodeBlock
        code={`<DataTable
  columns={columns}
  rows={page.items}            // already sorted by the server
  rowKey={(row) => row.id}
  sort={sort}
  onSort={(column) => setSort(nextSort(column))}
  striped={false}              // stripes are on by default
/>`}
      />

      <Example title="Paged by the server, by cursor (CursorPager)">
        <CursorPagedInvoices />
      </Example>
      <CodeBlock
        code={`<SectionCard title="Invoices" disableContentPadding>
  <DataTable columns={columns} rows={data.items} rowKey={(row) => row.id} />
  <Divider />
  <CursorPager
    page={page}                        // pages stepped forward from the first
    pageSize={pageSize}
    count={data.items.length}
    hasNext={data.nextCursor !== null}
    onPrevious={() => setCursors((c) => c.slice(0, -1))}
    onNext={() => setCursors((c) => [...c, data.nextCursor])}
    onPageSizeChange={(size) => { setPageSize(size); setCursors([null]); }}
    noun={{ one: "invoice", other: "invoices" }}
  />
</SectionCard>`}
      />
    </>
  );
}
