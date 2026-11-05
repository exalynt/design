import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeToggle, ToastProvider } from "../components";
import { Brand, geometry, theme } from "../exalynt";
import { catalog } from "./catalog";
import { railItemSx } from "./railItem";
import { Search } from "./Search";
import { Section } from "./Section";

const pages = catalog.flatMap((group) =>
  group.entries.map((entry) => ({ entry, group: group.title })),
);

function pageFromHash() {
  const title = decodeURIComponent(window.location.hash.slice(1));
  return pages.find((page) => page.entry.title === title) ?? pages[0];
}

/* Each entry is its own page at #<title>, so a link to one can be shared. */
function useCurrentPage() {
  const [page, setPage] = useState(pageFromHash);
  useEffect(() => {
    function onHashChange() {
      setPage(pageFromHash());
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return page;
}

function goTo(title: string) {
  window.location.hash = title;
}

/* Set when the page is loaded inside the phone preview (see PhonePreview). */
const framed = pages.find(
  (page) => page.entry.title === new URLSearchParams(window.location.search).get("frame"),
);

export function App() {
  return (
    /* Dark until the visitor picks a mode with the toggle; MUI remembers it. */
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline enableColorScheme />
      {/* Framed, the page has no header to keep the toasts under. */}
      <ToastProvider top={framed ? 0 : geometry.headerHeight}>
        {framed ? (
          /* Just the page, without the chrome, padded as the main area is on a phone. */
          <Box sx={{ px: 2.5, py: 3.5 }}>
            <Section entry={framed.entry} group={framed.group} />
          </Box>
        ) : (
          <Shell />
        )}
      </ToastProvider>
    </ThemeProvider>
  );
}

/*
 * The chrome below matches the portal's AppShell: a full-width top bar and a
 * rail on the `chrome` surface, with the same faint blue glow in dark and the
 * thin blue line along the top bar's edge.
 */
const chromeSurface = (theme: Theme) => ({
  backgroundColor: theme.vars.palette.chrome,
});

const barGlow = (theme: Theme) => {
  const blue = theme.vars.palette.primary.mainChannel;
  return {
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -1,
      height: "1px",
      background: `linear-gradient(90deg, rgba(${blue} / 40%), transparent 40%)`,
    },
    ...theme.applyStyles("dark", {
      backgroundImage: `radial-gradient(45% 220% at 0% 0%, rgba(${blue} / 12%), transparent)`,
      "&::after": {
        background: `linear-gradient(90deg, rgba(${blue} / 55%), transparent 45%)`,
      },
    }),
  };
};

const railGlow = (theme: Theme) =>
  theme.applyStyles("dark", {
    backgroundImage: `radial-gradient(160% 45% at 0% 0%, rgba(${theme.vars.palette.primary.mainChannel} / 10%), transparent)`,
  });

function RailNav({ current, onNavigate }: { current: string; onNavigate?: () => void }) {
  return (
    <Box component="nav" aria-label="Design system" sx={{ px: 1.5, py: 2 }}>
      {catalog.map((group, index) => (
        <Box key={group.title} sx={{ mt: index === 0 ? 0 : 2 }}>
          <Typography
            component="h2"
            sx={{
              px: 1,
              mb: 0.5,
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1.5,
              color: "text.secondary",
            }}
          >
            {group.title}
          </Typography>
          <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {group.entries.map((entry) => {
              const Icon = entry.icon;
              const selected = entry.title === current;
              return (
                <ListItemButton
                  key={entry.title}
                  component="a"
                  href={`#${entry.title}`}
                  selected={selected}
                  aria-current={selected ? "page" : undefined}
                  onClick={onNavigate}
                  sx={railItemSx}
                >
                  <ListItemIcon>
                    <Icon sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={entry.title}
                    sx={{ my: 0 }}
                    slotProps={{
                      primary: {
                        noWrap: true,
                        sx: { fontSize: 14, fontWeight: selected ? 600 : 500 },
                      },
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      ))}
    </Box>
  );
}

function Shell() {
  const page = useCurrentPage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100svh" }}>
      <AppBar position="sticky" sx={[chromeSurface, barGlow]}>
        {/* Pinned at every breakpoint because the rail is offset by it. */}
        <Toolbar
          sx={{
            minHeight: { xs: geometry.headerHeight, sm: geometry.headerHeight },
            height: geometry.headerHeight,
            gap: 1,
            px: { sm: 2.5 },
          }}
        >
          <IconButton
            onClick={() => setDrawerOpen((open) => !open)}
            edge="start"
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            aria-expanded={drawerOpen}
            sx={{ display: { md: "none" }, ml: -1, flexShrink: 0 }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Brand product="Design" compact />
          <Box sx={{ flex: 1 }} />
          {/* A search box from sm, an icon on phones; ⌘K or "/" opens it anywhere. */}
          <Search
            onSelect={(title) => {
              closeDrawer();
              goTo(title);
            }}
          />
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, display: "flex" }}>
        <Box
          component="aside"
          sx={{ width: geometry.sidebarWidth, flexShrink: 0, display: { xs: "none", md: "block" } }}
        >
          <Box
            sx={[
              chromeSurface,
              railGlow,
              {
                position: "fixed",
                top: geometry.headerHeight,
                bottom: 0,
                width: geometry.sidebarWidth,
                overflowY: "auto",
                borderRight: 1,
                borderColor: "divider",
              },
            ]}
          >
            <RailNav current={page.entry.title} />
          </Box>
        </Box>

        <Drawer
          open={drawerOpen}
          onClose={closeDrawer}
          sx={{ display: { md: "none" } }}
          slotProps={{
            paper: { sx: [chromeSurface, railGlow, { width: geometry.sidebarWidth }] },
          }}
        >
          {/* The drawer covers the top bar, so it carries the brand itself. */}
          <Box
            sx={{
              height: geometry.headerHeight,
              display: "flex",
              alignItems: "center",
              px: 2.5,
              flexShrink: 0,
            }}
          >
            <Brand product="Design" />
          </Box>
          <Divider />
          <RailNav current={page.entry.title} onNavigate={closeDrawer} />
        </Drawer>

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            px: { xs: 2.5, md: 4 },
            py: { xs: 3.5, md: 5 },
            width: "100%",
            maxWidth: 1040,
            mx: "auto",
          }}
        >
          <Section key={page.entry.title} entry={page.entry} group={page.group} />
        </Box>
      </Box>
    </Box>
  );
}
