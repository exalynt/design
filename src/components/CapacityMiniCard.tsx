import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import type { CapacityBlockId, CapacityStatusId } from "./capacity";
import { CapacityStatus } from "./CapacityStatus";
import { CapacityTag } from "./CapacityTag";
import type { EngineerProfile } from "./EngineerDetails";
import { UserAttribution } from "./UserAttribution";

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

/*
 * A capacity block where it's related to something else, such as the
 * blocks a Focus, a conversation, or a piece of progress came from: a small
 * figure and its badge, its week, and its status's icon, then its engineer
 * and number. The figure is 24px, too small for its quarters to read on
 * their own, so it only hints at the size the badge beside it names.
 * Two lines, so a few fit in a side column. It's a reference to the block,
 * not the block: its full card, with what it's on and its size in words, is
 * on its own page, which `href` goes to.
 */
export function CapacityMiniCard({
  block,
  week,
  engineer,
  status,
  number,
  details = false,
  href,
  onClick,
}: CapacityMiniCardProps) {
  const linked = Boolean(href || onClick);
  const content = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75, px: 1.25, py: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
        <CapacityTag block={block} details={details} inLink={linked} />
        {week ? (
          <Typography variant="body2" noWrap sx={{ flex: 1, minWidth: 0, fontWeight: 600 }}>
            {week}
          </Typography>
        ) : (
          <Box sx={{ flex: 1 }} />
        )}
        {status ? <CapacityStatus status={status} iconOnly /> : null}
      </Box>
      {engineer !== undefined || number ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            minWidth: 0,
            color: "text.secondary",
            fontSize: 12.5,
          }}
        >
          {engineer ? (
            <UserAttribution user={engineer} size={18} />
          ) : engineer === null ? (
            <Box component="span">No engineer yet</Box>
          ) : null}
          {engineer !== undefined && number ? <span aria-hidden>·</span> : null}
          {number ? (
            <Box
              component="span"
              sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
            >
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
