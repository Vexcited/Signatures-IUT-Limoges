import { defineConfig } from "@solidjs/start/config";
import icons from "unplugin-icons/vite";
import unocss from "unocss/vite";
import { VitePWA as pwa } from "vite-plugin-pwa";

export default defineConfig({
  ssr: false,
  server: {
    preset: "vercel"
  },

  vite: {
    server: {
      fs: {
        allow: ["../.."]
      }
    },

    define: {
      __APP_COMMIT_SHA__: JSON.stringify(process.env.VERCEL_GIT_COMMIT_SHA || "dev")
    },

    plugins: [
      unocss(),
      icons({ compiler: "solid" }),
      pwa({
        base: "/",
        registerType: "prompt",
        injectRegister: null,

        workbox: {
          sourcemap: true,
          cleanupOutdatedCaches: true,
          globPatterns: [
            "**/*.{js,css,html,svg,png,woff,woff2}"
          ],
          navigateFallbackDenylist: [
            /^\/api.*/
          ],
          additionalManifestEntries: [
            { url: "favicon.ico", revision: null },
            { url: "index.html", revision: "REV_INDEX_HTML_TO_CHANGE" }
          ]
        },

        manifest: {
          name: "Signatures - IUT de Limoges",
          short_name: "Signatures - IUT",
          description: "Une PWA simple et fonctionnelle hors-ligne à utiliser pour visualiser ses notes n'importe quand de façon instantané.",

          categories: [
            "productivity"
          ],

          icons: [
            {
              src: "/icons/default.png",
              sizes: "512x512",
              type: "image/png"
            },
            {
              src: "/icons/default.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ],

          // TODO: Add screenshots when the UI is more polished
          // screenshots: [
          //   {
          //     src: "/screenshots/WIDE_HOME.webp",
          //     type: "image/webp",
          //     sizes: "1280x720",
          //     form_factor: "wide",
          //     label: "Visualisation des notes sur ordinateur"
          //   },
          //   {
          //     src: "/screenshots/NARROW_HOME.webp",
          //     type: "image/webp",
          //     sizes: "828x1792",
          //     form_factor: "narrow",
          //     label: "Visualisation des notes sur mobile"
          //   }
          // ],

          start_url: "/",
          theme_color: "#FFFFFF",
          background_color: "#FFFFFF",
          display: "standalone",
          orientation: "portrait"
        }
      })
    ]
  }
});
