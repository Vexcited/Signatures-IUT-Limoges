import { defineConfig } from "@solidjs/start/config";
import unocss from "unocss/vite";

export default defineConfig({
  start: {
    ssr: false,
    server: { preset: "vercel" }
  },

  // @ts-ignore : Average typing error between Vite and UnoCSS.
  plugins: [unocss()]
});
