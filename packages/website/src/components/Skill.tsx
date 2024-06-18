import type { SignaturesSkillDump } from "signatures-iut-limoges";
import { type Component, For, createSignal, Show, createMemo } from "solid-js";

import MdiChevronDown from '~icons/mdi/chevron-down'
import MdiChevronRight from '~icons/mdi/chevron-right'
import MdiCheck from '~icons/mdi/check'
// import MdiCheckAll from '~icons/mdi/check-all'
import MdiClose from '~icons/mdi/close'
import { customModulesAverage } from "../store/modules";
import { store } from "../store";
import { theme } from "~/store/theme";
import { renderGrade } from "~/utils/grades";
import Module from "./Module";

const fixSkillName = (value: string) => value
  .replace("l?", "l'")
  .replace("d?", "d'");

const Skill: Component<SignaturesSkillDump> = (skill) => {

  const [opened, setOpened] = createSignal(true);

  /**
   * Average calculated using `customModulesAverage`
   * instead of the `skill.globalAverage`
   */
  const customGlobalAverage = createMemo(() => {
    const modules = skill.modules.map(module => ({
      id: module.id,
      coefficient: module.coefficient,
      realAverage: module.average
    }));
  
    let sum = 0;
    let totalCoefficients = 0;

    for (const module of modules) {
      const average = customModulesAverage[module.id] ?? module.realAverage;

      if (average !== null) {
        sum += average * module.coefficient;
        totalCoefficients += module.coefficient;
      }
    }

    if (totalCoefficients === 0) return null;
    return sum / totalCoefficients;
  });

  const average = () => store.useCustomAveragesMode ? customGlobalAverage() : skill.globalAverage;

  return (
    <div class="relative w-full max-w-[578px] flex flex-col gap-1">
      <div class="z-10 sticky top-[113px]">
        {/* Small element to hide elements scrolling in the background. */}
        <div class="-z-10 h-[20px] top-0 inset-x-0 absolute w-full bg-[rgb(9,9,9)]" />

        <div class="overflow-hidden relative h-[58px] mt-[7px] rounded-md flex divide-x divide-[rgb(40,40,40)]/80 border border-[rgb(40,40,40)]/80 bg-[rgb(18,18,18)] text-white">
          <button type="button" onClick={() => setOpened(prev => !prev)} class="px-3.5 h-full flex items-center justify-center text-xl"
            classList={{ "bg-[rgb(24,24,24)]": opened(), "bg-[rgb(18,18,18)]": !opened() }}  
          >
            {opened() ? <MdiChevronDown /> : <MdiChevronRight />}
          </button>

          <div class="flex flex-col w-full overflow-hidden items-start justify-center px-4">
            <span class="text-sm opacity-75">
              UE {skill.id}
            </span>
            <h3 class="truncate w-full" title={skill.name}>
              {fixSkillName(skill.name)}
            </h3>
          </div>

          <div class="flex items-center gap-2 h-full flex-shrink-0 px-3"
            style={{
              background: theme.gradeColor(average(), "15%"),
              color: theme.gradeColor(average(), "100%")
            }}
          >
            {average() ? average()! > 8 ? <MdiCheck /> : <MdiClose /> : null}
            <p class="font-medium text-xl ml-auto">
              {renderGrade(average())}
            </p>
          </div>
        </div>
      </div>

      <div class="z-0 flex border border-[rgb(40,40,40)]/80 divide-y divide-[rgb(40,40,40)]/40 rounded-md w-full"
        classList={{
          "flex-col justify-center": opened(),
          "py-2 gap-4 justify-start px-4 overflow-x-auto": !opened(),
        }}
      >
        <For each={skill.modules}>
          {(module) => <Module {...module} skillOpened={opened()} />}
        </For>
      </div>
      
    </div>
  )
};

export default Skill;
