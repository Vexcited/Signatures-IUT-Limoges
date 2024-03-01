import type { SignaturesDump } from "signatures-iut-limoges";
import { createStore } from "solid-js/store";
import { SafeStorage } from "../utils/safeStorage";

const firstLoadDump = SafeStorage.getItem("dump");

export const [store, setStore] = createStore({
  authenticated: false,
  dump: firstLoadDump ? JSON.parse(firstLoadDump) as SignaturesDump : null,
  dumpFromAuthentication: false
});
