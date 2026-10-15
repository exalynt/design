import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import type { ReactNode } from "react";

export type SectionCardProps = {
  title?: ReactNode;
  subheader?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  disableContentPadding?: boolean;
};

/*
 * The workhorse panel: outlined card, optional titled header with an action,
 * hairline divider, body. Pages use this instead of assembling
 * Card/CardHeader/CardContent so headings and padding stay uniform.
 *
 * Pass `disableContentPadding` when the body is a table or list that should
 * bleed to the card's edges.
 */
export function SectionCard({
  title,
  subheader,
  action,
  children,
  disableContentPadding = false,
}: SectionCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {title ? (
        <>
          <CardHeader
            title={title}
            subheader={subheader}
            action={action}
            sx={{ pb: 2, alignItems: "flex-start", "& .MuiCardHeader-action": { m: 0 } }}
          />
          <Divider />
        </>
      ) : null}
      {disableContentPadding ? children : <CardContent sx={{ flex: 1 }}>{children}</CardContent>}
    </Card>
  );
}
