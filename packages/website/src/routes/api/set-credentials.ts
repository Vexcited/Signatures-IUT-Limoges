import type { APIHandler } from "@solidjs/start/server";
import { setCookie } from "vinxi/http";

import { encryptCredentials } from "../../server/credentials";

export const POST: APIHandler = async ({ request, nativeEvent }) => {
  const { username, password } = await request.json();
  if (!username || !password) return new Response("Le nom d'utilisateur ou mot de passe n'a pas été saisi.", { status: 400 });

  const encrypted = encryptCredentials(username, password);

  setCookie(nativeEvent, "credentials", encrypted, {
    path: "/",
    httpOnly: true,
    sameSite: "strict"
  });

  return new Response(null, {
    status: 200
  });
};
