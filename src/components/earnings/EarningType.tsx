import type { ComponentType } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import { DetailsPopover } from "../DetailsPopover";
import { TeamLeadIcon } from "../engineers/UserAvatar";
import { EarningTypeDetails } from "./EarningTypeDetails";
import { EARNING_TYPES, type EarningKindId, type EarningTypeId } from "./earnings";

export type EarningTypeProps = {
  type: EarningTypeId;
  /** The kind it's under here, which its popover explains. Left out, every kind it goes under. */
  kind?: EarningKindId;
  /** Open EarningTypeDetails over it on hover, focus, or tap. */
  details?: boolean;
  /**
   * It sits inside a link or button: with `details`, it takes no keyboard focus of
   * its own, and a tap opens its popover rather than the link.
   */
  inLink?: boolean;
};

const ICONS: Record<EarningTypeId, ComponentType<{ sx?: SxProps<Theme> }>> = {
  individual_fulfillment: PersonRoundedIcon,
  team_support: GroupsRoundedIcon,
  team_lead: TeamLeadIcon,
  partner_share: HandshakeRoundedIcon,
  team_ownership: VerifiedUserRoundedIcon,
};

/*
 * Why someone's paid for an earning, named: an icon and its name, in text colors
 * rather than a chip, so a page of lines stays quiet and its status is what stands
 * out. A Team Lead's is the star a lead has everywhere else. It's the name of a line
 * or subtotal, under its EarningKind.
 */
export function EarningType({ type, kind, details = false, inLink = false }: EarningTypeProps) {
  const Icon = ICONS[type];
  const label = (
    <Box
      component="span"
      tabIndex={details && !inLink ? 0 : undefined}
      onClick={
        details && inLink
          ? (event) => {
              event.preventDefault();
              event.stopPropagation();
            }
          : undefined
      }
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        minWidth: 0,
        fontWeight: 600,
        verticalAlign: "middle",
        borderRadius: 0.5,
        cursor: details ? "help" : undefined,
        "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
      }}
    >
      <Icon sx={{ flex: "none", fontSize: 18, color: "text.secondary" }} />
      {EARNING_TYPES[type].name}
    </Box>
  );
  return details ? (
    <DetailsPopover title={<EarningTypeDetails type={type} kind={kind} />}>{label}</DetailsPopover>
  ) : (
    label
  );
}
