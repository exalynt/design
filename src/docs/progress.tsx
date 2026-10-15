// Sample progress for the page's demos: one Focus's work over two weeks of
// capacity, a record of each kind.

import type { ProgressCardProps } from "../components";
import { CapacityTag } from "../components/CapacityTag";
import { FocusRef } from "./FocusRef";

/* Served from public/, which the package leaves out. */
const media = (file: string) => `${import.meta.env.BASE_URL}progress/${file}`;

const LENA = { name: "Lena Brooks" };
const AVERY = { name: "Avery Chen" };

/* The block a record came from, as a Focus's listing shows it. */
const block = (number: string) => <CapacityTag block="core" number={number} details />;

export type SampleProgress = ProgressCardProps & { id: string; block: string; focus: string };

export const SAMPLE_PROGRESS: SampleProgress[] = [
  {
    id: "p5",
    block: "BLK-0042",
    focus: "Signing for deliveries",
    kind: "capability_stabilized",
    at: "2026-10-09T16:20:00Z",
    by: LENA,
    capabilities: [
      { name: "Sign for a delivery", change: "stabilized", from: "prototype", level: "alpha" },
    ],
  },
  {
    id: "p4",
    block: "BLK-0043",
    focus: "Signing for deliveries",
    kind: "capability_added",
    text: "Drivers can leave a photo of where a delivery was left when nobody's there to sign.",
    at: "2026-10-08T15:05:00Z",
    by: AVERY,
    capabilities: [
      { name: "Leave a photo when nobody signs", change: "added", level: "prototype" },
    ],
    media: [
      {
        kind: "image",
        url: media("routes-after.svg"),
        name: "The photo step after a missed signature",
      },
    ],
  },
  {
    id: "p3",
    block: "BLK-0042",
    focus: "Signing for deliveries",
    kind: "improvement",
    text: "Signing works with gloves on and without signal; it sends once the phone reconnects.",
    at: "2026-10-07T18:40:00Z",
    by: LENA,
    capabilities: [{ name: "Sign for a delivery", level: "prototype" }],
    metrics: [
      { name: "Signatures that fail to send", before: "About 1 in 10", after: "None in a week" },
      { name: "Time to sign", before: "12 seconds", after: "4 seconds" },
    ],
    media: [
      {
        kind: "video",
        url: media("signing-offline.mp4"),
        name: "Signing with no signal",
        poster: media("routes-before.svg"),
      },
      { kind: "image", url: media("routes-before.svg"), name: "The old signature box" },
    ],
  },
  {
    id: "p2",
    block: "BLK-0042",
    focus: "Signing for deliveries",
    kind: "capability_retired",
    text: "The paper delivery slip is gone: every delivery is signed in the app, so drivers carry nothing and the office stops typing slips in.",
    at: "2026-10-06T14:00:00Z",
    by: LENA,
    capabilities: [{ name: "Print a delivery slip", change: "retired" }],
    metrics: [{ name: "Slips typed in by the office", before: "About 60 a day", after: "None" }],
  },
  {
    id: "p1",
    block: "BLK-0038",
    focus: "Signing for deliveries",
    kind: "clarity",
    text: "The signature box is too small for gloves, and the app gives up without signal. Nobody being there to sign has no answer at all.",
    at: "2026-10-01T17:30:00Z",
    by: LENA,
    capabilities: [{ name: "Sign for a delivery", level: "prototype" }],
  },
];

/* A record as a Focus's listing shows it: the block it came from at its foot. */
export function onFocus(record: SampleProgress): ProgressCardProps {
  return { ...record, source: block(record.block) };
}

/* A record as a block's listing shows it: the Focus it went to at its foot. */
export function onBlock(record: SampleProgress): ProgressCardProps {
  return { ...record, source: <FocusRef title={record.focus} /> };
}
