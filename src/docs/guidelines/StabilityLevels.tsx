import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
  STABILITY_LEVELS,
  StabilityBanner,
  StabilityDetails,
  StabilityMark,
  type StabilityMarkSize,
} from "../../components";
import { brand } from "../../exalynt";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";
import { StabilityAndMaturity } from "./StabilityAndMaturity";
import { MobileApps, WebApps, WhereTable } from "./StabilityInContext";

const SIZES: { size: StabilityMarkSize; name: string; shows: string; use: string }[] = [
  {
    size: "short",
    name: "Short",
    shows: "The Track",
    use: "Tight spots where a name won't fit: navigation tabs, menu items, buttons, and tallies where a count and name follow. The level's name is its accessible label.",
  },
  {
    size: "long",
    name: "Long",
    shows: "The Track and the name",
    use: "The default. Beside a Capability's name in lists and tables, in a Stability column, and in running text.",
  },
  {
    size: "extra-long",
    name: "Extra long",
    shows: "The Track, the name, and how stable it is",
    use: "Beside the title of the page or Feature it describes, usually once per page, and in headings and legends that explain the levels.",
  },
];

/* The surfaces each shade is checked on: Exalynt's page and card, per scheme. */
const SURFACES = {
  light: [brand.white, brand.cloud],
  dark: [brand.midnight, brand.elevated],
};

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/* The lowest WCAG contrast of `color` across `surfaces`, e.g. "5.4:1". */
function contrast(color: string, surfaces: string[]) {
  const ratios = surfaces.map((surface) => {
    const [hi, lo] = [luminance(color), luminance(surface)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  });
  return `${Math.min(...ratios).toFixed(1)}:1`;
}

function Swatch({ color, surfaces }: { color: string; surfaces: string[] }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: 0.75,
          border: 1,
          borderColor: "divider",
          bgcolor: color,
        }}
      />
      <Box component="code" sx={{ fontFamily: "monospace", fontSize: 13 }}>
        {color}
      </Box>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {contrast(color, surfaces)}
      </Typography>
    </Box>
  );
}

/* The guide to showing stability levels: what each means, the mark, its sizes, colors, popover, and where it goes. */
export function StabilityLevelsGuideline() {
  return (
    <>
      <Guidance title="The levels">
        <p>
          Everything Exalynt builds is at one of four stability levels: Prototype, Alpha, Beta, or
          General Availability. The level tells people how stable something is right now, so they
          know what they can rely on before they rely on it. What each level means, and how work
          moves between them, is in the readme&rsquo;s{" "}
          <ReadmeLink path="how-it-works/stability-levels">Stability levels</ReadmeLink> page. This
          page covers how to show a level.
        </p>
        <p>
          <strong>Stability is used everywhere,</strong> and above all in client projects: their
          products show it to their own users, so everyone knows what to expect of each part. It
          also appears in Exalynt&rsquo;s tools and the readme.
        </p>
      </Guidance>

      <StabilityAndMaturity />

      <Guidance title="The mark">
        <p>
          Every product shows a level the same way, with the <code>StabilityMark</code>: the{" "}
          <strong>Track</strong>, four small cells with one lit for Prototype up to all four for GA,
          then the level&rsquo;s name, both in the level&rsquo;s color.
        </p>
        <ul>
          <li>
            <strong>No mark means GA.</strong> GA is the default, so only Prototype, Alpha, and Beta
            get a mark. The one exception is Exalynt&rsquo;s own tools, where clients follow the
            stability of the Features we&rsquo;re working on for them (see Where to show it, below).
          </li>
          <li>
            <strong>The Track and the name carry the level, not the color.</strong> They read the
            same in grayscale and for people with color blindness. Color is a third signal on top.
          </li>
          <li>
            <strong>The mark is text, not a badge.</strong> No pill, background, border, or icon
            around it. It sits next to the thing it describes, at about the size of the text beside
            it, and scales with it.
          </li>
          <li>
            <strong>Never a percentage.</strong> A level is one of four names. Don&rsquo;t show it
            as &ldquo;75%&rdquo;, a progress bar, or a ring; percentages are maturity&rsquo;s.
          </li>
          <li>
            <strong>Every mark has a popover.</strong> It&rsquo;s how people learn what a level
            means where they see it, so <code>StabilityMark</code> always has one.
          </li>
        </ul>
      </Guidance>

      <Example title="Sizes">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                {SIZES.map(({ size, name }) => (
                  <TableCell key={size}>{name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {STABILITY_LEVELS.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell component="th" scope="row">
                    {entry.name}
                  </TableCell>
                  {SIZES.map(({ size }) => (
                    <TableCell key={size}>
                      <StabilityMark level={entry.id} size={size} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Example>
      <Guidance title="Which size">
        <ul>
          {SIZES.map(({ size, name, shows, use }) => (
            <li key={size}>
              <strong>{name}</strong> (<code>{size}</code>): {shows.toLowerCase()}. {use}
            </li>
          ))}
        </ul>
        <p>
          When in doubt, use the long mark. Use the short mark only where there&rsquo;s no room for
          the name, since the popover is then the only place it&rsquo;s shown.
        </p>
      </Guidance>

      <Example title="Colors, with the lowest contrast on Exalynt's page and card surfaces">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Light surfaces</TableCell>
                <TableCell>Dark surfaces</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {STABILITY_LEVELS.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell component="th" scope="row">
                    <StabilityMark level={entry.id} size="extra-long" />
                  </TableCell>
                  <TableCell>
                    <Swatch color={entry.colors.light} surfaces={SURFACES.light} />
                  </TableCell>
                  <TableCell>
                    <Swatch color={entry.colors.dark} surfaces={SURFACES.dark} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Example>
      <Guidance title="Colors">
        <p>
          Each level has one color in two shades: pewter for Prototype, rose for Alpha, blue for
          Beta, and green for GA, a darker shade on light surfaces and a lighter one on dark. They
          belong to the levels, not to a brand, so they look the same under a client&rsquo;s theme
          as under Exalynt&rsquo;s.
        </p>
        <ul>
          <li>
            <strong>Keep marks on the base surface,</strong> the page or a card. On tinted surfaces,
            like table headers or side panels, the light shades drop below the 4.5:1 small text
            needs.
          </li>
          <li>
            <strong>Use the level colors only for stability and maturity.</strong> Not for status,
            success, errors, charts, or branding, so a level color always means a level.
          </li>
          <li>
            <strong>Don&rsquo;t recolor, tint, or fade a mark,</strong> or put it on a colored
            background. The colors and their contrast are checked together.
          </li>
          <li>
            <strong>Prototype&rsquo;s pewter isn&rsquo;t text grey.</strong> It&rsquo;s a violet
            grey, so a Prototype mark reads as a level and not as muted text.
          </li>
        </ul>
      </Guidance>

      <Example title="The popover, open">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <StabilityDetails level="alpha" />
        </Box>
      </Example>
      <Guidance title="The popover">
        <p>
          Every mark opens a popover that tells the client one thing: how stable this is. It shows
          the level&rsquo;s full name (General Availability, not GA) and how stable it is in a word,
          the four levels as a larger Track with this one lit, one sentence on what to expect, a
          short muted definition of stability, and a link to the level on readme.exalynt.com. The
          four boxes are whole and square-cornered, so they don&rsquo;t read as maturity&rsquo;s
          rounded bar, which fills to a percentage.
        </p>
        <ul>
          <li>
            <strong>Keep it about how stable it is.</strong> No advice for engineers, and nothing
            the client would need to decode. Maturity&rsquo;s popover follows the same layout, so
            the two read alike.
          </li>
          <li>
            <strong>Name what it&rsquo;s on.</strong> Pass <code>feature</code> (&ldquo;Invoice
            export&rdquo;) and the popover opens with &ldquo;Invoice export is in Beta.&rdquo;
            Always pass it on a short mark, and wherever the name isn&rsquo;t right beside the mark.
          </li>
          <li>
            <strong>Don&rsquo;t promise more than the level does</strong> in copy around a mark.
            Data in{" "}
            <ReadmeLink path="how-it-works/stability-levels#stability-prototype">
              Prototype
            </ReadmeLink>{" "}
            may be fake, and breaking changes in{" "}
            <ReadmeLink path="how-it-works/stability-levels#stability-beta">Beta</ReadmeLink> are
            announced ahead of time when we can, not always.
          </li>
          <li>
            <strong>It opens on hover, keyboard focus, and tap,</strong> and closes on Escape. The
            mark takes focus itself, except inside a button or link (
            <code>
              focusable=
              {"{false}"}
            </code>
            ), which already does.
          </li>
          <li>
            <strong>It follows the color scheme</strong> on the theme&rsquo;s paper, with a border
            and shadow to set it apart from the page it opens over.
          </li>
          <li>
            <strong>Its link opens in a new tab,</strong> so people can read more without losing
            their place. Turn it off (<code>link={"{false}"}</code>) where the mark is itself a link
            to the level.
          </li>
        </ul>
      </Guidance>

      <Example title="The banner">
        <StabilityBanner level="alpha" feature="Scenario compare" />
      </Example>
      <Guidance title="The banner">
        <p>
          Most pages need only the mark. <code>StabilityBanner</code> is for the few where missing
          the level would cost someone something. It&rsquo;s the extra-long mark over the
          level&rsquo;s summary and what people can rely on it for, on a panel with its rule in the
          level&rsquo;s color. The mark inside is still text on the panel&rsquo;s base surface.
        </p>
        <p>Use one when:</p>
        <ul>
          <li>
            <strong>A Prototype shows sample or fake data that could pass for real,</strong> such as
            a dashboard, a report, or an assistant&rsquo;s answers.
          </li>
          <li>
            <strong>People are about to put real work into an Alpha or Beta,</strong> such as a
            first payroll export or a new booking flow, and should keep a fallback.
          </li>
          <li>
            <strong>You want something back,</strong> like feedback on an Alpha. Give the banner one{" "}
            <code>action</code> that asks for it, or one that opens the fallback.
          </li>
          <li>
            <strong>A whole app or area is at one level,</strong> such as a mobile app in Beta. One
            banner on its first screen says so once, instead of a mark on every screen.
          </li>
        </ul>
        <p>And keep to these:</p>
        <ul>
          <li>
            <strong>Never for GA.</strong> GA is the default. Announce that something reached GA in
            release notes, not in a level&rsquo;s colors.
          </li>
          <li>
            <strong>One per page at most,</strong> at the top of what it&rsquo;s about: under
            PageHeader for the whole page, or at the top of a section for one part of it. When
            several parts are below GA, mark each, and give a banner only to the one that matters
            most.
          </li>
          <li>
            <strong>Don&rsquo;t put one on every page that isn&rsquo;t GA.</strong> People stop
            reading banners they see everywhere, then miss the one that matters. For most pages, the
            mark beside the title is enough.
          </li>
          <li>
            <strong>Show the extra-long mark once.</strong> When a banner opens a page, leave the
            badge off its PageHeader. The banner carries the level.
          </li>
          <li>
            <strong>Keep marking Capabilities.</strong> A banner doesn&rsquo;t replace the marks in
            the page&rsquo;s tables and lists.
          </li>
          <li>
            <strong>Not for status.</strong> Outages, errors, and deadlines go in MUI&rsquo;s{" "}
            <code>Alert</code>. A banner is only ever about a level.
          </li>
          <li>
            <strong>Its defaults are the level&rsquo;s own words.</strong> Pass <code>title</code>{" "}
            and children when you can say something specific to the page, such as which data is fake
            or what the fallback is, but never promise more than the level does. Keep it to two
            short sentences: on a phone, a banner can fill the first screen.
          </li>
          <li>
            <strong>It doesn&rsquo;t close.</strong> It&rsquo;s for pages where the level should
            stay in view.
          </li>
        </ul>
      </Guidance>

      <Example title="In a web app">
        <WebApps />
      </Example>
      <Example title="In a mobile app">
        <MobileApps />
      </Example>
      <Guidance title="Where to show it">
        <ul>
          <li>
            <strong>Everywhere, no mark means GA.</strong> In client products, on the web and on
            phones, and anywhere else people use what we build, mark only Prototype, Alpha, and
            Beta. Never show a GA mark or a GA banner: GA is what people expect by default, so the
            missing mark already says it, and a mark on everything would hide the ones that matter.
          </li>
          <li>
            <strong>The one exception is Exalynt&rsquo;s own tools,</strong> such as the portal,
            where clients follow the stability of the Features we&rsquo;re working on for them.
            There, show every Capability&rsquo;s level, GA included, since clients are deciding what
            they can rely on. Nowhere else shows GA.
          </li>
          <li>
            <strong>Put the mark on the thing that has the level.</strong> Mark Capabilities beside
            their names. Mark a Feature only where it has an overall level, such as its tab or page
            title (PageHeader&rsquo;s <code>badge</code>). Update the mark when the level changes.
          </li>
          <li>
            <strong>Inside a button or link,</strong> put the short mark after the label, with{" "}
            <code>focusable={"{false}"}</code>. That includes a list row that opens something.
          </li>
          <li>
            <strong>On a phone,</strong> put the extra-long mark under a screen&rsquo;s title rather
            than beside it, and drop to the short mark wherever a name would wrap.{" "}
            <strong>Bottom tabs carry no mark.</strong> Their labels are too small and too tight for
            one, so the screen each tab opens shows the level under its title instead.
          </li>
        </ul>
      </Guidance>
      <Example title="Which one where">
        <WhereTable />
      </Example>

      <Guidance title="Using the components">
        <ul>
          <li>
            <code>StabilityMark</code>: the mark, with its popover.
          </li>
          <li>
            <code>StabilityBanner</code>: the level as a callout, for the few pages that need one.
          </li>
          <li>
            <code>StabilityDetails</code>: the popover&rsquo;s content on its own, for help text or
            a legend. <code>card={"{false}"}</code> drops the card, for a card of your own.
          </li>
          <li>
            <code>STABILITY</code>, <code>STABILITY_LEVELS</code>: each level&rsquo;s name, how
            stable it is, summary, expectations, colors, and GitHub label, for your own layouts.
          </li>
          <li>
            <code>STABILITY_DOCS_URL</code>: where the levels are explained. Each level is at{" "}
            <code>#stability-&lt;level&gt;</code>.
          </li>
          <li>
            <strong>In a GitHub README,</strong> where components can&rsquo;t render, use the SVG
            marks at <code>https://design.exalynt.io/stability/</code>: the extra-long mark under
            the title, linked to the level. This repository&rsquo;s README has the snippet.
          </li>
        </ul>
        <p>
          For the labels on issues and pull requests, see the readme&rsquo;s{" "}
          <ReadmeLink path="engineers/marking-stability">Marking stability levels</ReadmeLink>, and
          for what should be in place at each level, its{" "}
          <ReadmeLink path="how-it-works/stability-checklist">Stability checklist</ReadmeLink>.
        </p>
      </Guidance>
      <CodeBlock
        code={`import { StabilityBanner, StabilityMark } from "@exalynt/design/components";

<PageHeader
  title="Invoice export"
  badge={<StabilityMark level="beta" feature="Invoice export" size="extra-long" />}
/>

<Button>
  Compare scenarios{" "}
  <StabilityMark level="alpha" feature="Scenario compare" size="short" focusable={false} />
</Button>

<StabilityBanner
  level="prototype"
  feature="Assistant"
  title="Answers here use sample data."
  action={<Button variant="outlined">Suggest a question</Button>}
>
  It's a prototype to help choose a direction. Don't act on these numbers.
</StabilityBanner>`}
      />
    </>
  );
}
