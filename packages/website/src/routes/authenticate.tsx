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

      <div class="h-screen flex">
        <div class="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(12,12,12)] h-full w-full hidden lg:block border-r border-[rgb(40,40,40)]" />

        <main class="flex flex-col items-center flex-shrink-0 w-full lg:max-w-[600px]">
          <div class="flex flex-col bg-[rgb(18,18,18)] border-b border-[rgb(40,40,40)] p-4 lg:p-8 w-full">
            <h1 class="text-lg">
              Connexion à Signatures
            </h1>
            <p class="text-sm my-2 opacity-80">
              Notez que ces identifiants vont être utilisés pour se connecter à
              "<a class="underline" href="https://iut-signatures.unilim.fr/">iut-signatures.unilim.fr</a>" uniquement.
              <br /><br />
              Étant donné que le serveur web est protégé par le VPN de l'université, on utilise le proxy "<a class="underline" href="https://iut-signatures-proxy.vexcited.com/">iut-signatures-proxy.vexcited.com</a>".
            </p>
          </div>

          <form onSubmit={handleAuthenticate}
            class="p-4 lg:p-8 flex flex-col gap-4 w-full h-full lg:h-auto justify-between lg:justify-start"
          >
            <div class="flex flex-col gap-6">
              <label class="flex flex-col gap-1">
                <span class="text-sm text-white/85">Nom d'utilisateur</span>
                <input name="username" type="text"
                  class="border border-[rgb(80,80,80)] rounded-md bg-transparent text-white px-4 py-2 outline-none focus:outline-white/90"
                  value={username()}
                  onInput={(e) => setUsername(e.currentTarget.value)}
                  placeholder="Nom d'utilisateur"
                />
              </label>
              <label class="flex flex-col gap-1">
                <span class="text-sm text-white/85">Mot de passe</span>
                <input name="password" type="password"
                  class="border border-[rgb(80,80,80)] rounded-md bg-transparent text-white px-4 py-2 outline-none focus:outline-white/90"
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Mot de passe"
                />
              </label>
            </div>
            
            <Show when={error()}>
              <div class="border border-red rounded-md text-center bg-red/10 py-4 flex flex-col gap-2">
                <p class="text-lg">Une erreur est survenue !</p>
                <p class="text-red text-sm text-center">
                  {error() || "(aucune erreur renvoyée)"}
                </p>
              </div>
            </Show>

            <button type="submit"
              disabled={loading()}
              class="bg-white hover:bg-white/60 rounded-md px-4 py-2 text-[rgb(9,9,9)] transition-colors w-full md:mt-8 outline-none focus:outline-white/90"
            >
              {loading() ? "Connexion..." : "Se connecter"}
            </button>

          </form>
        </main>
      </div>

    </>
  );
}