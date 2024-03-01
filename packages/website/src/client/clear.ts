import { SafeStorage } from "../utils/safeStorage";

export const clearUserData = async (): Promise<void> => {
  await fetch("/api/clear-credentials", { method: "GET" });
  SafeStorage.clear();
  location.reload();
};
