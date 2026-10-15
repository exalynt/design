import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { Example } from "../../docs/Example";
import { PageHeader } from "./PageHeader";

const description = "Everything your engineers are working on, and what each one has used so far.";

export function PageHeaderDemo() {
  return (
    <>
      <Example title="Basic">
        <PageHeader title="Projects" description={description} />
      </Example>
      <Example title="With actions">
        <PageHeader
          title="Projects"
          description={description}
          actions={
            <>
              <Button variant="outlined">Export</Button>
              <Button variant="contained" startIcon={<AddIcon />}>
                New project
              </Button>
            </>
          }
        />
      </Example>
      <Example title="A record's page">
        <PageHeader
          title="Billing migration"
          above={
            <Breadcrumbs>
              <Link href="#PageHeader" color="inherit">
                Projects
              </Link>
              <Typography variant="inherit">Billing migration</Typography>
            </Breadcrumbs>
          }
          badge={<Chip label="Active" color="success" size="small" variant="outlined" />}
          meta={
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Started 3 March · 42 of 80 hours used
            </Typography>
          }
        />
      </Example>
    </>
  );
}
