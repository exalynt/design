import { engineerLevelStep, type EngineerLevelId } from "./engineerLevel";

/* Each square's top-left corner, in reading order, in a 14-unit box. */
const SQUARES = [
  [0, 0],
  [7.5, 0],
  [0, 7.5],
  [7.5, 7.5],
];

/*
 * Four squares that make one larger square, filled in reading order to the
 * level: one for Associate up to all four for Principal. Not clockwise, which
 * would read as maturity's quarter ring, and not a row, which is stability's
 * Track. 1em square in the current text color; unfilled squares are the same
 * color, faint. Decorative: whatever shows it says the level's name.
 */
export function EngineerLevelSquares({
  level,
  className,
}: {
  level: EngineerLevelId;
  className?: string;
}) {
  const step = engineerLevelStep(level);
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {SQUARES.map(([x, y], index) => (
        <rect
          key={index}
          x={x}
          y={y}
          width={6.5}
          height={6.5}
          rx={1.25}
          opacity={index < step ? 1 : 0.3}
        />
      ))}
    </svg>
  );
}
