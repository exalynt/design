import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Example } from "../../docs/Example";
import { SectionCard } from "../layout/SectionCard";
import { SearchSelect, type SearchSelectOption } from "./SearchSelect";

const people: SearchSelectOption[] = [
  ["Ana Souza", "ana@exalynt.example"],
  ["José Ramírez", "jose@exalynt.example"],
  ["Priya Natarajan", "priya@exalynt.example"],
  ["Sam Lee", "sam@acme.example"],
  ["Tomás Ortega", "tomas@exalynt.example"],
  ["Wen Zhao", "wen@exalynt.example"],
].map(([name, email]) => ({
  id: email,
  label: name,
  description: email,
  icon: <Avatar sx={{ width: 24, height: 24, fontSize: 11 }}>{initials(name)}</Avatar>,
}));

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const projects: SearchSelectOption[] = [
  { id: "billing", label: "Billing migration", group: "Acme Corp" },
  { id: "mobile", label: "Mobile app", group: "Acme Corp" },
  { id: "warehouse", label: "Data warehouse", group: "Globex" },
  { id: "portal", label: "Customer portal", group: "Globex" },
  { id: "audit", label: "Security audit", group: "Initech" },
];

function Chosen({ value }: { value: SearchSelectOption | null }) {
  return (
    <Typography variant="caption" sx={{ display: "block", mt: 1.5, color: "text.secondary" }}>
      Value: {value ? `${value.label} (${value.id})` : "none"}
    </Typography>
  );
}

function People() {
  const [value, setValue] = useState<SearchSelectOption | null>(null);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <SearchSelect
        label="Engineer"
        placeholder="Search by name or email"
        options={people}
        value={value}
        onChange={setValue}
      />
      <Chosen value={value} />
    </Box>
  );
}

function Projects() {
  const [value, setValue] = useState<SearchSelectOption | null>(projects[2]);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <SearchSelect
        label="Project"
        placeholder="Search projects or clients"
        options={projects}
        value={value}
        onChange={setValue}
      />
      <Chosen value={value} />
    </Box>
  );
}

function InAForm() {
  const [value, setValue] = useState<SearchSelectOption | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const missing = submitted && !value;
  return (
    <Box sx={{ maxWidth: 560 }}>
      <SectionCard title="Assign work">
        <Stack spacing={2}>
          <SearchSelect
            label="Engineer"
            options={people}
            value={value}
            onChange={setValue}
            required
            error={missing}
            helperText={missing ? "Choose who does the work." : "They're told by email."}
          />
          <Box>
            <Button variant="contained" onClick={() => setSubmitted(true)}>
              Assign
            </Button>
          </Box>
        </Stack>
      </SectionCard>
    </Box>
  );
}

export function SearchSelectDemo() {
  return (
    <>
      <Example title='With a second line: try "jose" or "acme"'>
        <People />
      </Example>
      <Example title="Grouped, with a value chosen: search a client's name">
        <Projects />
      </Example>
      <Example title="In a form, required: press Assign with nothing chosen">
        <InAForm />
      </Example>
      <Example title="Loading">
        <Box sx={{ maxWidth: 400 }}>
          <SearchSelect label="Client" options={[]} value={null} onChange={() => {}} loading />
        </Box>
      </Example>
    </>
  );
}
