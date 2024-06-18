import { For, type Component } from "solid-js";
import TopNavigationBar from "./TopNavigationBar";
import { setStore, store } from "~/store";
import { preferences, setSelectedSemester } from "~/store/preferences";
import { theme } from "~/store/theme";
import { cleanSemesterName } from "~/utils/cleaners";
import MdiTextBoxEditOutline from '~icons/mdi/text-box-edit-outline'

const SemestersTopNavigationBar: Component = () => (
  <TopNavigationBar>
    <div class="flex w-full border-l border-[rgb(40,40,40)]/40 divide-x divide-[rgb(40,40,40)]/40">
      <For each={store.dump!.semesters}>
        {semester => (
            <button
              class="w-full transition-colors"
              onClick={() => setSelectedSemester(semester.name)}
              classList={{
                "bg-custom": semester.name === preferences.selectedSemester,
                "bg-transparent hover:bg-[rgb(14,14,14)]": semester.name !== preferences.selectedSemester,
              }}
              style={{
                color: semester.name === preferences.selectedSemester ? theme.textColor() : "white"
              }}
            >
              {cleanSemesterName(semester.name)}
            </button>
        )}
      </For>
    </div>
    <button type="button" class="flex-shrink-0 px-3.5 py-2 border-x border-[rgb(40,40,40)]/40 transition-colors"
      onClick={() => setStore("useCustomAveragesMode", prev => !prev)}
      classList={{
        "bg-[rgb(24,24,24)]": store.useCustomAveragesMode,
        "bg-transparent hover:bg-[rgb(18,18,18)]": !store.useCustomAveragesMode
      }}
    >
      <MdiTextBoxEditOutline />
    </button>
  </TopNavigationBar>
);

export default SemestersTopNavigationBar;
