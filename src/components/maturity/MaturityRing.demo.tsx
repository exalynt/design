import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Example } from "../../docs/Example";
import { featureMaturity } from "./maturity";
import { MaturityRing } from "./MaturityRing";
import type { StabilityLevelId } from "../stability/stability";
import { StabilityMark } from "../stability/StabilityMark";

type Capability = [string, StabilityLevelId | null];

/* A project's Features and their Capabilities, `null` for a draft. */
const FEATURES: [string, Capability[]][] = [
  [
    "Online Payments",
    [
      ["Card payments", "ga"],
      ["Refunds", "ga"],
      ["Saved cards", "beta"],
      ["Receipts", "beta"],
    ],
  ],
  [
    "Customer Scheduling",
    [
      ["Booking", "beta"],
      ["Rescheduling", "beta"],
      ["Cancelling", "alpha"],
    ],
  ],
  [
    "Reporting",
    [
      ["Monthly report", "alpha"],
      ["Exports", "prototype"],
    ],
  ],
  [
    "Automated Notifications",
    [
      ["Reminders", null],
      ["Follow-ups", null],
    ],
  ],
];

const maturityOf = (capabilities: Capability[]) =>
  featureMaturity(capabilities.map(([, level]) => level));

const row = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 };

/* Each Feature with a small ring, as a project's popover lists them. */
const projectBreakdown = (
  <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
    {FEATURES.map(([name, capabilities]) => {
      const progress = maturityOf(capabilities);
      return (
        <Box key={name} component="li" sx={[row, { py: 0.5 }]}>
          <span>{name}</span>
          {progress === null ? (
            <Box component="span" sx={{ color: "text.secondary" }}>
              Draft
            </Box>
          ) : (
            <MaturityRing
              progress={progress}
              subject="feature"
              label={name}
              size={20}
              link={false}
              focusable={false}
            />
          )}
        </Box>
      );
    })}
  </Box>
);

/* A Feature's Capabilities with their marks, as a Feature's popover lists them. */
function featureBreakdown(capabilities: Capability[]) {
  return (
    <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
      {capabilities.map(([name, level]) => (
        <Box key={name} component="li" sx={[row, { py: 0.5 }]}>
          <span>{name}</span>
          {level ? (
            <StabilityMark level={level} feature={name} link={false} focusable={false} />
          ) : (
            <Box component="span" sx={{ color: "text.secondary" }}>
              Draft
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export function MaturityRingDemo() {
  return (
    <>
      <Example title="A project, labelled, at the top of its page">
        <MaturityRing
          progress={48}
          subject="project"
          count={FEATURES.length}
          labelled
          breakdown={projectBreakdown}
        />
      </Example>
      <Example title="Features in a list, each with a small ring">
        <Stack spacing={1.5} sx={{ maxWidth: 420 }}>
          {FEATURES.slice(0, 3).map(([name, capabilities]) => (
            <Box key={name} sx={row}>
              <span>{name}</span>
              <MaturityRing
                progress={maturityOf(capabilities) ?? 0}
                subject="feature"
                count={capabilities.length}
                label={name}
                size={24}
                breakdown={featureBreakdown(capabilities)}
              />
            </Box>
          ))}
        </Stack>
      </Example>
      <Example title="One in each band (hover, focus, or tap one)">
        <Stack direction="row" spacing={3} useFlexGap sx={{ flexWrap: "wrap" }}>
          {[13, 43, 67, 80, 100].map((value) => (
            <MaturityRing key={value} progress={value} subject="project" />
          ))}
        </Stack>
      </Example>
      <Example title="Sizes: 24 in a list row, 40 and up with the percentage inside">
        <Stack
          direction="row"
          spacing={3}
          useFlexGap
          sx={{ flexWrap: "wrap", alignItems: "center" }}
        >
          <MaturityRing progress={67} subject="feature" size={24} />
          <MaturityRing progress={67} subject="feature" size={40} />
          <MaturityRing progress={67} subject="feature" />
          <MaturityRing progress={67} subject="feature" size={72} />
        </Stack>
      </Example>
    </>
  );
}
