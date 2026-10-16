import Grid from "@mui/material/Grid";
import { EngineerLevelDetails } from "../../components";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";

const LEVELS = "engineers/levels-and-growth";

/*
 * The guide to showing an engineer's level: the badge, where it goes, and its
 * popover. What the levels mean and how they're set live in the readme,
 * which this links to rather than repeats.
 */
export function EngineerLevelsGuideline() {
  return (
    <>
      <Guidance title="What a level is">
        <p>
          Every Exalynt engineer is at one of four levels: Associate, Mid, Senior, or Principal.
          What each one means, how it&rsquo;s set, and how engineers grow between them are in the
          readme&rsquo;s <ReadmeLink path={LEVELS}>Levels and growth</ReadmeLink> page. This page
          covers how to show it.
        </p>
        <p>
          <strong>
            A level is{" "}
            <ReadmeLink path={`${LEVELS}#what-levels-are-for`}>
              never a ranking of people
            </ReadmeLink>
            .
          </strong>{" "}
          Show it where knowing it helps someone, like choosing who works on a block or on an
          engineer&rsquo;s own profile, and nowhere just to decorate a person.
        </p>
      </Guidance>

      <Guidance title="The badge">
        <p>
          <code>EngineerLevelBadge</code> is the way to show a level: a small, quiet outlined Chip
          with four squares, filled in reading order to the level (one for Associate up to all four
          for Principal), and the level&rsquo;s name. It&rsquo;s there to give clients and other
          engineers context on who they&rsquo;re working with, not to rank anyone.
        </p>
        <p>
          A client shouldn&rsquo;t feel they got a bargain with a Principal or a worse deal with an
          Associate. So every level looks alike, in the theme&rsquo;s secondary text color: no
          metals, no color per level, nothing that reads as a better or cheaper deal. The squares
          say where a level sits; the popover says what it means.
        </p>
        <ul>
          <li>
            <strong>Beside or under the engineer&rsquo;s name,</strong> in a list of engineers and
            at the top of their page, never in place of it. One badge per engineer.
          </li>
          <li>
            <strong>The name leads.</strong> Set the name in the primary text color, at least the
            theme&rsquo;s <code>subtitle1</code> (15px, weight 600), so it&rsquo;s bigger and
            heavier than the 11px badge and reads first. Don&rsquo;t make the badge louder than the
            name.
          </li>
          <li>
            <strong>Don&rsquo;t make one level stand out.</strong> No color per level, and nothing
            on avatars or rows that marks a level.
          </li>
          <li>
            <strong>Name the level in copy as the badge does,</strong> from{" "}
            <code>ENGINEER_LEVELS[level].name</code>: &ldquo;a Senior engineer&rdquo;.
          </li>
          <li>
            <strong>With their picture,</strong> use <code>UserAttribution</code> with{" "}
            <code>showLevel</code>, which sets the badge under their name for you.
          </li>
          <li>
            <strong>Where the whole badge won&rsquo;t fit,</strong> such as a single line in a card,
            use <code>UserAttribution</code> with <code>showLevel=&quot;squares&quot;</code>: the
            badge without its text, after the name, named to assistive tech, with the same popover.
            It&rsquo;s the only place the badge goes without the level&rsquo;s name.
          </li>
        </ul>
      </Guidance>
      <CodeBlock
        code={`import { EngineerLevelBadge } from "@exalynt/design/components";

<Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
  <Typography variant="subtitle1">{engineer.name}</Typography>
  <EngineerLevelBadge level={engineer.level} />
</Stack>`}
      />

      <Guidance title="The popover">
        <p>
          A badge opens <code>EngineerLevelDetails</code> on hover, keyboard focus, or tap: the four
          levels&rsquo; squares with this one a step brighter, what an engineer at it leads, a short
          muted line on what a level is, and a link to the level in the readme. Keep it to that.
        </p>
        <ul>
          <li>
            <strong>Never pay.</strong> The Engineer Share a level sets is the readme&rsquo;s, for
            engineers, so the popover doesn&rsquo;t mention it.
          </li>
          <li>
            <strong>On a page,</strong> use <code>EngineerLevelDetails</code> with{" "}
            <code>card={"{false}"}</code> where a level is explained in a card of your own.
          </li>
        </ul>
      </Guidance>
      <Example title="The popover, open">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <EngineerLevelDetails level="senior" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
            <EngineerLevelDetails level="associate" />
          </Grid>
        </Grid>
      </Example>
    </>
  );
}
