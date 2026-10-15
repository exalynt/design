import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { useId, useState, type ReactNode } from "react";
import { DateTime } from "./DateTime";
import { UserAvatar } from "./UserAvatar";
import { ProgressKind } from "./ProgressKind";
import { PROGRESS_LOOK } from "./progressLook";
import { ProgressCapability, type ProgressCapabilityProps } from "./ProgressCapability";
import { ProgressFeature, type ProgressFeatureProps } from "./ProgressFeature";
import { ProgressMedia, type ProgressMediaItem } from "./ProgressMedia";
import { ProgressMetric, type ProgressMetricProps } from "./ProgressMetric";
import type { ProgressKindId } from "./progress";

export type ProgressCardProps = {
  kind: ProgressKindId;
  /**
   * What happened, in the reporter's words. A record that only made
   * Capabilities more stable needs none: they show the levels they reached.
   */
  text?: string;
  /** When it was reported, as an RFC 3339 timestamp; shown as its day. */
  at: string;
  /** Who reported it. */
  by: { name: string; avatarUrl?: string };
  /**
   * Where it came from, at the foot opposite who reported it: the block
   * (CapacityTag) in a Focus's listing, or the Focus in a block's. Leave out
   * whatever the listing it's in already is.
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
  /** Open at first. Closed, it's its kind, day, and headline, and how much of each section it has. */
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

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

type Content = { Icon: SvgIconComponent; color?: string; label: string };

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
          <Icon aria-hidden sx={{ fontSize: 16, color: color ?? "text.secondary" }} />
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
 * Features and Capabilities it's about, what was measured, and what shows
 * it), and at its foot who reported it and where it came from. Edged in its
 * kind's color so a listing scans by kind. A record of a Capability made
 * more stable with no words of its own goes straight to its Capabilities.
 * It closes to its kind, day, and headline cut to two lines, over how much
 * of each section it has, so a listing reads at a glance; the chevron, or a
 * click on the closed card, opens it.
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
  defaultExpanded = false,
}: ProgressCardProps) {
  const { color } = PROGRESS_LOOK[kind];
  const [expanded, setExpanded] = useState(defaultExpanded);
  const bodyId = useId();
  /* Closed and without words of its own, it's headed by its Capabilities' names. */
  const headline = text ?? capabilities.map((capability) => capability.name).join(", ");
  const pictures = media.filter((item) => item.kind === "image").length;
  const videos = media.length - pictures;
  const contents = [
    features.length && {
      Icon: WidgetsOutlinedIcon,
      color: "secondary.main",
      label: plural(features.length, "Feature", "Features"),
    },
    capabilities.length && {
      Icon: BoltOutlinedIcon,
      color: "primary.main",
      label: plural(capabilities.length, "Capability", "Capabilities"),
    },
    metrics.length && {
      Icon: InsightsOutlinedIcon,
      label: plural(metrics.length, "result", "results"),
    },
    pictures && { Icon: ImageOutlinedIcon, label: plural(pictures, "picture", "pictures") },
    videos && { Icon: VideocamOutlinedIcon, label: plural(videos, "video", "videos") },
  ].filter((item): item is Content => Boolean(item));

  return (
    <Card
      component="article"
      onClick={expanded ? undefined : () => setExpanded(true)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        borderLeft: 3,
        borderLeftColor: `${color}.main`,
        cursor: expanded ? undefined : "pointer",
        transition: "border-color 120ms",
        "&:hover": expanded
          ? undefined
          : { borderColor: "text.disabled", borderLeftColor: `${color}.main` },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {/* Its popover opens on its own, without opening the card. */}
        <Box onClick={(event) => event.stopPropagation()} sx={{ display: "flex" }}>
          <ProgressKind kind={kind} />
        </Box>
        <Box sx={{ ml: "auto", fontSize: 12.5, color: "text.secondary" }}>
          <DateTime value={at} dateOnly />
        </Box>
        <IconButton
          size="small"
          aria-expanded={expanded}
          aria-controls={bodyId}
          aria-label={expanded ? "Show less" : "Show all of it"}
          onClick={(event) => {
            event.stopPropagation();
            setExpanded(!expanded);
          }}
          sx={{ mr: -0.75 }}
        >
          <ExpandMoreRoundedIcon
            sx={{ transition: "transform 150ms", transform: expanded ? "rotate(180deg)" : "none" }}
          />
        </IconButton>
      </Box>

      {(expanded ? text : headline) ? (
        <Box
          sx={[
            { mt: 1.5, fontSize: 16, lineHeight: 1.55, overflowWrap: "anywhere" },
            expanded
              ? false
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                },
          ]}
        >
          {expanded ? text : headline}
        </Box>
      ) : null}

      <Collapse in={!expanded} unmountOnExit>
        {contents.length ? (
          <Box sx={{ pt: 1.25 }}>
            <Contents items={contents} />
          </Box>
        ) : null}
      </Collapse>

      <Collapse in={expanded} id={bodyId}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
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
              <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 1, rowGap: 1.75, pt: 0.75 }}>
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
              <UserAvatar name={by.name} src={by.avatarUrl} size={20} />
              <Box component="span" sx={{ fontWeight: 600 }}>
                {by.name}
              </Box>
            </Box>
            {source ? <Box sx={{ ml: "auto", minWidth: 0 }}>{source}</Box> : null}
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
}
