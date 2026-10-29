// Writes the stability marks as SVGs to public/stability/, for READMEs and
// other places that can't render StabilityMark, such as GitHub markdown. Each
// level gets the long mark (the Track and the name) and the extra-long mark
// (adding how stable it is), in a light and a dark shade, drawn to match
// StabilityMark at 14px.
//
// Run `npm run stability:marks` after changing a level's wording or color.
// CI fails if the committed files don't match what this writes.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import {
  STABILITY_LEVELS,
  stabilityStep,
  type StabilityLevel,
} from "../src/components/stability/stability.ts";
import { dividerToken, fonts } from "../src/exalynt/tokens.ts";

const OUT = new URL("../public/stability/", import.meta.url);

/* StabilityTrack and StabilityMark's em sizes, at 14px. */
const FONT_SIZE = 14;
const CELL = FONT_SIZE / 3;
const CELL_GAP = FONT_SIZE / 12;
const TEXT_X = 4 * CELL + 3 * CELL_GAP + FONT_SIZE / 2;
/* Room for descenders, which line-height 1 would clip. */
const HEIGHT = FONT_SIZE + 4;

/*
 * Character widths in em, from Helvetica's metrics. An SVG shown as an image
 * can't measure its text, so the width is worked out from these, with room
 * for wider system fonts. A character missing here is an error, so new
 * wording gets a width rather than being clipped.
 */
// prettier-ignore
const WIDTHS: Record<string, number> = {
  " ": 0.278, "·": 0.278,
  A: 0.667, B: 0.667, D: 0.722, E: 0.667, G: 0.778, P: 0.667, R: 0.722, S: 0.667,
  a: 0.556, b: 0.556, e: 0.556, f: 0.278, g: 0.556, h: 0.556, i: 0.222, l: 0.222,
  n: 0.556, o: 0.556, p: 0.556, r: 0.333, t: 0.278, v: 0.5, x: 0.5, y: 0.5,
};

function textWidth(text: string) {
  let em = 0;
  for (const char of text) {
    const width = WIDTHS[char];
    if (width === undefined) throw new Error(`No width for "${char}" in "${text}"`);
    em += width;
  }
  return em * FONT_SIZE * 1.2;
}

const escape = (text: string) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function mark(level: StabilityLevel, extraLong: boolean, scheme: "light" | "dark") {
  const color = level.colors[scheme];
  const descriptor = extraLong ? ` · ${level.stability}` : "";
  const label = `Stability: ${level.name}${descriptor}`;
  const width = Math.ceil(TEXT_X + textWidth(level.name + descriptor));
  const step = stabilityStep(level.id);
  const cells = [0, 1, 2, 3].map(
    (index) =>
      `    <rect x="${+(index * (CELL + CELL_GAP)).toFixed(2)}" y="${+((HEIGHT - CELL) / 2).toFixed(2)}" width="${+CELL.toFixed(2)}" height="${+CELL.toFixed(2)}" rx="${+CELL_GAP.toFixed(2)}" fill="${index < step ? color : dividerToken[scheme]}"/>`,
  );
  /* The descriptor is faded only on dark surfaces, as on StabilityMark. */
  const tspan = extraLong
    ? `<tspan font-weight="400"${scheme === "dark" ? ` fill-opacity="0.75"` : ""}>${descriptor}</tspan>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${HEIGHT}" viewBox="0 0 ${width} ${HEIGHT}" role="img" aria-label="${label}">
  <title>${label}</title>
  <g>
${cells.join("\n")}
  </g>
  <text x="${+TEXT_X.toFixed(2)}" y="${HEIGHT / 2}" dominant-baseline="central" fill="${color}" font-family="${escape(fonts.sans)}" font-size="${FONT_SIZE}" font-weight="500">${level.name}${tspan}</text>
</svg>
`;
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const level of STABILITY_LEVELS) {
  for (const extraLong of [false, true]) {
    for (const scheme of ["light", "dark"] as const) {
      const file = `${level.id}-${extraLong ? "extra-long" : "long"}-${scheme}.svg`;
      writeFileSync(new URL(file, OUT), mark(level, extraLong, scheme));
    }
  }
}
