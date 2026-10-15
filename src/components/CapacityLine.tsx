import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import type { MouseEvent, ReactNode } from "react";
import { ICON_COLUMN, ICON_GAP } from "./capacity";
import { DetailsPopover } from "./DetailsPopover";

export type CapacityLineProps = {
  /** An 18px icon, centred under the block's figure. `text.secondary` unless it sets its own color. */
  icon: ReactNode;
  children: ReactNode;
  /** Said on hover. Give every disabled line one, saying why. */
  hint?: string;
  /**
   * A popover's content, such as EngineerDetails, opened on hover, focus, or
   * tap in place of `hint`. A read-only line with it takes keyboard focus.
   */
  details?: ReactNode;
  /** Makes the line a button, handed itself to anchor a picker or menu to. Without it, it's read-only. */
  onClick?: (anchor: HTMLElement) => void;
  /** Opens a picker or menu: adds the chevron. */
  menu?: boolean;
  /** The primary-colored prompt to do something, such as "Assign product" or "Schedule". */
  action?: boolean;
  /** Holds its place until it can be used. */
  disabled?: boolean;
  /** Says something isn't there yet, such as "No product yet". */
  muted?: boolean;
};

/*
 * One line on a block's card, under its figure: an icon centred in a column
 * as wide as the figure, so every line's icon sits on the figure's axis,
 * whatever the line says or whether it can be clicked. All the same height,
 * so swapping one state for another never moves the lines below. Text is cut
 * short rather than wrapping; give the line a `hint` that says it in full.
 * CapacityPlacement is two of these; a block's footer is made of them too.
 */
export function CapacityLine({
  icon,
  children,
  hint,
  details,
  onClick,
  menu = false,
  action = false,
  disabled = false,
  muted = false,
}: CapacityLineProps) {
  const button = (
    <Button
      size="small"
      color={action ? "primary" : "inherit"}
      disabled={disabled}
      component={onClick || disabled ? "button" : "div"}
      tabIndex={onClick ? undefined : details ? 0 : -1}
      disableRipple={!onClick}
      onClick={
        onClick ? (event: MouseEvent<HTMLElement>) => onClick(event.currentTarget) : undefined
      }
      endIcon={menu ? <ExpandMoreRoundedIcon /> : undefined}
      sx={{
        minWidth: 0,
        justifyContent: "flex-start",
        gap: ICON_GAP,
        /* The padding is the hover's, so pull it back to keep the icon on the column. */
        ml: -0.75,
        px: 0.75,
        fontWeight: action ? 600 : 400,
        color: action
          ? undefined
          : disabled
            ? "text.disabled"
            : muted
              ? "text.secondary"
              : "text.primary",
        cursor: onClick ? "pointer" : details ? "help" : "default",
        "&:hover": onClick ? undefined : { bgcolor: "transparent" },
        "& .MuiButton-endIcon": { ml: -0.5, color: action ? undefined : "text.secondary" },
      }}
    >
      <Box
        component="span"
        aria-hidden
        sx={{
          display: "flex",
          flex: "none",
          justifyContent: "center",
          width: ICON_COLUMN,
          color: action ? "inherit" : disabled ? "text.disabled" : "text.secondary",
          "& > svg": { fontSize: 18 },
        }}
      >
        {icon}
      </Box>
      <Box
        component="span"
        sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
      >
        {children}
      </Box>
    </Button>
  );
  return (
    <Box sx={{ display: "flex", minWidth: 0 }}>
      {details ? (
        <DetailsPopover title={details}>
          <Box component="span" sx={{ display: "flex", minWidth: 0 }}>
            {button}
          </Box>
        </DetailsPopover>
      ) : hint ? (
        <Tooltip title={hint} describeChild>
          {/* A span, so the hint still shows while the line is disabled. */}
          <Box component="span" sx={{ display: "flex", minWidth: 0 }}>
            {button}
          </Box>
        </Tooltip>
      ) : (
        button
      )}
    </Box>
  );
}
