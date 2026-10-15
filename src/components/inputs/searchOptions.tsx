import type { PopperProps } from "@mui/material/Popper";
import Box from "@mui/material/Box";
import type { ReactNode } from "react";

/* The search, highlighting and row shared by SearchSelect and SearchMultiSelect. */

export type SearchSelectOption = {
  /** Identifies the option: two options with the same id are the same option. */
  id: string;
  label: string;
  /** A second, quieter line under the label, such as an email or a client. Searched too. */
  description?: string;
  /** The heading it's listed under. Searched too. Keep a group's options together. */
  group?: string;
  /** Shown before the label, such as an Avatar or an icon. */
  icon?: ReactNode;
};

/* Case and accents don't matter: "Jose" finds "José". */
function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function wordsOf(text: string) {
  return text.split(/\s+/).filter(Boolean);
}

/* Every word typed has to appear somewhere in the label, description or group,
   in any order, so "sam acme" finds Sam Lee at Acme. */
export function filterOptions(
  options: SearchSelectOption[],
  { inputValue }: { inputValue: string },
) {
  const words = wordsOf(normalize(inputValue));
  return options.filter((option) => {
    const text = normalize([option.label, option.description, option.group].join(" "));
    return words.every((word) => text.includes(word));
  });
}

/* Bolds the typed words where they appear in the label. */
export function highlight(label: string, query: string) {
  const words = wordsOf(query).map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!words.length) return label;
  return label.split(new RegExp(`(${words.join("|")})`, "gi")).map((part, index) =>
    index % 2 ? (
      <Box
        key={index}
        component="mark"
        sx={{ bgcolor: "transparent", color: "text.primary", fontWeight: 700 }}
      >
        {part}
      </Box>
    ) : (
      part
    ),
  );
}

/* The list always opens under the field, even near the bottom of the screen,
   where Popper would otherwise flip it above. The page scrolls to reach it. */
export const popperBelow: Partial<PopperProps> = {
  placement: "bottom-start",
  modifiers: [{ name: "flip", enabled: false }],
};
