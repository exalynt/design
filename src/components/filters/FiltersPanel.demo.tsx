import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { FiltersPanel, type FilterSection, type FiltersValue } from "./FiltersPanel";

type Conversation = {
  id: string;
  subject: string;
  status: "open" | "closed";
  focus: string[];
  feature: string[];
  capability: string[];
  people: string[];
};

/* A made-up client's conversations, each tagged with what it's about and who's in it. */
const CONVERSATIONS: Conversation[] = [
  [
    "Tracking page stuck on In transit",
    "open",
    ["Carriers miss status updates"],
    ["Carrier webhook retries drop events"],
    ["Email on status change"],
    ["Avery Chen", "Dana Whitfield"],
  ],
  [
    "Webhook retries after a carrier outage",
    "closed",
    ["Carriers miss status updates"],
    ["Carrier webhook retries drop events"],
    [],
    ["Dana Whitfield", "Jordan Lee"],
  ],
  [
    "Gift card balance after a refund",
    "open",
    ["People give up at checkout"],
    ["Gift cards"],
    [],
    ["Avery Chen", "Priya Shah"],
  ],
  [
    "Gift cards in the holiday promo",
    "open",
    ["Ready for the holiday rush"],
    ["Gift cards"],
    [],
    ["Sam Okafor", "Dana Whitfield"],
  ],
  [
    "Bundles total wrong in the cart",
    "open",
    ["People give up at checkout"],
    ["Cart total wrong for bundles"],
    [],
    ["Priya Shah"],
  ],
  [
    "Booking emails show UTC",
    "closed",
    [],
    ["Booking confirmation shows UTC times"],
    ["Booking confirmation email"],
    ["Jordan Lee", "Avery Chen"],
  ],
  [
    "Quote vs invoice for October",
    "open",
    ["Invoices don't match quotes"],
    [],
    ["Compare quotes side by side"],
    ["Morgan Diaz", "Dana Whitfield"],
  ],
  [
    "Booking a shipment from the quote",
    "open",
    [],
    ["Book a shipment"],
    ["Compare quotes side by side"],
    ["Riley Brooks"],
  ],
  [
    "Filter quotes by transit time",
    "open",
    [],
    [],
    ["Filter by transit time"],
    ["Riley Brooks", "Sam Okafor"],
  ],
  ["Churn report by plan", "closed", [], [], ["Churn by plan"], ["Morgan Diaz"]],
  [
    "Load testing before the rush",
    "open",
    ["Ready for the holiday rush"],
    [],
    [],
    ["Jordan Lee", "Taylor Kim"],
  ],
  [
    "Status emails go to spam",
    "open",
    [],
    [],
    ["Email on status change"],
    ["Taylor Kim", "Dana Whitfield"],
  ],
  ["Address book for repeat shipments", "open", [], ["Saved addresses"], [], ["Casey Nguyen"]],
  [
    "Label printing on Zebra printers",
    "closed",
    [],
    ["Print labels"],
    [],
    ["Casey Nguyen", "Alex Romero"],
  ],
].map(([subject, status, focus, feature, capability, people], index) => ({
  id: `cnv_${index}`,
  subject,
  status,
  focus,
  feature,
  capability,
  people,
})) as Conversation[];

type Key = "focus" | "feature" | "capability" | "people";

/* Each distinct value of `key`, most conversations first, counted. */
function optionsOf(key: Key) {
  const counts = new Map<string, number>();
  for (const conversation of CONVERSATIONS)
    for (const name of conversation[key]) counts.set(name, (counts.get(name) ?? 0) + 1);
  return [...counts]
    .sort(([a, x], [b, y]) => y - x || a.localeCompare(b))
    .map(([name, count]) => ({ id: name, label: name, count }));
}

const SECTIONS: FilterSection[] = [
  {
    id: "status",
    title: "Status",
    select: "single",
    options: [
      { id: "open", label: "Open", count: CONVERSATIONS.filter((c) => c.status === "open").length },
      {
        id: "closed",
        label: "Closed",
        count: CONVERSATIONS.filter((c) => c.status === "closed").length,
      },
    ],
  },
  {
    id: "focus",
    title: "Focuses",
    icon: <CenterFocusStrongOutlinedIcon />,
    options: optionsOf("focus"),
  },
  {
    id: "feature",
    title: "Features",
    icon: <WidgetsOutlinedIcon />,
    search: true,
    options: optionsOf("feature"),
  },
  {
    id: "capability",
    title: "Capabilities",
    icon: <BoltOutlinedIcon />,
    search: true,
    options: optionsOf("capability"),
  },
  {
    id: "people",
    title: "People",
    icon: <PeopleOutlineOutlinedIcon />,
    search: true,
    defaultCollapsed: true,
    options: optionsOf("people"),
  },
];

/* Any of a section's picks, and every section picked from. */
function matches(conversation: Conversation, value: FiltersValue) {
  return Object.entries(value).every(([section, picked]) => {
    if (!picked.length) return true;
    if (section === "status") return picked.includes(conversation.status);
    return conversation[section as Key].some((name) => picked.includes(name));
  });
}

const plural = (count: number) => `${count} conversation${count === 1 ? "" : "s"}`;

/*
 * A list beside its filters: a sticky column of its own height from md, its
 * sections scrolling under its header, and a Drawer behind a Filters button
 * on a phone.
 */
function Conversations() {
  const [value, setValue] = useState<FiltersValue>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const shown = CONVERSATIONS.filter((conversation) => matches(conversation, value));
  const inUse = Object.values(value).reduce((sum, picked) => sum + picked.length, 0);
  const panel = (onClose?: () => void) => (
    <FiltersPanel
      sections={SECTIONS}
      value={value}
      onChange={setValue}
      summary={plural(shown.length)}
      onClose={onClose}
    />
  );
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
      <Box sx={{ display: { xs: "none", md: "block" }, flex: "none", width: 300, height: 560 }}>
        {panel()}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Button
          variant="outlined"
          color={inUse ? "primary" : "inherit"}
          startIcon={<FilterListIcon />}
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { md: "none" }, mb: 1.5 }}
        >
          {inUse ? `Filters · ${inUse}` : "Filters"}
        </Button>
        <Card variant="outlined">
          {shown.length ? (
            shown.map((conversation, index) => (
              <Box key={conversation.id}>
                {index ? <Divider /> : null}
                <Box sx={{ px: 2, py: 1.25 }}>
                  <Box sx={{ fontSize: 14, fontWeight: 600 }}>{conversation.subject}</Box>
                  <Box sx={{ fontSize: 12.5, color: "text.secondary" }}>
                    {conversation.status === "open" ? "Open" : "Closed"} ·{" "}
                    {conversation.people.join(", ")}
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Box sx={{ p: 3, textAlign: "center", fontSize: 14, color: "text.secondary" }}>
              No conversations match these filters
            </Box>
          )}
        </Card>
      </Box>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 320, maxWidth: "calc(100vw - 32px)" } } }}
      >
        <Box sx={{ height: "100%", "& > .MuiCard-root": { height: "100%", borderRadius: 0 } }}>
          {panel(() => setDrawerOpen(false))}
        </Box>
      </Drawer>
    </Box>
  );
}

export function FiltersPanelDemo() {
  return (
    <>
      <Example title="Beside a list of conversations: Status picks one, the rest any number, and Features, Capabilities and People search (narrow the window for the phone's Filters button and Drawer)">
        <Conversations />
      </Example>
      <CodeBlock
        code={`const [filters, setFilters] = useState<FiltersValue>({});

<FiltersPanel
  summary={\`\${shown.length} conversations\`}
  value={filters}
  onChange={setFilters}
  sections={[
    { id: "status", title: "Status", select: "single", options: statuses },
    { id: "feature", title: "Features", icon: <WidgetsOutlinedIcon />, search: true, options: features },
    { id: "people", title: "People", search: true, limit: 8, defaultCollapsed: true, options: people },
  ]}
/>`}
      />
    </>
  );
}
