import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

export type ProgressMetricProps = {
  /** What was measured: "Signatures that fail to send". */
  name: string;
  /** Before the work, as written: "About 1 in 10". Left out where nothing was measured before. */
  before?: string;
  /** After it, as written: "None in a week". */
  after: string;
  /**
   * Which way it moved for the better: `down` for fewer failures or less
   * time, `up` for more bookings. Left out, no way is marked as better.
   */
  direction?: "up" | "down";
};

const DIRECTIONS = {
  up: { Icon: ArrowUpwardRoundedIcon, label: "Up, for the better" },
  down: { Icon: ArrowDownwardRoundedIcon, label: "Down, for the better" },
};

function Label({ children }: { children: string }) {
  return (
    <Box
      component="span"
      sx={{
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "text.secondary",
      }}
    >
      {children}
    </Box>
  );
}

/*
 * Something measured, as a tile: what was measured, then Before, muted, over
 * After, large, each labelled, so which is which never depends on reading
 * the words. `direction` puts an arrow in success beside After, the way it
 * moved for the better; the values are free text, so that's the reporter's
 * to say. Without a `before`, the result stands alone, unlabelled.
 */
export function ProgressMetric({ name, before, after, direction }: ProgressMetricProps) {
  const better = direction ? DIRECTIONS[direction] : null;
  const result = (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, minWidth: 0 }}>
      {better ? (
        <Tooltip title={better.label}>
          <Box
            component="span"
            role="img"
            aria-label={better.label}
            sx={{ display: "inline-flex", flex: "none", color: "success.main" }}
          >
            <better.Icon sx={{ fontSize: 20 }} />
          </Box>
        </Tooltip>
      ) : null}
      <Box
        component="span"
        sx={{
          minWidth: 0,
          fontSize: 20,
          fontWeight: 700,
          lineHeight: 1.25,
          overflowWrap: "anywhere",
        }}
      >
        {after}
      </Box>
    </Box>
  );
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
      {before ? (
        <Box
          sx={{
            mt: 0.75,
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr)",
            alignItems: "center",
            columnGap: 1.25,
            rowGap: 0.5,
          }}
        >
          <Label>Before</Label>
          <Box
            component="span"
            sx={{ fontSize: 14, color: "text.secondary", overflowWrap: "anywhere" }}
          >
            {before}
          </Box>
          <Label>After</Label>
          {result}
        </Box>
      ) : (
        <Box sx={{ mt: 0.25 }}>{result}</Box>
      )}
    </Box>
  );
}
