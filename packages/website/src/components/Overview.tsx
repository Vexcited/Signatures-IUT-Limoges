import { type Component, createSignal, Show } from "solid-js"
import OverviewTopBar from "./OverviewTopBar"

const Overview: Component = () => {
  const [opened, setOpened] = createSignal(false); // TODO: default to true when component is done

  return (
    <div class="relative">
      <OverviewTopBar opened={opened()} onOpenChange={setOpened} />
      <Show when={opened()}>
        <section class="border-b border-[rgb(40,40,40)]/40 bg-[rgb(16,16,16)] ">
          <div class="container mx-auto px-12 flex flex-col items-center justify-center py-8 gap-4">
            <h1 class="text-xl font-semibold text-center">
              Cette fonctionnalité est en cours de développement.
            </h1>
            <p class="opacity-50">Revenez plus tard :')</p>
          </div>
        </section>
      </Show>
    </div>
  )
};

export default Overview;
