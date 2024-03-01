import type { SignaturesSkillDump } from "signatures-iut-limoges";
import { type Component, For, createSignal, Show } from "solid-js";

import MdiChevronDown from '~icons/mdi/chevron-down'
import MdiChevronRight from '~icons/mdi/chevron-right'

const Skill: Component<SignaturesSkillDump> = (skill) => {
  const [opened, setOpened] = createSignal(true);

  return (
    <div class="relative w-full">
      <a
        role="button"
        class="sticky top-0 px-4 py-2 rounded-t-md border border-[rgb(248,113,113)] flex gap-4 items-center select-none cursor-pointer bg-[rgb(248,113,113)]"
        onClick={() => setOpened(prev => !prev)}
      >
        <p class="w-fit">
          {opened() ? <MdiChevronDown /> : <MdiChevronRight />}
        </p>
        <div class="flex flex-col w-full overflow-hidden">
          <h2 class="text-sm">
            UE {skill.id}
          </h2>
          <h3 class="truncate">
            {skill.name}
          </h3>
        </div>

        <p class="font-medium text-xl ml-auto">
          {skill.globalAverage ?? "N/A"}
        </p>
      </a>

      <div class="py-2 flex border border-[rgb(248,113,113)] border-t-0 rounded-b-md w-full"
        classList={{
          "flex-col gap-2 justify-center": opened(),
          "gap-4 justify-start px-4 overflow-x-auto": !opened(),
        }}
      >
        <For each={skill.modules}>
          {module => (
            <Show when={opened()}
              fallback={
                <p class="w-full text-center">{module.average?.toFixed(2) ?? "N/A"}</p>
              }
            >
              <div class="w-full flex justify-between hover:bg-[rgb(248,113,113)]/10 transition py-1.5 px-4 gap-2">
                <h4 class="w-full truncate">
                  <span class="text-sm block">{module.id}</span> {module.name}
                </h4>

                <div class="shrink-0 flex flex-col w-fit justify-end items-center">
                  <p class="font-medium w-full text-right">{module.average?.toFixed(2) ?? "N/A"}</p>
                  <p class="text-[rgb(160,160,160)] text-sm w-full text-right">x{module.coefficient.toFixed(2)}</p>
                </div>
              </div>
            </Show>
          )}
        </For>
      </div>
      
    </div>
  )
};

export default Skill;
