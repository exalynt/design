import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import type { ReactNode } from "react";
import { DateTime } from "./DateTime";
import { EngineerAvatar } from "./EngineerAvatar";
import { ProgressKind } from "./ProgressKind";
import { PROGRESS_LOOK } from "./progressLook";
import { ProgressCapability, type ProgressCapabilityProps } from "./ProgressCapability";
import { ProgressMedia, type ProgressMediaItem } from "./ProgressMedia";
import { ProgressMetric, type ProgressMetricProps } from "./ProgressMetric";
import type { ProgressKindId } from "./progress";

export type ProgressCardProps = {
  kind: ProgressKindId;
  /**
   * What happened, in the reporter's words. A `capability_stabilized` record
   * needs none: its Capabilities show the levels they reached.
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
  /** The Capabilities it's about, and what it did to each, marked on their outlines. */
  capabilities?: ProgressCapabilityProps[];
  /** What was measured before and after. */
  metrics?: ProgressMetricProps[];
  /** Pictures and recordings that show it. */
  media?: ProgressMediaItem[];
};

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box component="section" aria-label={label}>
      <Box sx={{ mb: 0.75, fontSize: 12.5, fontWeight: 600, color: "text.secondary" }}>{label}</Box>
      {children}
    </Box>
  );
}

/*
 * One record of progress: what came of work on a Focus within a block of
 * capacity. One column, so it reads the same on a phone: its kind and day,
 * what happened as its headline, then only the sections it has (the
 * Capabilities it touched, what was measured, and what shows it), and at
 * its foot who reported it and where it came from. Edged in its kind's color
 * so a listing scans by kind. A record of a Capability made more stable with
 * no words of its own goes straight to its Capabilities.
 */
export function ProgressCard({
  kind,
  text,
  at,
  by,
  source,
  capabilities = [],
  metrics = [],
  media = [],
}: ProgressCardProps) {
  const { color } = PROGRESS_LOOK[kind];

  return (
    <Card
      component="article"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        borderLeft: 3,
        borderLeftColor: `${color}.main`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ProgressKind kind={kind} />
        <Box sx={{ ml: "auto", fontSize: 12.5, color: "text.secondary" }}>
          <DateTime value={at} dateOnly />
        </Box>
      </Box>

      {text ? (
        <Box sx={{ fontSize: 16, lineHeight: 1.55, overflowWrap: "anywhere" }}>{text}</Box>
      ) : null}

      {capabilities.length ? (
        <Section label={capabilities.length === 1 ? "Capability" : "Capabilities"}>
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
          <EngineerAvatar name={by.name} src={by.avatarUrl} size={20} />
          <Box component="span" sx={{ fontWeight: 600 }}>
            {by.name}
          </Box>
        </Box>
        {source ? <Box sx={{ ml: "auto", minWidth: 0 }}>{source}</Box> : null}
      </Box>
    </Card>
  );
}
