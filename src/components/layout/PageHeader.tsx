import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

export type PageHeaderProps = {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  badge?: ReactNode;
  leading?: ReactNode;
  /** Breadcrumbs or a record switcher, above the title. */
  above?: ReactNode;
  meta?: ReactNode;
};

/*
 * Every page opens the same way: what sits above the title (a breadcrumb
 * trail, or a switcher between records), the title, one line of orientation,
 * and optional actions pinned right. It is an app's header rather than a
 * site's hero: compact, so the work starts above the fold.
 *
 * People and organizations pass a `leading` avatar beside the title. A
 * `badge` (a stability level, a role) sits beside the title rather than in
 * it, so it stays out of the heading. A record's page can pass `meta`, a line
 * about where the record stands, under the description.
 */
export function PageHeader({
  title,
  description,
  actions,
  badge,
  leading,
  above,
  meta,
}: PageHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Stack direction="row" spacing={2} sx={{ minWidth: 0, alignItems: "center" }}>
          {leading}
          <Box sx={{ minWidth: 0 }}>
            {above ? <Box sx={{ mb: 0.5 }}>{above}</Box> : null}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
              <Typography variant="h3" component="h1" sx={{ fontSize: { xs: 22, md: 26 } }}>
                {title}
              </Typography>
              {badge}
            </Box>
            {description ? (
              <Typography
                variant="body2"
                sx={{ mt: 0.75, maxWidth: "68ch", color: "text.secondary" }}
              >
                {description}
              </Typography>
            ) : null}
            {meta ? <Box sx={{ mt: 1 }}>{meta}</Box> : null}
          </Box>
        </Stack>
        {actions ? (
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ flexShrink: 0, flexWrap: "wrap", rowGap: 1.5 }}
          >
            {actions}
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
}
