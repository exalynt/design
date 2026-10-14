import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import type { SearchSelectOption } from "./searchOptions";

/* What a row in the list shows: the icon, the label with the typed words bolded, and the description. */
export function SearchOptionContent({
  option,
  label,
}: {
  option: SearchSelectOption;
  label: ReactNode;
}) {
  return (
    <>
      {option.icon ? (
        <Box sx={{ display: "flex", flexShrink: 0, mr: 1.25, color: "text.secondary" }}>
          {option.icon}
        </Box>
      ) : null}
      <Box sx={{ minWidth: 0 }}>
        {label}
        {option.description ? (
          <Typography variant="caption" noWrap sx={{ display: "block", color: "text.secondary" }}>
            {option.description}
          </Typography>
        ) : null}
      </Box>
    </>
  );
}
