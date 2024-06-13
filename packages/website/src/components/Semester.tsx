import type { SignaturesSemesterDump } from "signatures-iut-limoges";
import { type Component, For, createEffect, on } from "solid-js";
import { customModulesAverage, setCustomModulesAverage } from "../store/modules";
import Skill from "./Skill";

const Semester: Component<SignaturesSemesterDump> = (semester) => {
  createEffect(on(() => semester.skills, (skills) => {
    for (const skill of semester.skills) {
      for (const module of skill.modules) {
        if (typeof customModulesAverage[module.id] !== "undefined") continue;
        setCustomModulesAverage(module.id, module.average);
      }
    }
  }));

  return (
    <div class="flex flex-col gap-4">
      <For each={semester.skills}>
        {skill => <Skill {...skill} />}
      </For>
    </div>
  )
};

export default Semester;
