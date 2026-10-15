import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Example } from "../../docs/Example";
import { SectionCard } from "../layout/SectionCard";
import { SearchMultiSelect } from "./SearchMultiSelect";
import type { SearchSelectOption } from "./SearchSelect";

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

function Chosen({ value }: { value: SearchSelectOption[] }) {
  return (
    <Typography variant="caption" sx={{ display: "block", mt: 1.5, color: "text.secondary" }}>
      Value: {value.length ? value.map((option) => option.id).join(", ") : "none"}
    </Typography>
  );
}

function People() {
  const [value, setValue] = useState<SearchSelectOption[]>([]);
  return (
    <Box sx={{ maxWidth: 400 }}>
      <SearchMultiSelect
        label="Engineers"
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
  const [value, setValue] = useState<SearchSelectOption[]>(projects.slice(0, 4));
  return (
    <Box sx={{ maxWidth: 400 }}>
      <SearchMultiSelect
        label="Projects"
        options={projects}
        value={value}
        onChange={setValue}
        limitChips={2}
      />
      <Chosen value={value} />
    </Box>
  );
}

function InAForm() {
  const [value, setValue] = useState<SearchSelectOption[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const missing = submitted && !value.length;
  return (
    <Box sx={{ maxWidth: 560 }}>
      <SectionCard title="Share the estimate">
        <Stack spacing={2}>
          <SearchMultiSelect
            label="Reviewers"
            options={people}
            value={value}
            onChange={setValue}
            required
            error={missing}
            helperText={missing ? "Choose at least one reviewer." : "Each is told by email."}
          />
          <Box>
            <Button variant="contained" onClick={() => setSubmitted(true)}>
              Share
            </Button>
          </Box>
        </Stack>
      </SectionCard>
    </Box>
  );
}

export function SearchMultiSelectDemo() {
  return (
    <>
      <Example title='Pick several: try "jose", then "acme"'>
        <People />
      </Example>
      <Example title="Grouped, past two chips: focus to see them all">
        <Projects />
      </Example>
      <Example title="In a form, required: press Share with nothing chosen">
        <InAForm />
      </Example>
    </>
  );
}
