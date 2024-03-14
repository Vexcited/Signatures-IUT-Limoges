import type { APIHandler } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";

import { decryptCredentials } from "../../server/credentials";
import { createLogoutResponse } from "../../server/logout";

import {
  dumpSignatureResponse,
  readSignaturesPageFromWebVPN,
  WebVPNWrongCredentials,
  WebVPNRateLimited
} from "signatures-iut-limoges";

export const GET: APIHandler = async ({ nativeEvent }) => {
  const cookie = getCookie(nativeEvent, "credentials");
  if (!cookie) return createLogoutResponse(nativeEvent);

  const credentials = decryptCredentials(cookie);

  try {
    const buffer = await readSignaturesPageFromWebVPN(credentials.username, credentials.password) as unknown as Buffer;
    const html = buffer.toString("latin1");
    const dump = dumpSignatureResponse(html);

    return new Response(JSON.stringify(dump), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  catch (error) {
    console.error(error);
    if (error instanceof WebVPNWrongCredentials) {
      return createLogoutResponse(nativeEvent);
    }
    else if (error instanceof WebVPNRateLimited) {
      return new Response("Le serveur WebVPN a bloqué l'accès à cause de trop de tentatives.", { status: 429 });
    }

    return new Response("Une erreur s'est produite côté serveur, réessayez plus tard.", { status: 500 });
  }
};
