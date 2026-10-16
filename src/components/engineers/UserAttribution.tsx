import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { DetailsPopover } from "../DetailsPopover";
import { EngineerDetails, type EngineerProfile } from "./EngineerDetails";
import { EngineerLevelBadge } from "./EngineerLevelBadge";
import { UserAvatar } from "./UserAvatar";

/** Anyone the app attributes something to: a client, a teammate, or an engineer. */
export type UserProfile = {
  name: string;
  /** Their profile picture's URL. Without one, or if it doesn't load, their initials. */
  avatarUrl?: string;
};

export type UserAttributionProps = {
  /** Who it is. An `EngineerProfile` can also show their level and open EngineerDetails. */
  user: UserProfile | EngineerProfile;
  /** Just their picture, with their name on hover, focus, or tap and to assistive tech. */
  photoOnly?: boolean;
  /**
   * An engineer's level: `true` for its badge under their name, or `"squares"`
   * for the badge without its text after the name, on one line. Ignored for
   * anyone else, and with `photoOnly`.
   */
  showLevel?: boolean | "squares";
  /** Open EngineerDetails on hover, focus, or tap. Ignored for anyone else. */
  details?: boolean;
  /** The picture's size in px: 20 by default, or 40 with the badge under the name. */
  size?: number;
};

const isEngineer = (user: UserProfile | EngineerProfile): user is EngineerProfile =>
  "level" in user;

/*
 * Who something is by, for, or assigned to: their picture and name, in the
 * primary text color at weight 600, at the size of the text around it; or,
 * with `photoOnly`, just their picture, naming them on hover. For an
 * engineer, `showLevel` puts their level badge under the name, or with
 * `"squares"` the badge without its text after it, where a line has no room
 * for the whole badge. `details` opens EngineerDetails over all of it. With
 * both, the badge's own popover is left out: EngineerDetails has the badge,
 * with its popover, so the two never open together. The name is cut short
 * where there's no room, before the badge is. A Team Lead (`teamLead` on
 * their profile) has a blue-silver star on their picture in every form, and
 * "Team Lead" on hovering it, or after their name with `photoOnly`.
 */
export function UserAttribution({
  user,
  photoOnly = false,
  showLevel = false,
  details = false,
  size,
}: UserAttributionProps) {
  const engineer = isEngineer(user) ? user : null;
  const withDetails = Boolean(engineer && details);
  const withLevel = Boolean(engineer && showLevel === true && !photoOnly);
  const withSquares = Boolean(engineer && showLevel === "squares" && !photoOnly);
  const lead = Boolean(engineer?.teamLead);
  const label = lead ? `${user.name}, Team Lead` : user.name;

  const picture = (
    <UserAvatar
      name={user.name}
      src={user.avatarUrl}
      size={size ?? (withLevel ? 40 : 20)}
      lead={lead}
    />
  );
  /* Beside the name, the lead's mark says it in words: to assistive tech, and on hover unless EngineerDetails does. */
  const leadPicture = (
    <Box component="span" role="img" aria-label="Team Lead" sx={{ display: "inline-flex" }}>
      {picture}
    </Box>
  );
  const avatar =
    !lead || photoOnly ? (
      picture
    ) : withDetails ? (
      leadPicture
    ) : (
      <Tooltip title="Team Lead" enterTouchDelay={0}>
        {leadPicture}
      </Tooltip>
    );
  const name = (
    <Box
      component="span"
      sx={{
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        color: "text.primary",
        fontWeight: 600,
      }}
    >
      {user.name}
    </Box>
  );

  const content = (
    <Box
      component="span"
      tabIndex={withDetails ? 0 : undefined}
      role={photoOnly ? "img" : undefined}
      aria-label={photoOnly ? label : undefined}
      sx={[
        {
          display: "inline-flex",
          alignItems: "center",
          gap: withLevel ? 1 : 0.75,
          /* Its own width even where a column or grid would stretch it, so popovers open over it. */
          width: "fit-content",
          minWidth: 0,
          maxWidth: "100%",
          verticalAlign: "middle",
        },
        withDetails && {
          cursor: "help",
          borderRadius: photoOnly ? "50%" : 1,
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        },
      ]}
    >
      {avatar}
      {photoOnly ? null : withLevel && engineer ? (
        <Box
          component="span"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0.25,
            minWidth: 0,
          }}
        >
          {name}
          <EngineerLevelBadge level={engineer.level} details={!withDetails} />
        </Box>
      ) : (
        name
      )}
      {withSquares && engineer ? (
        <EngineerLevelBadge level={engineer.level} label={false} details={!withDetails} />
      ) : null}
    </Box>
  );

  if (withDetails && engineer) {
    return (
      <DetailsPopover title={<EngineerDetails engineer={engineer} />}>{content}</DetailsPopover>
    );
  }
  if (photoOnly) {
    return (
      <Tooltip title={label} enterTouchDelay={0}>
        {content}
      </Tooltip>
    );
  }
  return content;
}
