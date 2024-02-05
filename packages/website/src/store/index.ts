import type { SignaturesDump } from "signatures-iut-limoges";
import { createStore } from "solid-js/store";

let firstLoadDump: string | null = null;
if (typeof window !== "undefined") {
  firstLoadDump = localStorage.getItem("dump");
}

export const [store, setStore] = createStore({
  authenticated: false,
  dump: firstLoadDump ? JSON.parse(firstLoadDump) as SignaturesDump : null,
  dumpFromAuthentication: false
});
