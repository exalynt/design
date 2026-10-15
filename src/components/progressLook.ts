import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import type { ProgressKindId } from "./progress";

/*
 * Each kind's icon and palette role: primary for a Capability added or made
 * more stable, secondary for one retired, gone from what the software does,
 * success for Improvement, and warning for Clarity. A first pass, to be tuned
 * on the page.
 */
export const PROGRESS_LOOK: Record<
  ProgressKindId,
  { Icon: SvgIconComponent; color: "primary" | "secondary" | "success" | "warning" }
> = {
  capability_added: { Icon: AddCircleOutlineRoundedIcon, color: "primary" },
  capability_stabilized: { Icon: VerifiedOutlinedIcon, color: "primary" },
  capability_retired: { Icon: RemoveCircleOutlineRoundedIcon, color: "secondary" },
  improvement: { Icon: TrendingUpRoundedIcon, color: "success" },
  clarity: { Icon: LightbulbOutlinedIcon, color: "warning" },
};
