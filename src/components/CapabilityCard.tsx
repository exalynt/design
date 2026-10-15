import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import type { ReactNode } from "react";
import { CapabilityLabel } from "./CapabilityLabel";
import type { StabilityLevelId } from "./stability";

export type CapabilityCardProps = {
  /** What it lets someone do: "Sign for a delivery". */
  name: string;
  /** Its stability, or null for a draft nobody has started on. */
  level: StabilityLevelId | null;
  /** Show the drag grip, where the app lets it be dragged, such as onto a Feature. */
  grip?: boolean;
  /** At the end of its line, after its stability: the app's menu for it. */
  actions?: ReactNode;
  /** Makes the card a button, such as to open the Capability. */
  onClick?: () => void;
};

/*
 * A Capability on its own, in no Feature: its bolt, its name, and its
 * stability as a short mark, or "Draft". One line, cut short, so a few sit
 * in a narrow column. Editing and dragging are the app's: `grip` shows
 * where it can be picked up, and `actions` holds its menu.
 */
export function CapabilityCard({
  name,
  level,
  grip = false,
  actions,
  onClick,
}: CapabilityCardProps) {
  const line = <CapabilityLabel name={name} level={level} grip={grip} actions={actions} />;
  return (
    <Card
      component="article"
      aria-label={name}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        cursor: grip ? "grab" : undefined,
        "&:hover": grip ? { borderColor: "text.disabled" } : undefined,
        "&:hover .grip": { color: "text.secondary" },
      }}
    >
      {onClick ? (
        <CardActionArea onClick={onClick} sx={{ px: 1, py: 0.75 }}>
          {line}
        </CardActionArea>
      ) : (
        <Box sx={{ px: 1, py: 0.75 }}>{line}</Box>
      )}
    </Card>
  );
}
