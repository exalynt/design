import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Example } from "../../docs/Example";
import { PageHeader } from "../layout/PageHeader";
import { STABILITY_LEVELS } from "./stability";
import { StabilityMark } from "./StabilityMark";

export function StabilityMarkDemo() {
  return (
    <>
      <Example title="Long, the default">
        <Stack direction="row" spacing={2.5} useFlexGap sx={{ flexWrap: "wrap" }}>
          {STABILITY_LEVELS.map((entry) => (
            <StabilityMark key={entry.id} level={entry.id} />
          ))}
        </Stack>
      </Example>
      <Example title="Short, long, and extra long">
        <Stack direction="row" spacing={2.5} useFlexGap sx={{ flexWrap: "wrap" }}>
          <StabilityMark level="beta" size="short" />
          <StabilityMark level="beta" />
          <StabilityMark level="beta" size="extra-long" />
        </Stack>
      </Example>
      <Example title="Beside a page title">
        <PageHeader
          title="Invoice export"
          description="Download every invoice in a date range as one file."
          badge={<StabilityMark level="beta" feature="Invoice export" size="extra-long" />}
        />
      </Example>
      <Example title="In running text and in a button">
        <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
          <Typography variant="body2">
            Scenario compare is at <StabilityMark level="alpha" feature="Scenario compare" />, so
            keep your spreadsheet as a fallback.
          </Typography>
          <Button variant="outlined">
            Compare scenarios{" "}
            <StabilityMark
              level="alpha"
              feature="Scenario compare"
              size="short"
              focusable={false}
            />
          </Button>
        </Stack>
      </Example>
    </>
  );
}
