import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SearchIcon from "@mui/icons-material/Search";
import { SearchSelect, SectionCard, type SearchSelectOption } from "../../components";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { Rules } from "./Rules";

const clients: SearchSelectOption[] = [
  { id: "acme", label: "Acme Corp", description: "accounts@acme.example" },
  { id: "globex", label: "Globex", description: "billing@globex.example" },
  { id: "initech", label: "Initech", description: "ap@initech.example" },
];

function ProjectForm() {
  const [client, setClient] = useState<SearchSelectOption | null>(null);
  const [billing, setBilling] = useState("hourly");
  return (
    <Box sx={{ maxWidth: 560 }}>
      <SectionCard title="New project">
        <Stack spacing={2.5}>
          <TextField label="Name" placeholder="Billing migration" required />
          <SearchSelect label="Client" options={clients} value={client} onChange={setClient} />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Budget"
                fullWidth
                slotProps={{
                  input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
                  htmlInput: { inputMode: "decimal" },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Starts"
                type="date"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>
          <Box>
            <FormLabel id="billing-label" sx={{ typography: "subtitle2" }}>
              Billing
            </FormLabel>
            <RadioGroup
              aria-labelledby="billing-label"
              value={billing}
              onChange={(event) => setBilling(event.target.value)}
            >
              <FormControlLabel
                value="hourly"
                control={<Radio />}
                label="Hourly, from tracked time"
              />
              <FormControlLabel value="fixed" control={<Radio />} label="Fixed price" />
            </RadioGroup>
          </Box>
          <TextField label="Notes" multiline minRows={3} helperText="Only your team sees these." />
          <Box>
            <Button variant="contained">Create project</Button>
          </Box>
        </Stack>
      </SectionCard>
    </Box>
  );
}

function Fields() {
  return (
    <Grid container spacing={2.5} sx={{ maxWidth: 720 }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField label="Email" fullWidth helperText="Where invoices are sent." />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Email"
          fullWidth
          defaultValue="accounts@acme"
          error
          helperText="Add the domain, as in accounts@acme.com."
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField select label="Payment terms" fullWidth defaultValue="30">
          <MenuItem value="0">Due on receipt</MenuItem>
          <MenuItem value="15">Net 15</MenuItem>
          <MenuItem value="30">Net 30</MenuItem>
          <MenuItem value="60">Net 60</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField label="Account" fullWidth disabled defaultValue="Acme Corp" />
      </Grid>
    </Grid>
  );
}

function Choices() {
  const [view, setView] = useState("list");
  return (
    <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Email me when an estimate is approved"
      />
      <FormControlLabel control={<Switch defaultChecked />} label="Show archived projects" />
      <ToggleButtonGroup
        value={view}
        exclusive
        size="small"
        aria-label="View"
        onChange={(_, next: string | null) => next && setView(next)}
      >
        <ToggleButton value="list">List</ToggleButton>
        <ToggleButton value="board">Board</ToggleButton>
        <ToggleButton value="calendar">Calendar</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export function FormsGuideline() {
  return (
    <>
      <Guidance title="Which input">
        <p>
          Every input here is MUI&apos;s, styled by the theme, except where this system lists its
          own. Pick by the job:
        </p>
        <ul>
          <li>
            <strong>Text</strong>: <code>TextField</code>, with <code>multiline</code> when the
            answer runs past a line.
          </li>
          <li>
            <strong>A number or amount</strong>: <code>TextField</code> with{" "}
            <code>inputMode: &quot;decimal&quot;</code> and the unit as an{" "}
            <code>InputAdornment</code>. Not <code>type=&quot;number&quot;</code>, which changes the
            value when someone scrolls over it. For money, turn the text into cents with{" "}
            <code>parseMoney</code>, as <a href="#Money">Money</a> shows.
          </li>
          <li>
            <strong>One of two to five, all worth seeing at once</strong>: <code>RadioGroup</code>.
          </li>
          <li>
            <strong>One of a short list (up to about ten)</strong>: <code>TextField select</code>.
          </li>
          <li>
            <strong>One of a long list, or one people know by name</strong> (people, clients,
            projects): <a href="#SearchSelect">SearchSelect</a>.
          </li>
          <li>
            <strong>Several from a list</strong>: checkboxes when there are a handful;{" "}
            <a href="#SearchMultiSelect">SearchMultiSelect</a> when there are more, rather than{" "}
            <code>Autocomplete multiple</code>.
          </li>
          <li>
            <strong>Yes or no, saved with the form</strong>: <code>Checkbox</code>.{" "}
            <strong>On or off, taking effect straight away</strong>: <code>Switch</code>.
          </li>
          <li>
            <strong>Switching a view or filter</strong>: <code>ToggleButtonGroup</code>.
          </li>
          <li>
            <strong>A date</strong>: <code>TextField type=&quot;date&quot;</code>, the
            browser&apos;s own picker. We don&apos;t use MUI X&apos;s date pickers yet; ask before
            adding them.
          </li>
          <li>
            <strong>Filtering what&apos;s on the page</strong>: a <code>TextField</code> with a
            search icon as its start adornment, above what it filters. It&apos;s the one input
            without a visible label, so give it an <code>aria-label</code>.
          </li>
        </ul>
      </Guidance>

      <Rules
        title="Every form"
        items={[
          "Gives every input a visible label. A placeholder shows an example answer, never the label.",
          "Uses helperText to say what's needed before it's asked for. An error replaces it in the same place and says how to fix the problem, not just that there is one.",
          "Checks a field when it loses focus and the whole form on submit, not on every keystroke. Once a field shows an error, the error clears as soon as it's fixed.",
          "Marks required fields with the required prop, which adds the asterisk.",
          "Is one column, at most about 560px wide. Short fields that belong together, such as a budget and a start date, sit side by side from sm.",
          "Ends with one primary button, named for what it does (Create project, not Submit). It's disabled only while submitting; otherwise it stays pressable and shows what's missing.",
          "Keeps input text at 16px, the theme's size, so iOS doesn't zoom in when a field is focused.",
          "On phones, every field is the full width, and side-by-side fields stack.",
        ]}
      />

      <Example title="A form">
        <ProjectForm />
      </Example>
      <CodeBlock
        code={`<SectionCard title="New project">
  <Stack spacing={2.5}>
    <TextField label="Name" required />
    <SearchSelect label="Client" options={clients} value={client} onChange={setClient} />
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>…</Grid>
      <Grid size={{ xs: 12, sm: 6 }}>…</Grid>
    </Grid>
    …
    <Box><Button variant="contained">Create project</Button></Box>
  </Stack>
</SectionCard>`}
      />

      <Example title="Text fields: helper text, an error, a select, disabled">
        <Fields />
      </Example>

      <Example title="Checkbox, switch and toggle buttons">
        <Choices />
      </Example>

      <Example title="Filtering a list on the page">
        <TextField
          placeholder="Filter projects"
          sx={{ width: "100%", maxWidth: 320 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              ),
            },
            htmlInput: { "aria-label": "Filter projects" },
          }}
        />
      </Example>
    </>
  );
}
