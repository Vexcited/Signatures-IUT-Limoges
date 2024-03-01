import { onMount, Show, For, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { setStore, store } from "../store";
import { createDump } from "../client/dump";
import Semester from "../components/Semester";
import { clearUserData } from "../client/clear";

import MdiCardsHeart from '~icons/mdi/cards-heart'
import { SafeStorage } from "../utils/safeStorage";

export default function Home() {
  const navigate = useNavigate();
  
  /** `null` when not selected yet. */
  const [_selectedSemester, _setSelectedSemester] = createSignal(SafeStorage.getItem("selectedSemester"));
  /** Helper function that also stores in the localStorage to keep preference on reload. */
  const setSelectedSemester = (semester: string) => {
    SafeStorage.setItem("selectedSemester", semester);
    _setSelectedSemester(semester);
  };

  const selectedSemester = () => {
    if (typeof _selectedSemester() === "string" && store.dump) {
      const semester = store.dump.semesters.find(semester => semester.name === _selectedSemester())
      if (semester) return semester;
    }

    return null;
  }

  onMount(async () => {
    if (store.dumpFromAuthentication) return;
    const dump = await createDump();

    if (dump.status !== 200) {
      navigate("/authenticate");
      return;
    }

    const data = await dump.json();
    SafeStorage.setItem("dump", JSON.stringify(data));

    setStore({ dump: data });
  })

  return (
    <main class="pt-6 pb-12 mx-auto max-w-[864px] w-full p-4 space-y-2">
      <Show when={store.dump} fallback={
        <p class="text-center">Récupération des données...</p>
      }>
        {dump => (
          <div class="w-full">
            <header class="flex flex-col items-center justify-center gap-4">
              <div class="flex flex-col items-center justify-center gap-1">
                <h1 class="text-xl font-medium text-center">
                  {dump().firstName} {dump().familyName}
                </h1>
                <p class="text-center">
                  Étudiant en {dump().className}
                </p>
              </div>

              <button class="text-sm opacity-50 hover:opacity-100 px-3 py-1 bg-[rgb(240,240,240)] text-[rgb(20,20,20)] rounded-lg"
                onClick={clearUserData}
              >
                Effacer toutes les données
              </button>
            </header>

            <div class="flex items-center justify-center gap-2 my-6">
              <For each={dump().semesters}>
                {semester => (
                    <button
                      class="w-fit px-4 py-2 rounded-md border border-[rgb(248,113,113)]"
                      onClick={() => setSelectedSemester(semester.name)}
                      classList={{
                        "bg-[rgb(248,113,113)] text-white": semester.name === _selectedSemester(),
                      }}
                    >
                      {semester.name}
                    </button>
                )}
              </For>
            </div>

            <Show when={selectedSemester()} fallback={
              <p class="text-center">Sélectionnez un semestre pour voir les détails.</p>
            }>
              {semester => <Semester {...semester()} />}
            </Show>
          </div>
        )}
      </Show>

      <footer class="pt-6 flex flex-col items-center justify-center text-center">
        <p class="flex gap-1 items-center">Made with <MdiCardsHeart /> by <a class="font-medium opacity-80 hover:opacity-100" href="https://github.com/Vexcited">Vexcited</a></p>
        <a class="text-sm opacity-60" href="https://github.com/Vexcited/Signatures-IUT-Limoges/tree/main">
          Deployed from latest main commit
        </a>
      </footer>
    </main>
  );
}