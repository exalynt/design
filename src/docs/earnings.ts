// Made-up earnings for the page's demos. Capacity figures follow the readme's
// published bases and shares; operations amounts aren't set yet, so those use the
// admin revenue model's placeholder percentages of the Essential plan.

import type { CapacityEarning, Earning, EarningPayout, OperationalEarning } from "../components";

const BASIS = { flex: 175000, core: 350000, dedicated: 700000 };

const SHARE = { engineer: 6000, support: 300, lead: 500, partner: 500 };

/* Each share rounded to the nearest cent on its own, as the API does. */
function amount(basisCents: number, percentBasisPoints: number) {
  return Math.round((basisCents * percentBasisPoints) / 10000);
}

function capacity(earning: Omit<CapacityEarning, "kind" | "amountCents" | "basisCents">): Earning {
  const basisCents = BASIS[earning.block];
  return {
    ...earning,
    kind: "engineering_capacity",
    basisCents,
    amountCents: amount(basisCents, earning.percentBasisPoints),
  };
}

function operational(
  earning: Omit<OperationalEarning, "kind" | "amountCents" | "basisCents" | "plan">,
): Earning {
  const basisCents = 39900;
  return {
    ...earning,
    kind: "operational_responsibility",
    plan: "Essential",
    basisCents,
    amountCents: amount(basisCents, earning.percentBasisPoints),
  };
}

/* Each link goes to PayoutStatement's page, standing in for the payout's own. */
const OCT_9: EarningPayout = { sentOn: "Oct 9", arrivedOn: "Oct 12", href: "#PayoutStatement" };
const OCT_30: EarningPayout = { sentOn: "Oct 30", arrivedOn: "Nov 2", href: "#PayoutStatement" };
const ON_ITS_WAY: EarningPayout = { sentOn: "Oct 30", href: "#PayoutStatement" };

/* One engineer's payout: their own block, teammates' blocks, and a product their team owns. */
export const engineerPayout: Earning[] = [
  capacity({
    id: "e1",
    type: "individual_fulfillment",
    block: "dedicated",
    number: "BLK-1181",
    organization: "Northwind Logistics",
    period: "Sep 21–27",
    percentBasisPoints: SHARE.engineer,
    earnedOn: "Oct 2",
    payout: OCT_9,
  }),
  capacity({
    id: "e2",
    type: "team_support",
    block: "core",
    number: "BLK-1195",
    organization: "Harbor Goods",
    period: "Sep 21–27",
    fulfilledBy: "Priya Shah",
    percentBasisPoints: SHARE.support,
    earnedOn: "Oct 2",
    payout: OCT_9,
  }),
  capacity({
    id: "e3",
    type: "team_support",
    block: "dedicated",
    number: "BLK-1170",
    organization: "Harbor Goods",
    period: "Sep 21–27",
    fulfilledBy: "Ana Ruiz",
    percentBasisPoints: SHARE.support,
    earnedOn: "Oct 2",
    payout: OCT_9,
  }),
  capacity({
    id: "e4",
    type: "team_support",
    block: "flex",
    number: "BLK-1185",
    organization: "Northwind Logistics",
    period: "Sep 21–27",
    fulfilledBy: "Lena Brooks",
    percentBasisPoints: SHARE.support,
    earnedOn: "Oct 2",
    payout: OCT_9,
  }),
  operational({
    id: "e5",
    type: "team_ownership",
    organization: "Northwind Logistics",
    product: "Freight Portal",
    month: "September",
    period: "Sep 1–30",
    team: "Cascade",
    percentBasisPoints: 1000,
    earnedOn: "Sep 30",
    payout: OCT_9,
  }),
];

/*
 * A Team Lead's payout: their own block pays them its Individual Fulfillment, each
 * teammate's a Team Lead share, and there's no Team Support.
 */
export const leadPayout: Earning[] = [
  capacity({
    id: "l1",
    type: "individual_fulfillment",
    block: "core",
    number: "BLK-1166",
    organization: "Northwind Logistics",
    period: "Sep 21–27",
    team: "Cascade",
    percentBasisPoints: SHARE.engineer,
    earnedOn: "Oct 2",
    payout: OCT_9,
  }),
  capacity({
    id: "l3",
    type: "team_lead",
    block: "dedicated",
    number: "BLK-1172",
    organization: "Harbor Goods",
    period: "Sep 21–27",
    fulfilledBy: "Ana Ruiz",
    team: "Cascade",
    percentBasisPoints: SHARE.lead,
    earnedOn: "Oct 2",
    payout: OCT_9,
  }),
  capacity({
    id: "l4",
    type: "team_lead",
    block: "flex",
    number: "BLK-1176",
    organization: "Harbor Goods",
    period: "Sep 21–27",
    fulfilledBy: "Lena Brooks",
    team: "Cascade",
    percentBasisPoints: SHARE.lead,
    earnedOn: "Oct 2",
    payout: OCT_9,
  }),
  operational({
    id: "l5",
    type: "team_lead",
    organization: "Northwind Logistics",
    product: "Freight Portal",
    month: "September",
    period: "Sep 1–30",
    team: "Cascade",
    percentBasisPoints: SHARE.lead,
    earnedOn: "Sep 30",
    payout: OCT_9,
  }),
];

/* A partner's payout. */
export const partnerPayout: Earning[] = [
  capacity({
    id: "p1",
    type: "partner_share",
    block: "dedicated",
    number: "BLK-1210",
    organization: "Northwind Logistics",
    period: "Oct 12–18",
    percentBasisPoints: SHARE.partner,
    earnedOn: "Oct 23",
    payout: OCT_30,
  }),
  capacity({
    id: "p2",
    type: "partner_share",
    block: "core",
    number: "BLK-1214",
    organization: "Northwind Logistics",
    period: "Oct 12–18",
    percentBasisPoints: SHARE.partner,
    earnedOn: "Oct 23",
    payout: OCT_30,
  }),
  capacity({
    id: "p3",
    type: "partner_share",
    block: "core",
    number: "BLK-1219",
    organization: "Fernway Health",
    period: "Oct 12–18",
    percentBasisPoints: SHARE.partner,
    earnedOn: "Oct 23",
    payout: OCT_30,
  }),
];

/* What an engineer has earned and not been paid yet. */
export const collectedEarnings: Earning[] = [
  capacity({
    id: "c1",
    type: "individual_fulfillment",
    block: "core",
    number: "BLK-1192",
    organization: "Northwind Logistics",
    period: "Oct 26–Nov 1",
    percentBasisPoints: SHARE.engineer,
    earnedOn: "Nov 4",
  }),
  capacity({
    id: "c2",
    type: "individual_fulfillment",
    block: "flex",
    number: "BLK-1198",
    organization: "Harbor Goods",
    period: "Oct 26–Nov 1",
    percentBasisPoints: SHARE.engineer,
    earnedOn: "Nov 4",
  }),
  capacity({
    id: "c3",
    type: "team_support",
    block: "dedicated",
    number: "BLK-1201",
    organization: "Harbor Goods",
    period: "Oct 26–Nov 1",
    fulfilledBy: "Ana Ruiz",
    percentBasisPoints: SHARE.support,
    earnedOn: "Nov 4",
  }),
  operational({
    id: "c4",
    type: "team_ownership",
    organization: "Harbor Goods",
    product: "Storefront",
    month: "October",
    period: "Oct 1–31",
    team: "Cascade",
    percentBasisPoints: 1000,
    earnedOn: "Nov 2",
  }),
];

/* A payout that's gone out and hasn't arrived. */
export const sentPayout: Earning[] = [
  capacity({
    id: "s1",
    type: "individual_fulfillment",
    block: "core",
    number: "BLK-1174",
    organization: "Northwind Logistics",
    period: "Oct 12–18",
    percentBasisPoints: SHARE.engineer,
    earnedOn: "Oct 23",
    payout: ON_ITS_WAY,
  }),
  capacity({
    id: "s2",
    type: "team_support",
    block: "flex",
    number: "BLK-1177",
    organization: "Harbor Goods",
    period: "Oct 12–18",
    fulfilledBy: "Lena Brooks",
    percentBasisPoints: SHARE.support,
    earnedOn: "Oct 23",
    payout: ON_ITS_WAY,
  }),
];

/* What we know is coming: blocks assigned and not fulfilled, and a month that hasn't ended. */
export const upcomingEarnings: Earning[] = [
  capacity({
    id: "u1",
    type: "individual_fulfillment",
    block: "dedicated",
    number: "BLK-1209",
    organization: "Northwind Logistics",
    period: "Nov 9–15",
    percentBasisPoints: SHARE.engineer,
  }),
  capacity({
    id: "u2",
    type: "team_support",
    block: "core",
    number: "BLK-1216",
    organization: "Harbor Goods",
    period: "Nov 9–15",
    fulfilledBy: "Priya Shah",
    percentBasisPoints: SHARE.support,
  }),
  operational({
    id: "u3",
    type: "team_ownership",
    organization: "Harbor Goods",
    product: "Storefront",
    month: "November",
    period: "Nov 1–30",
    team: "Cascade",
    percentBasisPoints: 1000,
  }),
];

/* What hasn't gone out yet, which is what EarningsCollected adds up. */
export const unsentEarnings: Earning[] = [...collectedEarnings, ...upcomingEarnings];

/* Every earning, for the ledger. */
export const everyEarning: Earning[] = [...unsentEarnings, ...sentPayout, ...engineerPayout];
