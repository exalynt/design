import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { MATURITY_BANDS, MaturityDetails, MaturityRing, maturityBand } from "../../components";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";
import { StabilityAndMaturity } from "./StabilityAndMaturity";

const EXAMPLES = [13, 43, 67, 80];

const MATURITY = "how-it-works/maturity";

function Bands() {
  return (
    <Grid container spacing={1.5}>
      {EXAMPLES.map((progress) => (
        <Grid key={progress} size={{ xs: 6, sm: 3 }}>
          <Paper
            variant="outlined"
            sx={{
              height: "100%",
              px: 1.5,
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.5,
              textAlign: "center",
            }}
          >
            <Box sx={{ minHeight: 52, display: "grid", placeItems: "center", mb: 0.5 }}>
              <MaturityRing progress={progress} subject="project" />
            </Box>
            <Typography variant="subtitle2">{MATURITY_BANDS[maturityBand(progress)]}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

/*
 * The guide to showing maturity: where it's used, how it differs from
 * stability, and how to draw it. What maturity means and how it's counted
 * live in the readme, which this links to rather than repeats.
 */
export function MaturityGuideline() {
  return (
    <>
      <Guidance title="What maturity is">
        <p>
          Maturity is a percentage for a Feature or a project, worked out from its
          Capabilities&rsquo; stability levels. What it means, how it&rsquo;s counted, and why 100%
          isn&rsquo;t the goal are in the readme&rsquo;s{" "}
          <ReadmeLink path={MATURITY}>Maturity</ReadmeLink> page. This page covers how to show it.
        </p>
        <p>
          <strong>It&rsquo;s for Exalynt&rsquo;s own tools.</strong> The portal uses it so clients
          can follow progress on their projects and Features. Client products don&rsquo;t show it to
          their users; they show stability.
        </p>
      </Guidance>

      <StabilityAndMaturity />

      <Guidance title="Working it out">
        <p>
          Don&rsquo;t count it by hand. <code>featureMaturity</code> and{" "}
          <code>projectMaturity</code> follow the readme&rsquo;s rules for{" "}
          <ReadmeLink path={`${MATURITY}#a-features-maturity`}>a Feature</ReadmeLink> and{" "}
          <ReadmeLink path={`${MATURITY}#a-projects-maturity`}>a project</ReadmeLink>, and return{" "}
          <code>null</code> where nothing should show yet.
        </p>
      </Guidance>
      <CodeBlock
        code={`import { MaturityRing, featureMaturity, projectMaturity } from "@exalynt/design/components";

// A Capability's level, or null while it's a draft.
const scheduling = featureMaturity(["beta", "beta", "alpha"]); // 67
const project = projectMaturity([88, scheduling, 38, null]); // 48

{project !== null && <MaturityRing progress={project} subject="project" count={4} labelled />}`}
      />

      <Example title="One in each band">
        <Bands />
      </Example>
      <Guidance title="Bands">
        <p>
          A ring takes the color of the{" "}
          <ReadmeLink path={`${MATURITY}#reading-a-maturity`}>band</ReadmeLink> it&rsquo;s in, named
          for the level at its top. The band&rsquo;s name, from <code>MATURITY_BANDS</code>, is what
          screen readers hear and what the popover says, so don&rsquo;t name bands in copy of your
          own.
        </p>
      </Guidance>

      <Guidance title="Always the ring, always the percentage">
        <p>
          Maturity is only ever drawn as <code>MaturityRing</code>, for a Feature and a project
          alike, and in its own popover, and it always shows its percentage. A bar or a row of boxes
          would look like the stability mark&rsquo;s Track, and the two must never be confused.
        </p>
        <ul>
          <li>
            <strong>A project:</strong> at 52px, labelled (<code>labelled</code> and{" "}
            <code>count</code>), at the top right of its page; unlabelled on each project&rsquo;s
            card, with <code>focusable={"{false}"}</code> since the card is the link.
          </li>
          <li>
            <strong>A Feature:</strong> at 24px, on its card in a backlog and in lists of Features.
            Pass <code>subject=&quot;feature&quot;</code> and the Feature&rsquo;s name as{" "}
            <code>label</code>.
          </li>
          <li>
            <strong>
              <code>MaturityDetails</code>, on a page:
            </strong>{" "}
            the popover&rsquo;s content with <code>card={"{false}"}</code>, where maturity is
            explained in a card of your own.
          </li>
        </ul>
      </Guidance>

      <Guidance title="The popover">
        <p>
          Every ring opens a popover that tells the client how mature this is: the ring again with
          its band, one sentence on what that band means, a short muted definition of maturity, and
          a link to the readme. Keep it to that. Whether a maturity is healthy, and{" "}
          <ReadmeLink path={`${MATURITY}#why-100-isnt-the-goal`}>
            why 100% isn&rsquo;t the goal
          </ReadmeLink>
          , are the readme&rsquo;s to explain.
        </p>
        <ul>
          <li>
            <strong>Show what it&rsquo;s made of</strong> wherever you have it: pass{" "}
            <code>count</code>, and a <code>breakdown</code> listing each Capability with its
            stability mark, or each Feature with a 20px ring, most mature first and drafts last.
            Give the marks and rings in a breakdown <code>link={"{false}"}</code> and{" "}
            <code>focusable={"{false}"}</code>.
          </li>
          <li>
            <strong>It opens on hover, keyboard focus, and tap,</strong> like the stability popover,
            and needs no separate info button.
          </li>
        </ul>
      </Guidance>
      <Example title="The popovers, open">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <MaturityDetails progress={67} subject="feature" count={3} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <MaturityDetails progress={48} subject="project" count={4} />
          </Grid>
        </Grid>
      </Example>

      <Guidance title="Maturity and status">
        <p>
          Show status (draft, ready, in progress, complete) as a plain icon and word, never in the
          level colors, so it can&rsquo;t be mistaken for stability or maturity, the only two things
          that use them. The readme sets out{" "}
          <ReadmeLink path={`${MATURITY}#maturity-status-stability-and-bugs`}>
            how maturity, status, stability, and bugs differ
          </ReadmeLink>
          .
        </p>
      </Guidance>
    </>
  );
}
