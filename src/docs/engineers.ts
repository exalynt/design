// Sample engineers for the page's demos.

import type { EngineerProfile } from "../components";

/* A drawn stand-in for a profile picture, so the page needs nothing from the network. */
const PORTRAIT = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>" +
    "<rect width='64' height='64' fill='#8fa9c4'/>" +
    "<path d='M8 64c2-14 12-20 24-20s22 6 24 20z' fill='#2f4a66'/>" +
    "<circle cx='32' cy='27' r='12' fill='#e8c3a0'/>" +
    "<path d='M19 27c0-10 6-15 13-15s13 5 13 15c-3-5-8-7-13-7s-10 2-13 7z' fill='#3a2a20'/>" +
    "</svg>",
)}`;

export const PRIYA: EngineerProfile = {
  name: "Priya Shah",
  level: "senior",
  avatarUrl: PORTRAIT,
  bio: "Builds billing and scheduling systems, and likes untangling the data underneath them. Ten years on web products, the last four leading small teams.",
  profileHref: "#engineers/priya-shah",
};

/* Any level can lead a team, so the sample lead is Mid. */
export const ANA: EngineerProfile = {
  name: "Ana Ruiz",
  level: "mid",
  teamLead: true,
  avatarUrl: PORTRAIT,
  bio: "Keeps the team's clients and context in one place, and pairs on whatever is stuck.",
};

export const MARCUS: EngineerProfile = {
  name: "Marcus Webb",
  level: "associate",
  bio: "Frontend engineer who cares about forms that are quick to fill in.",
};
