import Avatar from "@mui/material/Avatar";

/*
 * Someone's profile picture, or their initials where they have none or it
 * doesn't load. Decorative: their name is always beside it.
 */
export function UserAvatar({ name, src, size }: { name: string; src?: string; size: number }) {
  return (
    <Avatar
      src={src}
      alt=""
      sx={{ width: size, height: size, fontSize: size * 0.42, fontWeight: 600 }}
    >
      {initials(name)}
    </Avatar>
  );
}

/* "Priya Shah" is "PS": the first and last names' first letters. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
