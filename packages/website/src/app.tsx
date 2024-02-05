import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";

export default function App () {
  return (
    <Router
      root={props => (
        <Suspense>
          {props.children}
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
