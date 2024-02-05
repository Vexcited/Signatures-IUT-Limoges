export const clearUserData = async (): Promise<void> => {
  await fetch("/api/clear-credentials", { method: "GET" });
  localStorage.clear();
  location.reload();
};
