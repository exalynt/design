import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { useToast, type Toaster } from "./toast";

const stacked: [keyof Toaster, string][] = [
  ["success", "Removed Sam Okafor from the team."],
  ["success", "Invited Dana Wu to the team."],
  ["warning", "Dana Wu's invitation email bounced. Check the address and send it again."],
];

const many = [
  "Could not sync INV-0101. Try again.",
  "Could not sync INV-0102. Try again.",
  "Could not sync INV-0103. Try again.",
  "Could not sync INV-0104. Try again.",
  "Could not sync INV-0105. Try again.",
  "Could not sync INV-0106. Try again.",
];

/* The page itself sits under a ToastProvider (see App), as an app does. */
export function ToastProviderDemo() {
  const toast = useToast();
  return (
    <>
      <Example title="Each severity">
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          <Button variant="outlined" onClick={() => toast.success("Created Billing migration.")}>
            Success
          </Button>
          <Button
            variant="outlined"
            onClick={() => toast.info("Acme Corp's estimate was approved while you were away.")}
          >
            Info
          </Button>
          <Button
            variant="outlined"
            onClick={() =>
              toast.warning(
                "Saved, but the client hasn't been emailed. Send it again from the invoice.",
              )
            }
          >
            Warning
          </Button>
          <Button
            variant="outlined"
            onClick={() => toast.error("Could not remove Visa •••• 4242. Try again.")}
          >
            Error
          </Button>
        </Stack>
      </Example>

      <Example title="Several stack; hover the stack to spread it out">
        <Button
          variant="outlined"
          onClick={() =>
            stacked.forEach(([severity, message], i) =>
              setTimeout(() => toast[severity](message), i * 250),
            )
          }
        >
          Raise three
        </Button>
      </Example>

      <Example title="More than three: hover, then scroll, swipe or use the arrows to move through them">
        <Button
          variant="outlined"
          onClick={() =>
            many.forEach((message, i) => setTimeout(() => toast.error(message), i * 150))
          }
        >
          Raise six
        </Button>
      </Example>

      <CodeBlock
        code={`// Once, around the app, inside the ThemeProvider.
<ThemeProvider theme={theme}>
  <ToastProvider>
    <App />
  </ToastProvider>
</ThemeProvider>

// Wherever a request finishes.
const toast = useToast();
try {
  await removePaymentMethod(method.id);
  toast.success(\`Removed \${paymentMethodLabel(method)}.\`);
} catch (err) {
  toast.error(err instanceof Error ? err.message : "Could not remove the payment method. Try again.");
}`}
      />
    </>
  );
}
