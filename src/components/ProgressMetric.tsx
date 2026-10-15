import Box from "@mui/material/Box";

export type ProgressMetricProps = {
  /** What was measured: "Signatures that fail to send". */
  name: string;
  /** Before the work, as written: "About 1 in 10". */
  before: string;
  /** After it, as written: "None in a week". */
  after: string;
};

/*
 * Something measured before the work and after it, as a tile: what was
 * measured, the result after, large, and what it was before, muted. Both
 * are free text, so neither is colored as better or worse; the words say
 * which way it went.
 */
export function ProgressMetric({ name, before, after }: ProgressMetricProps) {
  return (
    <Box
      sx={{
        minWidth: 0,
        px: 1.5,
        py: 1.25,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ fontSize: 12.5, color: "text.secondary" }}>{name}</Box>
      <Box
        sx={{
          mt: 0.25,
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.25,
          overflowWrap: "anywhere",
        }}
      >
        {after}
      </Box>
      <Box sx={{ mt: 0.25, fontSize: 12.5, color: "text.secondary" }}>was {before}</Box>
    </Box>
  );
}
