import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { CapacityLine } from "./CapacityLine";

export type CapacityScheduleProps = {
  /** When it's worked on, as the app words it: "This week", "Week of Oct 19". Null while it has no week. */
  week: string | null;
  /**
   * Opens the app's way to choose a week, handed the line to anchor it to.
   * Without it, the line is read-only.
   */
  onScheduleClick?: (anchor: HTMLElement) => void;
  /**
   * Whether it's on a product. Only a block on a product can be scheduled, so
   * without one, Schedule waits, disabled, and says why.
   */
  onProduct?: boolean;
};

/*
 * When a block is worked on, as one CapacityLine for its footer, under who.
 * With `onScheduleClick`, as in Exalynt's admin views, a block with no week
 * asks for one, and a week can be changed from its line. Without it, as in a
 * client's view or once its week has started, it only says when, or that it
 * isn't scheduled yet.
 */
export function CapacitySchedule({
  week,
  onScheduleClick,
  onProduct = true,
}: CapacityScheduleProps) {
  const icon = <CalendarMonthOutlinedIcon />;
  if (week) {
    return (
      <CapacityLine
        icon={icon}
        hint={`${week}: when it's worked on.${onScheduleClick ? " Click to move it to another week." : ""}`}
        onClick={onScheduleClick}
        menu={Boolean(onScheduleClick)}
      >
        {week}
      </CapacityLine>
    );
  }
  if (onScheduleClick) {
    return (
      <CapacityLine
        icon={icon}
        action
        disabled={!onProduct}
        onClick={onScheduleClick}
        hint={
          onProduct
            ? "Choose a week for it on the schedule."
            : "Assign a product first; only blocks on a product can be scheduled."
        }
      >
        Schedule
      </CapacityLine>
    );
  }
  return (
    <CapacityLine icon={<CalendarMonthOutlinedIcon sx={{ color: "text.disabled" }} />} muted>
      Not scheduled yet
    </CapacityLine>
  );
}
