import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { CapabilityCard } from "./CapabilityCard";

const menu = (
  <IconButton size="small" aria-label="More for this Capability" sx={{ p: 0.25 }}>
    <MoreHorizRoundedIcon sx={{ fontSize: 18 }} />
  </IconButton>
);

export function CapabilityCardDemo() {
  return (
    <>
      <Example title="In no Feature, on a canvas: draggable, at each stability or a draft (hover a mark)">
        <Stack spacing={1} sx={{ maxWidth: 340 }}>
          <CapabilityCard name="Plan a driver's route" level="beta" grip actions={menu} />
          <CapabilityCard name="Print a delivery slip" level="ga" grip actions={menu} />
          <CapabilityCard name="Track a truck on a map" level="prototype" grip actions={menu} />
          <CapabilityCard
            name="Text customers their delivery window and let them pick another"
            level={null}
            grip
            actions={menu}
          />
        </Stack>
      </Example>
      <Example title="Read-only, or opening it on a click">
        <Stack spacing={1} sx={{ maxWidth: 340 }}>
          <CapabilityCard name="Plan a driver's route" level="beta" />
          <CapabilityCard name="Sign for a delivery" level="alpha" onClick={() => {}} />
        </Stack>
      </Example>
      <CodeBlock
        code={`<CapabilityCard name={capability.text} level={capability.level} grip actions={<CapabilityMenu capability={capability} />} />`}
      />
    </>
  );
}
