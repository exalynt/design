## Development Server

- Do not start a development server. Make the requested changes, validate them with available non-server checks (`npm run lint`, `npm run format:check`, `npm run build`, `npm run build:lib`), and report the results in chat for review and feedback.

## MUI first

- Pages are built from MUI's components as the theme styles them. Where `src/components/` has a component for the job, use it instead; the "MUI first" page lists them from the catalog.
- Add a component to `src/components/` only when MUI has nothing for the job or the same composition is needed in more than one app. When it replaces an MUI choice, say so in the relevant guideline, as "Forms" does for `SearchSelect`.

## Layers

- `src/exalynt/` is Exalynt's own look. Brand colors and geometry live in `src/exalynt/tokens.ts` and mirror `../site/src/theme.css`; change them there, not in component `sx`. Restyling an MUI component across Exalynt's tools belongs in `components` overrides in `src/exalynt/theme.ts`.
- `src/components/` is reusable in client projects. A component there never imports from `src/exalynt/` and takes every color from palette roles, so it works under any MUI theme with `cssVariables` and both color schemes. The exceptions are the stability level colors in `src/components/stability/stability.ts`, which belong to the levels, not a brand, so they're the same under every theme, and only stability and maturity components use them; and In progress's violet in `src/components/capacity/CapacityStatus.tsx`, since no palette role is free for it. The level wording and colors are defined in `src/components/stability/stability.ts`.
- Stability and maturity are split with `../readme`, which installs this package. The readme explains what the levels and maturity mean and how maturity is worked out; this repo has the components, examples, and guidance on how, when, and where to show them. Neither repeats the other: link to the readme with `ReadmeLink`, and the readme links back here.
- `src/docs/` is the design system page, not part of the package. Every component gets a `*.demo.tsx` beside it, listed under a group in `src/docs/catalog.ts` with a `phone` note on how it behaves on a phone. Check it on the page in light and dark, and in the page's phone preview. The page only renders Exalynt's theme, so nothing there proves a component works under a client's; keeping to palette roles is what does.
- Components in `src/components/` live in a folder per catalog group (`capacity/`, `conversations/`, `table/`, ...), with the internal helpers and data modules that group owns. A helper several groups share, like `DetailsPopover`, stays at the root.
- Components are named exports with an exported `<Name>Props` type, re-exported from their layer's `index.ts`. The package's entry points are `@exalynt/design/components` and `@exalynt/design/exalynt`.
