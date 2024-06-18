import { onMount, Show } from "solid-js";
import { Navigate } from "@solidjs/router";
import { setStore, store } from "../store";
import { createDump } from "../client/dump";
import Semester from "../components/Semester";
import { clearUserData } from "../client/clear";

import MdiCardsHeart from '~icons/mdi/cards-heart'
import { SafeStorage } from "../utils/safeStorage";
import toast from "solid-toast";
import { preferences } from "../store/preferences";
import Header from "~/components/Header";
import SemestersTopNavigationBar from "~/components/SemestersTopNavigationBar";
import Overview from "~/components/Overview";

export default function Home() {
  const selectedSemesterDump = () => {
    if (typeof preferences.selectedSemester === "string" && store.dump) {
      const semester = store.dump.semesters.find(semester => semester.name === preferences.selectedSemester)
      if (semester) return semester;
    }

    return null;
  }

  onMount(async () => {
    if (store.dumpFromAuthentication) return;

    try {
      const dump = await createDump();
  
      if (dump.status === 403) {
        await clearUserData(false);
        return;
      }
      else if (dump.status !== 200) {
        const message = await dump.text();
        toast.error(message);
        return;
      }
  
      const data = await dump.json();
      SafeStorage.setItem("dump", JSON.stringify(data));
  
      setStore({ dump: data, authenticated: true });
      toast.success("Données mises à jour !");
    }
    catch {
      toast("Vous êtes hors-ligne: les données peuvent être obsolètes.");
    }
  })

  return (
    <div class="relative flex min-h-screen flex-col"
      classList={{
        "h-screen": selectedSemesterDump() === null,
        "h-full": selectedSemesterDump() !== null
      }}
    >
      <Show when={!store.dump && !store.authenticated}>
        <Navigate href="/authenticate" />
      </Show>

      <div class="h-full">
        <Header />
        <Overview />
        <SemestersTopNavigationBar />
        <main class="pt-6 pb-12 mx-auto w-full p-4 space-y-2 h-full">
          <Show when={store.dump} fallback={
            <p class="text-center animate-pulse">
              Récupération des données...
            </p>
          }>
            <div class="container mx-auto w-full">
              <Show when={selectedSemesterDump()} fallback={
                <p class="text-center opacity-50">
                  Sélectionnez un semestre ci-dessus pour voir les détails.
                </p>
              }>
                {semester => <Semester {...semester()} />}
              </Show>
            </div>
          </Show>
        </main>
      </div>

      <div>
        <footer class="py-6 flex flex-col items-center justify-center text-center border-t border-[rgb(40,40,40)]/40">
          <p class="flex flex-col pb-2 items-center">
            <span class="flex items-center gap-1">Made with <MdiCardsHeart class="text-custom" /> by</span>
            <span class="flex items-center gap-1"><a class="font-medium opacity-80 hover:opacity-100 text-custom" href="https://github.com/Vexcited" target="_blank">Vexcited</a> and <a class="font-medium opacity-80 hover:opacity-100 text-custom" href="https://github.com/Vexcited/Signatures-IUT-Limoges/graphs/contributors" target="_blank">contributors</a></span>
          </p>
          <a href={`https://github.com/Vexcited/Signatures-IUT-Limoges/tree/${__APP_COMMIT_SHA__=== "dev" ? "main" : __APP_COMMIT_SHA__}`} class="text-xs pt-1 text-custom/80 hover:(underline text-custom)">
            {__APP_COMMIT_SHA__ === "dev" ? "development version" :__APP_COMMIT_SHA__}
          </a>
        </footer>

        <button class="w-full hover:opacity-80 px-4 py-6 bg-red text-black border-t border-[rgb(40,40,40)]/40 uppercase font-medium transition-colors"
          onClick={() => clearUserData(true)}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}