import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { SectionCard } from "../../components";
import { catalog } from "../catalog";
import { Guidance } from "../Guidance";
import { Rules } from "./Rules";

/* Read when the page renders, after catalog.ts (which imports this file) has loaded. */
function ownComponents() {
  return catalog.flatMap((group) =>
    group.entries.filter((entry) => entry.importFrom === "components"),
  );
}

export function MuiFirstGuideline() {
  return (
    <>
      <Guidance title="Start from MUI">
        <p>
          Exalynt&apos;s tools and client projects are built from MUI&apos;s components. The theme
          makes them look right, so a plain <code>Button</code>, <code>TextField</code> or{" "}
          <code>Dialog</code> already matches the brand without anything added.
        </p>
        <p>For any piece of a page, reach for these in order:</p>
        <ol>
          <li>
            <strong>A component this system lists for the job</strong>, below. Each is here because
            MUI alone didn&apos;t do that job well enough, so use it rather than rebuilding it from
            MUI parts.
          </li>
          <li>
            <strong>An MUI component</strong> from <code>@mui/material</code>, as the theme styles
            it.
          </li>
          <li>
            <strong>A composition of those</strong>, written in the page.
          </li>
          <li>
            <strong>A new component</strong>, only when the same composition is needed in more than
            one app, or MUI has nothing for the job. It goes in its group's folder in{" "}
            <code>src/components/</code> with a page here.
          </li>
        </ol>
      </Guidance>

      <Rules
        title="Using MUI"
        items={[
          "Restyle an MUI component everywhere through the theme's component overrides, not with sx in each page.",
          "Use sx for layout and spacing, and take colors from palette roles, never hex values.",
          "Don't wrap an MUI component just to rename it or fix its props. Set its defaultProps in the theme instead.",
          "Use MUI's docs for how a component behaves and for its accessibility. These pages only cover where Exalynt's use differs.",
          "Stay within @mui/material and @mui/icons-material. Ask before adding another UI library, MUI X included.",
        ]}
      />

      <SectionCard
        title="What this system adds"
        subheader="Use these over MUI for their jobs."
        disableContentPadding
      >
        <List sx={{ p: 1 }}>
          {ownComponents().map((entry) => (
            <ListItemButton
              key={entry.title}
              component="a"
              href={`#${entry.title}`}
              sx={{ alignItems: "flex-start" }}
            >
              <ListItemIcon sx={{ mt: "3px" }}>
                <entry.icon sx={{ fontSize: 18 }} />
              </ListItemIcon>
              <ListItemText
                primary={entry.title}
                secondary={entry.description.replaceAll("`", "")}
                sx={{ my: 0 }}
                slotProps={{ primary: { sx: { fontWeight: 600, color: "text.primary" } } }}
              />
            </ListItemButton>
          ))}
        </List>
      </SectionCard>
    </>
  );
}
