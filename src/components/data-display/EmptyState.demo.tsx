import Button from "@mui/material/Button";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import { Example } from "../../docs/Example";
import { EmptyState } from "./EmptyState";

export function EmptyStateDemo() {
  return (
    <>
      <Example title="Basic">
        <EmptyState
          icon={FolderOpenOutlinedIcon}
          title="No projects yet"
          description="Projects your engineers start for you will show up here."
        />
      </Example>
      <Example title="With an action">
        <EmptyState
          icon={FolderOpenOutlinedIcon}
          title="No projects yet"
          description="Projects your engineers start for you will show up here."
          action={<Button variant="contained">Start a project</Button>}
        />
      </Example>
    </>
  );
}
