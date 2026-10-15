import { useState, type ReactNode } from "react";
import Button from "@mui/material/Button";
import { Example } from "../../docs/Example";
import { ConfirmDialog, type ConfirmDialogProps } from "./ConfirmDialog";

/* Confirming disables the buttons while onConfirm runs. */
const confirmAfterAMoment = () =>
  new Promise<boolean>((resolve) => setTimeout(() => resolve(true), 800));

function Opener({
  label,
  ...props
}: { label: ReactNode } & Omit<ConfirmDialogProps, "open" | "onClose" | "onConfirm">) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <ConfirmDialog
        {...props}
        open={open}
        onConfirm={confirmAfterAMoment}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export function ConfirmDialogDemo() {
  return (
    <>
      <Example title="Destructive">
        <Opener label="Remove member" title="Remove Sam from the team?" confirmLabel="Remove">
          They lose access to every project in this organization straight away.
        </Opener>
      </Example>
      <Example title="Not destructive">
        <Opener
          label="Send estimate"
          title="Send the estimate?"
          confirmLabel="Send"
          confirmColor="primary"
        >
          The client gets an email with a link to review and approve it.
        </Opener>
      </Example>
    </>
  );
}
