import { useState } from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { CodeBlock } from "../../docs/CodeBlock";
import { Example } from "../../docs/Example";
import { SearchSelect, type SearchSelectOption } from "../inputs/SearchSelect";
import { RelatedPanel, type RelatedItem, type RelatedKind } from "./RelatedPanel";

/* Everything in the made-up client's portal that a conversation could be about. */
const EVERYTHING: RelatedItem[] = [
  { kind: "product", id: "prd_dispatch", name: "Dispatch" },
  { kind: "product", id: "prd_driver", name: "Driver app" },
  { kind: "focus", id: "foc_routes", name: "Faster route planning" },
  { kind: "focus", id: "foc_signing", name: "Signing for deliveries" },
  {
    kind: "focus",
    id: "foc_erp",
    name: "Bring orders in from the ERP so dispatchers stop re-typing them",
  },
  { kind: "feature", id: "fea_dispatch", name: "Dispatch" },
  { kind: "feature", id: "fea_signing", name: "Signing for deliveries" },
  {
    kind: "capability",
    id: "cap_drag",
    name: "Dispatchers build routes by dragging orders onto trucks",
    level: "alpha",
  },
  {
    kind: "capability",
    id: "cap_erp",
    name: "Orders arrive from the ERP without re-typing",
    level: "prototype",
  },
  { kind: "capability", id: "cap_sign", name: "Sign for a delivery", level: "beta" },
  { kind: "capability", id: "cap_slip", name: "Print a delivery slip", level: null },
  { kind: "capacity", id: "blk_42", block: "core", number: "BLK-0042", week: "Oct 5" },
  { kind: "capacity", id: "blk_43", block: "flex", number: "BLK-0043", week: "Oct 12" },
];

const pick = (...ids: string[]) => EVERYTHING.filter((item) => ids.includes(item.id));

const GROUPS = {
  product: { group: "Products", Icon: WebAssetOutlinedIcon },
  focus: { group: "Focuses", Icon: CenterFocusStrongOutlinedIcon },
  feature: { group: "Features", Icon: WidgetsOutlinedIcon },
  capability: { group: "Capabilities", Icon: BoltOutlinedIcon },
  capacity: { group: "Capacity", Icon: ViewWeekOutlinedIcon },
};

const option = (item: RelatedItem): SearchSelectOption => {
  const { group, Icon } = GROUPS[item.kind];
  return {
    id: item.id,
    label: item.kind === "capacity" ? (item.number ?? item.id) : item.name,
    group,
    icon: <Icon sx={{ fontSize: 18, color: "text.secondary" }} />,
  };
};

/*
 * A panel the reader can add the given kinds to and remove from, with the
 * app's picker in a popover under Add, offering only those kinds.
 */
function Editable({
  initial,
  kinds,
  description,
}: {
  initial: RelatedItem[];
  kinds: RelatedKind[];
  description?: string;
}) {
  const [items, setItems] = useState(initial);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const options = EVERYTHING.filter(
    (item) => kinds.includes(item.kind) && !items.includes(item),
  ).map(option);
  return (
    <>
      <RelatedPanel
        items={items}
        description={description}
        add={{ kinds, onAdd: setAnchor }}
        onRemove={(removed) => setItems(items.filter((item) => item !== removed))}
      />
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{ paper: { sx: { p: 2, width: 320, maxWidth: "calc(100vw - 32px)" } } }}
      >
        <SearchSelect
          label="Add something related"
          options={options}
          value={null}
          onChange={(chosen) => {
            const item = EVERYTHING.find(({ id }) => id === chosen?.id);
            if (item) setItems([...items, item]);
            setAnchor(null);
          }}
        />
      </Popover>
    </>
  );
}

const linked = (item: RelatedItem): RelatedItem => ({ ...item, href: `#related/${item.id}` });

export function RelatedPanelDemo() {
  return (
    <>
      <Example title="In a conversation's side column, adding Features and Capabilities alone: add with Add, remove with each row's ✕ (hover a row)">
        <Box sx={{ maxWidth: 340 }}>
          <Editable
            initial={pick("fea_dispatch", "cap_drag", "cap_erp")}
            kinds={["feature", "capability"]}
            description="What in the Catalog this is about. Optional, and either of us can add to it."
          />
        </Box>
      </Example>
      <Example title="In a conversation across several Focuses, adding Products and Focuses alone">
        <Box sx={{ maxWidth: 340 }}>
          <Editable
            initial={pick("prd_dispatch", "foc_routes", "foc_erp")}
            kinds={["product", "focus"]}
            description="The Focuses this conversation is about, and their Products."
          />
        </Box>
      </Example>
      <Example title="In a conversation, read-only, about a Product and a Focus: long names cut short (hover one)">
        <Box sx={{ maxWidth: 340 }}>
          <RelatedPanel
            items={pick("prd_dispatch", "foc_routes", "cap_drag", "cap_erp", "blk_42").map(linked)}
          />
        </Box>
      </Example>
      <Example title="On a Focus, read-only, each row linking to its page">
        <Box sx={{ maxWidth: 340 }}>
          <RelatedPanel
            items={pick(
              "prd_driver",
              "fea_signing",
              "cap_sign",
              "cap_slip",
              "blk_42",
              "blk_43",
            ).map(linked)}
          />
        </Box>
      </Example>
      <Example title="Nothing yet: read-only, adding Products and Focuses, and adding every kind">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: "flex-start" }}
        >
          <Box sx={{ width: "100%", maxWidth: 340 }}>
            <RelatedPanel items={[]} />
          </Box>
          <Box sx={{ width: "100%", maxWidth: 340 }}>
            <Editable
              initial={[]}
              kinds={["product", "focus"]}
              description="What this conversation is about."
            />
          </Box>
          <Box sx={{ width: "100%", maxWidth: 340 }}>
            <Editable
              initial={[]}
              kinds={["product", "focus", "feature", "capability", "capacity"]}
              description="What this conversation is about."
            />
          </Box>
        </Stack>
      </Example>
      <CodeBlock
        code={`<RelatedPanel
  items={related}
  description="What in the Catalog this is about. Optional, and either of us can add to it."
  add={{ kinds: ["feature", "capability"], onAdd: (anchor) => openPicker(anchor) }}
  onRemove={(item) => removeRelated(item.id)}
/>`}
      />
    </>
  );
}
