import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    reporters: ["html", "default"],
    globals: true,
    environment: "happy-dom",
    setupFiles: ["src/__tests__/utils/setupTest.ts"],
    coverage: {
      include: ["src/**"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts"],
      provider: "v8",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
