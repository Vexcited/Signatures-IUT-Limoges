import "@unocss/reset/tailwind.css";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense, createEffect } from "solid-js";
import { Toaster } from "solid-toast";
import { preferences } from "./store/preferences";
import { MetaProvider, Meta } from "@solidjs/meta";
import { rgbToHex } from "./utils/colors";
import Updater from "./components/modals/Updater";

export default function App () {
  const primaryColor = () => preferences.primaryColor;
  const primaryColorHEX = () => primaryColor()
    .split(",")
    .map(i => parseInt(i.trim())) as [r: number, g: number, b: number];

  createEffect(() => {
    // setup the custom color from the user preferences.
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--custom-color', primaryColor());
  });

  return (
    <>
      <Toaster />
      <Router
        root={props => (
          <MetaProvider>
            <Meta name="theme-color" content={rgbToHex(...primaryColorHEX())} />
            <Updater />

            <Suspense>
              {props.children}
            </Suspense>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </>
  );
}
