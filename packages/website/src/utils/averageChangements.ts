import { createSignal } from "solid-js";

const [averageChangements, setAverageChangements] = createSignal(false);

export const authorizeAverageChangements = (authorize: boolean) => {
  setAverageChangements(authorize);
};

export { averageChangements };