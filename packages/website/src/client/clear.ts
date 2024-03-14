import { SafeStorage } from "../utils/safeStorage";
import { setStore } from "../store";

export const clearUserData = async (shouldExplicitlyClearCredentials: boolean): Promise<void> => {
  if (shouldExplicitlyClearCredentials) await fetch("/api/clear-credentials", { method: "GET" });
  SafeStorage.clear();

  setStore({
    dumpFromAuthentication: false,
    authenticated: false,
    dump: null
  });
};
