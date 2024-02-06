import { defineConfig } from "@solidjs/start/config";
import icons from "unplugin-icons/vite";
import unocss from "unocss/vite";

export default defineConfig({
  start: {
    ssr: false,
    server: { preset: "vercel" }
  },

  server: {
    fs: {
      allow: ["../.."]
    }
  },

  // @ts-ignore : Average typing error with Vite
  plugins: [unocss(), icons({ compiler: "solid" })]
});
