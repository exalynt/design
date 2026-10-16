import Avatar from "@mui/material/Avatar";
import type { OrganizationProfile } from "./conversations/ConversationMessage";

/*
 * An organization's logo, a rounded square `size` px across, or its
 * initials where it has none or the logo doesn't load. It names the
 * organization to assistive tech, so the name beside it can be hidden.
 */
export function OrganizationLogo({
  organization,
  size,
}: {
  organization: OrganizationProfile;
  size: number;
}) {
  const initials = organization.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  return (
    <Avatar
      variant="rounded"
      src={organization.logoUrl}
      alt=""
      role="img"
      aria-label={organization.name}
      sx={{
        flex: "none",
        width: size,
        height: size,
        borderRadius: size > 24 ? 1 : 0.5,
        fontSize: size / 2,
        fontWeight: 700,
        color: "text.primary",
        bgcolor: "action.selected",
      }}
    >
      {initials}
    </Avatar>
  );
}
