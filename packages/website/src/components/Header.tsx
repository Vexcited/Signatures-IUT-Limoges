import { store } from "~/store";
import { theme } from "~/store/theme";
import UIColorPicker from "./UIColorPicker";
import MdiPaletteSwatchVariant from '~icons/mdi/palette-swatch-variant'

const Header = () => {
  return (
    <header class="z-50 sticky top-0 bg-[rgb(9,9,9)] border-b border-[rgb(40,40,40)]/40 mx-auto container">
      <div class="flex justify-between h-19 px-4  items-center">
        <div class="flex flex-col">
          <h2 class="lg:text-lg">
            {store.dump?.familyName} {store.dump?.firstName}
          </h2>
          <p class="text-xs px-2 py-.5 bg-custom rounded-2 w-fit"
            style={{ color: theme.textColor() }}
          >
            {store.dump?.className}
          </p>
        </div>

        <div class="relative flex items-center gap-4 bg-[rgb(16,16,16)] pl-4 pr-2 py-2 rounded-lg">
          <MdiPaletteSwatchVariant font-size="18" />
          <UIColorPicker />
        </div>
      </div>
    </header>
  );
};

export default Header;
