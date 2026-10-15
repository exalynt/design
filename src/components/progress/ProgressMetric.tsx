import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

export type ProgressMetricProps = {
  /** What was measured: "Time to sign a delivery". */
  name: string;
  /**
   * What the measure is, where its name doesn't say it all: "From opening
   * the delivery to the signature sent." Adds an info icon beside the name
   * that shows it on hover, focus, or tap.
   */
  description?: string;
  /** The measure before the work: 12. Left out where nothing was measured before. */
  before?: number;
  /** The measure after it: 4. */
  after: number;
  /**
   * What the numbers are in, after each of them: "s", "%", "per day". Shown
   * as it's given, so pick one that reads after any number, such as "s"
   * rather than "seconds", which would say "1 seconds".
   */
  unit?: string;
  /**
   * Which way it moved for the better: `down` for fewer failures or less
   * time, `up` for more bookings. Left out, no way is marked as better.
   */
  direction?: "up" | "down";
  /** Also show how much it moved, after less before, signed: "−8 s". Needs a `before`. */
  showDifference?: boolean;
};

const DIRECTIONS = {
  up: { Icon: TrendingUpRoundedIcon, label: "Up, for the better" },
  down: { Icon: TrendingDownRoundedIcon, label: "Down, for the better" },
};

/* The reader's own grouping and decimal marks, to two decimal places at most. */
const numbers = new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 });
/* The same, signed, for how much it moved. */
const differences = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
  signDisplay: "exceptZero",
});

/* A number and its unit as plain words, for a tooltip. */
const said = (value: number, unit?: string) => `${numbers.format(value)}${unit ? ` ${unit}` : ""}`;

/* A number and its unit, the unit smaller and fainter, in whatever color the number is. */
function Value({
  value,
  unit,
  signed = false,
}: {
  value: number;
  unit?: string;
  signed?: boolean;
}) {
  return (
    <>
      <Box component="span" sx={{ whiteSpace: "nowrap" }}>
        {(signed ? differences : numbers).format(value)}
      </Box>
      {unit ? (
        <Box
          component="span"
          sx={{ ml: "0.2em", fontSize: "0.7em", fontWeight: 600, opacity: 0.75 }}
        >
          {unit}
        </Box>
      ) : null}
    </>
  );
}

function Label({ children }: { children: string }) {
  return (
    <Box
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

/* The trend it took for the better; its green says so, and assistive tech hears it. */
function Trend({ direction, size }: { direction: "up" | "down"; size: number }) {
  const { Icon, label } = DIRECTIONS[direction];
  return (
    <Box
      component="span"
      role="img"
      aria-label={label}
      sx={{ display: "inline-flex", flex: "none", color: "success.main" }}
    >
      <Icon sx={{ fontSize: size }} />
    </Box>
  );
}

/* A measure kept to one line, cut short with an ellipsis, and said in full on hover. */
function OneLine({ value, unit }: { value: number; unit?: string }) {
  return (
    <Tooltip title={said(value, unit)}>
      <Box
        component="span"
        sx={{
          display: "block",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <Value value={value} unit={unit} />
      </Box>
    </Tooltip>
  );
}

/*
 * Something measured, as a tile: what was measured, then Before and After
 * side by side, each labelled, with an arrow from one to the other, each a
 * number in the reader's format with `unit` after it, on one line, cut
 * short and said in full on hover where it's too long. `description` adds
 * an info icon beside the name that says what the measure is.
 *
 * Under the name, all of it is centred in the tile, across and down.
 *
 * Whichever says most is the highlight. With `showDifference`, Before and
 * After are the same size and how much it moved is, centred on the line
 * below in a pill. Otherwise, or with no `before`, After is, larger. Either
 * way, `direction` puts the trend it took for the better beside it and makes
 * it green; whether more is better depends on the measure, so that's the
 * reporter's to say, and without it the highlight stays neutral.
 */
export function ProgressMetric({
  name,
  description,
  before,
  after,
  unit,
  direction,
  showDifference = false,
}: ProgressMetricProps) {
  const difference = showDifference && before !== undefined ? after - before : undefined;
  const afterLeads = difference === undefined;

  const result = (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        minWidth: 0,
        maxWidth: "100%",
        fontSize: afterLeads ? 20 : 16,
        fontWeight: afterLeads ? 700 : 600,
        lineHeight: 1.25,
        color: afterLeads && direction ? "success.main" : "text.primary",
      }}
    >
      {afterLeads && direction ? <Trend direction={direction} size={20} /> : null}
      <OneLine value={after} unit={unit} />
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        px: 1.5,
        py: 1.25,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}>
        <Box sx={{ minWidth: 0, fontSize: 12.5, color: "text.secondary" }}>{name}</Box>
        {description ? (
          <Tooltip title={description} describeChild>
            <Box
              component="span"
              tabIndex={0}
              role="img"
              aria-label="About this measure"
              sx={{
                display: "inline-flex",
                flex: "none",
                /* Centred on the name's first line. */
                mt: "1px",
                color: "text.secondary",
                cursor: "help",
                borderRadius: "50%",
                "&:focus-visible": { outline: 2, outlineColor: "primary.main", outlineOffset: 1 },
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 15 }} />
            </Box>
          </Tooltip>
        ) : null}
      </Box>

      {/*
       * Centred in whatever height is left under the name, so a tile with
       * less to show, stretched to the tallest in its row, still sits level.
       */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
          pt: 1.5,
        }}
      >
        {before === undefined ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>{result}</Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
              alignItems: "center",
              columnGap: 1.25,
              rowGap: 0.25,
            }}
          >
            {/* Labels on one row, the values and the arrow between them centred on the next. */}
            <Box sx={{ textAlign: "right" }}>
              <Label>Before</Label>
            </Box>
            <span />
            <Label>After</Label>
            <Box
              sx={{
                minWidth: 0,
                textAlign: "right",
                fontSize: afterLeads ? 14 : 16,
                fontWeight: afterLeads ? 400 : 600,
                lineHeight: 1.25,
                color: "text.secondary",
              }}
            >
              <OneLine value={before} unit={unit} />
            </Box>
            <ArrowForwardRoundedIcon aria-hidden sx={{ fontSize: 16, color: "text.disabled" }} />
            <Box sx={{ display: "flex", minWidth: 0 }}>{result}</Box>
          </Box>
        )}

        {difference === undefined ? null : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={(theme) => ({
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                maxWidth: "100%",
                minHeight: 36,
                boxSizing: "border-box",
                px: 1.5,
                py: 0.5,
                /* Round on one line; a rounded rectangle if a long unit wraps. */
                borderRadius: "18px",
                fontSize: 18,
                fontWeight: 700,
                lineHeight: 1.2,
                textAlign: "center",
                color: direction
                  ? theme.vars.palette.success.main
                  : theme.vars.palette.text.primary,
                bgcolor: direction
                  ? `rgba(${theme.vars.palette.success.mainChannel} / 0.12)`
                  : theme.vars.palette.action.hover,
              })}
            >
              {direction ? <Trend direction={direction} size={22} /> : null}
              <Box component="span" sx={{ minWidth: 0 }}>
                <Value value={difference} unit={unit} signed />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
