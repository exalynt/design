import Grid from "@mui/material/Grid";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import { Example } from "../../docs/Example";
import { StatCard } from "./StatCard";

export function StatCardDemo() {
  return (
    <>
      <Example title="Basic">
        <StatCard label="Hours available" value="38" hint="Of 80 bought this quarter" />
      </Example>
      <Example title="Accent, with an icon">
        <StatCard
          label="Hours available"
          value="38"
          hint="Of 80 bought this quarter"
          icon={BoltOutlinedIcon}
          accent
        />
      </Example>
      <Example title="A row">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              label="Hours available"
              value="38"
              hint="Of 80 bought"
              icon={BoltOutlinedIcon}
              accent
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              label="Scheduled"
              value="24"
              hint="Next two weeks"
              icon={ScheduleOutlinedIcon}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <StatCard
              label="Outstanding"
              value="$0"
              hint="Nothing due"
              icon={ReceiptLongOutlinedIcon}
            />
          </Grid>
        </Grid>
      </Example>
    </>
  );
}
