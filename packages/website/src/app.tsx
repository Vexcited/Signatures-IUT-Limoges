import "@unocss/reset/tailwind.css";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";
import { Toaster } from "solid-toast";

export default function App () {
  return (
    <>
      <Toaster />
      <Router
        root={props => (
          <Suspense>
            {props.children}
          </Suspense>
        )}
      >
        <FileRoutes />
      </Router>
    </>
  );
}
