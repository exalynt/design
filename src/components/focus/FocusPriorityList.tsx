import { Children, isValidElement, type ReactNode } from "react";
import Box from "@mui/material/Box";
import type { SvgIconComponent } from "@mui/icons-material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

/* The ranks' gutter beside the items, and the gap between it and them. */
const RANK_SIZE = 24;
const RANK_GAP = 12;

export type FocusPriorityListProps = {
  /** What's ranked, most important first, such as FocusCards: each gets a numbered row. */
  children: ReactNode;
  /** What the list sits on, which each rank's circle is filled with to cut the rail. */
  surface?: "default" | "paper";
};

/*
 * Up next as the client ranks it: a numbered marker beside each item, on a
 * rail strongest at the top, between "Highest priority" and, with more
 * than one, "Lowest priority", so the order reads as priority without
 * explanation. The first is filled in, as the one worked on next. Each
 * marker lines up with the first line of a FocusCard beside it.
 */
export function FocusPriorityList({ children, surface = "default" }: FocusPriorityListProps) {
  const items = Children.toArray(children);
  return (
    <Box>
      <PriorityEnd Icon={ArrowUpwardRoundedIcon} label="Highest priority" />
      <Box
        component="ol"
        sx={(theme) => ({
          position: "relative",
          listStyle: "none",
          m: 0,
          p: 0,
          /* The rail, from the first rank's middle to the last's. */
          "&::before": {
            content: '""',
            position: "absolute",
            left: RANK_SIZE / 2 - 1,
            top: 24,
            bottom: 24,
            width: 2,
            borderRadius: 1,
            backgroundImage: `linear-gradient(${theme.vars.palette.primary.main}, ${theme.vars.palette.divider})`,
          },
        })}
      >
        {items.map((item, index) => (
          <Box
            key={isValidElement(item) ? item.key : index}
            component="li"
            sx={{
              display: "grid",
              gridTemplateColumns: `${RANK_SIZE}px minmax(0, 1fr)`,
              columnGap: `${RANK_GAP}px`,
              alignItems: "start",
              py: 0.75,
            }}
          >
            <Rank n={index + 1} surface={surface} />
            {item}
          </Box>
        ))}
      </Box>
      {items.length > 1 ? (
        <PriorityEnd Icon={ArrowDownwardRoundedIcon} label="Lowest priority" />
      ) : null}
    </Box>
  );
}

/* An item's place: the first is filled in; the others cut the rail with what the list sits on. */
function Rank({ n, surface }: { n: number; surface: "default" | "paper" }) {
  const first = n === 1;
  return (
    <Box
      aria-hidden
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: RANK_SIZE,
        height: RANK_SIZE,
        /* Level with a FocusCard's first line. */
        mt: 1.5,
        borderRadius: "50%",
        border: 1,
        borderColor: first ? "primary.main" : "divider",
        bgcolor: first ? "primary.main" : `background.${surface}`,
        color: first ? "primary.contrastText" : "text.secondary",
        typography: "caption",
        fontWeight: 700,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {n}
    </Box>
  );
}

function PriorityEnd({ Icon, label }: { Icon: SvgIconComponent; label: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: `${RANK_GAP}px`,
        py: 0.5,
        color: "text.secondary",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", width: RANK_SIZE }}>
        <Icon sx={{ fontSize: 16 }} />
      </Box>
      <Box component="span" sx={{ typography: "caption", fontWeight: 600 }}>
        {label}
      </Box>
    </Box>
  );
}
