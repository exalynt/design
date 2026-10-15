import type { ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useToast, type Toaster } from "../../components";
import { TOAST_WIDTH, ToastCard } from "../../components/feedback/ToastCard";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { Rules } from "./Rules";

type Severity = keyof Toaster;

/* A toast as ToastProvider shows it, held in place on the page. */
function StaticToast({ severity, message }: { severity: Severity; message: string }) {
  return (
    <Box sx={{ width: TOAST_WIDTH, maxWidth: "100%" }}>
      <ToastCard severity={severity} message={message} onClose={() => {}} />
    </Box>
  );
}

/* Each severity in order of how often it's raised. */
const severities: { severity: Severity; title: string; body: ReactNode; examples: string[] }[] = [
  {
    severity: "success",
    title: "Success",
    body: (
      <>
        <p>
          Something the person asked for worked: saved, created, sent, invited, removed. Most toasts
          are this one, raised where the request finishes.
        </p>
        <ul>
          <li>Say what changed and name it, in the past tense or as its new state.</li>
        </ul>
        <p>
          <strong>Not for</strong> loading a page or opening something, which show themselves, or
          something that happened without them, which is info.
        </p>
      </>
    ),
    examples: [
      "Created Billing migration.",
      "Visa •••• 4242 is now your default payment method.",
      "Invited Dana Wu to the team.",
    ],
  },
  {
    severity: "error",
    title: "Error",
    body: (
      <>
        <p>
          A request they made failed, so nothing changed. Leave what they were doing on screen, a
          dialog and what they typed included, so they can try again.{" "}
          <a href="#ConfirmDialog">ConfirmDialog</a> stays open for this.
        </p>
        <ul>
          <li>Say what didn&apos;t happen, naming it, and what to do next.</li>
          <li>
            Show the API&apos;s message when it gives one, and a sentence like these when not.
          </li>
        </ul>
        <p>
          <strong>Not for</strong> a problem with what someone typed, which is the field&apos;s
          error (see <a href="#Forms">Forms</a>), or part of the page that couldn&apos;t load, which
          is an <code>Alert</code> that stays in the page.
        </p>
      </>
    ),
    examples: [
      "Could not remove Visa •••• 4242. Try again.",
      "Could not switch to Globex. Try again.",
      "This estimate has already been approved, so it can't be changed.",
    ],
  },
  {
    severity: "warning",
    title: "Warning",
    body: (
      <>
        <p>
          The request worked, with a catch they need to know about: part of it didn&apos;t happen,
          or it had an effect they might not expect. Rare, since most requests either work or
          don&apos;t.
        </p>
        <ul>
          <li>Say what worked first, then the catch and what to do about it.</li>
        </ul>
        <p>
          <strong>Not for</strong> a failure, which is an error, or a risk to point out before
          acting, which is <a href="#ConfirmDialog">ConfirmDialog</a>.
        </p>
      </>
    ),
    examples: [
      "Saved, but the client hasn't been emailed. Send it again from the invoice.",
      "Removed Sam Okafor. Their 3 open tasks are now unassigned.",
    ],
  },
  {
    severity: "info",
    title: "Info",
    body: (
      <>
        <p>
          Neutral news they&apos;ll want: a request that had nothing to do, or a change someone else
          made to what they&apos;re looking at. The rarest of the four: if it isn&apos;t worth
          interrupting them for, don&apos;t raise it.
        </p>
        <ul>
          <li>Say plainly what happened. There&apos;s nothing for them to fix.</li>
        </ul>
        <p>
          <strong>Not for</strong> something they did that worked, which is success, or anything
          they need to act on, which belongs in the page.
        </p>
      </>
    ),
    examples: [
      "Nothing to export: no invoices match these filters.",
      "Acme Corp approved estimate EST-0042.",
    ],
  },
];

function SeverityExamples({ severity, examples }: { severity: Severity; examples: string[] }) {
  const toast = useToast();
  return (
    <Stack spacing={1.5} sx={{ alignItems: "flex-start" }}>
      {examples.map((message) => (
        <StaticToast key={message} severity={severity} message={message} />
      ))}
      <Button variant="outlined" size="small" onClick={() => toast[severity](examples[0])}>
        Show it
      </Button>
    </Stack>
  );
}

export function ToastsGuideline() {
  return (
    <>
      <Guidance title="When to toast">
        <p>
          A toast tells someone how a request they made went, then gets out of the way. Raise one
          with <code>useToast()</code> under the app&apos;s{" "}
          <a href="#ToastProvider">ToastProvider</a>; pages and dialogs don&apos;t render their own
          success or failure banners. Pick its severity by how the request went, not by how much it
          matters.
        </p>
      </Guidance>

      <Example title="The four severities">
        <Stack spacing={1.5}>
          {severities.map(({ severity, examples }) => (
            <StaticToast key={severity} severity={severity} message={examples[0]} />
          ))}
        </Stack>
      </Example>

      {severities.map(({ severity, title, body, examples }) => (
        <Stack key={severity} spacing={2}>
          <Guidance title={title}>{body}</Guidance>
          <Example title={`${title} toasts`}>
            <SeverityExamples severity={severity} examples={examples} />
          </Example>
        </Stack>
      ))}

      <Guidance title="Not a toast">
        <ul>
          <li>
            <strong>A problem with what someone typed</strong>: the field&apos;s error, as{" "}
            <a href="#Forms">Forms</a> says.
          </li>
          <li>
            <strong>A choice to make before acting</strong>:{" "}
            <a href="#ConfirmDialog">ConfirmDialog</a>.
          </li>
          <li>
            <strong>Something true of the page for as long as it&apos;s open</strong>, such as a
            card that couldn&apos;t load or a setting that blocks the work: an <code>Alert</code> in
            the page, where it stays.
          </li>
          <li>
            <strong>Anything they need to act on later</strong>: a toast closes by itself and holds
            no buttons, so put the link or action in the page.
          </li>
        </ul>
      </Guidance>

      <Example title="An Alert that stays with the page">
        <Box sx={{ maxWidth: 560 }}>
          <Alert severity="error">
            Couldn&apos;t load this project&apos;s invoices. Reload the page to try again.
          </Alert>
        </Box>
      </Example>

      <Rules
        title="Every toast"
        items={[
          "Is one or two short sentences, ending with a full stop.",
          'Names the thing it\'s about: "Created Billing migration.", not "Project created."',
          "Is raised once per request, where the request finishes, not again by every component that sees the result.",
          'Covers a batch in one toast, not one per item: "Could not sync 6 invoices.", not six of "Could not sync INV-0101." Clear all is for when toasts pile up from separate requests.',
          "Never holds the only copy of something: a link, a reference number, or an error they'd need to report.",
        ]}
      />
    </>
  );
}
