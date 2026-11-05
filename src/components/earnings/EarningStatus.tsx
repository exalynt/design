import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import ScheduleSendRoundedIcon from "@mui/icons-material/ScheduleSendRounded";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import { EARNING_STATUSES, earningStatus, type Earning, type EarningStatusId } from "./earnings";

export type EarningStatusProps = {
  earning: Earning;
  /** Which side it lines up on: the end where it sits at the end of a row. */
  align?: "start" | "end";
  /** Its fact on the same line as the chip, at either end of what room it's given. */
  inline?: boolean;
};

const LOOK: Record<
  EarningStatusId,
  { Icon: SvgIconComponent; color: "default" | "info" | "success" }
> = {
  upcoming: { Icon: ScheduleRoundedIcon, color: "default" },
  earned: { Icon: TaskAltRoundedIcon, color: "info" },
  sent: { Icon: ScheduleSendRoundedIcon, color: "info" },
  paid: { Icon: CheckCircleRoundedIcon, color: "success" },
};

/*
 * How far an earning has come, with the one fact that goes with it: what it's
 * waiting on while it's Upcoming, when it was Earned, or, once it's Sent or Paid, a
 * link to its payout. Upcoming's outline is dashed, as it isn't money yet. Hovering,
 * focusing, or tapping it says what the status means.
 */
export function EarningStatus({ earning, align = "start", inline = false }: EarningStatusProps) {
  const { payout, earnedOn } = earning;
  const status = earningStatus(earning);
  const { Icon, color } = LOOK[status];
  const waitingOn =
    earning.kind === "engineering_capacity" ? "Once it's approved" : `Once ${earning.month} ends`;

  return (
    <Box
      sx={{
        display: inline ? "flex" : "inline-flex",
        flexDirection: inline ? "row-reverse" : "column",
        justifyContent: inline ? "space-between" : undefined,
        alignItems: inline ? "center" : `flex-${align}`,
        gap: inline ? 1 : 0.25,
        fontSize: 12.5,
        whiteSpace: "nowrap",
      }}
    >
      <Tooltip
        describeChild
        enterTouchDelay={0}
        leaveTouchDelay={3000}
        title={EARNING_STATUSES[status].description}
      >
        <Chip
          size="small"
          variant="outlined"
          color={color}
          icon={<Icon />}
          label={EARNING_STATUSES[status].name}
          tabIndex={0}
          sx={{
            cursor: "help",
            "& .MuiChip-icon": { fontSize: 16, ml: "6px" },
            "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
            ...(status === "upcoming" && { borderStyle: "dashed" }),
          }}
        />
      </Tooltip>
      {payout ? (
        <Link href={payout.href} underline="hover" sx={{ fontSize: "inherit" }}>
          Payout of {payout.sentOn}
        </Link>
      ) : (
        <Box component="span" sx={{ color: "text.secondary" }}>
          {earnedOn ?? waitingOn}
        </Box>
      )}
    </Box>
  );
}
