import { useRef } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { CapacityLine } from "./CapacityLine";
import { UserAvatar } from "./UserAvatar";
import { EngineerDetails, type EngineerProfile } from "./EngineerDetails";

export type CapacityEngineerProps = {
  /** The assigned engineer, or null while the block has none. */
  engineer: EngineerProfile | null;
  /**
   * Opens the app's engineer picker, handed the line to anchor it to. Without
   * it, the line is read-only.
   */
  onAssignClick?: (anchor: HTMLElement) => void;
};

/*
 * Who works on a block, as one CapacityLine for its footer, above when. An
 * assigned engineer shows their picture and name, which open EngineerDetails
 * on hover, focus, or tap. With `onAssignClick`, as in Exalynt's admin views,
 * a block with no engineer asks for one, and an assigned engineer has a
 * button of its own at the end to change who, so tapping their name on a
 * phone opens their details rather than the picker. Without it, as in a
 * client's view, it only says who, or that no one is assigned yet.
 */
export function CapacityEngineer({ engineer, onAssignClick }: CapacityEngineerProps) {
  const row = useRef<HTMLDivElement>(null);

  if (engineer) {
    const line = (
      <CapacityLine
        icon={<UserAvatar name={engineer.name} src={engineer.avatarUrl} size={22} />}
        details={<EngineerDetails engineer={engineer} />}
      >
        {engineer.name}
      </CapacityLine>
    );
    if (!onAssignClick) return line;
    return (
      <Box ref={row} sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 0 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>{line}</Box>
        <Tooltip title="Change engineer">
          <IconButton
            size="small"
            aria-label={`Change engineer from ${engineer.name}`}
            onClick={() => row.current && onAssignClick(row.current)}
            sx={{ p: 0.5, color: "text.secondary" }}
          >
            <SwapHorizRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
    );
  }
  if (onAssignClick) {
    return (
      <CapacityLine
        icon={<PersonOutlineOutlinedIcon />}
        action
        menu
        hint="Choose the engineer who works on this block."
        onClick={onAssignClick}
      >
        Assign engineer
      </CapacityLine>
    );
  }
  return (
    <CapacityLine icon={<PersonOutlineOutlinedIcon sx={{ color: "text.disabled" }} />} muted>
      No engineer yet
    </CapacityLine>
  );
}
