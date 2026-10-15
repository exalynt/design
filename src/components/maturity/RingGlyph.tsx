import Box from "@mui/material/Box";
import { clampMaturity, maturityBand, maturityFills } from "./maturity";
import { STABILITY_LEVEL_IDS, levelColor } from "../stability/stability";

/* Below this diameter the percentage won't fit inside, so it sits beside the ring. */
const FIGURE_INSIDE_FROM = 40;

/*
 * Maturity's one look: a ring in four quarter arcs, clockwise from the top
 * (Prototype, Alpha, Beta, GA), each filled as far as the maturity reaches
 * into it, in the band's color, with the percentage in the middle, or beside
 * it on a small ring. Decorative: MaturityRing and MaturityDetails carry the
 * meaning around it.
 */
export function RingGlyph({ progress, size }: { progress: number; size: number }) {
  const value = clampMaturity(progress);
  const fills = maturityFills(value);
  const stroke = Math.max(3, Math.round(size / 11));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const quarter = circumference / 4;
  /* The gap between quarters, as a length along the ring, centred on each corner. */
  const gap = stroke * 0.9;
  const arc = quarter - gap;
  const inside = size >= FIGURE_INSIDE_FROM;

  const figure = (
    <Box
      component="span"
      sx={{
        fontSize: inside ? Math.round(size * 0.26) : 12,
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: inside ? "-0.02em" : 0,
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
      }}
    >
      {value}%
    </Box>
  );

  return (
    <Box
      component="span"
      aria-hidden
      sx={[
        { display: "inline-flex", alignItems: "center", gap: 0.75, flexShrink: 0 },
        levelColor(maturityBand(value)),
      ]}
    >
      <Box
        component="span"
        sx={{
          position: "relative",
          display: "inline-grid",
          placeItems: "center",
          flexShrink: 0,
          width: size,
          height: size,
        }}
      >
        <Box
          component="svg"
          viewBox={`0 0 ${size} ${size}`}
          sx={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        >
          {STABILITY_LEVEL_IDS.map((id, index) => {
            const common = {
              cx: size / 2,
              cy: size / 2,
              r: radius,
              fill: "none",
              strokeWidth: stroke,
              strokeDashoffset: -(index * quarter + gap / 2),
            };
            return (
              <g key={id}>
                <Box
                  component="circle"
                  {...common}
                  strokeDasharray={`${arc} ${circumference}`}
                  sx={(theme) => ({ stroke: theme.vars.palette.divider })}
                />
                {fills[index] > 0 ? (
                  <circle
                    {...common}
                    stroke="currentColor"
                    strokeDasharray={`${arc * fills[index]} ${circumference}`}
                  />
                ) : null}
              </g>
            );
          })}
        </Box>
        {inside ? figure : null}
      </Box>
      {inside ? null : figure}
    </Box>
  );
}
