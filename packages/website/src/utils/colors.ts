import { preferences } from "~/store/preferences";

function componentToHex(c: number) {
  try {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  catch {
    return "00";
  }
}

export function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// http://www.w3.org/TR/AERT#color-contrast
export const textColorOnCustomBackground = (color: string) => {
  const [r, g, b] = color.split(",").map(Number);
  const brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);

  return (brightness > 125) ? "black" : "white";
};
