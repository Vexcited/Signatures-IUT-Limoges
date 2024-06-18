import '@thednp/solid-color-picker/style.css';
import '../styles/overwrite-color-picker.css';

import { type Component } from "solid-js";
import { preferences, setPrimaryColor } from "~/store/preferences";

import { DefaultColorPicker } from '@thednp/solid-color-picker'

const UIColorPicker: Component = () => {
  let pastColor = preferences.primaryColor;
  
  return (
    <DefaultColorPicker lang='fr' id='color-picker' format="rgb" value={"rgb(" + preferences.primaryColor + ")"} onChange={color => {     
      if (color === pastColor) return;
      
      pastColor = color;
      color = color.replace("rgb(", "").replace(")", "");
      setPrimaryColor(color);
    }} />
  )
};

export default UIColorPicker;
