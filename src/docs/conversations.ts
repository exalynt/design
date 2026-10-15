// A sample conversation for the page's demos.

import type {
  ConversationAttachment,
  MentionProfile,
  OrganizationProfile,
  UserProfile,
} from "../components";
import { MARCUS, PRIYA } from "./engineers";

export type SampleMessage = {
  id: string;
  author: UserProfile;
  /** Who they wrote on behalf of: Exalynt, or the client. */
  organization: OrganizationProfile;
  at: string;
  body: string;
  attachments?: ConversationAttachment[];
};

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/*
 * Files attached to a demo's reply, as if uploaded: each at a local address
 * for as long as the page is open, since there's no server to send them to.
 */
export function sentAttachments(files: File[]): ConversationAttachment[] {
  return files.map((file) => {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) return { kind: "image", url, name: file.name };
    if (file.type.startsWith("video/")) return { kind: "video", url, name: file.name };
    return { kind: "document", url, name: file.name, size: file.size };
  });
}

/* Exalynt, with its logo, and a client without one, so its initials show. */
export const EXALYNT: OrganizationProfile = {
  name: "Exalynt",
  logoUrl: asset("conversations/exalynt-logo.svg"),
};
export const CLIENT: OrganizationProfile = { name: "Acme Logistics" };

/*
 * A message's organization, whether it's ours, and whether it's the
 * reader's own: the demos read as Marcus at Exalynt, so Exalynt's messages
 * are tinted, and his own sit on the right.
 */
export function sideOf(message: SampleMessage) {
  return {
    organization: message.organization,
    ours: message.organization === EXALYNT,
    mine: message.author === YOU,
  };
}

const DANA: MentionProfile = { id: "usr_dana", name: "Dana Ortiz" };
const SAM: MentionProfile = { id: "usr_sam", name: "Sam Okafor" };
const PRIYA_USER: MentionProfile = { id: "usr_priya", ...PRIYA };
const MARCUS_USER: MentionProfile = { id: "usr_marcus", ...MARCUS };

/* Who's reading the demos' conversations, at Exalynt, and everyone who can be mentioned in them. */
export const YOU = MARCUS_USER;
export const PEOPLE = [DANA, PRIYA_USER, MARCUS_USER, SAM];

/* Oldest first. */
export const SAMPLE_MESSAGES: SampleMessage[] = [
  {
    id: "msg-1",
    author: DANA,
    organization: CLIENT,
    at: "2026-10-13T15:04:00Z",
    attachments: [
      { kind: "image", url: asset("progress/routes-before.svg"), name: "The plan page today" },
      {
        kind: "video",
        url: asset("progress/signing-offline.mp4"),
        name: "Switching plans at renewal",
        poster: asset("progress/routes-after.svg"),
      },
      {
        kind: "document",
        url: asset("conversations/annual-renewals.csv"),
        name: "annual-renewals.csv",
        size: 186,
      },
    ],
    body: "Customers on annual plans are asking whether they can switch to monthly at renewal. Can we let them, and what happens to the discount they had?\n\nWe'd like it before the November renewals go out.",
  },
  {
    id: "msg-2",
    author: PRIYA_USER,
    organization: EXALYNT,
    at: "2026-10-13T17:21:00Z",
    body: "Yes. Switching at renewal is the easy case, since there's nothing to prorate. The discount would drop off with the annual plan. <@usr_sam>, does finance want it kept for a first monthly period?",
  },
  {
    id: "msg-3",
    author: MARCUS_USER,
    organization: EXALYNT,
    at: "2026-10-13T18:02:00Z",
    body: "I'll have the switch ready for the November renewals either way, so it's only the discount to settle.",
  },
  {
    id: "msg-4",
    author: SAM,
    organization: CLIENT,
    at: "2026-10-14T09:12:00Z",
    body: "<@usr_marcus>, finance would rather it drop off. Keeping it makes the first invoice look different from every one after.",
  },
];

/* Long enough to be cut short, as a message that sets out a whole plan is. */
export const LONG_MESSAGES: SampleMessage[] = [
  {
    id: "msg-long-1",
    author: PRIYA_USER,
    organization: EXALYNT,
    at: "2026-10-14T10:40:00Z",
    body: "Here's how the switch would work at renewal, step by step, so finance can check it before we build it.\n\n1. Thirty days before renewal, the customer gets the usual reminder, now with a choice of annual or monthly.\n2. If they pick monthly, nothing changes until the annual term ends.\n3. On the renewal date, the annual plan ends and the monthly one starts the same day, so there's no gap and nothing to prorate.\n4. The annual discount stops with the annual plan. The first monthly invoice is at the full monthly price.\n5. The confirmation email says what they'll pay each month from then on.\n6. Anyone who changes their mind can switch back to annual at any time, and the discount comes back from their next renewal.\n\nThe one open question is step 4: whether finance wants a first month at the discounted rate to soften the change. Everything else is ready to start on Monday.",
  },
  {
    id: "msg-long-2",
    author: DANA,
    organization: CLIENT,
    at: "2026-10-14T13:05:00Z",
    body: "Thanks, this is what we needed. A few notes from our side before you start:\n\n- Step 1: support would like the reminder to link straight to the plan page, not the account home.\n- Step 3: some customers renew on the 29th to the 31st. Can monthly bill on the same day each month, or the last day where a month is shorter?\n- Step 4: finance agrees with dropping the discount. No first month at the old rate.\n- Step 6: we'd rather not bring the discount back automatically. Can switching back be a request to support for now?\n\nIf those are fine, Monday works for us. We'll tell the support team on Friday so they're ready for questions.",
  },
];
