import type { SignaturesDump } from "signatures-iut-limoges";
import { createStore } from "solid-js/store";

/**
 * Allows to set custom averages for each modules globally.
 */
export const [customModulesAverage, setCustomModulesAverage] = createStore<Record<string, number | null>>({});
