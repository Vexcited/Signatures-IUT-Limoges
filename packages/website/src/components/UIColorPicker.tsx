import { type Component } from "solid-js";

import { DefaultColorPicker } from '@thednp/solid-color-picker'
import '@thednp/solid-color-picker/style.css' 
import { preferences, setPrimaryColor } from "~/store/preferences";

const UIColorPicker: Component = () => {
  let pastColor = preferences.primaryColor;
  
  return (
    <DefaultColorPicker format="rgb" value={"rgb(" + preferences.primaryColor + ")"} onChange={color => {     
      if (color === pastColor) return;
      
      pastColor = color;
      color = color.replace("rgb(", "").replace(")", "");
      setPrimaryColor(color);
    }} />
  )
};

export default UIColorPicker;
