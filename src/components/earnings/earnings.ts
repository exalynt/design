// Earnings: a line item saying what someone is paid for one piece of work, and
// why. People collect earnings, and a payout pays out many of them at once. The
// kinds, types, and statuses are worded here, and the app decides which applies.
// How the money works, and the rates, are the readme's (earningDocsUrl), so an
// earning carries its own figures, as they were fixed, and this never works them
// out from today's.

import type { CapacityBlockId } from "../capacity/capacity";
import { formatMoney } from "../data-display/money";

const README_URL = "https://readme.exalynt.com";
const OPERATIONS_DOCS_URL = `${README_URL}/engineers/compensation#operations-compensation`;

export const EARNING_KIND_IDS = ["engineering_capacity", "operational_responsibility"] as const;

export type EarningKindId = (typeof EARNING_KIND_IDS)[number];

/* What was sold: blocks of capacity, or keeping a product running. */
export const EARNING_KINDS: Record<
  EarningKindId,
  { id: EarningKindId; name: string; description: string; docsUrl: string }
> = {
  engineering_capacity: {
    id: "engineering_capacity",
    name: "Engineering Capacity",
    description:
      "Building and changing software, in blocks a client buys. Each earning is a share of a block's payout basis.",
    docsUrl: `${README_URL}/engineers/compensation#how-a-payout-is-calculated`,
  },
  operational_responsibility: {
    id: "operational_responsibility",
    name: "Operational Responsibility",
    description:
      "Keeping a client's product running in production, on a monthly operations plan. Each earning is a share of a month's payout basis.",
    docsUrl: OPERATIONS_DOCS_URL,
  },
};

export const EARNING_TYPE_IDS = [
  "individual_fulfillment",
  "team_support",
  "team_lead",
  "partner_share",
  "team_ownership",
] as const;

export type EarningTypeId = (typeof EARNING_TYPE_IDS)[number];

/*
 * Why this person is paid for it: its name, what the percentage they earn is called,
 * where the readme explains it, and what it pays for under each kind it goes under,
 * which are the kinds it has a description for. Team Lead goes under both, and pays
 * for different things in each. The rates are the readme's.
 */
export const EARNING_TYPES: Record<
  EarningTypeId,
  {
    id: EarningTypeId;
    name: string;
    shareName: string;
    descriptions: Partial<Record<EarningKindId, string>>;
    docsUrl: string;
  }
> = {
  individual_fulfillment: {
    id: "individual_fulfillment",
    name: "Individual Fulfillment",
    shareName: "Engineer Share",
    descriptions: {
      engineering_capacity:
        "For a block you fulfill: a share of its payout basis, earned when the block is approved.",
    },
    docsUrl: `${README_URL}/engineers/compensation#how-a-payout-is-calculated`,
  },
  team_support: {
    id: "team_support",
    name: "Team Support",
    shareName: "Team Support Share",
    descriptions: {
      engineering_capacity:
        "For being available to your team: when a teammate fulfills a block in a week you have availability, you earn a share of its payout basis. There's nothing to track or claim.",
    },
    docsUrl: `${README_URL}/engineers/compensation#team-support`,
  },
  team_lead: {
    id: "team_lead",
    name: "Team Lead",
    shareName: "Team Lead Share",
    descriptions: {
      engineering_capacity:
        "For leading your team: a share of the payout basis of every block a teammate on it fulfills. Your own blocks pay you their Individual Fulfillment, not this.",
      operational_responsibility:
        "For coordinating your team's ownership of a product in production: its handoffs, escalation, and who responds, as a share of each month's payout basis.",
    },
    docsUrl: `${README_URL}/engineers/team-lead#how-a-team-lead-is-paid`,
  },
  partner_share: {
    id: "partner_share",
    name: "Partner Share",
    shareName: "Partner Share",
    descriptions: {
      engineering_capacity:
        "For introducing a client: a share of the payout basis of the blocks they buy during their earning window, earned as each one is fulfilled.",
    },
    docsUrl: `${README_URL}/business/partnerships#how-partnership-earnings-work`,
  },
  team_ownership: {
    id: "team_ownership",
    name: "Team Ownership",
    shareName: "Team Ownership Share",
    descriptions: {
      operational_responsibility:
        "For your team being accountable for a product in production, including routine care. It follows the responsibility, not the incidents, so a quiet month pays the same as a hard one.",
    },
    docsUrl: OPERATIONS_DOCS_URL,
  },
};

/** The kinds a type goes under, in the order they're listed. */
export function earningTypeKinds(type: EarningTypeId): EarningKindId[] {
  return EARNING_KIND_IDS.filter((kind) => kind in EARNING_TYPES[type].descriptions);
}

/** Where the readme explains a type, under one of its kinds. */
export function earningTypeDocsUrl(type: EarningTypeId, kind?: EarningKindId): string {
  return kind === "operational_responsibility" ? OPERATIONS_DOCS_URL : EARNING_TYPES[type].docsUrl;
}

/*
 * How far an earning has come, in order. Upcoming is what we know is coming and
 * nobody has earned yet: a block that's assigned and not fulfilled, or a month of
 * a product that hasn't ended.
 */
export const EARNING_STATUS_IDS = ["upcoming", "earned", "sent", "paid"] as const;

export type EarningStatusId = (typeof EARNING_STATUS_IDS)[number];

export const EARNING_STATUSES: Record<
  EarningStatusId,
  { id: EarningStatusId; name: string; description: string }
> = {
  upcoming: {
    id: "upcoming",
    name: "Upcoming",
    description: "Expected, and not earned yet. The amount is approximate until it is.",
  },
  earned: {
    id: "earned",
    name: "Earned",
    description: "Earned, and waiting to go out in a payout.",
  },
  sent: {
    id: "sent",
    name: "Sent",
    description: "On its way in a payout, and hasn't arrived yet.",
  },
  paid: { id: "paid", name: "Paid", description: "Arrived in a payout." },
};

/** The payout an earning went out in. */
export type EarningPayout = {
  /** When it was sent, as the app words it: "Oct 9". */
  sentOn: string;
  /** When it arrived, as the app words it. Until then, the earning is Sent rather than Paid. */
  arrivedOn?: string;
  /** The payout's own page. An app's router link works where its theme sets one on MuiLink. */
  href: string;
};

type EarningFigures = {
  id: string;
  /** What it pays, in cents, as the API has it. */
  amountCents: number;
  /** What the percentage is of: the payout basis as it was fixed, in cents. */
  basisCents: number;
  /** The percentage earned, in hundredths of a percent, as the API has it: 6000 is 60%. */
  percentBasisPoints: number;
  /** The ISO 4217 code its amounts are in. */
  currency?: string;
  /**
   * The time it's for, as a date range the app words the same way for every earning,
   * a week or a month alike: "Sep 21–27", "Sep 1–30".
   */
  period: string;
  /** When it was earned, as the app words it: "Oct 2". Without it, it's still upcoming. */
  earnedOn?: string;
  /** The payout it went out in. Without one, it hasn't been sent. */
  payout?: EarningPayout;
};

/* A block of capacity. */
export type CapacityEarning = EarningFigures & {
  kind: "engineering_capacity";
  type: "individual_fulfillment" | "team_support" | "team_lead" | "partner_share";
  block: CapacityBlockId;
  /** Its number: "BLK-1181". */
  number: string;
  /** The client organization. */
  organization: string;
  /** Who fulfills it, where that isn't the reader. */
  fulfilledBy?: string;
  /** The Engineering Team it's fulfilled on. */
  team?: string;
};

/* A month of a product on an operations plan. */
export type OperationalEarning = EarningFigures & {
  kind: "operational_responsibility";
  type: "team_ownership" | "team_lead";
  /** Its operations plan's name: "Essential". */
  plan: string;
  /** The client organization. */
  organization: string;
  product: string;
  /** The month it's for, as a sentence says it: "October". */
  month: string;
  /** The Engineering Team that owns the product. */
  team?: string;
};

export type Earning = CapacityEarning | OperationalEarning;

/** How the money works for this earning, on the readme. */
export function earningDocsUrl(earning: Earning): string {
  return earningTypeDocsUrl(earning.type, earning.kind);
}

/** How far it's come, from what's on it, so the word and the facts can't disagree. */
export function earningStatus({ earnedOn, payout }: Earning): EarningStatusId {
  if (payout) return payout.arrivedOn ? "paid" : "sent";
  return earnedOn ? "earned" : "upcoming";
}

/** A percentage in hundredths of a percent as the reader reads it: 6000 is "60%", 550 "5.5%". */
export function formatEarningShare(percentBasisPoints: number): string {
  return `${percentBasisPoints / 100}%`;
}

/** What it pays, for the reader. Upcoming is approximate until it's earned: "~$4,200.00". */
export function formatEarningAmount(earning: Earning): string {
  const amount = formatMoney(earning.amountCents, { currency: earning.currency });
  return earningStatus(earning) === "upcoming" ? `~${amount}` : amount;
}

/** What some earnings come to, in cents. */
export function earningsTotal(earnings: Earning[]): number {
  return earnings.reduce((total, earning) => total + earning.amountCents, 0);
}

/** "1 earning", "6 earnings". */
export function earningsCount(count: number): string {
  return `${count} ${count === 1 ? "earning" : "earnings"}`;
}

function capacityReason(earning: CapacityEarning) {
  const { type, organization, team } = earning;
  const upcoming = earningStatus(earning) === "upcoming";
  if (type === "partner_share") {
    return `${organization}, a client your partnership introduced, bought this block inside its earning window.`;
  }
  if (type === "individual_fulfillment") {
    return upcoming ? "You're assigned this block." : "You fulfilled this block.";
  }
  if (type === "team_support") {
    const who = earning.fulfilledBy ?? "A teammate";
    return upcoming
      ? `${who} is assigned this block, in a week you're available.`
      : `${who} fulfilled this block in a week you were available.`;
  }
  const led = team ? `${team}, the team you lead` : "the team you lead";
  const who = earning.fulfilledBy ?? "A teammate";
  return upcoming
    ? `${who} is assigned this block on ${led}.`
    : `${who} fulfilled this block on ${led}.`;
}

function operationalReason(earning: OperationalEarning) {
  const { type, product, month, team } = earning;
  const upcoming = earningStatus(earning) === "upcoming";
  if (type === "team_lead") {
    const owning = `${team ? `${team}'s` : "your team's"} ownership of ${product} in ${month}`;
    return upcoming ? `You're coordinating ${owning}.` : `You coordinated ${owning}.`;
  }
  const owner = team ? `Your team, ${team},` : "Your team";
  return `${owner} ${upcoming ? "is" : "was"} accountable for ${product} in production in ${month}.`;
}

/**
 * Why the reader is paid this, in a sentence, from what's on the earning: the
 * question an earning is there to answer.
 */
export function earningReason(earning: Earning): string {
  return earning.kind === "engineering_capacity"
    ? capacityReason(earning)
    : operationalReason(earning);
}
