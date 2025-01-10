import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),tsconfigPaths()],
  resolve: {
    alias: {
      "@chakra-ui/react": resolve("..", "..", "packages/react/src"),
    },
  },
})