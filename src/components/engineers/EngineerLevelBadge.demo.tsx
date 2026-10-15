import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { Example } from "../../docs/Example";
import { ENGINEER_LEVEL_IDS, type EngineerLevelId } from "./engineerLevel";
import { EngineerLevelBadge } from "./EngineerLevelBadge";
import { PageHeader } from "../layout/PageHeader";
import { SectionCard } from "../layout/SectionCard";

const ENGINEERS: { name: string; email: string; level: EngineerLevelId }[] = [
  { name: "Priya Shah", email: "priya@exalynt.com", level: "senior" },
  { name: "Marcus Webb", email: "marcus@exalynt.com", level: "associate" },
  { name: "Ana Ruiz", email: "ana@exalynt.com", level: "principal" },
  { name: "Sam Okafor", email: "sam@exalynt.com", level: "mid" },
];

export function EngineerLevelBadgeDemo() {
  return (
    <>
      <Example title="Each level">
        <Stack direction="row" spacing={1.5} useFlexGap sx={{ flexWrap: "wrap" }}>
          {ENGINEER_LEVEL_IDS.map((id) => (
            <EngineerLevelBadge key={id} level={id} />
          ))}
        </Stack>
      </Example>
      <Example title="Beside each engineer's name">
        <SectionCard title="Engineers" disableContentPadding>
          <List disablePadding>
            {ENGINEERS.map((engineer) => (
              <ListItem key={engineer.email} divider>
                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                      <Box component="span" sx={{ fontWeight: 600 }}>
                        {engineer.name}
                      </Box>
                      <EngineerLevelBadge level={engineer.level} />
                    </Stack>
                  }
                  secondary={engineer.email}
                />
              </ListItem>
            ))}
          </List>
        </SectionCard>
      </Example>
      <Example title="Beside an engineer's name as a page title">
        <PageHeader
          title="Priya Shah"
          description="priya@exalynt.com"
          badge={<EngineerLevelBadge level="senior" />}
        />
      </Example>
    </>
  );
}
