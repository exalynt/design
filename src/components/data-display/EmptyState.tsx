import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import type { SvgIconComponent } from "@mui/icons-material";

export type EmptyStateProps = {
  icon?: SvgIconComponent;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Stack spacing={1.5} sx={{ alignItems: "center", textAlign: "center", py: 6, px: 3 }}>
      {Icon ? <Icon sx={{ fontSize: 32, color: "text.secondary", opacity: 0.6 }} /> : null}
      <Typography variant="h4">{title}</Typography>
      {description ? (
        <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "48ch" }}>
          {description}
        </Typography>
      ) : null}
      {action ? <Box sx={{ pt: 1 }}>{action}</Box> : null}
    </Stack>
  );
}
