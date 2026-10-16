import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import type { ReactNode } from "react";
import { ICON_COLUMN, ICON_GAP, type CapacityBlockId, type CapacityStatusId } from "./capacity";
import { CapacityStatus } from "./CapacityStatus";
import { CapacityTag } from "./CapacityTag";
import type { OrganizationProfile } from "../conversations/ConversationMessage";
import type { EngineerProfile } from "../engineers/EngineerDetails";
import { UserAttribution } from "../engineers/UserAttribution";
import { OrganizationLogo } from "../OrganizationLogo";

export type CapacityMiniCardProps = {
  block: CapacityBlockId;
  /** When it's worked on, as the app words it: "This week", "Week of Oct 5". */
  week?: string;
  /** Its engineer, or null for none yet. Leave it out where the engineer is beside it already. */
  engineer?: EngineerProfile | null;
  /** Its status, as CapacityStatus's icon. */
  status?: CapacityStatusId;
  /** Its number, to refer to it by: "BLK-0042". */
  number?: string;
  /**
   * The client organization it was bought for, where whose block it is
   * matters more than its size, such as an engineer's blocks across clients:
   * its logo and name lead the card in the badge's place, and the block's
   * type, its figure, badge, and number, moves to the last line, before its
   * week and engineer.
   */
  organization?: OrganizationProfile;
  /**
   * The product it's on, after the product icon in a line under the top one,
   * where the place doesn't say it already.
   */
  product?: string;
  /**
   * Open CapacityDetails over the figure and badge on hover, focus, or tap,
   * for readers who may not know the block sizes. On a card that links, a
   * tap there opens it rather than the link, and it takes no keyboard focus
   * of its own, since the link already does and its page says the same.
   */
  details?: boolean;
  /**
   * The block's own page. Rendered with the theme's LinkComponent, so an app's
   * router link works where its theme sets one on MuiButtonBase.
   */
  href?: string;
  /** Makes it a button, where it opens something other than a page. */
  onClick?: () => void;
};

const meta = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  minWidth: 0,
  color: "text.secondary",
  fontSize: 12.5,
} as const;

const cut = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;

/*
 * A capacity block where it's related to something else, such as the
 * blocks a Focus, a conversation, or a piece of progress came from: a small
 * figure and its badge, its week, and its status's icon, then its engineer
 * and number. The figure is 24px, too small for its quarters to read on
 * their own, so it only hints at the size the badge beside it names.
 * Two lines, so a few fit in a side column. It's a reference to the block,
 * not the block: its full card, with what it's on and its size in words, is
 * on its own page, which `href` goes to.
 *
 * Given its organization, the card leads with that instead: its logo and
 * name across from the status, and the block's type, number, week, and
 * engineer on the last line. Given its product, it takes a line of its own
 * between, after the product icon CapacityPlacement uses, centred under the
 * logo or figure above it. What it's spent on is left to the block's page,
 * since a Focus's name crowds a card this small.
 */
export function CapacityMiniCard({
  block,
  week,
  engineer,
  status,
  number,
  organization,
  product,
  details = false,
  href,
  onClick,
}: CapacityMiniCardProps) {
  const linked = Boolean(href || onClick);
  const statusIcon = status ? <CapacityStatus status={status} iconOnly /> : null;
  const placement = product ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: ICON_GAP,
        minWidth: 0,
        minHeight: ICON_COLUMN,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", width: ICON_COLUMN, flex: "none" }}
        aria-hidden
      >
        <WebAssetOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
      </Box>
      <Typography variant="body2" sx={{ ...cut, minWidth: 0 }}>
        {product}
      </Typography>
    </Box>
  ) : null;
  const person = engineer ? (
    <UserAttribution user={engineer} size={18} />
  ) : engineer === null ? (
    <Box component="span" sx={cut}>
      No engineer yet
    </Box>
  ) : null;

  const content = organization ? (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, px: 1.25, py: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: ICON_GAP,
          minWidth: 0,
          minHeight: ICON_COLUMN,
        }}
      >
        <Tooltip
          title={`${organization.name}: the organization this block was bought for.`}
          describeChild
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: ICON_GAP, flex: 1, minWidth: 0 }}>
            <OrganizationLogo organization={organization} size={ICON_COLUMN} />
            <Typography
              variant="subtitle2"
              component="span"
              aria-hidden
              sx={{ ...cut, fontWeight: 700 }}
            >
              {organization.name}
            </Typography>
          </Box>
        </Tooltip>
        {statusIcon}
      </Box>
      {placement}
      <Box sx={meta}>
        <CapacityTag block={block} number={number} details={details} inLink={linked} aligned />
        {week ? (
          <Separated>
            <Box component="span" sx={cut}>
              {week}
            </Box>
          </Separated>
        ) : null}
        {person ? <Separated>{person}</Separated> : null}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, px: 1.25, py: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: ICON_GAP,
          minWidth: 0,
          minHeight: ICON_COLUMN,
        }}
      >
        <CapacityTag block={block} details={details} inLink={linked} aligned={Boolean(product)} />
        {week ? (
          <Typography variant="body2" noWrap sx={{ flex: 1, minWidth: 0, fontWeight: 600 }}>
            {week}
          </Typography>
        ) : (
          <Box sx={{ flex: 1 }} />
        )}
        {statusIcon}
      </Box>
      {placement}
      {engineer !== undefined || number ? (
        <Box sx={meta}>
          {person}
          {engineer !== undefined && number ? <span aria-hidden>·</span> : null}
          {number ? (
            <Box component="span" sx={cut}>
              {number}
            </Box>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );

  return (
    <Card sx={{ width: "100%", boxSizing: "border-box" }}>
      {href ? (
        <CardActionArea href={href} onClick={onClick}>
          {content}
        </CardActionArea>
      ) : onClick ? (
        <CardActionArea onClick={onClick}>{content}</CardActionArea>
      ) : (
        content
      )}
    </Card>
  );
}

/* A part of the last line after the one before it, a dot between. */
function Separated({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden>·</span>
      {children}
    </>
  );
}
