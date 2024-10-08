import type { APIHandler } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";

import { decryptCredentials } from "../../server/credentials";
import { createLogoutResponse } from "../../server/logout";

import {
  dumpSignatureResponse,
  WebVPNWrongCredentials,
  WebVPNRateLimited,
  WrongCredentials,
  readSignaturesPageFromWebVPN
} from "signatures-iut-limoges";

export const GET: APIHandler = async ({ nativeEvent }) => {
  const cookie = getCookie(nativeEvent, "credentials");
  if (!cookie) return createLogoutResponse(nativeEvent);

  const credentials = decryptCredentials(cookie);

  try {
    const html = await readSignaturesPageFromWebVPN(credentials.username, credentials.password);
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
    if (error instanceof WebVPNWrongCredentials || error instanceof WrongCredentials) {
      return createLogoutResponse(nativeEvent);
    }
    else if (error instanceof WebVPNRateLimited) {
      return new Response("Le serveur WebVPN a bloqué l'accès à cause de trop de tentatives.", { status: 429 });
    }

    return new Response("Une erreur s'est produite côté serveur, réessayez plus tard.", { status: 500 });
  }
};
