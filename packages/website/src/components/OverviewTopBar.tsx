import { type Component } from "solid-js";
import TopNavigationBar from "./TopNavigationBar";
import MdiChevronDown from '~icons/mdi/chevron-down'
import MdiChevronRight from '~icons/mdi/chevron-right'

const OverviewTopBar: Component<{ opened: boolean, onOpenChange: (opened: boolean) => void }> = (props) => {
  return (
    <TopNavigationBar>
      <div class="flex items-center justify-center w-full border-l border-[rgb(40,40,40)]/40">
        <p>Vue d'ensemble</p>
      </div>
      <button type="button" class="flex-shrink-0 px-3.5 py-2 transition-colors border-x border-[rgb(40,40,40)]/40"
        classList={{
          "bg-[rgb(24,24,24)]": props.opened,
          "bg-transparent hover:bg-[rgb(18,18,18)]": !props.opened
        }}
        onClick={() => props.onOpenChange(!props.opened)}
      >
        {props.opened ? <MdiChevronDown /> : <MdiChevronRight />}
      </button>
    </TopNavigationBar>
  )
};

export default OverviewTopBar;
