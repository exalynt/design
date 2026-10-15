import { useState, type ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  confirmColor?: "error" | "primary";
  /** Resolves true when it worked and the dialog should close. */
  onConfirm: () => Promise<boolean>;
  onClose: () => void;
};

/*
 * Asks before something that can't be taken back with a click: removing a
 * person, leaving an organization, deleting an email address. The dialog
 * stays open, its buttons disabled, while `onConfirm` runs; it closes itself
 * only when that succeeds, so a failure (already toasted by the caller with
 * useToast) leaves the choice in front of the user. `confirmColor` is for
 * asking before something that isn't destructive.
 */
export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  confirmColor = "error",
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  const [submitting, setSubmitting] = useState(false);

  async function confirm() {
    setSubmitting(true);
    const done = await onConfirm();
    setSubmitting(false);
    if (done) onClose();
  }

  return (
    <Dialog open={open} onClose={submitting ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="body2" component="div" sx={{ color: "text.secondary", pt: 1 }}>
          {children}
        </Typography>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button variant="contained" color={confirmColor} onClick={confirm} disabled={submitting}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
