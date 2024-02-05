import type { APIHandler } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";

import { decryptCredentials } from "../../server/credentials";
import { createLogoutResponse } from "../../server/logout";
import { dumpSignatureResponse, readSignaturesPageFromWebVPN } from "signatures-iut-limoges";

export const POST: APIHandler = async ({ nativeEvent }) => {
  const cookie = getCookie(nativeEvent, "credentials");
  if (!cookie) return createLogoutResponse(nativeEvent);

  const credentials = decryptCredentials(cookie);

  try {
    const buffer = await readSignaturesPageFromWebVPN(credentials.username, credentials.password) as unknown as Buffer;
    const html = buffer.toString("latin1");

    console.log(html);
    const dump = dumpSignatureResponse(html);

    return new Response(JSON.stringify(dump), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  catch {
    return createLogoutResponse(nativeEvent);
  }
};
