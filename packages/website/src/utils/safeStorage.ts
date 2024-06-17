export class SafeStorage {
  private static _readWindow (): Window | null {
    if (typeof window === "undefined") {
      return null;
    }

    return window;
  }

  private static _readLocalStorage (): Storage | null {
    const window = SafeStorage._readWindow();
    if (window && "localStorage" in window) {
      return window.localStorage;
    }

    return null;
  }

  public static getItem(key: string): string | null {
    return SafeStorage._readLocalStorage()?.getItem(key) ?? null;
  }

  public static setItem(key: string, value: string): void {
    SafeStorage._readLocalStorage()?.setItem(key, value);
  }

  public static removeItem(key: string): void {
    SafeStorage._readLocalStorage()?.removeItem(key);
  }

  public static clear(): void {
    SafeStorage._readLocalStorage()?.clear();
  }
}
