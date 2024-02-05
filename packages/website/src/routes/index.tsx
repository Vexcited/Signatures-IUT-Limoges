import { onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";

import { setStore, store } from "../store";
import { createDump } from "../client/dump";

export default function Home() {
  const navigate = useNavigate();
  onMount(async () => {
    if (store.dumpFromAuthentication) return;

    const dump = await createDump();

    if (dump.status !== 200) {
      navigate("/authenticate");
      return;
    }

    const data = await dump.json();
    localStorage.setItem("dump", JSON.stringify(data));

    setStore({ dump: data });
  })

  return (
    <main class="w-full p-4 space-y-2">
      {JSON.stringify(store.dump)}
    </main>
  );
}