import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MaturityRing, StabilityMark } from "../../components";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";

const ROWS: [string, string, string][] = [
  [
    "Shown as",
    "One of four levels by name: StabilityMark, the Track and the level's name. Never a percentage. No mark means GA, except in Exalynt's own tools.",
    "Always a percentage: MaturityRing, always a ring, never a bar or boxes.",
  ],
  [
    "Goes on",
    "Each Capability, or a Feature or page with one overall level.",
    "A Feature, or a project.",
  ],
  [
    "Used in",
    "Everywhere, and above all in client products, where it sets their users' expectations. Also in Exalynt's tools and the readme.",
    "Mostly Exalynt's own tools, the portal above all. Not in client products.",
  ],
];

/* How stability and maturity differ on screen, on both guides so neither is read alone. */
export function StabilityAndMaturity() {
  return (
    <>
      <Guidance title="Stability and maturity">
        <p>
          They use the same four colors, but show different things, so never show one in place of
          the other. The readme explains{" "}
          <ReadmeLink path="how-it-works/stability-levels">what each level means</ReadmeLink>,{" "}
          <ReadmeLink path="how-it-works/maturity">how maturity is worked out</ReadmeLink> from
          them, and{" "}
          <ReadmeLink path="how-it-works/maturity#maturity-status-stability-and-bugs">
            how the two differ
          </ReadmeLink>
          . On screen:
        </p>
        <ul>
          <li>
            <strong>Stability is a level, never a percentage.</strong> A level is one of four names,
            never &ldquo;75%&rdquo; or a progress bar. The 25% a level counts for is only how
            maturity is worked out.
          </li>
          <li>
            <strong>Maturity is a percentage, always a ring.</strong> A bar or a row of boxes would
            read as the stability mark&rsquo;s Track.
          </li>
        </ul>
      </Guidance>
      <Example title="Side by side">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  Stability <StabilityMark level="beta" link={false} />
                </TableCell>
                <TableCell>
                  Maturity <MaturityRing progress={54} subject="feature" size={20} link={false} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map(([label, stability, maturity]) => (
                <TableRow key={label}>
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                    {label}
                  </TableCell>
                  <TableCell>{stability}</TableCell>
                  <TableCell>{maturity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Example>
    </>
  );
}
