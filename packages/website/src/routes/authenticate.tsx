import { type JSX, Show, createSignal, batch } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createDump } from "../client/dump";
import { setStore } from "../store";

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

    setStore({ dump: data, dumpFromAuthentication: true });
    localStorage.setItem("dump", JSON.stringify(data));
    navigate("/");
  }

  return (
    <main>
      <h1>Connexion</h1>
      <form onSubmit={handleAuthenticate}>
        <div>
          <input name="username" type="text"
            value={username()}
            onInput={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div>
          <input name="password" type="password"
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        
        <button type="submit">
          Connexion à Signatures
        </button>

        <Show when={loading()}>
          <p>
            Loading...
          </p>
        </Show>
        <Show when={error()}>
          <p>
            {error()}
          </p>
        </Show>
      </form>
    </main>
  );
}