import { createStore } from "solid-js/store";
import { SafeStorage } from "../utils/safeStorage";

interface Preferences {
  primaryColor: string
  selectedSemester: string | null
}

export const DEFAULT_PREFERENCES: Required<Preferences> = {
  primaryColor: "248, 113, 113",
  selectedSemester: null
};

const [preferences, _setPreferences] = createStore<Preferences>({
  primaryColor: SafeStorage.getItem("primaryColor") || DEFAULT_PREFERENCES.primaryColor,
  selectedSemester: SafeStorage.getItem("selectedSemester")
});

export const setPrimaryColor = (primaryColor: string) => {
  SafeStorage.setItem("primaryColor", primaryColor);
  _setPreferences({ primaryColor });
};

export const setSelectedSemester = (selectedSemester: string | null) => {
  if (selectedSemester === null) SafeStorage.removeItem("selectedSemester");
  else SafeStorage.setItem("selectedSemester", selectedSemester);
  _setPreferences({ selectedSemester });
};

export { preferences };
