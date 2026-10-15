import Box from "@mui/material/Box";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import WebAssetOutlinedIcon from "@mui/icons-material/WebAssetOutlined";
import { CapacityLine } from "./CapacityLine";

export type CapacityPlacementProps = {
  /**
   * The client organization it was bought for, as a line above the product.
   * Pass it where blocks from several organizations show together, such as
   * Exalynt's admin views; leave it out in a client's own view.
   */
  organization?: string;
  /** The product's name, or null while the block is on none. */
  product: string | null;
  /** The Focus on the product's board it's kept on, or null to follow whatever is first in Up next. */
  focus?: string | null;
  /** The Focus first in Up next now, shown after "Up next" while it has no Focus of its own. */
  upNext?: string;
  /** Opens the app's product picker at the line. Without it, the line is read-only. */
  onProductClick?: (anchor: HTMLElement) => void;
  /** Opens the app's Focus picker at the line. Without it, the line is read-only. */
  onFocusClick?: (anchor: HTMLElement) => void;
};

const UP_NEXT_HINT =
  "No Focus chosen, so it goes to whatever is first in Up next on the product's board, even as that changes.";

/*
 * Where a block goes, as two CapacityLines for CapacityBlock's children: the
 * product its work goes to, then the Focus on that product's board it goes
 * towards, under the organization it was bought for where that's given. The
 * organization never changes, so its line is read-only. A block on no
 * product asks to be assigned one, or says it has none where it can't be,
 * and holds the Focus line's place, disabled, so assigning one doesn't
 * resize the card. A block on a product with no Focus of its own follows Up
 * next, which is a choice, not something missing. The icons are the
 * portal's: a product is software in a window, and a Focus its own target.
 * Names are cut short rather than stretching the card, and each line says
 * in full what it is on hover.
 */
export function CapacityPlacement({
  organization,
  product,
  focus = null,
  upNext,
  onProductClick,
  onFocusClick,
}: CapacityPlacementProps) {
  const change = (what: string, editable: boolean) => (editable ? ` Click to ${what}.` : "");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
      {organization ? (
        <CapacityLine
          icon={<BusinessOutlinedIcon />}
          hint={`${organization}: the organization this block was bought for.`}
        >
          {organization}
        </CapacityLine>
      ) : null}
      {product ? (
        <CapacityLine
          icon={<WebAssetOutlinedIcon />}
          hint={`${product}: the product this block's work goes to.${change("move it", Boolean(onProductClick))}`}
          onClick={onProductClick}
          menu={Boolean(onProductClick)}
        >
          {product}
        </CapacityLine>
      ) : onProductClick ? (
        <CapacityLine
          icon={<WebAssetOutlinedIcon />}
          action
          menu
          hint="Put it on a product so it can be scheduled."
          onClick={onProductClick}
        >
          Assign product
        </CapacityLine>
      ) : (
        <CapacityLine icon={<WebAssetOutlinedIcon sx={{ color: "text.disabled" }} />} muted>
          No product yet
        </CapacityLine>
      )}

      {!product ? (
        <CapacityLine
          icon={<CenterFocusStrongOutlinedIcon />}
          disabled
          hint="Assign a product first; a Focus comes from its board."
        >
          Choose a Focus
        </CapacityLine>
      ) : focus ? (
        <CapacityLine
          icon={<CenterFocusStrongOutlinedIcon />}
          hint={`${focus}: the Focus this block goes towards.${change("change it, or follow Up next instead", Boolean(onFocusClick))}`}
          onClick={onFocusClick}
          menu={Boolean(onFocusClick)}
        >
          {focus}
        </CapacityLine>
      ) : (
        <CapacityLine
          icon={<PlayCircleOutlineRoundedIcon sx={{ color: "primary.main" }} />}
          hint={`${UP_NEXT_HINT}${change("keep it on one Focus instead", Boolean(onFocusClick))}`}
          onClick={onFocusClick}
          menu={Boolean(onFocusClick)}
        >
          <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
            Up next
          </Box>
          {upNext ? (
            <Box component="span" sx={{ color: "text.secondary" }}>
              {" · "}
              {upNext}
            </Box>
          ) : null}
        </CapacityLine>
      )}
    </Box>
  );
}
