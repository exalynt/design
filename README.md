# design

Exalynt's design system: the look of Exalynt's own tools, and components we
reuse across them and in client projects, published as the npm package
`@exalynt/design` and shown on a design system page.

## Two layers

- **`src/exalynt/`: Exalynt's own look.** Brand tokens, the MUI theme, the
  mark and the wordmark lockup, for the portal, the console and the admin.
  `tokens.ts` and `theme.ts` are the portal's `src/theme/` files; they mirror
  `../site/src/theme.css`.
- **`src/components/`: reusable components.** `PageHeader`, `SectionCard`,
  `StatCard`, `EmptyState`, `CalloutPanel`, `SearchSelect`, `ConfirmDialog`,
  `ThemeToggle`, `ToastProvider` and `useToast`, the stability and maturity components (`StabilityMark`,
  `StabilityDetails`, `MaturityRing`,
  `MaturityDetails`), and
  the tables in `table/`: `ListTable` (search, filters, sorting and
  pagination, each one prop) and `DataTable` (the table alone).
  They take every color, size and font from whatever MUI theme they render
  under, so they work in an Exalynt tool and in a client's app alike. They
  never import from `src/exalynt/`. The exception is the stability level
  colors, which belong to the levels rather than a brand and look the same
  under every theme.

Each layer's `index.ts` is its package entry point. Components are named
exports, each with its props type (`PageHeader` and `PageHeaderProps`).

Everything else is plain MUI, styled by the theme. A component joins
`src/components/` only when MUI alone doesn't do its job well.

`src/docs/` is the design system page. It isn't part of the package.

## Stability and maturity

The stability levels' wording, colors, and GitHub labels are defined here, in
`src/components/stability/stability.ts`, and maturity's rules are worked out in
`src/components/maturity/maturity.ts`. The [readme](https://readme.exalynt.com)
installs this package for its marks and rings, and is where the concepts are
explained: [what each level means](https://readme.exalynt.com/how-it-works/stability-levels)
and [how maturity is worked out](https://readme.exalynt.com/how-it-works/maturity).
This repository covers how, when, and where to show them, and links there
rather than repeating it. A change to a level's wording or color is made here,
published, and then picked up by updating `@exalynt/design` in the readme.

### Stability marks as SVGs

For places that can't render `StabilityMark`, such as a repository's
`README.md` on GitHub, `public/stability/` has each level's mark as an SVG,
served by the design system page at `https://design.exalynt.io/stability/`:
`<level>-long-<scheme>.svg` (the Track and the name) and
`<level>-extra-long-<scheme>.svg` (adding how stable it is), in `light` and
`dark`, for every level. Show GA's only where the stability guidelines allow
a GA mark, since no mark already means GA.
Put the extra-long mark under the README's title, linked to the level:

<!-- prettier-ignore -->
```html
<a href="https://readme.exalynt.com/how-it-works/stability-levels#stability-alpha"><picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://design.exalynt.io/stability/alpha-extra-long-dark.svg">
  <img src="https://design.exalynt.io/stability/alpha-extra-long-light.svg" alt="Stability: Alpha · Developing" height="18">
</picture></a>
```

They're written by `npm run stability:marks` from `stability.ts`, and CI fails
if the committed files are out of date. Other repositories link to these
URLs, so don't rename or move them.

## Stack

React 19 + TypeScript on MUI v9 with CSS theme variables, built with Vite.

```bash
npm install
npm run dev          # the design system page on :5173
npm run build        # type check (tsc -b) + the page in dist-site/
npm run build:lib    # the npm package in dist/
npm run lint         # oxlint
npm run format       # prettier --write .
```

## The design system page

Laid out like the portal: a top bar with search (⌘K or Ctrl K opens it from
anywhere, as does `/` when you're not typing) and the light/dark toggle, and a rail grouping every page. Each foundation and
component gets its own page, at `#<Name>`, showing its examples under
Exalynt's theme, with an "On phones" note on how it behaves on a phone.
**Phone preview** pops a page out into a 375px frame, where the breakpoints
see a phone's width. **MUI first**, the first page, says when to use MUI
and lists what this system adds. The **Inputs** group holds the Forms
guideline and `SearchSelect`, and the **Responsive** group the guidelines for
pages and tables on phones.

A component's examples live beside it in `<Name>.demo.tsx`, and
`src/docs/catalog.ts` lists every page under its group in nav order. A new
component adds a demo file and a catalog entry.

## Deploy

Pushes to `main` run CI (lint, format, build), and when CI passes the
deploy workflow builds the design system page and deploys `dist-site/` to the
Cloudflare Worker `exalynt-design` (`wrangler.jsonc`). This is the same
CI-then-deploy workflow pair the portal uses.

The deploy job runs in the GitHub `production` environment and needs:

- `CLOUDFLARE_API_TOKEN`, a secret.
- `CLOUDFLARE_ACCOUNT_ID`, a variable.

Without a custom domain it serves at the account's `workers.dev` address,
which is public.

The same workflow's `release` job publishes the package to GitHub Packages:

- Every commit on `main` that passes CI publishes `0.0.0-main-<sha>` under the
  `main` dist-tag.
- Publishing a GitHub release publishes the tag's version (`v1.2.3` becomes
  `1.2.3`) under `latest`, or under `next` if the release is a pre-release.

It authenticates with the workflow's `GITHUB_TOKEN`, so it needs no secrets.

## Using it from an app

Install `@exalynt/design` from GitHub Packages. The app's `.npmrc` points the
scope at the registry, and installing needs a token with `read:packages`:

```ini
@exalynt:registry=https://npm.pkg.github.com
```

```bash
npm install @exalynt/design         # latest release
npm install @exalynt/design@main    # latest commit on main
```

The package has one entry point per layer, and expects the app to provide
React, MUI and Emotion:

```tsx
import { PageHeader, SectionCard } from "@exalynt/design/components";
import { theme, Brand } from "@exalynt/design/exalynt";
```

The portal's own copies of these components and its theme have not been
switched over to this package.
