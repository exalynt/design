/*
 * Exalynt brand tokens — the raw colors and geometry of Exalynt's own tools.
 * They mirror `site/src/theme.css` and the portal's `src/theme/tokens.ts`; if
 * the brand palette moves there, move it here too.
 *
 * Nothing outside `src/exalynt/` should import this file. Components read the
 * derived MUI theme instead (`palette.*`, `theme.vars.*`, `sx`), so they work
 * under a client's theme as well as Exalynt's.
 */

export const brand = {
  midnight: "#080f1a",
  elevated: "#101a2a",
  deep: "#04060b",
  blue: "#3b82f6",
  blueBright: "#60a5fa",
  slate: "#64748b",
  mist: "#e8edf3",
  cloud: "#f7f9fc",
  white: "#ffffff",
  textPrimaryDark: "#f8fafc",
  textSecondaryDark: "#94a3b8",
} as const;

/*
 * Status colors. The portal shows a lot of state (invoice paid/overdue,
 * project active/paused, capacity scheduled/consumed), which the marketing
 * site never had to. They are picked to sit alongside the brand blue rather
 * than to match MUI's defaults.
 */
export const status = {
  successLight: "#15803d",
  successDark: "#22c55e",
  warningLight: "#b45309",
  warningDark: "#f59e0b",
  errorLight: "#b91c1c",
  errorDark: "#ef4444",
  /* The Team Lead mark, a gold arrowhead on their picture and beside "Team Lead"
     (and the portal's LeadBadge). A gold rather than warning's amber, so a
     lead never reads as a status, a stability level, or an engineer level.
     Light's is dark enough for 4.5:1 on white, since "Team Lead" is small
     text in it. */
  leadLight: "#96700a",
  leadDark: "#facc15",
} as const;

export const dividerToken = {
  light: "rgb(100 116 139 / 22%)",
  dark: "rgb(255 255 255 / 12%)",
} as const;

/*
 * The app chrome — the top bar and the navigation rail — sits a step off the
 * content surface so the page being worked on reads as its own area. In light
 * it's white over the cloud page, the crispest separation a near-white page
 * allows (a grey chrome over it just reads as muddy); in dark it's a step
 * deeper than midnight, as GitHub's is. Console-only: the site has no rail.
 */
export const chromeToken = {
  light: brand.white,
  dark: brand.deep,
} as const;

/*
 * What floats over the page — tooltips, popovers, menus, select and
 * autocomplete lists — shares one surface per mode, set off by a hairline
 * border and a shadow. In light it's a pale cool grey a step below the cloud
 * page, so it doesn't vanish against the white cards the way white would; in
 * dark it's the elevated surface the cards and dialogs use.
 */
export const floatingToken = {
  light: "#f1f5f9",
  dark: brand.elevated,
} as const;

export const fonts = {
  sans: '-apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
} as const;

/* Geometry, taken from the site's CSS: 4px on controls and cards, 8px on
   larger panels and media, 1px hairline borders, no ambient shadows. */
export const geometry = {
  radius: 4,
  /** Buttons, matching the 6px of the rail's rows (railItem.ts). */
  radiusControl: 6,
  radiusLarge: 8,
  radiusPill: 999,
  /** Width of the permanent navigation rail on md and up. */
  sidebarWidth: 264,
  /** Height of the full-width top bar, and of the brand row in the phone drawer. */
  headerHeight: 64,
  /** Matches the site's .container max-width. */
  contentMaxWidth: 1360,
} as const;
