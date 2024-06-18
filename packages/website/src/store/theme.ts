import { createMemo, createRoot } from "solid-js";
import { textColorOnCustomBackground } from "~/utils/colors";
import { preferences } from "./preferences";

export const theme = createRoot(() => {
  const textColor = createMemo(() => {
    return textColorOnCustomBackground(preferences.primaryColor);
  });

  return { textColor,
    gradeColor (value: number | null, alpha = "100%") {
      if (value === null) return `rgb(160 160 160 / ${alpha})`;
      else if (value < 8) return `rgb(248 113 113 / ${alpha})`;
      else if (value < 10) return `rgb(248 178 123 / ${alpha})`;
      return `rgb(123 248 136 / ${alpha})`;
    }
  };
});
