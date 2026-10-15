import { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { FocusCard } from "./FocusCard";

const AVERY = { name: "Avery Cole" };
const JORDAN = { name: "Jordan Park" };
const LENA = { name: "Lena Brooks" };

export function FocusCardDemo() {
  return (
    <>
      <Example title="On a board: in focus, with where things stand and who's on it this week; addressed, with why">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={1.5}>
              <Column>In focus</Column>
              <FocusCard
                title="Our dispatch process takes too long"
                href="#FocusCard"
                note="Back on it for peak season. Planning got down to under an hour in the summer, but with 40 trucks instead of 25 it's creeping back up."
                onIt={[AVERY, JORDAN]}
                features={1}
                capabilities={2}
                conversations={4}
                unread={1}
                at="2026-10-12T15:20:00Z"
              />
              <FocusCard
                title="Customers keep calling about their deliveries"
                href="#FocusCard"
                note="The morning-of text is on for 20 customers as a trial, and calls from them are down by more than half so far."
                onIt={[LENA]}
                features={1}
                capabilities={4}
                conversations={5}
                unread={2}
                mentionsYou
                at="2026-10-12T09:05:00Z"
              />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack spacing={1.5}>
              <Column>Addressed</Column>
              <FocusCard
                title="Finance needs the week's deliveries in a spreadsheet"
                href="#FocusCard"
                note="Finance is happy with it."
                noteLines={2}
                capabilities={1}
                at="2026-09-07T11:00:00Z"
                actions={<FocusMenu title="Finance needs the week's deliveries in a spreadsheet" />}
              />
            </Stack>
          </Grid>
        </Grid>
      </Example>
      <CodeBlock
        code={`<FocusCard
  title={focus.title}
  href={\`/board/\${focus.id}\`}
  note={focus.standing?.text}
  onIt={engineersThisWeek}
  features={focus.featureIds.length}
  capabilities={focus.capabilityIds.length}
  conversations={conversations.length}
  unread={unreadConversations.length}
  mentionsYou={unreadConversations.some((each) => each.mentionsYou)}
  at={lastActivityAt}
  grip
  actions={<FocusMenu focus={focus} />}
/>`}
      />

      <Example title="Draggable, with a menu doing the same moves (the grip hides on phones)">
        <Stack spacing={1.5} sx={{ maxWidth: 320 }}>
          <FocusCard
            title="Explore a better way to schedule deliveries"
            href="#FocusCard"
            capabilities={1}
            conversations={1}
            at="2026-10-06T13:00:00Z"
            grip
            actions={<FocusMenu title="Explore a better way to schedule deliveries" />}
          />
          <FocusCard
            title="Month-end export for our accountant"
            href="#FocusCard"
            conversations={1}
            at="2026-09-03T08:30:00Z"
            grip
            actions={<FocusMenu title="Month-end export for our accountant" />}
          />
        </Stack>
      </Example>

      <Example title="Just a title: nothing about it yet, read-only">
        <Stack sx={{ maxWidth: 320 }}>
          <FocusCard
            title="Drivers want to see tomorrow's route the night before"
            href="#FocusCard"
            at="2026-10-15T08:00:00Z"
          />
        </Stack>
      </Example>
    </>
  );
}

function Column({ children }: { children: string }) {
  return (
    <Typography variant="subtitle2" component="h3" sx={{ color: "text.secondary" }}>
      {children}
    </Typography>
  );
}

/* The app's menu: here, the moves a client can make on a Focus that isn't in focus. */
export function FocusMenu({ title }: { title: string }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <IconButton
        size="small"
        aria-label={`Actions for ${title}`}
        aria-haspopup="menu"
        onClick={(event) => setAnchor(event.currentTarget)}
        sx={{ color: "text.secondary" }}
      >
        <MoreHorizRoundedIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon>
            <ScheduleRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Move to Considering</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchor(null)}>
          <ListItemIcon>
            <ArchiveOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Move to Set aside…</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
