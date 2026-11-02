import { defineConfig } from "vite";

// Builds the npm package into dist/, one entry per layer. The design system
// page has its own config, vite.config.ts.
export default defineConfig({
  build: {
    outDir: "dist",
    copyPublicDir: false,
    lib: {
      entry: {
        components: "src/components/index.ts",
        exalynt: "src/exalynt/index.ts",
      },
      formats: ["es"],
    },
    rolldownOptions: {
      // The app brings its own React and MUI, so the theme context it sets up
      // is the one these components read. dayjs comes with MUI's date pickers.
      external: /^(react|react-dom|dayjs|@mui\/[^/]+|@emotion\/[^/]+)(\/.*)?$/,
    },
  },
});
