import { useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { EarningDetails } from "./EarningDetails";
import type { Earning } from "./earnings";

export type EarningInfoProps = {
  earning: Earning;
};

/*
 * A "Why this amount?" link on an earning, opening EarningDetails in a modal: why it's
 * paid and how it's worked out, for wherever the earning itself keeps to its facts. The
 * modal fills the screen on a phone.
 */
export function EarningInfo({ earning }: EarningInfoProps) {
  const [open, setOpen] = useState(false);
  const phone = useMediaQuery(useTheme().breakpoints.down("sm"));
  return (
    <>
      <Link
        component="button"
        type="button"
        underline="hover"
        onClick={() => setOpen(true)}
        sx={{
          /* A bigger target than its text, without taking up any more room. */
          p: 0.5,
          m: -0.5,
          fontSize: 12.5,
          lineHeight: 1.4,
          whiteSpace: "nowrap",
        }}
      >
        Why this amount?
      </Link>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs" fullScreen={phone}>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, pr: 1.5 }}>
          <Box component="span" sx={{ flex: 1 }}>
            Why this amount
          </Box>
          <IconButton aria-label="Close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <EarningDetails earning={earning} card={false} />
        </DialogContent>
      </Dialog>
    </>
  );
}
