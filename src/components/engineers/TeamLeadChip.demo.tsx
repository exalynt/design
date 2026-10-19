import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { Example } from "../../docs/Example";
import { EngineerLevelBadge } from "./EngineerLevelBadge";
import { TeamLeadChip } from "./TeamLeadChip";
import { PageHeader } from "../layout/PageHeader";
import { SectionCard } from "../layout/SectionCard";

const ENGINEERS = [
  { name: "Ana Ruiz", email: "ana@exalynt.com", level: "principal", lead: true },
  { name: "Priya Shah", email: "priya@exalynt.com", level: "senior", lead: false },
  { name: "Marcus Webb", email: "marcus@exalynt.com", level: "associate", lead: false },
] as const;

export function TeamLeadChipDemo() {
  return (
    <>
      <Example title="On its own">
        <TeamLeadChip />
      </Example>
      <Example title="Beside a lead's name, after their level">
        <SectionCard title="Engineering Team" disableContentPadding>
          <List disablePadding>
            {ENGINEERS.map((engineer) => (
              <ListItem key={engineer.email} divider>
                <ListItemText
                  primary={
                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      sx={{ alignItems: "center", flexWrap: "wrap" }}
                    >
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {engineer.name}
                      </Box>
                      <EngineerLevelBadge level={engineer.level} />
                      {engineer.lead ? <TeamLeadChip /> : null}
                    </Stack>
                  }
                  secondary={engineer.email}
                />
              </ListItem>
            ))}
          </List>
        </SectionCard>
      </Example>
      <Example title="Beside a lead's name as a page title">
        <PageHeader title="Ana Ruiz" description="ana@exalynt.com" badge={<TeamLeadChip />} />
      </Example>
    </>
  );
}
