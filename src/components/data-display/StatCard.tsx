import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import type { SvgIconComponent } from "@mui/icons-material";

export type StatCardProps = {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: SvgIconComponent;
  /** Renders the value in brand blue — for the one number a page is about. */
  accent?: boolean;
};

/** A single headline number with its label and one line of context. */
export function StatCard({ label, value, hint, icon: Icon, accent = false }: StatCardProps) {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
          {Icon ? <Icon sx={{ fontSize: 18, color: "text.secondary" }} /> : null}
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {label}
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: accent ? "primary.main" : "text.primary",
          }}
        >
          {value}
        </Typography>
        {hint ? (
          <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
            {hint}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}
