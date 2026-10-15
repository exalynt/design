import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import { CodeBlock } from "../docs/CodeBlock";
import { Example } from "../docs/Example";
import { CapacityFigure } from "./CapacityFigure";
import { CapacityLine } from "./CapacityLine";

const calendar = <CalendarMonthOutlinedIcon sx={{ color: "text.secondary" }} />;

export function CapacityLineDemo() {
  return (
    <>
      <Example title="Every kind of line, on the figure's axis">
        <Stack sx={{ maxWidth: 280 }}>
          <Box sx={{ mb: 1 }}>
            <CapacityFigure units={2} />
          </Box>
          <CapacityLine
            icon={<WebAssetOutlinedIcon />}
            action
            menu
            onClick={() => {}}
            hint="Put it on a product so it can be scheduled."
          >
            Assign product
          </CapacityLine>
          <CapacityLine icon={<WebAssetOutlinedIcon />} menu onClick={() => {}}>
            Customer Portal
          </CapacityLine>
          <CapacityLine icon={<WebAssetOutlinedIcon sx={{ color: "text.disabled" }} />} muted>
            No product yet
          </CapacityLine>
          <CapacityLine
            icon={<CenterFocusStrongOutlinedIcon />}
            disabled
            hint="Assign a product first; a Focus comes from its board."
          >
            Choose a Focus
          </CapacityLine>
          <CapacityLine icon={calendar} action onClick={() => {}}>
            Schedule
          </CapacityLine>
          <CapacityLine icon={calendar}>Week of Oct 12</CapacityLine>
        </Stack>
      </Example>
      <CodeBlock
        code={`<CapacityBlock
  block={capacity.type}
  footer={
    capacity.week_starts_on ? (
      <CapacityLine icon={<CalendarMonthOutlinedIcon />}>{weekLabel(capacity.week_starts_on)}</CapacityLine>
    ) : (
      <CapacityLine
        icon={<CalendarMonthOutlinedIcon />}
        action
        disabled={!capacity.product_id}
        hint={capacity.product_id ? "Choose a week for it on the schedule." : "Assign a product first."}
        onClick={() => navigate(scheduleUrl(capacity))}
      >
        Schedule
      </CapacityLine>
    )
  }
>
  <CapacityPlacement product={product?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />
    </>
  );
}
