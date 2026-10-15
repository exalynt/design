import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { invoiceColumns, invoices, type Invoice } from "../../docs/invoices";
import { useToast } from "../feedback/toast";
import { ListTable, type ListFilter } from "./ListTable";

const noun = { one: "invoice", other: "invoices" };

const filters: ListFilter<Invoice>[] = [
  { id: "status", label: "Status", value: (row) => row.status },
  { id: "client", label: "Client", value: (row) => row.client },
];

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
