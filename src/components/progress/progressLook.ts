import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import type { ProgressKindId } from "./progress";

/*
 * Each kind's icon and palette role: Functionality's puzzle piece in
 * primary, success for Improvement, and warning for Clarity. A first pass,
 * to be tuned on the page.
 */
export const PROGRESS_LOOK: Record<
  ProgressKindId,
  { Icon: SvgIconComponent; color: "primary" | "success" | "warning" }
> = {
  functionality: { Icon: ExtensionOutlinedIcon, color: "primary" },
  improvement: { Icon: TrendingUpRoundedIcon, color: "success" },
  clarity: { Icon: LightbulbOutlinedIcon, color: "warning" },
};
