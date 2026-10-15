import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { useId, useState, type MouseEvent, type ReactNode } from "react";
import { DateTime } from "../data-display/DateTime";
import type { EngineerProfile } from "../engineers/EngineerDetails";
import { ProgressKind } from "./ProgressKind";
import { PROGRESS_LOOK } from "./progressLook";
import { ProgressCapability, type ProgressCapabilityProps } from "./ProgressCapability";
import { ProgressFeature, type ProgressFeatureProps } from "./ProgressFeature";
import { ProgressLink, type ProgressLinkProps } from "./ProgressLink";
import { ProgressMedia, type ProgressMediaItem } from "./ProgressMedia";
import { ProgressMetric, type ProgressMetricProps } from "./ProgressMetric";
import type { ProgressKindId } from "./progress";
import { levelColor, STABILITY, STABILITY_LEVEL_IDS } from "../stability/stability";
import { UserAttribution, type UserProfile } from "../engineers/UserAttribution";

export type ProgressCardProps = {
  kind: ProgressKindId;
  /**
   * What happened, in the reporter's words. A record that only made
   * Capabilities more stable needs none: they show the levels they reached.
   */
  text?: string;
  /** When it was reported, as an RFC 3339 timestamp; shown as its day. */
  at: string;
  /** Who reported it. An engineer's name opens EngineerDetails. */
  by: UserProfile | EngineerProfile;
  /**
   * Where it came from, at the foot opposite who reported it, and closed,
   * opposite what it has: the block (CapacityTag) in a Focus's listing, or
   * the Focus in a block's. Leave out whatever the listing it's in already is.
   */
  source?: ReactNode;
  /** The Features it's about, of any kind. */
  features?: ProgressFeatureProps[];
  /** The Capabilities it's about, of any kind, and what it did to each, marked on their outlines. */
  capabilities?: ProgressCapabilityProps[];
  /** What was measured after the work, and before it where it was. */
  metrics?: ProgressMetricProps[];
  /** Pictures and recordings that show it. */
  media?: ProgressMediaItem[];
  /** Related things elsewhere, such as its pull request, a ticket, or a design; closed, it shows them too. */
  links?: Omit<ProgressLinkProps, "compact">[];
  /** Open at first. Closed, it's its kind and day, how much of each section it has, its links, and `source`. */
  defaultExpanded?: boolean;
};

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box component="section" aria-label={label}>
      <Box sx={{ mb: 0.75, fontSize: 12.5, fontWeight: 600, color: "text.secondary" }}>{label}</Box>
      {children}
    </Box>
  );
}

/* How a closed Functionality record sums up what it did to its Capabilities; one made more stable is said by the level it reached where there is one. */
const capabilityWord = (n: number) => (n === 1 ? "Capability" : "Capabilities");

const CHANGES: {
  change: NonNullable<ProgressCapabilityProps["change"]>;
  Icon: SvgIconComponent;
  color: string;
  /** How many it did it to, said with "Capability": "1 New Capability", "2 Capabilities retired". */
  say: (n: number) => string;
}[] = [
  {
    change: "added",
    Icon: AddCircleOutlineRoundedIcon,
    color: "primary.main",
    say: (n) => `${n} New ${capabilityWord(n)}`,
  },
  {
    change: "stabilized",
    Icon: VerifiedOutlinedIcon,
    color: "primary.main",
    say: (n) => `${n} ${capabilityWord(n)} made more stable`,
  },
  {
    change: "retired",
    Icon: RemoveCircleOutlineRoundedIcon,
    color: "text.disabled",
    say: (n) => `${n} ${capabilityWord(n)} retired`,
  },
];

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

type Content = {
  Icon: SvgIconComponent;
  /** A palette role, or a stability level's own color, as a Capability that reached it takes in its outline. */
  color?: string | ReturnType<typeof levelColor>;
  label: string;
};

/*
 * A closed record's Capabilities: for Functionality, how many it made new,
 * how many reached each level, in that level's color as their outlines
 * are, and how many it retired, each saying Capability ("1 Capability
 * reached Alpha"), then any it was only about; for the other kinds, how
 * many there are.
 */
function capabilityContents(
  kind: ProgressKindId,
  capabilities: ProgressCapabilityProps[],
): Content[] {
  const count = (list: ProgressCapabilityProps[]): Content[] =>
    list.length
      ? [
          {
            Icon: BoltOutlinedIcon,
            color: "primary.main",
            label: plural(list.length, "Capability", "Capabilities"),
          },
        ]
      : [];
  if (kind !== "functionality") return count(capabilities);
  const changed = CHANGES.flatMap(({ change, Icon, color, say }): Content[] => {
    const touched = capabilities.filter((capability) => capability.change === change);
    if (change !== "stabilized") {
      return touched.length ? [{ Icon, color, label: say(touched.length) }] : [];
    }
    /* One count per level reached, lowest first; made more stable for any without a level. */
    return [...STABILITY_LEVEL_IDS, undefined].flatMap((level): Content[] => {
      const n = touched.filter((capability) => capability.level === level).length;
      if (!n) return [];
      return level
        ? [
            {
              Icon,
              color: levelColor(level),
              label: `${n} ${capabilityWord(n)} reached ${STABILITY[level].name}`,
            },
          ]
        : [{ Icon, color, label: say(n) }];
    });
  });
  return [...changed, ...count(capabilities.filter((capability) => !capability.change))];
}

/* A closed record's links, inline, so one can be followed without opening it. */
function Links({ links }: { links: Omit<ProgressLinkProps, "compact">[] }) {
  if (!links.length) return null;
  return (
    <Box
      component="ul"
      aria-label="Links"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: 2,
        rowGap: 0.5,
        minWidth: 0,
        m: 0,
        p: 0,
        listStyle: "none",
      }}
    >
      {links.map((link) => (
        <Box component="li" key={link.url} sx={{ display: "flex", minWidth: 0, maxWidth: 280 }}>
          <ProgressLink {...link} compact />
        </Box>
      ))}
    </Box>
  );
}

/* What a closed record holds, as icons and counts: enough to know whether to open it. */
function Contents({ items }: { items: Content[] }) {
  if (!items.length) return null;
  return (
    <Box
      component="ul"
      aria-label="What it has"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: 2,
        rowGap: 0.5,
        m: 0,
        p: 0,
        listStyle: "none",
        fontSize: 13,
        color: "text.secondary",
      }}
    >
      {items.map(({ Icon, color, label }) => (
        <Box component="li" key={label} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Icon
            aria-hidden
            sx={[
              { fontSize: 16 },
              typeof color === "function" ? color : { color: color ?? "text.secondary" },
            ]}
          />
          {label}
        </Box>
      ))}
    </Box>
  );
}

/*
 * One record of progress: what came of work on a Focus within a block of
 * capacity. One column, so it reads the same on a phone: its kind and day,
 * what happened as its headline, then only the sections it has (the
 * Features and Capabilities it's about, what was measured, what shows it,
 * and links to related things), and at its foot who reported it and where
 * it came from. Edged in its
 * kind's color so a listing scans by kind. A record of a Capability made
 * more stable with no words of its own goes straight to its Capabilities.
 * It closes to its kind and day over how much of each section it has (for
 * Functionality, how many Capabilities it made New, how many reached each
 * level, and how many it Retired), its links, to follow without opening
 * it, and where it came from, so a listing reads at a glance, with its
 * words on hover. A click anywhere
 * on it opens or closes it, except on something of its own to click, such
 * as its kind or a picture; the chevron does the same from the keyboard.
 */
export function ProgressCard({
  kind,
  text,
  at,
  by,
  source,
  features = [],
  capabilities = [],
  metrics = [],
  media = [],
  links = [],
  defaultExpanded = false,
}: ProgressCardProps) {
  const { color } = PROGRESS_LOOK[kind];
  const [expanded, setExpanded] = useState(defaultExpanded);
  const bodyId = useId();
  const pictures = media.filter((item) => item.kind === "image").length;
  const videos = media.length - pictures;
  const contents = [
    features.length && {
      Icon: WidgetsOutlinedIcon,
      color: "secondary.main",
      label: plural(features.length, "Feature", "Features"),
    },
    ...capabilityContents(kind, capabilities),
    metrics.length && {
      Icon: InsightsOutlinedIcon,
      label: plural(metrics.length, "result", "results"),
    },
    pictures && { Icon: ImageOutlinedIcon, label: plural(pictures, "picture", "pictures") },
    videos && { Icon: VideocamOutlinedIcon, label: plural(videos, "video", "videos") },
  ].filter((item): item is Content => Boolean(item));

  const toggle = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    /* A popover or lightbox opened from it is portalled outside, but its clicks still bubble here. */
    if (!event.currentTarget.contains(target)) return;
    /* Something of its own to click, such as its kind, a mark, or a picture. */
    const own = target.closest("a, button, input, [role='button'], [tabindex]");
    if (own && own !== event.currentTarget) return;
    /* Selecting its words to copy them. */
    if (window.getSelection()?.toString()) return;
    setExpanded(!expanded);
  };

  return (
    <Tooltip
      title={expanded ? "" : (text ?? "")}
      placement="top-start"
      describeChild
      slotProps={{ tooltip: { sx: { maxWidth: 420, fontSize: 13, lineHeight: 1.5 } } }}
    >
      <Card
        component="article"
        onClick={toggle}
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          borderLeft: 3,
          borderLeftColor: `${color}.main`,
          cursor: "pointer",
          transition: "border-color 120ms",
          "&:hover": {
            borderColor: "text.disabled",
            borderLeftColor: `${color}.main`,
            "& .chevron": { color: "text.secondary" },
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ProgressKind kind={kind} />
          <Box sx={{ ml: "auto", fontSize: 12.5, color: "text.secondary" }}>
            <DateTime value={at} dateOnly />
          </Box>
          {/* Muted until the card is hovered: the whole card is what's clicked. */}
          <IconButton
            className="chevron"
            size="small"
            aria-expanded={expanded}
            aria-controls={bodyId}
            aria-label={expanded ? "Show less" : "Show all of it"}
            onClick={() => setExpanded(!expanded)}
            sx={{ mr: -0.75, color: "text.disabled", transition: "color 120ms" }}
          >
            <ExpandMoreRoundedIcon
              sx={{
                transition: "transform 150ms",
                transform: expanded ? "rotate(180deg)" : "none",
              }}
            />
          </IconButton>
        </Box>

        {/*
         * Closed and open are each wholly inside a Collapse, sharing its
         * timing, so one shrinks as the other grows and nothing outside them
         * changes height in a single frame. Padding, not margin, so the
         * Collapse measures all of it.
         */}
        <Collapse in={!expanded}>
          {contents.length || links.length || source ? (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: links.length ? "flex-end" : "center",
                columnGap: 2,
                rowGap: 1,
                pt: 1.25,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, minWidth: 0 }}>
                <Contents items={contents} />
                <Links links={links} />
              </Box>
              {source ? <Box sx={{ ml: "auto", minWidth: 0, fontSize: 14 }}>{source}</Box> : null}
            </Box>
          ) : null}
        </Collapse>

        <Collapse in={expanded} id={bodyId}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1.5 }}>
            {text ? (
              <Box sx={{ fontSize: 16, lineHeight: 1.55, overflowWrap: "anywhere" }}>{text}</Box>
            ) : null}
            {features.length ? (
              <Section label="Features">
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {features.map((feature) => (
                    <ProgressFeature key={feature.name} {...feature} />
                  ))}
                </Box>
              </Section>
            ) : null}

            {capabilities.length ? (
              <Section label="Capabilities">
                {/* Room above each row for the change named in a card's outline. */}
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", columnGap: 1, rowGap: 1.75, pt: 0.75 }}
                >
                  {capabilities.map((capability) => (
                    <ProgressCapability key={capability.name} {...capability} />
                  ))}
                </Box>
              </Section>
            ) : null}

            {metrics.length ? (
              <Section label="Results">
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: 1,
                  }}
                >
                  {metrics.map((metric) => (
                    <ProgressMetric key={metric.name} {...metric} />
                  ))}
                </Box>
              </Section>
            ) : null}

            {media.length ? (
              <Section label="See it">
                <ProgressMedia items={media} />
              </Section>
            ) : null}

            {links.length ? (
              <Section label="Links">
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {links.map((link) => (
                    <ProgressLink key={link.url} {...link} />
                  ))}
                </Box>
              </Section>
            ) : null}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                columnGap: 2,
                rowGap: 1,
                pt: 1.5,
                borderTop: 1,
                borderColor: "divider",
                fontSize: 14,
              }}
            >
              <UserAttribution user={by} details />
              {source ? <Box sx={{ ml: "auto", minWidth: 0 }}>{source}</Box> : null}
            </Box>
          </Box>
        </Collapse>
      </Card>
    </Tooltip>
  );
}
