import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/montador-cartas-boardgame/",
  build: {
    outDir: "docs", // ← Adicione esta linha
  },
});
