import { defineConfig, presetUno, transformerVariantGroup } from "unocss";
import { presetKobalte } from "unocss-preset-primitives";

export default defineConfig({
  presets: [presetUno(), presetKobalte()],
  transformers: [transformerVariantGroup()],

  theme: {
    colors: {
      custom: "rgba(var(--custom-color), %alpha)"
    },

    // breakpoints: {
    //   tablet: "768px",
    //   "laptop-sm": "1024px",
    //   "laptop-lg": "1440px"
    // },

    animation: {
      keyframes: {
        "scale-in": "{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}",
        "scale-out": "{from{opacity:1;transform:scale(&)}to{opacity:0;transform:scale(0.96)}}"
      }
    }
  }
});
