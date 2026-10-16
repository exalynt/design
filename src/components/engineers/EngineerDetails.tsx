import Box from "@mui/material/Box";
import { DetailsCard, DetailsEyebrow, DetailsLink } from "../DetailsPopover";
import type { UserProfile } from "./UserAttribution";
import { TeamLeadLabel, UserAvatar } from "./UserAvatar";
import type { EngineerLevelId } from "./engineerLevel";
import { EngineerLevelBadge } from "./EngineerLevelBadge";

/** An engineer as the app has them, for EngineerDetails, CapacityEngineer, and UserAttribution. */
export type EngineerProfile = UserProfile & {
  level: EngineerLevelId;
  /** They lead their Engineering Team: their picture has a blue-silver star, and EngineerDetails says so. */
  teamLead?: boolean;
  /** A sentence or two about them. Cut short after four lines. */
  bio?: string;
  /** Their profile page in the app, opened in the same tab. Without it, no link. */
  profileHref?: string;
};

export type EngineerDetailsProps = {
  engineer: EngineerProfile;
  /** Draw the popover's card. `card={false}` leaves it out, for a card of your own. */
  card?: boolean;
};

/*
 * Who an engineer is, for whoever is looking at their work: their picture,
 * name, and level as its badge, a short bio, and a link to their profile
 * page. A Team Lead's picture has the blue-silver star, and the eyebrow
 * reads Engineer · Team Lead, with the star before "Team Lead". It's the
 * content of CapacityEngineer's popover, and draws its own card there.
 */
export function EngineerDetails({ engineer, card = true }: EngineerDetailsProps) {
  const { name, level, teamLead = false, avatarUrl, bio, profileHref } = engineer;
  return (
    <DetailsCard card={card}>
      <DetailsEyebrow>
        Engineer
        {teamLead ? (
          <>
            {" · "}
            <TeamLeadLabel />
          </>
        ) : null}
      </DetailsEyebrow>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
        <UserAvatar name={name} src={avatarUrl} size={56} lead={teamLead} />
        <Box
          sx={{
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0.5,
          }}
        >
          <Box
            sx={{ fontSize: "1.2em", fontWeight: 700, lineHeight: 1.3, overflowWrap: "anywhere" }}
          >
            {name}
          </Box>
          <EngineerLevelBadge level={level} />
        </Box>
      </Box>
      {bio ? (
        <Box
          sx={{
            mt: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {bio}
        </Box>
      ) : null}
      {profileHref ? (
        <DetailsLink href={profileHref} newTab={false}>
          View profile
        </DetailsLink>
      ) : null}
    </DetailsCard>
  );
}
