import { SafeStorage } from "../utils/safeStorage";

export const clearUserData = async (shouldExplicitlyClearCredentials: boolean): Promise<void> => {
  if (shouldExplicitlyClearCredentials) await fetch("/api/clear-credentials", { method: "GET" });
  SafeStorage.clear();
  location.reload();
};
