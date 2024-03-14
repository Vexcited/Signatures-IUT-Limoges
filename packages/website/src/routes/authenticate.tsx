import { type JSX, Show, createSignal, batch } from "solid-js";
import { useNavigate, Navigate } from "@solidjs/router";
import { createDump } from "../client/dump";
import { setStore, store } from "../store";
import { SafeStorage } from "../utils/safeStorage";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleAuthenticate: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (event) => {
    event.preventDefault();

    batch(() => {
      setLoading(true);
      setError("");
    })

    const credentials = await fetch("/api/set-credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username(), password: password() })
    });

    if (credentials.status !== 200) {
      const error = await credentials.text();

      batch(() => {
        setError(error);
        setLoading(false);
      });

      return;
    }

    const dump = await createDump();
    if (dump.status !== 200) {
      const error = await dump.text();

      batch(() => {
        setError(error);
        setLoading(false);
      });

      return;
    }

    const data = await dump.json();
    setLoading(false);

    setStore({ dump: data, dumpFromAuthentication: true, authenticated: true });
    SafeStorage.setItem("dump", JSON.stringify(data));
    navigate("/");
  }

  return (
    <>
      <Show when={store.dump}>
        <Navigate href="/" />
      </Show>

      <main class="flex flex-col items-center justify-center h-screen p-4">
        <h1 class="text-xl">
          Saisie des identifiants
        </h1>
        <p class="text-sm text-center my-2 max-w-[300px]">
          Ces identifiants vont être utilisé pour se connecter au VPN de l'Université pour enfin se connecter à Signatures.
        </p>

        <form onSubmit={handleAuthenticate}
          class="flex flex-col gap-4 w-full max-w-[300px] p-4"
        >
          <input name="username" type="text"
            class="border border-gray-300 rounded-md bg-transparent text-white px-4 py-2"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
            placeholder="Nom d'utilisateur"
          />
          <input name="password" type="password"
            class="border border-gray-300 rounded-md bg-transparent text-white px-4 py-2"
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            placeholder="Mot de passe"
          />
          
          <button type="submit"
            disabled={loading()}
            class="bg-[rgb(248,113,113)] text-white rounded-md px-4 py-2 hover:bg-[rgb(248,113,113)]/90 transition w-full"
          >
            {loading() ? "Connexion..." : "Se connecter !"}
          </button>

          <Show when={error()}>
            <p class="text-red text-sm text-center">
              Erreur: {error()}
            </p>
          </Show>
        </form>
      </main>
    </>
  );
}