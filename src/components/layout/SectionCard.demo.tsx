import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Example } from "../../docs/Example";
import { SectionCard } from "./SectionCard";

const details = <Typography variant="body2">Acme Corp · accounts@acme.example · Net 30</Typography>;

export function SectionCardDemo() {
  return (
    <>
      <Example title="Basic">
        <SectionCard title="Billing details" subheader="Where invoices are sent.">
          {details}
        </SectionCard>
      </Example>
      <Example title="With an action">
        <SectionCard
          title="Billing details"
          subheader="Where invoices are sent."
          action={<Button size="small">Edit</Button>}
        >
          {details}
        </SectionCard>
      </Example>
      <Example title="Untitled">
        <SectionCard>{details}</SectionCard>
      </Example>
      {/* A list bleeds to the card's edges instead of sitting in the padded body. */}
      <Example title="Edge to edge">
        <SectionCard title="Recent activity" disableContentPadding>
          <List disablePadding>
            {["Estimate approved", "Capacity block scheduled", "Invoice paid"].map((item) => (
              <ListItem key={item} divider>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </SectionCard>
      </Example>
    </>
  );
}
