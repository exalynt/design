import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import type { OrganizationProfile } from "./ConversationMessage";
import { OrganizationLogo } from "../OrganizationLogo";

/* Out of sight but still read out. */
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;

/*
 * Where a conversation is, over its subject in ConversationRow and over its
 * title in ConversationPopout's and ConversationPreview's title bars: its
 * organization's logo and name, then its space's, as "Acme Logistics /
 * Billing", on one line, cut short where it's long. Without an organization,
 * the space's icon leads in the logo's place. The logo names the
 * organization to assistive tech, so its name beside it is hidden from it.
 */
export function ConversationPlace({
  space,
  organization,
  sx,
}: {
  space?: string;
  organization?: OrganizationProfile;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      sx={[
        {
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          minWidth: 0,
          typography: "caption",
          lineHeight: "16px",
          color: "text.secondary",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {organization ? (
        <OrganizationLogo organization={organization} size={16} />
      ) : (
        <WorkspacesOutlinedIcon aria-hidden sx={{ fontSize: 16, flex: "none" }} />
      )}
      <Box
        component="span"
        sx={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
      >
        {organization ? (
          <Box component="span" aria-hidden sx={{ fontWeight: 600 }}>
            {organization.name}
          </Box>
        ) : null}
        {organization && space ? (
          <Box component="span" aria-hidden sx={{ mx: 0.75, color: "text.disabled" }}>
            /
          </Box>
        ) : null}
        {space ? (
          <>
            {space}
            <Box component="span" sx={visuallyHidden}>
              {" "}
              space
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
