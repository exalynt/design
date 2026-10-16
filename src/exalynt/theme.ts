/* Enables `colorSchemes` on ThemeOptions and types `theme.vars.*` everywhere. */
import "@mui/material/themeCssVarsAugmentation";
import { createTheme, alpha } from "@mui/material/styles";
import type { Shadows } from "@mui/material/styles";
import { brand, chromeToken, dividerToken, floatingToken, fonts, geometry, status } from "./tokens";

/*
 * The MUI theme for Exalynt's own tools: the portal, the console and the admin.
 * Client projects bring their own theme; nothing in src/components/ needs this one.
 *
 * Two decisions worth knowing before editing this file:
 *
 * 1. CSS theme variables are on, with `colorSchemeSelector: "data-theme"`.
 *    MUI therefore emits `[data-theme="dark"]` rules and writes that attribute
 *    on <html> — the exact mechanism the marketing site already uses, so the
 *    inline script in index.html, the site's stylesheet and MUI all agree, and
 *    a theme chosen in one place survives a trip to the other.
 *
 * 2. The component overrides below exist to make MUI look like Exalynt rather
 *    than like Material: hairline borders instead of ambient shadows, 4px radii,
 *    and semibold sentence-case labels. Prefer extending them here over
 *    one-off `sx` restyling of the same component in pages.
 */

/*
 * `lead`: the Team Lead mark, the gold arrowhead on a lead's picture and its "Team Lead" label.
 * `chrome`: the top bar and navigation rail's surface (see chromeToken).
 */
declare module "@mui/material/styles" {
  interface Palette {
    lead: Palette["primary"];
    chrome: string;
  }
  interface PaletteOptions {
    lead?: PaletteOptions["primary"];
    chrome?: string;
  }
}

/** Shared by both color schemes; MUI derives the rest of each palette. */
const commonPalette = {
  primary: {
    main: brand.blue,
    contrastText: brand.white,
  },
  secondary: {
    main: brand.slate,
    contrastText: brand.white,
  },
};

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-theme",
  },

  colorSchemes: {
    light: {
      palette: {
        ...commonPalette,
        background: {
          default: brand.cloud,
          paper: brand.white,
        },
        text: {
          primary: brand.midnight,
          secondary: brand.slate,
        },
        divider: dividerToken.light,
        success: { main: status.successLight },
        warning: { main: status.warningLight },
        error: { main: status.errorLight },
        info: { main: brand.blue },
        lead: { main: status.leadLight },
        chrome: chromeToken.light,
      },
    },
    dark: {
      palette: {
        ...commonPalette,
        primary: { ...commonPalette.primary, main: brand.blueBright },
        background: {
          default: brand.midnight,
          paper: brand.elevated,
        },
        text: {
          primary: brand.textPrimaryDark,
          secondary: brand.textSecondaryDark,
        },
        divider: dividerToken.dark,
        success: { main: status.successDark },
        warning: { main: status.warningDark },
        error: { main: status.errorDark },
        info: { main: brand.blueBright },
        lead: { main: status.leadDark },
        chrome: chromeToken.dark,
      },
    },
  },

  shape: {
    borderRadius: geometry.radius,
  },

  /* The site leans on borders, not elevation. Keeping the scale but flattening
     it means MUI's surfaces (menus, popovers, dialogs) stop floating without
     having to opt every one of them out individually. */
  shadows: [
    "none",
    "0 1px 2px rgb(8 15 26 / 6%)",
    "0 2px 6px -2px rgb(8 15 26 / 10%)",
    ...Array.from({ length: 22 }, () => "0 18px 40px -24px rgb(8 15 26 / 28%)"),
  ] as Shadows,

  typography: {
    fontFamily: fonts.sans,
    fontSize: 16,
    /* MUI scales rem against a 16px root; the app sets exactly that. */
    htmlFontSize: 16,
    h1: { fontSize: "52px", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" },
    h2: { fontSize: "30px", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em" },
    h3: { fontSize: "24px", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" },
    h4: { fontSize: "18px", fontWeight: 700, lineHeight: 1.3 },
    h5: { fontSize: "16px", fontWeight: 700, lineHeight: 1.4 },
    h6: { fontSize: "14px", fontWeight: 700, lineHeight: 1.4 },
    subtitle1: { fontSize: "15px", fontWeight: 600, lineHeight: 1.5 },
    subtitle2: { fontSize: "13px", fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: "16px", lineHeight: 1.6 },
    body2: { fontSize: "15px", lineHeight: 1.6 },
    caption: { fontSize: "13px", lineHeight: 1.5 },
    /* The site's .eyebrow, promoted to a typography variant since the portal
       uses it as the label above every page title and panel group. */
    overline: {
      fontSize: "13px",
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      lineHeight: 1.4,
    },
    button: { fontSize: "14px", fontWeight: 600, textTransform: "none", letterSpacing: 0 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "optimizeLegibility",
          fontSynthesis: "none",
        },
        "#root": {
          minHeight: "100svh",
        },
      },
    },

    /*
     * Sized off the rail's 32px rows, a step up so they still read as the
     * thing to press: 36px medium, 30px small, 42px large. Heights are floors
     * rather than padding sums so outlined (with its 1px border) and contained
     * buttons line up, and a label that wraps still grows. The icon sits close
     * to its label, sized down with it.
     */
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          gap: 6,
          minHeight: 36,
          paddingBlock: 6,
          paddingInline: 14,
          lineHeight: "20px",
          borderRadius: geometry.radiusControl,
          "& .MuiButton-startIcon > *:nth-of-type(1), & .MuiButton-endIcon > *:nth-of-type(1)": {
            fontSize: 18,
          },
        },
        sizeLarge: {
          minHeight: 42,
          paddingBlock: 9,
          paddingInline: 20,
          fontSize: "15px",
        },
        sizeSmall: {
          minHeight: 30,
          paddingBlock: 4,
          paddingInline: 10,
          fontSize: "13px",
          lineHeight: "18px",
          "& .MuiButton-startIcon > *:nth-of-type(1), & .MuiButton-endIcon > *:nth-of-type(1)": {
            fontSize: 16,
          },
        },
        startIcon: { marginLeft: -2, marginRight: 0 },
        endIcon: { marginLeft: 0, marginRight: -2 },
        outlined: ({ theme: t }) => ({
          borderColor: t.vars.palette.divider,
          color: t.vars.palette.text.primary,
          "&:hover": {
            borderColor: t.vars.palette.text.primary,
            background: "transparent",
          },
        }),
      },
    },

    /* 36px at medium, beside a medium button, rather than MUI's 40. */
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: { padding: 6 },
      },
    },

    /* The same heights as MuiButton: 36px medium, 30px small, borders included. */
    MuiToggleButton: {
      styleOverrides: {
        root: {
          paddingBlock: 7,
          paddingInline: 12,
          fontSize: "14px",
          lineHeight: "20px",
        },
        sizeSmall: {
          paddingBlock: 5,
          paddingInline: 10,
          fontSize: "13px",
          lineHeight: "18px",
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        /* In dark mode MUI fakes elevation by painting a translucent white
           gradient over `background.paper`, which turns every overlay it
           raises (dialogs at 24, menus at 8) a lighter grey than the brand's
           elevated surface. Exalynt separates surfaces with borders, so the
           overlay comes off everywhere and the flattened `shadows` scale does
           the floating. */
        root: {
          backgroundImage: "none",
        },
        /* Outlined is the house style; `elevation` stays available for the
           overlays (menus, dialogs) that genuinely need to read as floating. */
        outlined: ({ theme: t }) => ({
          borderColor: t.vars.palette.divider,
        }),
      },
    },

    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          "&:last-child": { paddingBottom: 24 },
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: { padding: 24, paddingBottom: 0 },
        title: ({ theme: t }) => t.typography.h4,
        subheader: ({ theme: t }) => ({
          ...t.typography.body2,
          color: t.vars.palette.text.secondary,
        }),
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: geometry.radius,
          fontWeight: 600,
          fontSize: "13px",
        },
        sizeSmall: {
          fontSize: "12px",
          height: 24,
        },
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "transparent",
      },
      styleOverrides: {
        root: ({ theme: t }) => ({
          backgroundColor: t.vars.palette.chrome,
          borderBottom: `1px solid ${t.vars.palette.divider}`,
          backgroundImage: "none",
        }),
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme: t }) => ({
          borderColor: t.vars.palette.divider,
        }),
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: geometry.radius,
          color: t.vars.palette.text.secondary,
          "&:hover": { color: t.vars.palette.text.primary },
          "&.Mui-selected": {
            color: t.vars.palette.primary.main,
            backgroundColor: alpha(brand.blue, 0.1),
            "&:hover": { backgroundColor: alpha(brand.blue, 0.16) },
          },
        }),
      },
    },

    /* The current page is a primary text button's hover, held: a faint wash of
       the primary blue behind a blue number, rather than MUI's solid fill,
       which shouted louder than the table above it. */
    MuiPaginationItem: {
      styleOverrides: {
        root: ({ theme: t }) => {
          const wash = (opacity: number) =>
            `rgba(${t.vars.palette.primary.mainChannel} / ${opacity})`;
          return {
            "&.Mui-selected": {
              fontWeight: 600,
              color: t.vars.palette.primary.main,
              backgroundColor: wash(t.vars.palette.action.hoverOpacity),
              "&:hover, &.Mui-focusVisible": {
                backgroundColor: wash(t.vars.palette.action.selectedOpacity),
              },
            },
          };
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 34,
          color: "inherit",
        },
      },
    },

    MuiTabs: {
      /* Four tabs at this label size are wider than a phone. Scrollable is the
         only variant that degrades gracefully: identical when the strip fits,
         swipeable with arrows when it doesn't. */
      defaultProps: {
        variant: "scrollable",
        scrollButtons: "auto",
        allowScrollButtonsMobile: true,
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "15px",
          minHeight: 48,
        },
      },
    },

    MuiTable: {
      styleOverrides: {
        /* A floor, not a width: on a wide screen nothing changes, and on a
           narrow one the surrounding TableContainer scrolls instead of the
           browser squeezing every column down to one word per line. Tables with
           more columns than this affords raise it themselves. */
        root: {
          minWidth: 560,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderColor: t.vars.palette.divider,
          fontSize: "15px",
        }),
        head: ({ theme: t }) => ({
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: t.vars.palette.text.secondary,
          whiteSpace: "nowrap",
        }),
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },

    /* Menus, selects and autocompletes all float on a Popover paper. They get
       the dialog's treatment for the same reason: a bordered surface reads as
       raised here, a lighter grey one just reads as a different color. */
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme: t }) => ({
          border: `1px solid ${t.vars.palette.divider}`,
          backgroundColor: floatingToken.light,
          ...t.applyStyles("dark", { backgroundColor: floatingToken.dark }),
        }),
      },
    },

    /* An autocomplete's list floats on a Popper rather than a Popover, so it
       takes the same surface here, and its rows match the menu rows below:
       14px, inset with a rounded hover, 32px from sm. Phones keep MUI's 48px
       touch rows. Group headings are the rail's: small, semibold, quiet, on
       the floating surface rather than the paper one. */
    MuiAutocomplete: {
      styleOverrides: {
        paper: ({ theme: t }) => ({
          fontSize: "14px",
          lineHeight: "20px",
          border: `1px solid ${t.vars.palette.divider}`,
          backgroundColor: floatingToken.light,
          ...t.applyStyles("dark", { backgroundColor: floatingToken.dark }),
        }),
        listbox: ({ theme: t }) => ({
          padding: 4,
          "& .MuiAutocomplete-option": {
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: geometry.radius,
            [t.breakpoints.up("sm")]: { minHeight: 32 },
          },
        }),
        groupLabel: ({ theme: t }) => ({
          top: -4,
          paddingLeft: 10,
          paddingRight: 10,
          fontSize: "12px",
          fontWeight: 600,
          lineHeight: "28px",
          backgroundColor: floatingToken.light,
          ...t.applyStyles("dark", { backgroundColor: floatingToken.dark }),
        }),
        /* Under a heading, rows line up with it rather than indenting. */
        groupUl: {
          "& .MuiAutocomplete-option": { paddingLeft: 10 },
        },
        noOptions: { padding: "10px 14px" },
        loading: { padding: "10px 14px" },
      },
    },

    /*
     * Menu rows on the rail's scale: 32px, 14px text, 18px icons, inset from
     * the paper's edge with a rounded hover, like the organization switcher's.
     * MUI's default is a 48px touch row (auto from sm), which makes a one-item
     * action menu look like a panel. Covers select dropdowns too.
     */
    MuiMenu: {
      styleOverrides: {
        list: { padding: 4 },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 32,
          paddingBlock: 6,
          paddingInline: 10,
          fontSize: "14px",
          lineHeight: "20px",
          borderRadius: geometry.radius,
          "& .MuiListItemIcon-root": { minWidth: 28 },
          "& .MuiListItemIcon-root .MuiSvgIcon-root": { fontSize: 18 },
          "& .MuiListItemText-root": { margin: 0 },
          "& .MuiListItemText-primary": { fontSize: "14px", lineHeight: "20px" },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: ({ theme: t }) => ({
          borderRadius: geometry.radiusLarge,
          /* The hairline is what separates the dialog from the page behind it
             now that it no longer lightens itself — the same edge every card
             on the page has. */
          border: `1px solid ${t.vars.palette.divider}`,
          /* Every dialog here is a form. The default 32px inset on each side
             leaves it a narrow column on a phone, so tighten it to 16px and let
             it use the height too. The doubled class outranks `paperWidthSm`
             and `paperFullWidth`, which set the same properties from the
             `maxWidth`/`fullWidth` props. */
          [t.breakpoints.down("sm")]: {
            "&.MuiDialog-paper": {
              margin: 16,
              width: "calc(100% - 32px)",
              maxWidth: "calc(100% - 32px)",
              maxHeight: "calc(100% - 32px)",
            },
          },
        }),
      },
    },

    MuiDialogTitle: {
      defaultProps: {
        variant: "h3",
      },
    },

    MuiAlert: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          fontSize: "15px",
        },
      },
    },

    /* The trail above every page title (see PageBreadcrumbs): quiet, in the
       size and weight the eyebrow it replaced had, with tight separators. */
    MuiBreadcrumbs: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          ...t.typography.subtitle2,
          color: t.vars.palette.text.secondary,
        }),
        separator: {
          marginLeft: 6,
          marginRight: 6,
        },
      },
    },

    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },

    /* The floating surface popovers and menus use (see floatingToken), with
       a hairline edge and a soft shadow; the arrow carries the same surface
       and edge. */
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme: t }) => ({
          fontSize: "13px",
          lineHeight: 1.45,
          padding: "6px 10px",
          borderRadius: geometry.radiusControl,
          color: brand.midnight,
          backgroundColor: floatingToken.light,
          border: `1px solid ${dividerToken.light}`,
          boxShadow: "0 6px 16px -6px rgb(8 15 26 / 25%)",
          ...t.applyStyles("dark", {
            color: brand.textPrimaryDark,
            backgroundColor: floatingToken.dark,
            border: `1px solid ${dividerToken.dark}`,
            boxShadow: "0 8px 24px -6px rgb(0 0 0 / 60%)",
          }),
        }),
        arrow: ({ theme: t }) => ({
          color: floatingToken.light,
          "&::before": { border: `1px solid ${dividerToken.light}` },
          ...t.applyStyles("dark", {
            color: floatingToken.dark,
            "&::before": { border: `1px solid ${dividerToken.dark}` },
          }),
        }),
      },
    },
  },
});
