import type { SignaturesModuleDump } from "signatures-iut-limoges";
import { type Component, Show, createMemo } from "solid-js";
import { customModulesAverage, setCustomModulesAverage } from "~/store/modules";
import { store } from "~/store";
import { renderGrade } from "~/utils/grades";
import { theme } from "~/store/theme";

const Module: Component<SignaturesModuleDump & { skillOpened: boolean }> = (props) => {
  const average = createMemo(() => store.useCustomAveragesMode && customModulesAverage[props.id] ? customModulesAverage[props.id] : props.average);
  const averageNotNull = () => average() !== null;

  return (
    <Show when={props.skillOpened}
      fallback={
        <p class="w-full text-center" style={{ color: averageNotNull() && average()! < 10 ? theme.gradeColor(average()) : void 0 }}>
          {renderGrade(average())}
        </p>
      }
    >
      <div class="w-full flex justify-between items-center hover:bg-white/1 transition-colors py-2.5 px-4 gap-2"
        style={{ "background-color": averageNotNull() && average()! < 10 ? theme.gradeColor(average(), "5%") : void 0 }}
      >
        <h4 class="w-full truncate" title={props.name}>
          <span class="text-sm block opacity-75">{props.id}</span> {props.name}
        </h4>

        <div class="shrink-0 flex flex-col w-fit justify-end items-center">
          <Show when={store.useCustomAveragesMode && props.average === null} fallback={
            <p class="font-medium w-full text-right" style={{ color: averageNotNull() && average()! < 10 ? theme.gradeColor(average()) : void 0 }}>
              {renderGrade(average())}
            </p>
          }>
            <input
              type="text"
              inputmode="numeric"
              class="text-right border border-white rounded-lg bg-black text-white text-center px-2 w-15 outline-none focus:border-custom placeholder-white/25"
              value={customModulesAverage[props.id] ?? ""}
              placeholder="N/A"
              onInput={(event) => {
                event.currentTarget.value = event.currentTarget.value.trim()
                  // Replace commas with dots
                  .replace(/,/g, ".")
                  // Remove any non-numeric characters
                  .replace(/[^0-9.]/g, "");

                let valueAsNumber = parseFloat(event.currentTarget.value);
                if (valueAsNumber >= 20) {
                  valueAsNumber = 20;
                  event.currentTarget.value = "20";
                }

                setCustomModulesAverage(props.id, Number.isNaN(valueAsNumber) ? null : valueAsNumber);
              }}
            />
          </Show>

          <p class="text-[rgb(160,160,160)] text-sm w-full text-right">
            x{props.coefficient.toFixed(2)}
          </p>
        </div>
      </div>
    </Show>
  )
}

export default Module;
