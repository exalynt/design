import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Example } from "../../docs/Example";
import { CalloutPanel } from "./CalloutPanel";

export function CalloutPanelDemo() {
  return (
    <Example title="Basic">
      <CalloutPanel>
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography variant="h4">Running low on capacity</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "60ch" }}>
            You have 6 hours left this quarter. Buy another block to keep work moving without a
            pause.
          </Typography>
          <Button variant="contained">Buy capacity</Button>
        </Stack>
      </CalloutPanel>
    </Example>
  );
}
