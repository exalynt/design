import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  CAPACITY_BLOCK_IDS,
  CAPACITY_BLOCKS,
  CapacityFigure,
  capacitySize,
} from "../../components";
import { CodeBlock } from "../CodeBlock";
import { Example } from "../Example";
import { Guidance } from "../Guidance";
import { ReadmeLink } from "../ReadmeLink";

const CAPACITY = "how-it-works/engineering-capacity";

function Blocks() {
  return (
    <Grid container spacing={1.5}>
      {CAPACITY_BLOCK_IDS.map((id) => {
        const { name, units } = CAPACITY_BLOCKS[id];
        return (
          <Grid key={id} size={{ xs: 12, sm: 4 }}>
            <Paper variant="outlined" sx={{ height: "100%", p: 2 }}>
              <Stack spacing={0.5} sx={{ alignItems: "center", textAlign: "center" }}>
                <CapacityFigure units={units} size={80} />
                <Typography variant="subtitle2" sx={{ pt: 0.5 }}>
                  {name} block
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {capacitySize(units)}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

/*
 * The guide to showing capacity blocks: how a block is named and sized, the
 * figure, the card and its popover, and offering blocks to buy. What capacity
 * is, what a block supports, and how blocks are priced live in the readme,
 * which this links to rather than repeats.
 */
export function CapacityBlocksGuideline() {
  return (
    <>
      <Guidance title="What capacity is">
        <p>
          Exalynt sells Engineering Capacity in fixed-price blocks, not hours: Flex, Core, and
          Dedicated. What a block is, what it supports, and how it&rsquo;s priced are in the
          readme&rsquo;s <ReadmeLink path={CAPACITY}>Engineering Capacity</ReadmeLink> page. This
          page covers how to show a block.
        </p>
        <p>
          <strong>It&rsquo;s for Exalynt&rsquo;s own tools.</strong> The portal shows clients the
          blocks they&rsquo;ve bought, where each one goes, and when it&rsquo;s worked on. Client
          products never show capacity.
        </p>
      </Guidance>

      <Example title="The three blocks">
        <Blocks />
      </Example>
      <Guidance title="Naming a block and its size">
        <ul>
          <li>
            <strong>By its name and &ldquo;block&rdquo;:</strong> &ldquo;Core block&rdquo;, from{" "}
            <code>CAPACITY_BLOCKS[type].name</code>. Never &ldquo;a 2-unit block&rdquo;.
          </li>
          <li>
            <strong>Its size as a share of an engineer&rsquo;s capacity,</strong> from{" "}
            <code>capacitySize</code>: &ldquo;About ½ of an engineer&rsquo;s capacity&rdquo;.
            Capacity is defined over a week, but a block speaks in capacity, never weeks. The
            fraction is one character (¼, ½, ¾), never spelled out or written 1/2, and the line is
            always muted, in <code>text.secondary</code>, under the block&rsquo;s name.
          </li>
          <li>
            <strong>Hours only as a sense of size.</strong> A block&rsquo;s{" "}
            <ReadmeLink path={`${CAPACITY}#blocks`}>effort reference</ReadmeLink> (~10, ~20, or ~40
            hours, from <code>referenceHours</code>) is approximate overall effort, not hours
            bought, reserved, or tracked. Show it only as the popover does, &ldquo;comparable to ~20
            hours of engineering focus, attention, and effort&rdquo;, with the reminder that the
            price is for the block. Never put it on the card, as a block&rsquo;s size, or counting
            down.
          </li>
          <li>
            <strong>Units only where the work is measured in them,</strong> such as an
            estimate&rsquo;s Low, Mid, and High range (see the readme&rsquo;s{" "}
            <ReadmeLink path="clients/project-estimates">Project estimates</ReadmeLink>) or an
            engineer&rsquo;s availability.
          </li>
          <li>
            <strong>Prices come from the app,</strong> which has them from the API or exalynt.com.
            This package doesn&rsquo;t hold them, so a price can&rsquo;t go stale here.
          </li>
        </ul>
      </Guidance>

      <Guidance title="The figure">
        <p>
          <code>CapacityFigure</code> pictures a block the way the readme does: one engineer, filled
          from the feet up by the block&rsquo;s share of their capacity. A capacity unit fills a
          quarter, so Flex fills to the knees, Core to the waist, and Dedicated the whole figure.
          It&rsquo;s decorative, so always put the block&rsquo;s name and size in words beside it.
        </p>
        <ul>
          <li>
            <strong>In the theme&rsquo;s colors:</strong> <code>primary.main</code> for a block
            that&rsquo;s the reader&rsquo;s, <code>text.secondary</code> for a choice they
            haven&rsquo;t picked yet. Never in the stability level colors, and never colored by a
            block&rsquo;s status.
          </li>
          <li>
            <strong>At a few fixed sizes:</strong> 48px tall on a card, 64px in the popover, and
            80px where comparing blocks is the point, such as choosing one to buy. Below 48px the
            quarters stop reading on their own: the one smaller size is 24px on{" "}
            <code>CapacityMiniCard</code>, where the badge beside it names the block. In a list row,
            write the name instead.
          </li>
          <li>
            <strong>One figure is one engineer&rsquo;s full capacity,</strong> never several blocks
            added up. Bookings on a schedule are a different picture.
          </li>
        </ul>
      </Guidance>

      <Guidance title="The card">
        <p>
          <code>CapacityBlock</code> is how a block appears wherever it is: waiting for a week, in
          its week on a schedule, or being moved. It shows the figure, the badge, and the size, then
          <code>children</code>, normally <code>CapacityPlacement</code> (the product and Focus
          it&rsquo;s on), and <code>footer</code> (who works on it, and when, or the way to schedule
          it).
        </p>
        <ul>
          <li>
            <strong>Everything lines up on the figure.</strong> The figure and every icon under it
            share one vertical axis, in every state. <code>CapacityPlacement</code> already does;
            build the <code>footer</code>, and any line of your own, from <code>CapacityLine</code>{" "}
            rather than an icon and text of your own, which would sit a few pixels off.
          </li>
          <li>
            <strong>The status has a row of its own,</strong> at the top right across from the drag
            handle or lock, so the figure, badge, and size below it keep the card&rsquo;s full
            width.
          </li>
          <li>
            <strong>One card per block.</strong> Three Core blocks are three cards, so each can go
            to its own product and week. Count them in a heading or a group&rsquo;s label instead.
          </li>
          <li>
            <strong>States are props, not colors of your own:</strong> <code>selected</code> when
            it&rsquo;s picked to act on, <code>scheduled</code> once it&rsquo;s in a week,{" "}
            <code>preview</code> for the dashed outline of where a dragged block will land, and{" "}
            <code>faded</code> on the block being dragged away.
          </li>
          <li>
            <strong>Its number, to refer to it by,</strong> goes in <code>number</code>
            (&ldquo;BLK-0042&rdquo;), small and muted at the top left. Show it wherever people talk
            about blocks one by one, the same number the mini card shows, and leave it out where
            nobody would, such as choosing blocks to buy.
          </li>
          <li>
            <strong>When it needs someone to act,</strong> pass <code>attention</code>: the kind of
            attention in a word or two (&ldquo;Unassigned&rdquo;, &ldquo;Overbooked&rdquo;), an icon
            for that kind, and a <code>hint</code> saying what&rsquo;s wrong and what would fix it.
            The card is edged and tinted in warning, the reason heads it, and it takes the place of
            the scheduled edge. Where the block can&rsquo;t go ahead as it&rsquo;s booked, such as
            overbooking its engineer&rsquo;s week, pass <code>severity: &quot;error&quot;</code> to
            edge and tint it in red instead; keep warning for what only needs seeing to, such as a
            block nobody&rsquo;s on. Give one reason, the most pressing, and only to the people who
            can act on it, such as Exalynt&rsquo;s admin views; it&rsquo;s a nudge, not a status, so
            the status stays in <code>badge</code>.
          </li>
          <li>
            <strong>Say why it can&rsquo;t move.</strong> Pass <code>onDragStart</code> and a{" "}
            <code>dragHint</code> where it can be dragged, and <code>locked</code> with the reason
            where it can&rsquo;t yet, such as its week having started.
          </li>
          <li>
            <strong>
              Status goes in <code>badge</code>,
            </strong>{" "}
            as a <code>CapacityStatus</code>, never as a tint on the card or the figure. A block is
            Available until it has a week, Scheduled once it has one, In progress during that week,
            and Fulfilled once its checkpoint is done. Each has its own icon and color: grey, blue,
            violet, and green, so Scheduled and In progress never look alike. None is in warning,
            which is kept for a block that needs attention. Show the icon and word, or just the icon
            with <code>iconOnly</code> where cards are narrow, such as four across or in a
            week&rsquo;s column.
          </li>
          <li>
            <strong>Related to something else,</strong> such as the blocks a Focus, a conversation,
            or progress came from, use <code>CapacityMiniCard</code>: its badge, week, status icon,
            engineer, and number, linking to the block&rsquo;s page. Leave out what the place
            already says, such as the engineer beside their own progress. Pass <code>details</code>{" "}
            where the reader may not know the block sizes, such as a client&rsquo;s view, so
            hovering the badge says how big it is.
          </li>
          <li>
            <strong>In running text,</strong> where even a mini card is too much, write the
            block&rsquo;s name in words (&ldquo;Core block&rdquo;, in <code>subtitle2</code>) and
            leave the figure out.
          </li>
        </ul>
      </Guidance>
      <CodeBlock
        code={`import { CapacityBlock, CapacityPlacement, CapacitySchedule } from "@exalynt/design/components";

<CapacityBlock
  block={capacity.type}
  scheduled={Boolean(capacity.week_starts_on)}
  locked={lockReason(capacity) ?? undefined}
  footer={<CapacitySchedule week={weekLabel(capacity)} onScheduleClick={openWeekPicker} />}
>
  <CapacityPlacement product={product?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />

      <Guidance title="Where it goes: product and Focus">
        <p>
          A block is bought for the organization, then put on one of its products, then, optionally,
          kept on one Focus from that product&rsquo;s board. <code>CapacityPlacement</code> shows
          where it is on that path as two lines that are always there, so a card never changes size
          as it moves along. Their icons are the portal&rsquo;s, so a product and a Focus look the
          same on a block as everywhere else: software in a window for a product, a target for a
          Focus, and the play circle of the board&rsquo;s Up next column.
        </p>
        <ul>
          <li>
            <strong>No product:</strong> the product line is the card&rsquo;s call to action,
            &ldquo;Assign product&rdquo; in the primary color, wherever the reader can assign one
            (pass <code>onProductClick</code>). Where they can&rsquo;t, it says &ldquo;No product
            yet&rdquo;. The Focus line stays in place, disabled, as &ldquo;Choose a Focus&rdquo;,
            since a Focus comes from a product&rsquo;s board, and the footer&rsquo;s Schedule waits,
            disabled, with a hint saying the block needs a product first. A disabled control always
            says why on hover.
          </li>
          <li>
            <strong>A product but no Focus:</strong> the block follows Up next, shown as &ldquo;Up
            next&rdquo; in the primary color and the Focus first there now (<code>upNext</code>).
            That&rsquo;s a fine way to leave a block, not a gap, so never show it as a warning or
            ask the client to choose.
          </li>
          <li>
            <strong>A Focus:</strong> its title, with the Focus icon. A Focus is a Focus, whatever
            it&rsquo;s about, so it has no icon of its own.
          </li>
          <li>
            <strong>Each change is the app&rsquo;s.</strong> <code>onProductClick</code> and{" "}
            <code>onFocusClick</code> hand over the line to anchor a picker to, such as{" "}
            <code>SearchSelect</code> in a popover. Leave them out once the block can&rsquo;t be
            changed, and say why with the card&rsquo;s <code>locked</code>.
          </li>
          <li>
            <strong>The organization, where blocks from several show together:</strong> in
            Exalynt&rsquo;s admin views, pass <code>organization</code> for a read-only line above
            the product, since a block never moves to another organization. Leave it out in a
            client&rsquo;s own view, where every block is theirs. Within one view, give it to every
            card or none, so the cards line up.
          </li>
          <li>
            <strong>Led by the organization,</strong> where whose block it is matters more than its
            size, such as an admin&rsquo;s list of blocks across clients: pass{" "}
            <code>organization</code> to <code>CapacityBlock</code> instead, with its name and logo.
            The organization&rsquo;s logo and name take the heading&rsquo;s place, under the number,
            with its initials where it has no logo, and the block&rsquo;s type moves to the bottom
            left, a small figure and its badge that open its size on hover. The logo and the figure
            keep to the icon column, so they line up with the icons between them. Leave{" "}
            <code>CapacityPlacement</code>&rsquo;s own <code>organization</code> out then, and use
            one layout or the other within a view.
          </li>
          <li>
            <strong>Status is separate:</strong> a block with no product is still
            &ldquo;Available&rdquo;. Don&rsquo;t invent a status such as &ldquo;No product&rdquo;;
            the product line already says it.
          </li>
        </ul>
      </Guidance>

      <Guidance title="Who works on it">
        <p>
          <code>CapacityEngineer</code> is the block&rsquo;s engineer, as the first line of its{" "}
          <code>footer</code>, and <code>CapacitySchedule</code> is when, under it. Who and when sit
          together under the hairline; what it&rsquo;s on stays above it. Each is optional, and each
          is read-only unless it&rsquo;s given its click handler.
        </p>
        <ul>
          <li>
            <strong>An assigned engineer is their picture and name,</strong> from an{" "}
            <code>EngineerProfile</code>, and the name opens <code>EngineerDetails</code> on hover,
            focus, or tap: their level, a short bio, and a link to their profile where the app has
            one. Without a picture, it shows their initials.
          </li>
          <li>
            <strong>In Exalynt&rsquo;s admin views,</strong> pass <code>onAssignClick</code>. With
            no engineer, the line is &ldquo;Assign engineer&rdquo; in the primary color; with one, a
            change button at the end of the line changes who, apart from the name, so a tap on a
            phone never opens the picker and the popover together. It hands over the line to anchor
            the app&rsquo;s picker to, such as <code>SearchSelect</code> in a popover.
          </li>
          <li>
            <strong>In a client&rsquo;s view,</strong> leave <code>onAssignClick</code> out. The
            line shows the engineer, with their popover, or &ldquo;No engineer yet&rdquo;, muted,
            and can&rsquo;t be changed.
          </li>
          <li>
            <strong>A name, not a status.</strong> A block with no engineer keeps its own status in{" "}
            <code>badge</code>; don&rsquo;t add one such as &ldquo;Unstaffed&rdquo;.
          </li>
          <li>
            <strong>When, the same way:</strong> pass <code>onScheduleClick</code> where the reader
            can choose a week. With no week, the line is &ldquo;Schedule&rdquo; in the primary
            color, disabled with a hint until the block is on a product (<code>onProduct</code>);
            with one, the week opens the app&rsquo;s picker to move it. Leave it out in a
            client&rsquo;s view, or once the week has started: the line shows the week, or
            &ldquo;Not scheduled yet&rdquo;, muted.
          </li>
          <li>
            <strong>Show only what the view needs.</strong> On a schedule, where the card sits under
            its week&rsquo;s heading, or in a list grouped by week, make the <code>footer</code> the
            engineer alone and leave the week line out. Where who doesn&rsquo;t matter yet, leave
            the engineer out; where neither does, leave the <code>footer</code> out, and the
            hairline goes with it. Within one view, give every card the same lines, so they line up.
          </li>
        </ul>
      </Guidance>
      <CodeBlock
        code={`import { CapacityBlock, CapacityEngineer, CapacitySchedule } from "@exalynt/design/components";

<CapacityBlock
  block={capacity.type}
  footer={
    <>
      <CapacityEngineer
        engineer={engineerProfile}
        onAssignClick={isAdmin ? (anchor) => openEngineerPicker(anchor) : undefined}
      />
      <CapacitySchedule week={weekLabel(capacity)} onScheduleClick={openWeekPicker} />
    </>
  }
>
  <CapacityPlacement product={product?.name ?? null} focus={focus?.name} upNext={next?.name} />
</CapacityBlock>`}
      />

      <Guidance title="What came of it">
        <p>
          Once a block has started, <code>CapacityProgress</code> is the last line of its{" "}
          <code>footer</code>, under who and when: each kind of progress that came of it as its icon
          and how many, said in words on hover, or &ldquo;No progress yet&rdquo;.
        </p>
        <ul>
          <li>
            <strong>In progress and Fulfilled only.</strong> A block waiting for its week has
            nothing to report, so leave the line out rather than saying &ldquo;No progress
            yet&rdquo; before it could have any.
          </li>
          <li>
            <strong>It opens the records, not a summary of them.</strong> Pass <code>onClick</code>{" "}
            to go to the block&rsquo;s progress, as <code>ProgressCard</code>s with the Focus each
            went to at its foot.
          </li>
        </ul>
      </Guidance>

      <Guidance title="The popover">
        <p>
          A block&rsquo;s name opens <code>CapacityDetails</code> on hover, keyboard focus, or tap:
          the block&rsquo;s figure and share of an engineer&rsquo;s capacity, the hours it&rsquo;s
          comparable to, one muted line saying the price is for the block, not hours, and a link to
          the readme&rsquo;s Engineering Capacity page. It&rsquo;s written for someone who
          doesn&rsquo;t know what a capacity unit is, so it never says &ldquo;unit&rdquo;. Keep it
          to that. What a block supports and how it&rsquo;s priced are the readme&rsquo;s to
          explain. Use <code>CapacityDetails</code> with <code>card={"{false}"}</code> where a page
          explains a block in a card of its own.
        </p>
      </Guidance>

      <Guidance title="Offering blocks to buy">
        <ul>
          <li>
            <strong>Show all three, smallest first,</strong> each with its figure at 80px, its name,
            and its price, with Core picked to start with, as the standard block. The readme&rsquo;s{" "}
            <ReadmeLink path={`${CAPACITY}#how-block-prices-are-set`}>prices section</ReadmeLink>{" "}
            explains why smaller blocks cost a little more per unit; don&rsquo;t restate it.
          </li>
          <li>
            <strong>Make it one choice,</strong> as a radio group of cards, with the unpicked
            blocks&rsquo; figures in <code>text.secondary</code>. Where only the name fits, such as
            a compact control in an estimate, use MUI&rsquo;s <code>ToggleButtonGroup</code>.
          </li>
          <li>
            <strong>Link to the readme</strong> for what a block is, rather than writing a paragraph
            about it in the dialog.
          </li>
        </ul>
      </Guidance>
    </>
  );
}
