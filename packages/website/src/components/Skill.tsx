import type { SignaturesSkillDump } from "signatures-iut-limoges";
import { type Component, For, createSignal, Show } from "solid-js";

const Skill: Component<SignaturesSkillDump> = (skill) => {
  const [opened, setOpened] = createSignal(true);

  return (
    <div class="relative">
      <a
        role="button"
        class="sticky top-0 px-4 py-2 rounded-t-md border border-[rgb(248,113,113)] flex gap-4 items-center select-none cursor-pointer bg-[rgb(248,113,113)]"
        onClick={() => setOpened(prev => !prev)}
      >
        <p class="w-fit">
          {opened() ? "▼" : "▶"}
        </p>
        <div class="flex flex-col">
          <h2 class="text-sm">
            UE {skill.id}
          </h2>
          <h3>
            {skill.name}
          </h3>
        </div>

        <p class="font-medium text-xl ml-auto">
          {skill.globalAverage ?? "N/A"}
        </p>
      </a>

      <div class="py-2 flex justify-center border border-[rgb(248,113,113)] border-t-0 rounded-b-md"
        classList={{
          "flex-col gap-2": opened(),
          "gap-4": !opened(),
        }}
      >
        <For each={skill.modules}>
          {module => (
            <Show when={opened()}
              fallback={
                <p class="">{module.average?.toFixed(2) ?? "N/A"}</p>
              }
            >
              <div class="flex justify-between hover:bg-[rgb(248,113,113)]/10 transition py-1.5 px-4">
                <h4>{module.id} : {module.name}</h4>
                <div class="flex justify-between w-[100px] items-end">
                  <p>{module.average?.toFixed(2) ?? "N/A"}</p>
                  <p>x{module.coefficient.toFixed(2)}</p>
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
