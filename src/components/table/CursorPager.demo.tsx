import { useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { invoiceColumns, invoices, type Invoice } from "../../docs/invoices";
import { SectionCard } from "../layout/SectionCard";
import { CursorPager } from "./CursorPager";
import { DataTable } from "./DataTable";

type InvoicePage = { items: Invoice[]; nextCursor: string | null };

/* A stand-in for the API: the rows after the cursor, and the cursor to the rows after those. */
function listInvoices(cursor: string | null, limit: number) {
  const start = cursor ? Number(atob(cursor)) : 0;
  const end = start + limit;
  return new Promise<InvoicePage>((resolve) =>
    setTimeout(
      () =>
        resolve({
          items: invoices.slice(start, end),
          nextCursor: end < invoices.length ? btoa(String(end)) : null,
        }),
      400,
    ),
  );
}

/* Also on the DataTable page and the Tables guideline, so cursor paging is found from either. */
export function CursorPagedInvoices() {
  const [pageSize, setPageSize] = useState(10);
  /* The cursor each page was fetched with, the first page's null first, so Previous can step back. */
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [fetched, setFetched] = useState<{ key: string; page: InvoicePage } | null>(null);
  const page = cursors.length - 1;
  const key = `${cursors[page]}:${pageSize}`;
  /* The last page stays up while the next one loads, so the table doesn't jump. */
  const loading = fetched?.key !== key;

  useEffect(() => {
    let current = true;
    listInvoices(cursors[page], pageSize).then((result) => {
      if (current) setFetched({ key, page: result });
    });
    return () => {
      current = false;
    };
  }, [cursors, page, pageSize, key]);

  const rows = fetched?.page.items ?? [];
  return (
    <SectionCard title="Invoices" disableContentPadding>
      <DataTable columns={invoiceColumns} rows={rows} rowKey={(row) => row.number} />
      <Divider />
      <CursorPager
        page={page}
        pageSize={pageSize}
        count={rows.length}
        hasNext={Boolean(fetched?.page.nextCursor)}
        loading={loading}
        onPrevious={() => setCursors((current) => current.slice(0, -1))}
        onNext={() => {
          const next = fetched?.page.nextCursor;
          if (next) setCursors((current) => [...current, next]);
        }}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCursors([null]);
        }}
        noun={{ one: "invoice", other: "invoices" }}
      />
    </SectionCard>
  );
}

export function CursorPagerDemo() {
  return (
    <>
      <Example title="Under a DataTable, paged by the server">
        <CursorPagedInvoices />
      </Example>
      <CodeBlock
        code={`// The cursor each page was fetched with; the first page's is null.
const [cursors, setCursors] = useState<(string | null)[]>([null]);
const page = cursors.length - 1;
// Fetch listInvoices({ cursor: cursors[page], limit: pageSize }) whenever they change.

<SectionCard title="Invoices" disableContentPadding>
  <DataTable columns={columns} rows={data.items} rowKey={(row) => row.id} />
  <Divider />
  <CursorPager
    page={page}
    pageSize={pageSize}
    count={data.items.length}
    hasNext={data.nextCursor !== null}
    loading={loading}
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
