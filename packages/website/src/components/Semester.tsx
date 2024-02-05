import type { SignaturesSemesterDump } from "signatures-iut-limoges";
import { type Component, For } from "solid-js";
import Skill from "./Skill";

const Semester: Component<SignaturesSemesterDump> = (semester) => {
  return (
    <div class="flex flex-col gap-4">
      <For each={semester.skills}>
        {skill => <Skill {...skill} />}
      </For>
    </div>
  )
};

export default Semester;
