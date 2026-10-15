import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";

export type ProgressLinkProps = {
  /** What it is, in the reporter's words: "Pull request: offline signing". */
  name: string;
  url: string;
  /**
   * Inline, as a closed ProgressCard's summary has it: its icon and name in
   * a line of text, rather than a card.
   */
  compact?: boolean;
};

/* The site it goes to, without "www.", so the reader knows where it leads; nothing for a URL that isn't one. */
function site(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

const cut = {
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
} as const;

/*
 * Something related to a record of progress, such as its pull request, a
 * ticket, a design, or a write-up, opening in a new tab. A small outlined
 * card that sits beside others, like a ProgressFeature: a link icon, its
 * name, cut short with the whole name on hover, and the site it goes to,
 * fainter. `compact` is the icon and name alone, in a line of text.
 */
export function ProgressLink({ name, url, compact = false }: ProgressLinkProps) {
  const host = site(url);
  if (compact) {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          maxWidth: "100%",
          minWidth: 0,
          fontSize: 13,
        }}
      >
        <LinkRoundedIcon aria-hidden sx={{ fontSize: 16, flex: "none" }} />
        <Box component="span" sx={cut}>
          {name}
        </Box>
      </Link>
    );
  }
  return (
    <Tooltip title={name}>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          maxWidth: "100%",
          minWidth: 0,
          boxSizing: "border-box",
          px: 1.25,
          py: 0.75,
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
          color: "text.primary",
          fontSize: 14,
          fontWeight: 400,
          transition: "border-color 120ms",
          "&:hover": { borderColor: "primary.main" },
          "&:hover .name": { textDecoration: "underline" },
          "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 2 },
        }}
      >
        <LinkRoundedIcon aria-hidden sx={{ fontSize: 16, flex: "none", color: "primary.main" }} />
        <Box component="span" className="name" sx={cut}>
          {name}
        </Box>
        {host ? (
          <Box component="span" sx={{ ...cut, flexShrink: 1000, color: "text.secondary" }}>
            {host}
          </Box>
        ) : null}
      </Link>
    </Tooltip>
  );
}
