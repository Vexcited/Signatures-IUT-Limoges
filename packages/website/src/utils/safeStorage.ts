export class SafeStorage {
  private static readWindow (): Window | null {
    if (typeof window === "undefined") {
      return null;
    }

    return window;
  }

  private static readLocalStorage (): typeof localStorage | null {
    const window = SafeStorage.readWindow();
    if (window && "localStorage" in window) {
      return window.localStorage;
    }

    return null;
  }

  public static getItem(key: string): string | null {
    return SafeStorage.readLocalStorage()?.getItem(key) ?? null;
  }

  public static setItem(key: string, value: string): void {
    if (typeof localStorage === "undefined") return;
    SafeStorage.readLocalStorage()?.setItem(key, value);
  }

  public static clear(): void {
    if (typeof localStorage === "undefined") return;
    SafeStorage.readLocalStorage()?.clear();
  }
}
