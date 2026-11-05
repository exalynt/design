import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { invoiceColumns, invoices, type Invoice } from "../../docs/invoices";
import { formatMoney } from "../data-display/money";
import { useToast } from "../feedback/toast";
import { ListTable, type ListFilter } from "./ListTable";

const noun = { one: "invoice", other: "invoices" };

const filters: ListFilter<Invoice>[] = [
  { id: "status", label: "Status", value: (row) => row.status },
  { id: "client", label: "Client", value: (row) => row.client },
];

/* What an invoice bills for, made up from it, as a row holding several of something. */
function invoiceLines(invoice: Invoice) {
  const second = Number(invoice.number.slice(-1)) % 2 === 0 ? "Hosting" : "Support";
  const hosted = Math.round(invoice.amount * 0.2);
  return [
    { label: "Engineering", amount: invoice.amount - hosted },
    { label: second, amount: hosted },
  ];
}

const lineFilters: ListFilter<Invoice>[] = [
  { id: "line", label: "Billed for", value: (row) => invoiceLines(row).map((line) => line.label) },
];

function InvoiceLines({ invoice, padded = false }: { invoice: Invoice; padded?: boolean }) {
  return (
    <Stack spacing={padded ? 1 : 0.5} sx={padded ? { px: 2, py: 1.5 } : undefined}>
      {invoiceLines(invoice).map((line) => (
        <Stack key={line.label} direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
          <Typography variant="body2">{line.label}</Typography>
          <Box component="span" sx={{ fontVariantNumeric: "tabular-nums" }}>
            {formatMoney(line.amount)}
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

export function ListTableDemo() {
  const toast = useToast();
  return (
    <>
      <Example title="Everything: search, filters, sorting, pagination, clickable rows">
        <ListTable
          title="Invoices"
          columns={invoiceColumns}
          rows={invoices}
          rowKey={(row) => row.number}
          noun={noun}
          search
          filters={filters}
          pagination
          defaultSort={{ column: "issued", direction: "desc" }}
          onRowClick={(row) => toast.info(`Would open ${row.number}.`)}
        />
      </Example>
      <CodeBlock
        code={`<ListTable
  title="Invoices"
  columns={columns}            // mark a column sortable: true to sort from its heading
  rows={invoices}
  rowKey={(row) => row.number}
  noun={{ one: "invoice", other: "invoices" }}
  search                       // looks through every column's value
  filters={[{ id: "status", label: "Status", value: (row) => row.status }]}
  pagination
  onRowClick={(row) => navigate(\`/invoices/\${row.number}\`)}
/>`}
      />

      <Example title="Between two dates">
        <ListTable
          columns={invoiceColumns}
          rows={invoices}
          rowKey={(row) => row.number}
          noun={noun}
          dateRange={{ value: (row) => row.issued }}
          filters={filters}
          pagination
          defaultSort={{ column: "issued", direction: "desc" }}
        />
      </Example>
      <CodeBlock
        code={`<ListTable
  // ...
  // Each date is optional and includes its own day: with only a start, it's
  // everything from then on; with only an end, everything up to it.
  dateRange={{ value: (row) => row.issued }}
  // To open on a range, such as this month, give it one. Clear empties it.
  // dateRange={{ value: (row) => row.issued, defaultStart: "2026-11-01", defaultEnd: "2026-11-30" }}
/>`}
      />

      <Example title="Totals of what matches">
        <ListTable
          columns={invoiceColumns}
          rows={invoices}
          rowKey={(row) => row.number}
          noun={noun}
          search
          filters={filters}
          pagination
          renderSummary={(matching, { chosen, choose }) => (
            <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1, px: 2, py: 1.5 }}>
              {[...new Set(matching.map((row) => row.status))].map((status) => (
                <Button
                  key={status}
                  size="small"
                  variant={chosen("status") === status ? "contained" : "outlined"}
                  onClick={() => choose("status", chosen("status") === status ? null : status)}
                >
                  {status}:{" "}
                  {formatMoney(
                    matching
                      .filter((row) => row.status === status)
                      .reduce((total, row) => total + row.amount, 0),
                  )}
                </Button>
              ))}
            </Stack>
          )}
        />
      </Example>
      <CodeBlock
        code={`<ListTable
  // ...
  // Every page of the rows that match, between the toolbar and the table. It
  // can read and set the filters, so clicking a total narrows the table to it.
  renderSummary={(matching, { chosen, choose }) => <Totals rows={matching} />}
/>`}
      />

      <Example title="Collapsible rows, with a preview on hover, and fixed columns">
        <ListTable
          columns={invoiceColumns.map((column) => ({
            ...column,
            width: column.id === "project" ? undefined : 150,
          }))}
          rows={invoices}
          rowKey={(row) => row.number}
          noun={noun}
          search
          searchText={(row) =>
            invoiceLines(row)
              .map((line) => line.label)
              .join(" ")
          }
          filters={lineFilters}
          pagination
          minWidth={840}
          rowPreview={(row) => <InvoiceLines invoice={row} />}
          renderExpanded={(row) => <InvoiceLines invoice={row} padded />}
        />
      </Example>
      <CodeBlock
        code={`<ListTable
  // ...
  columns={columns}            // give a column a width to fix them all in place
  renderExpanded={(row) => <InvoiceLines invoice={row} />}   // slides open under the row
  rowPreview={(row) => <InvoiceLines invoice={row} />}       // on hover, until it's open
  defaultExpanded={[linkedNumber]}  // rows open from the start, such as one a link points to
  // A filter's value can be several, and a row shows when any of them is chosen.
  filters={[{ id: "line", label: "Billed for", value: (row) => row.lines.map((l) => l.label) }]}
  // More to search than the columns show.
  searchText={(row) => row.lines.map((l) => l.label).join(" ")}
/>`}
      />

      <Example title="Search only">
        <ListTable
          columns={invoiceColumns}
          rows={invoices.slice(0, 8)}
          rowKey={(row) => row.number}
          noun={noun}
          search
        />
      </Example>

      <Example title="Filters and pagination, no search">
        <ListTable
          columns={invoiceColumns}
          rows={invoices}
          rowKey={(row) => row.number}
          noun={noun}
          filters={filters}
          pagination
          pageSizes={[5, 10]}
        />
      </Example>

      <Example title="Nothing yet">
        <ListTable
          columns={invoiceColumns}
          rows={[]}
          rowKey={(row) => row.number}
          noun={noun}
          search
        />
      </Example>
    </>
  );
}
